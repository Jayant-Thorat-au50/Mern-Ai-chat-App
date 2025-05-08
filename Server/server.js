import { config } from "dotenv";
config();
import http from "http";
import app from "./app.js";
import { Server } from "socket.io";
import JWT from "jsonwebtoken";
import mongoose from "mongoose";
import ProjectModel from "./Models/ProjectModel.js";
import UserModel from "./Models/UserModel.js";
import { generatResult } from "./Controller/services/ai.services.js";

const port = process.env.port;

const server = http.createServer(app);

let origin;

if (process.env.NODE_ENV === "production") {
  origin = "https://chatjay23.netlify.app";
} else {
  origin = "http://localhost:5173";
}

const io = new Server(server, {
  cors: {
    origin: origin,
    // origin:'https://chatjay23.netlify.app'
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


    if (!socket.project.users.includes(socket.user.id)) {
      return next(new Error("You are no longer a member of this project"));
    }

    next();
  } catch (error) {
    next(new Error("error", error));
  }
});

io.on("connection", async (socket) => {
  socket.roomId = socket.project._id.toString();

  socket.join(socket.roomId);
  console.log("a user connected");

  socket.on("project-message", async (data) => {
    const user = await UserModel.findById(data.sender);
    if (!user) {
      return new Error("user does not exists");
    }

    if (!socket.project) {
      return new Error("project does not exists");
    }

    const dataToSend = {
      sender: user.email,
      message: data.message,
      time:data.time,
    };
  // sending the message response from ai to the group chat
    // if the message contains @ai then we will send the message to the ai and get the response and send it to the group chat
    const messageForAi = data.message.includes("@ai");
    if (messageForAi) {
      try {
        const response = await generatResult(data.message);
    
      
      if (!response) return;
      socket.broadcast.to(socket.roomId).emit("project-message", dataToSend);
      io.to(socket.roomId).emit("project-message", {
        sender: "Gemini 2.0 flash",
        message: response,
        time:data.time,
      });
      return;
    } catch (error) {
      io.to(socket.roomId).emit("project-message", {
        sender: "Gemini 2.0 flash",
        message: error.message,
      });
      
    }
    }

    socket.broadcast.to(socket.roomId).emit("project-message", dataToSend);
  });

  socket.on('trigger-action', (data) => {
    socket.broadcast.to(socket.roomId).emit("trigger-action", data);
  })

  socket.on("event", (dataToSend) => {
    /* … */
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
    socket.leave(socket.roomId);
  });
});

server.listen(port, () => {
  console.log(`server is running on the port ${port} `);
});
