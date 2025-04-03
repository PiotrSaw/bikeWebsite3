import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import Navigation from "../Navigation";
import Footer from "../Footer";

const RegisterSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.home_container}>
            <header className={styles.header}>
                <h1>Bike Master</h1>
            </header>
            <Navigation />
            <div className={styles.content}>
                <h2>Rejestracja zakończona sukcesem!</h2>
                <p>Dziękujemy za założenie konta!</p>
                <button className={styles.submit_btn} onClick={() => navigate("/login")}>
                    Zaloguj się
                </button>
            </div>
            <Footer />
        </div>
    );
};

export default RegisterSuccess;
