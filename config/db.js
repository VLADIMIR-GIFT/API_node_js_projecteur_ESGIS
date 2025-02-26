require("dotenv").config();  // Assure-toi que dotenv est bien importé

const { Sequelize } = require("sequelize");

// Utilisation des variables d'environnement depuis .env
const sequelize = new Sequelize(
    process.env.DB_NAME,    // Nom de la base de données
    process.env.DB_USER,    // Utilisateur (root)
    process.env.DB_PASSWORD,  // Mot de passe
    {
        host: process.env.DB_HOST,  // Hôte (localhost)
        dialect: "mysql",           // Le SGBD utilisé (mysql dans ce cas)
        logging: false              // Ne pas afficher les requêtes SQL dans la console
    }
);

// Vérification de la connexion
sequelize.authenticate()
    .then(() => console.log("✅ Connexion réussie à la base de données"))
    .catch(err => console.error("❌ Erreur de connexion :", err));

module.exports = sequelize;
