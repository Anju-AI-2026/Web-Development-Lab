const form = document.getElementById("numberForm");
const numberInput = document.getElementById("numberInput");
const output = document.getElementById("output");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const number = Number(numberInput.value);
});