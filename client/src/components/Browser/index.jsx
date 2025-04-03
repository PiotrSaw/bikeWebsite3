import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import Navigation from "../Navigation";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";

const Browser = () => {
    const [currentReservations, setcurrentReservations] = useState([]);
    const [pastReservations, setpastReservations] = useState([]);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    // Pobieranie danych z API
    useEffect(() => {
    
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/reservation", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log("Otrzymane dane:", response.data); // <-- SPRAWDŹ, CO ZWRACA SERWER
                setcurrentReservations(response.data.currentReservations);
                setpastReservations(response.data.pastReservations);
            } catch (error) {
                console.error("Błąd szczegóły:", error.response ? error.response.data : error.message);
                setError("Błąd podczas pobierania danych");
            }
        };
    
        fetchData();
    }, [token]);

    // Obsługa usuwania rezerwacji
    const handleDelete = async (id) => {
        if (!window.confirm("Czy na pewno chcesz usunąć tę rezerwację?")) return;

        try {
            await axios.delete(`http://localhost:8080/api/reservation/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setcurrentReservations(currentReservations.filter((reservation) => reservation._id !== id));
        } catch (error) {
            setError("Błąd podczas usuwania rezerwacji");
            console.error(error);
        }
    };

    // Obsługa edycji (przykładowo przekierowanie do strony edycji)
    const handleEdit = (id) => {
        window.location.href = `/edytuj/${id}`;
    };

    if (!token) {
        return (
            <div className={styles.home_container}>
                <header className={styles.header}>
                    <h1>Bike Master</h1>
                </header>
                <Navigation />
                <div className={styles.content}>
                    <h2>Zaloguj się, aby zobaczyć rezerwacje</h2>
                    <button className={styles.login_btn} onClick={() => navigate("/login")}>
                        Zaloguj się
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className={styles.home_container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Lista Rezerwacji</h1>
            </header>
            <Navigation />
            <main className={styles.content}>
                {error && <p className={styles.error}>{error}</p>}
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Imię i Nazwisko</th>
                            <th>Email</th>
                            <th>Termin</th>
                            <th>Edytuj</th>
                            <th>Usuń</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentReservations.map((reservation) => (
                            <tr key={reservation._id}>
                                <td>{reservation.name}</td>
                                <td>{reservation.email}</td>
                                <td>{new Date(reservation.date).toLocaleDateString()}</td>
                                <td>
                                    <button className={styles.editBtn} onClick={() => handleEdit(reservation._id)}>Edytuj</button>
                                </td>
                                <td>
                                    <button className={styles.deleteBtn} onClick={() => handleDelete(reservation._id)}>Usuń</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h2 className={styles.pastReservationsTitle}>Archiwalne Rezerwacje</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Imię i Nazwisko</th>
                            <th>Email</th>
                            <th>Termin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pastReservations.map((reservation) => (
                            <tr key={reservation._id}>
                                <td>{reservation.name}</td>
                                <td>{reservation.email}</td>
                                <td>{new Date(reservation.date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
            <Footer />
        </div>
    );
};

export default Browser;
