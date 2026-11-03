const passwordInput = document.getElementById("password");
const lengthInput = document.getElementById("length");
const generateButton = document.getElementById("generate");
const copyButton = document.getElementById("copy");

function generatePassword() {
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=";

    const characters = letters + numbers + symbols;

    let password = "";
    const length = Number(lengthInput.value);

    if (length < 4 || length > 30 || !Number.isInteger(length)) {
        alert("Please enter a length between 4 and 30.");
        return;
    }

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    passwordInput.value = password;
}

function copyPassword() {
    if (passwordInput.value === "") {
        alert("Generate a password first!");
        return;
    }

    navigator.clipboard.writeText(passwordInput.value)
        .then(() => {
            alert("Password copied successfully!");
        })
        .catch(() => {
            alert("Unable to copy password.");
        });
}

generateButton.addEventListener("click", generatePassword);
copyButton.addEventListener("click", copyPassword);