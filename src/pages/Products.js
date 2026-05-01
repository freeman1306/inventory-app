import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import ProductTypeFilter from '../components/ProductTypeFilter';

function Products() {
  const { list: products, loading, error } = useSelector(state => state.products);
  const { list: orders } = useSelector(state => state.orders);
  const [selectedType, setSelectedType] = useState('all');

  // собираем уникальные типы продуктов
  const productTypes = useMemo(() => {
    const types = new Set(products.map(p => p.type));
    return Array.from(types);
  }, [products]);

  // фильтруем продукты по типу
  const filteredProducts = useMemo(() => {
    if (selectedType === 'all') return products;
    return products.filter(p => p.type === selectedType);
  }, [products, selectedType]);

  // функция для получения названия прихода по orderId
  const getOrderName = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    return order ? order.name : 'Неизвестный приход';
  };

  if (loading) return <div className="p-4">Загрузка продуктов...</div>;
  if (error) return <div className="p-4 text-danger">Ошибка: {error}</div>;

  return (
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h3 mb-0">Продукты / {filteredProducts.length}</h2>
          <button className="btn btn-outline-primary btn-sm">+ Добавить продукт</button>
        </div>

        <ProductTypeFilter
            types={productTypes}
            selectedType={selectedType}
            onTypeChange={setSelectedType}
        />

        {filteredProducts.length === 0 ? (
            <div className="alert alert-info">
              Нет продуктов выбранного типа
            </div>
        ) : (
            filteredProducts.map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                    orderName={getOrderName(product.orderId)}
                />
            ))
        )}
      </div>
  );
}

export default Products;