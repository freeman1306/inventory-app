import { products } from '../mock/data';

export const getOrderProducts = (orderId) => {
  return products.filter((p) => p.orderId === orderId);
};

export const getOrderTotalPrice = (orderId, currency) => {
  const orderProducts = getOrderProducts(orderId);

  if (currency === 'USD') {
    return orderProducts.reduce((sum, p) => sum + p.priceUSD, 0);
  } else if (currency === 'UAH') {
    return orderProducts.reduce((sum, p) => sum + p.priceUAH, 0);
  }
  return 0;
};

export const formatDate = (isoString, format = 'short') => {
  const date = new Date(isoString);
  if (format === 'short') {
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } else if (format === 'long') {
    return date.toLocaleDateString('ru-RU', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
  return date.toLocaleDateString();
};
