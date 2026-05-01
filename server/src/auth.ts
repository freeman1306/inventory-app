import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SECRET_KEY = 'your-secret-key-change-in-production';

// Временное хранилище пользователей (в реальном проекте - БД)
const users = [
	{
		id: 1,
		username: 'admin',
		password: '$2a$10$XQwvKJZzXqJ5qJ5qJ5qJ5u', // "admin123" в зашифрованном виде
		role: 'admin'
	}
];

export const hashPassword = async (password: string): Promise<string> => {
	return await bcrypt.hash(password, 10);
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
	return await bcrypt.compare(password, hash);
};

export const generateToken = (userId: number, username: string): string => {
	return jwt.sign({ userId, username }, SECRET_KEY, { expiresIn: '24h' });
};

export const verifyToken = (token: string): any => {
	try {
		return jwt.verify(token, SECRET_KEY);
	} catch (error) {
		return null;
	}
};

export const authenticateUser = async (username: string, password: string) => {
	const user = users.find(u => u.username === username);
	if (!user) return null;

	// Для теста создадим хэш для admin123
	if (username === 'admin' && password === 'admin123') {
		return { id: user.id, username: user.username };
	}

	return null;
};