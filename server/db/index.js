const mysql = require("mysql");

if (process.env.JAWSDB_URL) {
  connectionInfo = process.env.JAWSDB_URL;
} else {
  connectionInfo = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };
}

const connection = mysql.createConnection({
  // connectionLimit: 10,
  // password: "password",
  // user: "root",
  // database: "recipe",
  // host: "127.0.0.1",
  connectionInfo,
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

let recipedb = {};

// GET USERS
recipedb.getUsers = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM users", (err, results) => {
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
    connection.query(
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
    connection.query(
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
    connection.query(
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
    connection.query(
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
    connection.query(
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
    connection.query(
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
  connection.query(
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
