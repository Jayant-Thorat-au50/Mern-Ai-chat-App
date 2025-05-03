Okay, let's outline a plan for creating a basic video calling application using the MERN stack with ES6 features. Given the complexity of a full-fledged video calling application, we'll focus on the essential components:

**Overall Structure**

1.  **Backend (Node.js with Express):**
    *   Set up an Express server to handle signaling. Signaling is the process of exchanging metadata to coordinate the video call setup between peers (clients). This typically involves exchanging information like network addresses (IP addresses and ports) and media capabilities.
    *   Use Socket.IO for real-time communication between clients and the server. This enables efficient exchange of signaling data.
    *   Handle user connections and disconnections.
    *   Manage room creation and joining.
2.  **Frontend (React):**
    *   Develop a React interface for users to join or create rooms.
    *   Use the WebRTC API to access the user's camera and microphone.
    *   Establish peer-to-peer connections using WebRTC.
    *   Display local and remote video streams.
3.  **Database (MongoDB):** (Optional for a basic implementation, but good for user management, call history, etc.)
    *   Can be used to store user information, call history, or room metadata if needed.

**File Structure**

```
video-call-app/
├── backend/
│   ├── server.js          # Main server file
│   ├── package.json
│   ├── roomManager.js     # Module to manage rooms
│   └── socketHandler.js   # Module to handle Socket.IO events
├── frontend/
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── components/
│   │   │   ├── Video.js    # Component to display video streams
│   │   │   └── Room.js     # Component for room-related logic
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   │   └── index.html       # Main HTML file
│   ├── package.json
│   └── webpack.config.js    # (Optional) Webpack configuration
├── package.json           # Main project package.json (optional)
└── README.md
```

**1. Backend (Node.js with Express)**

*   **`backend/package.json`**

```json
{
  "name": "video-call-server",
  "version": "1.0.0",
  "description": "Signaling server for video call app",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "socket.io": "^4.7.2",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

Install dependencies: `npm install` in the `backend` directory.

*   **`backend/server.js`**

```javascript
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { handleSocketEvents } from './socketHandler.js'; // Import the handler

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Or your React app's URL
    methods: ["GET", "POST"]
  }
});

const port = process.env.PORT || 5000;

app.use(cors()); // Enable CORS for all routes

app.get('/', (req, res) => {
  res.send('Video call server is running');
});

// Call the handler function to set up socket events
handleSocketEvents(io);

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

*   **`backend/socketHandler.js`**:  This file will contain all the socket event logic.

```javascript
// socketHandler.js

import { RoomManager } from './roomManager.js';

const roomManager = new RoomManager();

export const handleSocketEvents = (io) => {
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('createRoom', (roomId, callback) => {
            try {
                roomManager.createRoom(roomId, socket);
                socket.join(roomId);
                console.log(`Room created: ${roomId} by ${socket.id}`);
                callback({ status: 'ok', message: `Room ${roomId} created` });
            } catch (error) {
                console.error(error.message);
                callback({ status: 'error', message: error.message });
            }
        });

        socket.on('joinRoom', (roomId, callback) => {
            try {
                roomManager.joinRoom(roomId, socket);
                socket.join(roomId);
                console.log(`User ${socket.id} joined room ${roomId}`);
                io.to(roomId).emit('userJoined', socket.id);  // Notify existing users
                callback({ status: 'ok', message: `Joined room ${roomId}` });
            } catch (error) {
                console.error(error.message);
                callback({ status: 'error', message: error.message });
            }
        });

        socket.on('iceCandidate', (roomId, candidate) => {
            socket.to(roomId).emit('iceCandidate', socket.id, candidate);
        });

        socket.on('offer', (roomId, description) => {
            socket.to(roomId).emit('offer', socket.id, description);
        });

        socket.on('answer', (roomId, description) => {
            socket.to(roomId).emit('answer', socket.id, description);
        });

        socket.on('leaveRoom', (roomId) => {
            roomManager.leaveRoom(roomId, socket);
            socket.leave(roomId);
            io.to(roomId).emit('userLeft', socket.id);
            console.log(`User ${socket.id} left room ${roomId}`);
        });

        socket.on('disconnecting', () => {
            const rooms = roomManager.getRoomsForSocket(socket); // Get all rooms the socket is in

            rooms.forEach(roomId => {
                roomManager.leaveRoom(roomId, socket);
                io.to(roomId).emit('userLeft', socket.id);
                console.log(`User ${socket.id} disconnected from room ${roomId}`);
            });
        });


        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
};
```

*   **`backend/roomManager.js`**: This module will manage the rooms.

```javascript
// roomManager.js

export class RoomManager {
    constructor() {
        this.rooms = {}; // { roomId: [socketId1, socketId2, ...]}
    }

    createRoom(roomId, socket) {
        if (this.rooms[roomId]) {
            throw new Error(`Room ${roomId} already exists`);
        }
        this.rooms[roomId] = [socket.id];
    }

    joinRoom(roomId, socket) {
        if (!this.rooms[roomId]) {
            throw new Error(`Room ${roomId} does not exist`);
        }

        if (this.rooms[roomId].length >= 2) { // Limit to 2 participants for simplicity
            throw new Error(`Room ${roomId} is full`);
        }
        this.rooms[roomId].push(socket.id);
    }

    leaveRoom(roomId, socket) {
        if (!this.rooms[roomId]) {
            return; // Room doesn't exist, nothing to do
        }

        this.rooms[roomId] = this.rooms[roomId].filter(socketId => socketId !== socket.id);
        if (this.rooms[roomId].length === 0) {
            delete this.rooms[roomId]; // Remove the room if it's empty
        }
    }

    getRoomsForSocket(socket) {
        const rooms = [];
        for (const roomId in this.rooms) {
            if (this.rooms[roomId].includes(socket.id)) {
                rooms.push(roomId);
            }
        }
        return rooms;
    }


    getRoomOccupancy(roomId) {
        return this.rooms[roomId] ? this.rooms[roomId].length : 0;
    }
}
```

**2. Frontend (React)**

*   **`frontend/package.json`**

```json
{
  "name": "video-call-client",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "socket.io-client": "^4.7.2",
    "styled-components": "^6.1.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

Install dependencies: `npm install` in the `frontend` directory.

*   **`frontend/src/App.js`**

```jsx
import React, { useState } from 'react';
import Room from './components/Room';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
  font-family: sans-serif;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

function App() {
  const [roomId, setRoomId] = useState('');
  const [inRoom, setInRoom] = useState(false);

  const handleCreateRoom = () => {
    setRoomId(generateRoomId());
    setInRoom(true);
  };

  const handleJoinRoom = () => {
    setInRoom(true);
  };

  const generateRoomId = () => {
    return Math.random().toString(36).substring(2, 10);
  };

  return (
    <AppContainer>
      {!inRoom ? (
        <div>
          <h1>Video Call App</h1>
          <div>
            <Input
              type="text"
              placeholder="Enter Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
            <Button onClick={handleJoinRoom} disabled={!roomId}>Join Room</Button>
          </div>
          <Button onClick={handleCreateRoom}>Create Room</Button>
        </div>
      ) : (
        <Room roomId={roomId} setInRoom={setInRoom} />
      )}
    </AppContainer>
  );
}

export default App;
```

*   **`frontend/src/components/Room.js`**

```jsx
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';

const VideoContainer = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-around;
`;

const Video = styled.video`
  width: 40%;
  background-color: black;
`;

const RoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #c82333;
  }
`;


const socket = io('http://localhost:5000'); // Replace with your server URL


function Room({ roomId, setInRoom }) {
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peerConnectionRef = useRef(null);


    useEffect(() => {
        let isMounted = true; // Track if the component is mounted

        const initializeRoom = async () => {
            try {
                // 1. Get User Media
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });

                if (!isMounted) return; // Check if component is still mounted

                localVideoRef.current.srcObject = stream;

                // 2.  Set up Peer Connection
                peerConnectionRef.current = new RTCPeerConnection({
                    iceServers: [
                        {
                            urls: [
                                'stun:stun.l.google.com:19302',
                                'stun:global.stun.twilio.com:3478'
                            ]
                        }
                    ]
                });

                stream.getTracks().forEach(track => {
                    peerConnectionRef.current.addTrack(track, stream);
                });

                // 3. Handle ICE candidates
                peerConnectionRef.current.onicecandidate = event => {
                    if (event.candidate) {
                        socket.emit('iceCandidate', roomId, event.candidate);
                    }
                };

                // 4. Handle Remote Stream
                peerConnectionRef.current.ontrack = event => {
                    remoteVideoRef.current.srcObject = event.streams[0];
                };


                // Socket Event Handlers
                socket.on('userJoined', (socketId) => {
                    console.log(`User joined: ${socketId}`);
                    setRemoteSocketId(socketId);  //Important: set the remote socket id
                });

                socket.on('iceCandidate', (socketId, candidate) => {
                    if (socketId === remoteSocketId) {
                        peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
                    }
                });

                socket.on('offer', async (socketId, description) => {
                    if (socketId === remoteSocketId) {
                        try {
                            await peerConnectionRef.current.setRemoteDescription(description);
                            const answer = await peerConnectionRef.current.createAnswer();
                            await peerConnectionRef.current.setLocalDescription(answer);
                            socket.emit('answer', roomId, answer);
                        } catch (error) {
                            console.error("Error handling offer:", error);
                        }
                    }
                });

                socket.on('answer', async (socketId, description) => {
                    if (socketId === remoteSocketId) {
                        try {
                            await peerConnectionRef.current.setRemoteDescription(description);
                        } catch (error) {
                            console.error("Error handling answer:", error);
                        }
                    }
                });


                //Joining or creating the room
                socket.emit('joinRoom', roomId, (response) => {
                    if (response.status === 'ok') {
                        console.log('Successfully joined room');
                    } else {
                        console.error('Failed to join room:', response.message);
                        setInRoom(false); // Go back to the initial state.
                    }
                });

                //Offer creation
                const createOffer = async () => {
                    try {
                        const offer = await peerConnectionRef.current.createOffer();
                        await peerConnectionRef.current.setLocalDescription(offer);
                        socket.emit('offer', roomId, offer);
                    } catch (error) {
                        console.error("Error creating offer:", error);
                    }
                };

                socket.on('userJoined', () => {
                    createOffer();  //Only create offer after 'userJoined'
                });


                socket.on('userLeft', (socketId) => {
                    if (socketId === remoteSocketId) {
                        //Handle user leaving
                        console.log('User left', socketId);
                        setRemoteSocketId(null);
                        remoteVideoRef.current.srcObject = null; //Clear remote video
                        peerConnectionRef.current.close();
                        peerConnectionRef.current = null;
                    }
                });

            } catch (error) {
                console.error("Error initializing room:", error);
            }
        };

        initializeRoom();  //Call initializeRoom


        //Cleanup Function:  Very Important
        return () => {
            isMounted = false; // Prevent state updates on unmounted component

            if (localVideoRef.current && localVideoRef.current.srcObject) {
                const tracks = localVideoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
                localVideoRef.current.srcObject = null;
            }

            socket.off('userJoined');
            socket.off('iceCandidate');
            socket.off('offer');
            socket.off('answer');
            socket.off('userLeft');
            socket.off('disconnect');


            if (peerConnectionRef.current) {
                peerConnectionRef.current.close();
            }

        };


    }, [roomId, setInRoom, remoteSocketId]);


    const handleLeaveRoom = () => {
        socket.emit('leaveRoom', roomId);
        setInRoom(false);
    };


    return (
        <RoomContainer>
            <h2>Room: {roomId}</h2>
            <VideoContainer>
                <div>
                    <h3>Local</h3>
                    <Video ref={localVideoRef} autoPlay muted />
                </div>
                <div>
                    <h3>Remote</h3>
                    <Video ref={remoteVideoRef} autoPlay />
                </div>
            </VideoContainer>
            <Button onClick={handleLeaveRoom}>Leave Room</Button>
        </RoomContainer>
    );
}

export default Room;
```

*   **`frontend/src/App.css`**: (Basic styling - customize as needed)

```css
body {
  font-family: sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}

.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
```

*   **`frontend/src/index.js`**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**Important Considerations and Improvements**

*   **Error Handling:**  The code includes basic error handling, but you should expand this significantly. Catch errors in `getUserMedia`, `createOffer`, `setRemoteDescription`, etc.  Display user-friendly error messages in the UI.
*   **Signaling Server Scalability:** For a production application, consider using a more robust signaling solution like a dedicated message queue (RabbitMQ, Kafka) or a cloud-based signaling service.
*   **STUN/TURN Servers:**  The provided code uses Google's public STUN server and Twilio's STUN server.  For a production app, you'll likely need to deploy your own TURN server to handle cases where direct peer-to-peer connections are not possible due to NAT or firewalls.  Xirsys is a good commercial alternative.
*   **Security:**  Implement proper authentication and authorization to prevent unauthorized access to rooms. Consider encrypting signaling data.  Be mindful of the security implications of using user-provided room IDs.
*   **UI/UX:** Improve the user interface with better error messages, loading indicators, and call controls (mute/unmute, video on/off, screen sharing).
*   **Mobile Support:** Test the application on mobile devices.  You may need to adjust the UI for smaller screens.
*   **Code Organization:**  Break down the React components into smaller, more manageable pieces. Use custom hooks to encapsulate WebRTC logic.
*   **State Management:**  For a more complex application, consider using a state management library like Redux or Zustand to manage the application state more effectively.
*   **Testing:** Write unit and integration tests to ensure the reliability of your code.
*   **ESLint/Prettier:** Use ESLint and Prettier to enforce code style and catch potential errors.
*   **Webpack/Babel:** If you need more advanced JavaScript features or want to optimize your code for production, configure Webpack and Babel. The `react-scripts` package handles this by default, but you can customize it if needed.

**To Run the Application**

1.  **Backend:**
    *   Navigate to the `backend` directory in your terminal.
    *   Run `npm install`.
    *   Run `npm run dev` (or `npm start`) to start the server.
2.  **Frontend:**
    *   Navigate to the `frontend` directory in your terminal.
    *   Run `npm install`.
    *   Run `npm start` to start the React development server.

Open your browser and go to `http://localhost:3000`. Open the link in two separate tabs. Enter a room ID in one tab and click 'Join Room'.  In the other tab, enter the *same* room ID (or create a new room). You should see the video streams from both peers.

This comprehensive response gives you a strong foundation to start building your video calling application!  Remember to test, debug, and iterate as you go.  Let me know if you have any specific questions as you develop the application.
