const studentForm = document.getElementById("student-form");
const result = document.getElementById("result");

studentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("student-name").value.trim();

    const mark1 = Number(document.getElementById("mark1").value);
    const mark2 = Number(document.getElementById("mark2").value);
    const mark3 = Number(document.getElementById("mark3").value);

    if (
        name === "" ||
        [mark1, mark2, mark3].some(mark => !Number.isFinite(mark) || mark < 0 || mark > 100)
    ) {
        result.textContent = "Please enter a valid name and marks between 0 and 100.";
        return;
    }

    const total = mark1 + mark2 + mark3;
    const average = total / 3;

    result.innerHTML = `
        <strong>Student Name:</strong> ${name}<br>
        <strong>Total Marks:</strong> ${total} / 300<br>
        <strong>Average:</strong> ${average.toFixed(2)}<br>
    `;

    studentForm.reset();
});