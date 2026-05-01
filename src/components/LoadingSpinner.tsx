import React from 'react';

const LoadingSpinner: React.FC = () => {
	return (
		<div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
			<div className="text-center">
				<div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
					<span className="visually-hidden">Loading...</span>
				</div>
				<div>Загрузка...</div>
			</div>
		</div>
	);
};

export default LoadingSpinner;