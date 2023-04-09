// Arrays.

//! Long hand creation - notation.
var array = new Array();
array[0] = "Jorge";
array[1] = 2;
array[2] = function (name) {
  console.log("Hello " + name);
};
array[3] = { course: "HTML, CSS, JavaScript course" };

console.log(array);
console.log(array[1]);
array[2]("Omar");
array[2](array[0]);
console.log(array[3].course);

//! Short hand array creation - notation.
var names = [
  "Jorge",
  "Omar",
  "Matute",
  "Lopez",
  { name: "Ruben" },
  { name: "Lauren" },
];
console.log(names);
console.log(names[1]);
console.log(names[5].name);

var names2 = ["Jorge", "Omar", "Matute", "Lopez"];

// !Esto también se puede.
names2[100] = "Armando";

console.log("\n================================");
for (var i = 0; i < names2.length; i++) {
  console.log("Hello " + names2[i]);
}

//! Problems with arrays.
var names3 = ["Jorge", "Omar", "Matute", "Lopez"];

var myObj = {
  name: "Mauricio",
  course: "HTML/CSS/JAVASCRIPT",
  platform: "Coursera",
};

console.log("\n\n\n");
for (var prop in myObj) {
  console.log(prop + ": " + myObj[prop]);
}

console.log("\n\n\n Entonces también se puede hacer esto: ");
names3.greeting = "Hi";
for (var namee in names3) {
  console.log("Hello " + names3[namee]);
}

//! El "Hi" se imprime. No debería ser así pero eso
//! pasa en Javascript. Entonces hay que tener cuidado con eso.
//! Recordar que al final un array solo son objetos en javascript.
