"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";

const ACCENTS = ["#E63946", "#F4A261", "#1D3557"];
const COLUMN_BG_LIGHT = ["rgba(230,57,70,0.06)", "rgba(244,162,97,0.06)", "rgba(29,53,87,0.06)"];

const COLUMN_ICONS = [
  <svg key="web" viewBox="0 0 44 44" className="w-9 h-9">
    <rect x="2" y="2" width="40" height="40" fill="none" stroke="#E63946" strokeWidth="1.5" />
    <line x1="2" y1="14" x2="42" y2="14" stroke="#E63946" strokeWidth="1" />
    <rect x="8" y="19" width="28" height="4" fill="#E63946" opacity="0.45" />
    <rect x="8" y="26" width="20" height="3" fill="#E63946" opacity="0.3" />
    <rect x="8" y="32" width="12" height="3" fill="#E63946" opacity="0.2" />
  </svg>,
  <svg key="mob" viewBox="0 0 44 44" className="w-9 h-9">
    <rect x="12" y="2" width="20" height="40" fill="none" stroke="#F4A261" strokeWidth="1.5" />
    <line x1="12" y1="9"  x2="32" y2="9"  stroke="#F4A261" strokeWidth="1" />
    <line x1="12" y1="36" x2="32" y2="36" stroke="#F4A261" strokeWidth="1" />
    <circle cx="22" cy="39" r="1.5" fill="#F4A261" opacity="0.6" />
    <rect x="16" y="13" width="12" height="18" fill="#F4A261" opacity="0.1" />
  </svg>,
  <svg key="ai" viewBox="0 0 44 44" className="w-9 h-9">
    <circle cx="22" cy="22" r="14" fill="none" stroke="#1D3557" strokeWidth="1.5" />
    <circle cx="22" cy="22" r="7"  fill="#1D3557" opacity="0.35" />
    <line x1="22" y1="2"  x2="22" y2="8"  stroke="#1D3557" strokeWidth="1.5" />
    <line x1="22" y1="36" x2="22" y2="42" stroke="#1D3557" strokeWidth="1.5" />
    <line x1="2"  y1="22" x2="8"  y2="22" stroke="#1D3557" strokeWidth="1.5" />
    <line x1="36" y1="22" x2="42" y2="22" stroke="#1D3557" strokeWidth="1.5" />
    <circle cx="22" cy="22" r="2.5" fill="#4fc3f7" />
  </svg>,
];

export default function ServicesWindow() {
  const { t } = useLang();
  const { services } = t.windows;

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-5 pb-3" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <span
          className="text-[11px] tracking-[0.25em] uppercase"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}
        >
          ■ SERVICE_MATRIX // 3 MODULES ACTIVE // UPTIME: 99.97%
        </span>
      </div>

      {/* 3-column grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-3"
        style={{ border: "2px solid var(--border-main)" }}
      >
        {services.columns.map((col, i) => (
          <motion.div
            key={col.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.12 }}
            className="relative p-5"
            style={{
              background: COLUMN_BG_LIGHT[i],
              borderRight: i < 2 ? "2px solid var(--border-main)" : "none",
              borderBottom: "none",
            }}
          >
            {/* Accent top stripe */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px]"
              style={{ background: ACCENTS[i] }}
            />

            {/* Icon */}
            <div className="mt-3 mb-4">{COLUMN_ICONS[i]}</div>

            {/* Module index */}
            <div
              className="text-[10px] tracking-widest mb-1 font-bold"
              style={{ fontFamily: "var(--font-mono)", color: ACCENTS[i] }}
            >
              MODULE_{col.id}
            </div>

            {/* Title */}
            <h3
              className="text-[15px] font-black uppercase tracking-wider leading-tight mb-1"
              style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
            >
              {col.title}
            </h3>

            {/* Tag */}
            <div
              className="text-[10px] tracking-widest mb-4 pb-3 font-bold"
              style={{
                fontFamily: "var(--font-mono)",
                color: ACCENTS[i],
                borderBottom: "1px solid var(--border-subtle)",
              }}
            >
              [{col.tag}]
            </div>

            {/* Description */}
            <p
              className="text-[13px] leading-relaxed"
              style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
            >
              {col.desc}
            </p>

            {/* Status dot */}
            <div className="mt-5 flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: ACCENTS[i] }}
              />
              <span
                className="text-[10px] tracking-widest"
                style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}
              >
                ACTIVE
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tech stack badges */}
      <div className="mt-5 grid grid-cols-3 gap-3">
        {["NEXT.JS 16", "REACT NATIVE", "n8n + GPT-4o"].map((tech, i) => (
          <div
            key={i}
            className="p-2 text-center"
            style={{ border: "1px solid var(--border-subtle)" }}
          >
            <span
              className="text-[11px] tracking-widest"
              style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
            >
              {tech}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3" style={{ borderTop: "1px solid var(--border-faint)" }}>
        <span
          className="text-[10px] tracking-widest"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}
        >
          ▸ KERNEL_v3.0 // ALL SYSTEMS NOMINAL // ACCEPTING NEW PROJECTS
        </span>
      </div>
    </div>
  );
}
