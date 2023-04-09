// ! Immediately Invoked Function Expressions.

yaakovGreeter.sayHello();
johnGreeter.sayHi();

// Immediately Invoked Function Expression
// IIFE
var f = (function (name) {
  console.log("Hello " + name);
})("Coursera!");

//* EJERCICIO.
(function (window) {
  var obj = {};

  obj.dreamOn = function () {
    console.log("I want to see the global scope! Let me out!");
  };

  window.doer = obj;
})(window);

doer.dreamOn();
