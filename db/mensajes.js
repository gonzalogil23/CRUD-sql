const { options } = require("../options/SQLite3");
const knex = require("knex")(options);

const mensajes = require("./mensajes.js");

knex.schema
  .createTable("mensajes", (table) => {
    table.increments("id"),
      table.string("autor"),
      table.string("text"),
      table.integer("fecha");
  })
  .then(() => {
    console.log("tabla creada!");
    return knex("mensajes").insert(mensajes);
  })
  .then(() => {
    console.log("Mensajes agregados");
    return knex.from("mensajes").select("*");
  })
  .then(() => {
    console.log("Mensajes seleccionados");
    return knex
      .from("mensajes")
      .where("text".length, ">", "30")
      .update({ id: 1000 });
  })
  .then(() => {
    console.log("Mensajes actualizados");
    console.log("Borro el primer mensaje");
    return knex.from("mensajes").where("id", "=", "1").del();
  })
  .catch((e) => {
    console.log("Error en proceso CRUD:", e);
    knex.destroy();
  });
