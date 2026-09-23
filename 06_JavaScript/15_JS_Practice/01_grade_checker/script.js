const form = document.getElementById("gradeForm");
const nameInput = document.getElementById("nameInput");
const marksInput = document.getElementById("marksInput");
const output = document.getElementById("output");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value;
    const marks = Number(marksInput.value);

    if (marks >= 90) {
        output.textContent = `${name} got Grade A.`;
    } else if (marks >= 75) {
        output.textContent = `${name} got Grade B.`;
    } else if (marks >= 60) {
        output.textContent = `${name} got Grade C.`;
    } else if (marks >= 40) {
        output.textContent = `${name} got Grade D.`;
    } else {
        output.textContent = `${name} failed.`;
    }
});