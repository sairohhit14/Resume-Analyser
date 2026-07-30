import React, { useState } from 'react';
import { MdOutlineDarkMode, MdOutlineLightMode, MdVpnKey, MdCheckCircle, MdCancel } from 'react-icons/md';

export const Navbar = ({ theme, toggleTheme, apiKey, setApiKey }) => {
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);

  const handleSaveKey = (e) => {
    e.preventDefault();
    setApiKey(tempKey.trim());
    setShowKeyInput(false);
  };

  const handleClearKey = () => {
    setApiKey('');
    setTempKey('');
    setShowKeyInput(false);
  };

  return (
    <nav className="glass-nav px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-extrabold text-xl shadow-md">
          AR
        </div>
        <div>
          <span className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            AI Resume Analyzer
          </span>
          <span className="hidden sm:inline-block ml-2 text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full font-semibold">
            v1.0.0
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* API Key Manager */}
        <div className="relative">
          <button
            onClick={() => setShowKeyInput(!showKeyInput)}
            className={`flex items-center space-x-2 text-xs font-semibold px-3.5 py-2 rounded-xl transition-all duration-300 ${
              apiKey
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
            }`}
          >
            <MdVpnKey className="text-sm" />
            <span className="hidden md:inline">
              {apiKey ? 'API Key Configured' : 'Set Gemini API Key'}
            </span>
            <span className="md:hidden">
              {apiKey ? 'Key Set' : 'Set Key'}
            </span>
          </button>

          {showKeyInput && (
            <div className="absolute right-0 mt-3 w-80 p-5 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 shadow-2xl z-50 animate-float-short">
              <h3 className="text-sm font-bold mb-3 text-slate-800 dark:text-white flex items-center space-x-2">
                <MdVpnKey className="text-primary text-base" />
                <span>Configure Gemini API Key</span>
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                The key is saved solely in-memory inside the browser and is never uploaded anywhere except to Google's Gemini servers directly.
              </p>
              <form onSubmit={handleSaveKey} className="space-y-3">
                <input
                  type="password"
                  placeholder="Paste your AIzaSy... API Key"
                  value={tempKey}
                  onChange={(e) => setTempKey(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-white"
                  required
                />
                <div className="flex space-x-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 text-xs py-2 bg-primary hover:bg-accent text-slate-950 rounded-lg font-bold transition cursor-pointer"
                  >
                    Save Key
                  </button>
                  {apiKey && (
                    <button
                      type="button"
                      onClick={handleClearKey}
                      className="text-xs px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg font-semibold transition"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowKeyInput(false)}
                    className="text-xs px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-400 rounded-lg transition"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all duration-300"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <MdOutlineLightMode className="text-lg" />
          ) : (
            <MdOutlineDarkMode className="text-lg" />
          )}
        </button>
      </div>
    </nav>
  );
};
