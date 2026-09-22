const form = document.getElementById("emailForm");

const emailInput = document.getElementById("emailInput");

const message = document.getElementById("message");

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = emailInput.value;

    if (email === "") {

        message.textContent = "Please enter your email.";

    } else if (!email.includes("@")) {

        message.textContent = "Please enter a valid email.";

    } else {

        message.textContent = "Email is valid.";

    }
    
});