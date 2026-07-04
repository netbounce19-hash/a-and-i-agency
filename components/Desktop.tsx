"use client";

import React from "react";
import { motion } from "framer-motion";
import ShapeGrid from "@/components/ShapeGrid";
import { useLang } from "@/context/LangContext";

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

  return (
    <div
      className="relative w-full h-full overflow-y-auto scroll-smooth"
      style={{ background: "var(--bg-main)", transition: "background 0.25s ease" }}
    >
      {/* Fixed Background Elements */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
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
        className="fixed top-0 left-0 right-0 h-16 border-b-2 flex items-center justify-between px-6 md:px-12 z-50 transition-colors duration-250 select-none"
        style={{
          borderColor: "var(--border-main)",
          background: "var(--bg-main)",
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
          <a href="#capabilities" className="hover:text-[var(--accent-primary)] transition-colors duration-200 uppercase">
            [{t.nav.capabilities}]
          </a>
          <span className="text-[var(--border-subtle)] select-none">//</span>
          <a href="#portfolio" className="hover:text-[var(--accent-primary)] transition-colors duration-200 uppercase">
            [{t.nav.deployed_assets}]
          </a>
          <span className="text-[var(--border-subtle)] select-none">//</span>
          <a href="#initialize" className="hover:text-[var(--accent-primary)] transition-colors duration-200 uppercase">
            [{t.nav.initialize_system}]
          </a>
        </nav>
      </header>

      {/* Scrollable Layout Content */}
      <div className="relative z-10 w-full min-h-full flex flex-col items-center pt-16 pb-32">
        
        {/* ── 2. HERO SECTION ── */}
        <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-20 w-full max-w-4xl border-b-2 border-dashed border-[var(--border-subtle)] relative z-20">
          <motion.div 
            className="relative mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
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
          </motion.div>

          <motion.div
            className="text-xs md:text-sm tracking-[0.4em] uppercase text-center px-4 font-bold mt-4"
            style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)", transition: "color 0.25s" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {t.desktop.subtitle}
          </motion.div>

          {/* More readable, lower description with proportional margins & padding */}
          <motion.p
            className="mt-16 text-base md:text-lg lg:text-xl max-w-3xl text-center font-mono font-medium tracking-wide leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {t.desktop.subheadline}
          </motion.p>

          <motion.div 
            className="mt-20 text-lg text-[var(--accent-primary)] font-mono font-bold"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.div>
        </section>

        {/* ── 3. SERVICES SECTION ── */}
        <section 
          id="capabilities" 
          className="w-full max-w-5xl px-6 md:px-12 py-28 border-b-2 border-dashed border-[var(--border-subtle)]"
        >
          <div className="mb-16">
            <h2 
              className="text-4xl md:text-6xl font-black uppercase tracking-tighter"
              style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
            >
              {t.sections.capabilities.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            {/* Column 01 */}
            <div className="relative group">
              <div className="absolute inset-0 translate-x-4 translate-y-4 bg-[var(--accent-primary)] transition-transform duration-300 group-hover:translate-x-6 group-hover:translate-y-6" />
              <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-[var(--text-primary)]" />
              
              <div className="relative border-4 border-[var(--border-main)] bg-[var(--bg-surface)] pt-20 pb-12 px-10 md:pt-24 md:pb-16 md:px-14 min-h-[380px] md:min-h-[440px] flex flex-col justify-between transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1">
                <div className="absolute top-0 left-0 right-0 h-3 bg-[var(--accent-primary)]" />
                <h3 
                  className="text-2xl md:text-3xl font-black uppercase tracking-tight mt-2 mb-6 leading-none"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                >
                  {t.sections.capabilities.col1.title}
                </h3>
                <p className="text-base font-mono leading-relaxed text-[var(--text-secondary)] flex-1">
                  {t.sections.capabilities.col1.content}
                </p>
              </div>
            </div>

            {/* Column 02 */}
            <div className="relative group">
              <div className="absolute inset-0 translate-x-4 translate-y-4 bg-[var(--accent-secondary)] transition-transform duration-300 group-hover:translate-x-6 group-hover:translate-y-6" />
              <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-[var(--text-primary)]" />
              
              <div className="relative border-4 border-[var(--border-main)] bg-[var(--bg-surface)] pt-20 pb-12 px-10 md:pt-24 md:pb-16 md:px-14 min-h-[380px] md:min-h-[440px] flex flex-col justify-between transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1">
                <div className="absolute top-0 left-0 right-0 h-3 bg-[var(--accent-secondary)]" />
                <h3 
                  className="text-2xl md:text-3xl font-black uppercase tracking-tight mt-2 mb-6 leading-none"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                >
                  {t.sections.capabilities.col2.title}
                </h3>
                <p className="text-base font-mono leading-relaxed text-[var(--text-secondary)] flex-1">
                  {t.sections.capabilities.col2.content}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. PROJECTS SECTION ── */}
        <section 
          id="portfolio" 
          className="w-full max-w-5xl px-6 md:px-12 py-28 border-b-2 border-dashed border-[var(--border-subtle)]"
        >
          <div className="mb-16">
            <h2 
              className="text-4xl md:text-6xl font-black uppercase tracking-tighter"
              style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
            >
              {t.sections.deployed_assets.title}
            </h2>
          </div>

          <div className="flex flex-col gap-16">
            {/* Case 01 */}
            <div 
              className="border-t-4 border-[var(--border-main)] pt-12 pb-6 flex flex-col md:flex-row justify-between items-start gap-8 relative group"
            >
              <div className="flex-1 max-w-3xl">
                <h3 
                  className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4 leading-none"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                >
                  {t.sections.deployed_assets.case1.title}
                </h3>
                <p className="text-base md:text-lg font-mono leading-relaxed text-[var(--text-secondary)]">
                  {t.sections.deployed_assets.case1.desc}
                </p>
              </div>
            </div>

            {/* Case 02 */}
            <div 
              className="border-t-4 border-[var(--border-main)] pt-12 pb-6 flex flex-col md:flex-row justify-between items-start gap-8 relative group"
            >
              <div className="flex-1 max-w-3xl">
                <h3 
                  className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4 leading-none"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                >
                  {t.sections.deployed_assets.case2.title}
                </h3>
                <p className="text-base md:text-lg font-mono leading-relaxed text-[var(--text-secondary)]">
                  {t.sections.deployed_assets.case2.desc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. CONTACT AUDIT SECTION ── */}
        <section 
          id="initialize" 
          className="w-full max-w-4xl px-6 md:px-12 py-28 pb-40"
        >
          <div className="mb-16 text-center">
            <h2 
              className="text-4xl md:text-6xl font-black uppercase tracking-tighter"
              style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
            >
              {t.sections.initialize.title}
            </h2>
          </div>

          <div 
            className="w-full border-4 border-[var(--border-main)] overflow-hidden bg-[var(--bg-surface)] p-8 md:p-16 relative z-20 flex flex-col gap-8"
            style={{ boxShadow: "var(--window-shadow)", borderColor: "var(--border-main)" }}
          >
            <div className="font-mono text-base md:text-lg leading-relaxed text-center max-w-2xl mx-auto">
              <p style={{ color: "var(--text-primary)" }}>
                {t.sections.initialize.desc}
              </p>
            </div>

            {/* Spacious booking widget area */}
            <div 
              className="mt-4 border-2 border-dashed p-10 md:p-14 flex flex-col items-center justify-center text-center gap-8"
              style={{
                borderColor: "var(--border-main)",
                background: "var(--bg-surface-3)",
              }}
            >
              <a
                href="mailto:contact@a-and-i.agency?subject=Request%20System%20Audit"
                className="px-10 py-5 border-4 text-base font-bold font-mono tracking-[0.2em] transition-all duration-300 select-none cursor-pointer"
                style={{
                  borderColor: "var(--border-main)",
                  background: "var(--accent-primary)",
                  color: "var(--bg-main)",
                  boxShadow: "6px 6px 0px var(--border-main)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0px 0px 0px transparent";
                  e.currentTarget.style.transform = "translate(6px, 6px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "6px 6px 0px var(--border-main)";
                  e.currentTarget.style.transform = "translate(0px, 0px)";
                }}
              >
                {t.sections.initialize.button} ↗
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
