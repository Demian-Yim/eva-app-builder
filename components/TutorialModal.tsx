
import React, { useState } from 'react';
import { X, ArrowRight, Sparkles, MonitorSmartphone, Rocket, Lightbulb } from 'lucide-react';

interface TutorialModalProps {
  onClose: () => void;
  userName: string;
}

const TutorialModal: React.FC<TutorialModalProps> = ({ onClose, userName }) => {
  const [step, setStep] = useState(1);

  const steps = [
    {
      title: `안녕하세요, ${userName}님!`,
      subtitle: "Eva에 오신 것을 환영합니다",
      content: "코딩을 몰라도 괜찮아요. 복잡한 개발 용어 대신, 데미안님의 언어로 이야기해주세요. Eva가 찰떡같이 알아듣고 멋진 앱을 기획해 드릴게요.",
      icon: <Sparkles className="w-16 h-16 text-yellow-500 drop-shadow-lg" />,
      bg: "bg-yellow-50 dark:bg-yellow-900/20"
    },
    {
      title: "아주 간단해요",
      subtitle: "3단계 프로세스",
      content: "1. 직무와 고민을 입력하고\n2. Eva가 추천하는 앱을 선택하면\n3. '만들기 프롬프트'가 1초 만에 완성!",
      icon: <Lightbulb className="w-16 h-16 text-orange-500 drop-shadow-lg" />,
      bg: "bg-orange-50 dark:bg-orange-900/20"
    },
    {
      title: "준비되셨나요?",
      subtitle: "마법 같은 변화",
      content: "이제 데미안님의 아이디어가 현실이 될 차례입니다. 업무 효율을 높여줄 나만의 앱, 지금 바로 만들어보세요!",
      icon: <Rocket className="w-16 h-16 text-purple-500 drop-shadow-lg animate-pulse" />,
      bg: "bg-purple-50 dark:bg-purple-900/20"
    }
  ];

  const currentStep = steps[step - 1];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-2xl max-w-md w-full overflow-hidden relative border border-white/40 dark:border-slate-600 ring-1 ring-black/5 transform transition-all duration-300">
        
        {/* Skip Button */}
        <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 dark:hover:text-white z-20 transition-colors bg-white/50 dark:bg-black/50 rounded-full px-3 py-1 flex items-center gap-1 backdrop-blur-sm"
        >
            <span className="text-xs font-bold">SKIP</span>
            <X size={14} />
        </button>

        {/* Content Area */}
        <div className={`relative h-64 ${currentStep.bg} transition-colors duration-500 flex flex-col items-center justify-center overflow-hidden`}>
           <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
           <div className="bg-white/80 dark:bg-slate-900/80 p-6 rounded-3xl shadow-lg backdrop-blur-sm transform transition-all hover:scale-105 duration-500">
             {currentStep.icon}
           </div>
        </div>

        <div className="p-8 text-center relative bg-white dark:bg-slate-800">
          <h3 className="text-sm font-bold text-purple-600 dark:text-purple-400 mb-1 tracking-widest uppercase">{currentStep.subtitle}</h3>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 brand-font">{currentStep.title}</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 whitespace-pre-line text-lg font-medium">
            {currentStep.content}
          </p>

          <div className="flex items-center justify-between mt-auto">
            {/* Dots */}
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className={`h-2 rounded-full transition-all duration-500 ease-out ${i === step ? 'w-8 bg-purple-600' : 'w-2 bg-gray-200 dark:bg-slate-600'}`}
                />
              ))}
            </div>
            
            {/* Next Button */}
            <button
              onClick={() => {
                if (step < 3) setStep(step + 1);
                else onClose();
              }}
              className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-lg hover:shadow-xl transform active:scale-95"
            >
              {step === 3 ? "시작하기" : "다음"}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialModal;
