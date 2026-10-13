import React, { useState } from 'react';
import { X, Plus, AlertCircle, Check } from 'lucide-react';

export const AddGameModal = ({ onAddGame, onClose }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Arcade');
  const [iframeInput, setIframeInput] = useState('');
  const [description, setDescription] = useState('');
  const [emoji, setEmoji] = useState('🎮');
  const [controls, setControls] = useState('Arrow Keys - Move, Space - Action');
  const [tags, setTags] = useState('Unblocked, Custom, Web');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('Please provide a game title.');
      return;
    }

    if (!iframeInput.trim()) {
      setError('Please provide an iframe URL or embed code.');
      return;
    }

    // Extract src from iframe tag if user pasted full HTML snippet
    let cleanUrl = iframeInput.trim();
    if (cleanUrl.includes('<iframe') && cleanUrl.includes('src=')) {
      const match = cleanUrl.match(/src=["']([^"']+)["']/);
      if (match && match[1]) {
        cleanUrl = match[1];
      }
    }

    const id = 'custom-' + title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-') + '-' + Date.now().toString(36);

    const controlsList = controls
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);

    const tagsList = tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newGame = {
      id,
      title: title.trim(),
      category,
      description: description.trim() || 'Custom unblocked game added to your JSON collection.',
      iframeUrl: cleanUrl,
      embedHtml: `<iframe src="${cleanUrl}" width="100%" height="600" frameborder="0" allowfullscreen></iframe>`,
      thumbnailEmoji: emoji.trim() || '🎮',
      controls: controlsList.length ? controlsList : ['Standard Keyboard / Mouse Controls'],
      tags: tagsList.length ? tagsList : ['Custom', 'Unblocked'],
      rating: 5.0,
      plays: 1,
      isCustom: true,
      featured: false,
    };

    onAddGame(newGame);
    onClose();
  };

  const emojiOptions = ['🎮', '🕹️', '👾', '🚀', '🏎️', '⚡', '🏆', '🎯', '🧩', '🎲', '⚔️', '🔮'];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-extrabold text-white">Add Custom Iframe Game</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg flex items-center gap-2 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Title & Emoji */}
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-3">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Game Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Slope 3D / Retro Racer"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Icon Emoji
              </label>
              <input
                type="text"
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
                className="w-full text-center px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-lg text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Emoji suggestions */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <span className="text-[11px] text-slate-500 mr-1">Quick pick:</span>
            {emojiOptions.map((em) => (
              <button
                type="button"
                key={em}
                onClick={() => setEmoji(em)}
                className="text-base p-1 hover:bg-slate-800 rounded cursor-pointer transition-transform hover:scale-110"
              >
                {em}
              </button>
            ))}
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="Arcade">Arcade</option>
              <option value="Action">Action</option>
              <option value="Puzzle">Puzzle</option>
              <option value="Retro">Retro</option>
              <option value="Sports">Sports</option>
              <option value="Casual">Casual</option>
            </select>
          </div>

          {/* Iframe URL or Snippet */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Iframe Game URL or Embed Code *
            </label>
            <textarea
              value={iframeInput}
              onChange={(e) => setIframeInput(e.target.value)}
              placeholder="Paste direct URL (e.g. https://... or /games/...) or <iframe src='...'></iframe>"
              rows={2}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              required
            />
            <p className="mt-1 text-[11px] text-slate-500">
              Paste the embeddable game URL or an &lt;iframe&gt; HTML snippet.
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Brief Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What makes this game exciting?"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Controls */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Controls (comma-separated)
            </label>
            <input
              type="text"
              value={controls}
              onChange={(e) => setControls(e.target.value)}
              placeholder="Arrow Keys - Steer, Space - Jump"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Footer Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Add to games.json</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
