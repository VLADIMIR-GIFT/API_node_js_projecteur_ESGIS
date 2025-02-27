const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  // Extraction du token de l'entête Authorization
  const token = req.header("Authorization") && req.header("Authorization").split(" ")[1];

    // Si le token est absent, renvoie un accès refusé
  if (!token) {
    return res.status(401).json({ message: "Accès refusé, token manquant" });
  }

  try {
        // Vérifie le token avec la clé secrète
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Ajout des informations de l'utilisateur (y compris le rôle)

        // Passer au prochain middleware ou à la fonction de traitement de la route
    next();
  } catch (error) {
        // Si le token est invalide ou expiré, renvoie une erreur
    res.status(400).json({ message: "Token invalide ou expiré" });
  }
};