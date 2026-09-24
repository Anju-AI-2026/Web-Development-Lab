const form = document.getElementById("numberForm");
const numberInput = document.getElementById("numberInput");
const output = document.getElementById("output");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const number = Number(numberInput.value);

    if (number % 2 === 0) {
        output.textContent = `${number} is an even number.`;
    } else {
        output.textContent = `${number} is an odd number.`;
    }
});