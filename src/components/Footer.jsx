import React from 'react';

export const Footer = () => {
  return (
    <footer className="w-full py-6 mt-16 border-t border-slate-200/50 dark:border-slate-800/50 text-center text-slate-500 dark:text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          &copy; {new Date().getFullYear()} AI Resume Analyzer. Built entirely on the client side.
        </div>
        <div className="flex space-x-4">
          <span className="hover:text-primary transition cursor-pointer">Privacy Policy</span>
          <span className="hover:text-primary transition cursor-pointer">Terms of Service</span>
          <span className="hover:text-primary transition cursor-pointer">Contact Support</span>
        </div>
      </div>
    </footer>
  );
};
