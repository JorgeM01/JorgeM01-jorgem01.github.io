/* String concatanation */
var string = "Hello";
string += " World";
console.log(string + "!");


/* Regular math operations. */
console.log(5+4);
console.log(undefined / 5);

/* Equality */
var x = 4, y = 4;
if(x==y){
    console.log("x and y are equal.");
}

var a = 5, b = 5;
if(a==b){
    console.log("a and b are equal.");
}

a = "5";

// PARA EVITAR QUE CAMBIE AL MISMO TIPO DE DATO, SE USA UN TRIPLE '='. O sea ===.
if(a==b){
    // Esto es debido a algo llamado coerción.
    console.log("a and b are equal. a string.");
}


/** COSAS CONSIDERADAS FALSE. */
if ( false || null || undefined || "" || 0 || NaN){
    console.log("This line won't ever execute.");
}else {
    console.log("All false");
}

/** COSAS CONSIDERADAS TRUE. */
if (true && "hello" && 1 && -1 && "false" && 23) {
    console.log("All true");
}


//LECTURE 44

/** Algo muy común para casos donde no se pase nada por parámetro: */
function orderChickenWith(sideDish){
    if(sideDish==undefined){
        console.log("Chicken with " + "whatever!")
    }else{
        console.log("Chicken with " + sideDish);
    }
};

orderChickenWith("noodles");
orderChickenWith();


// En vez de eso, se suele usar una forma abreviada del js.
function orderChickenWith2(sideDish){
    /** Esta forma siempre toma el true. */
    sideDish = sideDish || "whatEver2!"
    console.log("Chicken with " + sideDish);
};

orderChickenWith2("noodles");
orderChickenWith2();


/* TESTING */
var x = 10;
if ((null) || (console.log("Hello")) || x > 5){
    console.log("Hello");
}