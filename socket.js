const app = require("./server");
const http = require("http");

const server = http.createServer(app);
const options = {
  cors: true,
};

const io = require("socket.io")(server, options);
io.on("connection", (socket) => {
  console.log("its working");
  socket.on("room", (newRoom) => {
    console.log(newRoom);
    // io.emit("from_Api", incoming);
  });
});

module.exports = server;
