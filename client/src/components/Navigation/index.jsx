import styles from "./styles.module.css";
import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
    const isAuthenticated = !!localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <nav className={styles.nav}>
            <Link to="/">Strona główna</Link>
            <Link to="/rezerwacje">Rezerwacja</Link>
            <Link to="/przegladarka">Sprawdź rezerwacje</Link>
            <Link to="/kontakt">Kontakt</Link>
            {isAuthenticated ? (
                <Link to="#" onClick={handleLogout}>Wyloguj</Link>
            ) : (
                <>
                    <Link to="/login">Zaloguj</Link>
                    <Link to="/signup">Zarejestruj</Link>
                </>
            )}
        </nav>
    );
};

export default Navigation;
