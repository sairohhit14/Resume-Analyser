import React from 'react';
import { motion } from 'framer-motion';

export const HeroSection = ({ onStart }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
      {/* Background radial effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 left-1/3 w-[300px] h-[300px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center space-y-6 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
            <span>✨ Powered by Gemini 2.5 Flash</span>
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-slate-800 dark:text-white"
        >
          AI Resume Analyzer & <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            ATS Optimizer
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          Upload your resume and receive an AI-powered ATS score, recruiter feedback, missing skills analysis, strengths, weaknesses, and personalized improvement suggestions within seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="pt-6"
        >
          <button
            onClick={onStart}
            className="gradient-btn px-8 py-4 rounded-2xl text-sm font-bold tracking-wide"
          >
            Analyze Resume
          </button>
        </motion.div>
      </div>
    </section>
  );
};
