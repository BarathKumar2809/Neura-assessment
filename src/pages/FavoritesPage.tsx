import { useAppSelector } from '../store/hooks';
import { selectFavoriteProducts } from '../store/selectors';
import { ProductCard } from '../components/ProductCard';
import { Link } from 'react-router-dom';

export const FavoritesPage = () => {
  const favoriteProducts = useAppSelector(selectFavoriteProducts);

  if (favoriteProducts.length === 0) {
    return (
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Favorites</h1>
          <p className="text-lg text-gray-600">Your favorite products collection</p>
        </div>

        <div className="flex flex-col items-center justify-center text-center py-20 px-5 bg-white rounded-xl shadow-sm">
          <div className="text-8xl mb-6 opacity-50">❤️</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">No favorites yet</h2>
          <p className="text-lg text-gray-600 mb-8">
            Start adding products to your favorites to see them here!
          </p>
          <Link 
            to="/" 
            className="inline-block py-3.5 px-8 bg-blue-600 text-white rounded-lg text-base font-semibold transition-colors hover:bg-blue-700 no-underline"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Favorites</h1>
        <p className="text-lg text-gray-600">
          You have {favoriteProducts.length} {favoriteProducts.length === 1 ? 'favorite' : 'favorites'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favoriteProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

