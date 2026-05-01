import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrders as fetchOrdersApi, deleteOrder as deleteOrderApi } from '../services/api';

export const loadOrders = createAsyncThunk('orders/load', async () => {
  const data = await fetchOrdersApi();
  return data;
});

export const removeOrder = createAsyncThunk('orders/remove', async (orderId) => {
  await deleteOrderApi(orderId);
  return orderId;
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(loadOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeOrder.fulfilled, (state, action) => {
        state.list = state.list.filter((order) => order.id !== action.payload);
      });
  },
});

export default ordersSlice.reducer;
