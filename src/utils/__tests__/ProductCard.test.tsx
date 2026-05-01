import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductCard from '../ProductCard';

const mockProduct = {
	id: 1,
	name: 'Test Product',
	sn: 'SN-123456',
	type: 'материнская плата',
	status: 'Свободен',
	warrantyStart: '2025-01-01',
	warrantyEnd: '2027-01-01',
	priceUSD: 2500,
	priceUAH: 250000.50,
	orderId: 1,
};

describe('ProductCard', () => {
	it('renders product information correctly', () => {
		render(<ProductCard product={mockProduct} orderName="Test Order" />);

		expect(screen.getByText('Test Product')).toBeInTheDocument();
		expect(screen.getByText('материнская плата')).toBeInTheDocument();
		expect(screen.getByText('SN: SN-123456')).toBeInTheDocument();
		expect(screen.getByText('2500.00 $')).toBeInTheDocument();
		expect(screen.getByText('250000.50 UAH')).toBeInTheDocument();
		expect(screen.getByText('Test Order')).toBeInTheDocument();
	});

	it('displays warranty dates correctly', () => {
		render(<ProductCard product={mockProduct} orderName="Test Order" />);

		expect(screen.getByText('01.01.2025')).toBeInTheDocument();
		expect(screen.getByText('→ 01.01.2027')).toBeInTheDocument();
	});
});