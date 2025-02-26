const express = require("express");
const { getProjectors } = require("../controllers/projectorController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

const { ajouterProjecteur } = require('../controllers/projectorController');

router.get("/", authMiddleware, getProjectors);
router.post("/add", ajouterProjecteur);

module.exports = router;