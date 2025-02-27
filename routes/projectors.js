const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const { isAdmin, isTeacher } = require("../middleware/roleMiddleware");
const {getProjectors, ajouterProjecteur, modifierProjecteur, supprimerProjecteur,} = require("../controllers/projectorController");

router.get("/", authMiddleware, getProjectors);
router.post("/add", authMiddleware, isAdmin, ajouterProjecteur);
router.put("/:id", authMiddleware, (req, res, next) => {
    if (req.user.role === "admin" || req.user.role === "teacher") {
        next();
    } else {
        res.status(403).json({ message: "Accès interdit" });
    }
}, modifierProjecteur);
router.delete("/:id", authMiddleware, isAdmin, supprimerProjecteur);

module.exports = router;