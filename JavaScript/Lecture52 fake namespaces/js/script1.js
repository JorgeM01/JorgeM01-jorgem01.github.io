// ! Immediately Invoked Function Expressions.
(function (window) {
  var yaakovGreeter = {};
  var name = "Yaakov";
  var greeting = "Hello ";
  yaakovGreeter.sayHello = function () {
    console.log(greeting + name);
  };

  window.yaakovGreeter = yaakovGreeter;
})(window);

//! A las variables también le podemos poner yaakovGreet.name
//! por ejemplo, pero al parecer solo es necesario hacerlo para
//! las funciones que vamos a llamar en app.
