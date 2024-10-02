import * as validations from "/js/helpers/inputsValidations.js";


const form = document.getElementById('registerForm');
const passwordinput = document.getElementById('password');

async function initForm (event) {
    console.log("iniciando validaciones");
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
        validations.showError('fullNameError', 'El nombre completo no debe contener caracteres especiales no permitidos.');
        alert("El nombre completo no debe contener caracteres especiales no permitidos");
        isValid = false;
    }

    if (!validations.validateDocumentNumber(documentNumber)) {
        validations.showError('documentNumberError', 'El número de documento debe ser estrictamente un número.');
        alert("El número de documento debe ser estrictamente un número");
        isValid = false;
    }

    if (!validations.validateEmail(email)) {
        validations.showError('emailError', 'Ingrese un correo electrónico válido.');
        isValid = false;
    }

    if (!validations.validatePhone(phone)) {
        validations.showError('phoneError', 'Ingrese un número de teléfono válido.');
        isValid = false;
    }

    if (!validations.validateUsername(username)) {
        validations.showError('usernameError', 'El nombre de usuario no debe contener caracteres especiales.');
        isValid = false;
    }

    if (!validations.validatePassword(password)) {
        validations.showError('passwordError', 'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, un número y un carácter especial permitido.');
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
                alert('Registro completado.');
                document.getElementById('registrationForm').reset();
            } else {
                const result = await response.json();
                alert(result.error);
            }
        } catch (error) {
            console.log('Error:', error);
            alert('Ocurrió un error al registrar el usuario.');
        }
    }
}


if (form) {
    form.addEventListener('submit', initForm);
}

if (passwordinput) {
    passwordinput.addEventListener('input', validations.validatePasswordOnTyping);
}





