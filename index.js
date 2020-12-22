// const socketIO = require("socket.io");
const app = require("./server");
const http = require("http");

const server = http.createServer(app);
const options = {
  cors: true,
};

const io = require("socket.io")(server, options);
io.on("connection", (socket) => {
  console.log("its working");
  socket.on("app_data", (incoming) => {
    console.log(incoming);
    io.emit("from_Api", "hello from the api");
  });
});

server.listen(5000, () => {
  console.log("server is running");
});
