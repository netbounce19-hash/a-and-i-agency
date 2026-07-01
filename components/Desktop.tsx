"use client";

import React from "react";
import { motion } from "framer-motion";
import DesktopIcon from "@/components/DesktopIcon";
import Window from "@/components/Window";

import ServicesWindow from "@/components/windows/ServicesWindow";
import ContactWindow from "@/components/windows/ContactWindow";
import { useLang } from "@/context/LangContext";
import { AnimatePresence } from "framer-motion";
import { useWindowManager } from "@/context/WindowManagerContext";
import PortfolioSection from "@/components/PortfolioSection";

function BauhausGrid() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <pattern id="fine-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--grid-color-fine)" strokeWidth="0.5" />
        </pattern>
        <pattern id="coarse-grid" width="200" height="200" patternUnits="userSpaceOnUse">
          <path d="M 200 0 L 0 0 0 200" fill="none" stroke="var(--grid-color-coarse)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#fine-grid)" />
      <rect width="100%" height="100%" fill="url(#coarse-grid)" />
    </svg>
  );
}

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
        className="absolute top-8 right-8 w-24 h-24 border-2"
        style={{ opacity: 0.3, borderColor: "var(--accent-secondary)" }}
        animate={{ rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-16 right-16 w-12 h-12 border-2"
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
        className="absolute bottom-10 right-10 w-40 h-40"
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
  const { isOpen } = useWindowManager();
  const isPortfolioOpen = isOpen("portfolio");

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: "var(--bg-main)", transition: "background 0.25s ease" }}
    >
      <BauhausGrid />
      <div className="crt-overlay absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} aria-hidden />
      <ConstructivistDecor />

      <AnimatePresence>
        {!isPortfolioOpen && (
          <motion.div
            key="agency-title"
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none"
            style={{ zIndex: 2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <div className="relative">
              <h1
                className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-center"
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

            <div
              className="text-[12px] md:text-[14px] tracking-[0.4em] uppercase text-center px-4 font-bold"
              style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)", transition: "color 0.25s" }}
            >
              {t.desktop.subtitle}
            </div>

            {/* ── Desktop icons ── */}
            <div className="mt-24 md:mt-40 flex flex-col md:flex-row flex-wrap items-center justify-center gap-6 md:gap-8 pointer-events-auto w-full max-w-4xl px-4">
              <DesktopIcon windowId="portfolio" label={t.icons.portfolio} index={0} />
              <DesktopIcon windowId="services"  label={t.icons.services}  index={1} />
              <DesktopIcon windowId="contact"   label={t.icons.contact}   index={2} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPortfolioOpen && <PortfolioSection key="portfolio-section" />}
      </AnimatePresence>

      {/* ── Windows ── */}

      <Window id="services"  title={t.windows.services.title}  subtitle={t.windows.services.subtitle}  defaultPosition={{ x: 160, y: 60  }} defaultWidth={820}>
        <ServicesWindow />
      </Window>
      <Window id="contact"   title={t.windows.contact.title}   subtitle={t.windows.contact.subtitle}   defaultPosition={{ x: 200, y: 50  }} defaultWidth={560}>
        <ContactWindow />
      </Window>
    </div>
  );
}
