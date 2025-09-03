import { useState } from "react";
import "./form-contact.css";

interface FormErrors {
    firstName?: string;
    lastName?: string;
    userName?: string;
    password?: string;
    confirmPassword?: string;
    birthday?: string;
}

export default function FormContact() {


    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [birthday, setBirthday] = useState("");
    const [newsletter, setNewsletter] = useState(false);


    //nuestro errores de validacion
    const [error, setError] = useState<FormErrors>({});


    const [loading, setLoading] = useState(false);


    // modal state
    const [modalMessage, setModalMessage] = useState("");
    const [showModal, setShowModal] = useState(false);

    const validateForm = (field?: string, value?: string) => {
        const newErrors: FormErrors = { ...error };

        //expresion regular
        const nameRegex = /^[A-Za-z]+$/;
        const usernameRegex = /^[A-Za-z0-9]{3,}$/;

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

        const checkField = (name: string, val: string) => {
            switch (name) {
                case "firstName":
                    if (!val.trim()) newErrors.firstName = "The name is required";
                    else if (!nameRegex.test(val)) newErrors.firstName = "The name can only contain letters";
                    else newErrors.firstName = "";
                    break;
                case "lastName":
                    if (!val.trim()) newErrors.lastName = "The last name is required";
                    else if (!nameRegex.test(val)) newErrors.lastName = "The last name can only contain letters";
                    else newErrors.lastName = "";
                    break;
                case "userName":
                    if (!val.trim()) newErrors.userName = "The username is required";
                    else if (!usernameRegex.test(val)) newErrors.userName = "Username must be at least 3 characters and contain only letters and numbers";
                    else newErrors.userName = "";
                    break;
                case "password":
                    if (!val.trim()) newErrors.password = "The password is required";
                    else if (!passwordRegex.test(val)) newErrors.password = "Password must be at least 6 characters, with letters and numbers";
                    else newErrors.password = "";
                    break;
                case "confirmPassword":
                    if (!val.trim()) newErrors.confirmPassword = "the confirm password is required";
                    else if (val !== password) newErrors.confirmPassword = "the passwords do not match";
                    else newErrors.confirmPassword = "";
                    break;
                case "birthday":
                    newErrors.birthday = !val.trim() ? "the birthday is required" : "";
                    break;
            }
        };

        if (field && value !== undefined) {
            // Validar solo un campo en tiempo real
            checkField(field, value);
        } else {
            // Validar todos (al enviar)
            checkField("firstName", firstName);
            checkField("lastName", lastName);
            checkField("userName", userName);
            checkField("password", password);
            checkField("confirmPassword", confirmPassword);
            checkField("birthday", birthday);
        }

        setError(newErrors);
        return Object.values(newErrors).every((msg) => !msg);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            setLoading(true);
            try {

                await new Promise((resolve) => setTimeout(resolve, 2000));

                console.log("Form submitted", {
                    firstName,
                    lastName,
                    userName,
                    password,
                    confirmPassword,
                    birthday,
                    newsletter,
                });
                setModalMessage("Form submitted successfully!");
                setShowModal(true);
                // reinicio formulario
                setFirstName("");
                setLastName("");
                setUserName("");
                setPassword("");
                setConfirmPassword("");
                setBirthday("");
                setNewsletter(false);
                setError({});
            }
            catch (e) {
                setModalMessage("Error al enviar el formulario");
                setShowModal(true);
            }
            finally {
                setLoading(false); // cerrar loading
            }
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => {
                        setFirstName(e.target.value);
                        validateForm("firstName", e.target.value);
                    }}
                    required
                />
                {error.firstName && <div className="error">{error.firstName}</div>}

                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => {
                        setLastName(e.target.value)
                        validateForm("lastName", e.target.value);
                    }}
                    required
                />
                {error.lastName && <div className="error">{error.lastName}</div>}

                <label htmlFor="userName">Username:</label>
                <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={userName}
                    onChange={(e) => {
                        setUserName(e.target.value)
                        validateForm("userName", e.target.value);
                    }}
                    required
                />
                {error.userName && <div className="error">{error.userName}</div>}

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                        validateForm("password", e.target.value);
                    }}
                    required
                />
                {error.password && <div className="error">{error.password}</div>}

                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value)
                        validateForm("confirmPassword", e.target.value);
                    }}
                    required
                />
                {error.confirmPassword && (
                    <div className="error">{error.confirmPassword}</div>
                )}

                <label htmlFor="birthday">Birthday:</label>
                <input
                    type="date"
                    id="birthday"
                    name="birthday"
                    value={birthday}
                    onChange={(e) => {
                        setBirthday(e.target.value)
                        validateForm("birthday", e.target.value);
                    }}
                    required
                />
                {error.birthday && <div className="error">{error.birthday}</div>}

                <label>
                    <input
                        type="checkbox"
                        id="newsletter"
                        name="newsletter"
                        checked={newsletter}
                        onChange={(e) => setNewsletter(e.target.checked)}
                    />
                    Subscribe to newsletter
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? "⏳ Process in progress..." : "Enviar"}
                </button>
            </form>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>
                            &times;
                        </span>
                        <p>{modalMessage}</p>
                        <button onClick={() => setShowModal(false)}>Cerrar</button>
                    </div>
                </div>
            )}
        </>
    )
}
