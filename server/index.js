require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const socketIO = require("socket.io");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const app = express();

const PORT = process.env.PORT || 5000;
const DB_CONNECT = process.env.DB_CONNECT;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;

app.use(cors());
app.use(express.json());

//routes
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

mongoose
  .connect(DB_CONNECT)
  .then(() => {
    console.log(`DB connected`);
  })
  .catch((err) => console.log(err));

const server = app.listen(PORT, () => {
  console.log(`server running in port ${PORT}`);
});

const io = socketIO(server, {
  cors: {
    origin: CLIENT_ORIGIN,
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
