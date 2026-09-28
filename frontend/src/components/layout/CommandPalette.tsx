"use client";

import React, { useEffect, useState } from 'react';
import { useUIStore } from '@/stores/uiStore';
import { Search, Terminal, Zap, ShieldAlert, Crosshair, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommandPaletteProps {
  onNavigate: (route: string) => void;
}

export function CommandPalette({ onNavigate }: CommandPaletteProps) {
  const { isCommandPaletteOpen, setCommandPaletteOpen } = useUIStore();
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!isCommandPaletteOpen);
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const handleExecute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setIsProcessing(true);
    
    // Simulate AI parsing the command
    setTimeout(() => {
      setIsProcessing(false);
      setCommandPaletteOpen(false);
      setQuery('');
      
      // If it looks like a transform command, go to new target
      if (query.toLowerCase().includes('generate') || query.toLowerCase().includes('process')) {
        onNavigate('/transform/new');
      } else {
        onNavigate('/dashboard');
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-32 bg-stone-950/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, y: -20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        className="w-full max-w-2xl bg-stone-950 border-2 border-stone-800 shadow-[8px_8px_0px_0px_rgba(234,88,12,0.2)]"
      >
        <form onSubmit={handleExecute} className="flex items-center p-4 border-b-2 border-stone-800 bg-stone-900">
          <Terminal className="h-5 w-5 text-orange-600 mr-4 shrink-0" />
          <input
            type="text"
            placeholder="> Enter command or NLP directive..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent py-2 font-mono text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none uppercase tracking-wider"
            autoFocus
            disabled={isProcessing}
          />
          <kbd className="hidden sm:inline-flex items-center px-2 py-1 bg-stone-800 text-[10px] font-tech text-stone-400 ml-4 border border-stone-700">
            ENTER
          </kbd>
        </form>

        <div className="p-4 bg-stone-950">
           {isProcessing ? (
              <div className="flex flex-col items-center justify-center py-8">
                 <div className="w-48 h-1 bg-stone-800 mb-4 overflow-hidden">
                    <motion.div 
                      className="h-full bg-orange-600"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8 }}
                    />
                 </div>
                 <span className="text-[10px] font-mono text-orange-500 animate-pulse">PARSING NLP DIRECTIVE...</span>
              </div>
           ) : query ? (
              <div className="py-4">
                 <div className="text-[10px] font-tech text-stone-500 uppercase mb-4 tracking-widest">Detected Intent</div>
                 <button type="submit" onClick={handleExecute} className="w-full flex items-center justify-between p-4 bg-stone-900 border border-stone-800 hover:border-orange-600 group transition-colors text-left">
                    <div className="flex items-center space-x-4">
                       <Zap className="h-5 w-5 text-stone-600 group-hover:text-orange-500" />
                       <div>
                         <div className="text-xs font-bold text-stone-200 uppercase tracking-widest">Execute Autonomous Action</div>
                         <div className="text-[10px] font-mono text-stone-500">Run '{query}' against Global Matrix</div>
                       </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-stone-700 group-hover:text-orange-500" />
                 </button>
              </div>
           ) : (
              <div>
                 <div className="text-[10px] font-tech text-stone-600 uppercase mb-4 tracking-widest">Suggested Directives</div>
                 <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setQuery("Generate CISO Briefing from active logs")} className="p-3 text-left bg-stone-900 border border-stone-800 hover:border-stone-600 flex items-center group">
                       <ShieldAlert className="h-4 w-4 mr-3 text-stone-600 group-hover:text-orange-500" />
                       <span className="text-[10px] font-mono text-stone-400 group-hover:text-stone-200">Generate CISO Briefing...</span>
                    </button>
                    <button onClick={() => setQuery("Target Payload ID 993-ALPHA")} className="p-3 text-left bg-stone-900 border border-stone-800 hover:border-stone-600 flex items-center group">
                       <Crosshair className="h-4 w-4 mr-3 text-stone-600 group-hover:text-orange-500" />
                       <span className="text-[10px] font-mono text-stone-400 group-hover:text-stone-200">Target Payload 993...</span>
                    </button>
                 </div>
              </div>
           )}
        </div>
      </motion.div>
    </div>
  );
}
