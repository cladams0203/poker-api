const db = require("../data/dbConfig");

module.exports = {
  findById,
  find,
  insert,
  findByEmail,
};
function find() {
  return db("users").select("id", "username", "email");
}
function findById(id) {
  return db("users").where({ id }).first();
}
async function insert(user) {
  const [newUser] = await db("users").insert(user, "*");
  return newUser;
}
function findByEmail(email) {
  return db("users").where({ email }).first();
}
