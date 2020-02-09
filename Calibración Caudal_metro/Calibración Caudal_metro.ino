volatile int pulsos; // Cantidad de pulsos del sensor. Como se usa dentro de una interrupcion debe ser volatile
#define sensorDeFlujo 2 //Pin al que se conecta el sensor. DEBE ser 2 porque es unico que acepta interrpciones en el Arduino UNO
 
void flujo () // Funcion de interrupcion
 
{
pulsos++; // Simplemente sumar el numero de pulsos
 
}
 
void setup()
 
{
pinMode(sensorDeFlujo, INPUT);
Serial.begin(9600);
attachInterrupt(0, flujo, RISING);
interrupts();
}
 
void loop ()
{
Serial.print("Pulsos: ");
Serial.println(pulsos);
}
