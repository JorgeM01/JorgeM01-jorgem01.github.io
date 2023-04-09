// Comment CTRL + K + C.
// UNCOMMENT CTRL + K + U.

// // Object creation.
// var company = new Object();
// company.name = "Diunsa";
// // Si no creaba esto, daba un error porque ceo no estaba definido.
// company.ceo = new Object();
// company.ceo.firstName = "Jorge";
// company.ceo.lastName = "Matute";

// console.log(company);
// console.log("CEO name: " + company.ceo.firstName + " " + company.ceo.lastName);

// // Otra forma de hacerlo.
// console.log(company["name"]);
// console.log(company["ceo"]["firstName"]);

// /** Ese último método con "[ y ]" 
//  * se usa porque podemos hacer lo siguiente también.
// */

// company["stock of company"] = 110;
// console.log(company);
// // Y entonces eso nos permite tambien: 
// console.log("Stock price is: " + company["stock of company"]);
// // Es como que permite espacios de esta forma.


// // También se puede de la sigueinte forma:
// var client = "client";
// company[client] = "Alberto";
// console.log(company);




/** CREATION OF OBJECTS USING LITERAL SYNTAX.
 * BETTER WAY.
 */

var diunsa = { 
    name: "Diunsa",
    "stock of company": 110,
    CEO: {
        firstName: "Jorge",
        lastName: "Matute"
    },
    cliente: {
        name: "Alberto"
    }
};

console.log(diunsa);
console.log(diunsa.CEO.firstName);


