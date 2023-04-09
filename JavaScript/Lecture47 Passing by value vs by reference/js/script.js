/**
 * In Javascript primitives are passed by value
 * and objects are passed by reference.
 */

// Primitive types.
var a = 7;
var b = a;
console.log("a: " + a);
console.log("b: " + b);

b = 5;
console.log("After b update: " + b);
console.log("a: " + a);
console.log("b: " + b);

// Object types.
console.log("");
var aa = { x: 7 };
var bb = aa;
console.log(aa);
console.log(bb);

bb.x = 5;
console.log("After b.x update: ");
console.log(aa);
console.log(bb);

// Pass by value in a function.
function changePrimitive(primValue) {
  console.log("in changePrimitive");
  console.log("Before:");
  console.log(primValue);

  primValue = 5;
  console.log("After:");
  console.log(primValue);
}

var value = 7;
changePrimitive(value);
console.log(value);

// Pass by reference in a function.
console.log("");
function changeObject(objValue) {
  console.log("in changeObject");
  console.log("Before:");
  console.log(objValue);

  objValue.s = 5;
  console.log("After:");
  console.log(objValue);
}

valueObj = { s: 7 };
changeObject(valueObj);
console.log("after changeObject, orig value: " + valueObj);
console.log(valueObj);
