import { orders, products } from '../../src/mock/data';

export const resolvers = {
	Query: {
		orders: () => {
			return orders.map(order => ({
				...order,
				products: products.filter(p => p.orderId === order.id),
				totalUSD: products
					.filter(p => p.orderId === order.id)
					.reduce((sum, p) => sum + p.priceUSD, 0),
				totalUAH: products
					.filter(p => p.orderId === order.id)
					.reduce((sum, p) => sum + p.priceUAH, 0),
				productsCount: products.filter(p => p.orderId === order.id).length
			}));
		},
		products: () => products,
		order: (_: any, { id }: { id: string }) => {
			const order = orders.find(o => o.id === parseInt(id));
			if (!order) return null;
			return {
				...order,
				products: products.filter(p => p.orderId === order.id),
				totalUSD: products
					.filter(p => p.orderId === order.id)
					.reduce((sum, p) => sum + p.priceUSD, 0),
				totalUAH: products
					.filter(p => p.orderId === order.id)
					.reduce((sum, p) => sum + p.priceUAH, 0),
				productsCount: products.filter(p => p.orderId === order.id).length
			};
		},
		product: (_: any, { id }: { id: string }) => {
			return products.find(p => p.id === parseInt(id));
		},
		productsByType: (_: any, { type }: { type: string }) => {
			return products.filter(p => p.type === type);
		}
	},
	Mutation: {
		deleteOrder: (_: any, { id }: { id: string }) => {
			const orderIndex = orders.findIndex(o => o.id === parseInt(id));
			if (orderIndex === -1) return false;
			orders.splice(orderIndex, 1);
			// удаляем связанные продукты
			const productsToRemove = products.filter(p => p.orderId === parseInt(id));
			productsToRemove.forEach(p => {
				const productIndex = products.findIndex(prod => prod.id === p.id);
				if (productIndex !== -1) products.splice(productIndex, 1);
			});
			return true;
		},
		deleteProduct: (_: any, { id }: { id: string }) => {
			const productIndex = products.findIndex(p => p.id === parseInt(id));
			if (productIndex === -1) return false;
			products.splice(productIndex, 1);
			return true;
		},
		updateProductStatus: (_: any, { id, status }: { id: string; status: string }) => {
			const product = products.find(p => p.id === parseInt(id));
			if (!product) throw new Error('Product not found');
			product.status = status;
			return product;
		}
	}
};