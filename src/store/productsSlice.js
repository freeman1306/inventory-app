import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts as fetchProductsApi } from '../services/api';
import { products as initialProducts } from '../mock/data';

export const loadProducts = createAsyncThunk('products/load', async () => {
  const data = await fetchProductsApi();
  return data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    removeProductsByOrder: (state, action) => {
      const orderId = action.payload;
      state.list = state.list.filter((p) => p.orderId !== orderId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { removeProductsByOrder } = productsSlice.actions;
export default productsSlice.reducer;
