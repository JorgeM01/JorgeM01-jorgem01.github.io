//! Se pone global para recordar que estamos hablando del objeto global -> window.
(function (global) {
  // Set up a namespace for our utility
  var ajaxUtils = {};

  // Returns an HTTP request object
  function getRequestObject() {
    //! Este primer if es el más importante porque es para los nuevos navegadores.
    //! retorna un HTTP request object.

    /**
     * !El if se utiliza para verificar si el navegador en el que se está ejecutando el código admite el objeto XMLHttpRequest.
     * !Si la propiedad XMLHttpRequest está presente en el objeto global (por lo general window),
     * !entonces el navegador es compatible con este objeto y se puede crear una instancia de él
     * !utilizando la línea return new XMLHttpRequest();.
     */
    if (global.XMLHttpRequest) {
      return new XMLHttpRequest();
    } else if (global.ActiveXObject) {
      // For very old IE browsers (optional)
      return new ActiveXObject("Microsoft.XMLHTTP");
    } else {
      global.alert("Ajax is not supported!");
      return null;
    }
  }

  //* RECORDAR que esta parte se hace de forma ASÍNCRONA, por esa razón no ponemos variables globales como request y responseHandler porque el usuario
  //* Podría hacer otro get y así. Se chocarían los objetos digamos se usaría la misma request y no tendríamos la response que queremos.
  // Makes an Ajax GET request to 'requestUrl'
  //* data/name.txt", function (request)
  ajaxUtils.sendGetRequest = function (requestUrl, responseHandler) {
    //! Objeto que vamos a usar para hacer los request. Se creo en la función anterior.
    var request = getRequestObject();
    request.onreadystatechange = function () {
      //! Se pasa dentro de una función porque no podemos asignarle a una var una función con parámetros. En todo caso sería handleResponse; nada más. Pero no nos sirve en este caso.
      handleResponse(request, responseHandler);
    };
    //! GET -> tipo de request que vamos a hacer.
    //! requestUrl ->  url. Si fuera post no sería con URL. Se pondría el body de la URL en la parte que dice null.
    //! true -> porque si es false será síncrona, entonces se quedaría congelada la página hasta hacer los cambios y no queremos eso.
    //! De esa forma no se congela y el browser seguirá normal operando.
    request.open("GET", requestUrl, true);
    request.send(null); // for POST only
  };

  // Only calls user provided 'responseHandler'
  // function if response is ready
  // and not an error
  //! Siendo que response handler sería como que la función principal, o sea la que hará el cambio con el GET. Es como que la que hace las modificaciones.
  //! Es la función que el usuario va a pasarle a esta librería.
  //* request, function (request)
  function handleResponse(request, responseHandler) {
    //! Verificamos que ya hayan 4 estados.
    //! Verificamos que esté en 200 (significa que todo está bien.)
    //! Lo que significa no es muy importante, sino que revisar que ya esté.
    if (request.readyState == 4 && request.status == 200) {
      responseHandler(request);
    }
  }

  // Expose utility to the global object
  //! Lo del $ es sólo estética. Así lo hacen en jQuery.
  global.$ajaxUtils = ajaxUtils;
})(window);
