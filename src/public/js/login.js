document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    //console.log("iniciando validaciones");
    event.preventDefault();
    
    clearErrors();

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": username,
                    "password": password
                })
            });

            if (response.ok) {
                alert('login completado.');
                //document.getElementById('registrationForm').reset();
                window.location.href = 'https://www.google.com';
            } else {
                const result = await response.json();
                alert(result.error);
            }
        } catch (error) {
            console.log('Error:', error);
            alert('Ocurrió un error al loggear el usuario.');
        }
});
function clearErrors() {
    let errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function(el) {
        el.innerText = '';
    });
}