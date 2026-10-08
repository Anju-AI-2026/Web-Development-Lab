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

// ---------- Cart Product Slider ----------

let currentProduct = 0;

function displayCart() {

    const cartItems = document.querySelector(".cart-items");

    if (!cartItems || cart.length === 0) {
        return;
    }

    const item = cart[currentProduct];

    cartItems.innerHTML = `
        <h2>Your Items</h2>

        <div class="cart-item">
            <h3>${item.name}</h3>
            <p>₹${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
        </div>

        <div class="cart-navigation">
            <button onclick="previousProduct()">← Previous</button>
            <button onclick="nextProduct()">Next →</button>
        </div>
    `;
}

function nextProduct() {

    currentProduct++;

    if (currentProduct >= cart.length) {
        currentProduct = 0;
    }

    displayCart();
}

function previousProduct() {

    currentProduct--;

    if (currentProduct < 0) {
        currentProduct = cart.length - 1;
    }

    displayCart();
}

displayCart();