import express from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

import jwt from 'jsonwebtoken';
import { authenticateUser, generateToken, verifyToken } from './auth';

const app = express();
const httpServer = http.createServer(app);

// Socket.io
const io = new SocketServer(httpServer, {
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

// GraphQL
const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
});

await apolloServer.start();

app.use('/graphql', cors<cors.CorsRequest>(), express.json(), (req, res, next) => {
	// Добавляем user в контекст
	(req as any).context = { user: (req as any).user };
	next();
}, expressMiddleware(apolloServer, {
	context: async ({ req }) => {
		return { user: (req as any).user };
	}
}));

app.get('/health', (req, res) => {
	res.json({ status: 'ok', activeSessions });
});

const PORT = 3001;
httpServer.listen(PORT, () => {
	console.log(`🚀 Server ready at http://localhost:${PORT}`);
	console.log(`📡 GraphQL endpoint: http://localhost:${PORT}/graphql`);
	console.log(`🔌 WebSocket endpoint: ws://localhost:${PORT}`);
});

const authMiddleware = (req: any, res: any, next: any) => {
	const token = req.headers.authorization?.replace('Bearer ', '');

	if (token) {
		const decoded = verifyToken(token);
		if (decoded) {
			req.user = decoded;
		}
	}
	next();
};

app.use(authMiddleware);

app.post('/login', express.json(), async (req, res) => {
	const { username, password } = req.body;

	const user = await authenticateUser(username, password);

	if (!user) {
		return res.status(401).json({ error: 'Invalid credentials' });
	}

	const token = generateToken(user.id, user.username);
	res.json({ token, user: { id: user.id, username: user.username } });
});

// Эндпоинт для проверки токена
app.get('/verify', (req, res) => {
	const token = req.headers.authorization?.replace('Bearer ', '');

	if (!token) {
		return res.status(401).json({ valid: false });
	}

	const decoded = verifyToken(token);
	res.json({ valid: !!decoded, user: decoded });
});