import React from 'react';
import { Star, SlidersHorizontal } from 'lucide-react';

export const CategoryNav = ({
  categories,
  activeCategory,
  onSelectCategory,
  categoryCounts,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
      
      {/* Category Segmented Buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        {categories.map((cat) => {
          const count = categoryCounts[cat] || 0;
          const isActive = activeCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800/80'
              }`}
            >
              {cat === 'Favorites' && (
                <Star className={`w-3 h-3 ${isActive ? 'text-amber-300 fill-amber-300' : 'text-slate-400'}`} />
              )}
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  isActive ? 'bg-indigo-700/80 text-indigo-100' : 'bg-slate-800 text-slate-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Sort Select */}
      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
        <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
        <span className="text-xs text-slate-500 font-medium">Sort by:</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          aria-label="Sort games by"
          className="bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 px-2.5 py-1.5 focus:outline-none focus:border-indigo-500 cursor-pointer"
        >
          <option value="popular">Most Popular</option>
          <option value="rating">Top Rated</option>
          <option value="title">Alphabetical (A-Z)</option>
        </select>
      </div>

    </div>
  );
};
