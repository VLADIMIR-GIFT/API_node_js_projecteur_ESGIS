const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Vérifie si ce fichier existe

const Projector = sequelize.define("Projector", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nom: { type: DataTypes.STRING, allowNull: false },
    etat: { type: DataTypes.STRING, allowNull: false },
    disponibilite: { type: DataTypes.BOOLEAN, allowNull: false }
});

module.exports = Projector;