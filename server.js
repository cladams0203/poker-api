const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const usersRouter = require("./users/usersRouter");
const tableRouter = require("./table/tableRouter");
const playersRouter = require("./players/playersRouter");
const { validateToken } = require("./middleware");

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());

app.use("/api/users", usersRouter);
app.use("/api/table", validateToken, tableRouter);
app.use("/api/players", validateToken, playersRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "app is running" });
});

module.exports = app;
