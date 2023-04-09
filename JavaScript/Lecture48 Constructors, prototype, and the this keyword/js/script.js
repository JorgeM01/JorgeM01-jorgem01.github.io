// Functions constructos.

//! Se pone en mayúscula la C para saber que se trata de
//! función constructor. Es una buena práctica nada más.
function Circle(radius) {
  this.radius = radius;
  this.getArea = function () {
    return Math.PI * Math.pow(this.radius, 2);
  };
}

var myCircle = new Circle(10);
console.log(myCircle);
console.log(myCircle.getArea());

//! Para evitar que se hagau una función (getArea) cada
//! vez que creemos un Circle, podemos usar prototype.
function Circle2(radius) {
  this.radius = radius;
}

Circle2.prototype.getArea = function () {
  return Math.PI * Math.pow(this.radius, 2);
};

var myCircle2 = new Circle2(10);
console.log(myCircle2);
console.log(myCircle2.getArea());

var myCircle3 = new Circle(20);
console.log(myCircle3);
console.log(myCircle3.getArea());
