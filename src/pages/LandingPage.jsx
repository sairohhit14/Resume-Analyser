import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { FeatureCards } from '../components/FeatureCards';

export const LandingPage = ({ onStart }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <HeroSection onStart={onStart} />
      <div className="border-t border-slate-200/30 dark:border-slate-800/30 my-8" />
      <FeatureCards />
    </div>
  );
};
export default LandingPage;
