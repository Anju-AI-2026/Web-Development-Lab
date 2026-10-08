// =========================================
// SWEET BAKERY
// SHOPPING CART
// =========================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ---------- Add Product to Cart ----------

function addToCart(name, price, image) {

    const existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart!");
}


// ---------- Connect Menu Buttons ----------

const cartButtons = document.querySelectorAll(".cart-btn");

cartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const productCard = button.closest(".menu-card");
        const image = productCard.querySelector("img").getAttribute("src");

        addToCart(name, price, image);

    });

});