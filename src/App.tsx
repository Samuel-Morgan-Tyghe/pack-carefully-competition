import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skull, Sword, Eye, ChevronDown, Check } from 'lucide-react';
import clsx from 'clsx';

type Theme = 'ELDEN' | 'HADES' | 'PERSONA' | 'CURSED' | 'CYBER' | 'ARCTIC' | 'AUTOMATA' | 'PHANTOM' | 'BRUTALIST' | 'VAPOR' | 'NOIR' | 'PAPER' | 'TERMINAL' | 'CANDY' | 'STEAM' | 'GLASS' | 'MIDNIGHT' | 'ROYAL' | 'WIREFRAME';
type Scene = 'INVENTORY' | 'BATTLE' | 'COMBINED' | 'INFO';

// --- Global Types ---
interface Item {
  id: string;
  name: string;
  category: 'WEAPON' | 'POTION' | 'SCROLL' | 'JUNK' | 'TECH' | 'RELIC';
  description: string;
  stats: string;
  w: number;
  h: number;
}

const ITEMS: Item[] = [
  { id: 'sword', name: 'Iron Sword', category: 'WEAPON', description: "A rusted blade that has seen better days.", stats: "+5 ATK", w: 1, h: 3 },
  { id: 'potion', name: 'Health Potion', category: 'POTION', description: "Smells like strawberries and antiseptic.", stats: "+50 HP", w: 1, h: 1 },
  { id: 'scroll', name: 'Fire Scroll', category: 'SCROLL', description: "Warm to the touch. Do not read near curtains.", stats: "CAST: FIREBALL", w: 2, h: 2 },
  { id: 'junk', name: 'Heavy Rock', category: 'JUNK', description: "It is just a rock. A heavy one.", stats: "THROWN: 1 DMG", w: 2, h: 2 },
  { id: 'chip', name: 'Data Chip', category: 'TECH', description: "Contains encrypted coordinates.", stats: "VALUE: 500 CR", w: 1, h: 1 },
  { id: 'relic', name: 'Ancient Core', category: 'RELIC', description: "Humming with unstable energy.", stats: "UNKNOWN EFFECT", w: 1, h: 1 },
];

// --- Theme Configurations ---
const themes = {
  ELDEN: {
    label: "Grace",
    bg: 'bg-[#0f0e0b]',
    text: 'text-[#d4cbb8]',
    font: 'font-serif tracking-widest',
    accent: 'bg-[#9f854a]',
    danger: 'bg-[#6b1e1e]',
    gridBg: 'bg-[radial-gradient(circle_at_center,rgba(159,133,74,0.1),transparent)] border border-[#3d382f] shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]',
    container: 'rounded-sm border border-[#3d382f]',
    itemStyles: {
      WEAPON: 'bg-black/40 border border-[#5c5443] text-[#d4cbb8] hover:bg-[#1a1814]',
      POTION: 'bg-[#3d1a1a]/40 border border-[#5c2e2e] text-[#d65f5f]',
      SCROLL: 'bg-[#2b261d]/40 border border-[#5c5443] text-[#d4cbb8]',
      JUNK: 'bg-black/20 border border-[#262421] text-[#666157]',
      TECH: 'bg-[#2b261d]/40 border border-[#9f854a] text-[#ffd700]',
      RELIC: 'bg-[#1a1814] border border-[#d4cbb8] text-[#fff] shadow-[0_0_15px_rgba(212,203,184,0.1)]',
    },
    traitorOverlay: 'bg-[#0f0e0b]/90 border-y-2 border-[#9f854a] backdrop-blur-sm',
  },
  HADES: {
    label: "Underworld",
    bg: 'bg-[#1a0b0f]',
    text: 'text-[#ffbd4a]',
    font: 'font-serif font-bold uppercase tracking-wider',
    accent: 'bg-[#e91e63]',
    danger: 'bg-[#ff003c]',
    gridBg: 'bg-[#2d1218] border-2 border-[#59232c] shadow-[0_0_30px_rgba(233,30,99,0.1)]',
    container: 'rounded-none border-2 border-[#ffbd4a]',
    itemStyles: {
      WEAPON: 'bg-[#2d1218] border border-[#ffbd4a] text-[#ffbd4a] hover:bg-[#3d1820]',
      POTION: 'bg-[#2d1218] border border-[#ff003c] text-[#ff003c]',
      SCROLL: 'bg-[#2d1218] border border-[#00f2fe] text-[#00f2fe]',
      JUNK: 'bg-[#1f0d11] border border-[#4a1d26] text-[#6d2f3c]',
      TECH: 'bg-[#2d1218] border border-[#a259ff] text-[#a259ff]',
      RELIC: 'bg-[#2d1218] border-2 border-[#ffbd4a] text-[#fff] shadow-[0_0_15px_rgba(255,189,74,0.3)]',
    },
    traitorOverlay: 'bg-[#1a0b0f]/95 border-4 border-[#ff003c]',
  },
  PERSONA: {
    label: "Metaverse",
    bg: 'bg-[#e60012]',
    text: 'text-white',
    font: 'font-sans font-black italic tracking-tighter',
    accent: 'bg-black',
    danger: 'bg-black text-white',
    gridBg: 'bg-black border-4 border-white shadow-[10px_10px_0_rgba(0,0,0,0.2)] transform -rotate-1',
    container: 'rounded-none',
    itemStyles: {
      WEAPON: 'bg-white text-black border-4 border-black hover:invert transition-transform hover:-translate-y-1',
      POTION: 'bg-black text-white border-4 border-white skew-x-[-12deg]',
      SCROLL: 'bg-[#ffd700] text-black border-4 border-black rotate-1',
      JUNK: 'bg-[#333] text-[#666] border-4 border-[#555] -rotate-1',
      TECH: 'bg-[#00f2fe] text-black border-4 border-black skew-x-[12deg]',
      RELIC: 'bg-black text-white border-4 border-white rotate-2',
    },
    traitorOverlay: 'bg-[#e60012] bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_20px)] border-8 border-white p-12',
  },
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

// --- Custom Item Graphics ---

function ItemGraphic({ id, theme }: { id: string; theme: Theme }) {
  // Determine style group
  const style = 
    ['WIREFRAME', 'CYBER', 'TERMINAL', 'AUTOMATA'].includes(theme) ? 'TECH' :
    ['PAPER', 'CANDY', 'VAPOR'].includes(theme) ? 'SOFT' :
    ['BRUTALIST', 'PHANTOM', 'NOIR'].includes(theme) ? 'BOLD' :
    ['ELDEN', 'HADES', 'ROYAL', 'CURSED', 'STEAM', 'MIDNIGHT'].includes(theme) ? 'FANTASY' : 'DEFAULT';

  const strokeColor = 'currentColor';
  const strokeWidth = theme === 'WIREFRAME' ? 4 : 2;
  const fillOpacity = theme === 'WIREFRAME' ? 0 : 0.2;

  switch (id) {
    case 'sword': // 1x3 Tall
      if (style === 'TECH') {
        return (
          <svg viewBox="0 0 100 300" className="w-full h-full" preserveAspectRatio="none">
            <path d="M45 20 H55 V220 H45 Z" fill={strokeColor} fillOpacity={fillOpacity} stroke={strokeColor} strokeWidth={strokeWidth} />
            <path d="M30 220 H70 V240 H30 Z" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            <path d="M45 240 H55 V280 H45 Z" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            <path d="M50 40 V180 M35 225 H65" stroke={strokeColor} strokeWidth={1} />
          </svg>
        );
      }
      if (style === 'SOFT') {
        return (
          <svg viewBox="0 0 100 300" className="w-full h-full" preserveAspectRatio="none">
            <path d="M50 20 Q70 50 70 150 Q70 200 50 220 Q30 200 30 150 Q30 50 50 20 Z" 
                  fill={strokeColor} fillOpacity={fillOpacity} stroke={strokeColor} strokeWidth={strokeWidth * 2} strokeLinecap="round" />
            <path d="M25 220 H75" stroke={strokeColor} strokeWidth={strokeWidth * 3} strokeLinecap="round" />
            <path d="M50 220 V280" stroke={strokeColor} strokeWidth={strokeWidth * 3} strokeLinecap="round" />
          </svg>
        );
      }
      if (style === 'BOLD') {
        return (
          <svg viewBox="0 0 100 300" className="w-full h-full" preserveAspectRatio="none">
            <rect x="40" y="20" width="20" height="200" fill={strokeColor} />
            <rect x="20" y="220" width="60" height="20" fill={strokeColor} />
            <rect x="45" y="240" width="10" height="40" fill={strokeColor} />
          </svg>
        );
      }
      return (
        <svg viewBox="0 0 100 300" className="w-full h-full" preserveAspectRatio="none">
          <path 
            d="M50 10 L50 220 M20 220 L80 220 M50 220 L50 290" 
            stroke={strokeColor} 
            strokeWidth={strokeWidth * 4} 
            fill="none" 
            className="drop-shadow-sm"
          />
          <path
            d="M50 10 L70 50 L50 220 L30 50 Z"
            fill={strokeColor}
            fillOpacity={fillOpacity}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
        </svg>
      );

    case 'potion': // 1x1
      if (style === 'TECH') {
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
            <path d="M30 20 L70 20 L80 40 L80 80 L20 80 L20 40 Z" fill={strokeColor} fillOpacity={fillOpacity} stroke={strokeColor} strokeWidth={strokeWidth} />
            <path d="M20 40 L80 40 M30 80 V20 M70 80 V20" stroke={strokeColor} strokeWidth={1} opacity="0.5" />
          </svg>
        );
      }
      if (style === 'SOFT') {
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
            <circle cx="50" cy="60" r="30" fill={strokeColor} fillOpacity={fillOpacity} stroke={strokeColor} strokeWidth={strokeWidth * 2} />
            <rect x="40" y="10" width="20" height="25" fill={strokeColor} fillOpacity={fillOpacity} />
            <path d="M40 10 H60" stroke={strokeColor} strokeWidth={strokeWidth * 2} strokeLinecap="round" />
          </svg>
        );
      }
      if (style === 'BOLD') {
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
            <rect x="25" y="30" width="50" height="60" fill={strokeColor} />
            <rect x="40" y="10" width="20" height="20" fill={strokeColor} />
          </svg>
        );
      }
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          <path
            d="M50 15 L50 35 L20 85 L80 85 L50 35"
            fill={strokeColor}
            fillOpacity={fillOpacity}
            stroke={strokeColor}
            strokeWidth={strokeWidth * 2}
          />
          <path d="M30 25 L70 25" stroke={strokeColor} strokeWidth={strokeWidth * 2} />
        </svg>
      );

    case 'scroll': // 2x2 Square-ish
      if (style === 'TECH') {
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full" preserveAspectRatio="none">
            <rect x="20" y="20" width="160" height="160" rx="10" fill={strokeColor} fillOpacity={fillOpacity} stroke={strokeColor} strokeWidth={strokeWidth} />
            <path d="M40 40 H160 M40 60 H160 M40 80 H100 M40 140 H160" stroke={strokeColor} strokeWidth={2} />
            <rect x="120" y="80" width="40" height="40" fill="none" stroke={strokeColor} strokeWidth={1} />
          </svg>
        );
      }
      if (style === 'SOFT') {
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full" preserveAspectRatio="none">
            <path d="M40 30 Q100 10 160 30 V170 Q100 190 40 170 Z" fill={strokeColor} fillOpacity={fillOpacity} stroke={strokeColor} strokeWidth={strokeWidth * 2} />
            <path d="M50 50 H150 M50 80 H150" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray="10 10" />
          </svg>
        );
      }
      if (style === 'BOLD') {
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full" preserveAspectRatio="none">
            <rect x="30" y="30" width="140" height="140" fill={strokeColor} />
            <rect x="50" y="50" width="100" height="20" fill="white" />
            <rect x="50" y="90" width="100" height="20" fill="white" />
            <rect x="50" y="130" width="60" height="20" fill="white" />
          </svg>
        );
      }
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full" preserveAspectRatio="none">
          <path
            d="M20 20 Q100 0 180 20 V180 Q100 160 20 180 Z"
            fill={strokeColor}
            fillOpacity={fillOpacity}
            stroke={strokeColor}
            strokeWidth={strokeWidth * 2}
          />
          <path d="M40 50 H160 M40 90 H160 M40 130 H120" stroke={strokeColor} strokeWidth={strokeWidth * 2} strokeLinecap="round" />
        </svg>
      );

    case 'junk': // 2x2
      if (style === 'TECH') {
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full" preserveAspectRatio="none">
            <path d="M20 20 H100 V80 H180 V180 H20 Z" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            <line x1="20" y1="20" x2="180" y2="180" stroke={strokeColor} strokeWidth={1} />
            <line x1="100" y1="20" x2="20" y2="180" stroke={strokeColor} strokeWidth={1} />
          </svg>
        );
      }
      if (style === 'BOLD') {
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full" preserveAspectRatio="none">
            <polygon points="10,190 190,190 100,10" fill={strokeColor} />
          </svg>
        );
      }
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full" preserveAspectRatio="none">
          <path
            d="M10 10 L190 10 L190 190 L10 190 Z"
            fill={strokeColor}
            fillOpacity={fillOpacity * 2}
            stroke={strokeColor}
            strokeWidth={strokeWidth * 2}
          />
          <path d="M10 10 L190 190 M190 10 L10 190" stroke={strokeColor} strokeWidth={strokeWidth} strokeOpacity="0.5" />
        </svg>
      );

    case 'chip': // 1x1
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          <rect x="10" y="10" width="80" height="80" rx={style === 'SOFT' ? 20 : 5} fill={strokeColor} fillOpacity={fillOpacity} stroke={strokeColor} strokeWidth={strokeWidth * 2} />
          <path d="M10 25 H5 M10 50 H5 M10 75 H5 M90 25 H95 M90 50 H95 M90 75 H95 M25 10 V5 M50 10 V5 M75 10 V5 M25 90 V95 M50 90 V95 M75 90 V95" stroke={strokeColor} strokeWidth={strokeWidth * 2} />
        </svg>
      );

    case 'relic': // 1x1
      if (style === 'BOLD') {
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
            <circle cx="50" cy="50" r="40" fill={strokeColor} />
          </svg>
        );
      }
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          <path
            d="M50 5 L95 50 L50 95 L5 50 Z"
            fill={strokeColor}
            fillOpacity={fillOpacity}
            stroke={strokeColor}
            strokeWidth={strokeWidth * 2}
          />
          <circle cx="50" cy="50" r="20" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
        </svg>
      );

    default:
      return null;
  }
}

// --- Components ---

function Dropdown<T extends string>({ 
  value, 
  options, 
  onChange, 
  theme, 
  label 
}: { 
  value: T; 
  options: { id: string; label: string }[]; 
  onChange: (val: T) => void; 
  theme: Theme; 
  label?: string 
}) {
  const [isOpen, setIsOpen] = useState(false);
  // Remove unused currentTheme variable
  // const currentTheme = themes[theme];

  return (
    <div className="relative z-[9999]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "flex items-center gap-2 px-4 py-2 rounded-lg font-bold uppercase tracking-wider transition-all min-w-[160px] justify-between text-sm",
          theme === 'BRUTALIST' ? "bg-white text-black border-4 border-black shadow-[4px_4px_0_black]" :
          theme === 'PHANTOM' ? "bg-black text-white -skew-x-12 border border-white" :
          theme === 'AUTOMATA' ? "bg-[#cfcbb3] text-[#4a4a4a] border border-[#a8a490]" :
          theme === 'CYBER' ? "bg-black text-[#10b981] border border-[#10b981] shadow-[0_0_10px_rgba(16,185,129,0.3)]" :
          theme === 'ELDEN' ? "bg-[#0f0e0b]/80 text-[#d4cbb8] border border-[#5c5443] hover:bg-[#1a1814]" :
          theme === 'HADES' ? "bg-[#2d1218] text-[#ffbd4a] border-2 border-[#59232c]" :
          theme === 'PERSONA' ? "bg-black text-white border-2 border-white -skew-x-6" :
          "bg-white/10 backdrop-blur text-current border border-white/20 hover:bg-white/20"
        )}
      >
        <span>{label || options.find(o => o.id === value)?.label}</span>
        <ChevronDown size={14} className={clsx("transition-transform", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className={clsx(
              "absolute top-full mt-2 left-0 w-full overflow-hidden flex flex-col gap-1 p-2 max-h-[60vh] overflow-y-auto z-[9999] shadow-2xl",
              theme === 'ELDEN' ? "bg-[#0f0e0b]/95 border border-[#9f854a] backdrop-blur-sm" :
              theme === 'HADES' ? "bg-[#1a0b0f]/95 border-2 border-[#ffbd4a]" :
              theme === 'PERSONA' ? "bg-black border-4 border-white transform -skew-x-2" :
              theme === 'BRUTALIST' ? "bg-white border-4 border-black shadow-[8px_8px_0_black]" :
              theme === 'PHANTOM' ? "bg-black border-2 border-white -skew-x-6" :
              theme === 'AUTOMATA' ? "bg-[#dcd8c0] border border-[#a8a490]" :
              theme === 'VAPOR' ? "bg-white/30 backdrop-blur-xl border border-white/50" :
              theme === 'NOIR' ? "bg-[#111] border border-[#333] shadow-[0_0_20px_black]" :
              theme === 'GLASS' ? "bg-white/20 backdrop-blur-2xl border border-white/30" :
              theme === 'TERMINAL' ? "bg-black border border-[#00ff00]" :
              theme === 'CANDY' ? "bg-[#fff0f5] border-2 border-[#ffb6c1] rounded-xl" :
              "bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl"
            )}
          >
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  onChange(opt.id as T);
                  setIsOpen(false);
                }}
                className={clsx(
                  "px-4 py-3 text-left font-bold uppercase text-xs transition-all flex items-center justify-between group",
                  theme === 'ELDEN' ? "text-[#d4cbb8] hover:bg-[#2b261d]" :
                  theme === 'HADES' ? "text-[#ffbd4a] hover:bg-[#2d1218]" :
                  theme === 'PERSONA' ? "text-white hover:bg-white hover:text-black skew-x-[-12deg]" :
                  theme === 'BRUTALIST' ? "hover:bg-black hover:text-white" :
                  theme === 'PHANTOM' ? "text-white hover:bg-white hover:text-black hover:skew-x-6" :
                  theme === 'AUTOMATA' ? "text-[#4a4a4a] hover:bg-[#cfcbb3]" :
                  theme === 'TERMINAL' ? "text-[#00ff00] hover:bg-[#003300]" :
                  "text-white/60 hover:text-white hover:bg-white/10 rounded-lg",
                  ['VAPOR', 'CANDY', 'PAPER', 'ARCTIC'].includes(theme) && "text-black/60 hover:text-black hover:bg-black/5"
                )}
              >
                <span>{opt.label}</span>
                {value === opt.id && <Check size={14} className={clsx(theme === 'PHANTOM' && "animate-pulse")} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Scene Components ---

function InventoryScene({ theme }: { theme: Theme }) {
  const currentTheme = themes[theme];
  return (
    <div className={clsx(
      "w-full aspect-square relative grid grid-cols-4 grid-rows-4 gap-2 p-4 overflow-hidden transition-all duration-500",
      currentTheme.gridBg,
      currentTheme.container,
      theme === 'PHANTOM' && "rotate-1 scale-95",
      theme === 'PAPER' && "rotate-1",
      theme === 'GLASS' && "backdrop-blur-xl border border-white/20",
      theme === 'MIDNIGHT' && "shadow-[0_0_50px_rgba(67,56,202,0.5)]",
      theme === 'ELDEN' && "shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]"
    )}>
      {/* Background Grid Lines (Cyber Only) */}
      {theme === 'CYBER' && (
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 pointer-events-none opacity-20">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="border border-[#10b981]" />
          ))}
        </div>
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
            "flex flex-col items-center justify-center cursor-grab active:cursor-grabbing select-none relative z-10 overflow-hidden group",
            currentTheme.itemStyles[item.category],
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
          {/* Sub-grid pattern */}
          <div className="absolute inset-0 grid w-full h-full opacity-10 pointer-events-none" 
               style={{ gridTemplateColumns: `repeat(${item.w}, 1fr)`, gridTemplateRows: `repeat(${item.h}, 1fr)` }}>
             {[...Array(item.w * item.h)].map((_, idx) => (
                <div key={idx} className="border-[0.5px] border-current" />
             ))}
          </div>

          <div className={clsx("relative w-full h-full flex items-center justify-center", theme === 'PHANTOM' && "transform skew-x-6")}>
             <ItemGraphic id={item.id} theme={theme} />
             <span className="absolute bottom-1 left-0 right-0 text-[8px] font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity uppercase text-center leading-tight bg-black/50 text-white py-0.5 pointer-events-none">
                {item.name}
             </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function BattleScene({ theme }: { theme: Theme }) {
  const currentTheme = themes[theme];
  return (
    <div className={clsx(
      "w-full aspect-[4/5] flex flex-col gap-4 p-4 transition-all duration-500",
      currentTheme.gridBg,
      currentTheme.container
    )}>
      <div className="flex justify-between items-end h-1/3">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex flex-col items-center">
           <div className={clsx("w-20 h-20 mb-2 flex items-center justify-center", currentTheme.accent, "rounded-full")}>
             <Sword size={32} />
           </div>
           <div className="h-2 w-24 bg-gray-700 rounded-full overflow-hidden">
             <div className="h-full bg-green-500 w-[80%]" />
           </div>
           <span className="text-xs font-bold mt-1">HERO</span>
        </motion.div>
        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex flex-col items-center">
           <div className={clsx("w-24 h-24 mb-2 flex items-center justify-center animate-bounce", currentTheme.danger, "rounded-lg")}>
             <Skull size={40} />
           </div>
           <div className="h-2 w-24 bg-gray-700 rounded-full overflow-hidden">
             <div className="h-full bg-red-500 w-[40%]" />
           </div>
           <span className="text-xs font-bold mt-1">BOSS</span>
        </motion.div>
      </div>
      
      <div className={clsx("flex-1 p-4 rounded bg-black/20 overflow-y-auto font-mono text-xs", theme === 'TERMINAL' && "text-green-500")}>
        <p className="opacity-50">Battle started...</p>
        <p>&gt; Hero uses Iron Sword! (5 DMG)</p>
        <p>&gt; Boss roars! (Morale -10%)</p>
        <p>&gt; Hero casts Fire Scroll! (12 DMG)</p>
        <p className="animate-pulse">&gt; Boss is preparing a heavy attack!</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button className={clsx("p-3 font-bold text-center", currentTheme.itemStyles.WEAPON)}>ATTACK</button>
        <button className={clsx("p-3 font-bold text-center", currentTheme.itemStyles.POTION)}>HEAL</button>
      </div>
    </div>
  );
}

function CombinedScene({ theme }: { theme: Theme }) {
  // Split view: Inventory Top, Battle Bottom (or side by side on large)
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="h-1/2 overflow-hidden scale-90 origin-top">
        <BattleScene theme={theme} />
      </div>
      <div className="h-1/2 scale-90 origin-bottom">
        <InventoryScene theme={theme} />
      </div>
    </div>
  );
}

function ItemInfoScene({ theme }: { theme: Theme }) {
  const [selected, setSelected] = useState(ITEMS[0]);
  const currentTheme = themes[theme];

  return (
    <div className={clsx(
      "w-full h-full flex flex-col gap-4 p-4 transition-all duration-500",
      currentTheme.gridBg,
      currentTheme.container
    )}>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {ITEMS.map(item => (
          <button 
            key={item.id}
            onClick={() => setSelected(item)}
            className={clsx(
              "w-12 h-12 flex-shrink-0 flex items-center justify-center border rounded",
              selected.id === item.id ? "border-current bg-white/20" : "border-transparent opacity-50"
            )}
          >
            <ItemGraphic id={item.id} theme={theme} />
          </button>
        ))}
      </div>

      <motion.div 
        key={selected.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex flex-col items-center justify-center text-center p-4 border border-white/10 rounded-xl bg-white/5"
      >
        <div className="w-32 h-32 mb-4">
          <ItemGraphic id={selected.id} theme={theme} />
        </div>
        <h2 className="text-2xl font-bold uppercase mb-1">{selected.name}</h2>
        <div className={clsx("px-2 py-1 text-xs font-bold rounded mb-4", currentTheme.itemStyles[selected.category])}>
          {selected.category}
        </div>
        <p className="opacity-80 mb-4">{selected.description}</p>
        <div className="w-full bg-black/20 p-3 rounded font-mono text-sm">
          {selected.stats}
        </div>
      </motion.div>
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
          theme === 'STEAM' && "bg-[#2b2b2b] border-4 border-[#800000] text-[#ff6347]",
          theme === 'ELDEN' && "bg-[#0f0e0b] border-y-2 border-[#9f854a] text-[#d4cbb8] shadow-[0_0_50px_rgba(159,133,74,0.3)]",
          theme === 'HADES' && "bg-[#1a0b0f] border-2 border-[#ff003c] text-[#ff003c]",
          theme === 'PERSONA' && "bg-black border-4 border-white skew-x-[-12deg] text-white"
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
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlTheme = params.get('theme') as Theme;
      if (urlTheme && Object.keys(themes).includes(urlTheme)) {
        return urlTheme;
      }
    }
    return 'ELDEN';
  });
  
  const [scene, setScene] = useState<Scene>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlScene = params.get('scene') as Scene;
      const validScenes = ['INVENTORY', 'BATTLE', 'COMBINED', 'INFO'];
      if (urlScene && validScenes.includes(urlScene)) {
        return urlScene;
      }
    }
    return 'INVENTORY';
  });

  const [showTraitor, setShowTraitor] = useState(false);

  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('theme', theme);
    params.set('scene', scene);
    window.history.replaceState(null, '', `?${params.toString()}`);
  }, [theme, scene]);

  const currentTheme = themes[theme];

  const scenes = [
    { id: 'INVENTORY', label: 'Inventory' },
    { id: 'BATTLE', label: 'Auto Battle' },
    { id: 'COMBINED', label: 'Combined' },
    { id: 'INFO', label: 'Item Database' },
  ];

  return (
    <div className={clsx(
      "min-h-screen w-full flex flex-col items-center justify-center p-4 transition-colors duration-700 relative overflow-hidden",
      currentTheme.bg,
      currentTheme.text,
      currentTheme.font
    )}>
      
      {/* Background Effects */}
      {theme === 'ELDEN' && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(159,133,74,0.05),transparent)] pointer-events-none" />
      )}
      {theme === 'HADES' && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#2d1218,transparent)] pointer-events-none opacity-50" />
      )}
      {theme === 'PERSONA' && (
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#e60012_25%,transparent_25%,transparent_75%,#e60012_75%,#e60012),linear-gradient(45deg,#e60012_25%,transparent_25%,transparent_75%,#e60012_75%,#e60012)] bg-[length:20px_20px] bg-[position:0_0,10px_10px] opacity-10 pointer-events-none" />
      )}
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
        "z-10 w-full max-w-4xl flex flex-col md:flex-row justify-between items-center mb-8 p-4 gap-4 transition-all",
        theme === 'BRUTALIST' ? "border-b-8 border-black bg-white" :
        theme === 'PHANTOM' ? "bg-transparent text-white -skew-y-2" :
        theme === 'AUTOMATA' ? "bg-[#cfcbb3] border border-[#a8a490] rounded-sm" :
        theme === 'ELDEN' ? "border-b border-[#3d382f] bg-black/20 backdrop-blur-sm" :
        theme === 'HADES' ? "border-b-2 border-[#59232c] bg-[#1a0b0f]" :
        theme === 'PERSONA' ? "bg-black text-white skew-x-[-12deg] border-b-4 border-white" :
        "bg-black/10 backdrop-blur-md rounded-full border border-white/10 shadow-xl"
      )}>
        <h1 className={clsx(
            "text-2xl font-black px-4 tracking-tighter whitespace-nowrap", 
            theme === 'PHANTOM' && "bg-black text-white p-2 skew-x-[-10deg] border-2 border-white shadow-[5px_5px_0_rgba(0,0,0,0.5)]",
            theme === 'CYBER' && "text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#ec4899] drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
        )}>
            PACK CAREFULLY
        </h1>
        
        <div className="flex flex-wrap items-center justify-center gap-2">
            <Dropdown 
              value={scene} 
              options={scenes} 
              onChange={setScene} 
              theme={theme} 
              label={scenes.find(s => s.id === scene)?.label}
            />
            <Dropdown 
              value={theme} 
              options={Object.keys(themes).map(k => ({ id: k, label: themes[k as Theme].label }))} 
              onChange={setTheme} 
              theme={theme} 
            />
            
            <button 
            onClick={() => setShowTraitor(!showTraitor)}
            className={clsx(
                "p-2 transition-colors relative group",
                showTraitor ? "bg-red-500 text-white" : "hover:bg-black/10",
                theme === 'BRUTALIST' ? "border-4 border-black bg-white hover:bg-black hover:text-white" : "rounded-full"
            )}
            title="Toggle Traitor Event"
            >
            <Eye size={20} />
            {theme === 'CYBER' && <span className="absolute inset-0 rounded-full animate-ping bg-red-500 opacity-20"></span>}
            </button>
        </div>
      </header>

      {/* Main Stage */}
      <main className={clsx("z-10 w-full max-w-md relative aspect-[4/5] transition-all duration-500", theme === 'PHANTOM' && "-skew-x-2 rotate-1")}>
        <AnimatePresence mode="wait">
          {showTraitor && <TraitorAlert key="traitor" theme={theme} />}
        </AnimatePresence>

        <div className="w-full h-full flex flex-col gap-4">
            
            {/* Conditional Rendering of Scenes */}
            <div className="flex-1 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {scene === 'INVENTORY' && (
                  <motion.div key="inventory" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="h-full flex flex-col gap-4">
                    {/* Player Status Card */}
                    <motion.div 
                      layout 
                      className={clsx(
                        "p-4 flex items-center justify-between transition-all flex-shrink-0",
                        currentTheme.container,
                        theme === 'CURSED' ? "bg-[#4a3627] border-2 border-[#f59e0b] shadow-lg" :
                        theme === 'CYBER' ? "bg-[#0f172a]/80 border border-[#10b981] shadow-[0_0_15px_rgba(16,185,129,0.2)] backdrop-blur-sm" :
                        theme === 'PHANTOM' ? "bg-black text-white border-4 border-white -skew-x-3 shadow-[8px_8px_0_rgba(200,0,0,0.5)]" :
                        theme === 'BRUTALIST' ? "bg-white border-8 border-black shadow-[12px_12px_0_black]" :
                        theme === 'AUTOMATA' ? "bg-[#cfcbb3] border border-[#a8a490]" :
                        theme === 'ELDEN' ? "bg-[#0f0e0b]/90 border border-[#3d382f]" :
                        theme === 'HADES' ? "bg-[#2d1218] border-2 border-[#59232c]" :
                        theme === 'PERSONA' ? "bg-black text-white border-4 border-white skew-x-[-6deg]" :
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

                    <InventoryScene theme={theme} />
                  </motion.div>
                )}

                {scene === 'BATTLE' && (
                  <motion.div key="battle" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="h-full">
                    <BattleScene theme={theme} />
                  </motion.div>
                )}

                {scene === 'COMBINED' && (
                  <motion.div key="combined" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                    <CombinedScene theme={theme} />
                  </motion.div>
                )}

                {scene === 'INFO' && (
                  <motion.div key="info" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full">
                    <ItemInfoScene theme={theme} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Bar (Only visible in Inventory/Battle) */}
            {(scene === 'INVENTORY' || scene === 'BATTLE') && (
              <div className={clsx("grid grid-cols-2 gap-4 mt-auto flex-shrink-0", theme === 'PHANTOM' && "gap-6")}>
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
                   theme === 'GLASS' ? "bg-white/20 backdrop-blur-md border border-white/20 text-white/80" :
                   theme === 'MIDNIGHT' ? "bg-[#1e1b4b] border border-[#312e81] text-[#6366f1]" :
                   theme === 'ROYAL' ? "bg-[#2c0b0e] border border-[#8b0000] text-[#cd853f]" :
                   theme === 'WIREFRAME' ? "bg-transparent border border-dashed border-black text-gray-500" :
                   theme === 'STEAM' ? "bg-[#3e2723] border border-[#5d4037] text-[#cd853f]" :
                   theme === 'ELDEN' ? "bg-[#0f0e0b] border border-[#3d382f] text-[#666157]" :
                   theme === 'HADES' ? "bg-[#1a0b0f] border-2 border-[#59232c] text-[#59232c]" :
                   theme === 'PERSONA' ? "bg-black text-white border-4 border-white skew-x-[12deg]" :
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
            )}
        </div>
      </main>

    </div>
  );
}

export default App;