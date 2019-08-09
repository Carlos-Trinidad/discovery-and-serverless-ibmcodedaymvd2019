# Creando un Buscador Inteligente con Machine Learning y Serverless
### Repositorio del taller "Creando un Buscador Inteligente con Machine Learning y Serverless" del evento IBM Code Day Montevideo 2019

## Abstract:
En este taller te invitamos a crear un Buscador Cognitivo incoporando el concepto de Serverless a la arquitectura de la solución. Probaremos y aprenderemos las tecnologías de IBM Watson Discovery e IBM Cloud Functions. IBM Wa tson Discovery, uno de los buscadores más potentes en la actualidad, con la capacidad de ingestar, enriquecer y consultar información no estructurada (JSON, HTML, PDF, Word y más) gracias al poder del Machine Learning. Por su parte, IBM Cloud Functions permite a nuestras aplicaciones escalar rápidamente y de forma automática, integrarse fácilmente y optimizar los recursos utilizados reduciendo nuestros costos.


## IBM Cloud Functions

Serverless es contar con poder de computo (servidores) como utilidad, lo cual me permite  escalar  automáticamente, y donde además, pago lo que uso.

### Ingreso en IBM Cloud
* Buscamos en el catálogo Functions

![IBM Cloud Functions](images_readme/1.png)




* Damos click en Empezar a crear

![Empezar a crear](images_readme/2.png)




* Create Action

![Create action](images_readme/3.PNG)

# Acción N° 1 - SearchByText

Para esta primera acción, implementaremos la funcionalidad de realizar un búsqueda por texto en todos los documentos ingestados.
Primero, crearemos un paquete donde guardaremos todas nuestras acciones.

*Package Name: serverless-codeDay (opcional)*

![Create Package](images_readme/4.PNG)

Pondremos el nombre - searchByText

