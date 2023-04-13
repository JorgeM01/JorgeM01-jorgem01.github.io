//! $ es lo mismo que document.addEventLister("DOMContentLoaded...")
//! Eso porque es de JQuery.
$(function () {
  //!Aquí el dolar también sirve como selector.
  //! document.querySelector("#navbarToggle").addEventLister("blur...
  //* navbarToggle es el id del botón.
  //* Blur es cuando pierde el foco un elemento.
  //* Entonces cuando se desenfoque, se activará ese listener.
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
  //! Evento de clic es asegurarse de que el botón tenga el foco después de que el usuario haga clic en él.
  //! Es como para forzarlo. Al parecer toca usarlo para que funcione también en celulares y algunso navegadores.
  $("#navbarToggle").click(function (event) {
    $(event.target).focus(); //! Forzamos el focus al darle click en él.
  });
});

//! Función para cargar el main content.
(function (global) {
  var dc = {};
  var homeHtml = "snippets/home-snippet.html";

  // Convinience function for inserting innerHTML for 'select'.
  var insertHtml = function (selector, html) {
    var targetElement = document.querySelector(selector);
    targetElement.innerHTML = html;
  };

  // Show loading icon inside element identified by 'selector'.
  var showLoading = function (selector) {
    var html = "<div class='text-center'>";
    html += "<img src='images/ajax-loader.gif'></div>";
    insertHtml(selector, html);
  };

  // On page load (before images or CSS).
  document.addEventListener("DOMContentLoaded", function (event) {
    showLoading("#main-content");
    //homeHtml sería la url. Recordar el parámetro.
    $ajaxUtils.sendGetRequest(
      homeHtml,
      function (responseText) {
        document.querySelector("#main-content").innerHTML = responseText;
      },
      false
    );
  });

  global.$dc = dc;
})(window);
