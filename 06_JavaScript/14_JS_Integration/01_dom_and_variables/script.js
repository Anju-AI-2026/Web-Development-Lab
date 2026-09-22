const form = document.getElementById("studentForm");
const nameInput = document.getElementById("nameInput");
const scoreInput = document.getElementById("scoreInput");
const output = document.getElementById("output");

const subjects = ["Python", "Java", "JavaScript"];

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value;
    const score = Number(scoreInput.value);

    if (name === "" || scoreInput.value === "") {
        output.textContent = "Please enter all details.";
    } else if (score >= 40) {
        output.textContent = `${name} passed with a score of ${score}.`;
    } else {
        output.textContent = `${name} failed with a score of ${score}.`;
    }

    console.log("Subjects:", subjects);

    for (const subject of subjects) {
        console.log(subject);
    }
});