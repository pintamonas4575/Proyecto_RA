# Data-Logger
Bienvenidos a Data-Logger

## Instalación: Nos aseguramos de que Nodejs y Npm están instalados.
En la carpeta de proyecto hacemos:
```
npm install -g nodemon
npm install
```
<!-- En la carpeta public, creamos una carpeta de nombre: logs -->

## Ejecución:
En la carpeta de proyecto hacemos:
```
npm start
```
La aplicación se ejecuta en localhost:3000

## Información adicional

En /logs encontramos todos los archivos de log ordenados por fecha de creación

En el csv aparecerá cada entrada insertada en una línea, con su identificador, tiempo de inserción (en formato timestamp), temperatura, humedad, CO2, volatiles

Para insertar un conjunto de datos debemos realizar una petición HTTP GET hacia el punto /record, con los siguientes parámetros:

- id_nodo identificador del nodo (string)
- temperatura (float / double)
- humedad valores (float / double)
- co2  (interger)
- volatiles (interger)

Un ejemplo de inserción es la siguiente 
```
/record?id_nodo=nodoPrueba1&temperatura=24.5&humedad=68.2&co2=293&volatiles=112
```
