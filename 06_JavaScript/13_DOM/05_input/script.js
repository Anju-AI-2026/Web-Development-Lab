
const input = document.getElementById("nameInput");

const output = document.getElementById("output");

input.addEventListener("input", function () {

    const name = input.value;

    output.textContent = name;

});