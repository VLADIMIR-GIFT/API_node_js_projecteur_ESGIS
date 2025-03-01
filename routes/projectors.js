const express = require("express");
const { getProjectors } = require("../controllers/projectorController");
const router = express.Router();

const { ajouterProjecteur } = require('../controllers/projectorController');
const { updateProjector} = require('../controllers/projectorController');
const {deleteProjector} = require('../controllers/projectorController');

router.post("/add", ajouterProjecteur);
router.get("/", getProjectors);
router.put("/", updateProjector);
router.delete("/",deleteProjector);

module.exports = router;