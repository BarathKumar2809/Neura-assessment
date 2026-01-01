import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { FavoritesState } from '../../types';

const initialState: FavoritesState = {
  items: [],
};

// Pull saved favorites from localStorage on app start
const loadFavoritesFromStorage = (): number[] => {
  try {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  } catch {
    // If something goes wrong, just return empty array
    return [];
  }
};

// Keep favorites in sync with localStorage
const saveFavoritesToStorage = (favorites: number[]) => {
  try {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  } catch (error) {
    // TODO: maybe show a toast notification here?
    console.error('Failed to save favorites to localStorage:', error);
  }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    ...initialState,
    items: loadFavoritesFromStorage(),
  },
  reducers: {
    addToFavorites: (state, action: PayloadAction<number>) => {
      // Don't add duplicates
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
        saveFavoritesToStorage(state.items);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(id => id !== action.payload);
      saveFavoritesToStorage(state.items);
    },
    // This one handles both add and remove - toggle style
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const index = state.items.indexOf(action.payload);
      if (index !== -1) {
        // Already favorited, remove it
        state.items.splice(index, 1);
      } else {
        // Not favorited yet, add it
        state.items.push(action.payload);
      }
      saveFavoritesToStorage(state.items);
    },
  },
});

export const { addToFavorites, removeFromFavorites, toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;

