# Modems Model App

Esta app consiste en una utilidad para establecer, a partir de un fabricante seleeccionado, los registros de cable modem que cumplen con los modelos del JSON ubicado en `/db`

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._


## Construido con 🛠️

* MySQL 5.7
* NodeJS 15.13.0

## Paquetes utilizados

* Express
* dotenv
* edit-json-file
* mysql2

Para que funcione correctamente la aplicación, modificar los valores de configuracion para la base de datos en el archivo `.env.example`. y cambiar su nombre por `.env`.

La creación de las tablas así como su llenado es automática, pero debe disponerse de un servidor MySQL corriendo y una base de datos creada, la cual debe incluirse en el archivo `.env`

Una vez ejecutado el script `run.sh` la aplicación será visible en la url `127.0.0.1:4000` (a menos que se especifique otro puerto en el archivo `.env`).