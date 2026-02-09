import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Activity, Skull, Shield, Sword, Eye, Box, Zap, Gem, Ghost } from 'lucide-react';
import clsx from 'clsx';

type Theme = 'CURSED' | 'CYBER' | 'ARCTIC' | 'AUTOMATA' | 'PHANTOM' | 'BRUTALIST';

// --- Global Types ---
interface Item {
  id: string;
  name: string;
  category: 'WEAPON' | 'POTION' | 'SCROLL' | 'JUNK' | 'TECH' | 'RELIC';
  icon: React.ReactNode;
  w: number;
  h: number;
}

const ITEMS: Item[] = [
  { id: 'sword', name: 'Iron Sword', category: 'WEAPON', icon: <Sword size={24} />, w: 1, h: 3 },
  { id: 'potion', name: 'Health Potion', category: 'POTION', icon: <Activity size={24} />, w: 1, h: 1 },
  { id: 'scroll', name: 'Fire Scroll', category: 'SCROLL', icon: <Flame size={24} />, w: 2, h: 2 },
  { id: 'junk', name: 'Heavy Rock', category: 'JUNK', icon: <Shield size={24} />, w: 2, h: 2 },
  { id: 'chip', name: 'Data Chip', category: 'TECH', icon: <Zap size={24} />, w: 1, h: 1 },
  { id: 'relic', name: 'Ancient Core', category: 'RELIC', icon: <Gem size={24} />, w: 1, h: 1 },
];

// --- Theme Configurations ---
const themes = {
  CURSED: {
    bg: 'bg-[#1e293b]',
    text: 'text-[#fef3c7]',
    font: 'font-serif',
    accent: 'bg-[#f59e0b]',
    danger: 'bg-[#ef4444]',
    gridBg: 'bg-[#4a3627]',
    container: 'rounded-lg',
    itemStyles: {
      WEAPON: 'bg-stone-600 border-stone-800 shadow-md rounded-sm',
      POTION: 'bg-red-900/80 border-red-950 backdrop-blur-sm rounded-full',
      SCROLL: 'bg-amber-100 text-amber-900 border-amber-300 transform rotate-1 rounded-sm',
      JUNK: 'bg-stone-500 border-stone-700 grayscale rounded-sm',
      TECH: 'bg-stone-800 text-stone-400 rounded-sm',
      RELIC: 'bg-purple-900/50 text-purple-200 border border-purple-500 rounded-full',
    },
    traitorOverlay: 'bg-black/80 backdrop-sepia',
  },
  CYBER: {
    bg: 'bg-[#0f172a]',
    text: 'text-[#10b981]',
    font: 'font-mono',
    accent: 'bg-[#ec4899]',
    danger: 'bg-[#ef4444]',
    gridBg: 'bg-[#1e293b] border border-[#10b981]/20',
    container: 'rounded-none',
    itemStyles: {
      WEAPON: 'bg-[#10b981]/20 border border-[#10b981] shadow-[0_0_10px_#10b981]',
      POTION: 'bg-[#ec4899]/20 border border-[#ec4899] shadow-[0_0_10px_#ec4899]',
      SCROLL: 'bg-cyan-500/20 border border-cyan-500 shadow-[0_0_10px_cyan]',
      JUNK: 'bg-slate-700/50 border border-slate-600 opacity-50',
      TECH: 'bg-yellow-400/20 border border-yellow-400 text-yellow-400',
      RELIC: 'bg-violet-500/20 border border-violet-500 text-violet-400 animate-pulse',
    },
    traitorOverlay: 'bg-red-900/20 backdrop-blur-md border-2 border-red-500 animate-pulse',
  },
  ARCTIC: {
    bg: 'bg-[#f8fafc]',
    text: 'text-[#0f172a]',
    font: 'font-sans',
    accent: 'bg-[#3b82f6]',
    danger: 'bg-[#ef4444]',
    gridBg: 'bg-white border border-slate-200 shadow-sm',
    container: 'rounded-xl',
    itemStyles: {
      WEAPON: 'bg-slate-100 border border-slate-300 text-slate-600 hover:bg-slate-50 transition-colors',
      POTION: 'bg-red-50 border border-red-100 text-red-600',
      SCROLL: 'bg-amber-50 border border-amber-100 text-amber-600',
      JUNK: 'bg-gray-200 text-gray-400',
      TECH: 'bg-blue-50 text-blue-600 border border-blue-100',
      RELIC: 'bg-indigo-50 text-indigo-600 border border-indigo-100',
    },
    traitorOverlay: 'bg-white/90 backdrop-grayscale',
  },
  AUTOMATA: {
    bg: 'bg-[#dcd8c0]',
    text: 'text-[#4a4a4a]',
    font: 'font-mono tracking-wider',
    accent: 'bg-[#4a4a4a]',
    danger: 'bg-[#8c3a3a]',
    gridBg: 'bg-[#dcd8c0] border-2 border-[#b8b4a0] shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]',
    container: 'rounded-none',
    itemStyles: {
      WEAPON: 'bg-[#cfcbb3] border border-[#a8a490] text-[#2a2a2a] hover:bg-[#c4c0a8]',
      POTION: 'bg-[#cfcbb3] border border-[#a8a490] text-[#2a2a2a]',
      SCROLL: 'bg-[#cfcbb3] border border-[#a8a490] text-[#2a2a2a]',
      JUNK: 'bg-[#b8b4a0] text-[#8c8874] border border-[#a8a490]',
      TECH: 'bg-[#cfcbb3] border border-[#a8a490] text-[#2a2a2a]',
      RELIC: 'bg-[#cfcbb3] border border-[#a8a490] text-[#2a2a2a]',
    },
    traitorOverlay: 'bg-[#dcd8c0]/95 mix-blend-multiply',
  },
  PHANTOM: {
    bg: 'bg-[#cc0000]',
    text: 'text-white',
    font: 'font-sans font-black italic tracking-tighter',
    accent: 'bg-black',
    danger: 'bg-white text-black',
    gridBg: 'bg-black border-4 border-white shadow-[10px_10px_0_rgba(0,0,0,0.5)] transform -skew-x-6',
    container: 'rounded-none',
    itemStyles: {
      WEAPON: 'bg-white text-black border-2 border-black hover:invert transition-all',
      POTION: 'bg-black text-white border-2 border-white',
      SCROLL: 'bg-yellow-400 text-black border-2 border-black',
      JUNK: 'bg-gray-800 text-gray-500 border-2 border-gray-600',
      TECH: 'bg-cyan-400 text-black border-2 border-black',
      RELIC: 'bg-purple-600 text-white border-2 border-white',
    },
    traitorOverlay: 'bg-black/90 clip-path-polygon',
  },
  BRUTALIST: {
    bg: 'bg-white',
    text: 'text-black',
    font: 'font-sans font-black tracking-tighter',
    accent: 'bg-black text-white',
    danger: 'bg-black text-red-500',
    gridBg: 'bg-transparent border-8 border-black shadow-[20px_20px_0_rgba(0,0,0,1)]',
    container: 'rounded-none',
    itemStyles: {
      WEAPON: 'bg-black text-white border-2 border-white hover:bg-neutral-800',
      POTION: 'bg-white text-black border-4 border-black',
      SCROLL: 'bg-neutral-200 text-black border-4 border-black',
      JUNK: 'bg-neutral-100 text-neutral-400 border-4 border-neutral-300',
      TECH: 'bg-blue-600 text-white border-4 border-black',
      RELIC: 'bg-red-600 text-white border-4 border-black',
    },
    traitorOverlay: 'bg-white text-black border-8 border-black p-12',
  },
};

// --- Components ---

function InventoryGrid({ theme }: { theme: Theme }) {
  const currentTheme = themes[theme];
  
  return (
    <div className={clsx(
      "w-full aspect-square relative grid grid-cols-4 grid-rows-4 gap-2 p-4 overflow-hidden transition-all duration-500",
      currentTheme.gridBg,
      currentTheme.container
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
      
      {/* Scanlines (Automata Only) */}
      {theme === 'AUTOMATA' && (
         <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none z-20" />
      )}

      {/* Items */}
      {ITEMS.map((item, i) => (
        <motion.div
          key={item.id}
          layoutId={`item-${item.id}`}
          className={clsx(
            "flex flex-col items-center justify-center p-2 cursor-grab active:cursor-grabbing select-none relative z-10 overflow-hidden",
            currentTheme.itemStyles[item.category],
            // Size mapping
            item.w === 1 && item.h === 3 ? "row-span-3" : "",
            item.w === 2 && item.h === 2 ? "col-span-2 row-span-2" : "",
            theme === 'CURSED' && "border-2",
            theme === 'ARCTIC' && "rounded-lg shadow-sm",
            theme === 'PHANTOM' && "skew-x-0" // Reset skew for content?
          )}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: i * 0.1 }}
          whileHover={{ 
            scale: 1.05, 
            rotate: theme === 'CURSED' ? 2 : theme === 'PHANTOM' ? -5 : 0 
          }}
          whileTap={{ scale: 0.95 }}
        >
          {theme === 'PHANTOM' ? (
             <div className="transform skew-x-6 flex flex-col items-center">
                {item.icon}
                <span className="text-[10px] mt-1 font-bold tracking-wider opacity-80 uppercase text-center leading-tight">
                    {item.name}
                </span>
             </div>
          ) : (
            <>
                {item.icon}
                <span className="text-[10px] mt-1 font-bold tracking-wider opacity-80 uppercase text-center leading-tight">
                    {item.name}
                </span>
            </>
          )}
          
          {/* Tooltip Effect */}
          <div className={clsx(
            "absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none z-50",
            theme === 'CYBER' ? "bg-black border border-[#10b981] text-[#10b981]" : 
            theme === 'AUTOMATA' ? "bg-[#4a4a4a] text-[#dcd8c0]" :
            "bg-black text-white rounded"
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
        <Skull size={64} className={clsx("mb-4 mx-auto", 
            theme === 'CYBER' ? "text-red-500 animate-pulse" : 
            theme === 'BRUTALIST' ? "text-black w-32 h-32" :
            "text-current"
        )} />
        <h2 className={clsx("text-4xl mb-2 font-bold uppercase", theme === 'CYBER' && "glitch-text")}>
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
      "min-h-screen w-full flex flex-col items-center justify-center p-4 transition-colors duration-700 relative overflow-hidden",
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
      {theme === 'PHANTOM' && (
        <>
            <div className="absolute -left-20 top-0 w-[50%] h-full bg-black skew-x-[-10deg] opacity-10 pointer-events-none" />
            <div className="absolute -right-20 bottom-0 w-[30%] h-full bg-black skew-x-[-10deg] opacity-5 pointer-events-none" />
            {/* Star pattern */}
            <div className="absolute top-10 right-10 text-black opacity-20">★ ★ ★</div>
        </>
      )}
      {theme === 'AUTOMATA' && (
         <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] pointer-events-none" />
      )}

      {/* Header / Switcher */}
      <header className={clsx(
        "z-10 w-full max-w-4xl flex flex-col sm:flex-row justify-between items-center mb-12 p-4 gap-4 transition-all",
        theme === 'BRUTALIST' ? "border-b-4 border-black bg-white" :
        theme === 'PHANTOM' ? "bg-black text-white -skew-x-6 border-b-4 border-white" :
        theme === 'AUTOMATA' ? "bg-[#cfcbb3] border border-[#a8a490] rounded-sm" :
        "bg-black/10 backdrop-blur-md rounded-full border border-white/10 shadow-xl"
      )}>
        <h1 className={clsx("text-2xl font-bold px-4", theme === 'PHANTOM' && "skew-x-6")}>
            PACK CAREFULLY
        </h1>
        
        <div className={clsx("flex flex-wrap justify-center gap-2", theme === 'PHANTOM' && "skew-x-6")}>
          {(Object.keys(themes) as Theme[]).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={clsx(
                "px-3 py-1 text-xs sm:text-sm font-bold transition-all uppercase",
                theme === t 
                  ? (theme === 'BRUTALIST' ? "bg-black text-white" : 
                     theme === 'PHANTOM' ? "bg-white text-black" :
                     theme === 'AUTOMATA' ? "bg-[#4a4a4a] text-[#dcd8c0]" :
                     "bg-white text-black shadow-lg scale-105 rounded-full") 
                  : "bg-transparent opacity-60 hover:opacity-100"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <button 
          onClick={() => setShowTraitor(!showTraitor)}
          className={clsx(
            "p-2 transition-colors",
            showTraitor ? "bg-red-500 text-white" : "hover:bg-black/10",
            theme === 'BRUTALIST' ? "border-2 border-black" : "rounded-full"
          )}
          title="Toggle Traitor Event"
        >
          <Eye size={20} />
        </button>
      </header>

      {/* Main Game Stage */}
      <main className={clsx("z-10 w-full max-w-md relative aspect-[4/5]", theme === 'PHANTOM' && "-skew-x-3")}>
        <AnimatePresence mode="wait">
          {showTraitor && <TraitorAlert key="traitor" theme={theme} />}
        </AnimatePresence>

        <div className="w-full h-full flex flex-col gap-4">
            {/* Player Status Card */}
            <motion.div 
              layout 
              className={clsx(
                "p-4 flex items-center justify-between transition-all",
                currentTheme.container,
                theme === 'CURSED' ? "bg-[#4a3627] border-2 border-[#f59e0b] shadow-lg" :
                theme === 'CYBER' ? "bg-[#0f172a]/80 border border-[#10b981] shadow-[0_0_15px_rgba(16,185,129,0.2)] backdrop-blur-sm" :
                theme === 'PHANTOM' ? "bg-black text-white border-2 border-white -skew-x-3" :
                theme === 'BRUTALIST' ? "bg-white border-4 border-black shadow-[8px_8px_0_black]" :
                theme === 'AUTOMATA' ? "bg-[#cfcbb3] border border-[#a8a490]" :
                "bg-white border border-slate-100 shadow-lg"
              )}
            >
              <div className={clsx("flex items-center gap-3", theme === 'PHANTOM' && "skew-x-3")}>
                <div className={clsx(
                    "w-10 h-10 flex items-center justify-center font-bold", 
                    currentTheme.accent, 
                    theme === 'ARCTIC' && "text-white",
                    theme === 'BRUTALIST' ? "rounded-none" : "rounded-full"
                )}>
                  P1
                </div>
                <div>
                  <div className="text-xs opacity-60 uppercase tracking-widest">Status</div>
                  <div className="font-bold">HEALTHY</div>
                </div>
              </div>
              <div className={clsx("text-right", theme === 'PHANTOM' && "skew-x-3")}>
                <div className="text-xs opacity-60 uppercase tracking-widest">Morale</div>
                <div className="font-bold text-xl">100%</div>
              </div>
            </motion.div>

            {/* The Grid */}
            <InventoryGrid theme={theme} />

            {/* Action Bar */}
            <div className={clsx("grid grid-cols-2 gap-4 mt-auto", theme === 'PHANTOM' && "gap-6")}>
               <button className={clsx(
                 "py-4 font-bold uppercase tracking-wider transition-all active:scale-95",
                 currentTheme.container,
                 theme === 'CURSED' ? "bg-[#f59e0b] text-[#4a3627] shadow-[4px_4px_0_rgba(0,0,0,0.5)] border-2 border-[#4a3627]" :
                 theme === 'CYBER' ? "bg-transparent border border-[#10b981] text-[#10b981] hover:bg-[#10b981]/10 shadow-[0_0_10px_#10b981]" :
                 theme === 'PHANTOM' ? "bg-black text-white border-2 border-white hover:bg-white hover:text-black skew-x-[-10deg]" :
                 theme === 'BRUTALIST' ? "bg-black text-white border-4 border-black hover:bg-white hover:text-black shadow-[8px_8px_0_black]" :
                 theme === 'AUTOMATA' ? "bg-[#4a4a4a] text-[#dcd8c0] border border-[#4a4a4a] hover:bg-[#333]" :
                 "bg-black text-white hover:bg-slate-800"
               )}>
                 <span className={clsx("block", theme === 'PHANTOM' && "skew-x-[10deg]")}>Scavenge</span>
               </button>
               <button className={clsx(
                 "py-4 font-bold uppercase tracking-wider transition-all active:scale-95 opacity-80 hover:opacity-100",
                 currentTheme.container,
                 theme === 'CURSED' ? "bg-[#4a3627] text-[#fef3c7] border-2 border-[#f59e0b]" :
                 theme === 'CYBER' ? "bg-transparent border border-[#ec4899] text-[#ec4899] hover:bg-[#ec4899]/10" :
                 theme === 'PHANTOM' ? "bg-white text-black border-2 border-black hover:bg-black hover:text-white skew-x-[-10deg]" :
                 theme === 'BRUTALIST' ? "bg-white text-black border-4 border-black shadow-[8px_8px_0_black]" :
                 theme === 'AUTOMATA' ? "bg-[#cfcbb3] text-[#4a4a4a] border border-[#a8a490] hover:bg-[#c4c0a8]" :
                 "bg-slate-100 text-slate-900"
               )}>
                 <span className={clsx("block", theme === 'PHANTOM' && "skew-x-[10deg]")}>Rest</span>
               </button>
            </div>
        </div>
      </main>

    </div>
  );
}

export default App;