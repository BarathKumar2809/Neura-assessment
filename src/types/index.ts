export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface FilterState {
  searchQuery: string;
  selectedCategory: string;
  sortBy: 'default' | 'price-asc' | 'price-desc';
}

export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  categories: string[];
}

export interface FavoritesState {
  items: number[];
}

