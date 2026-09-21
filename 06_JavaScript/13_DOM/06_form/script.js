
const form = document.getElementById("studentForm");

const input = document.getElementById("nameInput");

const output = document.getElementById("output");


form.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = input.value;

    output.textContent = `Hello ${name}!`;

});