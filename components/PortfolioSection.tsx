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
      className="absolute inset-0 z-50 flex flex-col pt-24 pb-32 px-6 md:px-16 lg:px-24 overflow-y-auto bg-[var(--bg-main)]/90 backdrop-blur-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex justify-between items-start mb-16 pointer-events-auto">
        <div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
            {portfolio.title}
          </h2>
          <div className="mt-2 text-sm md:text-base tracking-[0.3em] font-bold uppercase" style={{ fontFamily: "var(--font-mono)", color: "var(--accent-primary)" }}>
            {portfolio.subtitle}
          </div>
        </div>
        
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => closeWindow("portfolio")}
          className="px-6 py-3 border-2 transition-colors duration-200 uppercase font-bold tracking-widest cursor-pointer hover:bg-[var(--text-primary)] hover:text-[var(--bg-main)] outline-none"
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

      <div className="flex flex-col gap-24 pointer-events-auto">
        {portfolio.projects.map((project: any, i: number) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
            className="flex flex-col lg:flex-row gap-8 lg:gap-16 border-t-4 pt-8 relative group"
            style={{ borderColor: "var(--border-main)" }}
          >
            <div className="absolute top-8 right-0 text-8xl md:text-[12rem] font-black opacity-5 pointer-events-none leading-none select-none" style={{ fontFamily: "var(--font-heading)" }}>
              {project.id}
            </div>

            <div className="flex-1 flex flex-col justify-between relative z-10">
              <div>
                <div className="text-xs md:text-sm tracking-[0.2em] font-bold mb-4" style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                  {project.tag}
                </div>
                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
                  {project.name}
                </h3>
                <p className="text-lg md:text-xl font-medium leading-relaxed max-w-2xl mb-8" style={{ color: "var(--text-secondary)" }}>
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
                      className="px-6 py-3 border-2 inline-block font-bold tracking-widest uppercase transition-all duration-300"
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
              <div className="w-full lg:w-5/12 aspect-[4/3] relative border-2 overflow-hidden bg-[var(--bg-surface-2)] z-10" style={{ borderColor: "var(--border-main)" }}>
                <Image 
                  src={project.image} 
                  alt={project.name}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
