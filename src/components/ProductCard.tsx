import { useNavigate } from 'react-router-dom';
import type { Product } from '../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleFavorite } from '../store/slices/favoritesSlice';
import { selectIsFavorite } from '../store/selectors';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(selectIsFavorite(product.id));

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Don't trigger card click when clicking favorite button
    dispatch(toggleFavorite(product.id));
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex flex-col h-full"
      onClick={handleCardClick}
    >
      <div className="relative w-full h-64 p-5 bg-gray-50 flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.title} 
          className="max-w-full max-h-full object-contain" 
        />
        <button
          className={`absolute top-2.5 right-2.5 bg-white border-none rounded-full w-10 h-10 text-xl cursor-pointer flex items-center justify-center shadow-md transition-transform duration-200 hover:scale-110 ${
            isFavorite ? 'animate-pulse-once' : ''
          }`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-base font-semibold mb-2 text-gray-800 line-clamp-2 min-h-[2.8em] leading-relaxed">
          {product.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3 capitalize">{product.category}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-base">⭐</span>
            <span className="font-semibold text-gray-800">{product.rating.rate}</span>
            <span className="text-gray-600">({product.rating.count})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

