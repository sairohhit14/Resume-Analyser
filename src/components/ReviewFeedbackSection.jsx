import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MdOutlineSpellcheck,
  MdOutlineFormatPaint,
  MdOutlineVpnKey,
  MdFolderOpen,
  MdSchool,
  MdWorkOutline,
  MdKeyboardArrowDown
} from 'react-icons/md';

/**
 * An Accordion component for rendering feedback topics.
 */
const FeedbackAccordion = ({ icon, title, count, children, isOpenDefault = false }) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  return (
    <div className="glass-card overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition duration-250 cursor-pointer"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-655 dark:text-slate-300 rounded-lg flex-shrink-0">
            {icon}
          </div>
          <div>
            <span>{title}</span>
            {count !== undefined && (
              <span className={`ml-2 text-xs px-2 py-0.5 rounded-full font-bold ${
                count > 0 
                  ? 'bg-amber-100 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400' 
                  : 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400'
              }`}>
                {count} {count === 1 ? 'issue' : 'issues'}
              </span>
            )}
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <MdKeyboardArrowDown className="text-xl text-slate-400" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 space-y-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ReviewFeedbackSection = ({
  grammarIssues = [],
  formattingIssues = [],
  keywordOptimization = [],
  projectsFeedback = [],
  educationFeedback = '',
  experienceFeedback = ''
}) => {
  return (
    <div className="space-y-6">
      <div className="text-left">
        <h2 className="text-xl font-extrabold text-slate-800 dark:text-white">
          Detailed Grammar, Keywords & Section Critique
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Click on any category below to expand the detailed AI feedback.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* Grammar Issues Accordion */}
          <FeedbackAccordion
            icon={<MdOutlineSpellcheck className="text-amber-500 text-lg" />}
            title="Grammar & Editing Issues"
            count={grammarIssues.length}
            isOpenDefault={grammarIssues.length > 0}
          >
            {grammarIssues.length === 0 ? (
              <p className="text-xs text-emerald-600 dark:text-emerald-450 font-medium">
                ✔ Great job! No grammatical errors or passive voice issues detected.
              </p>
            ) : (
              <ul className="list-disc pl-5 text-xs text-slate-600 dark:text-slate-350 space-y-1.5">
                {grammarIssues.map((issue, idx) => (
                  <li key={idx}>{issue}</li>
                ))}
              </ul>
            )}
          </FeedbackAccordion>

          {/* Formatting Issues Accordion */}
          <FeedbackAccordion
            icon={<MdOutlineFormatPaint className="text-primary text-lg" />}
            title="Formatting & Structural Fixes"
            count={formattingIssues.length}
            isOpenDefault={formattingIssues.length > 0}
          >
            {formattingIssues.length === 0 ? (
              <p className="text-xs text-emerald-600 dark:text-emerald-455 font-medium">
                ✔ Standard formatting guidelines followed correctly.
              </p>
            ) : (
              <ul className="list-disc pl-5 text-xs text-slate-600 dark:text-slate-350 space-y-1.5">
                {formattingIssues.map((issue, idx) => (
                  <li key={idx}>{issue}</li>
                ))}
              </ul>
            )}
          </FeedbackAccordion>

          {/* Keyword Optimization Accordion */}
          <FeedbackAccordion
            icon={<MdOutlineVpnKey className="text-accent text-lg" />}
            title="Keyword Optimization"
            isOpenDefault={true}
          >
            <p className="text-[11px] text-slate-550 dark:text-slate-400 leading-relaxed mb-3">
              Add these industry-standard, high-impact action verbs and SEO keywords to bypass ATS filters:
            </p>
            <div className="flex flex-wrap gap-2">
              {keywordOptimization.map((keyword, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2.5 py-1 bg-primary/10 text-primary dark:bg-primary/5 dark:text-primary rounded-lg font-bold border border-primary/10"
                >
                  {keyword}
                </span>
              ))}
              {keywordOptimization.length === 0 && (
                <span className="text-xs text-slate-500 dark:text-slate-400 italic">None recommended.</span>
              )}
            </div>
          </FeedbackAccordion>
        </div>

        <div className="space-y-4">
          {/* Projects Feedback */}
          <FeedbackAccordion
            icon={<MdFolderOpen className="text-accent text-lg" />}
            title="Projects Feedback"
            isOpenDefault={true}
          >
            {projectsFeedback.length === 0 ? (
              <p className="text-xs text-slate-500 dark:text-slate-400 italic">No feedback provided.</p>
            ) : (
              <ul className="list-disc pl-5 text-xs text-slate-600 dark:text-slate-350 space-y-1.5">
                {projectsFeedback.map((fb, idx) => (
                  <li key={idx}>{fb}</li>
                ))}
              </ul>
            )}
          </FeedbackAccordion>

          {/* Experience Feedback */}
          <FeedbackAccordion
            icon={<MdWorkOutline className="text-emerald-500 text-lg" />}
            title="Work Experience Feedback"
            isOpenDefault={true}
          >
            <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
              {experienceFeedback || 'No professional experience feedback generated.'}
            </p>
          </FeedbackAccordion>

          {/* Education Feedback */}
          <FeedbackAccordion
            icon={<MdSchool className="text-orange-550 text-lg" />}
            title="Education Feedback"
            isOpenDefault={false}
          >
            <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
              {educationFeedback || 'No education section feedback generated.'}
            </p>
          </FeedbackAccordion>
        </div>
      </div>
    </div>
  );
};
