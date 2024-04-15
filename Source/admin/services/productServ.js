const BASE_URL = "https://6602fd959d7276a75554c6bf.mockapi.io/Products";

var productServ = {
  getProduct: function () {
    return axios({
      url: BASE_URL,
      method: "GET",
    });
  },

  delProductByID: function (id) {
    return axios({
      url: `${BASE_URL}/${id}`,
      method: "DELETE",
    });
  },

  addProduct: function (sp) {
    return axios({
      url: BASE_URL,
      method: "POST",
      data: sp,
    });
  },

  getProductByID: function (id) {
    return axios({
      url: `${BASE_URL}/${id}`,
      method: "GET",
    });
  },

  updateProductByID: function (id, sp) {
    return axios({
      url: `${BASE_URL}/${id}`,
      method: "PUT",
      data: sp,
    });
  },
};
