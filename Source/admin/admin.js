function fetchProductList() {
  productServ
    .getProduct()
    .then(function (response) {
      renderProductList(response.data);
    })
    .catch(function (err) {
      console.log("err: ", err);
    });
}

fetchProductList();

function showForm() {
  processForm(true);
}

function processForm(isAdded) {
  resetForm("#myModal");
  getEle("#updateProduct").style.display = isAdded ? "none" : "block";
  getEle("#addProduct").style.display = isAdded ? "block" : "none";
  getEle(".modal-title").innerHTML = isAdded ? "Thêm sản phẩm" : "Sửa sản phẩm";
}

function isQualifiedForm(sp) {
  var isInValidTenSPInput = checkTenSPInput(sp);

  var isInValidPriceInput = checkPriceInput(sp);

  var isInValidScreenInput = checkScreenInput(sp);

  var isInValidBackCameraSPInput = checkBackCameraSPInput(sp);

  var isInValidFrontCameraSPInput = checkFrontCameraSPInput(sp);

  var isInValidImageInput = checkImageInput(sp);

  var isInValidDecsInput = checkDecsInput(sp);

  var isInValidTypeSPInput = checkTypeSPInput(sp);

  var isInValidForm =
    isInValidTenSPInput ||
    isInValidPriceInput ||
    isInValidScreenInput ||
    isInValidBackCameraSPInput ||
    isInValidFrontCameraSPInput ||
    isInValidImageInput ||
    isInValidDecsInput ||
    isInValidTypeSPInput;

  return !isInValidForm;
}

function addProduct() {
  var sp = getDataFromForm();
  var isValidForm = isQualifiedForm(sp);

  if (isValidForm) {
    productServ
      .addProduct(sp)
      .then(function (response) {
        fetchProductList();
        $("#myModal").modal("hide");
      })
      .catch(function (err) {
        console.log("err: ", err);
      });
  }
}

function editProduct(id) {
  processForm(false);

  productServ
    .getProductByID(id)
    .then(function (response) {
      showDataInForm(response.data);
    })
    .catch(function (err) {
      console.log("err: ", err);
    });
}

function updateProduct() {
  var sp = getDataFromForm();
  var isValidForm = isQualifiedForm(sp);

  if (isValidForm) {
    productServ
      .updateProductByID(sp.id, sp)
      .then(function (response) {
        fetchProductList();
        $("#myModal").modal("hide");
      })
      .catch(function (err) {
        console.log("err: ", err);
      });
  }
}

function delProduct(id) {
  productServ
    .delProductByID(id)
    .then(function (response) {
      fetchProductList();
    })
    .catch(function (err) {
      console.log("err: ", err);
    });
}

function searchProductByName() {
  var textSearch = getEle("#txtSearch").value;

  var resultSearch = [];

  if (textSearch.length > 0) {
    productServ
      .getProduct()
      .then(function (response) {
        var productsList = response.data;

        resultSearch = productsList.filter(function (sp) {
          return sp.name.toUpperCase().includes(textSearch.toUpperCase());
        });

        renderProductList(resultSearch);
      })
      .catch(function (err) {
        console.log("err: ", err);
      });
  } else {
    fetchProductList();
  }
}

const INCREASE = "increase";
const DECREASE = "decrease";

function arrangeSPByPrice() {
  var nameArrange = document.getElementById("arrangeSP").value;

  if (nameArrange !== "") {
    productServ
      .getProduct()
      .then(function (response) {
        var productList = response.data;

        var resultSearch = productList;

        resultSearch = productList.sort((spA, spB) => {
          if (nameArrange === INCREASE) {
            return spA.price - spB.price;
          } else {
            return spB.price - spA.price;
          }
        });

        renderProductList(resultSearch);
      })
      .catch(function (err) {
        console.log("err: ", err);
      });
  } else {
    fetchProductList();
  }
}
