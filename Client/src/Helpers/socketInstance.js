import socket from "socket.io-client";

let socketInstance = null;

export const initializeSocket = (projectId) => {
  socketInstance = socket("http://localhost:8080", {
    auth: {
      token: JSON.parse(localStorage.getItem("token")),
    },
    query: {
      projectId,
    },
  });

  return socketInstance;
};

export const sendMsg = (eventName, data) => {
  if(socketInstance && socketInstance.connected){
      console.log('socket connected');
      
   return socketInstance.emit(eventName, data);
  }else{
    return window.alert('no connection');
    
  }
};
export const receiveMsg = (eventName, cb) => {
  socketInstance.on(eventName, cb);
};
