import { config } from "dotenv";
config();
import http from "http";
import app from "./app.js";
import { Server } from "socket.io";
import JWT from "jsonwebtoken";

const port = process.env.port;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.use((socket, next) => {
  try {
    const token = socket.handshake.headers.token;

    if (!token) {
      return next(new Error("Authentication error"));
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return next(new Error("Authentication error"));
    }

    socket.user = decoded;

    console.log("next");

    next();
  } catch (error) {
    next(error);
  }
});

io.on("connection", (socket) => {
  console.log(`a user is connected to socket`);

  socket.on("event", (data) => {});
  socket.on("disconnect", () => {});
});

server.listen(port, () => {
  console.log(`server is running on the port ${port} `);
});
