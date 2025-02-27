const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

exports.register = async (req, res) => {
  try {
    const { nom, email, mot_de_passe, role } = req.body;
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    const user = await User.create({ // Utilisation de User.create()
      nom: nom,
      email: email,
      password: hashedPassword,
      role: role || "student",
    });
    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;
    const user = await User.findOne({ where: { email } }); // Utilisation de User.findOne()
    if (!user || !(await bcrypt.compare(mot_de_passe, user.password))) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};