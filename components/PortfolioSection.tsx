"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { useWindowManager } from "@/context/WindowManagerContext";
import Image from "next/image";

export default function PortfolioSection() {
  const { t } = useLang();
  const { closeWindow } = useWindowManager();

  const portfolio = t.windows.portfolio;
  
  return (
    <motion.div 
      className="absolute inset-0 z-50 overflow-y-auto overflow-x-hidden bg-[var(--bg-main)] pt-32 md:pt-48 pb-32 flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-11/12 md:w-10/12 lg:w-5/6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-32 md:mb-48 pointer-events-auto w-full">
          <div>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
            {portfolio.title}
          </h2>
          <div className="mt-2 text-xs md:text-sm tracking-[0.2em] font-bold uppercase" style={{ fontFamily: "var(--font-mono)", color: "var(--accent-primary)" }}>
            {portfolio.subtitle}
          </div>
        </div>
        
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => closeWindow("portfolio")}
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

      <div className="flex flex-col gap-16 pointer-events-auto">
        {portfolio.projects.map((project: any, i: number) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
            className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16 border-t-[8px] pt-16 pb-12 relative group"
            style={{ borderColor: "var(--text-primary)" }}
          >
            <div className="absolute -top-6 right-4 text-8xl md:text-[12rem] font-black opacity-[0.04] pointer-events-none leading-none select-none" style={{ fontFamily: "var(--font-heading)" }}>
              {project.id}
            </div>

            <div className="flex-1 flex flex-col justify-between relative z-10 max-w-3xl">
              <div>
                <div className="text-[10px] md:text-xs tracking-[0.15em] font-bold mb-3" style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                  {project.tag}
                </div>
                <h3 className="text-2xl md:text-4xl font-bold uppercase tracking-tight mb-4" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
                  {project.name}
                </h3>
                <p className="text-base md:text-lg font-normal leading-relaxed max-w-2xl mb-6" style={{ color: "var(--text-secondary)" }}>
                  {project.desc}
                </p>
              </div>

              {project.links && project.links.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-auto">
                  {project.links.map((link: any, linkIdx: number) => (
                    <a 
                      key={linkIdx} 
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-sm border-2 inline-block font-bold tracking-wider uppercase transition-all duration-300"
                      style={{ 
                        borderColor: "var(--accent-primary)", 
                        color: "var(--accent-primary)",
                        fontFamily: "var(--font-mono)",
                        boxShadow: "4px 4px 0px var(--accent-primary)"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--accent-primary)";
                        e.currentTarget.style.color = "var(--bg-main)";
                        e.currentTarget.style.boxShadow = "0px 0px 0px transparent";
                        e.currentTarget.style.transform = "translate(4px, 4px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "var(--accent-primary)";
                        e.currentTarget.style.boxShadow = "4px 4px 0px var(--accent-primary)";
                        e.currentTarget.style.transform = "translate(0px, 0px)";
                      }}
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>
            
            {project.image && (
              <div className="w-full sm:w-2/3 md:w-1/2 lg:w-[350px] relative z-10 shrink-0 mx-auto lg:mx-0 mt-8 lg:mt-0">
                {/* Constructivist Layered Frame */}
                <div className="absolute inset-0 translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6" style={{ backgroundColor: "var(--accent-primary)" }} aria-hidden></div>
                <div className="absolute inset-0 translate-x-2 translate-y-2" style={{ backgroundColor: "var(--text-primary)" }} aria-hidden></div>
                
                <div className="relative aspect-[4/3] border-4 overflow-hidden bg-[var(--bg-surface-2)]" style={{ borderColor: "var(--text-primary)" }}>
                  <Image 
                    src={project.image} 
                    alt={project.name}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            )}
          </motion.div>
        ))}
        </div>
      </div>
    </motion.div>
  );
}
