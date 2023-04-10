// DOM manipulation.
console.log(document.getElementById("title"));
//HTMLDocument sería como decir instancia de window.
console.log(document instanceof HTMLDocument);

function sayHello() {
  // Con el value podemos obtener el valor de ese input y no nos retorna
  // la línea del html de ese id como lo hace sin el value.
  var name = document.getElementById("name").value;
  var message = "<h1>Hello " + name + "!</h1>";

  //console.log(document.getElementById("name").value);

  //! De esta forma solamente lo toma como texto normal.
  //document.getElementById("content").textContent = message;

  //! De esta otra forma lo toma como código de html. Podemos incluir tags.
  //document.getElementById("content").innerHTML = message;

  //* Agregándole más cosas:
  if (name.toLowerCase() === "Jennipher".toLowerCase()) {
    var title =
      //! Esta es una mejor forma que el getElementById porque lo restringe a
      //! solo poder seleccionar por id. Entonces esta otra forma es más genérica.
      document.querySelector("#title").textContent; // Es como cuando se seleecionan varios divs a la vez en css y así.
    title = "Jorge es el nuevo Mark Zuckerberg.";

    //! Así se actualiza porque sería como modificarlo por referencia al título.
    // Ojo: con esta function toma el primer elemento, en este caso al primer h1.
    // Existe otra función para sí tomar a todos. Esto sería el equivalente a usar #title
    // que usé arriba. De hecho aquí también podría paonerlo.
    document.querySelector("h1").textContent = title;
  }
}
