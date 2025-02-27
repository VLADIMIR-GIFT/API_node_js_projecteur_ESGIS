// models/reservationModel.js
const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Reservation = db.define("reservations", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date_reservation: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: "reservations",
});

module.exports = Reservation;