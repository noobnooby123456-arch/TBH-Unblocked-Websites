import React from 'react';
import { Gamepad2, Search, EyeOff, ShieldAlert, FileCode, Plus, Star, X } from 'lucide-react';

export const Header = ({
  searchQuery,
  setSearchQuery,
  favoritesCount,
  onOpenCloakModal,
  onOpenPanicModal,
  onOpenJsonModal,
  onOpenAddGameModal,
  onSelectFavorites,
  activeCategory,
  panicKey,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-500 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg tracking-wider text-slate-100 uppercase">
                Nexus<span className="text-indigo-400">Hub</span>
              </span>
              <span className="text-[10px] uppercase font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                Unblocked
              </span>
            </div>
            <p className="hidden sm:block text-[11px] text-slate-400 font-medium">
              HTML5 Iframe Game Collection
            </p>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="flex-1 max-w-md relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search unblocked games... (press / to focus)"
              className="w-full pl-9 pr-8 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Utilities: Cloak, Panic Key, JSON Store, Add Game */}
        <div className="flex items-center gap-2">
          
          {/* Favorites Button */}
          <button
            onClick={onSelectFavorites}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeCategory === 'Favorites'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
            title="Saved Games"
          >
            <Star className={`w-3.5 h-3.5 ${favoritesCount > 0 ? 'text-amber-400 fill-amber-400' : 'text-slate-400'}`} />
            <span>Saved ({favoritesCount})</span>
          </button>

          {/* Tab Cloaker */}
          <button
            onClick={onOpenCloakModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
            title="Disguise this browser tab"
          >
            <EyeOff className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Tab Cloak</span>
          </button>

          {/* Panic Key Indicator */}
          <button
            onClick={onOpenPanicModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-colors"
            title={`Panic Boss Key [${panicKey}]`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">Panic [{panicKey}]</span>
          </button>

          {/* JSON Manager */}
          <button
            onClick={onOpenJsonModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-indigo-300 border border-indigo-900/50 transition-colors"
            title="View and edit games.json"
          >
            <FileCode className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden lg:inline">games.json</span>
          </button>

          {/* Add Game Button */}
          <button
            onClick={onOpenAddGameModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-600/30 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add Game</span>
          </button>
        </div>

      </div>
    </header>
  );
};
