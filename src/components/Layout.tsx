import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { selectFavorites } from '../store/selectors';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const favorites = useAppSelector(selectFavorites);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip to content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>
      
      <header className="bg-gray-800 text-white py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-5 flex justify-between items-center flex-col md:flex-row gap-4 md:gap-0">
          <Link to="/" className="text-2xl font-bold text-white hover:opacity-80 transition-opacity">
            🛒 Product Store
          </Link>
          <nav role="navigation" aria-label="Main navigation" className="flex gap-6 items-center w-full md:w-auto justify-center">
            <Link
              to="/"
              className={`text-base font-medium px-4 py-2 rounded-md transition-colors flex items-center gap-2 flex-1 md:flex-none justify-center ${
                location.pathname === '/' 
                  ? 'bg-white/20' 
                  : 'hover:bg-white/10'
              }`}
            >
              Products
            </Link>
            <Link
              to="/favorites"
              className={`text-base font-medium px-4 py-2 rounded-md transition-colors flex items-center gap-2 flex-1 md:flex-none justify-center relative ${
                location.pathname === '/favorites' 
                  ? 'bg-white/20' 
                  : 'hover:bg-white/10'
              }`}
            >
              Favorites
              {favorites.length > 0 && (
                <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                  {favorites.length}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>
      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto py-10 px-5">
        {children}
      </main>
      <footer className="bg-gray-50 border-t border-gray-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-5 text-center text-gray-500">
          <p>&copy; 2026 Product Store. Built with React + Redux Toolkit + Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
};

