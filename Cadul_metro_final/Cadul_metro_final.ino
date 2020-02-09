volatile int pulsos; // Cantidad de pulsos del sensor. Como se usa dentro de una interrupcion debe ser volatile
 
unsigned int litrosPorHora; // Calculated litres/hour
 
unsigned char sensorDeFlujo = 2; // Pin al que esta conectado el sensor
 
unsigned long tiempoAnterior; // Para calcular el tiempo
 
unsigned long pulsosAcumulados; // Pulsos acumulados
 
float litros; // Litros acumulados
void flujo () // Funcion de interrupcion
 
{
pulsos++; // Simplemente sumar el numero de pulsos
}
 
void setup()
{
pinMode(sensorDeFlujo, INPUT);
Serial.begin(9600);
attachInterrupt(0, flujo, RISING); // Setup Interrupt
 
// see http://arduino.cc/en/Reference/attachInterrupt
interrupts(); // Habilitar interrupciones
tiempoAnterior = millis();
}
 
void loop ()
{
// Cada segundo calcular e imprimir Litros/seg
if( millis() - tiempoAnterior > 1000)
{
tiempoAnterior = millis(); // Updates cloopTime
// Pulse frequency (Hz) = 6.56 Q, Q is flow rate in L/min. (Results in +/- 3% range)
// Q = frecuencia / 6.56 (L/min)
// Q = (frecuencia * 60) / 6.56 (L/hora)
pulsosAcumulados += pulsos;
litrosPorHora = (pulsos * 60 / 6.56); // (Pulse frequency x 60 min) / 7.5Q = flow rate in L/hour
pulsos = 0; // Reset Counter
Serial.print(litrosPorHora, DEC); // Print litres/hour
Serial.print(" L/hour");
Serial.print(" Pulsos totales: ");
Serial.print(pulsosAcumulados);
 
litros = pulsosAcumulados*1.0/394; //Cada 394 pulsos = 1 litro
Serial.print(" Litros: ");
Serial.println(litros);
}
}
