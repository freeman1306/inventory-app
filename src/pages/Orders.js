import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadOrders, removeOrder } from '../store/ordersSlice';
import { removeProductsByOrder } from '../store/productsSlice';
import { getOrderProducts, getOrderTotalPrice, formatDate } from '../utils/orderHelpers';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import OrdersChart from '../components/OrdersChart';

function Orders() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector(state => state.orders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ show: false, orderId: null, orderName: '' });
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    dispatch(loadOrders());
  }, [dispatch]);

  const handleDeleteClick = (orderId, orderName, e) => {
    e.stopPropagation();
    setDeleteModal({ show: true, orderId, orderName });
  };

  const confirmDelete = () => {
    dispatch(removeOrder(deleteModal.orderId));
    dispatch(removeProductsByOrder(deleteModal.orderId));
    setDeleteModal({ show: false, orderId: null, orderName: '' });
    if (selectedOrder && selectedOrder.id === deleteModal.orderId) {
      setSelectedOrder(null);
    }
  };

  const closeModal = () => {
    setDeleteModal({ show: false, orderId: null, orderName: '' });
  };

  if (loading) return <div className="p-3">Загрузка приходов...</div>;
  if (error) return <div className="p-3 text-danger">Ошибка: {error}</div>;

  return (
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h3 mb-0">Приходы / {list.length}</h2>
          <div>
            <button
                className="btn btn-outline-info btn-sm me-2"
                onClick={() => setShowChart(!showChart)}
            >
              {showChart ? 'Скрыть график' : 'Показать график'}
            </button>
            <button className="btn btn-outline-primary btn-sm">+</button>
          </div>
        </div>

        {showChart && (
            <div className="mb-4 p-3 border rounded bg-light">
              <OrdersChart orders={list} />
            </div>
        )}

        <div className="row">
          <div className={selectedOrder ? 'col-7' : 'col-12'}>
            {list.map(order => {
              const productsCount = getOrderProducts(order.id).length;
              const totalUSD = getOrderTotalPrice(order.id, 'USD');
              const totalUAH = getOrderTotalPrice(order.id, 'UAH');

              return (
                  <div
                      key={order.id}
                      className="card mb-3 shadow-sm"
                      style={{ cursor: 'pointer' }}
                  >
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start">
                        <div className="flex-grow-1" onClick={() => setSelectedOrder(order)}>
                          <h5 className="card-title mb-2">{order.name}</h5>
                          <div className="row small text-secondary mb-2">
                            <div className="col-md-3">
                              📦 {productsCount} Продукта
                            </div>
                            <div className="col-md-4">
                              📅 {formatDate(order.createdAt, 'short')}
                            </div>
                            <div className="col-md-5">
                              💵 {totalUSD.toFixed(2)} $ | {totalUAH.toFixed(2)} UAH
                            </div>
                          </div>
                          <div className="text-secondary small">
                            {formatDate(order.createdAt, 'long')}
                          </div>
                        </div>
                        <button
                            className="btn btn-sm btn-outline-danger ms-3"
                            onClick={(e) => handleDeleteClick(order.id, order.name, e)}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
              );
            })}
          </div>

          {selectedOrder && (
              <div className="col-5">
                <div className="card shadow-sm">
                  <div className="card-header bg-white d-flex justify-content-between align-items-center">
                    <strong>Детали прихода</strong>
                    <button
                        className="btn-close"
                        onClick={() => setSelectedOrder(null)}
                    ></button>
                  </div>
                  <div className="card-body">
                    <h6>{selectedOrder.name}</h6>
                    <hr />
                    <div className="small">
                      <div>Создан: {formatDate(selectedOrder.createdAt, 'long')}</div>
                      <div className="mt-2">
                        <strong>Продукты:</strong>
                        <ul className="list-unstyled mt-1">
                          {getOrderProducts(selectedOrder.id).map(p => (
                              <li key={p.id} className="mb-2">
                                {p.name}
                                <br />
                                <span className="text-secondary">SN: {p.sn}</span>
                              </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          )}
        </div>

        <ConfirmDeleteModal
            show={deleteModal.show}
            onClose={closeModal}
            onConfirm={confirmDelete}
            orderName={deleteModal.orderName}
        />
      </div>
  );
}

export default Orders;