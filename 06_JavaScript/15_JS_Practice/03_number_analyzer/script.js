const form = document.getElementById("numberForm");
const numberInput = document.getElementById("numberInput");
const output = document.getElementById("output");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const number = Number(numberInput.value);

    if (number === 0) {
        output.textContent = "The number is zero.";
    } else if (number > 0) {
        if (number % 2 === 0) {
            output.textContent = "The number is positive and even.";
        } else {
            output.textContent = "The number is positive and odd.";
        }
    } else {
        if (number % 2 === 0) {
            output.textContent = "The number is negative and even.";
        } else {
            output.textContent = "The number is negative and odd.";
        }
    }
});