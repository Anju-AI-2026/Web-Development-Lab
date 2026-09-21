const form = document.getElementById("studentForm");

const input = document.getElementById("nameInput");

const message = document.getElementById("message");


form.addEventListener("submit", function (event) {

    event.preventDefault();

    if (input.value === "") {

        message.textContent = "Please enter your name.";

    } else {

        message.textContent = "Name entered successfully.";

    }

});