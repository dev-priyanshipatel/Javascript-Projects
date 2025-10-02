const productsArr = [
  {
    productId: 1,
    productName: "Urban Comfort Chair",
    productPrice: 80,
    productImage: "../assets/photos/product-1.webp",
  },

  {
    productId: 2,
    productName: "Trendy Carrybag",
    productPrice: 137,
    productImage: "../assets/photos/product-2.webp",
  },

  {
    productId: 3,
    productName: "RelaxNest Swing",
    productPrice: 90,
    productImage: "../assets/photos/product-3.webp",
  },

  {
    productId: 4,
    productName: "Everyday Backpack",
    productPrice: 80,
    productImage: "../assets/photos/product-4.webp",
  },

  {
    productId: 5,
    productName: "Comfort Lounge Chair",
    productPrice: 100,
    productImage: "../assets/photos/product-5.webp",
  },

  {
    productId: 6,
    productName: "Prestige Glow",
    productPrice: 90,
    productImage: "../assets/photos/product-6.webp",
  },

  {
    productId: 7,
    productName: "BrightEase Lamp",
    productPrice: 190,
    productImage: "../assets/photos/product-7.webp",
  },

  {
    productId: 8,
    productName: "Street Luxe Leather",
    productPrice: 132,
    productImage: "../assets/photos/product-8.webp",
  },
];


let productEle = document.getElementById("productlist");
let itemCount = document.getElementById("item-count");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function productDisplay(){
    let productList = "";

    productsArr.forEach((product,) => {
        productList += `
            <div class="col-lg-3 col-md-6 gx-5 gy-3">
                    <div class="product-container ">
                        <div class="mb-3">
                            <img src="${product.productImage}" alt="productimage" class="img-fluid" >
                        </div>
                        <div class="d-flex justify-content-between p-3">
                            <div class="mb-3">
                                <h5 class="product-title fst-italic">${product.productName}</h5>   
                                <h4 class="product-price fw-bold">$${product.productPrice}</h4>
                            </div>
                            <button class = "cart fs-3" onclick = "addToCart(${product.productId})">
                                <i class="ri-shopping-bag-2-line"></i>
                            </button>
                        </div>
                    </div>
                </div>`;
    }); 

    productEle.innerHTML = productList;

}
updateCartItem();

function updateCartItem(){
    itemCount.innerHTML = cart.length;
}

function addToCart(productId) {
  let product = productsArr.find((pro) => {
    return pro.productId == productId;
  });

  let idx = cart.findIndex((pro) => {
      return pro.productId == productId;
  })

  if(idx == -1){
    product.quantity = 1;
    cart.push(product);
  }else{
  cart[idx].quantity += 1;
  }

  
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartItem();

}

document.addEventListener("DOMContentLoaded", function(){
    productDisplay();
    updateCartItem();
})