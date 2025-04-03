import styles from "./styles.module.css";
import Navigation from "../Navigation";
import Footer from "../Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Form = () => {
    const [formData, setFormData] = useState({ name: "", email: "", date: "" });
    const [errors, setErrors] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    // Walidacja formularza po stronie klienta
    const validateForm = () => {
        const errors = {};
        // Walidacja pola name
        if (!formData.name.trim()) {
            errors.name = "Imię i nazwisko jest wymagane";
        } else {
            const nameParts = formData.name.trim().split(" ");

            // Sprawdzenie, czy jest dokładnie 2 człony (Imię Nazwisko)
            if (nameParts.length !== 2) {
                errors.name = "Imię i nazwisko muszą zawierać dokładnie dwa człony oddzielone jedną spacją";
            } else {
                const firstName = nameParts[0];
                const lastName = nameParts[1];

                // Walidacja imienia: pierwsza litera wielka, reszta mała
                if (firstName.charAt(0) !== firstName.charAt(0).toUpperCase()) {
                    errors.name = "Imię musi zaczynać się wielką literą";
                } else if (firstName !== firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()) {
                    errors.name = "Imię musi być zapisane poprawnie (pierwsza litera wielka, reszta mała)";
                }

                // Walidacja nazwiska: pierwsza litera wielka, reszta mała, jeśli ma myślnik, kolejna litera po myślniku też wielka
                if (lastName.charAt(0) !== lastName.charAt(0).toUpperCase()) {
                    errors.name = "Nazwisko musi zaczynać się wielką literą";
                }
                // Jeżeli nazwisko zawiera myślnik, kolejne litery po myślniku muszą być wielkie
                if (lastName.includes("-")) {
                    // Podziel nazwisko po myślniku
                    const lastNameParts = lastName.split("-");

                    // Sprawdzamy, czy jest tylko jeden myślnik
                    if (lastNameParts.length > 2) {
                        errors.name = "Nazwisko może mieć tylko jeden myślnik";
                    } else {
                        // Sprawdzamy, czy część po myślniku zaczyna się wielką literą
                        if (lastNameParts[1].charAt(0) !== lastNameParts[1].charAt(0).toUpperCase()) {
                            errors.name = "Część nazwiska po myślniku musi zaczynać się wielką literą";
                        }

                        // Sprawdzamy, czy reszta liter po myślniku jest mała
                        if (lastNameParts[1].slice(1) !== lastNameParts[1].slice(1).toLowerCase()) {
                            errors.name = "Reszta nazwiska po myślniku musi być mała (pierwsza litera wielka)";
                        }

                        if(lastNameParts[0] !== lastNameParts[0].charAt(0).toUpperCase() + lastNameParts[0].slice(1).toLowerCase()) {
                            errors.name = "Pierwszy człon nazwiska musi być zapisane poprawnie (pierwsza litera wielka, reszta mała)";
                        }
                    }
                } else if (lastName !== lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()) {
                    errors.name = "Nazwisko musi być zapisane poprawnie (pierwsza litera wielka, reszta mała)";
                }

            }
        }
        // Walidacja pola email
        if (!formData.email.trim()) {
            errors.email = "Email jest wymagany";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email jest niepoprawny";
        }

        // Walidacja daty
        if (!formData.date) {
            errors.date = "Termin jest wymagany";
        } else {
            const currentDate = new Date();
            const selectedDate = new Date(formData.date);
            if (selectedDate <= currentDate) {
                errors.date = "Data musi być w przyszłości";
            }
        }

        return errors;
    };

    const decodeJWT = (token) => {
        try {
            const base64Url = token.split(".")[1]; // Pobieramy środkową część JWT
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split("")
                    .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                    .join("")
            );
    
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error("Błąd dekodowania tokena:", error);
            return null;
        }
    };
    

    useEffect(() => {
        const loadUserFromToken = () => {
            const token = localStorage.getItem("token");

            if (!token) {
                console.log("Brak tokena w localStorage");
                setIsAuthenticated(false);
                return;
            }

            try {
                const decodedPayload = decodeJWT(token); // Używamy funkcji decodeJWT do dekodowania tokena
                console.log("Token:", token);
                // console.log("Zakodowany payload:", token.split(".")[1]);
                // console.log("Dekodowany token:", decodedPayload);

                if (decodedPayload && decodedPayload.id) {
                    setUserId(decodedPayload.id);
                    setIsAuthenticated(true);

                    if (decodedPayload.email) {
                        setFormData((prevFormData) => ({
                            ...prevFormData,
                            email: decodedPayload.email,
                        }));
                    }

                    if (decodedPayload.firstName && decodedPayload.lastName) {
                        setFormData((prevFormData) => ({
                            ...prevFormData,
                            name: `${decodedPayload.firstName} ${decodedPayload.lastName}`,
                        }));
                    }
                } else {
                    console.warn("Brak userId w tokenie!");
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Błąd dekodowania tokena:", error);
                setIsAuthenticated(false);
            }
        };

        loadUserFromToken();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});  // Czyścimy poprzednie błędy

        // Walidacja danych formularza
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors); // Ustawiamy błędy, jeśli jakieś wystąpiły
            return;
        }

        try {
            const token = localStorage.getItem("token");
            console.log("Token przed wysłaniem:", token);
            console.log("Wysyłane dane:", { ...formData, userId });

            const response = await axios.post(
                "http://localhost:8080/api/reservation",
                { ...formData, userId },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            ); 

            if (response.status === 201 && response.data.message === "Rezerwacja została pomyślnie dodana") {
                navigate("/sukces");
            }

        } catch (error) {
            console.error("Błąd przy wysyłaniu formularza:", error.response?.data || error.message);
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ general: "Coś poszło nie tak. Spróbuj ponownie." });
            }
        }
    };

    if (!isAuthenticated) {
        return (
            <div className={styles.home_container}>
                <header className={styles.header}>
                    <h1>Bike Master</h1>
                </header>
                <Navigation />
                <div className={styles.content}>
                    <h2>Zaloguj się, aby umówić naprawę</h2>
                    <div className={styles.button_container}>
                        <button className={styles.login_btn} onClick={() => navigate("/login")}>
                            Zaloguj się
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className={styles.home_container}>
            <header className={styles.header}>
                <h1>Bike Master</h1>
            </header>
            <Navigation />
            <div className={styles.content}>
                <h1>Umów się na naprawę</h1>
                <main className={styles.content}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div>
                            <label>Imię i nazwisko</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Imię i nazwisko"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && <div className={styles.error}>{errors.name}</div>}
                        </div>
                        <div>
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <div className={styles.error}>{errors.email}</div>}
                        </div>
                        <div>
                            <label>Termin</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                            />
                            {errors.date && <div className={styles.error}>{errors.date}</div>}
                        </div>
                        <button type="submit" className={styles.submit_btn}>Umów się</button>
                        <button
                            type="button"
                            className={styles.clear_btn}
                            onClick={() => setFormData({ name: "", email: "", date: "" })}
                        >
                            Wyczyść
                        </button>
                    </form>
                    {errors.general && <div className={styles.error}>{errors.general}</div>}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Form;
