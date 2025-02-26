const db = require("../config/db");

class User {
  static async createUser(nom, email, mot_de_passe, role = "etudiant") {
    const sql = "INSERT INTO utilisateurs (nom, email, mot_de_passe, role) VALUES (?, ?, ?, ?)";
    return db.execute(sql, [nom, email, mot_de_passe, role]);
  }

  static async findByEmail(email) {
    const sql = "SELECT * FROM utilisateurs WHERE email = ?";
    const [rows] = await db.execute(sql, [email]);
    return rows[0];
  }
}

module.exports = User;