import socket from "socket.io-client";

let socketInstance = null;

export const initializeSocket = () => {
  socketInstance =  socket("http://localhost:8080", {
    auth: {
      token: JSON.parse(localStorage.getItem("token")),
    },
  });

  return socketInstance;
};


