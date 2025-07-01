function hasNumber(text) {
    for (let char of text) {
        if (!isNaN(char) && char !== ' ') {
            return true;
        }
    }
    return false;
}

const form = document.querySelector("#registerForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtener inputs y divs de error
    const firstName = document.querySelector("#firstName");
    const lastName = document.querySelector("#lastName");
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");
    const confirmPassword = document.querySelector("#confirmPassword");

    const firstNameError = document.querySelector("#firstNameError");
    const lastNameError = document.querySelector("#lastNameError");
    const usernameError = document.querySelector("#usernameError");
    const passwordError = document.querySelector("#passwordError");
    const confirmPasswordError = document.querySelector("#confirmPasswordError");

    // Limpiar mensajes anteriores
    firstNameError.textContent = "";
    lastNameError.textContent = "";
    usernameError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";

    if (hasNumber(firstName.value.trim())) {
        firstNameError.textContent = "First name should not contain numbers.";
    }

    if (hasNumber(lastName.value.trim())) {
        lastNameError.textContent = "Last name should not contain numbers.";
    }
    if (username.value.trim().length < 3) {
        usernameError.textContent = "Username must be at least 3 characters.";
    }

    if (password.value.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters.";
    } else if (password.value.length > 20) {
        passwordError.textContent = "Password must be at most 20 characters.";
    }
    if (password.value !== confirmPassword.value) {
        confirmPasswordError.textContent = "Passwords do not match.";
    }
    if (
        !firstNameError.textContent &&
        !lastNameError.textContent &&
        !usernameError.textContent &&
        !passwordError.textContent &&
        !confirmPasswordError.textContent
    ) {
        document.getElementById("modal").classList.remove("hidden");
    }

});


const modal = document.getElementById("modal");
const closeModal = () => modal.classList.add("hidden");

document.getElementById("cancelBtn").addEventListener("click", closeModal);
document.querySelector(".close").addEventListener("click", closeModal);

document.getElementById("confirmBtn").addEventListener("click", function () {
    closeModal();
    alert("Registro exitoso");
    form.reset();
});
