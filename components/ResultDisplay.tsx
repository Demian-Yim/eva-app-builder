
import React, { useState, useEffect } from 'react';
import { EvaResponse } from '../types';
import { Check, Clipboard, Target, Layout, Database, Workflow, Bot, MousePointerClick, ExternalLink, Sparkles, Smile, Rocket, Lightbulb, MessageSquareQuote } from 'lucide-react';

interface ResultDisplayProps {
  data: EvaResponse;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);
  const [selectedAppIndex, setSelectedAppIndex] = useState<number>(0);

  const selectedApp = data.recommendations[selectedAppIndex];

  // 파스텔 톤 컬러 팔레트 (4도 이상)
  const cardStyles = [
      { bg: 'bg-[#F0F4FF]', darkBg: 'dark:bg-indigo-900/20', border: 'border-indigo-200', text: 'text-indigo-700', activeRing: 'ring-indigo-400' },
      { bg: 'bg-[#FFF0F6]', darkBg: 'dark:bg-pink-900/20', border: 'border-pink-200', text: 'text-pink-700', activeRing: 'ring-pink-400' },
      { bg: 'bg-[#F0FFF4]', darkBg: 'dark:bg-emerald-900/20', border: 'border-emerald-200', text: 'text-emerald-700', activeRing: 'ring-emerald-400' }
  ];

  const handleCopyPrompt = () => {
    const promptData = selectedApp.prompt;
    const promptText = `
# Role: Senior Frontend Engineer
# Task: Create a web application based on the following specifications.

## 1. App Overview
- **Name**: ${promptData.appName}
- **Purpose**: ${promptData.purpose}

## 2. Technical Stack
${promptData.techStack}

## 3. Functional Requirements
${promptData.requirements}

## 4. UI/UX Design & Components
${promptData.components}

## 5. Data Model (TypeScript Interfaces)
${promptData.dataModel}

## 6. Implementation Steps
${promptData.stepByStepImplementation}

## 7. Final Instruction
${promptData.finalRequest}
    `.trim();
    
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-16 animate-fade-in pb-32">
      
      {/* 1. 상황 분석 섹션 */}
      <section className="flex gap-6 items-start max-w-4xl mx-auto">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-2xl rotate-3">
            <Bot className="text-white w-9 h-9" />
        </div>
        <div className="glass-panel dark:bg-slate-800/80 rounded-[2.5rem] rounded-tl-none p-8 md:p-10 shadow-2xl flex-1 relative border-indigo-100 dark:border-slate-700">
            <h3 className="text-2xl font-black brand-font mb-4 text-indigo-800 dark:text-indigo-300 flex items-center gap-2">
                <Target className="w-6 h-6" /> 데미안님의 핵심 니즈 파악
            </h3>
            <p className="text-slate-700 dark:text-slate-200 whitespace-pre-wrap leading-relaxed text-xl font-medium italic">
            "{data.userUnderstanding}"
            </p>
            <div className="absolute -left-2 top-0 w-6 h-6 bg-inherit transform rotate-45 border-l border-b border-inherit"></div>
        </div>
      </section>

      {/* 2. 앱 추천 섹션 */}
      <section>
        <div className="text-center mb-12">
            <span className="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 px-6 py-2 rounded-full text-sm font-black mb-4 inline-block tracking-tighter">
                DEMIAN'S CUSTOM SOLUTIONS
            </span>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white brand-font tracking-tight">
            데미안님을 위한 3가지 솔루션
            </h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 px-4">
          {data.recommendations.map((app, idx) => {
            const isSelected = selectedAppIndex === idx;
            const style = cardStyles[idx % cardStyles.length];
            return (
              <button 
                key={idx} 
                onClick={() => setSelectedAppIndex(idx)}
                className={`relative rounded-[2.5rem] p-8 text-left transition-all duration-500 flex flex-col h-full border-2 overflow-hidden group
                  ${isSelected 
                    ? `bg-white dark:bg-slate-800 ring-8 ${style.activeRing} shadow-2xl scale-[1.05] z-10 border-transparent` 
                    : `${style.bg} ${style.darkBg} ${style.border} hover:scale-[1.02] hover:shadow-xl opacity-70 hover:opacity-100`
                  }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-widest shadow-md">
                    SELECTED
                  </div>
                )}
                
                <div className="mb-6">
                  <h4 className={`text-2xl md:text-3xl font-black mb-3 leading-tight brand-font ${isSelected ? 'text-slate-900 dark:text-white' : style.text}`}>
                    {app.name}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-bold">
                    {app.description}
                  </p>
                </div>

                <div className="mt-auto flex flex-wrap gap-2">
                   {app.features.slice(0, 3).map((feat, i) => (
                    <div key={i} className="text-[11px] font-black text-slate-500 dark:text-slate-400 flex items-center gap-1.5 bg-white/60 dark:bg-slate-900/60 px-3 py-1.5 rounded-full border border-slate-100 dark:border-slate-700">
                       <Sparkles size={10} className="text-amber-500" /> {feat}
                    </div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. 상세 기획 및 프롬프트 */}
      <div key={selectedAppIndex} className="space-y-12 animate-fade-in px-4">
          
          {/* 설계도 박스 */}
          <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl rounded-[3rem] p-10 md:p-16 shadow-2xl border border-white/50 dark:border-slate-700">
             <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 pb-10 border-b border-slate-100 dark:border-slate-700 gap-6">
                <div>
                    <h3 className="text-4xl font-black text-slate-900 dark:text-white brand-font mb-3">
                    '{selectedApp.name}' 시스템 아키텍처
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">데미안님의 비즈니스 효율을 극대화할 수 있도록 설계되었습니다.</p>
                </div>
                <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-6 py-3 rounded-2xl font-black text-sm border border-emerald-200 dark:border-emerald-800 shadow-sm">
                    구현 난이도: {selectedApp.difficulty}
                </div>
             </div>

            <div className="grid gap-16 md:grid-cols-2">
              <div className="space-y-10">
                <div>
                  <h4 className="flex items-center gap-3 text-xl font-black text-slate-900 dark:text-slate-100 mb-6 brand-font">
                     <div className="p-3 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-2xl shadow-inner"><Layout size={24} /></div>
                     사용자 인터페이스(UI) 구성
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedApp.detailedDesign.structure.map((s, i) => (
                      <span key={i} className="px-5 py-2.5 bg-indigo-50 dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 rounded-xl text-sm font-black border border-indigo-100 dark:border-slate-700 shadow-sm">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="flex items-center gap-3 text-xl font-black text-slate-900 dark:text-slate-100 mb-6 brand-font">
                     <div className="p-3 bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 rounded-2xl shadow-inner"><MousePointerClick size={24} /></div>
                     핵심 인터랙션 요소
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedApp.detailedDesign.buttons.map((b, i) => (
                      <span key={i} className="px-5 py-2.5 bg-pink-50 dark:bg-slate-900 text-pink-700 dark:text-pink-300 rounded-xl text-sm font-black border border-pink-100 dark:border-slate-700 shadow-sm">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-10">
                <div>
                   <h4 className="flex items-center gap-3 text-xl font-black text-slate-900 dark:text-slate-100 mb-6 brand-font">
                     <div className="p-3 bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 rounded-2xl shadow-inner"><Database size={24} /></div>
                     데이터 인프라 및 관리
                  </h4>
                  <p className="text-base font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl leading-relaxed border border-slate-100 dark:border-slate-800 shadow-inner">
                    {selectedApp.detailedDesign.dataStructure}
                  </p>
                </div>

                <div>
                   <h4 className="flex items-center gap-3 text-xl font-black text-slate-900 dark:text-slate-100 mb-6 brand-font">
                     <div className="p-3 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 rounded-2xl shadow-inner"><Sparkles size={24} /></div>
                     AI 기반 인텔리전스 기능
                  </h4>
                  <ul className="space-y-3">
                      {selectedApp.detailedDesign.aiFeatures.map((f, i) => (
                        <li key={i} className="flex items-start gap-3 text-base font-bold text-slate-700 dark:text-slate-300 bg-white/40 dark:bg-slate-900/40 p-3 rounded-xl border border-purple-50 dark:border-purple-900/30">
                            <Bot className="text-purple-500 w-5 h-5 mt-1 flex-shrink-0" /> {f}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-10 border-t border-slate-100 dark:border-slate-700">
                <h4 className="text-xl font-black text-slate-900 dark:text-slate-100 mb-6 brand-font flex items-center gap-3">
                    <div className="p-3 bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 rounded-2xl shadow-inner"><Workflow size={24} /></div>
                    사용자 경험 시나리오 (Flow)
                </h4>
                <div className="bg-teal-50/50 dark:bg-teal-950/20 p-8 rounded-3xl border border-teal-100 dark:border-teal-900/50 text-center font-black text-teal-800 dark:text-teal-200 text-lg leading-relaxed shadow-inner">
                    {selectedApp.detailedDesign.flow}
                </div>
            </div>
          </section>

          {/* 프롬프트 출력 섹션 */}
          <section className="bg-slate-950 rounded-[3rem] p-3 shadow-3xl ring-8 ring-slate-100 dark:ring-slate-900 overflow-hidden">
             <div className="bg-slate-900 rounded-t-[2.5rem] px-8 py-5 flex items-center justify-between">
                <div className="flex gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-red-500/80 shadow-lg shadow-red-500/20" />
                    <div className="w-4 h-4 rounded-full bg-amber-500/80 shadow-lg shadow-amber-500/20" />
                    <div className="w-4 h-4 rounded-full bg-emerald-500/80 shadow-lg shadow-emerald-500/20" />
                </div>
                <div className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em] font-black">AI GENERATED PROMPT v2.0</div>
             </div>
             
             <div className="p-10 md:p-14 font-mono text-sm relative">
                <div className="absolute top-6 right-10 text-emerald-400 text-xs font-black animate-pulse flex items-center gap-2 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/30">
                   <div className="w-2 h-2 rounded-full bg-emerald-400" /> SYSTEM ONLINE
                </div>
                <div className="text-slate-300 space-y-6 max-h-96 overflow-y-auto custom-scrollbar pr-4">
                    <p className="text-purple-400 font-black"># Role: Senior Frontend Engineer</p>
                    <p className="text-sky-300 font-black"># App Name: <span className="text-white bg-sky-500/20 px-2 rounded">{selectedApp.prompt.appName}</span></p>
                    <div className="space-y-4 opacity-70 blur-[0.5px] select-none pointer-events-none">
                        <p className="text-slate-500">// {selectedApp.prompt.purpose}</p>
                        <p className="text-slate-400 whitespace-pre-wrap">
                            {selectedApp.prompt.requirements.substring(0, 400)}...
                        </p>
                    </div>
                </div>

                <button 
                  onClick={handleCopyPrompt}
                  className={`mt-10 w-full font-black text-xl py-6 rounded-3xl transition-all transform active:scale-95 flex items-center justify-center gap-4 shadow-2xl
                    ${copied 
                      ? "bg-emerald-500 text-white shadow-emerald-500/30" 
                      : "bg-white text-slate-900 hover:bg-slate-100 hover:-translate-y-1 shadow-white/10"}`}
                >
                  {copied ? <Check className="w-7 h-7" strokeWidth={3} /> : <Clipboard className="w-7 h-7" />}
                  {copied ? "클립보드에 복사되었습니다!" : "마법의 프롬프트 복사하기"}
                </button>
             </div>
          </section>

          {/* [추가] 상세 가이드라인 섹션 (채팅 스타일) */}
          <section className="mt-20 space-y-8 max-w-4xl mx-auto">
             <div className="text-center">
                 <h4 className="text-3xl font-black brand-font text-slate-900 dark:text-white mb-2">데미안님을 위한 Eva의 친절한 가이드</h4>
                 <p className="text-slate-500 dark:text-slate-400 font-bold italic">"이제 거의 다 왔어요! 이대로만 따라하시면 나만의 앱이 완성됩니다."</p>
             </div>

             <div className="space-y-6">
                 {/* 가이드 step 1 */}
                 <div className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0 font-black text-lg shadow-sm group-hover:scale-110 transition-transform">1</div>
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] rounded-tl-none shadow-xl border border-slate-100 dark:border-slate-700 flex-1">
                        <p className="text-slate-800 dark:text-slate-200 font-bold mb-2 flex items-center gap-2">
                           <Clipboard size={18} className="text-indigo-500" /> 프롬프트 복사하기
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                           위의 검정색 박스 하단에 있는 <strong>'프롬프트 복사하기'</strong> 버튼을 클릭해주세요. 이 버튼 하나에 앱을 만드는 모든 마법의 주문이 담겨 있습니다.
                        </p>
                    </div>
                 </div>

                 {/* 가이드 step 2 */}
                 <div className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-2xl bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 flex items-center justify-center flex-shrink-0 font-black text-lg shadow-sm group-hover:scale-110 transition-transform">2</div>
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] rounded-tl-none shadow-xl border border-slate-100 dark:border-slate-700 flex-1">
                        <p className="text-slate-800 dark:text-slate-200 font-bold mb-2 flex items-center gap-2">
                           <ExternalLink size={18} className="text-pink-500" /> 제작 도구로 이동
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                           <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-indigo-400 underline font-black hover:text-indigo-500">Google AI Studio</a>에 접속하여 로그인해주세요. 이곳이 바로 데미안님의 앱이 태어날 공방입니다.
                        </p>
                    </div>
                 </div>

                 {/* 가이드 step 3 */}
                 <div className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0 font-black text-lg shadow-sm group-hover:scale-110 transition-transform">3</div>
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] rounded-tl-none shadow-xl border border-slate-100 dark:border-slate-700 flex-1">
                        <p className="text-slate-800 dark:text-slate-200 font-bold mb-2 flex items-center gap-2">
                           <Rocket size={18} className="text-amber-500" /> 붙여넣고 엔터!
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                           채팅창에 복사한 내용을 <strong>붙여넣기(Ctrl+V)</strong> 하고 엔터를 누르세요. AI가 코드를 작성하기 시작할 거예요. 코드가 다 나오면 오른쪽 상단의 'Preview' 버튼으로 바로 확인해보세요!
                        </p>
                    </div>
                 </div>

                 {/* 마지막 격려 메시지 */}
                 <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1 rounded-[2.5rem] shadow-2xl transform hover:scale-[1.01] transition-all">
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.4rem] text-center">
                        <MessageSquareQuote className="w-10 h-10 text-indigo-500 mx-auto mb-4 opacity-50" />
                        <h5 className="text-2xl font-black brand-font text-slate-900 dark:text-white mb-2">"데미안님은 상상만 하세요, 나머지는 Eva가 돕겠습니다."</h5>
                        <p className="text-slate-500 dark:text-slate-400 font-bold">혹시 더 수정하고 싶은 부분이 있다면, 다시 처음으로 돌아가 정보를 수정해 보세요!</p>
                    </div>
                 </div>
             </div>
          </section>

      </div>

    </div>
  );
};

export default ResultDisplay;
