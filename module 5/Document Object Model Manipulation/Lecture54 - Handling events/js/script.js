//! Handling events.

//! Esto cargará antes que todo en la página.
//! De esta forma podemos usar los elementos de id y asegurarnos de que existan
//! ya que esto lo hace antes de que cargue todo.
//* DOMContentLoaded es el evento que trae JavasScript.
document.addEventListener("DOMContentLoaded", function (event) {
  function sayHello(event) {
    //console.log(this); //! Apuntaría en este caso hacia el botón.
    this.textContent = "Said it"; //! Se modifica el text del botón porque estamos apuntando hacia él a la hora de llamarlo (en este ejemplo).
    var name = document.getElementById("name").value;
    var message = "<h1>Hello " + name + "!</h1>";
    document.getElementById("content").innerHTML = message;

    if (name.toLowerCase() === "student".toLowerCase()) {
      var title = document.querySelector("#title").textContent; // Es como cuando se seleecionan varios divs a la vez en css y así.
      title += "texto agregado.";
      document.querySelector("h1").textContent = title;
    }

    console.log(document.querySelector("#name").value);
    console.log(document.querySelector("input").value);
    console.log(document.getElementById("name").value);
  }

  // Unobstrusive event binding.
  //! De esta forma no tenemos que agregar nada del js en el html.
  /**
   * *En cuanto a la razón por la que sayHello
   * *se pasa como argumento sin los paréntesis al
   * *final al agregar el evento con addEventListener,
   * *esto se debe a que se está pasando una referencia
   * *a la función sayHello en sí misma como argumento, y
   * *no su resultado. Esto se debe a que se quiere que la
   * *función se ejecute solo cuando el evento ocurre, en
   * *este caso, cuando se hace clic en el botón. Al pasar
   * *solo la referencia de la función, se le permite al
   * *navegador llamar a la función cuando se produce el evento.
   */

  document.querySelector("button").addEventListener("click", sayHello); // No se le pone el paréntesis a la función porque solo estamos como referenciándola.

  //! Otro forma de hacer.
  //document.querySelector("button").onclick = sayHello;

  //! event argument. LECTURE 55.
  //! Son events que sacamos de la documentación de Mozilla si no me equivoco.
  document
    .querySelector("body")
    .addEventListener("mousemove", function (event) {
      // Aquí estamos en vez de llamar a la función como arriba con el sayHello, la creamos directamente.
      //* Indica dónde el mouse está. Sus coordenadas básicamente.

      //! Estos serían las opciones del evento mousemove. En la documentación
      //! podemos encontrar así como se encontró clientX y clientY.
      //! Solo cuando se esté presionado shift.
      if (event.shiftKey == true) {
        console.log("x: " + event.clientX);
        console.log("y: " + event.clientY);
      }
    });
});
