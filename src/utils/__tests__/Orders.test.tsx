import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';
import Orders from '../Orders';
import { GET_ORDERS } from '../../graphql/queries';

const mockOrders = {
	request: {
		query: GET_ORDERS,
	},
	result: {
		data: {
			orders: [
				{
					id: '1',
					name: 'Test Order 1',
					createdAt: '2025-04-06T10:00:00Z',
					productsCount: 3,
					totalUSD: 5000,
					totalUAH: 200000,
					products: [],
				},
			],
		},
	},
};

describe('Orders Page Integration', () => {
	it('renders orders list after loading', async () => {
		render(
			<MockedProvider mocks={[mockOrders]} addTypename={false}>
				<BrowserRouter>
					<Orders />
				</BrowserRouter>
			</MockedProvider>
		);

		expect(screen.getByText('Загрузка приходов...')).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.getByText('Test Order 1')).toBeInTheDocument();
		});
	});
});