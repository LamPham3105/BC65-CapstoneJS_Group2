function isEmpty(value) {
  return value.trim() === "";
}

function showErrMessage(isShow, idErr, message) {
  if (isShow) {
    getEle(idErr).innerHTML = message;
  } else {
    getEle(idErr).innerHTML = "";
  }
}

function isNumber(value) {
  const re = /^[0-9]+$/;
  return re.test(value);
}

function isInRange(value, min, max) {
  return value >= min && value <= max;
}

function isWord(value) {
  const re =
    /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\ ]+$/;
  return re.test(value);
}

function isImgUrl(url) {
  const re = /(https?:\/\/.*\.(?:png|jpg))/;
  return re.test(url);
}
