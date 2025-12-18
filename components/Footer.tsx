
import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 mt-12 border-t border-purple-100 dark:border-slate-800 bg-white/40 dark:bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-gray-500 dark:text-gray-400 font-medium flex items-center gap-1.5 text-base">
            Made with <Heart className="w-4 h-4 text-red-400 fill-current animate-pulse" /> by
            </p>
            <p className="text-2xl font-black brand-font text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:scale-105 transition-transform cursor-default">
            Demian 임정훈
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 font-mono">
            Eva v2.0 • AI App Builder
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
