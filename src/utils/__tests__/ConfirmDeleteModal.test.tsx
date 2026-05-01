import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmDeleteModal from '../ConfirmDeleteModal';

describe('ConfirmDeleteModal', () => {
	const mockOnClose = jest.fn();
	const mockOnConfirm = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders when show is true', () => {
		render(
			<ConfirmDeleteModal
				show={true}
				onClose={mockOnClose}
				onConfirm={mockOnConfirm}
				orderName="Test Order"
			/>
		);

		expect(screen.getByText('Удаление прихода')).toBeInTheDocument();
		expect(screen.getByText('Test Order')).toBeInTheDocument();
		expect(screen.getByText('ОТМЕНИТЬ')).toBeInTheDocument();
		expect(screen.getByText('УДАЛИТЬ')).toBeInTheDocument();
	});

	it('does not render when show is false', () => {
		render(
			<ConfirmDeleteModal
				show={false}
				onClose={mockOnClose}
				onConfirm={mockOnConfirm}
				orderName="Test Order"
			/>
		);

		expect(screen.queryByText('Удаление прихода')).not.toBeInTheDocument();
	});

	it('calls onClose when cancel button is clicked', () => {
		render(
			<ConfirmDeleteModal
				show={true}
				onClose={mockOnClose}
				onConfirm={mockOnConfirm}
				orderName="Test Order"
			/>
		);

		fireEvent.click(screen.getByText('ОТМЕНИТЬ'));
		expect(mockOnClose).toHaveBeenCalledTimes(1);
		expect(mockOnConfirm).not.toHaveBeenCalled();
	});

	it('calls onConfirm when delete button is clicked', () => {
		render(
			<ConfirmDeleteModal
				show={true}
				onClose={mockOnClose}
				onConfirm={mockOnConfirm}
				orderName="Test Order"
			/>
		);

		fireEvent.click(screen.getByText('УДАЛИТЬ'));
		expect(mockOnConfirm).toHaveBeenCalledTimes(1);
		expect(mockOnClose).not.toHaveBeenCalled();
	});
});