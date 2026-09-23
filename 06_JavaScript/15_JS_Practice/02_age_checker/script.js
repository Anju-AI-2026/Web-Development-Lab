const form = document.getElementById("ageForm");
const nameInput = document.getElementById("nameInput");
const ageInput = document.getElementById("ageInput");
const output = document.getElementById("output");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value;
    const age = Number(ageInput.value);

    if (age < 0) {
        output.textContent = "Please enter a valid age.";
    } else if (age >= 18 && age < 60) {
        output.textContent = `${name} is an adult.`;
    } else if (age >= 60) {
        output.textContent = `${name} is a senior citizen.`;
    } else {
        output.textContent = `${name} is a minor.`;
    }
});