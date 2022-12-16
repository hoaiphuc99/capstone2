function productService() {
    this.getListProductApi = function () {
        return axios({
            url: "https://638f36344ddca317d7f19baf.mockapi.io/Products",
            method: "GET",
        });
    }
}