
import React, { useState } from 'react';
import { EvaResponse } from '../types';
import { Check, Clipboard, Target, Layout, Database, Workflow, Bot, MousePointerClick, Code2, Layers, ExternalLink, Smartphone, Monitor, MessageCircle, Sparkles, Smile } from 'lucide-react';

interface ResultDisplayProps {
  data: EvaResponse;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);
  const [selectedAppIndex, setSelectedAppIndex] = useState<number>(0);

  const selectedApp = data.recommendations[selectedAppIndex];

  // Colors for Cards (Pastel variations)
  const cardColors = [
      'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
      'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
      'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800'
  ];
  const activeCardColors = [
      'ring-purple-400 bg-white dark:bg-slate-800',
      'ring-blue-400 bg-white dark:bg-slate-800',
      'ring-pink-400 bg-white dark:bg-slate-800'
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
    <div className="w-full max-w-5xl mx-auto space-y-12 animate-fade-in pb-20">
      
      {/* 1. User Understanding (Chat Bubble Style) */}
      <section className="flex gap-4 items-start">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-400 to-pink-400 flex items-center justify-center flex-shrink-0 shadow-md">
            <Bot className="text-white w-7 h-7" />
        </div>
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl rounded-tl-none p-6 md:p-8 shadow-lg border border-purple-100 dark:border-slate-700 flex-1 relative">
            <h3 className="text-xl font-bold brand-font mb-3 text-purple-800 dark:text-purple-300 flex items-center gap-2">
                <Target className="w-5 h-5" /> 데미안님의 상황 분석
            </h3>
            <p className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap leading-relaxed text-lg font-medium">
            "{data.userUnderstanding}"
            </p>
            <div className="absolute -left-2 top-0 w-4 h-4 bg-white/80 dark:bg-slate-800/80 transform rotate-45 border-l border-b border-purple-100 dark:border-slate-700"></div>
        </div>
      </section>

      {/* 2. App Selection (Cards) */}
      <section>
        <div className="text-center mb-8">
            <span className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 px-4 py-1.5 rounded-full text-sm font-bold mb-3 inline-block">
                Solution
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white brand-font">
            3가지 맞춤 앱을 제안해요
            </h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {data.recommendations.map((app, idx) => {
            const isSelected = selectedAppIndex === idx;
            return (
              <button 
                key={idx} 
                onClick={() => setSelectedAppIndex(idx)}
                className={`relative rounded-3xl p-6 text-left transition-all duration-300 flex flex-col h-full group border-2
                  ${isSelected 
                    ? `${activeCardColors[idx]} ring-4 shadow-xl scale-[1.02] z-10 border-transparent` 
                    : `${cardColors[idx]} hover:scale-[1.01] hover:shadow-lg opacity-80 hover:opacity-100`
                  }`}
              >
                {isSelected && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                    <Check size={12} strokeWidth={3} /> Picked
                  </div>
                )}
                
                <div className="mb-4">
                  <h4 className={`text-xl md:text-2xl font-bold mb-2 leading-tight ${isSelected ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-200'}`}>
                    {app.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                    {app.description}
                  </p>
                </div>

                <div className="mt-auto space-y-2">
                   {app.features.slice(0, 3).map((feat, i) => (
                    <div key={i} className="text-xs font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1.5 bg-white/50 dark:bg-black/20 p-2 rounded-lg">
                       <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 bg-gray-400`} />
                       {feat}
                    </div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Detailed Design & Prompt Display */}
      <div key={selectedAppIndex} className="space-y-8 animate-fade-in">
          
          {/* Design Detail Box */}
          <section className="bg-white/90 dark:bg-slate-800/90 backdrop-blur rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/50 dark:border-slate-600">
             <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-8 border-b border-gray-100 dark:border-slate-700 gap-4">
                <div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white brand-font mb-2">
                    '{selectedApp.name}' 설계도
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">개발 지식이 없어도 이해할 수 있게 정리했어요.</p>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-xl font-bold text-sm">
                    난이도: {selectedApp.difficulty}
                </div>
             </div>

            <div className="grid gap-12 md:grid-cols-2">
              {/* Left Column */}
              <div className="space-y-8">
                <div>
                  <h4 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                     <span className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><Layout size={20} /></span>
                     화면 구성
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedApp.detailedDesign.structure.map((s, i) => (
                      <span key={i} className="px-3 py-1.5 bg-indigo-50 dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm font-bold border border-indigo-100 dark:border-slate-600">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                     <span className="p-2 bg-pink-100 text-pink-600 rounded-lg"><MousePointerClick size={20} /></span>
                     핵심 버튼
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedApp.detailedDesign.buttons.map((b, i) => (
                      <span key={i} className="px-3 py-1.5 bg-pink-50 dark:bg-slate-700 text-pink-700 dark:text-pink-300 rounded-lg text-sm font-bold border border-pink-100 dark:border-slate-600">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                <div>
                   <h4 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                     <span className="p-2 bg-orange-100 text-orange-600 rounded-lg"><Database size={20} /></span>
                     데이터 관리
                  </h4>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-slate-700 p-4 rounded-xl leading-relaxed">
                    {selectedApp.detailedDesign.dataStructure}
                  </p>
                </div>

                <div>
                   <h4 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                     <span className="p-2 bg-purple-100 text-purple-600 rounded-lg"><Sparkles size={20} /></span>
                     AI 특별 기능
                  </h4>
                  <ul className="space-y-2">
                      {selectedApp.detailedDesign.aiFeatures.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            <span className="text-purple-500 mt-0.5">✦</span> {f}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Flow */}
            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-slate-700">
                <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <span className="p-2 bg-teal-100 text-teal-600 rounded-lg"><Workflow size={20} /></span>
                    사용 흐름
                </h4>
                <div className="bg-teal-50/50 dark:bg-slate-700/50 p-5 rounded-xl border border-teal-100 dark:border-slate-600 text-center font-bold text-teal-800 dark:text-teal-200">
                    {selectedApp.detailedDesign.flow}
                </div>
            </div>
          </section>

          {/* Prompt Section */}
          <section className="bg-gray-900 dark:bg-black rounded-[2rem] p-2 shadow-2xl ring-4 ring-gray-100 dark:ring-gray-800 overflow-hidden">
             <div className="bg-gray-800 rounded-t-[1.5rem] px-6 py-4 flex items-center justify-between">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="text-gray-400 font-mono text-xs uppercase tracking-widest font-bold">Generated Prompt</div>
             </div>
             
             <div className="p-6 md:p-8 font-mono text-sm relative">
                <div className="absolute top-4 right-6 text-green-400 text-xs animate-pulse">● Ready to Copy</div>
                <div className="text-gray-300 space-y-4 max-h-80 overflow-y-auto custom-scrollbar pr-2">
                    <p className="text-purple-400"># Role: Senior Frontend Engineer</p>
                    <p className="text-blue-300"># App Name: <span className="text-white">{selectedApp.prompt.appName}</span></p>
                    <p className="text-gray-500">// 복사 버튼을 누르면 전체 코드가 복사됩니다.</p>
                    <p className="text-gray-400 whitespace-pre-wrap opacity-70 blur-[1px] select-none">
                        {selectedApp.prompt.requirements.substring(0, 200)}...
                    </p>
                </div>

                <button 
                onClick={handleCopyPrompt}
                className="mt-6 w-full bg-white text-gray-900 font-black text-lg py-4 rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 transform hover:scale-[1.01] active:scale-[0.99]"
              >
                {copied ? <Check className="w-5 h-5 text-green-600" /> : <Clipboard className="w-5 h-5" />}
                {copied ? "복사 완료! 이제 붙여넣기만 하세요" : "프롬프트 복사하기"}
              </button>
             </div>
          </section>

          {/* New Feature: Friendly Chat Guide */}
          <section className="mt-12 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800/30 rounded-3xl p-6 md:p-8 relative">
             <div className="absolute -top-6 left-8 bg-yellow-400 text-yellow-900 font-bold px-4 py-2 rounded-full shadow-md flex items-center gap-2">
                 <Smile size={18} /> Eva의 꿀팁
             </div>
             <h4 className="mt-2 text-xl font-bold text-gray-800 dark:text-yellow-100 mb-4 brand-font">
                 "데미안님, 이제 어떻게 하면 될까요?"
             </h4>
             <div className="space-y-4 text-gray-700 dark:text-gray-300">
                 <div className="flex gap-4 items-start">
                     <span className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-200 text-yellow-800 flex items-center justify-center font-bold">1</span>
                     <p>위의 <strong>'프롬프트 복사하기'</strong> 버튼을 누르셨나요? 그럼 절반은 성공입니다!</p>
                 </div>
                 <div className="flex gap-4 items-start">
                     <span className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-200 text-yellow-800 flex items-center justify-center font-bold">2</span>
                     <p>
                         <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" className="text-blue-600 underline font-bold inline-flex items-center gap-1">
                             Google AI Studio <ExternalLink size={14}/>
                         </a>
                         에 접속해서 로그인해주세요.
                     </p>
                 </div>
                 <div className="flex gap-4 items-start">
                     <span className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-200 text-yellow-800 flex items-center justify-center font-bold">3</span>
                     <p>채팅창에 <strong>붙여넣기(Ctrl+V)</strong> 하고 엔터를 치면, 마법처럼 앱이 만들어집니다. <br/> <span className="text-sm text-gray-500 dark:text-gray-400">*모바일에서도 동일해요!</span></p>
                 </div>
             </div>
          </section>

      </div>

    </div>
  );
};

export default ResultDisplay;
