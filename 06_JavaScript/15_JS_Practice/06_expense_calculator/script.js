const expenseForm = document.getElementById("expense-form");
const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const expenseList = document.getElementById("expense-list");
const totalDisplay = document.getElementById("total");

let total = 0;

expenseForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);

    if (name === "" || !Number.isFinite(amount) || amount <= 0) {
        alert("Please enter a valid expense name and amount.");
        return;
    }

    const listItem = document.createElement("li");
    listItem.textContent = `${name} - ₹${amount.toFixed(2)}`;

    expenseList.appendChild(listItem);

    total += amount;
    totalDisplay.textContent = total.toFixed(2);

    expenseForm.reset();
    expenseName.focus();
});