import { config } from 'dotenv';
config();
import http from 'http'
import app from './app.js'

const port = process.env.port

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`server is running on the port ${port} `);
    
})