"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLang, Lang } from "@/context/LangContext";
import { useWindowManager, WindowId } from "@/context/WindowManagerContext";
import { useTheme } from "@/context/ThemeContext";

const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
  { code: "es", label: "ES" },
];

const WINDOWS: { id: WindowId; labelKey: "portfolio" | "services" | "contact" }[] = [
  { id: "portfolio", labelKey: "portfolio" },
  { id: "services",  labelKey: "services" },
  { id: "contact",   labelKey: "contact" },
];

export default function Taskbar() {
  const { lang, setLang, t } = useLang();
  const { openWindow, isOpen, focusWindow } = useWindowManager();
  const { theme, toggleTheme } = useTheme();
  const [time, setTime] = useState("");
  const [showStart, setShowStart] = useState(false);

  // Live clock
  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
  }, []);

  const isLight = theme === "light";

  return (
    <div
      className="fixed bottom-0 left-0 right-0 h-10 flex items-center px-2 gap-1 select-none"
      style={{
        zIndex: 9999,
        background: "var(--taskbar-bg)",
        borderTop: "2px solid var(--border-main)",
        transition: "background 0.25s ease",
      }}
    >
      {/* ── SYSTEM START ── */}
      <div className="relative">
        <motion.button
          onClick={() => setShowStart((s) => !s)}
          whileTap={{ scale: 0.95 }}
          className="h-7 px-3 text-[10px] tracking-[0.22em] font-black uppercase cursor-pointer"
          style={{
            fontFamily: "var(--font-heading)",
            border: "2px solid #E63946",
            background: "#E63946",
            color: "#fff",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "#E63946"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#E63946"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
          id="taskbar-start-btn"
        >
          ▶ {t.nav.start}
        </motion.button>

        {/* Start menu */}
        {showStart && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.08 }}
            className="absolute bottom-10 left-0 w-52"
            style={{
              background: "var(--bg-surface)",
              border: "2px solid var(--border-main)",
              boxShadow: "4px 4px 0px #E63946",
            }}
          >
            <div
              className="px-3 py-2 text-[10px] tracking-widest"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--text-dim)",
                borderBottom: "2px solid var(--border-subtle)",
              }}
            >
              A-AND-I OS // MENU
            </div>
            {WINDOWS.map((w) => (
              <button
                key={w.id}
                onClick={() => { openWindow(w.id); setShowStart(false); }}
                className="w-full text-left px-3 py-2 text-[11px] tracking-widest uppercase cursor-pointer"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-primary)",
                  borderBottom: "1px solid var(--border-faint)",
                  transition: "background 0.07s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#E63946"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)"; }}
              >
                ▸ {t.nav[w.labelKey]}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Divider */}
      <div className="h-6 w-px mx-1" style={{ background: "var(--border-subtle)" }} />

      {/* ── Open window tabs ── */}
      <div className="flex items-center gap-1 flex-1 overflow-hidden">
        {WINDOWS.map((w) =>
          isOpen(w.id) ? (
            <motion.button
              key={w.id}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => focusWindow(w.id)}
              className="h-7 px-3 text-[10px] tracking-widest uppercase cursor-pointer whitespace-nowrap"
              style={{
                fontFamily: "var(--font-mono)",
                border: "2px solid var(--border-subtle)",
                background: "var(--bg-surface-2)",
                color: "var(--text-muted)",
                transition: "border-color 0.07s, color 0.07s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-main)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-subtle)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)"; }}
            >
              <span style={{ color: "#E63946", marginRight: 4 }}>■</span>
              {t.nav[w.labelKey]}
            </motion.button>
          ) : null
        )}
      </div>

      {/* ── Theme toggle ── */}
      <button
        onClick={toggleTheme}
        className="h-7 px-3 text-[11px] tracking-widest cursor-pointer font-bold"
        style={{
          fontFamily: "var(--font-mono)",
          border: "2px solid var(--border-subtle)",
          background: "var(--bg-surface-2)",
          color: "var(--text-primary)",
          minWidth: 36,
          transition: "background 0.15s, color 0.15s",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-main)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-subtle)"; }}
        id="theme-toggle-btn"
        aria-label="Toggle light/dark theme"
        title={isLight ? "Switch to dark mode" : "Switch to light mode"}
      >
        {isLight ? "◑" : "○"}
      </button>

      {/* Divider */}
      <div className="h-6 w-px mx-1" style={{ background: "var(--border-subtle)" }} />

      {/* ── Clock ── */}
      <div
        className="h-7 px-3 flex items-center gap-2"
        style={{ border: "2px solid var(--border-subtle)" }}
      >
        <span
          className="text-[10px] tracking-widest"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}
        >
          SYS
        </span>
        <span
          className="text-[11px] tracking-wider tabular-nums"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}
          id="taskbar-clock"
        >
          {time}
        </span>
      </div>

      {/* Divider */}
      <div className="h-6 w-px mx-1" style={{ background: "var(--border-subtle)" }} />

      {/* ── Language toggle ── */}
      <div className="flex items-center h-7" style={{ border: "2px solid var(--border-subtle)" }}>
        {LANGS.map((l, i) => (
          <React.Fragment key={l.code}>
            {i > 0 && <div className="h-full w-px" style={{ background: "var(--border-subtle)" }} />}
            <button
              onClick={() => setLang(l.code)}
              className="h-full px-2 text-[10px] tracking-widest font-bold uppercase cursor-pointer"
              style={{
                fontFamily: "var(--font-mono)",
                background: lang === l.code ? "#E63946" : "transparent",
                color: lang === l.code ? "#fff" : "var(--text-dim)",
                transition: "background 0.1s, color 0.1s",
              }}
              id={`lang-toggle-${l.code}`}
              aria-label={`Switch to ${l.label}`}
            >
              {l.label}
            </button>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
