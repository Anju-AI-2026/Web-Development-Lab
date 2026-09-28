const subjects = [
    "Python Programming",
    "Java Programming",
    "Database Management System",
    "Computer Networks",
    "Web Development",
    "Cloud Computing",
    "Data Structures",
    "Operating Systems",
    "Software Engineering",
    "Artificial Intelligence"
];

const searchInput = document.getElementById("search-input");
const subjectList = document.getElementById("subject-list");
const noResults = document.getElementById("no-results");

function displaySubjects(subjectArray) {
    subjectList.innerHTML = "";

    subjectArray.forEach(function (subject) {
        const listItem = document.createElement("li");
        listItem.textContent = subject;
        subjectList.appendChild(listItem);
    });

    noResults.hidden = subjectArray.length !== 0;
}

searchInput.addEventListener("input", function () {
    const searchText = searchInput.value.trim().toLowerCase();

    const filteredSubjects = subjects.filter(function (subject) {
        return subject.toLowerCase().includes(searchText);
    });

    displaySubjects(filteredSubjects);
});

// Display all subjects when the page loads
displaySubjects(subjects);