import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import Navigation from "../Navigation";
import Footer from "../Footer";

const SuccessPage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.home_container}>
            <header className={styles.header}>
                <h1>Bike Master</h1>
            </header>
            <Navigation />
            <div className={styles.content}>
                <h2>ERROR 404</h2>
                <p>Ups... strona nie istnieje</p>
                <button className={styles.submit_btn} onClick={() => navigate("/")}>
                    Strona główna
                </button>
            </div>
            <Footer />
        </div>
    );
};

export default SuccessPage;
