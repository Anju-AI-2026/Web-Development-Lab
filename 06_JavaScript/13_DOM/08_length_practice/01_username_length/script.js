const form = document.getElementById("usernameForm");

const usernameInput = document.getElementById("username");

const message = document.getElementById("message");

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const username = usernameInput.value;

    if (username.length === 0) {

        message.textContent = "Please enter a username.";

    } else if (username.length < 5) {

        message.textContent = "Username must contain at least 5 characters.";

    } else {

        message.textContent = "Username is valid.";

    }
    
});