# 💼 Proyecto_RA
Proyecto de la asignatura "Redes Avanzadas" de la ETSISI UPM en el curso 2023-24.

# 📜 Anotaciones
Añadir en el .conf: _"listener 1883 10.100.0.104"_ 

# Librerías
Hacer _npm install_ para: 
* json
* mysql
* paho-mqtt
* http-errors

# Terminales
Para entrar en MySQL:
1. Comando (en carpeta base 'ProyectoRA'): mysql -u root -p proyecto_RA
2. Password: root1234

*Hacer directorio con archivos relevantes.* 
- /SSR-master-server/routes/prueba.js: La API de los métodos y la instanciación del TokenBucket.

- /SSR-master-server/routes/TockenBucket.js: Definición de la clase TokenBucket como medida de seguridad para filtrar un límite de tráfico.

- /SSR-master-server/app.js: Inicialización del servidor con ambas instanciaciones del Middleware y el balanceador de carga.

- /publicador.py: Ejemplo de uso para publicar mensajes con una alta frecuencia.

- /suscriptor.py: Archivo que crea un suscriptor para recibir todas las peticiones e insertarlas en la base de datos.

*PUERTOS:*
* 1883: Alojamiento del broker *Mosquitto*.
* 3000: Visualización con *Grafana*.
* 3001: Primera instancia del Middleware.
* 3002: Segunda instancia del Middleware.
* 3306: Alojamiento de la base de datos *MySQL* 

# ⚖️ Licencia
No se va a llevar a nadie a juicio.

# 👤 Contacto
Contactar con los contribuyentes de este repositorio.

* Alejandro Mendoza: [@pintamonas4575](https://github.com/pintamonas4575) 
