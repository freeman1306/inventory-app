import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SECRET_KEY = 'your-secret-key-change-in-production';

// Временное хранилище пользователей
const users = [
	{
		id: 1,
		username: 'admin',
		// bcrypt.hashSync("admin123", 10)
		password: '$2b$10$36hs0qETmjj67mD1ZSZtnuCT.AP2g0txJGT1g/rF5r21ukr70PWDe',
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

	const isValid = await bcrypt.compare(password, user.password);
	if (!isValid) return null;

	return { id: user.id, username: user.username };
};

