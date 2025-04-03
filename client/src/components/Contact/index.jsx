import "leaflet/dist/leaflet.css";
import styles from "./styles.module.css";
import Navigation from "../Navigation";
import Map from "../Map";
import Footer from "../Footer";

const Contact = () => (
  <div id="kontakt" className={styles.contactSection}>
    <h2>Kontakt</h2>
    <p>email: kontakt@bikemaster.pl</p>
    <p>Telefon: +48 123 456 789</p>
    <p>Adres: ul. Rowerowa 23a, 20-123 Lublin</p>
  </div>
);

const ContactPage = () => {
  return (
    <div className={styles.home_container}>
      <header className={styles.header}>
        <h1>Bike Master</h1>
      </header>
      <Navigation />
      <main className={styles.content}>
        <Contact />
        <Map />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
