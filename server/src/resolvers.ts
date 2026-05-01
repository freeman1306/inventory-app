import { orders, products } from './data';
import { Order, Product } from './types';

const getOrderDetails = (order: Order) => ({
	...order,
	products: products.filter((p: Product) => p.orderId === order.id),
	totalUSD: products
		.filter((p: Product) => p.orderId === order.id)
		.reduce((sum: number, p: Product) => sum + p.priceUSD, 0),
	totalUAH: products
		.filter((p: Product) => p.orderId === order.id)
		.reduce((sum: number, p: Product) => sum + p.priceUAH, 0),
	productsCount: products.filter((p: Product) => p.orderId === order.id).length
});

export const resolvers = {
	Query: {
		orders: () => {
			return orders.map((order: Order) => getOrderDetails(order));
		},
		products: () => products,
		order: (_: any, { id }: { id: string }) => {
			const order = orders.find((o: Order) => o.id === parseInt(id));
			if (!order) return null;
			return getOrderDetails(order);
		},
		product: (_: any, { id }: { id: string }) => {
			return products.find((p: Product) => p.id === parseInt(id));
		},
		productsByType: (_: any, { type }: { type: string }) => {
			return products.filter((p: Product) => p.type === type);
		}
	},
	Mutation: {
		deleteOrder: (_: any, { id }: { id: string }) => {
			const orderIndex = orders.findIndex((o: Order) => o.id === parseInt(id));
			if (orderIndex === -1) return false;
			orders.splice(orderIndex, 1);
			// удаляем связанные продукты
			const productsToRemove = products.filter((p: Product) => p.orderId === parseInt(id));
			productsToRemove.forEach((p: Product) => {
				const productIndex = products.findIndex((prod: Product) => prod.id === p.id);
				if (productIndex !== -1) products.splice(productIndex, 1);
			});
			return true;
		},
		deleteProduct: (_: any, { id }: { id: string }) => {
			const productIndex = products.findIndex((p: Product) => p.id === parseInt(id));
			if (productIndex === -1) return false;
			products.splice(productIndex, 1);
			return true;
		},
		updateProductStatus: (_: any, { id, status }: { id: string; status: string }) => {
			const product = products.find((p: Product) => p.id === parseInt(id));
			if (!product) throw new Error('Product not found');
			product.status = status;
			return product;
		}
	}
};