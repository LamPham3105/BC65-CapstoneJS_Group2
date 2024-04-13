function renderProductList(productsList) {
  var content = "";

  for (let i = 0; i < productsList.length; i++) {
    var product = productsList[i];

    var contentTr = `
    <div class="col-4 products__item">
      <div class="card">
        <img
          src="${product.img}"
          class="card-img-top"
          alt="${product.name}"
        />
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <h5 class="card-title">${product.name}</h5>
            <p>${product.price}</p>
          </div>
          <p class="card-text text-truncate">${product.desc}</p>
          <div class="d-flex justify-content-between">
            <a href="#" class="button-buy" onclick="buyProduct('${product.id}')"
              ><i class="fa fa-shopping-cart icon-cart"></i>Mua hàng</a
            >
          </div>
        </div>
      </div>
    </div>   
    `;

    content += contentTr;
  }

  // In danh sách ra giao diện
  document.querySelector("#data-container").innerHTML = content;
}

const DEFAULT_SELECT = "Chọn loại sản phẩm";

function renderDropButton(productsList) {
  var arrType = [];

  var selectType = document.querySelector("#type");
  var opt = document.createElement("option");
  opt.value = DEFAULT_SELECT;
  opt.innerHTML = DEFAULT_SELECT;
  selectType.appendChild(opt);

  for (let i = 0; i < productsList.length; i++) {
    var type = productsList[i].type;
    const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);

    var idx = arrType.findIndex((a) => a.toUpperCase() === type.toUpperCase());

    if (idx === -1) {
      var opt = document.createElement("option");
      opt.value = capitalizedType;
      opt.innerHTML = capitalizedType;
      selectType.appendChild(opt);
      arrType.push(capitalizedType);
    }
  }
}

function renderProductByType(productsList, typeProduct) {
  if (DEFAULT_SELECT === typeProduct) {
    return productsList;
  }

  var productListByType = [];

  for (let i = 0; i < productsList.length; i++) {
    const product = productsList[i];

    if (product.type.toUpperCase() === typeProduct.toUpperCase()) {
      productListByType.push(product);
    }
  }

  return productListByType;
}

function renderProductsCart(shopCarts) {
  var content = "";

  for (let i = 0; i < shopCarts.length; i++) {
    var product = shopCarts[i].product;
    var quality = shopCarts[i].quality;

    var contentTr = `
    <li class="productCart">
      <a href="#" class="productCart-link">
        <span class="productCart-image">
          <img
            src=${product.img}
            alt=${product.name}
          />
        </span>
        <span class="productCart-details">
          <h3>${product.name}</h3>
          <span class="qty-price">
            <span class="qty">
              <button class="minus-button" id="minus-button-1" onclick="subQualityProduct('${product.id}')">
                -
              </button>
              <input
                type="number"
                id="qty-input-1"
                class="qty-input"
                step="1"
                min="1"
                max="1000"
                name="qty-input"
                value=${quality}
                pattern="[0-9]*"
                title="Quantity"
                inputmode="numeric"
              />
              <button class="plus-button" id="plus-button-1" onclick="plusQualityProduct('${product.id}')">+</button>
              <input
                type="hidden"
                name="item-price"
                id="item-price-1"
                value="12.00"
              />
            </span>
            <span class="price">${product.price}</span>
          </span>
        </span>
      </a>
      <a href="#remove" class="remove-button" onclick="removeQualityProductCart('${product.id}')"
        ><span class="remove-icon">X</span></a
      >
    </li> 
    `;

    content += contentTr;
  }

  // In danh sách ra giao diện
  document.querySelector(".productCarts").innerHTML = content;
}

function processProductCart(shopCarts, product) {
  if (shopCarts.length == 0) {
    addProductCart(shopCarts, product);
    return;
  }

  var idx = shopCarts.findIndex((a) => a.product.id === product.id);

  if (idx !== -1) {
    shopCarts[idx].quality++;
  } else {
    addProductCart(shopCarts, product);
  }
}

function addProductCart(shopCarts, product) {
  shopCarts.push(new CartItem(product, 1));
}

function removeProductCart(shopCarts, id) {
  var idx = shopCarts.findIndex((a) => a.product.id === id);

  if (idx === -1) {
    return;
  }

  shopCarts.splice(idx, 1);
}

function updateCountProductCart(shopCarts) {
  var count = 0;

  if (shopCarts.length != 0) {
    count = shopCarts.length;
  }

  document.querySelector(".count").innerHTML = count;
  document.querySelector(".bag-count").innerHTML = count;
}

function totalMoneyProductCart(shopCarts) {
  var total = 0;

  if (shopCarts.length != 0) {
    for (let i = 0; i < shopCarts.length; i++) {
      var product = shopCarts[i].product;
      var quality = shopCarts[i].quality;

      total += product.price * quality;
    }
  }

  document.querySelector(".amount").innerHTML = total;
}

const KEY = "SHOPCART_LOCAL";

function saveLocalStorage(shopCarts) {
  var dataJson = JSON.stringify(shopCarts);
  console.log("dataJson: ", dataJson);
  localStorage.setItem(KEY, dataJson);
}

function removeLocalStorage() {
  localStorage.removeItem(KEY);
}

function getLocalStorage() {
  return localStorage.getItem(KEY);
}
