const express = require("express");
const cors = require("cors");
const io = require("socket.io");
const morgan = require("morgan");
const PORT = 3000;
const http = require("http");
const app = express();
const { lobby } = require("./sockets/lobby.js");
app.use(
  express.json({ limit: "50mb" }),
  express.urlencoded({ extended: true, limit: "50mb" })
);

app.use(
  cors({
    origin: "*",
    credentials: false,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  })
);
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.send("<h1>Hello from Server</h1>");
});

app.listen(PORT, () => {
  console.log(`Listening to server on Port ${PORT}`);
});

const httpServer = http.createServer(app);
const server = httpServer.listen(3001, () => {
  console.log("Listening to socket server on Port 3001");
});
const socketServer = io(server, {
  cors: {
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE"],
  },
});
lobby(socketServer);
