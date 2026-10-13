import React from 'react';
import { Play, Star, Eye } from 'lucide-react';

export const GameCard = ({
  game,
  isFavorite,
  onToggleFavorite,
  onPlay,
}) => {
  return (
    <div
      onClick={() => onPlay(game)}
      className="group relative flex flex-col bg-slate-900/80 hover:bg-slate-900 border border-slate-800/80 hover:border-indigo-500/50 rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer"
    >
      {/* Top Visual Area / Thumbnail */}
      <div className="relative aspect-[16/10] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center overflow-hidden border-b border-slate-800/60">
        
        {/* Ambient Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

        {/* Game Icon Emoji */}
        <div className="relative text-5xl transform transition-transform duration-300 group-hover:scale-110 select-none">
          {game.thumbnailEmoji}
        </div>

        {/* Favorite Heart / Star Button */}
        <button
          onClick={(e) => onToggleFavorite(e, game.id)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-lg bg-slate-950/70 hover:bg-slate-900 border border-slate-800/80 flex items-center justify-center transition-colors z-10"
        >
          <Star
            className={`w-4 h-4 transition-colors ${
              isFavorite
                ? 'text-amber-400 fill-amber-400'
                : 'text-slate-400 hover:text-amber-400'
            }`}
          />
        </button>

        {/* Custom Game Tag if user added it */}
        {game.isCustom && (
          <span className="absolute top-2.5 left-2.5 text-[10px] uppercase font-mono font-bold tracking-wider text-teal-400 bg-teal-950/80 border border-teal-800/60 px-2 py-0.5 rounded">
            Custom
          </span>
        )}

        {/* Hover Play Button Overlay */}
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 group-hover:scale-105 transition-transform flex items-center justify-center shadow-lg shadow-indigo-600/40 text-white">
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </div>
        </div>
      </div>

      {/* Card Content & Zero-Pill Typography */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata: Category · Rating · Plays (Unboxed text) */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5 font-medium">
            <span className="text-indigo-400 font-semibold">{game.category}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="flex items-center gap-1 text-slate-300">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {Number(game.rating).toFixed(1)}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="flex items-center gap-1 text-slate-400">
              <Eye className="w-3 h-3 text-slate-500" /> {game.plays > 1000 ? `${(game.plays / 1000).toFixed(1)}k` : game.plays}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-base text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-1">
            {game.title}
          </h3>

          {/* Description */}
          <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {game.description}
          </p>
        </div>

        {/* Footer info: primary control */}
        <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
          <span className="truncate max-w-[200px] font-mono">
            {game.controls?.[0] || 'Interactive Controls'}
          </span>
          <span className="text-indigo-400 group-hover:translate-x-0.5 transition-transform font-bold">
            PLAY →
          </span>
        </div>
      </div>
    </div>
  );
};
