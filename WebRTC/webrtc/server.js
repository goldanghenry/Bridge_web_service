const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

// HTTPS 관련 코드를 제거하고 HTTP 서버를 생성
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: [
      // "https://localhost:3000",
      // "https://192.168.114.155:3000",
      // "https://localhost:8080",
      // "https://192.168.114.155:8080",
      "https://bridgepeople.site",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("offer", (offer) => {
    socket.broadcast.emit("offer", offer);
  });

  socket.on("answer", (answer) => {
    socket.broadcast.emit("answer", answer);
  });

  socket.on("candidate", (candidate) => {
    socket.broadcast.emit("candidate", candidate);
  });

  socket.on("chatMessage", (msg) => {
    socket.broadcast.emit("chatMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
