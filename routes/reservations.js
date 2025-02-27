// routes/reservations.js
const express = require("express");
const router = express.Router();
const { getReservations, reserverProjecteur, annulerReservation,} = require("../controllers/reservationController");
const { authMiddleware } = require("../middleware/authMiddleware");

// Routes pour les réservations
router.get("/", authMiddleware, getReservations);
router.post("/", authMiddleware, reserverProjecteur);
router.delete("/:id", authMiddleware, annulerReservation);


module.exports = router;