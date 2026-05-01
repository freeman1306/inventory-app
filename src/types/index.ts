export interface Product {
	id: number;
	name: string;
	sn: string;
	type: string;
	status: string;
	warrantyStart: string;
	warrantyEnd: string;
	priceUSD: number;
	priceUAH: number;
	orderId: number;
}

export interface Order {
	id: number;
	name: string;
	createdAt: string;
	products: number[];
}

export interface OrderWithDetails extends Order {
	productsList?: Product[];
	totalUSD?: number;
	totalUAH?: number;
}

export interface RootState {
	orders: {
		list: Order[];
		loading: boolean;
		error: string | null;
	};
	products: {
		list: Product[];
		loading: boolean;
		error: string | null;
	};
}