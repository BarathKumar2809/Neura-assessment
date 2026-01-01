import { describe, it, expect, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import filtersReducer, { 
  setSearchQuery, 
  setCategory, 
  setSortBy, 
  clearFilters 
} from '../filtersSlice';

describe('filtersSlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        filters: filtersReducer,
      },
    });
  });

  it('should have correct initial state', () => {
    const state = store.getState().filters;
    expect(state).toEqual({
      searchQuery: '',
      selectedCategory: '',
      sortBy: 'default',
    });
  });

  describe('setSearchQuery', () => {
    it('should set search query', () => {
      store.dispatch(setSearchQuery('test query'));
      const state = store.getState().filters;
      expect(state.searchQuery).toBe('test query');
    });
  });

  describe('setCategory', () => {
    it('should set selected category', () => {
      store.dispatch(setCategory('electronics'));
      const state = store.getState().filters;
      expect(state.selectedCategory).toBe('electronics');
    });
  });

  describe('setSortBy', () => {
    it('should set sort option', () => {
      store.dispatch(setSortBy('price-asc'));
      const state = store.getState().filters;
      expect(state.sortBy).toBe('price-asc');
    });
  });

  describe('clearFilters', () => {
    beforeEach(() => {
      store = configureStore({
        reducer: {
          filters: filtersReducer,
        },
        preloadedState: {
          filters: {
            searchQuery: 'test',
            selectedCategory: 'electronics',
            sortBy: 'price-asc',
          },
        },
      });
    });

    it('should reset all filters to initial state', () => {
      store.dispatch(clearFilters());
      const state = store.getState().filters;
      expect(state).toEqual({
        searchQuery: '',
        selectedCategory: '',
        sortBy: 'default',
      });
    });
  });
});

