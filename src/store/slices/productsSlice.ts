import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product, ProductsState } from '../../types';
import { api } from '../../services/api';

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  categories: [],
};

// Grab all products from the API
// Note: FakeStoreAPI doesn't support pagination really well, so we just get everything
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const products = await api.getAllProducts();
    return products;
  }
);

// Get categories for the filter dropdown
export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const categories = await api.getCategories();
    return categories;
  }
);

// Fetch a single product when user clicks on a card
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: number) => {
    const product = await api.getProductById(id);
    return product;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle loading all products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });

    // Categories don't need loading state, they're quick
    builder
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.categories = action.payload;
      });

    // Single product fetch - for detail page
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        // Check if we already have this product, update it. Otherwise add new one
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch product';
      });
  },
});

export const { clearError } = productsSlice.actions;
export default productsSlice.reducer;

