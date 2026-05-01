import { formatWarrantyDate, getWarrantyPeriod } from '../productHelpers';

describe('productHelpers', () => {
	describe('formatWarrantyDate', () => {
		it('formats date correctly', () => {
			const result = formatWarrantyDate('2025-04-06');
			expect(result).toBe('06.04.2025');
		});
	});

	describe('getWarrantyPeriod', () => {
		it('returns correct period for 2 years', () => {
			const result = getWarrantyPeriod('2025-01-01', '2027-01-01');
			expect(result).toBe('2 года');
		});

		it('returns correct period for 1 year', () => {
			const result = getWarrantyPeriod('2025-01-01', '2026-01-01');
			expect(result).toBe('1 год');
		});
	});
});