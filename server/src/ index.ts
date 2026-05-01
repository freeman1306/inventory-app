import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"]
	}
});

let activeSessions = 0;

io.on('connection', (socket) => {
	activeSessions++;
	io.emit('session-count', activeSessions);
	console.log(`User connected. Active: ${activeSessions}`);

	socket.on('disconnect', () => {
		activeSessions--;
		io.emit('session-count', activeSessions);
		console.log(`User disconnected. Active: ${activeSessions}`);
	});
});

app.get('/health', (req, res) => {
	res.json({ status: 'ok', activeSessions });
});

const PORT = 3001;
server.listen(PORT, () => {
	console.log(`WebSocket server running on http://localhost:${PORT}`);
});