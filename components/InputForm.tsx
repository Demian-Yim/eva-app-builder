import React, { useState } from 'react';
import { UserInput } from '../types';
import { Briefcase, User, Star, Frown, Send, Loader2, Plus, Check, Keyboard } from 'lucide-react';

interface InputFormProps {
  onSubmit: (input: UserInput) => void;
  isLoading: boolean;
  userName: string;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [input, setInput] = useState<UserInput>({
    job: '',
    rank: '',
    style: '',
    painPoint: ''
  });
  
  const [customRank, setCustomRank] = useState('');
  const [isCustomRankMode, setIsCustomRankMode] = useState(false);

  // Keywords with pastel colors assigned visually in the UI logic
  const styleKeywords = [
    "깔끔한 디자인", "다크 모드", "모바일 최적화", 
    "자동 알림", "엑셀 연동", "대시보드",
    "AI 요약", "음성 입력", "캘린더", "클라우드",
    "SNS 로그인", "채팅 기능", "다국어", "결제", "지도"
  ];

  const painKeywords = [
    "반복 업무", "자료 찾기 힘듦", "일정 꼬임", 
    "소통 오류", "보고서 시간 부족", "아이디어 고갈",
    "데이터 정리", "실수 발생", "복잡한 결재", "회의 비효율",
    "고객 관리", "재고 파악", "영수증 처리", "진척도 모름"
  ];

  const rankOptions = [
      "사원", "주임", "대리", "과장", "차장", "부장", 
      "팀장", "본부장", "이사", "상무", "전무", "대표/사장", 
      "프리랜서", "학생", "1인 창업가", "기타 (직접 입력)"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'rank') {
        if (value === '기타 (직접 입력)') {
            setIsCustomRankMode(true);
            setInput(prev => ({ ...prev, rank: customRank })); 
        } else {
            setIsCustomRankMode(false);
            setInput(prev => ({ ...prev, rank: value }));
        }
    } else {
        setInput(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCustomRankChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCustomRank(e.target.value);
      setInput(prev => ({ ...prev, rank: e.target.value }));
  };

  const addKeyword = (field: 'style' | 'painPoint', keyword: string) => {
    setInput(prev => {
      const current = prev[field];
      if (current.includes(keyword)) return prev;
      const newValue = current ? `${current}, ${keyword}` : keyword;
      return { ...prev, [field]: newValue };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(input);
  };

  const isFormValid = Object.values(input).every(val => (val as string).trim().length > 0);

  return (
    <div className="w-full max-w-4xl mx-auto relative">
      {/* Decorative blobs */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse dark:opacity-20"></div>
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-75 dark:opacity-20"></div>
      
      <div className="glass-panel dark:bg-slate-800/80 rounded-[2.5rem] p-8 md:p-12 shadow-2xl animate-fade-in relative z-10 border border-white/60 dark:border-slate-600">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2 brand-font text-center">
           어떤 고민을 해결해 드릴까요?
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-10 text-lg">
          데미안님의 상황을 알려주시면 <span className="text-purple-600 font-bold">Eva</span>가 최적의 앱을 설계해드려요.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Row 1: Job & Rank */}
          <div className="grid md:grid-cols-2 gap-6">
              {/* Job */}
              <div className="group">
                <label className="block text-lg font-bold text-gray-700 dark:text-gray-200 mb-3 ml-2 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center">
                        <Briefcase size={18} />
                    </div>
                    현재 직무
                </label>
                <input
                    type="text"
                    name="job"
                    value={input.job}
                    onChange={handleChange}
                    placeholder="예: 마케팅, 인사관리"
                    className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-blue-100 dark:border-slate-600 bg-blue-50/50 dark:bg-slate-900 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 outline-none transition-all placeholder-gray-400"
                />
              </div>

              {/* Rank - Improved for 'Guitar' (Etc) */}
              <div className="group">
                <label className="block text-lg font-bold text-gray-700 dark:text-gray-200 mb-3 ml-2 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 flex items-center justify-center">
                        <User size={18} />
                    </div>
                    직급/역할
                </label>
                <div className="flex flex-col gap-3">
                    <select
                        name="rank"
                        onChange={handleChange}
                        defaultValue=""
                        className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-green-100 dark:border-slate-600 bg-green-50/50 dark:bg-slate-900 focus:border-green-400 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900 outline-none transition-all cursor-pointer appearance-none text-gray-700 dark:text-gray-100"
                    >
                        <option value="" disabled>선택해주세요</option>
                        {rankOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                    
                    {/* Custom Input appears nicely with animation */}
                    <div className={`overflow-hidden transition-all duration-300 ${isCustomRankMode ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="relative">
                            <Keyboard className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500" size={20}/>
                            <input 
                                type="text"
                                value={customRank}
                                onChange={handleCustomRankChange}
                                placeholder="정확한 직급을 입력해주세요"
                                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-green-300 dark:border-green-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-green-200 text-green-700 dark:text-green-300 font-bold"
                            />
                        </div>
                    </div>
                </div>
              </div>
          </div>

          {/* Style */}
          <div className="group">
            <label className="block text-lg font-bold text-gray-700 dark:text-gray-200 mb-3 ml-2 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 flex items-center justify-center">
                    <Star size={18} />
                </div>
                선호하는 기능
            </label>
            <input
              type="text"
              name="style"
              value={input.style}
              onChange={handleChange}
              placeholder="필요한 기능을 선택하거나 적어주세요"
              className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-yellow-100 dark:border-slate-600 bg-yellow-50/50 dark:bg-slate-900 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 dark:focus:ring-yellow-900 outline-none transition-all placeholder-gray-400"
            />
            <div className="flex flex-wrap gap-2 mt-4 max-h-32 overflow-y-auto custom-scrollbar p-1">
              {styleKeywords.map((keyword, idx) => (
                  <button
                      key={idx}
                      type="button"
                      onClick={() => addKeyword('style', keyword)}
                      className={`text-sm px-4 py-2 rounded-full font-medium transition-all flex items-center gap-1.5 transform hover:scale-105
                          ${input.style.includes(keyword) 
                              ? 'bg-yellow-400 text-white shadow-md shadow-yellow-200 dark:shadow-none' 
                              : 'bg-white dark:bg-slate-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-600 hover:bg-yellow-50 dark:hover:bg-slate-600'}`}
                  >
                      {input.style.includes(keyword) ? <Check size={14} strokeWidth={3}/> : <Plus size={14}/>}
                      {keyword}
                  </button>
              ))}
            </div>
          </div>

          {/* Pain Point */}
          <div className="group">
            <label className="block text-lg font-bold text-gray-700 dark:text-gray-200 mb-3 ml-2 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900 text-red-500 dark:text-red-300 flex items-center justify-center">
                    <Frown size={18} />
                </div>
                해결하고 싶은 고민
            </label>
            <textarea
              name="painPoint"
              value={input.painPoint}
              onChange={handleChange}
              placeholder="업무 중 가장 불편했던 점은 무엇인가요?"
              rows={3}
              className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-red-100 dark:border-slate-600 bg-red-50/50 dark:bg-slate-900 focus:border-red-400 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900 outline-none transition-all placeholder-gray-400 resize-none"
            />
             <div className="flex flex-wrap gap-2 mt-4 max-h-32 overflow-y-auto custom-scrollbar p-1">
              {painKeywords.map((keyword, idx) => (
                  <button
                      key={idx}
                      type="button"
                      onClick={() => addKeyword('painPoint', keyword)}
                      className={`text-sm px-4 py-2 rounded-full font-medium transition-all flex items-center gap-1.5 transform hover:scale-105
                          ${input.painPoint.includes(keyword) 
                            ? 'bg-red-400 text-white shadow-md shadow-red-200 dark:shadow-none' 
                            : 'bg-white dark:bg-slate-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-600 hover:bg-red-50 dark:hover:bg-slate-600'}`}
                  >
                      {input.painPoint.includes(keyword) ? <Check size={14} strokeWidth={3}/> : <Plus size={14}/>}
                      {keyword}
                  </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`w-full py-5 rounded-2xl font-black text-xl shadow-xl transition-all transform hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-3 mt-8
              ${isFormValid 
                ? 'bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white hover:shadow-purple-200 dark:hover:shadow-none'
                : 'bg-gray-200 dark:bg-slate-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'}`}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin w-6 h-6" /> 
                <span className="animate-pulse">Eva가 멋진 기획을 만들고 있어요...</span>
              </>
            ) : (
              <>
                <Send size={24} /> 기획안 받아보기
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputForm;