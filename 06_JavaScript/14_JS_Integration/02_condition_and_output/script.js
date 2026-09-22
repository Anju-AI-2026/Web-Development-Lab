const form = document.getElementById("resultForm");
const nameInput = document.getElementById("nameInput");
const marksInput = document.getElementById("marksInput");
const output = document.getElementById("output");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value;
    const marks = Number(marksInput.value);

    if (marks >= 40) {
        output.textContent = `${name} passed.`;
    } else {
        output.textContent = `${name} failed.`;
    }
});