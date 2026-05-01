import ordersReducer, { loadOrders, removeOrder } from '../../store/ordersSlice';
import { Order } from '../../types';

jest.mock('../../services/api', () => ({
	fetchOrders: jest.fn(),
	deleteOrder: jest.fn(),
}));

describe('orders slice', () => {
	const initialState = {
		list: [],
		loading: false,
		error: null,
	};

	it('should handle initial state', () => {
		expect(ordersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
	});

	it('should handle loadOrders.pending', () => {
		const actual = ordersReducer(initialState, loadOrders.pending('', undefined));
		expect(actual.loading).toBe(true);
		expect(actual.error).toBe(null);
	});

	it('should handle loadOrders.fulfilled', () => {
		const mockOrders: Order[] = [
			{ id: 1, name: 'Test Order', createdAt: '2025-01-01', products: [] },
		];
		const actual = ordersReducer(initialState, loadOrders.fulfilled(mockOrders, '', undefined));
		expect(actual.loading).toBe(false);
		expect(actual.list).toEqual(mockOrders);
	});

	it('should handle removeOrder.fulfilled', () => {
		const stateWithOrders = {
			...initialState,
			list: [
				{ id: 1, name: 'Order 1', createdAt: '2025-01-01', products: [] },
				{ id: 2, name: 'Order 2', createdAt: '2025-01-02', products: [] },
			],
		};
		const actual = ordersReducer(stateWithOrders, removeOrder.fulfilled(1, '', 1));
		expect(actual.list.length).toBe(1);
		expect(actual.list[0].id).toBe(2);
	});
});