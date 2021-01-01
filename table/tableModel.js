const db = require("../data/dbConfig");

module.exports = {
  find,
  findById,
  findByGameCode,
  insert,
  remove,
};

function find() {
  return db("table");
}

function findById(id) {
  return db("table").where({ id }).first();
}

function findByGameCode(gameCode) {
  return db("table").where({ gameCode }).first();
}

async function insert(table) {
  const [newTable] = await db("table").insert(table, "*");
  return newTable;
}

function remove(id) {
  return db("table").where({ id }).del();
}
