import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './index';
import type { Product } from '../types';

// Simple selectors - just grab stuff from state
export const selectProducts = (state: RootState) => state.products.items;
export const selectProductsLoading = (state: RootState) => state.products.loading;
export const selectProductsError = (state: RootState) => state.products.error;
export const selectCategories = (state: RootState) => state.products.categories;

export const selectFavorites = (state: RootState) => state.favorites.items;

export const selectSearchQuery = (state: RootState) => state.filters.searchQuery;
export const selectSelectedCategory = (state: RootState) => state.filters.selectedCategory;
export const selectSortBy = (state: RootState) => state.filters.sortBy;

// These are memoized for performance - they only recalculate when inputs change
export const selectFilteredAndSortedProducts = createSelector(
  [selectProducts, selectSearchQuery, selectSelectedCategory, selectSortBy],
  (products, searchQuery, selectedCategory, sortBy): Product[] => {
    let filtered = [...products];

    // Search in title and description
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    // Apply category filter if one is selected
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Handle price sorting
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }
);

// Get full product objects for items in favorites list
export const selectFavoriteProducts = createSelector(
  [selectProducts, selectFavorites],
  (products, favoriteIds): Product[] => {
    return products.filter(product => favoriteIds.includes(product.id));
  }
);

export const selectProductById = (productId: number) =>
  createSelector(
    [selectProducts],
    (products): Product | undefined => {
      return products.find(product => product.id === productId);
    }
  );

export const selectIsFavorite = (productId: number) =>
  createSelector(
    [selectFavorites],
    (favorites): boolean => {
      return favorites.includes(productId);
    }
  );

