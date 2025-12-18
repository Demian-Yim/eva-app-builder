
import React, { useState, useEffect } from 'react';
import { UserInput, EvaResponse } from './types';
import { generateAppPlan } from './services/geminiService';
import TutorialModal from './components/TutorialModal';
import InputForm from './components/InputForm';
import NameEntry from './components/NameEntry';
import ResultDisplay from './components/ResultDisplay';
import Footer from './components/Footer';
import { HelpCircle, Moon, Sun, Sparkles, Pencil, Cpu, Gift, AlertCircle } from 'lucide-react';

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
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const response = await generateAppPlan(input, userName);
      if (response) {
        setResult(response);
      } else {
        setError("기획안을 생성하는 중 오류가 발생했습니다. Vercel 환경 변수에 API_KEY가 등록되어 있는지 확인해 주세요.");
      }
    } catch (err) {
      setError("죄송해요, 데미안님. 연결 상태를 확인하고 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const ProcessStep = ({ icon, text, step, active, completed }: any) => (
    <div className={`flex flex-col items-center z-10 transition-all duration-700 ${active || completed ? 'opacity-100' : 'opacity-30'}`}>
      <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-lg mb-2 transition-all transform
        ${completed ? 'bg-emerald-400 text-white rotate-6' : active ? 'bg-white dark:bg-slate-800 text-purple-500 ring-4 ring-purple-100 dark:ring-purple-900/30 animate-bounce' : 'bg-slate-100 dark:bg-slate-900 text-slate-400'}`}>
        {icon}
      </div>
      <span className={`text-[10px] md:text-xs font-black px-2 py-1 rounded-full ${active ? 'bg-purple-500 text-white' : 'text-slate-400'}`}>
        {step}. {text}
      </span>
    </div>
  );

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen w-full transition-colors duration-500 bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100`}>
      <div className="fixed top-6 right-6 z-[60] flex gap-3">
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className="w-12 h-12 flex items-center justify-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 dark:border-slate-700 transition-all hover:scale-110 active:scale-95"
        >
          {darkMode ? <Sun size={24} className="text-amber-400" /> : <Moon size={24} className="text-indigo-500" />}
        </button>
        {isNameSubmitted && (
          <button 
            onClick={() => setShowTutorial(true)} 
            className="px-6 py-2 flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl shadow-xl font-black text-sm transition-all hover:scale-105 active:scale-95"
          >
            <HelpCircle size={18} /> <span className="hidden sm:inline">사용법</span>
          </button>
        )}
      </div>

      {!isNameSubmitted ? (
        <NameEntry onNameSubmit={handleNameSubmit} />
      ) : (
        <>
          {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} userName={userName} />}
          <div className="container mx-auto px-4 py-20 flex flex-col items-center">
            <header className="text-center mb-20 w-full max-w-4xl animate-fade-in">
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-xs font-black mb-8 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 tracking-widest uppercase border border-indigo-100 dark:border-indigo-800">
                <Sparkles size={16} /> Eva Creative Studio
              </div>
              <h1 className="text-5xl md:text-8xl font-black brand-font mb-8 tracking-tighter">
                <span className="block text-2xl md:text-3xl text-slate-400 font-sans mb-4 font-bold">{userName}님, 반갑습니다!</span>
                세상에 없던 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">나만의 앱</span>
              </h1>
              
              <div className="flex justify-between max-w-lg mx-auto relative mt-16 px-4">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0 rounded-full"></div>
                <ProcessStep step={1} icon="✨" text="환영" completed={true} />
                <ProcessStep step={2} icon={<Pencil size={24} />} text="입력" active={!result && !isLoading} completed={!!result || isLoading} />
                <ProcessStep step={3} icon={<Cpu size={24} />} text="생성" active={isLoading} completed={!!result} />
                <ProcessStep step={4} icon={<Gift size={24} />} text="완성" active={!!result} />
              </div>
            </header>

            <main className="w-full">
              {error && (
                <div className="max-w-2xl mx-auto mb-10 p-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-3xl flex items-center gap-4 font-bold border border-red-100 dark:border-red-800 animate-fade-in">
                  <AlertCircle className="flex-shrink-0" /> {error}
                </div>
              )}
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
