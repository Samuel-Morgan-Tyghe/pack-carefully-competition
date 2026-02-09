import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Activity, Skull, Shield, Sword, Eye } from 'lucide-react';
import clsx from 'clsx';

type Theme = 'CURSED' | 'CYBER' | 'ARCTIC';

// --- Global Types ---
interface Item {
  id: string;
  name: string;
  category: 'WEAPON' | 'POTION' | 'SCROLL' | 'JUNK';
  icon: React.ReactNode;
  w: number;
  h: number;
}

const ITEMS: Item[] = [
  { id: 'sword', name: 'Iron Sword', category: 'WEAPON', icon: <Sword size={24} />, w: 1, h: 3 },
  { id: 'potion', name: 'Health Potion', category: 'POTION', icon: <Activity size={24} />, w: 1, h: 1 },
  { id: 'scroll', name: 'Fire Scroll', category: 'SCROLL', icon: <Flame size={24} />, w: 2, h: 2 },
  { id: 'junk', name: 'Heavy Rock', category: 'JUNK', icon: <Shield size={24} />, w: 2, h: 2 },
];

// --- Theme Configurations ---
const themes = {
  CURSED: {
    bg: 'bg-[#1e293b]',
    text: 'text-[#fef3c7]',
    font: 'font-cursed',
    accent: 'bg-[#f59e0b]',
    danger: 'bg-[#ef4444]',
    gridBg: 'bg-[#4a3627]',
    itemStyles: {
      WEAPON: 'bg-stone-600 border-stone-800 shadow-md rounded-sm',
      POTION: 'bg-red-900/80 border-red-950 backdrop-blur-sm rounded-full',
      SCROLL: 'bg-amber-100 text-amber-900 border-amber-300 transform rotate-1 rounded-sm',
      JUNK: 'bg-stone-500 border-stone-700 grayscale rounded-sm',
    },
    traitorOverlay: 'bg-black/80 backdrop-sepia',
  },
  CYBER: {
    bg: 'bg-[#0f172a]',
    text: 'text-[#10b981]',
    font: 'font-cyber',
    accent: 'bg-[#ec4899]',
    danger: 'bg-[#ef4444]',
    gridBg: 'bg-[#1e293b] border border-[#10b981]/20',
    itemStyles: {
      WEAPON: 'bg-[#10b981]/20 border border-[#10b981] shadow-[0_0_10px_#10b981]',
      POTION: 'bg-[#ec4899]/20 border border-[#ec4899] shadow-[0_0_10px_#ec4899]',
      SCROLL: 'bg-cyan-500/20 border border-cyan-500 shadow-[0_0_10px_cyan]',
      JUNK: 'bg-slate-700/50 border border-slate-600 opacity-50',
    },
    traitorOverlay: 'bg-red-900/20 backdrop-blur-md border-2 border-red-500 animate-pulse',
  },
  ARCTIC: {
    bg: 'bg-[#f8fafc]',
    text: 'text-[#0f172a]',
    font: 'font-arctic',
    accent: 'bg-[#3b82f6]',
    danger: 'bg-[#ef4444]',
    gridBg: 'bg-white border border-slate-200 shadow-sm',
    itemStyles: {
      WEAPON: 'bg-slate-100 border border-slate-300 text-slate-600 hover:bg-slate-50 transition-colors',
      POTION: 'bg-red-50 border border-red-100 text-red-600',
      SCROLL: 'bg-amber-50 border border-amber-100 text-amber-600',
      JUNK: 'bg-gray-200 text-gray-400',
    },
    traitorOverlay: 'bg-white/90 backdrop-grayscale',
  },
};

// --- Components ---

function InventoryGrid({ theme }: { theme: Theme }) {
  const currentTheme = themes[theme];
  
  return (
    <div className={clsx(
      "w-full aspect-square relative grid grid-cols-4 grid-rows-4 gap-1 p-4 rounded-lg overflow-hidden transition-all duration-500",
      currentTheme.gridBg
    )}>
      {/* Background Grid Lines (Cyber Only) */}
      {theme === 'CYBER' && (
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 pointer-events-none opacity-20">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="border border-[#10b981]" />
          ))}
        </div>
      )}
      
      {/* Background Noise (Cursed Only) */}
      {theme === 'CURSED' && (
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-10 mix-blend-overlay pointer-events-none" />
      )}

      {/* Items */}
      {ITEMS.map((item, i) => (
        <motion.div
          key={item.id}
          layoutId={`item-${item.id}`}
          className={clsx(
            "flex flex-col items-center justify-center p-2 cursor-grab active:cursor-grabbing select-none relative z-10",
            currentTheme.itemStyles[item.category],
            // Size mapping (simplified for demo)
            item.w === 1 && item.h === 3 ? "row-span-3" : "",
            item.w === 2 && item.h === 2 ? "col-span-2 row-span-2" : "",
            theme === 'CURSED' && "border-2",
            theme === 'ARCTIC' && "rounded-lg shadow-sm"
          )}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: i * 0.1 }}
          whileHover={{ scale: 1.05, rotate: theme === 'CURSED' ? 2 : 0 }}
          whileTap={{ scale: 0.95 }}
        >
          {item.icon}
          <span className="text-[10px] mt-1 font-bold tracking-wider opacity-80 uppercase text-center leading-tight">
            {item.name}
          </span>
          
          {/* Tooltip Effect */}
          <div className={clsx(
            "absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none",
            theme === 'CYBER' ? "bg-black border border-[#10b981] text-[#10b981]" : "bg-black text-white rounded"
          )}>
            {item.w}x{item.h} // {item.category}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function TraitorAlert({ theme }: { theme: Theme }) {
  const currentTheme = themes[theme];
  
  return (
    <div className={clsx(
      "absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-50 pointer-events-none",
      currentTheme.traitorOverlay
    )}>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        className="max-w-md"
      >
        <Skull size={64} className={clsx("mb-4 mx-auto", theme === 'CYBER' ? "text-red-500 animate-pulse" : "text-current")} />
        <h2 className={clsx("text-4xl mb-2 font-bold", theme === 'CYBER' && "glitch-text")}>
          TRAITOR DETECTED
        </h2>
        <p className="opacity-80 text-lg">
          Someone has sabotaged the supplies. Trust no one.
        </p>
      </motion.div>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState<Theme>('CURSED');
  const [showTraitor, setShowTraitor] = useState(false);

  const currentTheme = themes[theme];

  return (
    <div className={clsx(
      "min-h-screen w-full flex flex-col items-center justify-center p-4 transition-colors duration-700 relative overflow-hidden font-sans",
      currentTheme.bg,
      currentTheme.text,
      currentTheme.font
    )}>
      
      {/* Background Effects */}
      {theme === 'CURSED' && (
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-20 mix-blend-overlay pointer-events-none" />
      )}
      {theme === 'CYBER' && (
         <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_4px,6px_100%]" />
      )}

      {/* Header / Switcher */}
      <header className="z-10 w-full max-w-2xl flex justify-between items-center mb-12 bg-black/10 backdrop-blur-md p-4 rounded-full border border-white/10 shadow-xl">
        <h1 className="text-xl font-bold px-4 hidden sm:block">PACK CAREFULLY</h1>
        
        <div className="flex gap-2">
          {(['CURSED', 'CYBER', 'ARCTIC'] as Theme[]).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={clsx(
                "px-4 py-2 rounded-full text-sm font-bold transition-all",
                theme === t 
                  ? "bg-white text-black shadow-lg scale-105" 
                  : "bg-transparent hover:bg-white/10 text-current opacity-60 hover:opacity-100"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <button 
          onClick={() => setShowTraitor(!showTraitor)}
          className={clsx(
            "p-2 rounded-full transition-colors",
            showTraitor ? "bg-red-500 text-white" : "bg-white/10 hover:bg-white/20"
          )}
          title="Toggle Traitor Event"
        >
          <Eye size={20} />
        </button>
      </header>

      {/* Main Game Stage */}
      <main className="z-10 w-full max-w-md relative aspect-[4/5]">
        <AnimatePresence mode="wait">
          {showTraitor && <TraitorAlert key="traitor" theme={theme} />}
        </AnimatePresence>

        <div className="w-full h-full flex flex-col gap-4">
            {/* Player Status Card */}
            <motion.div 
              layout 
              className={clsx(
                "p-4 rounded-xl flex items-center justify-between shadow-lg backdrop-blur-sm",
                theme === 'CURSED' ? "bg-[#4a3627] border-2 border-[#f59e0b]" :
                theme === 'CYBER' ? "bg-[#0f172a]/80 border border-[#10b981] shadow-[0_0_15px_rgba(16,185,129,0.2)]" :
                "bg-white border border-slate-100"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center font-bold", currentTheme.accent, theme === 'ARCTIC' && "text-white")}>
                  P1
                </div>
                <div>
                  <div className="text-xs opacity-60 uppercase tracking-widest">Status</div>
                  <div className="font-bold">HEALTHY</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs opacity-60 uppercase tracking-widest">Morale</div>
                <div className="font-bold text-xl">100%</div>
              </div>
            </motion.div>

            {/* The Grid */}
            <InventoryGrid theme={theme} />

            {/* Action Bar */}
            <div className="grid grid-cols-2 gap-4 mt-auto">
               <button className={clsx(
                 "py-4 rounded-xl font-bold uppercase tracking-wider transition-all active:scale-95",
                 theme === 'CURSED' ? "bg-[#f59e0b] text-[#4a3627] shadow-[4px_4px_0_rgba(0,0,0,0.5)] border-2 border-[#4a3627]" :
                 theme === 'CYBER' ? "bg-transparent border border-[#10b981] text-[#10b981] hover:bg-[#10b981]/10 shadow-[0_0_10px_#10b981]" :
                 "bg-black text-white hover:bg-slate-800"
               )}>
                 Scavenge
               </button>
               <button className={clsx(
                 "py-4 rounded-xl font-bold uppercase tracking-wider transition-all active:scale-95 opacity-80 hover:opacity-100",
                 theme === 'CURSED' ? "bg-[#4a3627] text-[#fef3c7] border-2 border-[#f59e0b]" :
                 theme === 'CYBER' ? "bg-transparent border border-[#ec4899] text-[#ec4899] hover:bg-[#ec4899]/10" :
                 "bg-slate-100 text-slate-900"
               )}>
                 Rest
               </button>
            </div>
        </div>
      </main>

    </div>
  );
}

export default App;
