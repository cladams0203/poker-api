const app = require("./server");
const http = require("http");
const Table = require("./table/tableModel");
const Players = require("./players/playersModel");

const server = http.createServer(app);
const options = {
  cors: true,
};

const io = require("socket.io")(server, options);
io.on("connection", (socket) => {
  socket.on("room", (newRoom) => {
    socket.join(newRoom);
    Table.findByGameCode(newRoom).then((table) => {
      Players.findByTableId(table.id).then((players) => {
        io.in(newRoom).emit("players", players);
      });
    });
  });
  socket.on("startGame", (gameCode) => {
    console.log(gameCode);
  });
});

module.exports = server;
