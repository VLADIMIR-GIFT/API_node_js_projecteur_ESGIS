// routes/reservations.js
const express = require("express");
const router = express.Router();
const { ajouterReservation, getReservations, modifierReservation, supprimerReservation } = require("../controllers/reservationController");
const { authMiddleware } = require("../middleware/authMiddleware");

// Routes pour les réservations
router.post("/add", authMiddleware, ajouterReservation); // Ajouter une réservation
router.get("/", authMiddleware, getReservations); // Récupérer toutes les réservations
router.put("/update/:id", authMiddleware, modifierReservation); // Modifier une réservation
router.delete("/delete/:id", authMiddleware, supprimerReservation); // Supprimer une réservation

module.exports = router;