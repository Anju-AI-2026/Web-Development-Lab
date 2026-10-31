const expressionDisplay = document.getElementById("expression");
const resultDisplay = document.getElementById("result");
const messageDisplay = document.getElementById("message");

const historyList = document.getElementById("historyList");
const historyCount = document.getElementById("historyCount");

const buttons = document.querySelectorAll(".button-grid button");

let expression = "";
let history = [];

// Display expression and result
function updateDisplay() {
    expressionDisplay.textContent = expression || " ";

    if (expression === "") {
        resultDisplay.textContent = "0";
        messageDisplay.textContent = "made with love ♡";
        return;
    }

    try {
        const answer = calculateExpression(expression);

        resultDisplay.textContent = formatNumber(answer);
        messageDisplay.textContent = "looking good ♡";
    } catch (error) {
        resultDisplay.textContent = " ";
        messageDisplay.textContent = " ";
    }
}

// Format calculation results
function formatNumber(number) {
    if (!Number.isFinite(number)) {
        throw new Error("Invalid result");
    }

    return Number(number.toPrecision(12)).toString();
}

// Add numbers and operators
function addValue(value) {
    if (resultDisplay.textContent === "Error" && !expression) {
        expression = "";
    }

    if (expression.length >= 100) {
        messageDisplay.textContent = "Maximum input length reached";
        return;
    }

    if (value === ".") {
        const currentNumber = expression.split(/[+\-*/()]/).pop();

        if (currentNumber.includes(".")) {
            return;
        }
    }

    expression += value;
    updateDisplay();
}

// Clear calculator
function clearCalculator() {
    expression = "";
    updateDisplay();
    messageDisplay.textContent = "All clear ♡";
}

// Remove last character
function backspace() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

// Safely calculate mathematical expressions
function calculateExpression(input) {
    const tokens = input.match(/\d*\.?\d+|[()+\-*/]/g);

    if (!tokens || tokens.join("") !== input) {
        throw new Error("Invalid expression");
    }

    let position = 0;

    function parseExpression() {
        let value = parseTerm();

        while (
            tokens[position] === "+" ||
            tokens[position] === "-"
        ) {
            const operator = tokens[position++];

            const nextValue = parseTerm();

            value = operator === "+"
                ? value + nextValue
                : value - nextValue;
        }

        return value;
    }

    function parseTerm() {
        let value = parseFactor();

        while (
            tokens[position] === "*" ||
            tokens[position] === "/"
        ) {
            const operator = tokens[position++];

            const nextValue = parseFactor();

            if (operator === "*") {
                value *= nextValue;
            } else {
                if (nextValue === 0) {
                    throw new Error("Cannot divide by zero");
                }

                value /= nextValue;
            }
        }

        return value;
    }

    function parseFactor() {
        if (tokens[position] === "+") {
            position++;
            return parseFactor();
        }

        if (tokens[position] === "-") {
            position++;
            return -parseFactor();
        }

        if (tokens[position] === "(") {
            position++;

            const value = parseExpression();

            if (tokens[position] !== ")") {
                throw new Error("Missing closing bracket");
            }

            position++;
            return value;
        }

        const token = tokens[position++];

        if (token === undefined || !/^\d*\.?\d+$/.test(token)) {
            throw new Error("Invalid number");
        }

        return Number(token);
    }

    const result = parseExpression();

    if (position !== tokens.length || !Number.isFinite(result)) {
        throw new Error("Invalid expression");
    }

    return result;
}

// Calculate final answer
function calculate() {
    if (expression.trim() === "") {
        return;
    }

    try {
        const answer = calculateExpression(expression);
        const formattedAnswer = formatNumber(answer);

        addToHistory(expression, formattedAnswer);

        expressionDisplay.textContent = expression;
        resultDisplay.textContent = formattedAnswer;

        expression = formattedAnswer;

        messageDisplay.textContent = "calculated with love ♡";
    } catch (error) {
        resultDisplay.textContent = "Error";
        messageDisplay.textContent = error.message;
        expression = "";
    }
}

// Add calculation to history
function addToHistory(calculation, answer) {
    const entry = {
        id: Date.now() + Math.random(),
        calculation: calculation,
        answer: answer,
        time: new Date().toLocaleString()
    };

    history.unshift(entry);

    renderHistory();
}

// Display history
function renderHistory() {
    historyList.innerHTML = "";

    historyCount.textContent =
        `${history.length} calculation${history.length === 1 ? "" : "s"}`;

    if (history.length === 0) {
        historyList.innerHTML =
            '<p class="empty-history">Your calculations will appear here ♡</p>';
        return;
    }

    history.forEach(function (entry) {
        const item = document.createElement("div");
        item.className = "history-item";

        const top = document.createElement("div");
        top.className = "history-item-top";

        const calculation = document.createElement("div");
        calculation.className = "history-calculation";

        calculation.textContent = entry.calculation + " = ";

        const answer = document.createElement("span");
        answer.className = "history-answer";
        answer.textContent = entry.answer;

        calculation.appendChild(answer);

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-history";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            deleteHistory(entry.id);
        });

        const time = document.createElement("p");
        time.className = "history-time";
        time.textContent = entry.time;

        top.appendChild(calculation);
        top.appendChild(deleteButton);

        item.appendChild(top);
        item.appendChild(time);

        historyList.appendChild(item);
    });
}

// Delete one history entry
function deleteHistory(id) {
    history = history.filter(function (entry) {
        return entry.id !== id;
    });

    renderHistory();
}

// Clear all history
function clearHistory() {
    history = [];
    renderHistory();
}

// Button click events
buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        const value = button.dataset.value;
        const action = button.dataset.action;

        if (action === "clear") {
            clearCalculator();
        } else if (action === "backspace") {
            backspace();
        } else if (action === "calculate") {
            calculate();
        } else if (value !== undefined) {
            addValue(value);
        }
    });
});

// Keyboard support
document.addEventListener("keydown", function (event) {
    const key = event.key;

    if (/^[0-9.]$/.test(key)) {
        addValue(key);
    } else if (["+", "-", "*", "/", "(", ")"].includes(key)) {
        addValue(key);
    } else if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
    } else if (key === "Backspace") {
        backspace();
    } else if (key === "Escape") {
        clearCalculator();
    }
});

// History controls
document.getElementById("clearHistory").addEventListener("click", function () {
    clearHistory();
});

document.getElementById("refreshHistory").addEventListener("click", function () {
    renderHistory();
});

// Initial display
updateDisplay();
renderHistory();