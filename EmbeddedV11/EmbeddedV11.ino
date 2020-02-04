/////////////////////////////////
// Generated with a lot of love//
// with TUNIOT FOR ESP32     //
// Website: Easycoding.tn      //
/////////////////////////////////
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"
#include <WiFi.h>
#include "DHT.h"

float  humidityValue = 0;
float temperatureValue = 0;
const int DHTPin = 23;


#define AIO_SERVER      "io.adafruit.com"
#define AIO_SERVERPORT  1883
#define AIO_USERNAME  "sjmunozb"
#define AIO_KEY  "aio_jnJt15bKFafNqWCRebkm4W4o6NjR"
#define DHTTYPE DHT11   // DHT 11
WiFiClient client;

DHT dht(DHTPin, DHTTYPE); //INITIALIZE DHT11 SENSOR
Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY);
Adafruit_MQTT_Subscribe gasvalvemanualstatus = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/gasvalvemanualstatus");
boolean MQTT_connect();

boolean MQTT_connect() {  int8_t ret; if (mqtt.connected()) {    return true; }  uint8_t retries = 3;  while ((ret = mqtt.connect()) != 0) { mqtt.disconnect(); delay(2000);  retries--;if (retries == 0) { return false; }} return true;}

Adafruit_MQTT_Publish 	temperature = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/temperature");
Adafruit_MQTT_Publish 	humidity = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/humidity");
void setup()
{
Serial.begin(115200);
  dht.begin(); // O.o
  WiFi.disconnect();
  delay(3000);
  Serial.println("START");
  WiFi.begin("Se metiotro pejelagahto","bonnechance");
  while ((!(WiFi.status() == WL_CONNECTED))){
    delay(300);
    Serial.print("...");

  }
  Serial.println("Connected");
  Serial.println("Your IP is");
  Serial.println((WiFi.localIP()));

  mqtt.subscribe(&gasvalvemanualstatus);
}


void loop()
{
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
      while ((subscription_gasValve = mqtt.readSubscription(15000))) {
        if (subscription_gasValve == &gasvalvemanualstatus) {
          Serial.println("Cambio manual en la válvula de gas detectado: ");
          Serial.println(((char *)gasvalvemanualstatus.lastread));
      
        }

      }

    }
  
    if (MQTT_connect()) {
      if (temperature.publish(temperatureValue)) {
        Serial.println("Temperature data sent: ");
        Serial.print(temperatureValue);

      } else {
        Serial.println("Temperature data couldn't be sent...");

      }
      if (humidity.publish(humidityValue)) {
        Serial.println("Humidity data sent: ");
        Serial.print(humidityValue);

      } else {
        Serial.println("Humidity data couldn't be sent...");

      }

    } else {
      Serial.println("Failed to connect to MQTT Server.");

    }
/*}*/ delay(15000); //comment if problems
  return;
}
