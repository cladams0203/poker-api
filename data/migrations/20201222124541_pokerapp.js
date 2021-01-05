exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.string("username").notNullable();
      tbl.string("email").notNullable().unique();
      tbl.string("password").notNullable();
    })
    .createTable("table", (tbl) => {
      tbl.increments();
      tbl.integer("startingChips").defaultTo(10000);
      tbl.integer("blindTimer").defaultTo(10);
      tbl.string("tableName");
      tbl.integer("pot").defaultTo(0);
      tbl.integer("currentBet").defaultTo(0);
      tbl.integer("smallBlind").defaultTo(0);
      tbl.integer("bigBlind").defaultTo(0);
      tbl.string("tableCode");
      tbl.string("community");
      tbl.string("burn");
      tbl.integer("numberOfPlayers");
      tbl.integer("buttonLocation");
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("players", (tbl) => {
      tbl.increments();
      tbl.string("playername");
      tbl.integer("playerId");
      tbl.integer("chips");
      tbl.boolean("isFolded").defaultTo(false);
      tbl.boolean("isSmall").defaultTo(false);
      tbl.boolean("isLarge").defaultTo(false);
      tbl.boolean("isButton").defaultTo(false);
      tbl.string("currentHand");
      tbl.string("finalHand");
      tbl.integer("user");
      tbl
        .integer("table_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("table")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("players")
    .dropTableIfExists("table")
    .dropTableIfExists("users");
};
