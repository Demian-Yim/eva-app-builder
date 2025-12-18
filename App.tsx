
import React, { useState, useEffect } from 'react';
import { UserInput, EvaResponse } from './types';
import { generateAppPlan } from './services/geminiService';
import TutorialModal from './components/TutorialModal';
import InputForm from './components/InputForm';
import NameEntry from './components/NameEntry';
import ResultDisplay from './components/ResultDisplay';
import Footer from './components/Footer';
import { HelpCircle, RefreshCcw, Moon, Sun, Sparkles, Pencil, Cpu, Gift, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [isNameSubmitted, setIsNameSubmitted] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EvaResponse | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const handleNameSubmit = (name: string) => {
    setUserName(name);
    setIsNameSubmitted(true);
    setShowTutorial(true);
  };

  const handleFormSubmit = async (input: UserInput) => {
    setIsLoading(true);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const response = await generateAppPlan(input, userName);
      if (response) {
        setResult(response);
      } else {
        setError("기획안을 생성하는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      }
    } catch (err) {
      setError("연결 상태를 확인해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const ProcessStep = ({ icon, text, step, active, completed }: any) => (
    <div className={`flex flex-col items-center z-10 transition-all duration-500 ${active || completed ? 'opacity-100' : 'opacity-40'}`}>
      <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-xl mb-2 transition-all
        ${completed ? 'bg-emerald-500 text-white' : active ? 'bg-white dark:bg-slate-700 text-purple-600 ring-4 ring-purple-100 animate-pulse' : 'bg-gray-200 dark:bg-slate-800 text-gray-400'}`}>
        {icon}
      </div>
      <span className={`text-[10px] md:text-xs font-black px-2 py-1 rounded-full ${active ? 'bg-purple-600 text-white' : 'text-gray-500'}`}>
        {step}. {text}
      </span>
    </div>
  );

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen w-full transition-colors duration-500 bg-[#FAFBFF] dark:bg-slate-950`}>
      <div className="fixed top-6 right-6 z-[60] flex gap-3">
        <button onClick={() => setDarkMode(!darkMode)} className="w-12 h-12 flex items-center justify-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl text-amber-500 rounded-full shadow-lg border border-white/50">
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
        {isNameSubmitted && (
          <button onClick={() => setShowTutorial(true)} className="px-5 py-2 flex items-center gap-2 bg-indigo-500 text-white rounded-full shadow-lg font-bold text-sm">
            <HelpCircle size={20} /> <span className="hidden sm:inline">사용법</span>
          </button>
        )}
      </div>

      {!isNameSubmitted ? (
        <NameEntry onNameSubmit={handleNameSubmit} />
      ) : (
        <>
          {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} userName={userName} />}
          <div className="container mx-auto px-4 py-16 flex flex-col items-center">
            <header className="text-center mb-16 w-full max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black mb-6 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 tracking-widest uppercase">
                <Sparkles size={14} /> Eva Creative Studio
              </div>
              <h1 className="text-4xl md:text-7xl font-bold brand-font mb-6 tracking-tight dark:text-white">
                <span className="block text-xl md:text-2xl text-slate-400 font-sans mb-4 font-normal">{userName}님, 반갑습니다!</span>
                당신의 아이디어를 <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">현실</span>로
              </h1>
              
              <div className="flex justify-between max-w-md mx-auto relative mt-12">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0"></div>
                <ProcessStep step={1} icon="👋" text="환영" completed={true} />
                <ProcessStep step={2} icon={<Pencil size={24} />} text="입력" active={!result && !isLoading} completed={!!result || isLoading} />
                <ProcessStep step={3} icon={<Cpu size={24} />} text="생성" active={isLoading} completed={!!result} />
                <ProcessStep step={4} icon={<Gift size={24} />} text="완성" active={!!result} />
              </div>
            </header>

            <main className="w-full">
              {error && <div className="max-w-xl mx-auto mb-8 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 font-bold"><AlertCircle /> {error}</div>}
              {!result ? <InputForm onSubmit={handleFormSubmit} isLoading={isLoading} userName={userName} /> : <ResultDisplay data={result} />}
            </main>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
