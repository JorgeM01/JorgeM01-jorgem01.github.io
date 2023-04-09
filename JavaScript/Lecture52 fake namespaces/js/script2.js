// ! Immediately Invoked Function Expressions (IIFE).
(function (window) {
  var johnGreeter = {};
  var name = "John";
  var greeting = "Hi ";
  johnGreeter.sayHi = function () {
    console.log(greeting + johnGreeter.name);
  };

  window.johnGreeter = johnGreeter;
})(window);
