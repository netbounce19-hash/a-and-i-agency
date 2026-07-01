"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { useWindowManager } from "@/context/WindowManagerContext";

const ACCENTS = ["#FF6037", "#733635", "#A0C9CB"];
const COLUMN_ICONS = [
  <svg key="web" viewBox="0 0 44 44" className="w-12 h-12">
    <rect x="2" y="2" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" />
    <line x1="2" y1="14" x2="42" y2="14" stroke="currentColor" strokeWidth="2" />
    <rect x="8" y="22" width="28" height="4" fill="currentColor" />
    <rect x="8" y="30" width="16" height="4" fill="currentColor" />
  </svg>,
  <svg key="mob" viewBox="0 0 44 44" className="w-12 h-12">
    <rect x="12" y="2" width="20" height="40" fill="none" stroke="currentColor" strokeWidth="2" />
    <line x1="12" y1="9"  x2="32" y2="9"  stroke="currentColor" strokeWidth="2" />
    <line x1="12" y1="36" x2="32" y2="36" stroke="currentColor" strokeWidth="2" />
    <circle cx="22" cy="39" r="2.5" fill="currentColor" />
  </svg>,
  <svg key="ai" viewBox="0 0 44 44" className="w-12 h-12">
    <circle cx="22" cy="22" r="14" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="22" cy="22" r="6"  fill="currentColor" />
    <line x1="22" y1="2"  x2="22" y2="8"  stroke="currentColor" strokeWidth="2" />
    <line x1="22" y1="36" x2="22" y2="42" stroke="currentColor" strokeWidth="2" />
    <line x1="2"  y1="22" x2="8"  y2="22" stroke="currentColor" strokeWidth="2" />
    <line x1="36" y1="22" x2="42" y2="22" stroke="currentColor" strokeWidth="2" />
  </svg>,
];

export default function ServicesSection() {
  const { t } = useLang();
  const { closeWindow } = useWindowManager();
  const services = t.windows.services;
  
  const [activeCol, setActiveCol] = useState<string | null>(null);

  return (
    <motion.div 
      className="absolute inset-0 z-50 overflow-y-auto overflow-x-hidden bg-[var(--bg-main)] pt-48 md:pt-[25vh] pb-32 flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-11/12 md:w-10/12 lg:w-5/6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-32 md:mb-[15vh] pointer-events-auto w-full">
          <div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
              {services.title}
            </h2>
            <div className="mt-2 text-xs md:text-sm tracking-[0.2em] font-bold uppercase" style={{ fontFamily: "var(--font-mono)", color: "var(--accent-primary)" }}>
              {services.subtitle}
            </div>
          </div>
          
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => closeWindow("services")}
            className="px-4 py-2 border-2 text-sm transition-colors duration-200 uppercase font-bold tracking-widest cursor-pointer hover:bg-[var(--text-primary)] hover:text-[var(--bg-main)] outline-none"
            style={{ 
              borderColor: "var(--text-primary)", 
              color: "currentColor",
              fontFamily: "var(--font-mono)",
              boxShadow: "4px 4px 0px var(--text-primary)"
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0px 0px 0px transparent"}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = "4px 4px 0px var(--text-primary)"}
          >
            [X] CLOSE
          </motion.button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8 pointer-events-auto w-full">
          {services.columns.map((col: any, i: number) => (
            <motion.div 
              key={col.id}
              onMouseEnter={() => setActiveCol(col.id)}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              className="relative group h-full flex flex-col"
            >
              {/* Constructivist Layered Shadows */}
              <div 
                className="absolute inset-0 translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6" 
                style={{ backgroundColor: ACCENTS[i] }} 
                aria-hidden
              >
                {/* Texture on shadow */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.8) 2px, rgba(0,0,0,0.8) 4px)"
                  }}
                />
              </div>
              <div 
                className="absolute inset-0 translate-x-2 translate-y-2" 
                style={{ backgroundColor: "var(--text-primary)" }} 
                aria-hidden
              />
              
              {/* Main Content Block */}
              <div 
                className="relative h-full border-4 flex flex-col bg-[var(--bg-surface-2)] p-8 md:p-12 transition-transform duration-500 group-hover:-translate-y-2 group-hover:-translate-x-2"
                style={{ borderColor: "var(--text-primary)" }}
              >
                {/* Top thick bar */}
                <div 
                  className="absolute top-0 left-0 right-0 h-4"
                  style={{ backgroundColor: ACCENTS[i] }}
                />
                
                {/* ID Header */}
                <div className="flex justify-between items-center mb-10 mt-4">
                  <div className="text-6xl font-black" style={{ fontFamily: "var(--font-heading)", color: ACCENTS[i] }}>
                    {col.id}
                  </div>
                  <div style={{ color: ACCENTS[i] }}>
                    {COLUMN_ICONS[i]}
                  </div>
                </div>

                <div className="text-xs tracking-[0.2em] font-bold mb-4" style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                  [{col.tag}]
                </div>
                
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none mb-6" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
                  {col.title}
                </h3>
                
                <p className="text-base md:text-lg font-medium leading-relaxed mt-auto" style={{ color: "var(--text-secondary)" }}>
                  {col.desc}
                </p>

                {/* Status dot */}
                <div className="mt-12 flex items-center gap-3 pt-6 border-t-[3px]" style={{ borderColor: "var(--text-primary)" }}>
                  <div className="w-4 h-4 rounded-full animate-pulse" style={{ background: ACCENTS[i] }} />
                  <span className="text-sm font-bold tracking-widest uppercase" style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>
                    SYSTEM_ACTIVE
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* App Dev Hover Section */}
        <AnimatePresence>
          {activeCol === '02' && services.appDevHover && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 64 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full rounded-[2rem] overflow-hidden bg-[#e5e0d4] pointer-events-auto"
            >
              {/* Massive Background Typography */}
              <div className="absolute inset-0 flex items-center justify-between overflow-hidden opacity-90 pointer-events-none px-4 md:px-12 select-none">
                <span className="text-[25vw] md:text-[30vw] font-black leading-none text-[#1a1a1a] tracking-tighter" style={{ fontFamily: "var(--font-heading)" }}>
                  {services.appDevHover.bgText[0]}
                </span>
                <span className="text-[25vw] md:text-[30vw] font-black leading-none text-[#1a1a1a] tracking-tighter" style={{ fontFamily: "var(--font-heading)" }}>
                  {services.appDevHover.bgText[1]}
                </span>
              </div>

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 p-12 md:p-24 min-h-[600px]">
                
                {/* Left side: Steps */}
                <div className="flex-1 max-w-lg space-y-6 bg-[#e5e0d4]/80 backdrop-blur-sm p-8 rounded-3xl md:bg-transparent md:backdrop-blur-none md:p-0">
                  <h4 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-[#1a1a1a] mb-12" style={{ fontFamily: "var(--font-heading)" }}>
                    {services.appDevHover.title}
                  </h4>
                  <div className="space-y-6">
                    {services.appDevHover.steps.map((step: string, index: number) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.05 }}
                        className="flex items-center gap-4 text-[#1a1a1a]"
                      >
                        <div className="w-3 h-3 rounded-full bg-[#1a1a1a]" />
                        <span className="text-lg md:text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                          {step}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Right side: Phone Mockup */}
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex-shrink-0"
                >
                  <div className="relative w-[280px] h-[580px] md:w-[340px] md:h-[700px] border-[12px] border-[#1a1a1a] rounded-[3rem] overflow-hidden bg-black shadow-2xl">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-7 bg-[#1a1a1a] rounded-b-2xl z-20" />
                    
                    {/* App Screenshot */}
                    <img 
                      src="/images/truckersbudget.webp" 
                      alt="App Screenshot" 
                      className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </motion.div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
