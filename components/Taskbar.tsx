"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLang, Lang } from "@/context/LangContext";
import { useTheme } from "@/context/ThemeContext";

const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "ENGLISH" },
  { code: "ru", label: "RUSSIAN" },
  { code: "es", label: "SPANISH" },
];

export default function Taskbar() {
  const { lang, setLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  // Live clock
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      setDate(now.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }));
    };
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
      {/* Left side spacer since start button is gone */}
      <div className="w-1" />

      {/* Empty space filling the middle */}
      <div className="flex-1" />

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

      {/* ── Date & Time ── */}
      <div
        className="h-7 px-3 flex items-center gap-2"
        style={{ border: "2px solid var(--border-subtle)" }}
      >
        <span
          className="text-[11px] tracking-wider tabular-nums"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}
        >
          {date}
        </span>
        <span style={{ color: "var(--border-subtle)" }}>|</span>
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
                background: lang === l.code ? "var(--accent-primary)" : "transparent",
                color: lang === l.code ? "var(--bg-main)" : "var(--text-dim)",
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
