const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  // Extraction du token de l'en-tête Authorization
  const token = req.header("Authorization") && req.header("Authorization").split(" ")[1];

  // Si le token est absent, renvoyer un accès refusé
  if (!token) {
    return res.status(401).json({ message: "Accès refusé, token manquant" });
  }

  try {
    // Vérifier le token avec la clé secrète
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    // Ajouter les informations de l'utilisateur vérifié dans la requête
    req.user = verified;
    
    // Passer au prochain middleware ou à la fonction de traitement de la route
    next();
  } catch (error) {
    // Si le token est invalide ou expiré, renvoyer une erreur
    res.status(400).json({ message: "Token invalide ou expiré" });
  }
};


// const jwt = require("jsonwebtoken");

// exports.authMiddleware = (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) return res.status(401).json({ message: "Accès refusé" });

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (error) {
//     res.status(400).json({ message: "Token invalide" });
//   }
// };