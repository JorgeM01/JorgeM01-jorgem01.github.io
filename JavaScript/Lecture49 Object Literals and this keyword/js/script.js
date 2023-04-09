//* Objects literals and "this".
var literalCircle = {
  //! Es como poner new Object. Por eso el this se refiere al objeto en sí en este caso.
  radius: 10,
  getArea: function () {
    //console.log(this);
    return Math.PI * Math.pow(this.radius, 2);
  },
};

console.log(literalCircle.getArea());

/**
 * Para casos donde tenemos una función dentro de una función
 * en un objeto.
 */

var literalCircle2 = {
  //! Es como poner new Object. Por eso el this se refiere al objeto en sí en este caso.
  radius: 10,

  getArea: function () {
    var self = this; //! De esta forma, el this después no se va al objeto global window dentro de una función dentro de una función, o sea este caso.
    console.log(this);

    var increaseRadius = function () {
      self.radius = 20;
    };

    console.log("Old radius: " + self.radius);
    increaseRadius();
    console.log("New radius: " + this.radius);
    return Math.PI * Math.pow(this.radius, 2);
  },
};

console.log(literalCircle2.getArea());
