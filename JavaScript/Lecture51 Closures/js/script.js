// Closures.
function makeMultiplier(multiplier) {
  // var multiplier = 2;
  function b() {
    console.log("Multiplier is: " + multiplier);
  }
  b();

  return function (x) {
    return multiplier * x;
  };
}

var doubleAll = makeMultiplier(2);
/**
 * !Básicamente la función del return de MakeMultiplier
 * !Se mantiene en el stack de ejecución, mientras que la
 * !función en sí, sí se va del stack de ejecución.
 * !Es por esa razón que podemos seguir usando la variable
 * *multiplier
 * !de la función makeMultipler.
 * */
console.log(doubleAll(10)); // its own execution environment.
