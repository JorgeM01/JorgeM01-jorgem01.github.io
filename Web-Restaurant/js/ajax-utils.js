(function (global) {
  // Set up a namespace for our utility
  var ajaxUtils = {};

  // Returns an HTTP request object
  function getRequestObject() {
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

  // Makes an Ajax GET request to 'requestUrl'
  //* data/name.json, function(res)
  ajaxUtils.sendGetRequest = function (
    requestUrl,
    responseHandler,
    isJsonResponse
  ) {
    var request = getRequestObject();
    request.onreadystatechange = function () {
      handleResponse(request, responseHandler, isJsonResponse);
    };
    request.open("GET", requestUrl, true);
    request.send(null); // for POST only
  };

  // Only calls user provided 'responseHandler'
  // function if response is ready
  // and not an error
  //* request, function(res)
  function handleResponse(request, responseHandler, isJsonResponse) {
    if (request.readyState == 4 && request.status == 200) {
      // Default to isJsonResponse = true
      if (isJsonResponse == undefined) {
        isJsonResponse = true;
      }

      //! Es como si va a esperar hasta llegar a este momento para que se ejecute esta función realmente
      //! con el parámetro que le pasamos aquí. En el script simplemente definimos la función y aquí es donde
      //! se viene a ejecutar.
      if (isJsonResponse) {
        responseHandler(JSON.parse(request.responseText));
      } else {
        responseHandler(request.responseText);
      }
    }
  }

  // Expose utility to the global object
  global.$ajaxUtils = ajaxUtils;
})(window);
