import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './store/ordersSlice';

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
  },
});

export default store;
