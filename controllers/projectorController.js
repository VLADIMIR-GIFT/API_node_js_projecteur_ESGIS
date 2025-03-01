const Projector = require("../Models/projectorModel");

//Ajouter un projecteur
exports.ajouterProjecteur = (req, res) => {
    const { nom, etat, disponibilite } = req.body;

    Projecteur.create({ nom, etat, disponibilite })
        .then((projecteur) => {
            res.status(201).json({ message: "Projecteur ajouté avec succès", projecteur });
        })
        .catch((error) => {
            res.status(500).json({ message: "Erreur lors de l'ajout du projecteur", error });
        });
};

// lister les projecteurs disponoble

exports.getProjectors = async (req, res) => {
  try {
    const projectors = await Projector.getAll();
    res.json(projectors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Modifier l'etat d'un projecteur 

exports.updateProjector = async (req, res) => {
  try {
    const { id } = req.params;
    const { etat} = req.body;
    const projector = await Projector.findByPk(id);
    if (!projector) return res.status(404).json({ message: 'Projecteur non trouvé' });

    projector.status = etat;
    await projector.save();
    res.status(200).json({ message: 'l"etat de projecteur modifié avec succès', projector });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Suprimer un projecteur 


exports.deleteProjector = async (req, res) => {
  try {
    const { id } = req.params;
    const projector = await Projector.findByPk(id);
    if (!projector) return res.status(404).json({ message: 'Projecteur non trouvé' });

    await projector.destroy();
    res.status(200).json({ message: 'Projecteur suprimer avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};