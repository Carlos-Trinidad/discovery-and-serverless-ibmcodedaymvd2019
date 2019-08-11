# Creando un Buscador Inteligente con Machine Learning y Serverless
### Repositorio del taller "Creando un Buscador Inteligente con Machine Learning y Serverless" del evento IBM Code Day Montevideo 2019

## Abstract:
En este taller te invitamos a crear un Buscador Cognitivo incoporando el concepto de Serverless a la arquitectura de la solución. Probaremos y aprenderemos las tecnologías de IBM Watson Discovery e IBM Cloud Functions. IBM Wa tson Discovery, uno de los buscadores más potentes en la actualidad, con la capacidad de ingestar, enriquecer y consultar información no estructurada (JSON, HTML, PDF, Word y más) gracias al poder del Machine Learning. Por su parte, IBM Cloud Functions permite a nuestras aplicaciones escalar rápidamente y de forma automática, integrarse fácilmente y optimizar los recursos utilizados reduciendo nuestros costos.


## IBM Watson Discovery

Watson Discovery es una herramienta que nos permite agregar un motor de busqueda cognitiva y de análisis de contenido a nuestras aplicaciones para identificar patrones, tendencias e información procesable en nuestros datos no estructurados.

### Ingreso en IBM Cloud
* Buscamos en el catálogo Discovery

![IBM Watson Discovery Catalogo](images_readme/discovery/1.png)
<br />
<br />

![IBM Watson Discovery Elegir Categoria](images_readme/discovery/2.png)
<br />
<br />

![IBM Watson Discovery Seleccionar Servicio](images_readme/discovery/3.png)
<br />
<br />

* Dejamos las opciones predeterminadas y damos click en crear

![IBM Watson Discovery Crear](images_readme/discovery/4.png)
<br />
<br />

* Una vez que el servicio este aprovisionado, en resource list damos click en su nombre para ver las caracteristicas del servicio.

![IBM Watson Discovery Ingresando Servico](images_readme/discovery/5.png)
<br />
<br />

* Copiamos y guardamos los valos API KEY y URL para usarlos más adelante. Luego ingresamos a la tool de Discovery.

![IBM Watson Discovery Ingresando a la Tool](images_readme/discovery/6.png)
<br />
<br />

### Tool de Watson Discovery
* Una vez aquí ya podemos comenzar a trabajar con la herramienta de Discovery y cargar nuestros datos. A continuación haremos click en "Upload your own data".

![Tool IBM Watson Discovery Upload Data](images_readme/discovery/7.png)
<br />
<br />

* Como es la primera vez que iniciamos un servicio de Watson Discovery nos aparecerá este mensaje. Haremos click en "Set up with current plan".

![Tool IBM Watson Discovery Set up current plan](images_readme/discovery/8.png)
<br />
<br />

* Una vez terminado el proceso, crearemos nuestra primer colección de Discovery. Cómo nombre digitaremos "IBM Code Day Montevideo 2019" y como idioma elegimos Spanish.

![Tool IBM Watson Discovery Creando Coleccion](images_readme/discovery/9.png)
<br />
<br />

### Subiendo nuestros documentos a Discovery
* Una vez creada nuestra colección comenzaremos a subir nuestros Documentos a Discovery. Para esto haremos click en "select documents" o arrastraremos y soltaremos los documentos. Los documentos de prueba que usaremos se encuentran en la carpeta (./documents) de este repositorio.

![Upload Documents Select Documents](images_readme/discovery/10.png)
<br />
<br />

![Upload Documents Select Documents and upload](images_readme/discovery/11.png)
<br />
<br />

* Una vez seleccionados los documentos, estos se comenzarán a indexar en la herramienta de Discovery. Por lo cual tendremos que esperar unos segundos hasta que los cuatro documentos queden listos.

![Upload Documents Esperar Indexado](images_readme/discovery/12.png)
<br />
<br />

* Cuando los documentos queden listos e indexados correctamente. Podremos ver un dashboard con ejemplos de los enriquecimientos y análisis que Discovery ha detectado en el texto.

![Upload Documents Dashboard](images_readme/discovery/13.png)
<br />
<br />

## IBM Cloud Functions

Serverless es contar con poder de computo (servidores) como utilidad, lo cual me permite  escalar  automáticamente, y donde además, pago lo que uso.

### Ingreso en IBM Cloud
* Buscamos en el catálogo Functions

![IBM Cloud Functions](images_readme/functions/1.png)
<br />
<br />

* Damos click en Empezar a crear

![Empezar a crear](images_readme/functions/2.png)
<br />
<br />

* Create Action
<br />

![Create action](images_readme/functions/3.PNG)
<br />
# Acción N° 1 - SearchByText

Para esta primera acción, implementaremos la funcionalidad de realizar un búsqueda por texto en todos los documentos ingestados.
Primero, crearemos un paquete donde guardaremos todas nuestras acciones.

*Package Name: serverless-codeDay (opcional)*
<br />

![Create Package](images_readme/functions/4.PNG)
![Colocamos el nombre](images_readme/functions/5.png)
<br />
<br />
Pondremos el nombre - searchByText
<br />

![Create Action](images_readme/functions/6.png)
<br />
Dentro de nuestro editor de código agregamos el siguiente JavaScript

```javascript

const assert = require('assert');
const DiscoveryV1 = require('ibm-watson/discovery/v1');

/**
  *
  * main() will be run when you invoke this action
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */
function main(params) {
  return new Promise(function (resolve, reject) {

    let discovery;

    if (params.iam_apikey){
      discovery = new DiscoveryV1({
        'iam_apikey': params.iam_apikey,
        'url': params.url,
        'version': '2019-03-25'
      });
    }
    else {
      discovery = new DiscoveryV1({
        'username': params.username,
        'password': params.password,
        'url': params.url,
        'version': '2019-03-25'
      });
    }
    discovery.query({
      'environment_id': params.environment_id,
      'collection_id': params.collection_id,
      'natural_language_query': params.user_input,
      'passages': true,
      'count': 3,
      'passages_count': 3
    }, function(err, data) {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
}
```
<br />
<br />

![Save Action](images_readme/functions/7.PNG)

<br />

* Set Parameters

<br />
Ahora debemos agregar los parámetros que tenemos en nuestro código los cuales obtendremos del servicio Watson Discovery. Para esto:

//OBTENER PARAMETROS DE DISCOVERY IMG
<br />
Con los parámetros, volvemos a nuestra acción y accedemos a la sección parameters
<br />

![Parameters](images_readme/functions/8.PNG)
<br />
Agregaremos los parámetros que se muestran a continuación sustituyendo el *Parameter Value* por los datos obtenidos del servicio discovery
<br />

![Set parameters](images_readme/functions/9.PNG)
<br />
A continuación accederemos a la sección Endpoints para habilitar el acceso a neustra acción a través de HTTP. 
<br />
*Nota: el servicio de IBM Cloud Functions brinda el acceso utilizando autenticación, a efectos prácticos para este caso no utilizaremos la autenticación*

![Enable as Web Action](images_readme/functions/10.PNG)

Damos click en *Save* para que el cambio se ejecute
Realizado esto, accediendo a la sección Acciones deberíamos tener nuestro *package* con la acción creada

![See package and action](images_readme/functions/11.PNG)

<br />

# Acción N° 2 - NewsTopStories

Para crear nuestra nueva acción daremos click en Create en la sección Acciones

![Create Action](images_readme/functions/12.PNG)

<br />
Pondremos el nombre - news-discovery y guardaremos la función en el paquete creado anteriormente
<br />

```javascript
const assert = require('assert');
const DiscoveryV1 = require('ibm-watson/discovery/v1');

/**
  *
  * main() will be run when you invoke this action
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */
function main(params) {
  return new Promise(function (resolve, reject) {

    let discovery;

    if (params.iam_apikey){
      discovery = new DiscoveryV1({
        'iam_apikey': params.iam_apikey,
        'url': params.url,
        'version': '2019-03-25'
      });
    }
    else {
      discovery = new DiscoveryV1({
        'username': params.username,
        'password': params.password,
        'url': params.url,
        'version': '2019-03-25'
      });
    }

    discovery.query({
      'environment_id': params.environment_id,
      'collection_id': params.collection_id,
      'natural_language_query': params.user_input,

    }, function(err, data) {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
}
```

<br />

Agregaremos los parámetros que se muestran a continuación sustituyendo el *Parameter Value* por los datos obtenidos del servicio discovery

<br />

*Nota: para el caso del collection_id, nótese que utilizamos news-en. Esta colección nos brinda la posibilidad de buscar en un dominio de noticias en inglés. Se utiliza este debido a que es el más acutalizado (aproximadamente 300.000 noticias diarias). Para buscar en español debemos modificar el value a news-es*

![Set parameters](images_readme/functions/13.PNG)
<br />

A continuación accederemos a la sección Endpoints para habilitar el acceso a neustra acción a través de HTTP. 

<br />

Damos click en *Save* para que el cambio se ejecute

# Acción N° 3 - SentimentAnalysis

Para crear nuestra nueva acción daremos click en Create en la sección Acciones

![Create Action](images_readme/functions/12.PNG)

<br />
Pondremos el nombre - sentimentAnalysis y guardaremos la función en el paquete creado anteriormente
<br />

<br />

*Nota: Nótese que la acción que creamos es similar a las anteriores pero agregamos modificamos la respuesta del servicio de discovery*

```javascript
const assert = require('assert');
const DiscoveryV1 = require('ibm-watson/discovery/v1');

/**
  *
  * main() will be run when you invoke this action
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */
function main(params) {
  return new Promise(function (resolve, reject) {

    let discovery;

    if (params.iam_apikey){
      discovery = new DiscoveryV1({
        'iam_apikey': params.iam_apikey,
        'url': params.url,
        'version': '2019-03-25'
      });
    }
    else {
      discovery = new DiscoveryV1({
        'username': params.username,
        'password': params.password,
        'url': params.url,
        'version': '2019-03-25'
      });
    }

    discovery.query({
      'environment_id': params.environment_id,
      'collection_id': params.collection_id,
      'natural_language_query': params.user_input,

    }, function(err, data) {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
}
```

<br />

Agregaremos los mismos parámetros que incorporamos anteriormente

<br />

![Set parameters](images_readme/functions/13.PNG)
<br />

A continuación accederemos a la sección Endpoints para habilitar el acceso a neustra acción a través de HTTP. 

<br />

Damos click en *Save* para que el cambio se ejecute


# Acción N° 4 -  coMention

Para crear nuestra nueva acción daremos click en Create en la sección Acciones

![Create Action](images_readme/functions/12.PNG)

<br />
Pondremos el nombre - coMention y guardaremos la función en el paquete creado anteriormente
<br />

<br />

*Nota: Nótese que la acción que creamos es similar a las anteriores pero agregamos modificamos la respuesta del servicio de discovery*

```javascript
const assert = require('assert');
const DiscoveryV1 = require('ibm-watson/discovery/v1');

/**
  *
  * main() will be run when you invoke this action
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */
function main(params) {
  return new Promise(function (resolve, reject) {

    let discovery;

    if (params.iam_apikey){
      discovery = new DiscoveryV1({
        'iam_apikey': params.iam_apikey,
        'url': params.url,
        'version': '2019-03-25'
      });
    }
    else {
      discovery = new DiscoveryV1({
        'username': params.username,
        'password': params.password,
        'url': params.url,
        'version': '2019-03-25'
      });
    }

    discovery.query({
      'environment_id': params.environment_id,
      'collection_id': params.collection_id,
      'natural_language_query': params.user_input,

    }, function(err, data) {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
}
```

<br />

Agregaremos los mismos parámetros que incorporamos anteriormente

<br />

![Set parameters](images_readme/functions/13.PNG)
<br />

A continuación accederemos a la sección Endpoints para habilitar el acceso a neustra acción a través de HTTP. 

<br />

Damos click en *Save* para que el cambio se ejecute


#Deploy a IBM Cloud de nuestra app

En este paso, realizaremos el deploy de nuestra aplicacion a IBM Cloud como una cloud foundry.
Para realizar esto, editaremos en primer lugar el archivo manifest.yml que aparece en el repo que clonamos anteriormente.
Debemos modificar la línea name que aparece en el .yml por un nombre unico que elijamos
<br />

```yml
---
  applications:
  - name: my_nombre_unico
    random-route: true
    memory: 128M
    buildpack: https://github.com/cloudfoundry/staticfile-buildpack
```

<br />

Con esto pronto, desde línea de comandos, posicionados en el directorio donde clonamos el repositorio, ejecutamos los siguientes comandos:

```bash

ibmcloud login #Si es un usuario federado (@..ibm.com) usar ibmcloud login --sso
ibmcloud cf push

```
<br />

Cuando finalice el proceso de deploy deberíamos tener acceso a nuestra aplicación en una url similar a la siguiente:

[http://my_nombre_unico-grouchy-crocodile.mybluemix.net](http://my_nombre_unico-grouchy-crocodile.mybluemix.net)