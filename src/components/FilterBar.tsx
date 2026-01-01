import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setCategory, setSortBy, clearFilters } from '../store/slices/filtersSlice';
import { selectCategories, selectSelectedCategory, selectSortBy } from '../store/selectors';

export const FilterBar = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const selectedCategory = useAppSelector(selectSelectedCategory);
  const sortBy = useAppSelector(selectSortBy);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCategory(e.target.value));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortBy(e.target.value as 'default' | 'price-asc' | 'price-desc'));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const hasActiveFilters = selectedCategory || sortBy !== 'default';

  return (
    <div className="flex flex-wrap gap-4 items-end">
      <div className="flex flex-col gap-1.5 w-full md:w-auto">
        <label htmlFor="category-filter" className="text-sm font-medium text-gray-700">
          Category:
        </label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="py-2.5 px-3.5 border-2 border-gray-300 rounded-lg text-sm bg-white cursor-pointer transition-colors focus:outline-none min-w-[180px] md:min-w-[180px] w-full"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5 w-full md:w-auto">
        <label htmlFor="sort-filter" className="text-sm font-medium text-gray-700">
          Sort by:
        </label>
        <select
          id="sort-filter"
          value={sortBy}
          onChange={handleSortChange}
          className="py-2.5 px-3.5 border-2 border-gray-300 rounded-lg text-sm bg-white cursor-pointer transition-colors focus:outline-none min-w-[180px] md:min-w-[180px] w-full"
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {hasActiveFilters && (
        <button
          onClick={handleClearFilters}
          className="py-2.5 px-5 bg-red-500 text-white border-none rounded-lg text-sm font-medium cursor-pointer transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 w-full md:w-auto"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};

