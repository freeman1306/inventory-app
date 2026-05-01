import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './store/ordersSlice';
import productsReducer from './store/productsSlice';

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    products: productsReducer,
  },
});

export default store;
