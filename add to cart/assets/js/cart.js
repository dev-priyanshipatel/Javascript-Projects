const cartCounter = document.getElementById("item-count");
const cartCotainer = document.getElementById("cart-container");
const mainTotal = document.getElementById("main-total");
let cart = JSON.parse(localStorage.getItem("cart")) || [];


document.addEventListener("DOMContentLoaded", function(){
    cartCounter.innerHTML = cart.length;

    cart.forEach((pro, idx) => {
        let subTotal = pro.productPrice * pro.quantity;
        let sum = 0;
      
      cartCotainer.innerHTML += `
        <div class="col-2">
            <div>
                <img src="${pro.productImage}" alt="${pro.productName}" class="img-fluid">
            </div>
        </div>
        <div class="col-4">
            <div>
                <h4 class="product-title fst-italic">${pro.productName}</h4>
            </div>
        </div>
        <div class="col-3">
            <div class="d-flex align-items-center">
                <button class="btn qty-btn text-white fw-bold">+</button>
                <h4 class="mx-3 pb-0 fs-4">${pro.quantity}</h4>
                <button class="btn qty-btn text-white fw-bold">-</button>
            </div>
        </div>
        <div class="col-3">
            <div class="d-flex justify-content-between">
                <h4 class=" fw-bold">$${pro.productPrice}</h4>
                <h4 class="text-success">$${subTotal}</h4>
            </div>
        </div>
        `;

        mainTotal.innerHTML = `$${sum}`;
    });
})
