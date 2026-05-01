import express from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

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

app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(apolloServer));

app.get('/health', (req, res) => {
	res.json({ status: 'ok', activeSessions });
});

const PORT = 3001;
httpServer.listen(PORT, () => {
	console.log(`🚀 Server ready at http://localhost:${PORT}`);
	console.log(`📡 GraphQL endpoint: http://localhost:${PORT}/graphql`);
	console.log(`🔌 WebSocket endpoint: ws://localhost:${PORT}`);
});