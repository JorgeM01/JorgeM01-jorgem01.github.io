// Event handling
document.addEventListener("DOMContentLoaded", function (event) {
  // Unobtrusive event binding
  document.querySelector("button").addEventListener("click", function () {
    // Call server to get the name
    $ajaxUtils.sendGetRequest("data/name.txt", function (request) {
      var name = request.responseText;

      //! Ponemos esto adentro porque como es asíncrónico, si estuviera afuera, no saldría el name ya que
      //! tendríamos la respuesta del servidor hasta después.
      document.querySelector("#content").innerHTML =
        "<h2>Hello " + name + "!</h2>";
    });
  });
});
