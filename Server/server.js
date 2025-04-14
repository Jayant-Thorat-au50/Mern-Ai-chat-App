import { config } from "dotenv";
config();
import http from "http";
import app from "./app.js";
import { Server } from "socket.io";
import JWT from "jsonwebtoken";
import mongoose from "mongoose";
import ProjectModel from "./Models/ProjectModel.js";

const port = process.env.port;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    const projectId = socket.handshake.query.projectId;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return new Error("Invalid project Id");
    }

    const project = await ProjectModel.findById(projectId);

    if (!project) {
      return new Error("project does not exists");
    }

    if (!token) {
      return next(new Error("Authentication error"));
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return next(new Error("Authentication error"));
    }

    socket.user = decoded;
    socket.project = project;
    next();
  } catch (error) {
    next(new Error("error", error));
  }
});

io.on("connection", (socket) => {
  socket.join(socket.project._id);

  console.log("a user connected");

  socket.on("project-message", (data) => {
    console.log(data);

    socket.broadcast.to(socket.project._id).emit("project-message", data);
  });

  socket.on("event", (data) => {
    /* … */
  });
  socket.on("disconnect", () => {
    /* … */
  });
});

server.listen(port, () => {
  console.log(`server is running on the port ${port} `);
});
