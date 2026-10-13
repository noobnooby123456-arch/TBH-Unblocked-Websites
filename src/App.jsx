/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import defaultGamesData from './data/games.json';
import { Header } from './components/Header.jsx';
import { HeroFeatured } from './components/HeroFeatured.jsx';
import { CategoryNav } from './components/CategoryNav.jsx';
import { GameCard } from './components/GameCard.jsx';
import { GameTheaterModal } from './components/GameTheaterModal.jsx';
import { JsonManagerModal } from './components/JsonManagerModal.jsx';
import { AddGameModal } from './components/AddGameModal.jsx';
import { CloakModal, CLOAK_PROFILES } from './components/CloakModal.jsx';
import { PanicModal } from './components/PanicModal.jsx';
import { CATEGORIES } from './constants/game.js';
import { Gamepad2, Sparkles, Shield, Cpu, RefreshCw } from 'lucide-react';

const STORAGE_GAMES_KEY = 'nexus_unblocked_games_v1';
const STORAGE_FAVS_KEY = 'nexus_unblocked_favs_v1';
const STORAGE_CLOAK_KEY = 'nexus_unblocked_cloak_v1';
const STORAGE_PANIC_KEY = 'nexus_unblocked_panic_key_v1';
const STORAGE_PANIC_URL_KEY = 'nexus_unblocked_panic_url_v1';

export default function App() {
  // Load games from localStorage or default JSON
  const [games, setGames] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_GAMES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading saved games:', e);
    }
    return defaultGamesData;
  });

  // Favorites state
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_FAVS_KEY);
      return saved ? JSON.parse(saved) : ['snake', 'tetris'];
    } catch {
      return ['snake', 'tetris'];
    }
  });

  // Cloak profile state
  const [cloakProfile, setCloakProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CLOAK_KEY);
      if (saved) {
        const found = CLOAK_PROFILES.find((p) => p.id === saved);
        return found || null;
      }
    } catch {}
    return null;
  });

  // Panic button state
  const [panicKey, setPanicKey] = useState(() => {
    return localStorage.getItem(STORAGE_PANIC_KEY) || ']';
  });
  const [panicUrl, setPanicUrl] = useState(() => {
    return localStorage.getItem(STORAGE_PANIC_URL_KEY) || 'https://classroom.google.com';
  });

  // Navigation, filtering, and active game
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [activeGame, setActiveGame] = useState(null);

  // Modals
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [isAddGameModalOpen, setIsAddGameModalOpen] = useState(false);
  const [isCloakModalOpen, setIsCloakModalOpen] = useState(false);
  const [isPanicModalOpen, setIsPanicModalOpen] = useState(false);

  // Sync Cloak changes to page title & favicon
  useEffect(() => {
    if (cloakProfile) {
      document.title = cloakProfile.title;
      let link = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = cloakProfile.favicon;
    } else {
      document.title = 'Nexus Unblocked - HTML5 Games Hub';
      const link = document.querySelector("link[rel*='icon']");
      if (link) {
        link.href = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236366f1'><path d='M6 11h4V7a1 1 0 0 1 2 0v4h4a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H6a1 1 0 0 1 0-2z'/></svg>";
      }
    }
  }, [cloakProfile]);

  // Global keydown listener for Panic hotkey and Search focus
  useEffect(() => {
    const handleGlobalKey = (e) => {
      const activeEl = document.activeElement;
      const isInput =
        activeEl instanceof HTMLInputElement || activeEl instanceof HTMLTextAreaElement;

      // Panic Trigger
      if (e.key === panicKey && !isInput) {
        e.preventDefault();
        window.location.href = panicUrl;
        return;
      }

      // Quick search '/' shortcut
      if (e.key === '/' && !isInput && !activeGame) {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]');
        if (searchInput) searchInput.focus();
      }
    };

    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [panicKey, panicUrl, activeGame]);

  // Save games to storage
  const handleSaveGames = (updatedGames) => {
    setGames(updatedGames);
    try {
      localStorage.setItem(STORAGE_GAMES_KEY, JSON.stringify(updatedGames));
    } catch (e) {
      console.error('Storage save error:', e);
    }
  };

  const handleResetToDefaults = () => {
    setGames(defaultGamesData);
    try {
      localStorage.removeItem(STORAGE_GAMES_KEY);
    } catch {}
  };

  const handleToggleFavorite = (e, gameId) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const updated = prev.includes(gameId)
        ? prev.filter((id) => id !== gameId)
        : [...prev, gameId];
      try {
        localStorage.setItem(STORAGE_FAVS_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleApplyCloak = (profile) => {
    setCloakProfile(profile);
    if (profile) {
      localStorage.setItem(STORAGE_CLOAK_KEY, profile.id);
    } else {
      localStorage.removeItem(STORAGE_CLOAK_KEY);
    }
  };

  const handleUpdatePanicKey = (key) => {
    setPanicKey(key);
    localStorage.setItem(STORAGE_PANIC_KEY, key);
  };

  const handleUpdatePanicUrl = (url) => {
    setPanicUrl(url);
    localStorage.setItem(STORAGE_PANIC_URL_KEY, url);
  };

  const handleAddGame = (newGame) => {
    const updated = [newGame, ...games];
    handleSaveGames(updated);
  };

  // Play Game Handler
  const handlePlayGame = (game) => {
    setActiveGame(game);
    setGames((prev) =>
      prev.map((g) => (g.id === game.id ? { ...g, plays: g.plays + 1 } : g))
    );
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { All: games.length, Favorites: favorites.length };
    games.forEach((g) => {
      counts[g.category] = (counts[g.category] || 0) + 1;
    });
    return counts;
  }, [games, favorites]);

  // Filtered & Sorted Games
  const filteredGames = useMemo(() => {
    return games
      .filter((g) => {
        // Category filter
        if (activeCategory === 'Favorites') {
          if (!favorites.includes(g.id)) return false;
        } else if (activeCategory !== 'All' && g.category !== activeCategory) {
          return false;
        }

        // Live search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = g.title.toLowerCase().includes(q);
          const matchesDesc = (g.description || '').toLowerCase().includes(q);
          const matchesTags = (g.tags || []).some((t) => t.toLowerCase().includes(q));
          const matchesCat = (g.category || '').toLowerCase().includes(q);
          if (!matchesTitle && !matchesDesc && !matchesTags && !matchesCat) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return b.plays - a.plays;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [games, activeCategory, favorites, searchQuery, sortBy]);

  // Featured game for the hero banner
  const featuredGame = useMemo(() => {
    return games.find((g) => g.featured) || games[0];
  }, [games]);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      
      {/* Sticky Header Navigation */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        favoritesCount={favorites.length}
        onOpenCloakModal={() => setIsCloakModalOpen(true)}
        onOpenPanicModal={() => setIsPanicModalOpen(true)}
        onOpenJsonModal={() => setIsJsonModalOpen(true)}
        onOpenAddGameModal={() => setIsAddGameModalOpen(true)}
        onSelectFavorites={() => setActiveCategory('Favorites')}
        activeCategory={activeCategory}
        panicKey={panicKey}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Featured Game Hero (shown only when on 'All' and not searching) */}
        {activeCategory === 'All' && !searchQuery.trim() && featuredGame && (
          <HeroFeatured game={featuredGame} onPlay={handlePlayGame} />
        )}

        {/* Filter and Sorting Toolbar */}
        <CategoryNav
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          categoryCounts={categoryCounts}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Search Results indicator */}
        {searchQuery.trim() && (
          <div className="flex items-center justify-between text-xs text-slate-400 py-1">
            <span>
              Showing results for "<strong className="text-white">{searchQuery}</strong>" (
              {filteredGames.length} games found)
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-indigo-400 hover:underline cursor-pointer"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Games Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                isFavorite={favorites.includes(game.id)}
                onToggleFavorite={handleToggleFavorite}
                onPlay={handlePlayGame}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-slate-900/40 rounded-2xl border border-slate-800/80 p-8 space-y-3">
            <Gamepad2 className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-slate-200">No unblocked games found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {activeCategory === 'Favorites'
                ? "You haven't bookmarked any favorite games yet. Click the star on any card to save it here!"
                : "No games match your current filter or search criteria. Try a different term or add a custom game."}
            </p>
            <div className="pt-2">
              {activeCategory === 'Favorites' ? (
                <button
                  onClick={() => setActiveCategory('All')}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Browse All Games
                </button>
              ) : (
                <button
                  onClick={() => setIsAddGameModalOpen(true)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  + Add Custom Game
                </button>
              )}
            </div>
          </div>
        )}

        {/* Information & Architecture Banner */}
        <section className="mt-12 rounded-xl bg-slate-900/60 border border-slate-800/80 p-5 grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-slate-400">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 mb-1">JSON-Driven Architecture</h4>
              <p className="leading-relaxed">
                Every game is stored as an iframe configuration inside a structured JSON. Fully editable, importable, and exportable.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 mb-1">Sandboxed HTML5 & Web Audio</h4>
              <p className="leading-relaxed">
                Zero external tracking or ad networks. Games run in secure, self-contained iframe viewports with synthesized audio.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 mb-1">Stealth Cloak & Panic Trigger</h4>
              <p className="leading-relaxed">
                Disguise browser tab title as Google Classroom with one click. Press <code className="text-slate-300 font-mono">[{panicKey}]</code> anytime for emergency exit.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/90 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400">Nexus Unblocked</span>
            <span>·</span>
            <span>HTML5 Iframe Game Collection</span>
            <span>·</span>
            <span>100% Pure Client-Side Code</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsJsonModalOpen(true)}
              className="hover:text-indigo-400 cursor-pointer"
            >
              Inspect games.json
            </button>
            <span>·</span>
            <button
              onClick={handleResetToDefaults}
              className="hover:text-rose-400 cursor-pointer flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              Reset Catalog
            </button>
          </div>
        </div>
      </footer>

      {/* Active Game Theater Modal */}
      {activeGame && (
        <GameTheaterModal
          game={activeGame}
          onClose={() => setActiveGame(null)}
          isFavorite={favorites.includes(activeGame.id)}
          onToggleFavorite={handleToggleFavorite}
          allGames={games}
          onSelectGame={handlePlayGame}
        />
      )}

      {/* games.json Editor / Manager Modal */}
      {isJsonModalOpen && (
        <JsonManagerModal
          games={games}
          onSaveGames={handleSaveGames}
          onResetToDefaults={handleResetToDefaults}
          onClose={() => setIsJsonModalOpen(false)}
        />
      )}

      {/* Add Custom Game Modal */}
      {isAddGameModalOpen && (
        <AddGameModal
          onAddGame={handleAddGame}
          onClose={() => setIsAddGameModalOpen(false)}
        />
      )}

      {/* Tab Cloaker Modal */}
      {isCloakModalOpen && (
        <CloakModal
          currentProfileId={cloakProfile?.id || ''}
          onApplyProfile={handleApplyCloak}
          onClose={() => setIsCloakModalOpen(false)}
        />
      )}

      {/* Panic Key Modal */}
      {isPanicModalOpen && (
        <PanicModal
          panicKey={panicKey}
          setPanicKey={handleUpdatePanicKey}
          panicUrl={panicUrl}
          setPanicUrl={handleUpdatePanicUrl}
          onClose={() => setIsPanicModalOpen(false)}
        />
      )}

    </div>
  );
}
