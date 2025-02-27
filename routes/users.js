const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware/authMiddleware");
const User = require("../Models/userModel");

router.post("/register", async (req, res) => {
    const { email, password, role } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ email, password: hashedPassword, role: role || "student" });
      res.status(201).json({ message: "Utilisateur créé avec succès" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: "Email ou mot de passe incorrect" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Email ou mot de passe incorrect" });
      }
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get("/profile", authMiddleware, (req, res) => { 
    res.json(req.user);
  });

module.exports = router;