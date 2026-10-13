import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Maximize2,
  Minimize2,
  RotateCcw,
  ExternalLink,
  Star,
  Copy,
  Check,
  Tv,
  Gamepad2,
  Tag
} from 'lucide-react';

export const GameTheaterModal = ({
  game,
  onClose,
  isFavorite,
  onToggleFavorite,
  allGames,
  onSelectGame,
}) => {
  const [iframeKey, setIframeKey] = useState(() => Date.now());
  const [isCinemaMode, setIsCinemaMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef(null);
  const iframeRef = useRef(null);

  // Keyboard shortcut to close (ESC)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !document.fullscreenElement) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleReload = () => {
    setIframeKey(Date.now());
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen().catch(console.error);
    }
  };

  const handleCopyJsonSnippet = () => {
    const jsonStr = JSON.stringify(game, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedGames = (allGames || [])
    .filter((g) => g.id !== game.id && (g.category === game.category || g.featured))
    .slice(0, 4);

  const resolvedUrl = React.useMemo(() => {
    const url = game?.iframeUrl || '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.startsWith('/games/')) return '.' + url;
    return url;
  }, [game?.iframeUrl]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-start overflow-y-auto p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      {/* Container with dynamic width based on cinema mode */}
      <div
        className={`w-full transition-all duration-300 flex flex-col gap-4 my-auto ${
          isCinemaMode ? 'max-w-7xl' : 'max-w-5xl'
        }`}
      >
        
        {/* Top Control Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 flex items-center justify-between gap-4 shadow-xl">
          
          {/* Game Title & Category */}
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-2xl select-none">{game.thumbnailEmoji}</span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-base sm:text-lg text-white truncate">
                  {game.title}
                </h2>
                <span className="text-xs text-indigo-400 font-semibold hidden sm:inline">
                  {game.category}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="flex items-center gap-1 text-slate-300">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {Number(game.rating).toFixed(1)}
                </span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>{Number(game.plays).toLocaleString()} plays</span>
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            
            {/* Favorite Button */}
            <button
              onClick={(e) => onToggleFavorite(e, game.id)}
              className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors ${
                isFavorite
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-700'
              }`}
              title={isFavorite ? 'Saved to Favorites' : 'Add to Favorites'}
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>

            {/* Reload Game Iframe */}
            <button
              onClick={handleReload}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
              title="Restart / Reload Game"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Cinema Width Toggle */}
            <button
              onClick={() => setIsCinemaMode(!isCinemaMode)}
              className={`p-2 rounded-lg border transition-colors hidden sm:flex ${
                isCinemaMode
                  ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/40'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
              title={isCinemaMode ? 'Standard Width' : 'Theater / Widescreen Mode'}
            >
              <Tv className="w-4 h-4" />
            </button>

            {/* Native Fullscreen */}
            <button
              onClick={handleFullscreen}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
              title="Toggle Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Open Direct Game Link */}
            <a
              href={resolvedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors hidden md:flex"
              title="Open direct game tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Copy JSON snippet */}
            <button
              onClick={handleCopyJsonSnippet}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors hidden md:flex"
              title="Copy Game JSON Config"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-colors ml-1"
              title="Close Theater (ESC)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* The Game Iframe Player Box */}
        <div
          ref={containerRef}
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-black rounded-xl overflow-hidden border border-slate-800 shadow-2xl flex items-center justify-center"
        >
          <iframe
            key={iframeKey}
            ref={iframeRef}
            src={resolvedUrl}
            title={game.title}
            className="w-full h-full border-0"
            allow="fullscreen; autoplay; gamepad; keyboard"
            sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-forms"
          />
        </div>

        {/* Game Details, Controls, and Related */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Description & About */}
            <div className="md:col-span-2 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                About {game.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {game.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <Tag className="w-3.5 h-3.5 text-slate-500" />
                {(game.tags || []).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive Controls Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
                <Gamepad2 className="w-4 h-4" />
                <span>Controls & Keybinds</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300 font-mono">
                {(game.controls || []).map((ctrl, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400">▸</span>
                    <span>{ctrl}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Related / More Unblocked Games */}
          {relatedGames.length > 0 && (
            <div className="pt-3 border-t border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                More Unblocked Games
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {relatedGames.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => onSelectGame(rel)}
                    className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800/80 hover:border-indigo-500/50 text-left transition-colors cursor-pointer"
                  >
                    <span className="text-2xl shrink-0">{rel.thumbnailEmoji}</span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-200 truncate">
                        {rel.title}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {rel.category}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
