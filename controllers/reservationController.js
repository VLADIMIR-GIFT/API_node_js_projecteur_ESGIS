const Reservation = require("../Models/reservationModel");
const Projector = require("../Models/projectorModel");

exports.reserverProjecteur = async (req, res) => {
  try {
    const { projectId, date_reservation } = req.body;

    const projector = await Projector.findByPk(projectId);
    if (!projector || !projector.disponibilite) {
      return res.status(400).json({ message: "Projecteur non disponible" });
    }

    const nouvelleReservation = await Reservation.create({
      userId: req.user.id,
      projectId,
      date_reservation,
    });

    await projector.update({ disponibilite: false });

    res
      .status(201)
      .json({ message: "Réservation ajoutée avec succès", reservation: nouvelleReservation });
  } catch (error) {
    console.error("Erreur lors de l'ajout de la réservation :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Erreur lors de la récupération des réservations :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.annulerReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findByPk(id);

    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    await Projector.update({ disponibilite: true }, { where: { id: reservation.projectId } });

    await reservation.destroy();
    res.status(200).json({ message: "Réservation supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de la réservation :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};