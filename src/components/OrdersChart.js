import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { getOrderTotalPrice } from '../utils/orderHelpers';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

function OrdersChart({ orders }) {
	const chartData = useMemo(() => {
		// сортируем приходы по дате
		const sortedOrders = [...orders].sort((a, b) =>
			new Date(a.createdAt) - new Date(b.createdAt)
		);

		const labels = sortedOrders.map(order => {
			const date = new Date(order.createdAt);
			return `${date.getDate()}/${date.getMonth() + 1}`;
		});

		const totalsUSD = sortedOrders.map(order =>
			getOrderTotalPrice(order.id, 'USD')
		);

		const totalsUAH = sortedOrders.map(order =>
			getOrderTotalPrice(order.id, 'UAH')
		);

		return {
			labels,
			datasets: [
				{
					label: 'Сумма ($)',
					data: totalsUSD,
					backgroundColor: 'rgba(54, 162, 235, 0.7)',
					borderColor: 'rgb(54, 162, 235)',
					borderWidth: 1,
					yAxisID: 'y',
				},
				{
					label: 'Сумма (UAH)',
					data: totalsUAH,
					backgroundColor: 'rgba(255, 99, 132, 0.7)',
					borderColor: 'rgb(255, 99, 132)',
					borderWidth: 1,
					yAxisID: 'y1',
				},
			],
		};
	}, [orders]);

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		interaction: {
			mode: 'index',
			intersect: false,
		},
		plugins: {
			title: {
				display: true,
				text: 'Суммы приходов по датам',
				font: {
					size: 16,
				},
			},
			tooltip: {
				callbacks: {
					label: function(context) {
						let label = context.dataset.label || '';
						let value = context.raw;
						if (label.includes('$')) {
							return `${label}: ${value.toFixed(2)} $`;
						} else if (label.includes('UAH')) {
							return `${label}: ${value.toFixed(2)} ₴`;
						}
						return `${label}: ${value}`;
					}
				}
			}
		},
		scales: {
			y: {
				type: 'linear',
				display: true,
				position: 'left',
				title: {
					display: true,
					text: 'Доллары ($)',
				},
			},
			y1: {
				type: 'linear',
				display: true,
				position: 'right',
				title: {
					display: true,
					text: 'Гривны (UAH)',
				},
				grid: {
					drawOnChartArea: false,
				},
			},
		},
	};

	if (orders.length === 0) {
		return (
			<div className="alert alert-info">
				Нет данных для отображения графика
			</div>
		);
	}

	return (
		<div style={{ height: '400px' }}>
			<Bar data={chartData} options={options} />
		</div>
	);
}

export default OrdersChart;