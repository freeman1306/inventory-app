import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const { login } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		try {
			await login(username, password);
		} catch (err) {
			setError('Invalid username or password');
		}
	};

	return (
		<div className="d-flex justify-content-center align-items-center vh-100 bg-light">
			<div className="card shadow-sm" style={{ width: '400px' }}>
				<div className="card-body p-4">
					<h3 className="text-center mb-4">🔐 Inventory System</h3>
					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label className="form-label">Username</label>
							<input
								type="text"
								className="form-control"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								placeholder="admin"
								required
							/>
						</div>
						<div className="mb-3">
							<label className="form-label">Password</label>
							<input
								type="password"
								className="form-control"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="admin123"
								required
							/>
						</div>
						{error && <div className="alert alert-danger">{error}</div>}
						<button type="submit" className="btn btn-primary w-100">
							Войти
						</button>
					</form>
					<div className="text-center mt-3 small text-secondary">
						Тестовые данные: admin / admin123
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;