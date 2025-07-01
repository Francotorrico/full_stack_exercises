function hasNumber(text) {
    for (let char of text) {
        if (!isNaN(char) && char !== ' ') {
            return true;
        }
    }
    return false;
}

const form = document.querySelector("#registerForm");
const modal = document.getElementById("modal");

// validar un input individual
function validateField(input, errorElement, validatorFn) {
    const errorMsg = validatorFn(input.value);
    errorElement.textContent = errorMsg;
    if (errorMsg) {
        input.style.borderColor = "red";
    } else {
        input.style.borderColor = "green";
    }
    return !errorMsg;
}

const validators = {
    firstName: (val) => {
        if (val.trim() === "") return "First name is required.";
        if (hasNumber(val)) return "First name should not contain numbers.";
        return "";
    },
    lastName: (val) => {
        if (val.trim() === "") return "Last name is required.";
        if (hasNumber(val)) return "Last name should not contain numbers.";
        return "";
    },
    username: (val) => {
        if (val.trim() === "") return "Username is required.";
        if (val.trim().length < 3) return "Username must be at least 3 characters.";
        return "";
    },
    password: (val) => {
        if (val === "") return "Password is required.";
        if (val.length < 8) return "Password must be at least 8 characters.";
        if (val.length > 20) return "Password must be at most 20 characters.";
        return "";
    },
    confirmPassword: (val) => {
        const passwordVal = document.querySelector("#password").value;
        if (val === "") return "Confirm password is required.";
        if (val !== passwordVal) return "Passwords do not match.";
        return "";
    },
    birthday: (val) => {
        if (!val) return "Birthday is required.";
        return "";
    }
};


const fields = [
    { input: document.querySelector("#firstName"), errorEl: document.querySelector("#firstNameError"), validator: validators.firstName },
    { input: document.querySelector("#lastName"), errorEl: document.querySelector("#lastNameError"), validator: validators.lastName },
    { input: document.querySelector("#username"), errorEl: document.querySelector("#usernameError"), validator: validators.username },
    { input: document.querySelector("#password"), errorEl: document.querySelector("#passwordError"), validator: validators.password },
    { input: document.querySelector("#confirmPassword"), errorEl: document.querySelector("#confirmPasswordError"), validator: validators.confirmPassword },
    { input: document.querySelector("#birthday"), errorEl: document.querySelector("#birthdayError"), validator: validators.birthday },
];

// Validación en tiempo real
fields.forEach(({ input, errorEl, validator }) => {
    input.addEventListener("input", () => {
        validateField(input, errorEl, validator);
    });
});

// Validación y lógica en el submit
form.addEventListener("submit", function (e) {
    e.preventDefault();
    let allValid = true;
    fields.forEach(({ input, errorEl, validator }) => {
        const valid = validateField(input, errorEl, validator);
        if (!valid) allValid = false;
    });
    if (allValid) {
        const newsletter = document.querySelector("#newsletter").checked;
        modal.classList.remove("hidden");
        modal.dataset.userData = JSON.stringify({
            firstName: document.querySelector("#firstName").value.trim(),
            lastName: document.querySelector("#lastName").value.trim(),
            username: document.querySelector("#username").value.trim(),
            password: document.querySelector("#password").value,
            birthday: document.querySelector("#birthday").value,
            newsletter: newsletter,
        });
    }
});

const closeModal = () => modal.classList.add("hidden");

document.getElementById("cancelBtn").addEventListener("click", closeModal);
document.querySelector(".close").addEventListener("click", closeModal);

document.getElementById("confirmBtn").addEventListener("click", function () {
    const userData = JSON.parse(modal.dataset.userData);
    localStorage.setItem("userData", JSON.stringify(userData));
    alert("Registro exitoso y guardado en storage");
    form.reset();
    closeModal();
    showSavedDataInStorage();

});

function showSavedDataInStorage() {
    const savedData = JSON.parse(localStorage.getItem("userData"));
    const dataList = document.getElementById("dataList");
    const savedDataContainer = document.getElementById("savedData");

    if (savedData) {
        dataList.innerHTML = `
          <li><strong>Nombre:</strong> ${savedData.firstName}</li>
          <li><strong>Apellido:</strong> ${savedData.lastName}</li>
          <li><strong>Username:</strong> ${savedData.username}</li>
          <li><strong>Cumpleaños:</strong> ${savedData.birthday}</li>
          <li><strong>Newsletter:</strong> ${savedData.newsletter ? "Sí" : "No"}</li>
        `;
        savedDataContainer.classList.remove("hidden");
    }
}

window.addEventListener("DOMContentLoaded", showSavedDataInStorage);
