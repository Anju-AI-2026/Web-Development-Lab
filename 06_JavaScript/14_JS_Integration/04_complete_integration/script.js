const form = document.getElementById("studentForm");
const nameInput = document.getElementById("nameInput");
const marksInput = document.getElementById("marksInput");
const output = document.getElementById("output");

const subjects = ["Python", "Java", "JavaScript", "SQL"];

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value;
    const marks = Number(marksInput.value);

    let subjectList = "";

    for (const subject of subjects) {
        subjectList += `${subject} `;
    }

    if (marks >= 40) {
        output.textContent =
            `${name} passed. Subjects: ${subjectList}`;
    } else {
        output.textContent =
            `${name} failed. Subjects: ${subjectList}`;
    }
});