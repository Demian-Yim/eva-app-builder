
import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface NameEntryProps {
  onNameSubmit: (name: string) => void;
}

const NameEntry: React.FC<NameEntryProps> = ({ onNameSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onNameSubmit(name.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-10 md:p-14 rounded-[2.5rem] shadow-2xl max-w-lg w-full text-center border border-white/50 dark:border-slate-600 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 dark:opacity-20"></div>
        
        <div className="inline-flex items-center justify-center w-24 h-24 bg-white dark:bg-slate-700 rounded-full mb-8 shadow-xl animate-bounce-slow relative z-10">
          <Sparkles className="w-12 h-12 text-yellow-400 fill-current" />
        </div>
        
        <h2 className="text-4xl md:text-5xl font-black text-gray-800 dark:text-white mb-4 brand-font tracking-tight">
          반가워요!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-10 text-xl font-medium leading-relaxed">
          가장 쉬운 앱 창작소, Eva입니다.<br/>
          <span className="text-purple-600 dark:text-purple-400 font-bold">성함</span>을 알려주시면 바로 안내해드릴게요.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="relative group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력해주세요"
              className="w-full px-8 py-5 text-center text-2xl font-bold rounded-2xl border-2 border-purple-100 dark:border-slate-600 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-900/50 outline-none transition-all bg-white/80 dark:bg-slate-900 dark:text-white placeholder-gray-300"
              autoFocus
            />
          </div>
          <button
            type="submit"
            disabled={!name.trim()}
            className={`w-full py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all transform
              ${name.trim() 
                ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:scale-[1.02] shadow-xl hover:shadow-2xl' 
                : 'bg-gray-200 dark:bg-slate-700 text-gray-400 cursor-not-allowed'}`}
          >
            시작하기 <ArrowRight size={24} strokeWidth={3} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default NameEntry;
