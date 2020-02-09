/////////////////////////////////
// Generated with a lot of love//
// with TUNIOT FOR ESP32     //
// Website: Easycoding.tn      //
/////////////////////////////////
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"
#include "Adafruit_Sensor.h"
#include <WiFi.h>
#include "DHT.h"
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
String inputstring = "";                                                        //Cadena recibida desde el PC
float           LPCurve[3]  =  {2.3,0.21,-0.47};
float           Ro           =  10;

//CURRENT SENSOR VARIABLES 

float sensibilidad = 0.066; //30A
float ruido= 0.000;
const int sensorRead = 4; //GPIO 6
float valorReposo=1.65;
float intensidadPico=0;
float tensionDeRed =120.0;
float  currentValue = 0;

#define AIO_SERVER      "io.adafruit.com"
#define AIO_SERVERPORT  1883
#define AIO_USERNAME  "sjmunozb"
#define AIO_KEY  "aio_ABNf76O0KTeWn8HCTSd4yK6COrho"
#define DHTTYPE DHT11   // DHT 11
WiFiClient client;

DHT dht(DHTPin, DHTTYPE); //INITIALIZE DHT11 SENSOR
Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY);
Adafruit_MQTT_Subscribe gasvalvemanualstatus = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/gasvalvemanualstatus");
boolean MQTT_connect();

boolean MQTT_connect() {  int8_t ret; if (mqtt.connected()) {    return true; }  uint8_t retries = 3;  while ((ret = mqtt.connect()) != 0) { mqtt.disconnect(); delay(2000);  retries--;if (retries == 0) { return false; }} return true;}

Adafruit_MQTT_Publish   temperature = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/temperature");
Adafruit_MQTT_Publish   humidity = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/humidity");
Adafruit_MQTT_Publish   current = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/current");
Adafruit_MQTT_Publish   gassensorlecture = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/gassensorlecture");


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


void setup()
{

Serial.begin(115200);
  
  pinMode(2, OUTPUT);
//  Ro = Calibracion(MQ1);                        //Calibrando el sensor. Por favor de asegurarse que el sensor se encuentre en una zona de aire limpio mientras se calibra
  dht.begin(); // O.o
  WiFi.disconnect();
  delay(3000);
  Serial.println("START");
  WiFi.begin("Embebidos-Hogar_Inteligente","bonnechance");
  while ((!(WiFi.status() == WL_CONNECTED))){
    delay(300);
    Serial.print("...");

  }
  Serial.println("Connected");
  Serial.println("Your IP is");
  Serial.println((WiFi.localIP()));

  mqtt.subscribe(&gasvalvemanualstatus);
 
}

//CURRENT SENSOR FUNCTIONS 
float leerCorriente()
{
  float valorVoltajeSensor;
  float corriente=0;
  long tiempo=millis();
  float intensidadMaxima=0;
  float intensidadMinima=0;

  while(millis()-tiempo<500)
  {
    valorVoltajeSensor=analogRead(sensorRead) * (3.3/4095.0);
    corriente=0.9*corriente+0.1*((valorVoltajeSensor-valorReposo)/sensibilidad);
    if(corriente>intensidadMaxima)intensidadMaxima=corriente;
    if(corriente<intensidadMinima)intensidadMinima=corriente;
  }
  return(((intensidadMaxima-intensidadMinima)/2)-ruido);
}

void loop()
{

//BEGIN CURRENT SENSOR
currentValue= leerCorriente();
//END CURRENT SENSOR


gasValue=porcentaje_gas(lecturaMQ(MQ1)/Ro,GAS_LP);

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
    humidityValue=h;
   
    // Check if any reads failed and exit early (to try again).
    if (isnan(h) || isnan(t)) {
      Serial.println("Failed to read from DHT sensor!");
      
      }
  
  // }END DHT SENSOR
      if (MQTT_connect()) {
      Adafruit_MQTT_Subscribe *subscription_gasValve;
      while ((subscription_gasValve = mqtt.readSubscription(10000))) {
        if (subscription_gasValve == &gasvalvemanualstatus) {
          Serial.println("Cambio manual en la válvula de gas detectado: ");
          Serial.println(((char *)gasvalvemanualstatus.lastread));
            String inString = (char *)gasvalvemanualstatus.lastread;
             if(inString == "ON"){
                         digitalWrite(2,HIGH);
                   }else{
                          digitalWrite(2,LOW);
            }
        }

      }
    
    }
  
    if (MQTT_connect()) {
      if (temperature.publish(temperatureValue)) {
        Serial.println("Temperature data sent: ");
        Serial.println(temperatureValue);
     

      } else {
        Serial.println("Temperature data couldn't be sent...");

      }
      if (gassensorlecture.publish(gasValue)) {
        Serial.println("Gas data sent: ");
        Serial.println(gasValue);

      } else {
        Serial.println("Gas data couldn't be sent...");

      }
      if (current.publish(currentValue)) {
        Serial.println("Current data sent: ");
        Serial.println(currentValue);

      } else {
        Serial.println("Current data couldn't be sent...");

      }      
      
      if (humidity.publish(humidityValue)) {
        Serial.println("Humidity data sent: ");
        Serial.println(humidityValue);

      } else {
        Serial.println("Humidity data couldn't be sent...");

      }

    } else {
      Serial.println("Failed to connect to MQTT Server.");

    }
/*}*/ delay(10000); //comment if problems
  return;
}
