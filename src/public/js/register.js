import * as validations from "/js/helpers/utils.js";

const registerForm = document.getElementById("registerForm");
const passwordinput = document.getElementById("password");

async function initRegisterForm(event) {
    event.preventDefault();

    validations.clearErrors();

    const data = Object.fromEntries(new FormData(event.target));

    let isValid = true;

    if (!validations.validateFullName(data.fullName)) {
        validations.showError(
            "fullNameError",
            "The full name must not contain special characters."
        );
        isValid = false;
    }

    if (!validations.validateDocumentNumber(data.documentNumber)) {
        validations.showError(
            "documentNumberError",
            "The document number must be strictly a number."
        );
        isValid = false;
    }

    if (!validations.validateEmail(data.email)) {
        validations.showError("emailError", "Please enter a valid email address.");
        isValid = false;
    }

    if (!validations.validatePhone(data.phone)) {
        validations.showError("phoneError", "Please enter a valid phone.");
        isValid = false;
    }

    if (!validations.validateDocumentType(data.documentType)) {
        validations.showError(
            "documentTypeError",
            "Please select a document type."
        );
        isValid = false;
    }

    if (!validations.validateUsername(data.userName)) {
        validations.showError(
            "usernameError",
            "The username must not contain special characters."
        );
        isValid = false;
    }

    if (!validations.validatePassword(data.password)) {
        validations.showError(
            "passwordError",
            "The password must be at least 8 characters, including one uppercase character, one number, and one allowed special character."
        );
        isValid = false;
    }

    if (data.password !== data.confirmPassword) {
        validations.showError(
            "confirmPasswordError",
            "Las contraseñas no coinciden."
        );
        isValid = false;
    }

    if (isValid) {
        console.log(JSON.stringify(data));


        try {
            const response = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert("Registration completed.");
                registerForm.reset();
                window.location.href = "/";
            } else {
                const result = await response.json();
                alert(result.error);
            }
        } catch (error) {
            console.log("Error:", error);
            alert("An error occurred while registering the user.");
        }
    }
}

if (registerForm) {
    registerForm.addEventListener("submit", initRegisterForm);
}

if (passwordinput) {
    passwordinput.addEventListener("input", validations.validatePasswordOnTyping);
}
