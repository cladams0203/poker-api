const Players = require("./playersModel");
const Table = require("../table/tableModel");
const router = require("express").Router();

router.get("/:code", (req, res) => {
  Table.findByGameCode(req.params.code)
    .then((table) => {
      Players.findByTableId(table.table_id)
        .then((players) => {
          res.status(200).json(players);
        })
        .catch((err) => res.status(500).json({ message: err.message }));
    })
    .catch((err) => res.status(500).json({ message: err.message }));
});

router.post("/", (req, res) => {});

module.exports = router;
