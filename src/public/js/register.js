import * as validations from "/js/helpers/utils.js";

const registerForm = document.getElementById('registerForm');
const passwordinput = document.getElementById('password');

async function initRegisterForm (event) {
    event.preventDefault();
    
    validations.clearErrors();

    let fullName = document.getElementById('fullName').value;
    let documentType = document.getElementById('documentType').value;  // Agregado: obtener documentType
    let documentNumber = document.getElementById('documentNumber').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let username = document.getElementById('userName').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    let isValid = true;

    if (!validations.validateFullName(fullName)) {
        validations.showError('fullNameError', 'The full name must not contain special characters.');
        isValid = false;
    }

    if (!validations.validateDocumentNumber(documentNumber)) {
        validations.showError('documentNumberError', 'The document number must be strictly a number.');
        isValid = false;
    }

    if (!validations.validateEmail(email)) {
        validations.showError('emailError', 'Please enter a valid email address.');
        isValid = false;
    }

    if (!validations.validatePhone(phone)) {
        validations.showError('phoneError', 'Please enter a valid email address.');
        isValid = false;
    }

    if (!validations.validateDocumentType(documentType)) {
        validations.showError('documentTypeError', 'Please select a document type.');
        isValid = false;
    }

    if (!validations.validateUsername(username)) {
        validations.showError('usernameError', 'The username must not contain special characters.');
        isValid = false;
    }

    if (!validations.validatePassword(password)) {
        validations.showError('passwordError', 'The password must be at least 8 characters, including one uppercase character, one number, and one allowed special character.');
        isValid = false;
    }

    if (password !== confirmPassword) {
        validations.showError('confirmPasswordError', 'Las contraseñas no coinciden.');
        isValid = false;
    }

    if (isValid) {
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "fullName": fullName,
                    "documentType": documentType,
                    "documentNumber": documentNumber,
                    "email": email,
                    "phone": phone,
                    "username": username,
                    "password": password
                })
            });

            if (response.ok) {
                alert('Registration completed.');
                registerForm.reset();
            } else {
                const result = await response.json();
                alert(result.error);
            }
        } catch (error) {
            console.log('Error:', error);
            alert('An error occurred while registering the user.');
        }
    }
}

if (registerForm) {
    registerForm.addEventListener('submit', initRegisterForm);
}

if (passwordinput) {
    passwordinput.addEventListener('input', validations.validatePasswordOnTyping);
}





