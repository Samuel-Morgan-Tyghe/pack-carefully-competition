import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Activity, Skull, Shield, Sword, Eye, Zap, Gem, ChevronDown, Check } from 'lucide-react';
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
    label: "Cursed Forest",
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
    label: "Neon City",
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
    label: "Arctic Base",
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
    label: "Automata",
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
    label: "Phantom Thieves",
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
    label: "Neo Brutalism",
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

function ThemeSwitcher({ current, onChange }: { current: Theme; onChange: (t: Theme) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "flex items-center gap-2 px-4 py-2 rounded-lg font-bold uppercase tracking-wider transition-all min-w-[200px] justify-between",
          current === 'BRUTALIST' ? "bg-white text-black border-4 border-black shadow-[4px_4px_0_black]" :
          current === 'PHANTOM' ? "bg-black text-white -skew-x-12 border border-white" :
          current === 'AUTOMATA' ? "bg-[#cfcbb3] text-[#4a4a4a] border border-[#a8a490]" :
          current === 'CYBER' ? "bg-black text-[#10b981] border border-[#10b981] shadow-[0_0_10px_rgba(16,185,129,0.3)]" :
          "bg-white/10 backdrop-blur text-current border border-white/20 hover:bg-white/20"
        )}
      >
        <span>{themes[current].label}</span>
        <ChevronDown size={16} className={clsx("transition-transform", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className={clsx(
              "absolute top-full mt-2 left-0 w-full overflow-hidden flex flex-col gap-1 p-2 max-h-[60vh] overflow-y-auto",
              current === 'BRUTALIST' ? "bg-white border-4 border-black shadow-[8px_8px_0_black]" :
              current === 'PHANTOM' ? "bg-black border-2 border-white -skew-x-6" :
              current === 'AUTOMATA' ? "bg-[#dcd8c0] border border-[#a8a490]" :
              "bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl"
            )}
          >
            {(Object.keys(themes) as Theme[]).map((t) => (
              <button
                key={t}
                onClick={() => {
                  onChange(t);
                  setIsOpen(false);
                }}
                className={clsx(
                  "px-4 py-3 text-left font-bold uppercase text-sm transition-all flex items-center justify-between group",
                  current === 'BRUTALIST' ? "hover:bg-black hover:text-white" :
                  current === 'PHANTOM' ? "text-white hover:bg-white hover:text-black hover:skew-x-6" :
                  current === 'AUTOMATA' ? "text-[#4a4a4a] hover:bg-[#cfcbb3]" :
                  "text-white/60 hover:text-white hover:bg-white/10 rounded-lg"
                )}
              >
                <span>{themes[t].label}</span>
                {current === t && <Check size={16} className={clsx(current === 'PHANTOM' && "animate-pulse")} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InventoryGrid({ theme }: { theme: Theme }) {
  const currentTheme = themes[theme];
  
  return (
    <div className={clsx(
      "w-full aspect-square relative grid grid-cols-4 grid-rows-4 gap-2 p-4 overflow-hidden transition-all duration-500",
      currentTheme.gridBg,
      currentTheme.container,
      theme === 'PHANTOM' && "rotate-1 scale-95" // Slight default rotation for chaos
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
            "flex flex-col items-center justify-center p-2 cursor-grab active:cursor-grabbing select-none relative z-10 overflow-hidden group",
            currentTheme.itemStyles[item.category],
            // Size mapping
            item.w === 1 && item.h === 3 ? "row-span-3" : "",
            item.w === 2 && item.h === 2 ? "col-span-2 row-span-2" : "",
            theme === 'CURSED' && "border-2",
            theme === 'ARCTIC' && "rounded-lg shadow-sm",
            theme === 'PHANTOM' && "skew-x-0"
          )}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: i * 0.1 }}
          whileHover={{ 
            scale: 1.05, 
            rotate: theme === 'CURSED' ? 2 : theme === 'PHANTOM' ? -5 : 0,
            zIndex: 20
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
            "absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-2 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50 font-bold",
            theme === 'CYBER' ? "bg-black border border-[#10b981] text-[#10b981] shadow-[0_0_20px_rgba(16,185,129,0.5)]" : 
            theme === 'AUTOMATA' ? "bg-[#4a4a4a] text-[#dcd8c0] border border-[#dcd8c0]" :
            theme === 'BRUTALIST' ? "bg-black text-white border-2 border-white shadow-[4px_4px_0_white]" :
            theme === 'PHANTOM' ? "bg-black text-white -skew-x-12 border border-white" :
            "bg-black text-white rounded shadow-xl translate-y-2 group-hover:translate-y-0"
          )}>
            <div className={clsx(theme === 'PHANTOM' && "skew-x-12")}>
              {item.w}x{item.h} // {item.category}
            </div>
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
        initial={{ y: 20, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -20, opacity: 0, scale: 0.9 }}
        className={clsx(
          "max-w-md p-8",
          theme === 'BRUTALIST' && "bg-white border-8 border-black shadow-[20px_20px_0_black]",
          theme === 'PHANTOM' && "bg-black border-4 border-white -skew-x-12 text-white shadow-[10px_10px_0_rgba(255,0,0,0.8)]",
          theme === 'CYBER' && "bg-black/90 border border-red-500 shadow-[0_0_50px_rgba(255,0,0,0.5)]",
          theme === 'AUTOMATA' && "bg-[#dcd8c0] border-2 border-[#8c3a3a] text-[#8c3a3a]"
        )}
      >
        <div className={clsx(theme === 'PHANTOM' && "skew-x-12")}>
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
        </div>
      </motion.div>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState<Theme>('PHANTOM');
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
            <div className="absolute -left-20 top-0 w-[150%] h-full bg-black skew-x-[-10deg] opacity-10 pointer-events-none" />
            <div className="absolute -right-20 bottom-0 w-[150%] h-full bg-black skew-x-[-10deg] opacity-5 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_#cc0000_100%)] opacity-50 pointer-events-none" />
            {/* Star pattern */}
            <div className="absolute top-10 right-10 text-black opacity-20 text-6xl font-black">★</div>
            <div className="absolute bottom-20 left-10 text-black opacity-10 text-8xl font-black rotate-45">★</div>
        </>
      )}
      {theme === 'AUTOMATA' && (
         <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] pointer-events-none" />
      )}

      {/* Header / Switcher */}
      <header className={clsx(
        "z-10 w-full max-w-4xl flex flex-col sm:flex-row justify-between items-center mb-12 p-4 gap-4 transition-all",
        theme === 'BRUTALIST' ? "border-b-8 border-black bg-white" :
        theme === 'PHANTOM' ? "bg-transparent text-white -skew-y-2" :
        theme === 'AUTOMATA' ? "bg-[#cfcbb3] border border-[#a8a490] rounded-sm" :
        "bg-black/10 backdrop-blur-md rounded-full border border-white/10 shadow-xl"
      )}>
        <h1 className={clsx(
            "text-3xl font-black px-4 tracking-tighter", 
            theme === 'PHANTOM' && "bg-black text-white p-2 skew-x-[-10deg] border-2 border-white shadow-[5px_5px_0_rgba(0,0,0,0.5)]",
            theme === 'CYBER' && "text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#ec4899] drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
        )}>
            PACK CAREFULLY
        </h1>
        
        <div className="flex items-center gap-4">
            <ThemeSwitcher current={theme} onChange={setTheme} />
            
            <button 
            onClick={() => setShowTraitor(!showTraitor)}
            className={clsx(
                "p-2 transition-colors relative group",
                showTraitor ? "bg-red-500 text-white" : "hover:bg-black/10",
                theme === 'BRUTALIST' ? "border-4 border-black bg-white hover:bg-black hover:text-white" : "rounded-full"
            )}
            title="Toggle Traitor Event"
            >
            <Eye size={24} />
            {theme === 'CYBER' && <span className="absolute inset-0 rounded-full animate-ping bg-red-500 opacity-20"></span>}
            </button>
        </div>
      </header>

      {/* Main Game Stage */}
      <main className={clsx("z-10 w-full max-w-md relative aspect-[4/5] transition-all duration-500", theme === 'PHANTOM' && "-skew-x-2 rotate-1")}>
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
                theme === 'PHANTOM' ? "bg-black text-white border-4 border-white -skew-x-3 shadow-[8px_8px_0_rgba(200,0,0,0.5)]" :
                theme === 'BRUTALIST' ? "bg-white border-8 border-black shadow-[12px_12px_0_black]" :
                theme === 'AUTOMATA' ? "bg-[#cfcbb3] border border-[#a8a490]" :
                "bg-white border border-slate-100 shadow-lg"
              )}
            >
              <div className={clsx("flex items-center gap-4", theme === 'PHANTOM' && "skew-x-3")}>
                <div className={clsx(
                    "w-12 h-12 flex items-center justify-center font-bold text-xl", 
                    currentTheme.accent, 
                    theme === 'ARCTIC' && "text-white",
                    theme === 'BRUTALIST' ? "rounded-none border-2 border-white" : "rounded-full"
                )}>
                  P1
                </div>
                <div>
                  <div className="text-xs opacity-60 uppercase tracking-widest font-bold">Condition</div>
                  <div className="font-bold text-lg">OPTIMAL</div>
                </div>
              </div>
              <div className={clsx("text-right", theme === 'PHANTOM' && "skew-x-3")}>
                <div className="text-xs opacity-60 uppercase tracking-widest font-bold">Morale</div>
                <div className="font-bold text-2xl">100%</div>
              </div>
            </motion.div>

            {/* The Grid */}
            <InventoryGrid theme={theme} />

            {/* Action Bar */}
            <div className={clsx("grid grid-cols-2 gap-4 mt-auto", theme === 'PHANTOM' && "gap-6")}>
               <button className={clsx(
                 "py-4 font-black uppercase tracking-widest text-lg transition-all active:scale-95",
                 currentTheme.container,
                 theme === 'CURSED' ? "bg-[#f59e0b] text-[#4a3627] shadow-[4px_4px_0_rgba(0,0,0,0.5)] border-2 border-[#4a3627]" :
                 theme === 'CYBER' ? "bg-transparent border border-[#10b981] text-[#10b981] hover:bg-[#10b981]/10 shadow-[0_0_10px_#10b981]" :
                 theme === 'PHANTOM' ? "bg-white text-black border-4 border-black hover:bg-black hover:text-white skew-y-[-2deg] shadow-[5px_5px_0_black]" :
                 theme === 'BRUTALIST' ? "bg-black text-white border-4 border-black hover:bg-white hover:text-black shadow-[8px_8px_0_black]" :
                 theme === 'AUTOMATA' ? "bg-[#4a4a4a] text-[#dcd8c0] border border-[#4a4a4a] hover:bg-[#333]" :
                 "bg-black text-white hover:bg-slate-800"
               )}>
                 <span className={clsx("block", theme === 'PHANTOM' && "skew-y-[2deg]")}>Scavenge</span>
               </button>
               <button className={clsx(
                 "py-4 font-black uppercase tracking-widest text-lg transition-all active:scale-95 opacity-80 hover:opacity-100",
                 currentTheme.container,
                 theme === 'CURSED' ? "bg-[#4a3627] text-[#fef3c7] border-2 border-[#f59e0b]" :
                 theme === 'CYBER' ? "bg-transparent border border-[#ec4899] text-[#ec4899] hover:bg-[#ec4899]/10" :
                 theme === 'PHANTOM' ? "bg-black text-white border-4 border-white hover:bg-white hover:text-black skew-y-[2deg] shadow-[5px_5px_0_white]" :
                 theme === 'BRUTALIST' ? "bg-white text-black border-4 border-black shadow-[8px_8px_0_black]" :
                 theme === 'AUTOMATA' ? "bg-[#cfcbb3] text-[#4a4a4a] border border-[#a8a490] hover:bg-[#c4c0a8]" :
                 "bg-slate-100 text-slate-900"
               )}>
                 <span className={clsx("block", theme === 'PHANTOM' && "skew-y-[-2deg]")}>Rest</span>
               </button>
            </div>
        </div>
      </main>

    </div>
  );
}

export default App;