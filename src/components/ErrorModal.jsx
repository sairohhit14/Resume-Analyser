import React from 'react';
import { MdErrorOutline, MdClose } from 'react-icons/md';

export const ErrorModal = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div className="max-w-md w-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl relative animate-float-short">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          aria-label="Close error modal"
        >
          <MdClose className="text-xl" />
        </button>

        <div className="flex items-start space-x-4">
          <div className="p-3 bg-red-100 dark:bg-red-500/10 text-red-500 rounded-xl flex-shrink-0">
            <MdErrorOutline className="text-2xl" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
              Analysis Failed
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed break-words">
              {message}
            </p>
            <div className="mt-5 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-bold rounded-xl transition"
              >
                Acknowledge
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
