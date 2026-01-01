import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { ProductCard } from '../ProductCard';
import productsReducer from '../../store/slices/productsSlice';
import favoritesReducer from '../../store/slices/favoritesSlice';
import filtersReducer from '../../store/slices/filtersSlice';
import type { Product } from '../../types';

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  description: 'Test description',
  category: 'electronics',
  image: 'test.jpg',
  rating: { rate: 4.5, count: 100 },
};

const renderWithProviders = (
  component: React.ReactElement,
  preloadedState = {}
) => {
  const store = configureStore({
    reducer: {
      products: productsReducer,
      favorites: favoritesReducer,
      filters: filtersReducer,
    },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

describe('ProductCard', () => {
  it('should render product information', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('electronics')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('should display product image', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);

    const image = screen.getByAltText('Test Product');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test.jpg');
  });

  it('should show empty heart when not favorited', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);

    const favoriteBtn = screen.getByLabelText('Add to favorites');
    expect(favoriteBtn).toBeInTheDocument();
    expect(favoriteBtn).toHaveTextContent('🤍');
  });

  it('should show filled heart when favorited', () => {
    renderWithProviders(<ProductCard product={mockProduct} />, {
      favorites: { items: [1] },
    });

    const favoriteBtn = screen.getByLabelText('Remove from favorites');
    expect(favoriteBtn).toBeInTheDocument();
    expect(favoriteBtn).toHaveTextContent('❤️');
  });

  it('should toggle favorite on button click', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);

    const favoriteBtn = screen.getByLabelText('Add to favorites');
    fireEvent.click(favoriteBtn);

    // Check that the button changed
    expect(screen.getByLabelText('Remove from favorites')).toBeInTheDocument();
  });
});

