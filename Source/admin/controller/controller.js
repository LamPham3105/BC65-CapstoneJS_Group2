let lengthSP = 0;

function renderProductList(productsList) {
  var content = "";
  lengthSP = productsList.length;

  for (let i = 0; i < productsList.length; i++) {
    var product = productsList[i];

    var contentTr = `
          <tr>
              <td>${product.id}</td>
              <td>${product.name}</td>
              <td>${product.price}</td>
              <td><img src="${product.img}" alt="" style = "width: 200px" /></td>
              <td>${product.desc}</td>
              <td>
                  <button class="btn btn-warning" onclick="editProduct('${product.id}')" data-toggle="modal" data-target="#myModal">Sửa</button>
                  <button class="btn btn-danger" onclick="delProduct('${product.id}')">Xóa</button>
              </td>
          </tr>`;

    content += contentTr;
  }

  // in danh sách ra giao diện
  getEle("#tableProductList").innerHTML = content;
  showPage(0);
}

function getDataFromForm() {
  var name = getEle("#TenSP").value;
  var price = getEle("#GiaSP").value;
  var screen = getEle("#ScreenSP").value;
  var backCamera = getEle("#BackCameraSP").value;
  var frontCamera = getEle("#FrontCameraSP").value;
  var img = getEle("#HinhSP").value;
  var desc = getEle("#MoTaSP").value;
  var type = getEle("#LoaiSP").value;

  return new Product(
    "",
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );
}

const itemsPerPage = 5;
let page = 0;
let indexFirst = 0;

function showPage(index) {
  const table = getEle(".productTable");
  const rows = table.tBodies[0].rows;

  var numberDivison = Math.floor(lengthSP / itemsPerPage);

  if (index < 0) {
    page = indexFirst = 0;
  } else if (index >= numberDivison) {
    page = numberDivison;
    if (lengthSP / itemsPerPage === numberDivison) {
      page = numberDivison - 1;
    }
    indexFirst = page * 5;
  } else {
    page = index;
    indexFirst = page * 5;
  }

  for (let i = 0; i < rows.length; i++) {
    if (i >= indexFirst && i < indexFirst + itemsPerPage) {
      rows[i].style.display = "table-row";
    } else {
      rows[i].style.display = "none";
    }
  }
}

function resetForm(id) {
  getEle("#TenSP").innerHTML = "";
  getEle("#tbTenSP").innerHTML = "";
  displayField("#tbTenSP", "none");

  getEle("#GiaSP").innerHTML = "";
  getEle("#tbGiaSP").innerHTML = "";
  displayField("#tbGiaSP", "none");

  getEle("#ScreenSP").innerHTML = "";
  getEle("#tbScreenSP").innerHTML = "";
  displayField("#tbScreenSP", "none");

  getEle("#BackCameraSP").innerHTML = "";
  getEle("#tbBackCameraSP").innerHTML = "";
  displayField("#tbBackCameraSP", "none");

  getEle("#FrontCameraSP").innerHTML = "";
  getEle("#tbFrontCameraSP").innerHTML = "";
  displayField("#tbFrontCameraSP", "none");

  getEle("#HinhSP").innerHTML = "";
  getEle("#tbHinhSP").innerHTML = "";
  displayField("#tbHinhSP", "none");

  getEle("#MoTaSP").innerHTML = "";
  getEle("#tbMoTaSP").innerHTML = "";
  displayField("#tbMoTaSP", "none");

  getEle("#tbLoaiSP").innerHTML = "";
  displayField("#tbLoaiSP", "none");
}

function displayField(id, value) {
  getEle(id).style.display = value;
}

function showDataInForm(sp) {
  getEle("#TenSP").value = sp.name;
  getEle("#GiaSP").value = sp.price;
  getEle("#ScreenSP").value = sp.screen;
  getEle("#BackCameraSP").value = sp.backCamera;
  getEle("#FrontCameraSP").value = sp.frontCamera;
  getEle("#HinhSP").value = sp.img;
  getEle("#MoTaSP").value = sp.desc;

  const capitalizedType = sp.type.charAt(0).toUpperCase() + sp.type.slice(1);
  getEle("#LoaiSP").value = capitalizedType;
}

function showArrMessErr(mess, isShow, idMess) {
  var messErr = "";
  for (let i = 0; i < mess.length; i++) {
    if (mess[i] !== "") {
      messErr += (messErr !== "" ? "<br />" : "") + mess[i];
    }
  }

  displayField(idMess, isShow ? "block" : "none");
  showErrMessage(isShow, idMess, messErr);
}

/*--------------- Validation ---------------*/
function checkTenSPInput(sp) {
  var idMess = "#tbTenSP",
    mess = [],
    isShow = false;

  var name = sp.name;
  if (isEmpty(name)) {
    mess.push("Tên sản phẩm không thể để trống");
    isShow = true;
  }

  showArrMessErr(mess, isShow, idMess);

  return isShow;
}

function checkPriceInput(sp) {
  var idMess = "#tbGiaSP",
    mess = [],
    isShow = false;

  var price = sp.price;

  if (isEmpty(price)) {
    mess.push("Giá không thể để trống");
    isShow = true;
  }

  var isValidPrice = isNumber(price);
  if (!isValidPrice) {
    mess.push("Giá chỉ có thể là số");
    isShow = true;
  }

  if (!isInRange(!isValidPrice ? "" : Number.parseFloat(price), 0, 20000)) {
    mess.push("Giá chỉ được từ 0 tới 20000");
    isShow = true;
  }

  showArrMessErr(mess, isShow, idMess);
  return isShow;
}

function checkScreenInput(sp) {
  var idMess = "#tbScreenSP",
    mess = [],
    isShow = false;

  if (isEmpty(sp.screen)) {
    mess.push("Kích thước màn hình không thể để trống");
    isShow = true;
  }

  showArrMessErr(mess, isShow, idMess);
  return isShow;
}

function checkBackCameraSPInput(sp) {
  var idMess = "#tbBackCameraSP",
    mess = [],
    isShow = false;

  if (isEmpty(sp.backCamera)) {
    mess.push("Camera sau không thể để trống");
    isShow = true;
  }

  showArrMessErr(mess, isShow, idMess);
  return isShow;
}

function checkFrontCameraSPInput(sp) {
  var idMess = "#tbFrontCameraSP",
    mess = [],
    isShow = false;

  if (isEmpty(sp.frontCamera)) {
    mess.push("Camera trước không thể để trống");
    isShow = true;
  }

  showArrMessErr(mess, isShow, idMess);
  return isShow;
}

function checkImageInput(sp) {
  var idMess = "#tbHinhSP",
    mess = [],
    isShow = false;

  var img = sp.img;

  if (isEmpty(img)) {
    mess.push("Hình ảnh không thể để trống");
    isShow = true;
  }

  //   if (isImgUrl(img)) {
  //     mess.push("Hình ảnh không đúng định dạng");
  //     isShow = true;
  //   }

  showArrMessErr(mess, isShow, idMess);
  return isShow;
}

function checkDecsInput(sp) {
  var idMess = "#tbMoTaSP",
    mess = [],
    isShow = false;

  if (isEmpty(sp.desc)) {
    mess.push("Mô tả không thể để trống");
    isShow = true;
  }

  showArrMessErr(mess, isShow, idMess);
  return isShow;
}

function checkTypeSPInput(sp) {
  var idMess = "#tbLoaiSP",
    mess = [],
    isShow = false;

  if (isEmpty(sp.type)) {
    mess.push("Loại sản phẩm không thể để trống");
    isShow = true;
  }

  showArrMessErr(mess, isShow, idMess);
  return isShow;
}
