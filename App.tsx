
import React, { useState, useEffect } from 'react';
import { UserInput, EvaResponse } from './types';
import { generateAppPlan } from './services/geminiService';
import TutorialModal from './components/TutorialModal';
import InputForm from './components/InputForm';
import NameEntry from './components/NameEntry';
import ResultDisplay from './components/ResultDisplay';
import Footer from './components/Footer';
import { HelpCircle, RefreshCcw, Moon, Sun, ArrowLeft, Sparkles, Pencil, Cpu, Gift, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [isNameSubmitted, setIsNameSubmitted] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EvaResponse | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 다크모드 설정 유지
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleNameSubmit = (name: string) => {
    setUserName(name);
    setIsNameSubmitted(true);
    setShowTutorial(true); 
  };

  const handleFormSubmit = async (input: UserInput) => {
    setIsLoading(true);
    setError(null);
    
    // 버튼 클릭 즉시 상단으로 스크롤하여 로딩 애니메이션과 진행 단계를 보여줌
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
        const response = await generateAppPlan(input, userName);
        if (response) {
            setResult(response);
        } else {
            setError("기획안을 가져오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
            // 오류 시에도 상단으로 스크롤 (이미 위에서 했지만 명시적으로)
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } catch (err) {
        setError("네트워크 연결을 확인하고 다시 시도해주세요.");
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.error(err);
    } finally {
        setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const ProcessStep = ({ icon, text, step, active, completed }: { icon: React.ReactNode, text: string, step: number, active: boolean, completed: boolean }) => (
    <div className={`flex flex-col items-center relative z-10 transition-all duration-500 ${active || completed ? 'opacity-100 scale-105' : 'opacity-40 grayscale'}`}>
        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-xl mb-2 transition-all duration-500
            ${completed ? 'bg-green-400 text-white' : active ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 ring-4 ring-purple-200 dark:ring-purple-900 animate-pulse' : 'bg-gray-200 dark:bg-slate-800 text-gray-500'}`}>
            {icon}
        </div>
        <span className={`text-xs md:text-sm font-black px-3 py-1 rounded-full backdrop-blur-md border transition-colors
            ${active ? 'bg-purple-600 text-white border-purple-400' : 'bg-white/50 dark:bg-black/20 text-gray-700 dark:text-gray-300 border-transparent'}`}>
            {step}. {text}
        </span>
    </div>
  );

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen w-full font-sans`}>
      <div className="min-h-screen w-full transition-colors duration-700 bg-gradient-to-br from-[#FFF5F7] via-[#F3F0FF] to-[#E0F7FA] dark:from-slate-950 dark:via-purple-950 dark:to-slate-900 text-slate-800 dark:text-slate-100">
        
        {/* Navigation Bar */}
        <div className="fixed top-6 right-6 z-[60] flex gap-3">
          <button 
            onClick={toggleDarkMode}
            className="w-12 h-12 flex items-center justify-center bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl text-amber-500 dark:text-amber-300 rounded-full shadow-2xl border border-white/50 hover:scale-110 active:scale-95 transition-all"
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>

          {isNameSubmitted && (
             <button 
                onClick={() => setShowTutorial(true)}
                className="px-5 py-2 flex items-center gap-2 bg-indigo-500 text-white rounded-full shadow-2xl hover:bg-indigo-600 hover:scale-105 active:scale-95 transition-all font-bold text-sm"
            >
                <HelpCircle size={20} /> <span className="hidden sm:inline">사용법</span>
            </button>
          )}
          
          {result && (
              <button 
                onClick={handleReset}
                className="px-5 py-2 flex items-center gap-2 bg-pink-500 text-white rounded-full shadow-2xl hover:bg-pink-600 hover:scale-105 active:scale-95 transition-all font-bold text-sm"
              >
                <RefreshCcw size={20} /> <span className="hidden sm:inline">처음으로</span>
              </button>
          )}
        </div>

        {!isNameSubmitted ? (
           <NameEntry onNameSubmit={handleNameSubmit} />
        ) : (
          <>
            {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} userName={userName} />}

            <div className="container mx-auto px-4 py-16 flex flex-col items-center">
              
              <header className="text-center mb-16 w-full max-w-4xl animate-fade-in">
                <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-xs font-black mb-6 shadow-xl border border-white/50 bg-white/40 dark:bg-slate-800/40 text-purple-700 dark:text-purple-300 tracking-widest uppercase">
                   <Sparkles size={14} className="animate-spin-slow" /> Eva App Builder v2.5
                </div>
                
                <h1 className="text-4xl md:text-7xl font-bold brand-font mb-6 tracking-tight leading-tight">
                  <span className="block text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-sans mb-4 font-normal">데미안님의 상상이 현실이 되는 곳,</span>
                  Eva <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] via-[#F472B6] to-[#FB923C]">Creative Studio</span>
                </h1>
                
                {/* Process Guide (Usage Guide Integration) */}
                <div className="mt-12 mb-4 relative max-w-2xl mx-auto px-4">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0 rounded-full"></div>
                    <div className="flex justify-between w-full relative">
                        <ProcessStep 
                            step={1} 
                            icon={<span className="text-2xl">👋</span>} 
                            text="환영" 
                            active={false}
                            completed={true}
                        />
                        <ProcessStep 
                            step={2} 
                            icon={<Pencil size={24} />} 
                            text="입력" 
                            active={!result && !isLoading} 
                            completed={!!result || isLoading}
                        />
                        <ProcessStep 
                            step={3} 
                            icon={<Cpu size={24} />} 
                            text="생성" 
                            active={isLoading} 
                            completed={!!result}
                        />
                        <ProcessStep 
                            step={4} 
                            icon={<Gift size={24} />} 
                            text="완성" 
                            active={!!result} 
                            completed={false}
                        />
                    </div>
                </div>
              </header>

              <main className="w-full relative z-10">
                {error && (
                    <div className="max-w-3xl mx-auto mb-12 animate-fade-in">
                        <div className="bg-red-50 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-800 p-6 rounded-[2rem] flex items-center gap-4 text-red-700 dark:text-red-300 font-bold shadow-2xl shadow-red-100 dark:shadow-none">
                            <AlertCircle size={32} className="flex-shrink-0" />
                            <div>
                                <p className="text-lg">앗! 문제가 발생했어요.</p>
                                <p className="text-sm font-medium opacity-80">{error}</p>
                            </div>
                        </div>
                    </div>
                )}
                
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
