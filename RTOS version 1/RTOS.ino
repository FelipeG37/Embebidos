#include <ETH.h>
#include <WiFi.h>
#include <WiFiAP.h>
#include <WiFiClient.h>
#include <WiFiGeneric.h>
#include <WiFiMulti.h>
#include <WiFiScan.h>
#include <WiFiServer.h>
#include <WiFiSTA.h>
#include <WiFiType.h>
#include <WiFiUdp.h>

#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"
#include "Adafruit_Sensor.h"
#include "DHT.h"

//CAUDALÌMETRO
volatile int pulsos; // Cantidad de pulsos del sensor. Como se usa dentro de una interrupcion debe ser volatile
unsigned int litrosPorHora; // Calculated litres/hour
unsigned char sensorDeFlujo = 22; // Pin al que esta conectado el sensor
unsigned long tiempoAnterior; // Para calcular el tiempo
unsigned long pulsosAcumulados; // Pulsos acumulados
float litros; // Litros acumulados
float litrosValue = 0;

//DHT VARIABLES
float  humidityValue = 0;
float temperatureValue = 0;
float gasValue = 0;
const int DHTPin = 23;

//ESP32 VARIABLES

//gaaaasss sensor variables
#define         MQ1  (34)     //define la entrada analogica para el sensor
#define         RL_VALOR             (5)     //define el valor de la resistencia mde carga en kilo ohms
#define         RAL       (9.83)  // resistencia del sensor en el aire limpio / RO, que se deriva de la                                             tabla de la hoja de datos
#define         GAS_LP                      (0)

//Cadena recibida desde el PC
float           LPCurve[3]  =  {2.3, 0.21, -0.47};
float           Ro           =  10;

//CURRENT SENSOR VARIABLES
float sensibilidad = 0.066; //30A
float ruido = 0.000;
const int sensorRead = 4; //GPIO 6
float valorReposo = 1.65;
float intensidadPico = 0;
float tensionDeRed = 120.0;
float  currentValue = 0;

#define AIO_SERVER      "io.adafruit.com"
#define AIO_SERVERPORT  1883
#define AIO_USERNAME  "sjmunozb"
#define AIO_KEY  "aio_PVTd249vtVOjtliIt13GIQAF4FVL"
#define DHTTYPE DHT11   // DHT 11

WiFiClient client;

DHT dht(DHTPin, DHTTYPE); //INITIALIZE DHT11 SENSOR

Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY);
Adafruit_MQTT_Subscribe gasvalvemanualstatus = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/gasvalvemanualstatus");
Adafruit_MQTT_Subscribe resetflux = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/resetflux");
Adafruit_MQTT_Publish   temperature = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/temperature");
Adafruit_MQTT_Publish   humidity = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/humidity");
Adafruit_MQTT_Publish   current = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/current");
Adafruit_MQTT_Publish   gassensorlecture = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/gassensorlecture");
Adafruit_MQTT_Publish   waterflux = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/waterflux");

// the setup function runs once when you press reset or power the board
void setup() {
  Serial1.begin(115200);
  pinMode(sensorDeFlujo, INPUT);
  Serial.begin(115200);
  attachInterrupt(0, flujo, RISING);
  interrupts(); // Habilitar interrupciones
  tiempoAnterior = millis();
  pinMode(2, OUTPUT);
  //  Ro = Calibracion(MQ1);                        //Calibrando el sensor. Por favor de asegurarse que el sensor se encuentre en una zona de aire limpio mientras se calibra
  dht.begin(); // O.o
  mqtt.subscribe(&gasvalvemanualstatus);
  mqtt.subscribe(&resetflux);
  
  // Now set up two tasks to run independently.
  
  xTaskCreate(
    Task_Uart,
    "UART",   
    10000,            /* Stack size in bytes. */
    NULL,             /* Parameter passed as input of the task */
    5,                /* Priority of the task. */
    NULL);            /* Task handle. */
    
  xTaskCreate(
    Task_humedadYtemp,
    "humedadYtemp",   
    10000,            /* Stack size in bytes. */
    NULL,             /* Parameter passed as input of the task */
    1,                /* Priority of the task. */
    NULL);            /* Task handle. */
 
  xTaskCreate(
    Task_flujo,
    "flujo",
    10000,            /* Stack size in bytes. */
    NULL,             /* Parameter passed as input of the task */
    2,                /* Priority of the task. */
    NULL);            /* Task handle. */
 
  
  xTaskCreate(
    Task_gas,
    "Gas",   // A name just for humans
    10000,            /* Stack size in bytes. */
    NULL,             /* Parameter passed as input of the task */
    3,                /* Priority of the task. */
    NULL);            /* Task handle. */
 

  xTaskCreate(
    Task_leerCorriente,
    "LeerCorriente",
    10000,            /* Stack size in bytes. */
    NULL,             /* Parameter passed as input of the task */
    4,                /* Priority of the task. */
    NULL);            /* Task handle. */
 

  xTaskCreate(
    Task_Enviar,
    "Enviar",
    10000,            /* Stack size in bytes. */
    NULL,             /* Parameter passed as input of the task */
    8,                /* Priority of the task. */
    NULL);            /* Task handle. */


   xTaskCreate(
    Task_conectar,
    "Conectar",   
    10000,            /* Stack size in bytes. */
    NULL,             /* Parameter passed as input of the task */
    6,                /* Priority of the task. */
    NULL);            /* Task handle. */

   xTaskCreate(
    Task_mqtt,
    "mqtt",   
    10000,            /* Stack size in bytes. */
    NULL,             /* Parameter passed as input of the task */
    7,                /* Priority of the task. */
    NULL);            /* Task handle. */ 
 

  // Now the task scheduler, which takes over control of scheduling individual tasks, is automatically started.
}

void loop()
{
  delay(5000);
}

/*--------------------------------------------------*/
/*---------------------- Tasks ---------------------*/
/*--------------------------------------------------*/
void Task_Uart(void * pvParameters)
{
  while(1){
  if (Serial1.available()>0){
    //leemos la opcion enviada
    char Dato = Serial1.read();
    if(Dato=='1') {
      Serial.println("ON");
    }
    if(Dato=='0') {
      Serial.println("OFF");
    }
  vTaskDelay(1000/portTICK_PERIOD_MS);
}
}
}


void Task_mqtt(void * pvParameters)
{
  while(1){
  int8_t ret;
  int8_t retries = 3;
  if (mqtt.connected()) {
      Serial.println("MQTT conected");
      vTaskDelay(1000/portTICK_PERIOD_MS);
    }
  while ((ret = mqtt.connect()) != 0) {
    
    mqtt.disconnect();
    delay(100);
    retries--;
    
    if (retries == 0) {
      Serial.println("MQTT Error");
      vTaskDelay(1000/portTICK_PERIOD_MS);
    }
  }
  Serial.println("MQTT conected");
  vTaskDelay(1000/portTICK_PERIOD_MS);
}
}

void Task_conectar(void * pvParameters)
{
  while(1){
  if(WiFi.status() == WL_CONNECTED)
  {
    Serial.println("Connected");
    vTaskDelay(1000/portTICK_PERIOD_MS);
  }  else{Serial.println("START");
  WiFi.begin("ENRIQUE","E1606742");//"Embebidos-Hogar_Inteligente", "bonnechance");
  while ((!(WiFi.status() == WL_CONNECTED))) {
    delay(300);
    Serial.print(".");
  }
  Serial.println("Connected");
  Serial.println("Your IP is");
  Serial.println((WiFi.localIP()));
  vTaskDelay(1000/portTICK_PERIOD_MS);
  }
  }
}


void Task_flujo(void * pvParameters)
{
  while(1){
    // Cada segundo calcular e imprimir Litros/seg
  if( millis() - tiempoAnterior > 1000)
  {
  tiempoAnterior = millis(); // Updates cloopTime
  // Pulse frequency (Hz) = 6.67 Q, Q is flow rate in L/min. (Results in +/- 3% range)
  // Q = frecuencia / 6.67 (L/min)
  // Q = (frecuencia * 60) / 6.67 (L/hora)
  pulsosAcumulados += pulsos;
  litrosPorHora = (pulsos * 60 / 6.67); // (Pulse frequency x 60 min) / 7.5Q = flow rate in L/hour
  pulsos = 0; // Reset Counter
  litros = pulsosAcumulados*1.0/400; //Cada 400 pulsos = 1 litro
  }
    if (waterflux.publish(litrosValue)) {
      Serial.println("Liter data sent: ");
      Serial.println(litrosValue);
    } else {
      Serial.println("L");
      Serial.println(litrosValue);

    }
  vTaskDelay(1000/portTICK_PERIOD_MS);
  }
}

void Task_gas(void * pvParameters)
{
  while(1){
  gasValue=porcentaje_gas(lecturaMQ(MQ1)/Ro,GAS_LP);
  
 if (gassensorlecture.publish(gasValue)) {
      Serial.println("Gas data sent: ");
      Serial.println(gasValue);

    } else {
      Serial.println("G");
      Serial.println(gasValue);
    }
  
  vTaskDelay(1000/portTICK_PERIOD_MS);
  }
}



//CURRENT SENSOR FUNCTIONS
void Task_leerCorriente(void * pvParameters)
{
  
  float valorVoltajeSensor;
  float corriente=0;
  long tiempo=millis();
  float intensidadMaxima=0;
  float intensidadMinima=0;
  while(1){
  while(millis()-tiempo<500)
  {
    valorVoltajeSensor = analogRead(sensorRead) * (3.3 / 4095.0);
    corriente = 0.9 * corriente + 0.1 * ((valorVoltajeSensor - valorReposo) / sensibilidad);
    if (corriente > intensidadMaxima)intensidadMaxima = corriente;
    if (corriente <  intensidadMinima)intensidadMinima = corriente;
  }

  currentValue=(((intensidadMaxima - intensidadMinima) / 2) - ruido);
   if (current.publish(currentValue)) {
      Serial.println("Current data sent: ");
      Serial.println(currentValue);
    } else {  
      Serial.println("C");
      Serial.println(currentValue);
    }
   vTaskDelay(1000/portTICK_PERIOD_MS);
  }
}


void Task_humedadYtemp(void * pvParameters)
{
  while(1){
  // BEGIN DHT11 SENSOR {
  //int now = millis();
  //int lastMeasure=0;
  //if (now - lastMeasure > 10000) {
  //lastMeasure = now;
  float h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();
  // Read temperature as Fahrenheit (isFahrenheit = true)

  temperatureValue = t;
  humidityValue = h;
  
  // Check if any reads failed and exit early (to try again).
  

   if (isnan(h) || isnan(t)) {
      Serial.println("Failed to read from DHT sensor!");
    }  
    if (temperature.publish(temperatureValue)) {
      Serial.println("Temperature data sent: ");
      Serial.println(temperatureValue);


    } else {
      Serial.println("T");
      Serial.println(temperatureValue);

    }

    if (humidity.publish(humidityValue)) {
      Serial.println("Humidity data sent: ");
      Serial.println(humidityValue);

    } else {
      Serial.println("H");
      Serial.println(humidityValue);
    }
   
  vTaskDelay(1000/portTICK_PERIOD_MS);
}
}


void Task_Enviar(void * pvParameters)
{  
  while(1){
   Adafruit_MQTT_Subscribe *subscription_gasValve;
    while ((subscription_gasValve = mqtt.readSubscription(10000))) {
      if (subscription_gasValve == &gasvalvemanualstatus) {
        Serial.println("Cambio manual en la válvula de gas detectado: ");
        Serial.println(((char *)gasvalvemanualstatus.lastread));
        String inString = (char *)gasvalvemanualstatus.lastread;
        if (inString == "ON") {
          digitalWrite(2, HIGH);
          Serial1.print(1);
        } else {
          digitalWrite(2, LOW);
          Serial1.print(0);
        }
      }
    }
  
  Adafruit_MQTT_Subscribe *subscription_resetFlux;
    while ((subscription_resetFlux = mqtt.readSubscription(10000))) {
      if (subscription_resetFlux == &resetflux) {
        Serial.println("Valor de pulsos reiniciado.");
        Serial.println(((char *)resetflux.lastread));
        String inString2 = (char *)resetflux.lastread;
        if (inString2 == "1") {
          pulsosAcumulados = 0;
        } else {
          pulsosAcumulados = 0;
        }
      }
    }
  vTaskDelay(1000/portTICK_PERIOD_MS);
  }
}





//FUNCIONES////////




  void flujo () {
  pulsos++; // Simplemente sumar el numero de pulsos
}

float Calibracion(float mq_pin){
  int i;
  float val=0;
    for (i=0;i<50;i++) {                                                                               //tomar múltiples muestras
    val += calc_res(analogRead(mq_pin));
  }
  val = val/50;                                                                                         //calcular el valor medio
  val = val/RAL;
  return val;
}


float calc_res(int raw_adc)
{
  return ( ((float)RL_VALOR*(4095-raw_adc)/raw_adc));
}
 
 
float lecturaMQ(int mq_pin){
  int i;
  float rs=0;
  for (i=0;i<5;i++) {
    rs += calc_res(analogRead(mq_pin));
  }
rs = rs/5;
return rs;
}
 
int porcentaje_gas(float rs_ro_ratio, int gas_id){
   if ( gas_id == GAS_LP ) {
     return porcentaje_gas2(rs_ro_ratio,LPCurve);
   }
  return 0;
}
 
int porcentaje_gas2(float rs_ro_ratio, float *pcurve){
  return (pow(10, (((log(rs_ro_ratio)-pcurve[1])/pcurve[2]) + pcurve[0])));
}
