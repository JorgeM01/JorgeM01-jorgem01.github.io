//! $ es lo mismo que document.addEventLister("DOMContentLoaded...")
//! Eso porque es de JQuery.
$(function () {
  //!Aquí el dolar también sirve como selector.
  //! document.querySelector("#navbarToggle").addEventLister("blur...
  //* navbarToggle es el id del botón.
  //* Blur es cuando pierde el foco un elemento.
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      //! Otra vez un select. Recodar que es porque estamos usando cosas de JQuery.
      //* Este es el id de todo nuestro menú. La lista.
      $("#collapsable-nav").collapse("hide");
    }
  });

  // In Firefox and Safari, the click event doesn't retain the focus
  // on the clicked button. Therefore, the blur event will not fire on
  // user clicking somewhere else in the page and the blur event handler
  // which is set up above will not be called.
  // Refer to issue #28 in the repo.
  // Solution: force focus on the element that the click event fired on
  $("#navbarToggle").click(function (event) {
    $(event.target).focus();
  });
});
