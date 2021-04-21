const mysql = require("mysql");

const pool = mysql.createPool({
  //connectionLimit: 10,
  //password: "password",
  //user: "root",
  //database: "recipe",
  //host: "127.0.0.1",
  //port: 3306,
  HOST: "us-cdbr-east-03.cleardb.com",
  USER: "b31aa89a149cec",
  PASSWORD: "e15db93b",
  DB: "heroku_004f919d4394a75",
});

let recipedb = {};

// GET USERS
recipedb.getUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users", (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

// GET USER
recipedb.getUser = (email) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM users WHERE email = ?`,
      [email],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        console.log(results);
        return resolve(results[0]);
      }
    );
  });
};

// GET RECIPES
recipedb.getRecipes = (userEmail) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM recipes WHERE `user_email` = ?",
      [userEmail],
      (err, results) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        console.log(results);
        return resolve(results);
      }
    );
  });
};

// GET RECIPE
recipedb.getRecipe = (recipeId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM recipes WHERE `id` = ?",
      [recipeId],
      (err, results) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        console.log(results);
        return resolve(results);
      }
    );
  });
};

// DELETE RECIPE
recipedb.deleteRecipe = (recipeId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "DELETE FROM recipes WHERE `id` = ?",
      [recipeId],
      (err, results) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        console.log(results);
        return resolve(results);
      }
    );
  });
};

// GET INSTRUCTIONS
recipedb.getInstructions = (recipeId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM instructions WHERE `recipe_id` = ? ORDER BY instruction_order;",
      [recipeId],
      (err, results) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        console.log(results);
        return resolve(results);
      }
    );
  });
};

//GET INGRIDIENTS
recipedb.getIngridients = (recipeId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM ingridients WHERE `recipe_id` = ?;",
      [recipeId],
      (err, results) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        console.log(results);
        return resolve(results);
      }
    );
  });
};

// CREATE RECIPE
recipedb.insertRecipe = (userEmail, recipe) => {
  pool.query(
    `CALL insert_recipe(?,?,?,?,?,?,?,?,?,?,?)`,
    [
      userEmail,
      recipe.title,
      recipe.url,
      recipe.yields,
      JSON.stringify(recipe.nutrients),
      recipe.image,
      recipe.host,
      recipe.rating,
      recipe.total_time,
      arrayToString(recipe.ingredients),
      arrayToString(recipe.instructions),
    ],
    (err, results) => {
      if (err) {
        console.log("recipe insert failed");
        console.log(err);
        return;
      }
      console.log("recipe insert successed");
      console.log(results);
      return;
    }
  );
};

const arrayToString = (arr) => {
  console.log(arr);
  str = arr.join("|");
  return str;
};

module.exports = recipedb;
