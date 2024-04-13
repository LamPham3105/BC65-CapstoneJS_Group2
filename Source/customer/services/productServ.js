const BASE_URL = "https://6602fd959d7276a75554c6bf.mockapi.io/Products";

var productServ = {
  getProduct: function () {
    return axios({
      url: BASE_URL,
      method: "GET",
    });
  },

  getProductByID: function (id) {
    return axios({
      url: `${BASE_URL}/${id}`,
      method: "GET",
    });
  },
};
