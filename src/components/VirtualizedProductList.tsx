import React from 'react';
import { FixedSizeList as List } from 'react-window';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface VirtualizedProductListProps {
	products: Product[];
	orderNameGetter: (orderId: number) => string;
	height?: number;
	itemHeight?: number;
}

const VirtualizedProductList: React.FC<VirtualizedProductListProps> = ({
	                                                                       products,
	                                                                       orderNameGetter,
	                                                                       height = 600,
	                                                                       itemHeight = 150
                                                                       }) => {
	const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
		<div style={style}>
			<ProductCard
				product={products[index]}
				orderName={orderNameGetter(products[index].orderId)}
			/>
		</div>
	);

	return (
		<List
			height={height}
			itemCount={products.length}
			itemSize={itemHeight}
			width="100%"
		>
			{Row}
		</List>
	);
};

export default VirtualizedProductList;