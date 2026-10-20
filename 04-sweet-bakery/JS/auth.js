
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const showSignupButton = document.getElementById("showSignup");
const showLoginButton = document.getElementById("showLogin");

const authTitle = document.getElementById("authTitle");
const authSubtitle = document.getElementById("authSubtitle");
const authMessage = document.getElementById("authMessage");

// Switch between Login and Sign Up forms.

showSignupButton.addEventListener("click", function () {
    loginForm.hidden = true;
    signupForm.hidden = false;

    authTitle.textContent = "Create Your Account";
    authSubtitle.textContent = "Join our little bakery family.";
    authMessage.textContent = "";
});

showLoginButton.addEventListener("click", function () {
    signupForm.hidden = true;
    loginForm.hidden = false;

    authTitle.textContent = "Welcome Back!";
    authSubtitle.textContent =
        "Log in to your Sweet Bakery account.";
    authMessage.textContent = "";
});

// Demo-only validation.
// No accounts or passwords are stored.

signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword =
        document.getElementById("confirmPassword").value;

    if (name.length < 2) {
        authMessage.textContent =
            "Please enter a name with at least 2 characters.";
        return;
    }

    if (password.length < 8) {
        authMessage.textContent =
            "Your password must contain at least 8 characters.";
        return;
    }

    if (password !== confirmPassword) {
        authMessage.textContent =
            "Your passwords do not match. Please try again.";
        return;
    }

    authMessage.textContent =
        "Sign-up demo successful! This page does not create or save an account.";

    signupForm.reset();
});

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
        authMessage.textContent =
            "Please enter both your email and password.";
        return;
    }

    authMessage.textContent =
        "This is a front-end demo. Real account login is not connected yet.";

    loginForm.reset();
});
