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

router.post("/:code", async (req, res) => {
  const newPlayer = req.body;
  Table.findByGameCode(req.params.code)
    .then((table) => {
      Players.findByTableId(table.id)
        .then((players) => {
          if (players.length <= 9) {
            if (players.length === 0) {
              Players.insert({
                ...newPlayer,
                table_id: table.id,
                playerId: 1,
              })
                .then((player) => {
                  res
                    .status(201)
                    .json({ message: "player successfully joined" });
                })
                .catch((err) => console.log(err));
            } else {
              Players.insert({
                ...newPlayer,
                table_id: table.id,
                playerId: players.length + 1,
              })
                .then((player) => {
                  res
                    .status(201)
                    .json({ message: "player successfully joined" });
                })
                .catch((err) => console.log(err));
            }
          } else {
            res.status(403).json({ message: "table is at maximum capacity" });
          }
        })
        .catch((err) => {
          console.log(err);
          res
            .status(500)
            .json({ message: "unable to find players", error: err.message });
        });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "could not find table", error: err.message });
    });
});

module.exports = router;
