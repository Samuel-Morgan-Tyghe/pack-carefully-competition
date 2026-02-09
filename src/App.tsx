import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Activity, Skull, Shield, Sword, Eye, Zap, Gem, ChevronDown, Check } from 'lucide-react';
import clsx from 'clsx';

type Theme = 'CURSED' | 'CYBER' | 'ARCTIC' | 'AUTOMATA' | 'PHANTOM' | 'BRUTALIST' | 'VAPOR' | 'NOIR' | 'PAPER' | 'TERMINAL' | 'CANDY' | 'STEAM' | 'GLASS' | 'MIDNIGHT' | 'ROYAL' | 'WIREFRAME';

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
  VAPOR: {
    label: "Vaporwave",
    bg: 'bg-gradient-to-br from-[#ff71ce] via-[#01cdfe] to-[#05ffa1]',
    text: 'text-white drop-shadow-md',
    font: 'font-serif italic tracking-widest',
    accent: 'bg-[#b967ff]',
    danger: 'bg-[#ff71ce]',
    gridBg: 'bg-white/20 backdrop-blur-md border-2 border-white/50 shadow-xl',
    container: 'rounded-xl',
    itemStyles: {
      WEAPON: 'bg-gradient-to-r from-pink-500 to-purple-500 text-white border border-white/50',
      POTION: 'bg-gradient-to-r from-blue-400 to-cyan-300 text-white border border-white/50',
      SCROLL: 'bg-gradient-to-r from-yellow-300 to-orange-400 text-white border border-white/50',
      JUNK: 'bg-white/30 text-white border border-white/20',
      TECH: 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white',
      RELIC: 'bg-gradient-to-r from-red-400 to-pink-500 text-white',
    },
    traitorOverlay: 'bg-gradient-to-br from-[#ff71ce]/90 to-[#01cdfe]/90 backdrop-blur-xl',
  },
  NOIR: {
    label: "Film Noir",
    bg: 'bg-[#1a1a1a]',
    text: 'text-[#e5e5e5]',
    font: 'font-serif tracking-wide',
    accent: 'bg-[#404040]',
    danger: 'bg-[#808080]',
    gridBg: 'bg-[#262626] border border-[#404040] shadow-[0_0_30px_rgba(0,0,0,0.8)]',
    container: 'rounded-sm',
    itemStyles: {
      WEAPON: 'bg-[#333] border border-[#555] text-[#ccc] grayscale hover:grayscale-0',
      POTION: 'bg-[#222] border border-[#444] text-[#aaa]',
      SCROLL: 'bg-[#2a2a2a] border border-[#444] text-[#bbb]',
      JUNK: 'bg-[#111] text-[#333] border border-[#222]',
      TECH: 'bg-[#303030] text-[#999] border border-[#444]',
      RELIC: 'bg-[#404040] text-[#fff] border border-[#666]',
    },
    traitorOverlay: 'bg-black/95 mix-blend-hard-light',
  },
  PAPER: {
    label: "Papercraft",
    bg: 'bg-[#f0f0e0]',
    text: 'text-[#333]',
    font: 'font-sans',
    accent: 'bg-[#ff9999]',
    danger: 'bg-[#ff4444]',
    gridBg: 'bg-white border-2 border-[#ddd] shadow-[5px_5px_0_rgba(0,0,0,0.1)] rotate-1',
    container: 'rounded-none',
    itemStyles: {
      WEAPON: 'bg-white border-2 border-dashed border-[#888] text-[#555] shadow-sm',
      POTION: 'bg-[#ffeebb] border-2 border-[#eebbaa] text-[#cc5555] rotate-[-2deg]',
      SCROLL: 'bg-[#eeffcc] border-2 border-[#bbaacc] text-[#558855] rotate-[1deg]',
      JUNK: 'bg-[#eeeeee] border-2 border-[#cccccc] text-[#aaaaaa]',
      TECH: 'bg-[#ccffff] border-2 border-[#99cccc] text-[#448888] rotate-[2deg]',
      RELIC: 'bg-[#eebbff] border-2 border-[#cc99cc] text-[#884488] rotate-[-1deg]',
    },
    traitorOverlay: 'bg-[#f0f0e0]/95 backdrop-blur-sm',
  },
  TERMINAL: {
    label: "Mainframe",
    bg: 'bg-black',
    text: 'text-[#00ff00]',
    font: 'font-mono',
    accent: 'bg-[#003300]',
    danger: 'bg-[#ff0000]',
    gridBg: 'bg-black border border-[#00ff00] shadow-[0_0_15px_#00ff00]',
    container: 'rounded-none',
    itemStyles: {
      WEAPON: 'bg-black border border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00] hover:text-black',
      POTION: 'bg-black border border-[#00ff00] text-[#00ff00]',
      SCROLL: 'bg-black border border-[#00ff00] text-[#00ff00]',
      JUNK: 'bg-black border border-[#004400] text-[#004400]',
      TECH: 'bg-black border border-[#00ff00] text-[#00ff00] animate-pulse',
      RELIC: 'bg-black border border-[#00ff00] text-[#00ff00]',
    },
    traitorOverlay: 'bg-black/95 border-2 border-[#00ff00]',
  },
  CANDY: {
    label: "Sugar Rush",
    bg: 'bg-[#fff0f5]',
    text: 'text-[#d63384]',
    font: 'font-sans font-bold',
    accent: 'bg-[#ff69b4]',
    danger: 'bg-[#dc3545]',
    gridBg: 'bg-white border-4 border-[#ffb6c1] rounded-[2rem] shadow-[0_10px_20px_rgba(255,182,193,0.5)]',
    container: 'rounded-[2rem]',
    itemStyles: {
      WEAPON: 'bg-[#ffccd5] text-[#d63384] border-2 border-white rounded-xl shadow-inner',
      POTION: 'bg-[#e0c3fc] text-[#6f42c1] border-2 border-white rounded-full',
      SCROLL: 'bg-[#fff3cd] text-[#856404] border-2 border-white rounded-xl',
      JUNK: 'bg-[#e9ecef] text-[#6c757d] rounded-xl',
      TECH: 'bg-[#d1e7dd] text-[#0f5132] border-2 border-white rounded-xl',
      RELIC: 'bg-[#f8d7da] text-[#842029] border-2 border-white rounded-full animate-bounce',
    },
    traitorOverlay: 'bg-[#fff0f5]/90 backdrop-blur-sm',
  },
  STEAM: {
    label: "Steampunk",
    bg: 'bg-[#2b2b2b]',
    text: 'text-[#d4af37]',
    font: 'font-serif tracking-widest',
    accent: 'bg-[#8b4513]',
    danger: 'bg-[#800000]',
    gridBg: 'bg-[url("https://www.transparenttextures.com/patterns/black-scales.png")] bg-[#1a1a1a] border-4 border-[#cd853f] shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]',
    container: 'rounded-lg border-2 border-[#8b4513]',
    itemStyles: {
      WEAPON: 'bg-[#5c4033] border-2 border-[#d4af37] text-[#ffd700] shadow-lg',
      POTION: 'bg-[#800000] border-2 border-[#cd853f] text-[#ff6347] rounded-full',
      SCROLL: 'bg-[#f4a460] text-[#3e2723] border border-[#8b4513] rotate-1',
      JUNK: 'bg-[#3e2723] text-[#6d4c41] border border-[#5d4037]',
      TECH: 'bg-[#b8860b] text-[#2b2b2b] border-2 border-[#ffd700] rounded-full',
      RELIC: 'bg-[#4b0082] text-[#e6e6fa] border-2 border-[#daa520] shadow-[0_0_10px_#ffd700]',
    },
    traitorOverlay: 'bg-[#2b2b2b]/95 border-8 border-[#8b4513]',
  },
  GLASS: {
    label: "Glassmorphism",
    bg: 'bg-gradient-to-r from-[#4facfe] to-[#00f2fe]',
    text: 'text-white',
    font: 'font-sans font-light',
    accent: 'bg-white/20',
    danger: 'bg-red-500/50',
    gridBg: 'bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]',
    container: 'rounded-2xl',
    itemStyles: {
      WEAPON: 'bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-sm hover:bg-white/20',
      POTION: 'bg-red-400/20 backdrop-blur-md border border-white/20 text-white',
      SCROLL: 'bg-yellow-400/20 backdrop-blur-md border border-white/20 text-white',
      JUNK: 'bg-black/10 backdrop-blur-sm border border-white/5 text-white/50',
      TECH: 'bg-blue-400/20 backdrop-blur-md border border-white/20 text-white',
      RELIC: 'bg-purple-400/20 backdrop-blur-md border border-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]',
    },
    traitorOverlay: 'bg-black/20 backdrop-blur-xl border border-white/10',
  },
  MIDNIGHT: {
    label: "Midnight",
    bg: 'bg-[#000000]',
    text: 'text-[#6366f1]',
    font: 'font-sans tracking-tight',
    accent: 'bg-[#4338ca]',
    danger: 'bg-[#991b1b]',
    gridBg: 'bg-[#0f172a] border border-[#1e1b4b] shadow-[0_0_50px_rgba(67,56,202,0.1)]',
    container: 'rounded-3xl',
    itemStyles: {
      WEAPON: 'bg-[#1e1b4b] border border-[#312e81] text-[#818cf8] hover:bg-[#312e81]',
      POTION: 'bg-[#312e81] border border-[#3730a3] text-[#a5b4fc]',
      SCROLL: 'bg-[#1e1b4b] border border-[#312e81] text-[#6366f1]',
      JUNK: 'bg-[#0f172a] border border-[#1e1b4b] text-[#312e81]',
      TECH: 'bg-[#3730a3] border border-[#4338ca] text-[#c7d2fe]',
      RELIC: 'bg-[#4338ca] border border-[#4f46e5] text-white shadow-[0_0_20px_#4f46e5]',
    },
    traitorOverlay: 'bg-black/80 backdrop-blur-2xl',
  },
  ROYAL: {
    label: "Royal Court",
    bg: 'bg-[#2c0b0e]',
    text: 'text-[#ffd700]',
    font: 'font-serif',
    accent: 'bg-[#800000]',
    danger: 'bg-[#ff0000]',
    gridBg: 'bg-[#4a0404] border-4 border-[#ffd700] shadow-[0_0_30px_rgba(255,215,0,0.2)]',
    container: 'rounded-lg',
    itemStyles: {
      WEAPON: 'bg-[#2c0b0e] border border-[#ffd700] text-[#ffd700]',
      POTION: 'bg-[#800000] border border-[#ff4500] text-[#ffcccb]',
      SCROLL: 'bg-[#f5deb3] text-[#8b0000] border-2 border-[#daa520]',
      JUNK: 'bg-[#3d2b1f] text-[#654321] border border-[#5d4037]',
      TECH: 'bg-[#191970] text-[#00bfff] border-2 border-[#c0c0c0]',
      RELIC: 'bg-[#4b0082] text-[#e6e6fa] border-2 border-[#ffd700] shadow-[0_0_10px_#ffd700]',
    },
    traitorOverlay: 'bg-[#2c0b0e]/95 border-8 border-[#ffd700]',
  },
  WIREFRAME: {
    label: "Wireframe",
    bg: 'bg-[#eeeeee]',
    text: 'text-black',
    font: 'font-mono',
    accent: 'bg-transparent',
    danger: 'bg-transparent',
    gridBg: 'bg-transparent border border-black',
    container: 'rounded-none',
    itemStyles: {
      WEAPON: 'bg-transparent border border-black text-black hover:bg-black hover:text-white',
      POTION: 'bg-transparent border border-dashed border-black text-black',
      SCROLL: 'bg-transparent border-b-2 border-black text-black',
      JUNK: 'bg-transparent border border-dotted border-black text-gray-400',
      TECH: 'bg-transparent border-2 border-black text-black',
      RELIC: 'bg-transparent border-4 border-black text-black',
    },
    traitorOverlay: 'bg-white/90 border border-black',
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
              "absolute top-full mt-2 left-0 w-full overflow-hidden flex flex-col gap-1 p-2 max-h-[60vh] overflow-y-auto z-[100]",
              current === 'BRUTALIST' ? "bg-white border-4 border-black shadow-[8px_8px_0_black]" :
              current === 'PHANTOM' ? "bg-black border-2 border-white -skew-x-6" :
              current === 'AUTOMATA' ? "bg-[#dcd8c0] border border-[#a8a490]" :
              current === 'VAPOR' ? "bg-white/30 backdrop-blur-xl border border-white/50" :
              current === 'NOIR' ? "bg-[#111] border border-[#333] shadow-[0_0_20px_black]" :
              current === 'GLASS' ? "bg-white/20 backdrop-blur-2xl border border-white/30" :
              current === 'TERMINAL' ? "bg-black border border-[#00ff00]" :
              current === 'CANDY' ? "bg-[#fff0f5] border-2 border-[#ffb6c1] rounded-xl" :
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
                  current === 'TERMINAL' ? "text-[#00ff00] hover:bg-[#003300]" :
                  "text-white/60 hover:text-white hover:bg-white/10 rounded-lg",
                  // Theme-specific text colors for light themes
                  ['VAPOR', 'CANDY', 'PAPER', 'ARCTIC'].includes(current) && "text-black/60 hover:text-black hover:bg-black/5"
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
      theme === 'PHANTOM' && "rotate-1 scale-95", // Slight default rotation for chaos
      theme === 'PAPER' && "rotate-1",
      theme === 'GLASS' && "backdrop-blur-xl border border-white/20",
      theme === 'MIDNIGHT' && "shadow-[0_0_50px_rgba(67,56,202,0.5)]"
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
            theme === 'PHANTOM' && "skew-x-0",
            theme === 'GLASS' && "backdrop-blur-md border border-white/30",
            theme === 'NOIR' && "grayscale hover:grayscale-0 transition-all duration-500",
            theme === 'VAPOR' && "shadow-[4px_4px_0_rgba(0,0,0,0.2)]"
          )}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: i * 0.1 }}
          whileHover={{ 
            scale: 1.05, 
            rotate: theme === 'CURSED' ? 2 : theme === 'PHANTOM' ? -5 : theme === 'PAPER' ? -2 : 0,
            zIndex: 20,
            filter: theme === 'NOIR' ? 'grayscale(0)' : undefined
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
            theme === 'VAPOR' ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full shadow-lg" :
            theme === 'NOIR' ? "bg-black text-white border border-gray-500 font-serif italic" :
            theme === 'PAPER' ? "bg-white text-black border border-gray-300 shadow-md rotate-[-2deg]" :
            theme === 'TERMINAL' ? "bg-black border border-[#00ff00] text-[#00ff00]" :
            theme === 'CANDY' ? "bg-white text-[#ff69b4] border-2 border-[#ffb6c1] rounded-full shadow-lg" :
            theme === 'GLASS' ? "bg-white/20 backdrop-blur-md border border-white/30 text-white" :
            theme === 'MIDNIGHT' ? "bg-[#1e1b4b] border border-[#6366f1] text-[#6366f1]" :
            theme === 'ROYAL' ? "bg-[#800000] border border-[#ffd700] text-[#ffd700]" :
            theme === 'WIREFRAME' ? "bg-white border border-black text-black" :
            theme === 'STEAM' ? "bg-[#3e2723] border border-[#cd853f] text-[#d4af37]" :
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
          theme === 'AUTOMATA' && "bg-[#dcd8c0] border-2 border-[#8c3a3a] text-[#8c3a3a]",
          theme === 'VAPOR' && "bg-gradient-to-br from-[#ff71ce] to-[#01cdfe] text-white rounded-xl shadow-[0_0_30px_#ff71ce]",
          theme === 'NOIR' && "bg-black text-white border-4 border-white font-serif tracking-widest",
          theme === 'PAPER' && "bg-[#fff] text-red-600 border-2 border-dashed border-red-400 rotate-2",
          theme === 'TERMINAL' && "bg-black border-2 border-[#ff0000] text-[#ff0000]",
          theme === 'CANDY' && "bg-[#fff0f5] border-4 border-[#ff69b4] text-[#d63384] rounded-[2rem]",
          theme === 'GLASS' && "bg-white/10 backdrop-blur-2xl border border-white/30 text-white",
          theme === 'MIDNIGHT' && "bg-[#000] border border-[#991b1b] text-[#ef4444] shadow-[0_0_50px_#991b1b]",
          theme === 'ROYAL' && "bg-[#2c0b0e] border-4 border-[#ff0000] text-[#ff0000]",
          theme === 'WIREFRAME' && "bg-transparent border-2 border-black text-black",
          theme === 'STEAM' && "bg-[#2b2b2b] border-4 border-[#800000] text-[#ff6347]"
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
      {theme === 'VAPOR' && (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
          <div className="absolute bottom-0 w-full h-1/2 bg-[linear-gradient(to_top,#ff71ce_0%,transparent_100%)] opacity-20 pointer-events-none" />
        </>
      )}
      {theme === 'NOIR' && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] pointer-events-none opacity-80" />
      )}
      {theme === 'PAPER' && (
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/notebook.png')] opacity-10 pointer-events-none" />
      )}
      {theme === 'TERMINAL' && (
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,255,0,0.05),rgba(0,255,0,0.05)_1px,transparent_1px,transparent_2px)] pointer-events-none" />
      )}
      {theme === 'CANDY' && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#ffb6c1_0%,transparent_50%),radial-gradient(circle_at_bottom_left,#87ceeb_0%,transparent_50%)] pointer-events-none opacity-30" />
      )}
      {theme === 'GLASS' && (
        <>
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-50 animate-blob" />
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-yellow-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-50 animate-blob animation-delay-2000" />
          <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-pink-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-50 animate-blob animation-delay-4000" />
        </>
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
                 theme === 'PHANTOM' ? "bg-black text-white border-4 border-black hover:bg-black hover:text-white skew-y-[-2deg] shadow-[5px_5px_0_black]" :
                 theme === 'BRUTALIST' ? "bg-black text-white border-4 border-black hover:bg-white hover:text-black shadow-[8px_8px_0_black]" :
                 theme === 'AUTOMATA' ? "bg-[#4a4a4a] text-[#dcd8c0] border border-[#4a4a4a] hover:bg-[#333]" :
                 theme === 'VAPOR' ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg" :
                 theme === 'NOIR' ? "bg-[#333] text-white border border-gray-500 font-serif" :
                 theme === 'PAPER' ? "bg-[#ff9999] text-white border-2 border-[#ff7777] shadow-md -rotate-1" :
                 theme === 'TERMINAL' ? "bg-black border border-[#00ff00] text-[#00ff00] hover:bg-[#003300]" :
                 theme === 'CANDY' ? "bg-[#ff69b4] text-white rounded-xl shadow-[0_4px_0_#d63384]" :
                 theme === 'GLASS' ? "bg-white/20 backdrop-blur-md border border-white/30 text-white" :
                 theme === 'MIDNIGHT' ? "bg-[#4338ca] text-white shadow-[0_0_20px_#4338ca]" :
                 theme === 'ROYAL' ? "bg-[#800000] border-2 border-[#ffd700] text-[#ffd700]" :
                 theme === 'WIREFRAME' ? "bg-transparent border border-black text-black hover:bg-black hover:text-white" :
                 theme === 'STEAM' ? "bg-[#8b4513] border-2 border-[#cd853f] text-[#ffd700]" :
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
                 theme === 'VAPOR' ? "bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg" :
                 theme === 'NOIR' ? "bg-[#111] text-[#999] border border-gray-700 font-serif" :
                 theme === 'PAPER' ? "bg-[#aaccaa] text-white border-2 border-[#88aa88] shadow-md rotate-1" :
                 theme === 'TERMINAL' ? "bg-black border border-[#004400] text-[#004400]" :
                 theme === 'CANDY' ? "bg-[#87ceeb] text-white rounded-xl shadow-[0_4px_0_#5f9ea0]" :
                 theme === 'GLASS' ? "bg-white/10 backdrop-blur-md border border-white/20 text-white/80" :
                 theme === 'MIDNIGHT' ? "bg-[#1e1b4b] border border-[#312e81] text-[#6366f1]" :
                 theme === 'ROYAL' ? "bg-[#2c0b0e] border border-[#8b0000] text-[#cd853f]" :
                 theme === 'WIREFRAME' ? "bg-transparent border border-dashed border-black text-gray-500" :
                 theme === 'STEAM' ? "bg-[#3e2723] border border-[#5d4037] text-[#cd853f]" :
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