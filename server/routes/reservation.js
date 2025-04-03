const router = require("express").Router();
const { Reservation, validate } = require("../models/reservation");
const auth = require("../middleware/auth"); // Importuj middleware autoryzacji
const mongoose = require("mongoose");

router.post("/", auth,  async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        // Dodajemy userId z formularza do ciała rezerwacji
        const { userId, name, email, date } = req.body;

        const reservationData = {
            userId,  // Pobieramy userId z formularza
            name,
            email,
            date
        };

        const reservation = new Reservation(reservationData);
        await reservation.save();
        res.status(201).send({ message: "Rezerwacja została pomyślnie dodana" });
    } catch (error) {
        res.status(500).send({ message: "Błąd serwera" });
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const userId = req.user.id; // Pobieramy userId z tokena
        const status = req.user.status; // Pobieramy rolę użytkownika z tokena

        console.log("User ID:", userId);
        console.log("Status:", status);

        let reservations;
        if (status === "ADMIN") {
            reservations = await Reservation.find({});
        } else if (status === "USER") {
            reservations = await Reservation.find({ userId: userId });
        } else {
            return res.status(403).send({ message: "Brak dostępu" });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Zerujemy godziny, minuty, sekundy, milisekundy

        const currentReservations = reservations.filter(res => new Date(res.date) >= today)
            .sort((a, b) => new Date(a.date) - new Date(b.date));
        
        const pastReservations = reservations.filter(res => new Date(res.date) < today)
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        res.status(200).send({
            currentReservations,
            pastReservations
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ message: "Błąd serwera" });
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!reservation) return res.status(404).send({ message: "Rezerwacja nie znaleziona" });
        res.status(200).send({ message: "Rezerwacja została pomyślnie usunięta" });
    } catch (error) {
        res.status(500).send({ message: "Błąd serwera" });
    }
});

router.get("/:id", auth, async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if(reservation.userId.toString() !== req.user.id && req.user.status !== "ADMIN") return res.status(403).send({ message: "Brak dostępu" });
        else if (!reservation) return res.status(404).send({ message: "Rezerwacja nie znaleziona" });
        res.status(200).send(reservation);
    } catch (error) {
        res.status(500).send({ message: "Błąd serwera" });
    }
});

router.put("/:id", auth, async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!reservation) return res.status(404).send({ message: "Rezerwacja nie znaleziona" });
        await reservation.save();
        res.status(200).send({ message: "Rezerwacja została pomyślnie zaktualizowana" });
    } catch (error) {
        res.status(500).send({ message: "Błąd serwera" });
    }
});

module.exports = router;
