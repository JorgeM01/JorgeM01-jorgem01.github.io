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
  var allCategoriesURL =
    "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";
  var categoriesTitleHTML = "snippets/categories-title-snippet.html";
  var categoryHTML = "snippets/category-snippet.html";
  var menuItemsURL =
    "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/"; //! Hay que hacer un append. Por ejemplo "+= A.json".
  var menuItemsTitleHTML = "snippets/menu-items-title.html";
  var menuItemHTML = "snippets/menu-item.html";

  // Remove the class 'active' from home and switch to Menu button.
  var switchMenuToActive = function () {
    // Remove 'active' from home button.
    var classes = document.querySelector("#navHomeButton").className;
    classes = classes.replace(new RegExp("active", "g"), "");
    document.querySelector("#navHomeButton").className = classes;

    // Add 'active' to menu button if not already there.
    //! indexOf retorna -1 en caso de no encontrar a la clase que le pasemos.
    classes = document.querySelector("#navMenuButton").className;
    if (classes.indexOf("active") == -1) {
      classes += " active";
      document.querySelector("#navMenuButton").className = classes;
    }
  };

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

  /**
   * !La letra "g" se utiliza en la expresión regular como una "bandera" o "flag" para indicar
   * !que se debe buscar todas las ocurrencias de la cadena que coinciden con el patrón en lugar de
   * !solo la primera ocurrencia.
   * */
  // Return substitute of '{{propname}} with propValue is given 'string'.
  var insertProperty = function (string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    string = string.replace(
      new RegExp(propToReplace, "g", propValue),
      propValue
    );
    return string;
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

  // Load the categories.
  dc.loadMenuCategories = function () {
    switchMenuToActive();
    // Mientras cargan los recursos en caso de que sea lento, se mostrará el loading gif.
    showLoading("#main-content");
    //! No se le pasó ni true ni false porque por defecto es jason ya que vamos a sacar los elementos del link externo de la API.
    $ajaxUtils.sendGetRequest(allCategoriesURL, buildAndShowCategoriesHTML);
  };

  // Load the menu items view.
  // @categoryShort -> sería lo del append a la url como += "A.json".
  //! Recordar que ese append con .json es porque el link de la API cambió.
  //! Lo que iría en categoryShort sería el shortname que se pasó en el category-snippet.
  dc.loadMenuItems = function (categoryShort) {
    switchMenuToActive();
    showLoading("#main-content");
    //!console.log(menuItemsURL + categoryShort + ".json"); // PROBANDO.
    $ajaxUtils.sendGetRequest(
      menuItemsURL + categoryShort + ".json",
      buildAndShowMenuItemsHTML
    );
  };

  // Categories sería "responseHandler(JSON.parse(request.responseText));". O sea lo del argumento. Eso es del ajax.
  // Es similar a lo que ya había hecho antes. Aquí nada más se da por hecho que categories es ese parámetro que se definió antes.
  function buildAndShowCategoriesHTML(categories) {
    // Load title snippet of categories page.
    //! Si no me equivoco se hace mejor una dentro de la otra porque estamos trabajando con ajax y es asincrónico.
    $ajaxUtils.sendGetRequest(
      categoriesTitleHTML,
      function (categoriesTitle) {
        //! OJO: este categoriesTitleHTML aquí adentro sería otra cosa. Creo que era mejor si se cambiaba un poco el nombre.
        //! Mejor le cambié el nombre para poder diferencialos bien. Cualquier cosa revisar el source code.
        //! También modifiqué lo de categoryHTML. Uno con '_' y otro sin. Así los diferencio mejor.
        // Retrieve single category snippet.
        $ajaxUtils.sendGetRequest(
          categoryHTML,
          function (category_HTML) {
            //* Una vez tenemos todos los elementos, ya podemos empezar a unir cada cosa del html.
            var categoriesViewHTML = buildCategoriesViewHTML(
              categories,
              categoriesTitle,
              category_HTML
            );
            insertHtml("#main-content", categoriesViewHTML);
          },
          false
        );
      },
      false
    );
  }

  function buildCategoriesViewHTML(
    categories,
    categoriesTitleHTML,
    categoryHTML
  ) {
    var finalHTML = categoriesTitleHTML;
    finalHTML += "<section class='row'>";

    // Loop for categories.
    for (var i = 0; i < categories.length; i++) {
      // Insert category values.
      var html = categoryHTML;
      var name = "" + categories[i].name;
      var short_name = categories[i].short_name;
      // Es como un replace. Es la función que hicimos arriba.
      html = insertProperty(html, "name", name);
      html = insertProperty(html, "short_name", short_name);

      finalHTML += html;
    }

    finalHTML += "</section>";
    return finalHTML;
  }

  function buildAndShowMenuItemsHTML(categoryMenuItems) {
    // Load title snippet of menu items page.
    $ajaxUtils.sendGetRequest(
      menuItemsTitleHTML,
      function (menuItemsTitle_HTML) {
        //Retrive single menu item snippet.
        $ajaxUtils.sendGetRequest(
          menuItemHTML,
          function (menuItem_HTML) {
            //* Una vez tenemos todos los elementos, ya podemos empezar a unir cada cosa del html.
            var menuItemsViewHTML = buildMenuItemsViewHTML(
              categoryMenuItems,
              menuItemsTitle_HTML,
              menuItem_HTML
            );
            insertHtml("#main-content", menuItemsViewHTML);
          },
          false
        );
      },
      false
    );
  }

  // Build menu items view HTML to be inserted into page.
  function buildMenuItemsViewHTML(
    categoryMenuItems,
    menuItemsTitleHTML,
    menuItemHTML
  ) {
    menuItemsTitleHTML = insertProperty(
      menuItemsTitleHTML,
      "name",
      categoryMenuItems.category.name
    );
    menuItemsTitleHTML = insertProperty(
      menuItemsTitleHTML,
      "special_instructions",
      categoryMenuItems.category.special_instructions
    );

    var finalHTML = menuItemsTitleHTML;
    finalHTML += "<section class='row'>";

    // Loop over menu items.
    var menuItems = categoryMenuItems.menu_items;
    // Sería el código del producto, así como "A".
    var catShortName = categoryMenuItems.category.short_name;
    for (var i = 0; i < menuItems.length; i++) {
      // Insert menu item values.
      var html = menuItemHTML;
      html = insertProperty(html, "short_name", menuItems[i].short_name);
      html = insertProperty(html, "catShortName", catShortName);
      html = insertItemPrice(html, "price_small", menuItems[i].price_small);
      html = insertItemPortionName(
        html,
        "small_portion_name",
        menuItems[i].small_portion_name
      );
      html = insertItemPrice(html, "price_large", menuItems[i].price_large);
      html = insertItemPortionName(
        html,
        "large_portion_name",
        menuItems[i].large_portion_name
      );
      html = insertProperty(html, "name", menuItems[i].name);
      html = insertProperty(html, "description", menuItems[i].description);

      // Recordemos que en este menú dividimos todo en 2 usando el clearfix. O sea que después de dos,
      // se fueran para abajo, entonces usando esto se puede realizar eso. También se hubiera podido
      // con un contador y muchas otras formas.
      if (i % 2 != 0) {
        html +=
          "<div class='clearfix visible-md-block clearfix visible-lg-block'></div>";
      }

      finalHTML += html;
    }
    finalHTML += "</section>";
    return finalHTML;
  }

  //! Son dos funciones diferentes y aparte porque a veces a lo mejor el item no tiene un precio
  //! y no podemos dejarlo solo en blanco.
  // Appends portion name in parens if it exists
  function insertItemPortionName(html, portionPropName, portionValue) {
    // If not specified, return original string
    if (!portionValue) {
      return insertProperty(html, portionPropName, "");
    }

    portionValue = "(" + portionValue + ")";
    html = insertProperty(html, portionPropName, portionValue);
    return html;
  }

  // Appends price with '$' if price exists.
  function insertItemPrice(html, pricePropName, priceValue) {
    // If not specified replace with empty string.
    if (!priceValue) {
      return insertProperty(html, pricePropName, "");
    }

    //* toFixed significa que se le agregan dos decimales.
    priceValue = "$" + priceValue.toFixed(2);
    html = insertProperty(html, pricePropName, priceValue);
    return html;
  }

  global.$dc = dc;
})(window);
