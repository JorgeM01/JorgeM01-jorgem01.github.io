var x;
console.log(x);

if (x == undefined) {
    console.log("x is undefined.");
}

x = 5;
 
if (x == undefined){ 
    console.log("x is undefined.");
} else {
    console.log("x has been defined.")
}


// undefined != not defined. "var x;" en otras palabras es una forma de definir lo no definido.
/* Por esa razón, aquí da error porque es un not defined. */
console.log(y);