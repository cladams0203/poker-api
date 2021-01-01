const db = require("../data/dbConfig");

module.exports = {
  findByTableId,
  insert,
};

function findByTableId(table_id) {
  return db("players").where({ table_id });
}

function insert(player) {
  return db("players").insert(player, "*");
}
