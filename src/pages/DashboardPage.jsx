import React from 'react';
import { motion } from 'framer-motion';
import {
  MdArrowBack,
  MdOutlineMail,
  MdPhone,
  MdPerson,
  MdAutoAwesome
} from 'react-icons/md';
import {
  ResumeRadarChart,
  SectionBarChartComp,
  StrengthsWeaknessesPie,
  SkillsDistributionChart,
  ATSGaugeChart
} from '../charts/AnalyticsCharts';
import {
  SummaryCard,
  StrengthCard,
  WeaknessCard,
  SkillBadgeList,
  SectionProgressList,
  RecruiterFeedback,
  RecommendationsList,
  ExportButtons
} from '../components/DashboardComponents';
import { ReviewFeedbackSection } from '../components/ReviewFeedbackSection';
import html2pdf from 'html2pdf.js';

export const DashboardPage = ({ data, onReset }) => {
  if (!data) return null;

  // Handle PDF Export using html2pdf
  const handleDownloadPDF = () => {
    const element = document.getElementById('dashboard-report-content');
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5], // Top, Left, Bottom, Right margin
      filename: `${(data.candidateName || 'Candidate').replace(/\s+/g, '_')}_ATS_Resume_Analysis.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Add printing classes or styles temporary if needed
    html2pdf().set(opt).from(element).save();
  };

  // Handle JSON Export
  const handleDownloadJSON = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `${(data.candidateName || 'Candidate').replace(/\s+/g, '_')}_Resume_Analysis_Report.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Handle Print Action
  const handlePrint = () => {
    window.print();
  };

  // Calculations for charts
  const strengthsCount = data.strengths?.length || 0;
  const weaknessesCount = data.weaknesses?.length || 0;
  const technicalCount = data.technicalSkills?.length || 0;
  const softCount = data.softSkills?.length || 0;

  // Color badge depending on ATS Score
  const getATSBadgeColor = (score) => {
    if (score >= 90) return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20';
    if (score >= 70) return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20';
    return 'bg-red-500/10 text-red-655 dark:text-red-400 border border-red-500/20';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fade-in print:p-0 print:m-0">
      {/* Dashboard Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/50 dark:border-slate-800/50 pb-6 print:hidden">
        <button
          onClick={onReset}
          className="flex items-center space-x-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-all duration-200"
        >
          <MdArrowBack className="text-base" />
          <span>Analyze Another Resume</span>
        </button>

        <ExportButtons
          onDownloadPDF={handleDownloadPDF}
          onDownloadJSON={handleDownloadJSON}
          onPrint={handlePrint}
        />
      </div>

      {/* Main Print Content Wrapper */}
      <div id="dashboard-report-content" className="space-y-8 print:p-4 print:space-y-6">
        
        {/* Header Block */}
        <div className="glass-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-bold text-xl flex-shrink-0">
                <MdPerson className="text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white">
                  {data.candidateName || 'Candidate Profile'}
                </h1>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-slate-550 dark:text-slate-400">
                  {data.email && (
                    <span className="flex items-center space-x-1">
                      <MdOutlineMail className="text-sm" />
                      <span>{data.email}</span>
                    </span>
                  )}
                  {data.phone && (
                    <span className="flex items-center space-x-1">
                      <MdPhone className="text-sm" />
                      <span>{data.phone}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 self-start md:self-auto">
            <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl ${getATSBadgeColor(data.overallATS)}`}>
              ATS Rating
            </span>
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xl border border-slate-700">
              {data.overallATS}
            </div>
          </div>
        </div>

        {/* Column Group 1: Gauge, Recruiter Feedback, Radar Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="glass-card p-6 flex flex-col justify-center items-center">
            <ATSGaugeChart score={data.overallATS} />
          </div>

          <div className="lg:col-span-2 flex flex-col justify-between">
            <RecruiterFeedback feedback={data.recruiterFeedback} />
            <div className="mt-4">
              <SummaryCard summary={data.summary} />
            </div>
          </div>
        </div>

        {/* Column Group 2: Section Breakdown and Bar Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SectionProgressList scores={data.resumeSectionsScore} />
          
          <div className="glass-card p-6">
            <h3 className="text-sm font-extrabold mb-4 text-slate-800 dark:text-white uppercase tracking-wider">
              Section Performance Analytics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ResumeRadarChart scores={data.resumeSectionsScore} />
              <SectionBarChartComp scores={data.resumeSectionsScore} />
            </div>
          </div>
        </div>

        {/* Column Group 3: Strengths and Weaknesses */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <StrengthCard strengths={data.strengths} />
            <WeaknessCard weaknesses={data.weaknesses} />
          </div>
          
          <div className="glass-card p-6 flex flex-col justify-center items-center">
            <h3 className="text-sm font-extrabold mb-2 text-slate-800 dark:text-white uppercase tracking-wider self-start">
              Strengths vs Weaknesses
            </h3>
            <StrengthsWeaknessesPie
              strengthsCount={strengthsCount}
              weaknessesCount={weaknessesCount}
            />
          </div>
        </div>

        {/* Column Group 4: Skills and Missing Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <SkillBadgeList title="Technical Skills Detected" skills={data.technicalSkills} type="tech" />
            <SkillBadgeList title="Soft Skills Detected" skills={data.softSkills} type="soft" />
            <SkillBadgeList title="Missing Keywords / Industry Skills" skills={data.missingSkills} type="missing" />
          </div>

          <div className="glass-card p-6 flex flex-col justify-center items-center">
            <h3 className="text-sm font-extrabold mb-2 text-slate-800 dark:text-white uppercase tracking-wider self-start">
              Detected Skills Comparison
            </h3>
            <SkillsDistributionChart
              technicalCount={technicalCount}
              softCount={softCount}
            />
          </div>
        </div>

        {/* Accordions (Grammar, Formatting, Keywords, Section critque) */}
        <ReviewFeedbackSection
          grammarIssues={data.grammarIssues}
          formattingIssues={data.formattingIssues}
          keywordOptimization={data.keywordOptimization}
          projectsFeedback={data.projectsFeedback}
          educationFeedback={data.educationFeedback}
          experienceFeedback={data.experienceFeedback}
        />

        {/* Column Group 5: Actionable AI Recommendations */}
        <RecommendationsList recommendations={data.recommendations} />

      </div>
    </div>
  );
};
export default DashboardPage;
