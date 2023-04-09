/**Functions are First-Class Data Types.
 * Functions are objects.
 *
 * Funciona como en Python básicamente donde hasta podemos
 * asignarle a una variable una función.
 */

function multiply(x, y) {
  return x * y;
}

console.log(multiply(5, 3));

multiply.version = "v.1.0.0";
console.log(multiply);
console.log(multiply.version);

// Function factory.
function makeMultiplier(multiplier) {
  var myFunc = function (x) {
    return multiplier * x;
  };
  return myFunc;
}

var multiplyBy3 = makeMultiplier(3);
console.log(multiplyBy3(10));

/**
 * Passing functions as arguments.
 */

function doOperation(x, operation) {
  return operation(x);
}

console.log("Function as argument: ");
var result = doOperation(5, multiplyBy3);
console.log(result);
