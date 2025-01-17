const { Agent, Weapon } = require("./index");

const getAgents = async (req, res) => {
  try {
    const agents = await Agent.find();
    res.status(200).json(agents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getWeapons = async (req, res) => {
  try {
    const weapons = await Weapon.find();
    res.status(200).json(weapons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAgent = async (req, res) => {
  try {
    const id = req.params.id;
    const agent = await Agent.findById(id);
    res.status(200).json(agent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getWeapon = async (req, res) => {
  try {
    const id = req.params.id;
    const weapon = await Weapon.findById(id);
    res.status(200).json(weapon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAgents, getWeapons, getAgent, getWeapon };
