const passwordInput = document.getElementById("password");
const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("length-value");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const generateButton = document.getElementById("generate-button");
const copyButton = document.getElementById("copy-button");

const strengthText = document.getElementById("strength");
const strengthFill = document.getElementById("strength-fill");
const message = document.getElementById("message");

const characterSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}?"
};

lengthInput.addEventListener("input", () => {
    lengthValue.textContent = lengthInput.value;
});

function randomIndex(max) {
    const values = new Uint32Array(1);
    const limit = Math.floor(4294967296 / max) * max;

    do {
        crypto.getRandomValues(values);
    } while (values[0] >= limit);

    return values[0] % max;
}

function generatePassword() {
    let selectedSets = [];

    if (uppercase.checked) selectedSets.push(characterSets.uppercase);
    if (lowercase.checked) selectedSets.push(characterSets.lowercase);
    if (numbers.checked) selectedSets.push(characterSets.numbers);
    if (symbols.checked) selectedSets.push(characterSets.symbols);

    if (selectedSets.length === 0) {
        message.textContent = "Please select at least one option.";
        return;
    }

    const length = Number(lengthInput.value);
    const allCharacters = selectedSets.join("");

    let passwordCharacters = [];

    selectedSets.forEach(set => {
        passwordCharacters.push(set[randomIndex(set.length)]);
    });

    while (passwordCharacters.length < length) {
        passwordCharacters.push(
            allCharacters[randomIndex(allCharacters.length)]
        );
    }

    for (let i = passwordCharacters.length - 1; i > 0; i--) {
        const j = randomIndex(i + 1);

        [passwordCharacters[i], passwordCharacters[j]] =
            [passwordCharacters[j], passwordCharacters[i]];
    }

    const password = passwordCharacters.join("");

    passwordInput.value = password;
    message.textContent = "Password generated successfully!";

    checkStrength(password, selectedSets.length);
}

function checkStrength(password, selectedCount) {
    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;
    if (selectedCount >= 3) score++;

    const levels = ["Weak", "Fair", "Good", "Strong", "Very Strong"];

    strengthText.textContent = levels[score];
    strengthFill.style.width = (score + 1) * 20 + "%";
}

async function copyPassword() {
    if (passwordInput.value === "") {
        message.textContent = "Generate a password first.";
        return;
    }

    try {
        await navigator.clipboard.writeText(passwordInput.value);
        message.textContent = "Password copied successfully!";
    } catch {
        message.textContent = "Copy failed. Please copy it manually.";
    }
}

generateButton.addEventListener("click", generatePassword);
copyButton.addEventListener("click", copyPassword);