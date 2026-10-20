
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const showSignupButton = document.getElementById("showSignup");
const showLoginButton = document.getElementById("showLogin");

const authTitle = document.getElementById("authTitle");
const authSubtitle = document.getElementById("authSubtitle");
const authMessage = document.getElementById("authMessage");

// Check whether this browser already has a demo session.
const savedSession = localStorage.getItem("sweetBakeryLoggedIn");

if (savedSession === "true") {
    window.location.replace("index.html");
}

// Switch to Sign Up.
showSignupButton.addEventListener("click", function () {
    loginForm.hidden = true;
    signupForm.hidden = false;

    authTitle.textContent = "Create Your Account";
    authSubtitle.textContent = "Join our little bakery family.";
    authMessage.textContent = "";
});

// Switch to Login.
showLoginButton.addEventListener("click", function () {
    signupForm.hidden = true;
    loginForm.hidden = false;

    authTitle.textContent = "Welcome Back!";
    authSubtitle.textContent =
        "Log in to your Sweet Bakery account.";
    authMessage.textContent = "";
});

// Demo Sign Up.
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

    // Save only the demo session status, never the password.
    localStorage.setItem("sweetBakeryLoggedIn", "true");
    localStorage.setItem("sweetBakeryUserName", name);
    localStorage.setItem("sweetBakeryUserEmail", email);

    authMessage.textContent =
        "Your account demo is ready! Opening Sweet Bakery...";

    signupForm.reset();

    setTimeout(function () {
        window.location.replace("index.html");
    }, 1000);
});

// Demo Login.
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
        authMessage.textContent =
            "Please enter your email and password.";
        return;
    }

    // This is a demo: it does not verify real account credentials.
    localStorage.setItem("sweetBakeryLoggedIn", "true");
    localStorage.setItem("sweetBakeryUserEmail", email);

    authMessage.textContent =
        "Welcome back! Opening Sweet Bakery...";

    loginForm.reset();

    setTimeout(function () {
        window.location.replace("index.html");
    }, 1000);
});
