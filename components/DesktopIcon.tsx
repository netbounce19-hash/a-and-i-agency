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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ x: 4, y: 4, boxShadow: "0px 0px 0px transparent" }}
      transition={{ 
        delay: index * 0.1 + 0.3, 
        duration: 0.2 
      }}
      className="cursor-pointer outline-none border-2 px-6 py-3 md:px-10 md:py-4 backdrop-blur-sm"
      aria-label={`Open ${label}`}
      id={`desktop-icon-${windowId}`}
      style={{
        borderColor: active || hovered ? accent : "var(--border-main)",
        background: active ? `${accent}15` : (hovered ? "var(--bg-main)" : "transparent"),
        boxShadow: active || hovered ? `4px 4px 0px ${accent}` : "4px 4px 0px var(--text-primary)",
        transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
      }}
    >
      <div 
        className="text-base md:text-lg font-black tracking-[0.15em] uppercase"
        style={{
          fontFamily: "var(--font-mono)",
          color: active || hovered ? accent : "var(--text-primary)",
          transition: "color 0.2s",
        }}
      >
        {label}
      </div>
    </motion.button>
  );
}
