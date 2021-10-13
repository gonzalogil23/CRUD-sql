const { options } = require("../options/mariaDB");
const knex = require("knex")(options);

const products = require("./products.js");

knex.schema
  .createTable("products", (table) => {
    table.increments("id"),
      table.string("title"),
      table.float("price"),
      table.string("thumbnail");
  })
  .then(() => {
    return knex("products").insert(products);
  })
  .then(() => {
    return knex.from("products").select("*");
  })
  .then(() => {
    return knex
      .from("products")
      .where("price", ">", "60000")
      .update({ price: 75000 });
  })
  .then(() => {
    return knex.from("products").where("id", "=", "5").del();
  })
  .catch((e) => {
    console.log("Error en proceso CRUD:", e);
    knex.destroy();
  });
