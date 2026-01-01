import { describe, it, expect } from 'vitest';
import {
  selectProducts,
  selectFavorites,
  selectFilteredAndSortedProducts,
  selectFavoriteProducts,
  selectProductById,
  selectIsFavorite,
} from '../selectors';
import type { RootState } from '../index';

const mockProducts = [
  {
    id: 1,
    title: 'Laptop',
    price: 999.99,
    description: 'High-performance laptop',
    category: 'electronics',
    image: 'laptop.jpg',
    rating: { rate: 4.5, count: 100 },
  },
  {
    id: 2,
    title: 'T-Shirt',
    price: 19.99,
    description: 'Cotton t-shirt',
    category: 'clothing',
    image: 'tshirt.jpg',
    rating: { rate: 4.0, count: 50 },
  },
  {
    id: 3,
    title: 'Headphones',
    price: 149.99,
    description: 'Wireless headphones',
    category: 'electronics',
    image: 'headphones.jpg',
    rating: { rate: 4.8, count: 200 },
  },
];

const mockState: RootState = {
  products: {
    items: mockProducts,
    loading: false,
    error: null,
    categories: ['electronics', 'clothing'],
  },
  favorites: {
    items: [1, 3],
  },
  filters: {
    searchQuery: '',
    selectedCategory: '',
    sortBy: 'default',
  },
};

describe('selectors', () => {
  describe('selectProducts', () => {
    it('should return all products', () => {
      const result = selectProducts(mockState);
      expect(result).toEqual(mockProducts);
    });
  });

  describe('selectFavorites', () => {
    it('should return favorite IDs', () => {
      const result = selectFavorites(mockState);
      expect(result).toEqual([1, 3]);
    });
  });

  describe('selectFilteredAndSortedProducts', () => {
    it('should return all products when no filters applied', () => {
      const result = selectFilteredAndSortedProducts(mockState);
      expect(result).toEqual(mockProducts);
    });

    it('should filter by search query', () => {
      const stateWithSearch = {
        ...mockState,
        filters: { ...mockState.filters, searchQuery: 'laptop' },
      };
      const result = selectFilteredAndSortedProducts(stateWithSearch);
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Laptop');
    });

    it('should filter by category', () => {
      const stateWithCategory = {
        ...mockState,
        filters: { ...mockState.filters, selectedCategory: 'electronics' },
      };
      const result = selectFilteredAndSortedProducts(stateWithCategory);
      expect(result).toHaveLength(2);
      expect(result.every(p => p.category === 'electronics')).toBe(true);
    });

    it('should sort by price ascending', () => {
      const stateWithSort = {
        ...mockState,
        filters: { ...mockState.filters, sortBy: 'price-asc' as const },
      };
      const result = selectFilteredAndSortedProducts(stateWithSort);
      expect(result[0].price).toBe(19.99);
      expect(result[2].price).toBe(999.99);
    });

    it('should sort by price descending', () => {
      const stateWithSort = {
        ...mockState,
        filters: { ...mockState.filters, sortBy: 'price-desc' as const },
      };
      const result = selectFilteredAndSortedProducts(stateWithSort);
      expect(result[0].price).toBe(999.99);
      expect(result[2].price).toBe(19.99);
    });

    it('should apply multiple filters simultaneously', () => {
      const stateWithMultipleFilters = {
        ...mockState,
        filters: {
          searchQuery: 'headphones',
          selectedCategory: 'electronics',
          sortBy: 'default' as const,
        },
      };
      const result = selectFilteredAndSortedProducts(stateWithMultipleFilters);
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Headphones');
    });
  });

  describe('selectFavoriteProducts', () => {
    it('should return only favorite products', () => {
      const result = selectFavoriteProducts(mockState);
      expect(result).toHaveLength(2);
      expect(result.map(p => p.id)).toEqual([1, 3]);
    });
  });

  describe('selectProductById', () => {
    it('should return product with matching ID', () => {
      const selector = selectProductById(2);
      const result = selector(mockState);
      expect(result?.title).toBe('T-Shirt');
    });

    it('should return undefined for non-existent product', () => {
      const selector = selectProductById(999);
      const result = selector(mockState);
      expect(result).toBeUndefined();
    });
  });

  describe('selectIsFavorite', () => {
    it('should return true for favorite product', () => {
      const selector = selectIsFavorite(1);
      const result = selector(mockState);
      expect(result).toBe(true);
    });

    it('should return false for non-favorite product', () => {
      const selector = selectIsFavorite(2);
      const result = selector(mockState);
      expect(result).toBe(false);
    });
  });
});

