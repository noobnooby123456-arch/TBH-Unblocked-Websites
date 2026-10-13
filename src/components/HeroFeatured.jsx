import React from 'react';
import { Play, Star, Flame, Eye } from 'lucide-react';

export const HeroFeatured = ({ game, onPlay }) => {
  if (!game) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800/80 p-6 sm:p-8 shadow-2xl">
      {/* Decorative Neon Glow Backdrop */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        <div className="max-w-2xl space-y-3">
          {/* Metadata banner */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              <Flame className="w-3.5 h-3.5" /> FEATURED UNBLOCKED
            </span>
            <span aria-hidden="true">·</span>
            <span>{game.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-slate-300">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {Number(game.rating).toFixed(1)}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-slate-400">
              <Eye className="w-3 h-3 text-slate-400" /> {Number(game.plays).toLocaleString()} plays
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {game.title}
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-300 line-clamp-2 leading-relaxed">
            {game.description}
          </p>

          {/* Controls pill tags */}
          <div className="flex flex-wrap gap-2 pt-1 text-xs text-slate-400">
            {(game.controls || []).slice(0, 2).map((ctrl, idx) => (
              <span key={idx} className="bg-slate-800/80 border border-slate-700/60 px-2.5 py-1 rounded text-[11px] text-slate-300 font-mono">
                {ctrl}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button & Visual Icon */}
        <div className="flex flex-row md:flex-col items-center gap-4 shrink-0 w-full md:w-auto justify-between md:justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-800/90 border border-slate-700 flex items-center justify-center text-3xl sm:text-4xl shadow-inner">
            {game.thumbnailEmoji}
          </div>

          <button
            onClick={() => onPlay(game)}
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>PLAY NOW</span>
          </button>
        </div>

      </div>
    </div>
  );
};
