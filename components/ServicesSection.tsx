"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { useWindowManager } from "@/context/WindowManagerContext";

const ACCENTS = ["var(--accent-col-1)", "var(--accent-col-2)", "var(--accent-col-3)"];

export default function ServicesSection() {
  const { t } = useLang();
  const { closeWindow } = useWindowManager();
  const services = t.windows.services;

  /* The lifecycle panel belongs to column 02 only. Toggled by an explicit
     control rather than hover — hover leaves it stuck open and is unreachable
     on touch. */
  const [lifecycleOpen, setLifecycleOpen] = useState(false);

  return (
    <motion.div
      className="absolute inset-0 z-50 overflow-y-auto overflow-x-hidden bg-[var(--bg-main)] pt-20 md:pt-28 pb-24 flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-11/12 md:w-10/12 lg:w-5/6 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 md:mb-24 pointer-events-auto w-full">
          <div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
              {services.title}
            </h2>
            <div className="mt-2 text-xs md:text-sm tracking-[0.2em] font-bold uppercase" style={{ fontFamily: "var(--font-mono)", color: "var(--accent-primary)" }}>
              {services.subtitle}
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => closeWindow("services")}
            className="px-4 py-2 border-2 text-sm transition-colors duration-200 uppercase font-bold tracking-widest cursor-pointer hover:bg-[var(--text-primary)] hover:text-[var(--bg-main)] outline-none"
            style={{
              borderColor: "var(--text-primary)",
              color: "currentColor",
              fontFamily: "var(--font-mono)",
              boxShadow: "4px 4px 0px var(--text-primary)"
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0px 0px 0px transparent"}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = "4px 4px 0px var(--text-primary)"}
          >
✕ {t.common.close}
          </motion.button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6 pointer-events-auto w-full">
          {services.columns.map((col: any, i: number) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
              className="relative group h-full"
            >
              {/* Single offset block — same "press into the shadow" idiom the
                  buttons use, instead of a three-layer stack. */}
              <div
                className="absolute inset-0 translate-x-2 translate-y-2 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
                style={{ background: ACCENTS[i] }}
                aria-hidden
              />

              <div
                className="relative h-full flex flex-col border-2 p-7 md:p-8 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                style={{ borderColor: "var(--border-main)", background: "var(--bg-surface)" }}
              >
                <div className="flex items-baseline gap-3">
                  {/* The offset block already carries the column's colour, and
                      it does not have to stay legible. Text does — these accents
                      are fill colours and drop to ~1.5:1 on the light surface. */}
                  <span
                    className="text-2xl font-black leading-none"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                  >
                    {col.id}
                  </span>
                </div>

                <h3
                  className="mt-6 text-xl md:text-2xl font-black uppercase tracking-tight leading-tight"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                >
                  {col.title}
                </h3>

                <p className="mt-4 text-sm md:text-base leading-relaxed" style={{ fontFamily: "var(--font-heading)", color: "var(--text-secondary)" }}>
                  {col.desc}
                </p>

                {col.id === "02" && services.appDevHover && (
                  <button
                    onClick={() => setLifecycleOpen((v) => !v)}
                    aria-expanded={lifecycleOpen}
                    className="mt-6 self-start text-[11px] tracking-[0.2em] font-bold uppercase cursor-pointer outline-none transition-colors duration-200"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = ACCENTS[i])}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                  >
                    {lifecycleOpen ? "−" : "+"} {services.appDevHover.toggle}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lifecycle detail for column 02 */}
        <AnimatePresence initial={false}>
          {lifecycleOpen && services.appDevHover && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden pointer-events-auto w-full"
            >
              <div
                className="mt-12 border-2 p-8 md:p-10 flex flex-col md:flex-row gap-10 md:gap-14"
                style={{ borderColor: "var(--border-main)", background: "var(--bg-surface)" }}
              >
                <div className="flex-1">
                  <h4
                    className="text-xl md:text-2xl font-black uppercase tracking-tighter"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                  >
                    {services.appDevHover.title}
                  </h4>

                  <ol className="mt-6 space-y-3">
                    {services.appDevHover.steps.map((step: string, index: number) => (
                      <li
                        key={index}
                        className="flex gap-3 text-sm leading-relaxed"
                        style={{ fontFamily: "var(--font-heading)", color: "var(--text-secondary)" }}
                      >
                        <span style={{ color: "var(--accent-primary)" }}>—</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="shrink-0 mx-auto md:mx-0">
                  <img
                    src="/images/app_screenshot.png"
                    alt=""
                    aria-hidden
                    className="w-[180px] md:w-[210px] border-2"
                    style={{ borderColor: "var(--border-main)" }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
