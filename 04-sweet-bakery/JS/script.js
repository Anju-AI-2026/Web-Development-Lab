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