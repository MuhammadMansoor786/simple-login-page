const form = document.getElementById("registrationForm");
const message = document.getElementById("message");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const department = document.getElementById("department").value;
    const semester = document.getElementById("semester").value;
    const password = document.getElementById("password").value;

    if (name === "") {
        showMessage("Please enter your name.", "red");
        return;
    }

    if (email === "") {
        showMessage("Please enter your email.", "red");
        return;
    }

    if (!email.includes("@")) {
        showMessage("Please enter a valid email address.", "red");
        return;
    }

    if (department === "") {
        showMessage("Please select your department.", "red");
        return;
    }

    if (semester < 1 || semester > 8) {
        showMessage("Semester must be between 1 and 8.", "red");
        return;
    }

    if (password.length < 6) {
        showMessage("Password must contain at least 6 characters.", "red");
        return;
    }

    showMessage("Registration successful!", "green");
    form.reset();
});

function showMessage(text, color) {
    message.textContent = text;
    message.style.color = color;
}