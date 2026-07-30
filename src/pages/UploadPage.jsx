import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ResumeUploader } from '../components/ResumeUploader';
import { parsePDF, parseDOCX } from '../services/parser';
import { MdVpnKey, MdPlayArrow, MdArrowBack, MdWarning } from 'react-icons/md';

export const UploadPage = ({
  apiKey,
  setApiKey,
  file,
  setFile,
  parsedText,
  setParsedText,
  onBack,
  onAnalyze
}) => {
  const [parsing, setParsing] = useState(false);
  const [error, setError] = useState('');
  const [keyInput, setKeyInput] = useState(apiKey);

  const handleParseFile = async (selectedFile) => {
    setParsing(true);
    setError('');
    setParsedText('');

    try {
      const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
      let text = '';
      if (fileExtension === 'pdf') {
        text = await parsePDF(selectedFile);
      } else if (fileExtension === 'docx') {
        text = await parseDOCX(selectedFile);
      } else {
        throw new Error('Unsupported file extension. Please upload a .pdf or .docx resume.');
      }

      if (!text || text.trim().length === 0) {
        throw new Error('Resume file seems to contain no readable text. Scanned images are not supported.');
      }

      setParsedText(text);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error extracting text from file.');
      setFile(null);
    } finally {
      setParsing(false);
    }
  };

  const handleSaveKeyInline = (e) => {
    e.preventDefault();
    if (keyInput.trim()) {
      setApiKey(keyInput.trim());
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Back navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition"
        >
          <MdArrowBack className="text-base" />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white">
          Upload your Resume
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Upload your resume in PDF or DOCX format. We will extract the text completely on your browser for processing.
        </p>
      </div>

      {/* Main Upload Card */}
      <div className="space-y-6">
        <ResumeUploader
          file={file}
          setFile={setFile}
          parsing={parsing}
          parsedText={parsedText}
          onParseComplete={handleParseFile}
          onError={setError}
        />

        {error && (
          <div className="p-4 bg-red-100 dark:bg-red-500/10 border border-red-500/20 text-red-650 dark:text-red-400 rounded-2xl flex items-center space-x-3 text-xs max-w-2xl mx-auto">
            <MdWarning className="text-xl flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Dynamic API Key Required Card if not configured */}
        {!apiKey && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto p-6 glass-card border border-amber-500/20 bg-amber-500/5 space-y-4"
          >
            <div className="flex items-start space-x-3">
              <div className="p-2.5 bg-amber-500/10 text-amber-500 rounded-xl flex-shrink-0">
                <MdVpnKey className="text-xl" />
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="text-sm font-bold text-slate-800 dark:text-white">
                  Gemini API Key Required
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  To perform the AI analysis, please configure your Gemini API Key. You can get a free key from Google AI Studio.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveKeyInline} className="flex gap-3 pt-2">
              <input
                type="password"
                placeholder="Paste API Key here..."
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-205 dark:border-slate-800 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-white"
                required
              />
              <button
                type="submit"
                className="gradient-btn px-6 py-2.5 rounded-xl text-xs font-bold shrink-0"
              >
                Save Key
              </button>
            </form>
          </motion.div>
        )}

        {/* Trigger Analysis Button */}
        {file && parsedText && !parsing && apiKey && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center pt-4"
          >
            <button
              onClick={onAnalyze}
              className="gradient-btn px-10 py-4 rounded-2xl font-bold flex items-center space-x-2 text-sm shadow-xl shadow-primary/20 hover:shadow-primary/30 animate-pulse"
            >
              <MdPlayArrow className="text-xl" />
              <span>Start AI Analysis</span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
export default UploadPage;
