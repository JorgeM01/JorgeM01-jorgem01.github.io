var message = "in global";
console.log("global: message = " + message);

var a = function() {
     var message = "inside a";
     console.log("a: message = " + message);
     b();

     var c = function(){
        console.log("c: message = " + message);
     }
     c();
};

function b() {
    console.log("b: message = " + message);
};

a();

// Otra forma de definir una función.
function sum(a, b) {
    return a + b;
};

console.log("Resultado de la suma: " + sum(5, 10));
var suma = sum(15, 20);
console.log(suma);

var x = function () {
    console.log("Hello World!");
    return;
};
x();

// Es posible gracias a que es un funciona de forma dinámica.
x = "I am a new value.";
console.log(x);



