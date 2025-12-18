
import React, { useState } from 'react';
import { UserInput, EvaResponse } from './types';
import { generateAppPlan } from './services/geminiService';
import TutorialModal from './components/TutorialModal';
import InputForm from './components/InputForm';
import NameEntry from './components/NameEntry';
import ResultDisplay from './components/ResultDisplay';
import Footer from './components/Footer';
import { HelpCircle, RefreshCcw, Moon, Sun, ArrowLeft, Sparkles, Pencil, Cpu, Gift } from 'lucide-react';

const App: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [isNameSubmitted, setIsNameSubmitted] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EvaResponse | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleNameSubmit = (name: string) => {
    setUserName(name);
    setIsNameSubmitted(true);
    setShowTutorial(true); 
  };

  const handleFormSubmit = async (input: UserInput) => {
    setIsLoading(true);
    const response = await generateAppPlan(input, userName);
    setResult(response);
    setIsLoading(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getBackgroundClass = () => {
      // Pastel Rainbow Gradient
      return "bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-slate-900 dark:via-purple-950 dark:to-slate-900";
  };

  const ProcessStep = ({ icon, text, step, active }: { icon: React.ReactNode, text: string, step: number, active: boolean }) => (
    <div className={`flex flex-col items-center relative z-10 ${active ? 'opacity-100 scale-105' : 'opacity-60 grayscale'}`}>
        <div className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg mb-2 transition-all duration-300
            ${active ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 ring-4 ring-purple-100 dark:ring-purple-900' : 'bg-gray-200 dark:bg-slate-800 text-gray-500'}`}>
            {icon}
        </div>
        <span className="text-xs md:text-sm font-bold text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-black/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
            {step}. {text}
        </span>
    </div>
  );

  return (
    <div className={`${darkMode ? 'dark' : ''} w-full`}>
      <div className={`min-h-screen w-full transition-colors duration-500 ${getBackgroundClass()} text-gray-800 dark:text-gray-100 font-sans selection:bg-purple-200 dark:selection:bg-purple-500`}>
        
        {/* Top Navigation */}
        <div className="fixed top-4 right-4 z-40 flex gap-2 md:gap-3">
          <button 
            onClick={toggleDarkMode}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur text-yellow-500 dark:text-yellow-400 px-3 py-2 rounded-full shadow-lg hover:scale-110 transition-all border border-white/50"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {isNameSubmitted && (
             <button 
                onClick={() => setShowTutorial(true)}
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur text-indigo-600 dark:text-indigo-300 px-4 py-2 rounded-full shadow-lg text-sm font-bold flex items-center gap-2 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-all border border-white/50"
            >
                <HelpCircle size={18} /> <span className="hidden md:inline">사용법</span>
            </button>
          )}
          
          {result && (
              <button 
              onClick={handleReset}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur text-pink-600 dark:text-pink-300 px-4 py-2 rounded-full shadow-lg text-sm font-bold flex items-center gap-2 hover:bg-pink-50 dark:hover:bg-slate-700 transition-all border border-white/50"
              >
              <RefreshCcw size={18} /> <span className="hidden md:inline">처음으로</span>
              </button>
          )}
        </div>

        {/* 1. Name Entry */}
        {!isNameSubmitted && (
           <NameEntry onNameSubmit={handleNameSubmit} />
        )}

        {/* 2. Main App */}
        {isNameSubmitted && (
          <>
            {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} userName={userName} />}

            <div className="container mx-auto px-4 py-12 md:py-16 flex flex-col items-center animate-fade-in relative">
              
              <header className="text-center mb-10 w-full max-w-4xl">
                {!result && (
                  <button 
                    onClick={() => setIsNameSubmitted(false)}
                    className="absolute top-4 left-4 md:static md:mb-6 text-gray-500 hover:text-purple-600 dark:hover:text-purple-300 flex items-center gap-2 text-sm font-bold transition-colors"
                  >
                    <ArrowLeft size={16} /> <span className="hidden md:inline">이름 다시 입력</span>
                  </button>
                )}

                <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-sm font-extrabold mb-4 shadow-sm border border-white/40 backdrop-blur-md bg-white/40 dark:bg-white/5 text-purple-700 dark:text-purple-300 animate-pulse">
                   <Sparkles size={14} /> Eva App Builder
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white brand-font mb-4 tracking-tight drop-shadow-sm leading-tight">
                  <span className="block text-2xl md:text-3xl text-gray-500 dark:text-gray-400 font-sans mb-2 font-normal">데미안님의 상상이 현실이 되는 곳,</span>
                  Eva <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400">Creative Studio</span>
                </h1>
                
                {/* Process Guide */}
                <div className="mt-10 mb-2 relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-slate-600 to-transparent -translate-y-1/2 z-0"></div>
                    <div className="flex justify-between max-w-lg mx-auto w-full relative">
                        <ProcessStep 
                            step={1} 
                            icon={<span className="text-xl">👋</span>} 
                            text="시작" 
                            active={true} 
                        />
                        <ProcessStep 
                            step={2} 
                            icon={<Pencil size={20} />} 
                            text="입력" 
                            active={!result} 
                        />
                        <ProcessStep 
                            step={3} 
                            icon={<Cpu size={20} />} 
                            text="생성" 
                            active={isLoading || result !== null} 
                        />
                        <ProcessStep 
                            step={4} 
                            icon={<Gift size={20} />} 
                            text="완성" 
                            active={result !== null} 
                        />
                    </div>
                </div>
              </header>

              <main className="w-full">
                {!result ? (
                  <InputForm onSubmit={handleFormSubmit} isLoading={isLoading} userName={userName} />
                ) : (
                  <ResultDisplay data={result} />
                )}
              </main>
            </div>

            <Footer />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
