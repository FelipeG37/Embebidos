# Embebidos - Hogares seguros
Este proyecto tiene como fin, realizar un prototipo funcional que asegure la integridad de los hogares mediante un sistema inteligente que prevenga catástrofes relacionadas con la fugas de gas y de agua, así como también por las anomalías eléctricas.

Esto, debido a que generalmente cuando alguno de estos fallos ocurre, no se detecta a tiempo y el hogar termina con consecuencias bastante peligrosas y costosas de reparar. Es por esto que el proyecto, a través de un monitoreo constante, busca detectar estos errores en tiempo real para posteriormente lograr corregirlos. Además, el monitoreo permite tener un mayor control sobre el consumo de estos servicios, acción importante a la hora de realizar comparaciones para entender cómo varía el gasto de acuerdo a los diferentes usos que se les den.

### Bitácora de trabajo
![](https://github.com/FelipeG37/Embebidos/blob/master/Bit%C3%A1cora.png)

Al inicio del semestre se tenían varias propuestas para trabajar, una de ellas era la realización de un arenero para gatos automatizado, otra iba encaminada a la recolección de energía desde el hogar, sin embargo, luego de realizar las matrices que permiten analizar varios elementos del proyecto y discutir sobre esto, se decidió trabajar en este proyecto, como conclusión de la comparación de los resultados de cada una de las tablas, debido a que cumplía varios objetivos que se especificaron en clase.

En la fecha número uno, se subieron al Github los primeros avances del proyecto, en los cuales se empezaban a identificar los objetivos del trabajo y la justificación del mismo, además de la tabla casi finalizada.

En la fecha número dos se hizo compra del módulo WiFi, del sensor de gas y del detector de errores eléctrico, estos se muestran a continuación:

Caudalímetro YF-S201:

![](https://github.com/FelipeG37/Embebidos/blob/master/Caudal%C3%ADmetro.jpg)

Sensor de corriente ACS712T:

![](https://github.com/FelipeG37/Embebidos/blob/master/El%C3%A9ctrico.jpg)

En la fecha número tres se actualiza el documento del anteproyecto con la justificación del proyecto y la descripción de cada una de las actividades a través de un cronograma en forma de tabla, que permitiría tener un mayor control sobre las fechas de trabajo del proyecto.
Luego de esto, se hace una nueva repartición de tareas, enfocada en la investigación de ciertas tareas para su posterior desarrollo:
Primero, se define buscar los pasos necesarios para la creación de un servidor local (página web) y su costo. Segundo, queda como tarea revisar el diseño de la caja 3D para su posterior impresión. Tercero, queda como tarea finalizar todo el anteproyecto y terminar las dos tablas del proyecto para subirlas al archivo del Github. Cuarto, se hace la búsqueda de los pasos que permitan generar una comunicación entre la BlackIce II y el módulo WiFi. Por último, se busca todo lo relacionado con los pasos necesarios para que los verilog puedan leer la información de los sensores y además, puedan enviarla a los actuadores.

En la cuarta fecha, se hace entrega de la tarjeta BlackIce II, que se puede ver a continuación:

En la quinta fecha, se finaliza todo el anteproyecto con la parte de vigilancia tecnológica desarrollada, ítem importante, pues permite hacer un análisis concreto sobre quiénes son o podrían ser, los aliados del proyecto, pero también da vía libre para poder identificar quiénes serían la competencia.

En la sexta fecha se adelanta el trabajo investigativo que permite generar una comunicación el ESP32 y el node red. También se generan avances en la creación de la base de datos que tendrá el programa, que permita el almacenamiento de la información del monitoreo.

En la séptima fecha se tiene lista la comunicación entre el ESP32 y la Raspberry y entre la Raspberry el Node red. La comunicación funciona de manera correcta, pues se realizó una prueba con un sensor DHT11 y tanto la temperatura como la humedad, se visuabilizaban de manera perfectamente. Se vuelven a distribuir tareas para buscar cómo acoplar todo con actuadores, probar la comunicación entre la FPGA y el ESP32, y por último, utilizar la dashboard que el Node red trae de manera predeterminada.


