import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import App from '../../App';
import { api } from '../../services/api';

vi.mock('../../services/api');

const mockProducts = [
  {
    id: 1,
    title: 'Laptop Computer',
    price: 999.99,
    description: 'High-performance laptop',
    category: 'electronics',
    image: 'laptop.jpg',
    rating: { rate: 4.5, count: 100 },
  },
  {
    id: 2,
    title: 'Cotton T-Shirt',
    price: 19.99,
    description: 'Comfortable cotton t-shirt',
    category: 'clothing',
    image: 'tshirt.jpg',
    rating: { rate: 4.0, count: 50 },
  },
  {
    id: 3,
    title: 'Wireless Headphones',
    price: 149.99,
    description: 'Premium wireless headphones',
    category: 'electronics',
    image: 'headphones.jpg',
    rating: { rate: 4.8, count: 200 },
  },
];

const mockCategories = ['electronics', 'clothing'];

const renderApp = () => {
  return render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

describe('Product Flow Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(api.getAllProducts).mockResolvedValue(mockProducts);
    vi.mocked(api.getCategories).mockResolvedValue(mockCategories);
    localStorage.clear();
  });

  it('should display products on initial load', async () => {
    renderApp();

    await waitFor(() => {
      expect(screen.getByText('Laptop Computer')).toBeInTheDocument();
      expect(screen.getByText('Cotton T-Shirt')).toBeInTheDocument();
      expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('should filter products by search query', async () => {
    renderApp();

    await waitFor(() => {
      expect(screen.getByText('Laptop Computer')).toBeInTheDocument();
    }, { timeout: 3000 });

    const searchInput = screen.getByPlaceholderText('Search products...');
    fireEvent.change(searchInput, { target: { value: 'laptop' } });

    // Give it time for the debounce to kick in (300ms)
    await waitFor(() => {
      expect(screen.getByText('Laptop Computer')).toBeInTheDocument();
      expect(screen.queryByText('Cotton T-Shirt')).not.toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('should have filter controls available', async () => {
    renderApp();

    await waitFor(() => {
      expect(screen.getByText('Laptop Computer')).toBeInTheDocument();
    }, { timeout: 3000 });

    // Make sure all the filter UI is there
    expect(screen.getByLabelText('Category:')).toBeInTheDocument();
    expect(screen.getByLabelText('Sort by:')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
  });

  it('should add and remove products from favorites', async () => {
    renderApp();

    await waitFor(() => {
      expect(screen.getByText('Laptop Computer')).toBeInTheDocument();
    }, { timeout: 3000 });

    // Click the heart button on first product
    const favoriteButtons = screen.getAllByLabelText('Add to favorites');
    fireEvent.click(favoriteButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument(); // Should show badge with count
    });

    // Go to favorites page
    const favoritesLink = screen.getByText('Favorites');
    fireEvent.click(favoritesLink);

    await waitFor(() => {
      expect(screen.getByText('Laptop Computer')).toBeInTheDocument();
    }, { timeout: 2000 });

    // Unfavorite it
    const removeFavoriteBtn = screen.getByLabelText('Remove from favorites');
    fireEvent.click(removeFavoriteBtn);

    await waitFor(() => {
      expect(screen.getByText('No favorites yet')).toBeInTheDocument();
    });
  });

});

