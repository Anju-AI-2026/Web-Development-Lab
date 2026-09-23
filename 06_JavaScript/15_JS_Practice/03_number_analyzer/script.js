const form = document.getElementById("numberForm");
const numberInput = document.getElementById("numberInput");
const output = document.getElementById("output");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const number = Number(numberInput.value);

    if (number === 0) {
        output.textContent = "The number is zero.";
    } else if (number > 0) {
        output.textContent = "The number is positive.";
    } else {
        output.textContent = "The number is negative.";
    }
});