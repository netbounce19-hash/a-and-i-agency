"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useWindowManager, WindowId } from "@/context/WindowManagerContext";

interface DesktopIconProps {
  windowId: WindowId;
  label: string;
  index: number;
}

const ICON_ACCENT: Record<WindowId, string> = {
  portfolio: "#FF6037",
  services:  "#733635",
  contact:   "#A0C9CB",
};

export default function DesktopIcon({ windowId, label, index }: DesktopIconProps) {
  const { openWindow, isOpen } = useWindowManager();
  const active = isOpen(windowId);
  const accent = ICON_ACCENT[windowId];
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      onClick={() => openWindow(windowId)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 + 0.3, duration: 0.3 }}
      className="flex items-center cursor-pointer outline-none text-left group"
      aria-label={`Open ${label}`}
      id={`desktop-icon-${windowId}`}
    >
      <div 
        className="text-base md:text-lg font-medium tracking-[0.2em] transition-all duration-300 uppercase relative"
        style={{
          fontFamily: "var(--font-mono)",
          color: active ? accent : (hovered ? "var(--text-primary)" : "var(--text-muted)"),
        }}
      >
        <span 
           className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 transition-all duration-300"
           style={{ 
             opacity: hovered || active ? 1 : 0, 
             color: accent,
             transform: hovered || active ? "translateY(-50%) translateX(0)" : "translateY(-50%) translateX(10px)"
           }}
        >
          ▸
        </span>
        <span className="relative z-10 transition-transform duration-300 block" style={{ transform: hovered || active ? "translateX(4px)" : "translateX(0)" }}>
          {label}
        </span>
      </div>
    </motion.button>
  );
}
