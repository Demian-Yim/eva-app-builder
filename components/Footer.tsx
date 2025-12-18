
import React from 'react';
import { Heart, Github, Linkedin, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-16 mt-20 border-t border-slate-200 dark:border-slate-800 bg-white/30 dark:bg-slate-950/30 backdrop-blur-3xl relative overflow-hidden">
      {/* Decorative background blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 dark:bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center gap-8">
            <div className="text-center space-y-4">
                <p className="text-slate-400 dark:text-slate-500 font-black tracking-[0.2em] text-xs uppercase">
                    Innovating the Future
                </p>
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                    <span className="text-slate-400 dark:text-slate-500 font-medium">Developed by</span>
                    <h2 className="text-4xl md:text-5xl font-black brand-font text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-orange-400 hover:scale-105 transition-transform cursor-pointer drop-shadow-sm">
                        Demian 임정훈
                    </h2>
                </div>
            </div>

            <div className="flex gap-6">
                <div className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center text-slate-400 hover:text-indigo-500 hover:scale-110 transition-all cursor-pointer border border-slate-100 dark:border-slate-700">
                    <Linkedin size={20} />
                </div>
                <div className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center text-slate-400 hover:text-pink-500 hover:scale-110 transition-all cursor-pointer border border-slate-100 dark:border-slate-700">
                    <Github size={20} />
                </div>
                <div className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center text-slate-400 hover:text-amber-500 hover:scale-110 transition-all cursor-pointer border border-slate-100 dark:border-slate-700">
                    <ExternalLink size={20} />
                </div>
            </div>

            <div className="text-center space-y-2">
                <p className="text-slate-500 dark:text-slate-400 font-bold flex items-center justify-center gap-2 text-sm">
                    Made with <Heart className="w-4 h-4 text-pink-500 fill-current animate-pulse" /> for Creative Minds
                </p>
                <p className="text-[10px] text-slate-400 dark:text-slate-600 font-mono tracking-widest uppercase">
                    © 2025 Eva Creative Studio • Powered by Demian
                </p>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
