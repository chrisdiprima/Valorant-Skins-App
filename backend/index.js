const mongoose = require("mongoose");

const abilitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  description: { type: String, required: true },
  video: { type: String, required: true },
});

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, reqiroed: true},
  class: { type: String, required: true },
  fullImage: { type: String, required: true },
  portraitImage: { type: String, required: true },
  backgroundImage: { type: String, required: true },
  abilities: { type: [abilitySchema], required: true },
});

const Agent = mongoose.model("Agent", agentSchema);

const chromaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  swatchIcon: { type: String, required: true },
  image: { type: String, required: true },
});

const levelSchema = new mongoose.Schema({
  levelNumber: { type: Number, required: true },
  cost: { type: Number, required: true },
  description: { type: String, required: true },
  video: { type: String, required: true },
});

const skinSchema = new mongoose.Schema({
  name: { type: String, required: true },
  collection: { type: String, required: true },
  cost: { type: Number, required: true },
  rarity: { type: String, required: true },
  chromas: { type: [chromaSchema], default: [] },
  levels: { type: [levelSchema], default: [] },
});

const weaponSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true },
  cost: { type: Number, required: true },
  fullRenderImage: { type: String, required: true },
  smallImage: { type: String, required: true },
  skins: { type: [skinSchema], required: true },
});

const Weapon = mongoose.model("Weapon", weaponSchema);

module.exports = { Agent, Weapon };
