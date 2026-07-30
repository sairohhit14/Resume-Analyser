import React from 'react';
import { motion } from 'framer-motion';
import {
  MdCheckCircle,
  MdCancel,
  MdInfoOutline,
  MdDownload,
  MdCode,
  MdPrint,
  MdSchool,
  MdWorkOutline,
  MdAssignment,
  MdAutoAwesome,
  MdSpellcheck,
  MdViewQuilt
} from 'react-icons/md';

/**
 * SummaryCard: Displays AI generated resume summary
 */
export const SummaryCard = ({ summary }) => (
  <div className="glass-card p-6">
    <h3 className="text-base font-extrabold mb-3 flex items-center space-x-2 text-slate-800 dark:text-white">
      <MdInfoOutline className="text-primary text-xl" />
      <span>Resume Summary</span>
    </h3>
    <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
      {summary}
    </p>
  </div>
);

/**
 * StrengthCard: Displays bulleted strengths
 */
export const StrengthCard = ({ strengths }) => (
  <div className="glass-card p-6 border-l-4 border-l-emerald-500">
    <h3 className="text-base font-extrabold mb-4 flex items-center space-x-2 text-slate-800 dark:text-white">
      <MdCheckCircle className="text-emerald-500 text-xl" />
      <span>Strengths</span>
    </h3>
    <ul className="space-y-2.5">
      {strengths.map((strength, idx) => (
        <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-650 dark:text-slate-300">
          <span className="text-emerald-500 font-bold mt-0.5">✔</span>
          <span className="leading-normal">{strength}</span>
        </li>
      ))}
    </ul>
  </div>
);

/**
 * WeaknessCard: Displays bulleted weaknesses
 */
export const WeaknessCard = ({ weaknesses }) => (
  <div className="glass-card p-6 border-l-4 border-l-red-500">
    <h3 className="text-base font-extrabold mb-4 flex items-center space-x-2 text-slate-800 dark:text-white">
      <MdCancel className="text-red-500 text-xl" />
      <span>Weaknesses / Gaps</span>
    </h3>
    <ul className="space-y-2.5">
      {weaknesses.map((weakness, idx) => (
        <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-650 dark:text-slate-300">
          <span className="text-red-500 font-bold mt-0.5">✖</span>
          <span className="leading-normal">{weakness}</span>
        </li>
      ))}
    </ul>
  </div>
);

/**
 * SkillBadge: Chip list of skills (technical, soft, or missing)
 */
export const SkillBadgeList = ({ title, skills, type = 'tech' }) => {
  const getColors = () => {
    switch (type) {
      case 'missing':
        return 'bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-500/10';
      case 'soft':
        return 'bg-accent/10 dark:bg-accent/5 text-[#9A7B3E] dark:text-[#E8C488] border border-accent/20';
      default: // tech
        return 'bg-primary/10 dark:bg-primary/5 text-[#B39343] dark:text-primary border border-primary/20';
    }
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-sm font-extrabold mb-4 text-slate-800 dark:text-white uppercase tracking-wider">
        {title} ({skills.length})
      </h3>
      {skills.length === 0 ? (
        <p className="text-xs text-slate-500 dark:text-slate-400 italic">None detected.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${getColors()}`}
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * SectionProgress: Vertical/Horizontal progress indicators for section scores
 */
export const SectionProgressList = ({ scores }) => {
  const sections = [
    { label: 'Summary', score: scores.summary || 0, icon: <MdInfoOutline /> },
    { label: 'Skills', score: scores.skills || 0, icon: <MdCode /> },
    { label: 'Projects', score: scores.projects || 0, icon: <MdAssignment /> },
    { label: 'Experience', score: scores.experience || 0, icon: <MdWorkOutline /> },
    { label: 'Education', score: scores.education || 0, icon: <MdSchool /> },
    { label: 'Formatting', score: scores.formatting || 0, icon: <MdViewQuilt /> },
  ];

  const getProgressColor = (score) => {
    if (score >= 90) return 'bg-emerald-500';
    if (score >= 70) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="text-base font-extrabold mb-4 text-slate-800 dark:text-white">
        Section Scores breakdown
      </h3>
      <div className="space-y-4">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="flex items-center space-x-2 text-slate-600 dark:text-slate-350">
                {section.icon}
                <span>{section.label}</span>
              </span>
              <span className="text-slate-800 dark:text-white">{section.score}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${section.score}%` }}
                transition={{ duration: 1, delay: idx * 0.1 }}
                className={`h-full rounded-full ${getProgressColor(section.score)}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * RecruiterFeedback: Realistic hiring manager quote block
 */
export const RecruiterFeedback = ({ feedback }) => (
  <div className="glass-card p-6 bg-gradient-to-br from-primary/5 to-accent/5 relative overflow-hidden">
    <div className="absolute top-0 right-0 text-7xl font-serif text-slate-200 dark:text-slate-800/40 select-none translate-x-3 -translate-y-4">
      “
    </div>
    <h3 className="text-base font-extrabold mb-3 flex items-center space-x-2 text-slate-800 dark:text-white">
      <MdAutoAwesome className="text-accent text-xl" />
      <span>Recruiter Feedback</span>
    </h3>
    <p className="text-xs text-slate-655 dark:text-slate-300 italic leading-relaxed relative z-10">
      "{feedback}"
    </p>
  </div>
);

/**
 * Recommendations: List checklist of tasks to fix
 */
export const RecommendationsList = ({ recommendations }) => (
  <div className="glass-card p-6">
    <h3 className="text-base font-extrabold mb-4 flex items-center space-x-2 text-slate-800 dark:text-white">
      <MdAutoAwesome className="text-primary text-xl" />
      <span>AI Recommendations & Improvements</span>
    </h3>
    <div className="space-y-3">
      {recommendations.map((recommendation, idx) => (
        <div key={idx} className="flex items-start space-x-3 text-xs">
          <span className="w-5 h-5 rounded-full bg-primary/10 dark:bg-primary/5 text-primary flex items-center justify-center font-bold flex-shrink-0 text-[10px]">
            {idx + 1}
          </span>
          <p className="text-slate-655 dark:text-slate-300 leading-normal pt-0.5">
            {recommendation}
          </p>
        </div>
      ))}
    </div>
  </div>
);

/**
 * ExportButtons: Download and Print buttons
 */
export const ExportButtons = ({ onDownloadPDF, onDownloadJSON, onPrint }) => (
  <div className="flex flex-wrap gap-3 items-center justify-end">
    <button
      onClick={onDownloadPDF}
      className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-white transition"
    >
      <MdDownload className="text-base text-slate-500" />
      <span>Download PDF Report</span>
    </button>
    
    <button
      onClick={onDownloadJSON}
      className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-white transition"
    >
      <MdCode className="text-base text-slate-500" />
      <span>Download JSON</span>
    </button>

    <button
      onClick={onPrint}
      className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-primary text-slate-950 hover:bg-accent text-xs font-bold transition shadow-md shadow-primary/10 cursor-pointer"
    >
      <MdPrint className="text-base" />
      <span>Print Report</span>
    </button>
  </div>
);
