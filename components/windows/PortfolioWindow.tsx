"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";

const PROJECT_COLORS = ["#E63946", "#F4A261", "#1D3557", "#39ff14"];

export default function PortfolioWindow() {
  const { t } = useLang();
  const { portfolio } = t.windows;

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div
        className="mb-5 pb-3 flex items-center gap-3"
        style={{ borderBottom: "1px solid var(--border-subtle)" }}
      >
        <span
          className="text-[11px] tracking-[0.25em] uppercase"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}
        >
          ■ LOADED 4 ENTRIES // SORT: CHRONOLOGICAL_DESC
        </span>
      </div>

      {/* Project grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {portfolio.projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.12 }}
            whileHover={{ scale: 1.01 }}
            className="group cursor-pointer overflow-hidden"
            style={{
              border: "2px solid var(--border-subtle)",
              transition: "border-color 0.1s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-main)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-subtle)")}
          >
            {/* Thumbnail */}
            <div
              className="relative h-36 overflow-hidden"
              style={{
                background: "var(--bg-surface-2)",
                borderBottom: "2px solid var(--border-subtle)",
              }}
            >
              <svg viewBox="0 0 300 144" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
                {/* Grid background */}
                <pattern id={`g${i}`} width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--grid-color-coarse)" strokeWidth="0.5" />
                </pattern>
                <rect width="300" height="144" fill={`url(#g${i})`} />

                {i === 0 && <>
                  <rect x="20" y="20" width="80" height="80" fill="none" stroke={PROJECT_COLORS[0]} strokeWidth="2" />
                  <rect x="40" y="40" width="40" height="40" fill={PROJECT_COLORS[0]} opacity="0.2" />
                  <line x1="120" y1="10" x2="120" y2="134" stroke={PROJECT_COLORS[0]} strokeWidth="1" opacity="0.3" />
                  <circle cx="200" cy="72" r="40" fill="none" stroke={PROJECT_COLORS[0]} strokeWidth="1.5" opacity="0.25" />
                  <circle cx="200" cy="72" r="20" fill={PROJECT_COLORS[0]} opacity="0.1" />
                  <text x="140" y="76" fill={PROJECT_COLORS[0]} fontFamily="monospace" fontSize="10" opacity="0.7">PWA_v2.4.1</text>
                </>}
                {i === 1 && <>
                  <rect x="10" y="10" width="120" height="2" fill={PROJECT_COLORS[1]} />
                  <rect x="10" y="132" width="120" height="2" fill={PROJECT_COLORS[1]} />
                  <rect x="10" y="10" width="2" height="124" fill={PROJECT_COLORS[1]} />
                  <rect x="130" y="10" width="2" height="124" fill={PROJECT_COLORS[1]} />
                  <rect x="30" y="30" width="80" height="84" fill={PROJECT_COLORS[1]} opacity="0.08" />
                  <text x="38" y="76" fill={PROJECT_COLORS[1]} fontFamily="monospace" fontSize="14" fontWeight="bold">B2B</text>
                  <text x="38" y="92" fill={PROJECT_COLORS[1]} fontFamily="monospace" fontSize="9" opacity="0.7">CALC_ENGINE</text>
                  <circle cx="220" cy="50" r="28" fill={PROJECT_COLORS[1]} opacity="0.1" stroke={PROJECT_COLORS[1]} strokeWidth="1" />
                </>}
                {i === 2 && <>
                  <rect x="20" y="20" width="100" height="104" fill="none" stroke={PROJECT_COLORS[2]} strokeWidth="1.5" />
                  <rect x="30" y="30" width="80" height="14" fill={PROJECT_COLORS[2]} opacity="0.5" />
                  <rect x="30" y="52" width="80" height="4" fill="var(--border-faint)" />
                  <rect x="30" y="62" width="60" height="4" fill="var(--border-faint)" />
                  <rect x="30" y="72" width="40" height="4" fill="var(--border-faint)" />
                  <text x="142" y="60" fill={PROJECT_COLORS[2]} fontFamily="monospace" fontSize="9" opacity="0.9">SECURE</text>
                  <text x="142" y="76" fill={PROJECT_COLORS[2]} fontFamily="monospace" fontSize="9" opacity="0.6">LEVEL_5</text>
                  <rect x="192" y="30" width="70" height="70" fill="none" stroke={PROJECT_COLORS[2]} strokeWidth="1" opacity="0.3" />
                </>}
                {i === 3 && <>
                  <ellipse cx="80" cy="72" rx="55" ry="50" fill="none" stroke={PROJECT_COLORS[3]} strokeWidth="1" opacity="0.4" />
                  <ellipse cx="80" cy="72" rx="30" ry="28" fill={PROJECT_COLORS[3]} opacity="0.07" />
                  <line x1="0"  y1="72" x2="160" y2="72" stroke={PROJECT_COLORS[3]} strokeWidth="0.5" opacity="0.3" />
                  <line x1="80" y1="0"  x2="80" y2="144" stroke={PROJECT_COLORS[3]} strokeWidth="0.5" opacity="0.3" />
                  <circle cx="80" cy="72" r="6" fill={PROJECT_COLORS[3]} />
                  <text x="170" y="68" fill={PROJECT_COLORS[3]} fontFamily="monospace" fontSize="9" opacity="0.7">VISUAL_FIRST</text>
                  <text x="170" y="84" fill={PROJECT_COLORS[3]} fontFamily="monospace" fontSize="8" opacity="0.5">PERF: 98/100</text>
                </>}
              </svg>

              {/* Index badge */}
              <div
                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center"
                style={{ border: `2px solid ${PROJECT_COLORS[i]}`, background: "var(--bg-surface)" }}
              >
                <span className="text-[11px] font-bold" style={{ fontFamily: "var(--font-mono)", color: PROJECT_COLORS[i] }}>
                  {project.id}
                </span>
              </div>
            </div>

            {/* Project info */}
            <div className="p-4 space-y-2" style={{ background: "var(--bg-surface)" }}>
              <h3
                className="text-[15px] font-black uppercase tracking-wide leading-tight"
                style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
              >
                {project.name}
              </h3>
              <p
                className="text-[10px] tracking-widest uppercase font-bold"
                style={{ fontFamily: "var(--font-mono)", color: PROJECT_COLORS[i] }}
              >
                {project.tag}
              </p>
              <p
                className="text-[12px] leading-relaxed"
                style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
              >
                {project.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-3" style={{ borderTop: "1px solid var(--border-faint)" }}>
        <span
          className="text-[10px] tracking-widest"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}
        >
          ▸ PORTFOLIO_DIR // {portfolio.projects.length} PROJECTS INDEXED // STATUS: ACTIVE
        </span>
      </div>
    </div>
  );
}
