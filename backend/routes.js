const express = require("express");
const { getAgents, getWeapons, getAgent, getWeapon } = require("./controller");

const router = express.Router();

router.get("/agents", getAgents);
router.get("/weapons", getWeapons);
router.get("/agents/:id", getAgent);
router.get("/weapons/:id", getWeapon);


module.exports = router;
