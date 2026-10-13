import React, { useState } from 'react';
import { X, ShieldAlert, Check, ExternalLink } from 'lucide-react';

export const PanicModal = ({
  panicKey,
  setPanicKey,
  panicUrl,
  setPanicUrl,
  onClose,
}) => {
  const [keyInput, setKeyInput] = useState(panicKey);
  const [urlInput, setUrlInput] = useState(panicUrl);
  const [isListeningForKey, setIsListeningForKey] = useState(false);

  const handleSave = () => {
    setPanicKey(keyInput || ']');
    setPanicUrl(urlInput || 'https://classroom.google.com');
    onClose();
  };

  const handleKeyDownCapture = (e) => {
    if (isListeningForKey) {
      e.preventDefault();
      e.stopPropagation();
      setKeyInput(e.key);
      setIsListeningForKey(false);
    }
  };

  const handleTestPanic = () => {
    window.location.href = urlInput;
  };

  return (
    <div
      onKeyDown={handleKeyDownCapture}
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150"
    >
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <h2 className="text-base font-extrabold text-white">Emergency Panic Button</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-400 leading-relaxed">
            Pressing the panic trigger key at any time immediately leaves the game portal and navigates to your chosen cover website.
          </p>

          {/* Key selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Panic Hotkey
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsListeningForKey(true)}
                className={`flex-1 py-2.5 px-4 rounded-xl border text-center font-mono font-bold text-sm transition-all ${
                  isListeningForKey
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200'
                }`}
              >
                {isListeningForKey ? 'Press any keyboard key now...' : `Key: [ ${keyInput} ]`}
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Click the box and press a key to rebind. Default is <code className="text-slate-400">]</code>.
            </p>
          </div>

          {/* Safe Redirect URL */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Safe Destination URL
            </label>
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://classroom.google.com"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 focus:outline-none focus:border-rose-500"
            />
          </div>

          {/* Quick preset links */}
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[11px] text-slate-500 self-center mr-1">Presets:</span>
            {[
              { label: 'Google Classroom', url: 'https://classroom.google.com' },
              { label: 'Google Docs', url: 'https://docs.google.com' },
              { label: 'Wikipedia', url: 'https://en.wikipedia.org' },
            ].map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => setUrlInput(preset.url)}
                className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Footer action buttons */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={handleTestPanic}
              className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300"
              title="Test redirect now"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Test Redirect</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/30"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Keybind</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
