const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ message: "app is running" });
});

module.exports = app;
