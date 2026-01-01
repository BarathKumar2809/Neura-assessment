import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer, { 
  fetchProducts, 
  fetchCategories, 
  fetchProductById,
  clearError 
} from '../productsSlice';
import { api } from '../../../services/api';

vi.mock('../../../services/api');

describe('productsSlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        products: productsReducer,
      },
    });
    vi.clearAllMocks();
  });

  it('should have correct initial state', () => {
    const state = store.getState().products;
    expect(state).toEqual({
      items: [],
      loading: false,
      error: null,
      categories: [],
    });
  });

  it('should handle clearError', () => {
    store = configureStore({
      reducer: {
        products: productsReducer,
      },
      preloadedState: {
        products: {
          items: [],
          loading: false,
          error: 'Some error',
          categories: [],
        },
      },
    });

    store.dispatch(clearError());
    expect(store.getState().products.error).toBeNull();
  });

  describe('fetchProducts', () => {
    it('should set loading to true when pending', () => {
      store.dispatch(fetchProducts.pending('', undefined));
      const state = store.getState().products;
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should set products when fulfilled', async () => {
      const mockProducts = [
        {
          id: 1,
          title: 'Product 1',
          price: 10.99,
          description: 'Description 1',
          category: 'electronics',
          image: 'image1.jpg',
          rating: { rate: 4.5, count: 100 },
        },
      ];

      vi.mocked(api.getAllProducts).mockResolvedValue(mockProducts);
      
      await store.dispatch(fetchProducts());
      
      const state = store.getState().products;
      expect(state.loading).toBe(false);
      expect(state.items).toEqual(mockProducts);
      expect(state.error).toBeNull();
    });

    it('should set error when rejected', async () => {
      const errorMessage = 'Failed to fetch products';
      vi.mocked(api.getAllProducts).mockRejectedValue(new Error(errorMessage));
      
      await store.dispatch(fetchProducts());
      
      const state = store.getState().products;
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('fetchCategories', () => {
    it('should set categories when fulfilled', async () => {
      const mockCategories = ['electronics', 'clothing'];
      vi.mocked(api.getCategories).mockResolvedValue(mockCategories);
      
      await store.dispatch(fetchCategories());
      
      const state = store.getState().products;
      expect(state.categories).toEqual(mockCategories);
    });
  });

  describe('fetchProductById', () => {
    it('should add new product to items', async () => {
      const mockProduct = {
        id: 1,
        title: 'Product 1',
        price: 10.99,
        description: 'Description 1',
        category: 'electronics',
        image: 'image1.jpg',
        rating: { rate: 4.5, count: 100 },
      };

      vi.mocked(api.getProductById).mockResolvedValue(mockProduct);
      
      await store.dispatch(fetchProductById(1));
      
      const state = store.getState().products;
      expect(state.items).toContainEqual(mockProduct);
    });

    it('should update existing product', async () => {
      const existingProduct = {
        id: 1,
        title: 'Old Title',
        price: 10.99,
        description: 'Description 1',
        category: 'electronics',
        image: 'image1.jpg',
        rating: { rate: 4.5, count: 100 },
      };

      store = configureStore({
        reducer: {
          products: productsReducer,
        },
        preloadedState: {
          products: {
            items: [existingProduct],
            loading: false,
            error: null,
            categories: [],
          },
        },
      });

      const updatedProduct = { ...existingProduct, title: 'New Title' };
      vi.mocked(api.getProductById).mockResolvedValue(updatedProduct);
      
      await store.dispatch(fetchProductById(1));
      
      const state = store.getState().products;
      expect(state.items[0].title).toBe('New Title');
    });
  });
});

