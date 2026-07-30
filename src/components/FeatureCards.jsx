import React from 'react';
import { motion } from 'framer-motion';
import {
  MdOutlineScore,
  MdOutlineDescription,
  MdCompareArrows,
  MdDoneAll,
  MdReportGmailerrorred,
  MdOutlineSupervisedUserCircle,
  MdOutlineAutoAwesome,
  MdOutlineDashboardCustomize
} from 'react-icons/md';

const features = [
  {
    icon: <MdOutlineScore className="text-2xl" />,
    title: 'ATS Score',
    description: 'Instantly compute your resume alignment with standard Applicant Tracking Systems.'
  },
  {
    icon: <MdOutlineDescription className="text-2xl" />,
    title: 'Resume Summary',
    description: 'Get an AI-distilled professional summary of your core qualifications and trajectory.'
  },
  {
    icon: <MdCompareArrows className="text-2xl" />,
    title: 'Missing Skills Analysis',
    description: 'Identify critical technical and soft skills that are missing based on industry roles.'
  },
  {
    icon: <MdDoneAll className="text-2xl" />,
    title: 'Strength Analysis',
    description: 'Highlight strong formatting, quantifiable accomplishments, and key keywords.'
  },
  {
    icon: <MdReportGmailerrorred className="text-2xl" />,
    title: 'Weakness Detection',
    description: 'Uncover spelling issues, passive voice, weak action words, and structural concerns.'
  },
  {
    icon: <MdOutlineSupervisedUserCircle className="text-2xl" />,
    title: 'Recruiter Feedback',
    description: 'Receive realistic feedback written in the perspective of a seasoned hiring manager.'
  },
  {
    icon: <MdOutlineAutoAwesome className="text-2xl" />,
    title: 'AI Recommendations',
    description: 'Follow actionable, prioritized steps to maximize your callback and interview rates.'
  },
  {
    icon: <MdOutlineDashboardCustomize className="text-2xl" />,
    title: 'Section-wise Scoring',
    description: 'Break down your score across Summary, Skills, Projects, Experience, and Education.'
  }
];

export const FeatureCards = () => {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12 space-y-3">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white">
          Comprehensive Analysis Tools
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Get complete insights into your resume performance across multiple metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className="glass-card p-6 border border-slate-200/50 dark:border-slate-800/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-start text-left"
          >
            <div className="p-3 bg-primary/10 dark:bg-primary/5 text-primary rounded-xl mb-4">
              {feature.icon}
            </div>
            <h3 className="font-bold text-base text-slate-800 dark:text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
