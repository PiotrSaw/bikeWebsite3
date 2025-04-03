const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Wczytanie zmiennych środowiskowych
dotenv.config();

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');  // Pobranie tokenu z nagłówka
    console.log("Token:", token);  // Debugowanie - sprawdzamy token

    if (!token) {
        return res.status(401).send({ message: 'Brak tokena autoryzacyjnego' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);  // Debugowanie - sprawdzamy, co zawiera token

        req.user = decoded;  // Dodajemy dane użytkownika do obiektu request
        next();  // Przechodzimy do następnej funkcji
    } catch (error) {
        console.error("Token verification failed:", error.message);  // Debugowanie - błąd tokenu
        return res.status(400).send({ message: 'Nieprawidłowy lub wygasły token' });
    }
};


module.exports = auth;
