const Table = require("./tableModel");
const router = require("express").Router();

router.get("/:id", (req, res) => {
  Table.findById(req.params.id)
    .then((table) => {
      res.status(200).json(table);
    })
    .catch((err) => res.status(500).json({ message: err.message }));
});
router.get("/code/:id", (req, res) => {
  Table.findByGameCode(req.params.id)
    .then((table) => {
      res.status(200).json(table);
    })
    .catch((err) => res.status(500).json({ message: err.message }));
});
router.post("/", (req, res) => {
  const body = { ...req.body, user_id: req.user.id };
  Table.insert(body)
    .then((table) => {
      res.status(201).json(table);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
