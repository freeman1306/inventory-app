import { useState, useEffect, useRef } from 'react';
import { Product } from '../types';

interface UseProductFilterWorkerProps {
	products: Product[];
	filterType: string;
	searchTerm: string;
}

export const useProductFilterWorker = ({ products, filterType, searchTerm }: UseProductFilterWorkerProps) => {
	const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
	const [isFiltering, setIsFiltering] = useState(false);
	const [filterTime, setFilterTime] = useState<number | null>(null);
	const workerRef = useRef<Worker | null>(null);

	useEffect(() => {
		// Создаём worker при монтировании
		workerRef.current = new Worker(new URL('../workers/filterWorker.ts', import.meta.url));

		workerRef.current.onmessage = (event: MessageEvent) => {
			const { type, filtered, duration } = event.data;
			if (type === 'FILTER_RESULT') {
				setFilteredProducts(filtered);
				setFilterTime(duration);
				setIsFiltering(false);
			}
		};

		return () => {
			workerRef.current?.terminate();
		};
	}, []);

	useEffect(() => {
		if (workerRef.current && products.length > 0) {
			setIsFiltering(true);
			setFilterTime(null);

			workerRef.current.postMessage({
				type: 'FILTER_PRODUCTS',
				products,
				filterType,
				searchTerm
			});
		} else {
			setFilteredProducts(products);
		}
	}, [products, filterType, searchTerm]);

	return { filteredProducts, isFiltering, filterTime };
};