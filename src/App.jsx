import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { UploadPage } from './pages/UploadPage';
import { DashboardPage } from './pages/DashboardPage';
import { LoadingScreen } from './components/LoadingScreen';
import { ErrorModal } from './components/ErrorModal';
import { useTheme } from './hooks/useTheme';
import { analyzeResume } from './services/gemini';

function App() {
  const { theme, toggleTheme } = useTheme();
  
  // App routing state
  const [view, setView] = useState('landing'); // landing | upload | dashboard
  
  // In-memory security keys
  const [apiKey, setApiKey] = useState('');
  
  // File parsing states
  const [file, setFile] = useState(null);
  const [parsedText, setParsedText] = useState('');
  
  // Analysis results states
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  // Start analysis trigger
  const handleStartAnalysis = async () => {
    if (!apiKey) {
      setErrorMessage('Gemini API Key is not set. Please set it before proceeding.');
      setIsErrorModalOpen(true);
      return;
    }
    if (!parsedText) {
      setErrorMessage('No resume text detected. Please upload and parse your resume first.');
      setIsErrorModalOpen(true);
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const data = await analyzeResume(apiKey, parsedText);
      
      // Basic schema validations
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid JSON format returned from AI model.');
      }
      
      setAnalysisData(data);
      setView('dashboard');
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'An error occurred during resume analysis.');
      setIsErrorModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setParsedText('');
    setAnalysisData(null);
    setView('upload');
  };

  return (
    <div className="min-h-screen flex flex-col gradient-bg text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        apiKey={apiKey}
        setApiKey={setApiKey}
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'landing' && (
          <LandingPage onStart={() => setView('upload')} />
        )}
        
        {view === 'upload' && (
          <UploadPage
            apiKey={apiKey}
            setApiKey={setApiKey}
            file={file}
            setFile={setFile}
            parsedText={parsedText}
            setParsedText={setParsedText}
            onBack={() => setView('landing')}
            onAnalyze={handleStartAnalysis}
          />
        )}

        {view === 'dashboard' && (
          <DashboardPage
            data={analysisData}
            onReset={handleReset}
          />
        )}
      </main>

      <Footer />

      {/* Loading Overlay */}
      {loading && <LoadingScreen />}

      {/* Global Error Modal */}
      <ErrorModal
        isOpen={isErrorModalOpen}
        message={errorMessage}
        onClose={() => setIsErrorModalOpen(false)}
      />
    </div>
  );
}

export default App;
