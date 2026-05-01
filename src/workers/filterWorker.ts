// Этот код будет выполняться в отдельном потоке
interface FilterMessage {
	type: 'FILTER_PRODUCTS';
	products: any[];
	filterType: string;
	searchTerm: string;
}

interface FilterResponse {
	type: 'FILTER_RESULT';
	filtered: any[];
	duration: number;
}

// Обработчик сообщений от основного потока
self.addEventListener('message', (event: MessageEvent<FilterMessage>) => {
	const { type, products, filterType, searchTerm } = event.data;

	if (type === 'FILTER_PRODUCTS') {
		const startTime = performance.now();

		let filtered = [...products];

		// Фильтр по типу продукта
		if (filterType !== 'all') {
			filtered = filtered.filter(p => p.type === filterType);
		}

		// Поиск по названию или SN
		if (searchTerm.trim()) {
			const term = searchTerm.toLowerCase();
			filtered = filtered.filter(p =>
				p.name.toLowerCase().includes(term) ||
				p.sn.toLowerCase().includes(term)
			);
		}

		const duration = performance.now() - startTime;

		const response: FilterResponse = {
			type: 'FILTER_RESULT',
			filtered,
			duration
		};

		self.postMessage(response);
	}
});

export {};