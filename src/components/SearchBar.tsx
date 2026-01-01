import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSearchQuery } from '../store/slices/filtersSlice';
import { selectSearchQuery } from '../store/selectors';

export const SearchBar = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(selectSearchQuery);
  const [localQuery, setLocalQuery] = useState(searchQuery);

  // Debounce the search so we're not hitting Redux on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchQuery(localQuery));
    }, 300); // 300ms feels about right

    return () => clearTimeout(timer);
  }, [localQuery, dispatch]);

  return (
    <div role="search" className="relative w-full max-w-2xl flex">
      <input
        type="text"
        placeholder="Search products..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        className="w-full py-3 px-4 border-2 border-gray-300 rounded-l-lg text-base focus:outline-none"
        aria-label="Search products"
      />
      <button
        type="button"
        className="bg-white hover:bg-gray-50 px-6 rounded-r-lg transition-colors flex items-center justify-center border-2 border-l-0 border-gray-300 focus:outline-none"
        aria-label="Search"
      >
        <svg
          className="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  );
};

