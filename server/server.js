import express from 'express';
import path, { dirname } from 'path';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.static(path.join(__dirname, '../public/')));
const server = createServer(app);
const wsServer = new WebSocketServer({ server });
wsServer.on('connection', (socket) => {
    const id = setInterval(() => {
        socket.send(JSON.stringify(process.memoryUsage()), () => { }), 100;
    });
    console.log('started client interval');
    socket.on('error', console.error);
    socket.on('close', () => {
        console.log('stopping client interval');
        clearInterval(id);
    });
});
server.listen(3000, () => {
    console.log('server listening on port 3000');
    console.log(`Serving files from: ${path.join(__dirname, '../public/')}`);
});
