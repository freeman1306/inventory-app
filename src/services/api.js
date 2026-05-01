import { orders, products } from '../mock/data';

// имитация задержки сети
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchOrders = async () => {
  await delay(300);
  return [...orders];
};

export const fetchProducts = async () => {
  await delay(300);
  return [...products];
};

export const deleteOrder = async (orderId) => {
  await delay(500);
  // просто логируем, реальное удаление сделаем в Redux позже
  console.log(`deleting order ${orderId}`);
  return true;
};
