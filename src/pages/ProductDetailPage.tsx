import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProductById } from '../store/slices/productsSlice';
import { toggleFavorite } from '../store/slices/favoritesSlice';
import { selectProductById, selectIsFavorite, selectProductsLoading, selectProductsError } from '../store/selectors';

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const productId = Number(id);
  
  const product = useAppSelector(selectProductById(productId));
  const isFavorite = useAppSelector(selectIsFavorite(productId));
  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);

  useEffect(() => {
    // Only fetch if we don't already have this product in the store
    if (!product && productId) {
      dispatch(fetchProductById(productId));
    }
  }, [productId, product, dispatch]);

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(productId));
  };

  const handleBackClick = () => {
    navigate(-1); // Go back to wherever they came from
  };

  if (loading && !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-lg text-red-500">❌ {error}</p>
        <button 
          onClick={() => dispatch(fetchProductById(productId))} 
          className="py-3 px-6 bg-blue-600 text-white border-none rounded-lg text-base font-medium cursor-pointer transition-colors hover:bg-blue-700"
        >
          Try Again
        </button>
        <button 
          onClick={handleBackClick} 
          className="py-2.5 px-5 bg-white border-2 border-gray-300 rounded-lg text-base font-medium cursor-pointer transition-colors hover:bg-gray-50"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-lg text-red-500">Product not found</p>
        <button 
          onClick={handleBackClick} 
          className="py-2.5 px-5 bg-white border-2 border-gray-300 rounded-lg text-base font-medium cursor-pointer transition-colors hover:bg-gray-50"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <button 
        onClick={handleBackClick} 
        className="inline-flex items-center gap-2 py-2.5 px-5 bg-white border-2 border-gray-300 rounded-lg text-base font-medium cursor-pointer transition-all hover:bg-gray-50 hover:border-gray-400 mb-6 text-gray-700"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-xl p-10 shadow-sm">
        <div className="flex items-center justify-center bg-gray-50 rounded-xl p-10">
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-w-full max-h-[500px] object-contain" 
          />
        </div>

        <div className="flex flex-col gap-5">
          <div className="inline-block w-fit py-1.5 px-4 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize">
            {product.category}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {product.title}
          </h1>
          
          <div className="flex items-center gap-3">
            <span className="text-xl font-semibold text-gray-900">⭐ {product.rating.rate}</span>
            <span className="text-gray-600 text-base">({product.rating.count} reviews)</span>
          </div>

          <div className="py-5 border-t border-b border-gray-200">
            <span className="text-4xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
          </div>

          <div className="mt-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
            <p className="text-base leading-relaxed text-gray-700">{product.description}</p>
          </div>

          <button
            onClick={handleFavoriteClick}
            className={`mt-2 py-4 px-8 border-2 rounded-lg text-lg font-semibold cursor-pointer transition-all ${
              isFavorite 
                ? 'bg-red-500 border-red-500 text-white hover:bg-red-600 hover:border-red-600' 
                : 'bg-white border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
            }`}
          >
            {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
};

