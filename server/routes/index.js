const express = require("express");
const db = require("../db");

const router = express.Router();

// GET ALL USERS
router.get("/users", async (req, res, next) => {
  console.log("GET USERS");
  try {
    let results = await db.getUsers();
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// GET USER BY EMAIL
router.get("/users/:email", async (req, res, next) => {
  console.log("GET USER");
  try {
    let results = await db.getUser(req.params.email);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// GET RECIPES BY USER ID (no instruction/ingridients)
router.get("/users/:email/recipes", async (req, res, next) => {
  console.log("GET RECIPES BY USER");
  try {
    let results = await db.getRecipes(req.params.email);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// GET RECIPE BY ID
router.get("/recipes/:id", async (req, res, next) => {
  console.log("GET RECIPE BY ID");
  try {
    let results = await db.getRecipe(req.params.id);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// DELETE RECIPE BY ID
router.delete("/recipes/:id", async (req, res, next) => {
  console.log("DELETE RECIPE BY ID");
  try {
    let results = await db.deleteRecipe(req.params.id);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// GET INSTRUCTION BY RECIPE ID
router.get("/recipes/:id/instructions", async (req, res, next) => {
  console.log("GET INSTRUCTIONS");
  try {
    let results = await db.getInstructions(req.params.id);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// GET INGRIDIENTS BY RECIPE ID
router.get("/recipes/:id/ingridients", async (req, res, next) => {
  console.log("GET INGRIDIENTS");
  try {
    let results = await db.getIngridients(req.params.id);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// CREATE RECIPE
router.post("/users/:email/recipes", async (req, res, next) => {
  console.log("CREATE RECIPE");
  try {
    let userEmail = req.params.email;
    let recipe = req.body;
    console.log(recipe);
    await db.insertRecipe(userEmail, recipe);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
