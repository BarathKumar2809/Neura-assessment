import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { FilterState } from '../../types';

const initialState: FilterState = {
  searchQuery: '',
  selectedCategory: '',
  sortBy: 'default',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    // Update search text as user types (debounced in component)
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    // Category dropdown selection
    setCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    // Price sorting - low to high or high to low
    setSortBy: (state, action: PayloadAction<'default' | 'price-asc' | 'price-desc'>) => {
      state.sortBy = action.payload;
    },
    // Reset everything back to defaults
    clearFilters: (state) => {
      state.searchQuery = '';
      state.selectedCategory = '';
      state.sortBy = 'default';
    },
  },
});

export const { setSearchQuery, setCategory, setSortBy, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;

