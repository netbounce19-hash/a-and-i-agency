"use client";

import React, { ReactNode } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { useWindowManager, WindowId } from "@/context/WindowManagerContext";

interface WindowProps {
  id: WindowId;
  title: string;
  subtitle?: string;
  children: ReactNode;
  defaultPosition?: { x: number; y: number };
  defaultWidth?: number;
}

export default function Window({
  id,
  title,
  subtitle,
  children,
  defaultPosition = { x: 60, y: 40 },
  defaultWidth = 720,
}: WindowProps) {
  const { isOpen, closeWindow, focusWindow, getZ } = useWindowManager();
  const dragControls = useDragControls();

  const open = isOpen(id);
  const z = getZ(id);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Mobile: dim backdrop */}
          <div
            className="md:hidden fixed inset-0"
            style={{ zIndex: z - 1, background: "rgba(0,0,0,0.4)" }}
            onClick={() => closeWindow(id)}
          />

          <motion.div
            key={id}
            drag
            dragControls={dragControls}
            dragMomentum={false}
            dragElastic={0}
            dragListener={false}
            /* Glitch-snap entrance */
            initial={{ opacity: 0, scale: 0.88, x: -8, y: -8 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.07 } }}
            transition={{ duration: 0.08, ease: [0.17, 0.67, 0.83, 0.67] }}
            onPointerDown={() => focusWindow(id)}
            className="fixed flex flex-col overflow-hidden select-none"
            style={{
              zIndex: z,
              background: "var(--bg-surface)",
              border: "2px solid var(--border-main)",
              boxShadow: "var(--window-shadow)",
              borderRadius: 0,
              top: defaultPosition.y,
              left: defaultPosition.x,
              width: defaultWidth,
              maxWidth: "calc(100vw - 24px)",
              maxHeight: "calc(100vh - 80px)",
              transition: "background 0.25s ease, border-color 0.25s ease",
            }}
          >
            {/* ── Title bar ── */}
            <div
              className="flex items-center justify-between shrink-0 px-3"
              style={{
                background: "var(--titlebar-bg)",
                borderBottom: "2px solid var(--border-main)",
                paddingTop: 7,
                paddingBottom: 7,
                cursor: "grab",
              }}
              onPointerDown={(e) => {
                if (e.pointerType !== "touch") dragControls.start(e);
              }}
            >
              <div className="flex flex-col gap-[2px]">
                <span
                  className="text-[11px] tracking-[0.22em] uppercase leading-none font-bold"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-primary)",
                  }}
                >
                  {title}
                </span>
                {subtitle && (
                  <span
                    className="text-[10px] tracking-[0.18em] uppercase leading-none"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--text-dim)",
                    }}
                  >
                    {subtitle}
                  </span>
                )}
              </div>

              <button
                onClick={() => closeWindow(id)}
                className="w-6 h-6 flex items-center justify-center font-bold text-[11px] cursor-pointer shrink-0 ml-4"
                style={{
                  border: "2px solid var(--border-main)",
                  background: "#E63946",
                  color: "#fff",
                  fontFamily: "var(--font-mono)",
                  transition: "background 0.07s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#fff"; (e.currentTarget as HTMLButtonElement).style.color = "#000"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#E63946"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                aria-label="Close window"
              >
                ✕
              </button>
            </div>

            {/* ── Content ── */}
            <div className="overflow-y-auto flex-1 min-h-0">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
