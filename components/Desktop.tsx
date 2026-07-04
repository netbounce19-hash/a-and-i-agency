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
      <div className="relative z-10 w-full min-h-full flex flex-col items-center pt-16 pb-24">
        
        {/* ── 2. HERO SECTION ── */}
        <section className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-16 w-full max-w-4xl border-b-2 border-dashed border-[var(--border-subtle)] relative z-20">
          <motion.div 
            className="relative mb-4"
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

          <motion.p
            className="mt-8 text-sm md:text-base max-w-2xl text-center font-mono font-medium tracking-wide leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {t.desktop.subheadline}
          </motion.p>

          <motion.div 
            className="mt-16 text-lg text-[var(--accent-primary)] font-mono font-bold"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.div>
        </section>

        {/* ── 3. CAPABILITIES SECTION ── */}
        <section 
          id="capabilities" 
          className="w-full max-w-5xl px-6 md:px-12 py-24 border-b-2 border-dashed border-[var(--border-subtle)]"
        >
          <div className="mb-12">
            <span className="text-xs font-mono tracking-[0.3em] font-bold text-[var(--accent-primary)] uppercase">
              [SERVICES_KERNEL // STACK_v3]
            </span>
            <h2 
              className="text-3xl md:text-5xl font-black uppercase tracking-tighter mt-2"
              style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
            >
              {t.sections.capabilities.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Column 01 */}
            <div className="relative group">
              <div className="absolute inset-0 translate-x-3 translate-y-3 bg-[var(--accent-primary)] transition-transform duration-300 group-hover:translate-x-4 group-hover:translate-y-4" />
              <div className="absolute inset-0 translate-x-1 translate-y-1 bg-[var(--text-primary)]" />
              
              <div className="relative border-2 border-[var(--border-main)] bg-[var(--bg-surface)] p-8 flex flex-col h-full transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1">
                <div className="absolute top-0 left-0 right-0 h-2 bg-[var(--accent-primary)]" />
                <h3 
                  className="text-xl md:text-2xl font-black uppercase tracking-tight mt-4 mb-4"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                >
                  {t.sections.capabilities.col1.title}
                </h3>
                <p className="text-sm font-mono leading-relaxed text-[var(--text-secondary)]">
                  {t.sections.capabilities.col1.content}
                </p>
                
                <div className="mt-8 pt-4 border-t border-[var(--border-subtle)] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-primary)] animate-pulse" />
                  <span className="text-[10px] font-bold font-mono tracking-widest text-[var(--text-muted)] uppercase">
                    STATUS_CORE_ACTIVE
                  </span>
                </div>
              </div>
            </div>

            {/* Column 02 */}
            <div className="relative group">
              <div className="absolute inset-0 translate-x-3 translate-y-3 bg-[var(--accent-secondary)] transition-transform duration-300 group-hover:translate-x-4 group-hover:translate-y-4" />
              <div className="absolute inset-0 translate-x-1 translate-y-1 bg-[var(--text-primary)]" />
              
              <div className="relative border-2 border-[var(--border-main)] bg-[var(--bg-surface)] p-8 flex flex-col h-full transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1">
                <div className="absolute top-0 left-0 right-0 h-2 bg-[var(--accent-secondary)]" />
                <h3 
                  className="text-xl md:text-2xl font-black uppercase tracking-tight mt-4 mb-4"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                >
                  {t.sections.capabilities.col2.title}
                </h3>
                <p className="text-sm font-mono leading-relaxed text-[var(--text-secondary)]">
                  {t.sections.capabilities.col2.content}
                </p>
                
                <div className="mt-8 pt-4 border-t border-[var(--border-subtle)] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-secondary)] animate-pulse" />
                  <span className="text-[10px] font-bold font-mono tracking-widest text-[var(--text-muted)] uppercase">
                    STATUS_AGENT_ACTIVE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. DEPLOYED ASSETS SECTION ── */}
        <section 
          id="portfolio" 
          className="w-full max-w-5xl px-6 md:px-12 py-24 border-b-2 border-dashed border-[var(--border-subtle)]"
        >
          <div className="mb-12">
            <span className="text-xs font-mono tracking-[0.3em] font-bold text-[var(--accent-primary)] uppercase">
              [PROD_LOGS // DEPLOYED_SYSTEMS]
            </span>
            <h2 
              className="text-3xl md:text-5xl font-black uppercase tracking-tighter mt-2"
              style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
            >
              {t.sections.deployed_assets.title}
            </h2>
          </div>

          <div className="flex flex-col gap-12">
            {/* Case 01 */}
            <div 
              className="border-t-4 border-[var(--border-main)] pt-8 flex flex-col md:flex-row justify-between items-start gap-6 relative group"
            >
              <div className="absolute top-2 right-2 text-8xl md:text-9xl font-black opacity-[0.03] select-none font-mono pointer-events-none">
                A_01
              </div>

              <div className="flex-1 max-w-2xl">
                <span className="text-[10px] font-mono tracking-[0.2em] text-[var(--accent-primary)] font-bold">
                  [SYS_FINANCE // LOGISTICS]
                </span>
                <h3 
                  className="text-xl md:text-2xl font-black uppercase tracking-tight mt-1 mb-4"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                >
                  {t.sections.deployed_assets.case1.title}
                </h3>
                <p className="text-sm md:text-base font-mono leading-relaxed text-[var(--text-secondary)]">
                  {t.sections.deployed_assets.case1.desc}
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 md:self-end">
                <span className="px-4 py-2 border-2 border-[var(--border-main)] text-xs font-bold font-mono tracking-widest text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-main)] transition-colors duration-200 cursor-default select-none">
                  ASSET_STATUS // OK
                </span>
              </div>
            </div>

            {/* Case 02 */}
            <div 
              className="border-t-4 border-[var(--border-main)] pt-8 flex flex-col md:flex-row justify-between items-start gap-6 relative group"
            >
              <div className="absolute top-2 right-2 text-8xl md:text-9xl font-black opacity-[0.03] select-none font-mono pointer-events-none">
                A_02
              </div>

              <div className="flex-1 max-w-2xl">
                <span className="text-[10px] font-mono tracking-[0.2em] text-[var(--accent-secondary)] font-bold">
                  [SYS_ECOM // INTELLIGENCE]
                </span>
                <h3 
                  className="text-xl md:text-2xl font-black uppercase tracking-tight mt-1 mb-4"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                >
                  {t.sections.deployed_assets.case2.title}
                </h3>
                <p className="text-sm md:text-base font-mono leading-relaxed text-[var(--text-secondary)]">
                  {t.sections.deployed_assets.case2.desc}
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 md:self-end">
                <span className="px-4 py-2 border-2 border-[var(--border-main)] text-xs font-bold font-mono tracking-widest text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-main)] transition-colors duration-200 cursor-default select-none">
                  ASSET_STATUS // OK
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. SYSTEM INITIALIZATION ── */}
        <section 
          id="initialize" 
          className="w-full max-w-5xl px-6 md:px-12 py-24 pb-36"
        >
          <div className="mb-12">
            <span className="text-xs font-mono tracking-[0.3em] font-bold text-[var(--accent-primary)] uppercase">
              [AUDIT_INIT // ROOT_ACCESS]
            </span>
            <h2 
              className="text-3xl md:text-5xl font-black uppercase tracking-tighter mt-2"
              style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
            >
              {t.sections.initialize.title}
            </h2>
          </div>

          <div 
            className="w-full border-4 border-[var(--border-main)] overflow-hidden bg-[var(--terminal-bg)] text-[var(--terminal-green)] p-6 md:p-10 relative z-20 flex flex-col gap-6"
            style={{ boxShadow: "var(--window-shadow)", borderColor: "var(--border-main)" }}
          >
            {/* Terminal header */}
            <div 
              className="absolute top-0 left-0 right-0 h-8 border-b-2 flex items-center px-4 justify-between select-none"
              style={{
                borderColor: "var(--border-main)",
                background: "var(--titlebar-bg)",
              }}
            >
              <span className="text-[10px] font-mono tracking-widest text-[var(--text-primary)] font-bold">
                SYS_AUDIT_INITIALIZATION_MODULE // PORT_8080
              </span>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-primary)] border" style={{ borderColor: "var(--border-main)" }} />
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--text-primary)] border" style={{ borderColor: "var(--border-main)" }} />
              </div>
            </div>

            <div className="mt-6 font-mono text-sm leading-relaxed space-y-4">
              <p style={{ color: "var(--accent-primary)", opacity: 0.5 }}>
                &gt; SYSTEM STATUS: READY // READY TO CONFIGURE AUDIT...
              </p>
              <p className="text-base md:text-lg" style={{ color: "var(--text-primary)" }}>
                {t.sections.initialize.desc}
              </p>
            </div>

            {/* Interactive Scheduling Container */}
            <div 
              className="mt-8 border-2 border-dashed p-8 flex flex-col items-center justify-center text-center gap-6"
              style={{
                borderColor: "var(--border-main)",
                background: "var(--bg-surface-3)",
              }}
            >
              <span className="text-xs font-mono tracking-widest text-[var(--text-secondary)]">
                [ SCHEDULING INTERFACE PLACEHOLDER ]
              </span>
              
              <a
                href="mailto:contact@a-and-i.agency?subject=Request%20System%20Audit"
                className="px-8 py-4 border-2 text-sm font-bold font-mono tracking-[0.2em] transition-all duration-300 select-none cursor-pointer"
                style={{
                  borderColor: "var(--border-main)",
                  background: "var(--accent-primary)",
                  color: "var(--bg-main)",
                  boxShadow: "4px 4px 0px var(--border-main)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0px 0px 0px transparent";
                  e.currentTarget.style.transform = "translate(4px, 4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "4px 4px 0px var(--border-main)";
                  e.currentTarget.style.transform = "translate(0px, 0px)";
                }}
              >
                {t.sections.initialize.button} ↗
              </a>
              
              <span className="text-[10px] font-mono tracking-wider text-[var(--text-muted)]">
                * Connecting to secure booking node. Session fully encrypted.
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
