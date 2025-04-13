import socket from "socket.io-client";
 
let socketInstance = null;

export const initializeSocket = (projectId) => {


  socketInstance =  socket("http://localhost:8080", {
    auth: {
      token: JSON.parse(localStorage.getItem("token")),
    },
    query:{
      projectId
    }
  });

  return socketInstance;
};


export const sendMsg = (eventName, cb) => {
   socketInstance.emit(eventName, data)
}
export const receiveMsg = () => {
  socketInstance.on(eventName, cb)
}