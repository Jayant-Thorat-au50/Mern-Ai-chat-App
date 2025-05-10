import socket from "socket.io-client";

let socketInstance = null;

export const initializeSocket = (projectId) => {
  socketInstance = socket("https://mern-ai-chat-app-1vdd.onrender.com/api/v1", {
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

export const refreshPage = (eventName, cb) => {
  socketInstance.emit(eventName, cb)
}
export const getRefreshPage = (eventName, cb) => {
  socketInstance.on(eventName, cb)
}