import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProducts, fetchCategories } from '../store/slices/productsSlice';
import {
  selectFilteredAndSortedProducts,
  selectProductsLoading,
  selectProductsError,
} from '../store/selectors';
import { ProductCard } from '../components/ProductCard';
import { SearchBar } from '../components/SearchBar';
import { FilterBar } from '../components/FilterBar';

export const ProductListingPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectFilteredAndSortedProducts);
  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);

  useEffect(() => {
    // Fetch everything on mount
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    // console.log('Products loaded:', products.length); // debug
  }, [dispatch]);

  if (loading && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-lg text-red-500">❌ {error}</p>
        <button 
          onClick={() => dispatch(fetchProducts())} 
          className="py-3 px-6 bg-blue-600 text-white border-none rounded-lg text-base font-medium cursor-pointer transition-colors hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Products</h1>
        <p className="text-lg">Discover amazing products at great prices</p>
      </div>

      <div className="flex flex-col gap-5 mb-8 p-6 bg-white rounded-xl shadow-sm">
        <SearchBar />
        <FilterBar />
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16 px-5 text-gray-500 text-lg">
          <p>No products found. Try adjusting your filters.</p>
        </div>
      ) : (
        <>
          <div 
            className="mb-5 text-sm text-gray-500 font-medium" 
            role="status" 
            aria-live="polite" 
            aria-atomic="true"
          >
            Showing {products.length} {products.length === 1 ? 'product' : 'products'}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

