import { clearErrors } from "/js/helpers/utils.js";

const loginForm = document.getElementById("loginForm");

async function initLoginForm(event) {
    event.preventDefault();
    clearErrors();

    let formData = Object.fromEntries(new FormData(event.target));

    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert("Login completed.");
            loginForm.reset();
            window.location.href = "/catalog";
        } else {
            const result = await response.json();
            alert(result.error);
        }
    } catch (error) {
        console.log("Error:", JSON.stringify(error));
        alert("An error occurred while logging the user.");
    }
}

if (loginForm) {
    loginForm.addEventListener("submit", initLoginForm);
}
