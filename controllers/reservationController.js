// controllers/reservationController.js
const Reservation = require("../Models/reservationModel");

// Ajouter une réservation
exports.ajouterReservation = async (req, res) => {
    try {
        const { utilisateur_id, projecteur_id, date_reservation } = req.body;

        if (!utilisateur_id || !projecteur_id || !date_reservation) {
            return res.status(400).json({ message: "Tous les champs sont requis." });
        }

        const nouvelleReservation = await Reservation.create({
            utilisateur_id,
            projecteur_id,
            date_reservation,
            status: "en attente"
        });

        res.status(201).json({ message: "Réservation ajoutée avec succès", reservation: nouvelleReservation });
    } catch (error) {
        console.error("Erreur lors de l'ajout de la réservation :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// Récupérer toutes les réservations
exports.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.findAll();
        res.status(200).json(reservations);
    } catch (error) {
        console.error("Erreur lors de la récupération des réservations :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// Modifier une réservation
exports.modifierReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const reservation = await Reservation.findByPk(id);
        if (!reservation) {
            return res.status(404).json({ message: "Réservation non trouvée" });
        }

        reservation.status = status;
        await reservation.save();

        res.status(200).json({ message: "Réservation mise à jour", reservation });
    } catch (error) {
        console.error("Erreur lors de la modification de la réservation :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// Supprimer une réservation
exports.supprimerReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const reservation = await Reservation.findByPk(id);

        if (!reservation) {
            return res.status(404).json({ message: "Réservation non trouvée" });
        }

        await reservation.destroy();
        res.status(200).json({ message: "Réservation supprimée avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression de la réservation :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};