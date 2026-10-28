function addTask() {
    const input = document.getElementById("taskInput");
    const task = input.value.trim();
    const message = document.getElementById("message");

    if (task === "") {
        message.textContent = "Please enter a task!";
        return;
    }

    const list = document.getElementById("taskList");
    const item = document.createElement("li");
    const taskText = document.createElement("span");
    const deleteButton = document.createElement("button");

    taskText.textContent = task;
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-btn";

    taskText.addEventListener("click", function () {
        item.classList.toggle("completed");
    });

    deleteButton.addEventListener("click", function () {
        item.remove();
    });

    item.appendChild(taskText);
    item.appendChild(deleteButton);
    list.appendChild(item);

    input.value = "";
    message.textContent = "";
    input.focus();
}

document.getElementById("taskInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});