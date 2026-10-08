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


// =========================================
// CART PRODUCT SLIDER
// =========================================

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


// =========================================
// CONTACT FORM
// =========================================

// ---------- Load Saved Messages ----------

let contactMessages =
    JSON.parse(localStorage.getItem("contactMessages")) || [];


// ---------- Contact Form ----------

const contactForm = document.querySelector("#contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document.querySelector("#name").value.trim();

        const email =
            document.querySelector("#email").value.trim();

        const message =
            document.querySelector("#message").value.trim();


        // ---------- Validation ----------

        if (name === "" || email === "" || message === "") {

            alert("Please fill in all fields.");

            return;
        }


        // ---------- Create Message ----------

        const newMessage = {

            name: name,
            email: email,
            message: message

        };


        // ---------- Add Message ----------

        contactMessages.push(newMessage);


        // ---------- Save Messages ----------

        localStorage.setItem(
            "contactMessages",
            JSON.stringify(contactMessages)
        );


        // ---------- Success ----------

        alert("Your message has been sent successfully! ❤️");


        // ---------- Clear Form ----------

        contactForm.reset();

    });

}


// =========================================
// VIEW SAVED MESSAGES
// =========================================

const viewMessagesBtn =
    document.querySelector("#viewMessagesBtn");

const savedMessages =
    document.querySelector("#savedMessages");


if (viewMessagesBtn && savedMessages) {

    viewMessagesBtn.addEventListener("click", function() {


        // ---------- Hide Messages ----------

        if (savedMessages.innerHTML !== "") {

            savedMessages.innerHTML = "";

            viewMessagesBtn.textContent =
                "View Saved Messages";

            return;
        }


        // ---------- No Messages ----------

        if (contactMessages.length === 0) {

            savedMessages.innerHTML = `
                <div class="saved-message-empty">

                    <p>No saved messages yet.</p>

                </div>
            `;

            viewMessagesBtn.textContent =
                "Hide Saved Messages";

            return;
        }


        // ---------- Clear Previous Display ----------

        savedMessages.innerHTML = "";


        // ---------- Display All Messages ----------

        contactMessages.forEach(function(item, index) {

            const messageCard =
                document.createElement("div");

            messageCard.className =
                "saved-message-card";


            messageCard.innerHTML = `

                <h3>
                    Message ${index + 1}
                </h3>

                <p>
                    <strong>Name:</strong>
                    ${item.name}
                </p>

                <p>
                    <strong>Email:</strong>
                    ${item.email}
                </p>

                <p>
                    <strong>Message:</strong>
                    ${item.message}
                </p>

            `;


            savedMessages.appendChild(messageCard);

        });


        // ---------- Change Button ----------

        viewMessagesBtn.textContent =
            "Hide Saved Messages";

    });

}