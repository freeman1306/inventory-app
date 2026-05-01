import React from 'react';
import { formatWarrantyDate, getWarrantyPeriod } from '../utils/productHelpers';

function ProductCard({ product, orderName }) {
	return (
		<div className="card mb-3 shadow-sm">
			<div className="card-body">
				<div className="row">
					<div className="col-md-5">
						<h6 className="card-title mb-2">{product.name}</h6>
						<div className="badge bg-secondary mb-2">{product.type}</div>
						<div className="small text-secondary">SN: {product.sn}</div>
					</div>
					<div className="col-md-3">
						<div className="small">
							<div><strong>Гарантия:</strong></div>
							<div>{formatWarrantyDate(product.warrantyStart)}</div>
							<div>→ {formatWarrantyDate(product.warrantyEnd)}</div>
							<div className="text-success">{getWarrantyPeriod(product.warrantyStart, product.warrantyEnd)}</div>
						</div>
					</div>
					<div className="col-md-2">
						<div className="small">
							<div><strong>Цена:</strong></div>
							<div>{product.priceUSD.toFixed(2)} $</div>
							<div>{product.priceUAH.toFixed(2)} UAH</div>
						</div>
					</div>
					<div className="col-md-2">
						<div className="small">
							<div><strong>Приход:</strong></div>
							<div>{orderName}</div>
							<div className="text-secondary mt-1">Статус: {product.status}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductCard;