/*--------------------Cart-------------------*/
$(document).ready(function ($) {
  // Declare the body variable
  var $body = $("body");

  // Function that shows and hides the sidebar cart
  $(".cart-button, .close-button, #sidebar-cart-curtain").click(function (e) {
    e.preventDefault();

    // Add the show-sidebar-cart class to the body tag
    $body.toggleClass("show-sidebar-cart");

    // // Check if the sidebar curtain is visible
    // if ($("#sidebar-cart-curtain").is(":visible")) {
    //   // Hide the curtain
    //   $("#sidebar-cart-curtain").fadeOut(500);
    // } else {
    //   // Show the curtain
    //   $("#sidebar-cart-curtain").fadeIn(500);
    // }
  });

  // Function that adds or subtracts quantity when a
  // plus or minus button is clicked
  $body.on("click", ".plus-button, .minus-button", function () {
    // Get quanitity input values
    var qty = $(this).closest(".qty").find(".qty-input");
    var val = parseFloat(qty.val());
    var max = parseFloat(qty.attr("max"));
    var min = parseFloat(qty.attr("min"));
    var step = parseFloat(qty.attr("step"));

    // Check which button is clicked
    if ($(this).is(".plus-button")) {
      // Increase the value
      qty.val(val + step);
    } else {
      // Check if minimum button is clicked and that value is
      // >= to the minimum required
      if (min && min >= val) {
        // Do nothing because value is the minimum required
        qty.val(min);
      } else if (val > 0) {
        // Subtract the value
        qty.val(val - step);
      }
    }
  });
});

/*--------------------Pagination-------------------*/
const cardsPerPage = 6; // Number of cards to show per page

const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let currentPage = 1;

var dataContainer, pagination, cards, totalPages;

function getDataCard() {
  dataContainer = document.getElementById("data-container");

  cards = Array.from(dataContainer.getElementsByClassName("card"));

  // Calculate the total number of pages
  totalPages = Math.ceil(cards.length / cardsPerPage);
}

// Function to display cards for a specific page
function displayPage(page) {
  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  cards.forEach((card, index) => {
    if (index >= startIndex && index < endIndex) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// Function to update pagination buttons and page numbers
function updatePagination() {
  prevButton.style.display = currentPage === 1 ? "none" : "block";
  nextButton.style.display = currentPage === totalPages ? "none" : "block";
}

// Event listener for "Previous" button
prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    getDataCard();
    displayPage(currentPage);
    updatePagination();
  }
});

// Event listener for "Next" button
nextButton.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    getDataCard();
    displayPage(currentPage);
    updatePagination();
  }
});

/*--------------------Load Data-------------------*/
var productList = new Product();

function fetchProductList() {
  productServ
    .getProduct()
    .then(function (response) {
      renderProductList(response.data);
      renderDropButton(response.data);
      getDataCard();
      displayPage(currentPage);
      updatePagination();
    })
    .catch(function (err) {
      console.log("err: ", err);
    });
}

fetchProductList();

function handleType() {
  var typeProduct = document.getElementById("type").value;

  productServ
    .getProduct()
    .then(function (response) {
      var productListByType = renderProductByType(response.data, typeProduct);
      renderProductList(productListByType);
      getDataCard();
      displayPage(currentPage);
      updatePagination();
    })
    .catch(function (err) {
      console.log("err: ", err);
    });
}

/*--------------------Buy Product-------------------*/
function hideShowTotal(quailifed) {
  document.querySelector("#sidebar-cart .totals").style.display = quailifed
    ? "block"
    : "none";
  document.querySelector("#sidebar-cart .action-buttons").style.display =
    quailifed ? "block" : "none";
}

var shopCarts = [];

function getProductCartOnLocal() {
  var jsonData = JSON.parse(getLocalStorage());
  if (jsonData === "") {
    return;
  }
  console.log("jsonData: ", jsonData);

  shopCarts = jsonData.map(function (item) {
    // item: phần tử của array trong các lần lặp
    return new CartItem(
      new Product(
        item.product.id,
        item.product.name,
        item.product.price,
        item.product.screen,
        item.product.backCamera,
        item.product.frontCamera,
        item.product.img,
        item.product.desc,
        item.product.type
      ),
      item.quality
    );
  });

  renderProductsCart(shopCarts);
  updateCountProductCart(shopCarts);
  totalMoneyProductCart(shopCarts);
  hideShowTotal(shopCarts.length != 0);
}

getProductCartOnLocal();
hideShowTotal(shopCarts.length != 0);

function buyProduct(id) {
  productServ
    .getProductByID(id)
    .then(function (response) {
      processProductCart(shopCarts, response.data);
      renderProductsCart(shopCarts);
      updateCountProductCart(shopCarts);
      totalMoneyProductCart(shopCarts);
      hideShowTotal(shopCarts.length != 0);
      saveLocalStorage(shopCarts);
    })
    .catch(function (err) {
      console.log("err: ", err);
    });
}

function subQualityProduct(id) {
  var idx = shopCarts.findIndex((a) => a.product.id === id);

  if (idx === -1) {
    return;
  }

  var quality = shopCarts[idx].quality;
  quality--;

  if (quality <= 0) {
    removeProductCart(shopCarts, id);
    renderProductsCart(shopCarts);
  } else {
    shopCarts[idx].quality--;
  }

  updateCountProductCart(shopCarts);
  totalMoneyProductCart(shopCarts);
  hideShowTotal(shopCarts.length != 0);

  if (shopCarts.length == 0) {
    removeLocalStorage();
  } else {
    saveLocalStorage(shopCarts);
  }
}

function plusQualityProduct(id) {
  var idx = shopCarts.findIndex((a) => a.product.id === id);

  if (idx === -1) {
    return;
  }

  shopCarts[idx].quality++;
  updateCountProductCart(shopCarts);
  totalMoneyProductCart(shopCarts);
  hideShowTotal(shopCarts.length != 0);
  if (shopCarts.length == 0) {
    removeLocalStorage();
  } else {
    saveLocalStorage(shopCarts);
  }
}

function removeQualityProductCart(id) {
  removeProductCart(shopCarts, id);
  renderProductsCart(shopCarts);
  updateCountProductCart(shopCarts);
  totalMoneyProductCart(shopCarts);
  hideShowTotal(shopCarts.length != 0);
  if (shopCarts.length == 0) {
    removeLocalStorage();
  } else {
    saveLocalStorage(shopCarts);
  }
}

document.querySelector("#checkOutProduct").onclick = function () {
  shopCarts = [];
  renderProductsCart(shopCarts);
  updateCountProductCart(shopCarts);
  totalMoneyProductCart(shopCarts);
  hideShowTotal(shopCarts.length != 0);
  removeLocalStorage();
};
