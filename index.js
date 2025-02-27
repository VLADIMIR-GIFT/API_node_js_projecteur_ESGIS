require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db"); // Importation de la connexion à la base de données

const userRoutes = require("./routes/users");
const projectorRoutes = require("./routes/projectors");
const reservationRoutes = require("./routes/reservations");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes spécifiques
app.use("/users", userRoutes);
app.use("/projectors", projectorRoutes);
app.use("/reservations", reservationRoutes);

// Route racine ("/")
app.get("/", (req, res) => {
    res.send("Bienvenue sur le serveur de gestion des projecteurs !");
});

// Vérification de la connexion à la base de données
sequelize.authenticate()
    .then(() => console.log("🟢 Connexion à la base de données réussie"))
    .catch(err => console.error("🔴 Erreur de connexion à la base de données :", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
