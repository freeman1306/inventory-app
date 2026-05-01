import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadOrders } from '../store/ordersSlice';

function Orders() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(loadOrders());
  }, [dispatch]);

  if (loading) return <div className="p-3">Загрузка приходов...</div>;
  if (error) return <div className="p-3 text-danger">Ошибка: {error}</div>;

  return (
    <div className="p-3">
      <h2>Приходы / {list.length}</h2>
      {list.map((order) => (
        <div key={order.id} className="card mb-2 p-2">
          <strong>{order.name}</strong>
          <small>Создан: {new Date(order.createdAt).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
  );
}

export default Orders;
