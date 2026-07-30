import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  'Reading Resume...',
  'Extracting Information...',
  'Understanding Skills...',
  'Analyzing ATS Compatibility...',
  'Finding Missing Skills...',
  'Generating Recommendations...',
  'Preparing Dashboard...'
];

export const LoadingScreen = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md flex flex-col justify-center items-center z-50 px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Animated icon / logo */}
        <div className="relative w-24 h-24 mx-auto">
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary to-accent opacity-20"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-slate-950 font-black text-3xl shadow-xl shadow-primary/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          >
            AR
          </motion.div>
        </div>

        {/* Text descriptions */}
        <div className="h-10 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h2
              key={messages[currentIdx]}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-lg font-bold text-slate-100 uppercase tracking-wider"
            >
              {messages[currentIdx]}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* Progress bar container */}
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden p-0.5 border border-slate-700">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 14, ease: 'linear', repeat: Infinity }}
          />
        </div>

        <p className="text-slate-400 text-xs">
          This may take a few seconds while AI conducts the full review.
        </p>
      </div>
    </div>
  );
};
