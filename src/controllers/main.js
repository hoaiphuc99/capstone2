var dsSanPham = [];
var cart = [];
function getEle(id) {
    return document.getElementById(id)
}
var dssp = new productService();
function getListProduct() {
    dssp
        .getListProductApi()
        .then(function (result) {
            dsSanPham = result.data;
            renderHTML(result.data)
            console.log(result.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}
getListProduct();
function timkiem() {
    var loaidt = getEle("loaidt").value * 1;
    var timIphone = [];
    var timSamSung = [];
    switch (loaidt) {
        case 0:
            renderHTML(dsSanPham);
            break;
        case 1:
            dsSanPham.forEach(function (dienthoai, index) {
                if (dienthoai.type == "iphone") {
                    timIphone.push(dsSanPham[index]);
                }
            });
            renderHTML(timIphone);
            break;
        case 2:
            dsSanPham.forEach(function (dienthoai, index) {
                if (dienthoai.type == "Samsung") {
                    timSamSung.push(dsSanPham[index]);
                }
            });
            renderHTML(timSamSung);
            break;
    }
}
function renderHTML(data) {
    var content = "";

    data.forEach(function (product, index) {
        content += `
        <div class="card" style="width:400px">
                    <img class="card-img-top"
                        src=${product.img}
                        alt="Card image">
                    <div class="card-body">
                        <h4 class="card-title">${product.name}</h4>
                        <p class="card-text">Camera sau: ${product.backCamera}</p>
                        <p class="card-text">Thiết kế: ${product.desc}</p>
                        <p class="card-text">Camera trước: ${product.frontCamera}</p>
                        <p class="card-text">Giá: ${product.price}$</p>
                        <p class="card-text">Màn hình: ${product.screen}</p>
                        <div style="display:flex">
                        <a href="#" class="btn btn-primary">See More</a>
                        <button class="btn btn-warning" style="margin:10px" onclick="addcartItem(${product.id})">Thêm vào giỏ</button>
                        </div>
                    </div>
                </div>
    `;
    });
    getEle("listphone").innerHTML = content;
}

function addcartItem(index) {
    var cartItem = {};
    dsSanPham.forEach(function (dienthoai) {
        if (dienthoai.id * 1 == index) {
            cartItem = { product: { id: dienthoai.id, price: dienthoai.price, name: dienthoai.name, img: dienthoai.img }, quantity: 1 };
        }
    });
    addItemtoCart(cartItem);
}
function addItemtoCart(Item) {
    if (cart.length > 0) {
        cart.forEach(function (IteminCart) {
            if (IteminCart.product.id == Item.product.id) {
                IteminCart.quantity = IteminCart.quantity + 1;
            }
            else {
                cart.push(Item);
            }
        })
    }
    else {
        cart.push(Item);
    }
    console.log(cart);
}
getEle("cartphone").attributes.getNamedItem("value").value = "9";