const Projector = require("../Models/projectorModel");

exports.getProjectors = async (req, res) => {
  try {
    const projectors = await Projector.getAll();
    res.json(projectors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// E:\projet_node_projecteur\controllers\projectorController.js

// Exemple de fonction pour ajouter un projecteur
exports.ajouterProjecteur = (req, res) => {
    const { nom, etat, disponibilite } = req.body;

    // Logique pour ajouter le projecteur dans la base de données
    // Tu peux utiliser ton modèle Sequelize pour interagir avec la base de données

    Projecteur.create({ nom, etat, disponibilite })
        .then((projecteur) => {
            res.status(201).json({ message: "Projecteur ajouté avec succès", projecteur });
        })
        .catch((error) => {
            res.status(500).json({ message: "Erreur lors de l'ajout du projecteur", error });
        });
};