const db = require("../data/dbConfig");

module.exports = {
  findByTableId,
  insert,
  update,
};

function findByTableId(table_id) {
  return db("players").where({ table_id });
}

function insert(player) {
  return db("players").insert(player, "*");
}

function update(id, player) {
  return db("players").where({ id }).update(player);
}
