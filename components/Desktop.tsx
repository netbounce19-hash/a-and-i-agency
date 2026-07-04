"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ShapeGrid from "@/components/ShapeGrid";
import Window from "@/components/Window";
import ContactWindow from "@/components/windows/ContactWindow";
import PortfolioSection from "@/components/PortfolioSection";
import ServicesSection from "@/components/ServicesSection";
import { useLang } from "@/context/LangContext";
import { useWindowManager } from "@/context/WindowManagerContext";

function ConstructivistDecor() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {/* Left accent bar */}
      <motion.div
        className="absolute top-0 left-0 w-1"
        style={{ height: "40%", opacity: 0.7, background: "var(--accent-primary)" }}
        animate={{ height: ["35%", "45%", "35%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Rotating square — top right */}
      <motion.div
        className="absolute top-24 right-8 w-24 h-24 border-2"
        style={{ opacity: 0.3, borderColor: "var(--accent-secondary)" }}
        animate={{ rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-32 right-16 w-12 h-12 border-2"
        style={{ opacity: 0.4, borderColor: "var(--accent-primary)" }}
        animate={{ rotate: [45, 135, 45] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      {/* Pulsing circle — bottom left */}
      <motion.div
        className="absolute bottom-16 left-12 w-32 h-32 rounded-full border"
        style={{ opacity: 0.3, borderColor: "var(--border-main)" }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Centre crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ opacity: 0.06 }}>
        <div className="w-px h-32 bg-[currentColor] absolute left-1/2 -translate-x-1/2 -top-16" style={{ color: "var(--text-primary)" }} />
        <div className="h-px w-32 bg-[currentColor] absolute top-1/2 -translate-y-1/2 -left-16" style={{ color: "var(--text-primary)" }} />
      </div>
      {/* Diagonal stripe — bottom right */}
      <div
        className="absolute bottom-20 right-10 w-40 h-40"
        style={{
          opacity: 0.15,
          background: "repeating-linear-gradient(45deg,var(--accent-primary),var(--accent-primary) 1px,transparent 1px,transparent 10px)",
        }}
      />
    </div>
  );
}

export default function Desktop() {
  const { t } = useLang();
  const { isOpen, openWindow } = useWindowManager();
  
  const isPortfolioOpen = isOpen("portfolio");
  const isServicesOpen = isOpen("services");

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: "var(--bg-main)", transition: "background 0.25s ease" }}
    >
      {/* Fixed Background Elements */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <ShapeGrid 
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="var(--grid-color-fine)"
          hoverFillColor="var(--accent-primary)"
          shape="square"
          hoverTrailAmount={0}
        />
        <div className="crt-overlay absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} aria-hidden />
        <ConstructivistDecor />
      </div>

      {/* ── 1. HEADER & NAVIGATION ── */}
      <header 
        className="fixed top-0 left-0 right-0 h-16 border-b-2 flex items-center justify-between px-6 md:px-12 z-50 transition-colors duration-250 select-none bg-[var(--bg-main)]"
        style={{
          borderColor: "var(--border-main)",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[var(--accent-primary)] animate-pulse" />
          <span 
            className="text-lg md:text-xl font-black uppercase tracking-tighter" 
            style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
          >
            A-AND-I
          </span>
        </div>
        
        <nav className="flex items-center gap-2 md:gap-6 text-[10px] md:text-xs font-bold font-mono tracking-widest text-[var(--text-muted)]">
          <button 
            onClick={() => openWindow("services")}
            className="hover:text-[var(--accent-primary)] transition-colors duration-200 uppercase cursor-pointer outline-none"
          >
            [{t.nav.capabilities}]
          </button>
          <span className="text-[var(--border-subtle)] select-none">//</span>
          <button 
            onClick={() => openWindow("portfolio")}
            className="hover:text-[var(--accent-primary)] transition-colors duration-200 uppercase cursor-pointer outline-none"
          >
            [{t.nav.deployed_assets}]
          </button>
          <span className="text-[var(--border-subtle)] select-none">//</span>
          <button 
            onClick={() => openWindow("contact")}
            className="hover:text-[var(--accent-primary)] transition-colors duration-200 uppercase cursor-pointer outline-none"
          >
            [{t.nav.initialize_system}]
          </button>
        </nav>
      </header>

      {/* Main OS Desktop Workspace */}
      <AnimatePresence>
        {(!isPortfolioOpen && !isServicesOpen) && (
          <motion.div
            key="desktop-workspace"
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {/* Logo */}
            <div className="relative">
              <h1
                className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none text-center"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--text-primary)",
                  textShadow: "6px 6px 0px var(--accent-primary)",
                  transition: "color 0.25s ease",
                }}
              >
                A-AND-I
              </h1>
              <div className="absolute -bottom-1 left-0 right-0 h-[4px]" style={{ background: "var(--accent-primary)" }} />
            </div>

            {/* Guaranteed Spacer: Logo to Subtitle */}
            <div style={{ height: "48px" }} aria-hidden />

            {/* Subtitle */}
            <div
              className="text-xs md:text-sm tracking-[0.4em] uppercase text-center px-4 font-bold"
              style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)", transition: "color 0.25s" }}
            >
              {t.desktop.subtitle}
            </div>

            {/* Guaranteed Spacer: Subtitle to Description */}
            <div style={{ height: "64px" }} aria-hidden />

            {/* Description paragraph */}
            <p
              className="text-base md:text-lg max-w-2xl text-center font-mono font-medium tracking-wide leading-relaxed pointer-events-auto px-6"
              style={{ color: "var(--text-secondary)" }}
            >
              {t.desktop.subheadline}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-screen Overlay Pages */}
      <AnimatePresence>
        {isPortfolioOpen && <PortfolioSection key="portfolio-section" />}
        {isServicesOpen && <ServicesSection key="services-section" />}
      </AnimatePresence>

      {/* Pop-up Windows */}
      <Window 
        id="contact" 
        title={t.windows.contact.title} 
        subtitle={t.windows.contact.subtitle} 
        defaultPosition={{ x: 200, y: 50 }} 
        defaultWidth={560}
      >
        <ContactWindow />
      </Window>
    </div>
  );
}
