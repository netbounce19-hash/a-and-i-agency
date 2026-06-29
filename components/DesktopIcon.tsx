"use client";

import React from "react";
import { motion } from "framer-motion";
import { useWindowManager, WindowId } from "@/context/WindowManagerContext";

interface DesktopIconProps {
  windowId: WindowId;
  label: string;
  index: number;
}

const ICON_SHAPES: Record<WindowId, React.ReactNode> = {
  portfolio: (
    <svg viewBox="0 0 56 56" className="w-full h-full" aria-hidden>
      <rect x="4"  y="4"  width="22" height="22" fill="none" stroke="#FF6037" strokeWidth="2" />
      <rect x="30" y="4"  width="22" height="22" fill="#FF6037" opacity="0.25" stroke="#FF6037" strokeWidth="2" />
      <rect x="4"  y="30" width="22" height="22" fill="#FF6037" opacity="0.15" stroke="#FF6037" strokeWidth="2" />
      <rect x="30" y="30" width="22" height="22" fill="none" stroke="#FF6037" strokeWidth="2" />
      <rect x="12" y="12" width="6" height="6" fill="#FF6037" />
      <rect x="38" y="12" width="6" height="6" fill="#FF6037" opacity="0.5" />
    </svg>
  ),
  services: (
    <svg viewBox="0 0 56 56" className="w-full h-full" aria-hidden>
      <circle cx="28" cy="28" r="24" fill="none" stroke="#733635" strokeWidth="1.5" />
      <circle cx="28" cy="28" r="16" fill="none" stroke="#733635" strokeWidth="1.5" />
      <circle cx="28" cy="28" r="8"  fill="#733635" opacity="0.25" stroke="#733635" strokeWidth="1.5" />
      <circle cx="28" cy="28" r="3"  fill="#733635" />
      <line x1="28" y1="4"  x2="28" y2="12" stroke="#733635" strokeWidth="1.5" />
      <line x1="28" y1="44" x2="28" y2="52" stroke="#733635" strokeWidth="1.5" />
      <line x1="4"  y1="28" x2="12" y2="28" stroke="#733635" strokeWidth="1.5" />
      <line x1="44" y1="28" x2="52" y2="28" stroke="#733635" strokeWidth="1.5" />
    </svg>
  ),
  contact: (
    <svg viewBox="0 0 56 56" className="w-full h-full" aria-hidden>
      <rect x="4"  y="8" width="48" height="40" fill="none" stroke="#A0C9CB" strokeWidth="1.5" />
      <rect x="4"  y="8" width="48" height="10" fill="#A0C9CB" opacity="0.15" />
      <line x1="12" y1="26" x2="18" y2="26" stroke="#A0C9CB" strokeWidth="1.5" />
      <line x1="18" y1="22" x2="18" y2="30" stroke="#A0C9CB" strokeWidth="1.5" />
      <rect x="22" y="24" width="20" height="3" fill="#A0C9CB" opacity="0.5" />
      <rect x="22" y="31" width="14" height="3" fill="#A0C9CB" opacity="0.3" />
      <rect x="22" y="38" width="8"  height="3" fill="#A0C9CB" opacity="0.5" />
      <rect x="32" y="38" width="3"  height="3" fill="#A0C9CB" />
    </svg>
  ),
};

const ICON_ACCENT: Record<WindowId, string> = {
  portfolio: "#FF6037",
  services:  "#733635",
  contact:   "#A0C9CB",
};

export default function DesktopIcon({ windowId, label, index }: DesktopIconProps) {
  const { openWindow, isOpen } = useWindowManager();
  const active = isOpen(windowId);
  const accent = ICON_ACCENT[windowId];

  return (
    <motion.button
      onClick={() => openWindow(windowId)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 + 0.3, duration: 0.2 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="flex flex-col items-center gap-2 cursor-pointer outline-none"
      aria-label={`Open ${label}`}
      id={`desktop-icon-${windowId}`}
    >
      {/* Icon box */}
      <div
        className="relative w-14 h-14"
        style={{
          border: `2px solid ${active ? accent : "var(--border-subtle)"}`,
          background: active ? `${accent}18` : "var(--bg-surface-2)",
          boxShadow: active ? `4px 4px 0px ${accent}` : "4px 4px 0px var(--border-faint)",
          transition: "border-color 0.15s, background 0.15s, box-shadow 0.15s",
        }}
      >
        <div className="absolute inset-2">{ICON_SHAPES[windowId]}</div>
        {active && (
          <div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
            style={{ background: accent }}
          />
        )}
      </div>

      {/* Label */}
      <span
        className="text-[12px] md:text-[14px] font-bold tracking-widest uppercase text-center leading-tight max-w-[120px]"
        style={{
          fontFamily: "var(--font-mono)",
          color: active ? accent : "var(--text-muted)",
          transition: "color 0.15s",
        }}
      >
        {label}
      </span>
    </motion.button>
  );
}
