"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LangContext";

export default function ContactWindow() {
  const { t } = useLang();
  const { contact } = t.windows;

  const [email, setEmail]       = useState("");
  const [budget, setBudget]     = useState("");
  const [task, setTask]         = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [cursor, setCursor]     = useState(true);
  const [lines, setLines]       = useState<string[]>([
    "// A-AND-I AGENCY — SECURE TERMINAL v2.0",
    "// CONNECTION ESTABLISHED",
    "// AWAITING INPUT...",
    "",
  ]);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Blinking cursor
  useEffect(() => {
    const iv = setInterval(() => setCursor((c) => !c), 530);
    return () => clearInterval(iv);
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current)
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !budget || !task) return;
    setLines((prev) => [
      ...prev,
      `> ${contact.fields.email}: ${email}`,
      `> ${contact.fields.budget}: ${budget}`,
      `> ${contact.fields.task}: ${task}`,
      "",
      "// ENCRYPTING PAYLOAD...",
      "// TRANSMITTING TO A-AND-I KERNEL...",
      "████████████████████ 100%",
      "",
      contact.success,
    ]);
    setSubmitted(true);
  };

  const handleReset = () => {
    setEmail(""); setBudget(""); setTask(""); setSubmitted(false);
    setLines([
      "// A-AND-I AGENCY — SECURE TERMINAL v2.0",
      "// CONNECTION RESET",
      "// AWAITING NEW INPUT...",
      "",
    ]);
  };

  return (
    <div className="flex flex-col" style={{ minHeight: 500 }}>

      {/* ── Terminal log — always dark ── */}
      <div
        ref={terminalRef}
        className="p-4 overflow-y-auto shrink-0"
        style={{
          minHeight: 150,
          maxHeight: 200,
          background: "var(--terminal-bg)",
          borderBottom: "2px solid var(--border-main)",
        }}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className="text-[12px] leading-relaxed"
            style={{
              fontFamily: "var(--font-mono)",
              color: line.startsWith("//")
                ? "var(--terminal-green)"
                : line.startsWith(">")
                ? "#F4A261"
                : line.startsWith("████")
                ? "#E63946"
                : "#888",
            }}
          >
            {line || "\u00A0"}
          </div>
        ))}
        {/* Live cursor */}
        <div
          className="text-[12px]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--terminal-green)" }}
        >
          {cursor ? "▋" : "\u00A0"}
        </div>
      </div>

      {/* ── Input form ── */}
      <form
        onSubmit={handleSubmit}
        className="p-5 space-y-4 flex-1"
        style={{ background: "var(--bg-surface)" }}
      >
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {/* Email */}
              <div>
                <label
                  className="block text-[11px] tracking-widest mb-1 font-bold"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--terminal-green)" }}
                >
                  {">"} {contact.fields.email}:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={contact.placeholder.email}
                  required
                  className="w-full outline-none px-3 py-2 text-[13px]"
                  style={{
                    fontFamily: "var(--font-mono)",
                    background: "var(--terminal-bg)",
                    border: "2px solid var(--border-subtle)",
                    color: "var(--terminal-green)",
                    transition: "border-color 0.1s",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--terminal-green)")}
                  onBlur={(e)  => (e.currentTarget.style.borderColor = "var(--border-subtle)")}
                />
              </div>

              {/* Budget */}
              <div>
                <label
                  className="block text-[11px] tracking-widest mb-1 font-bold"
                  style={{ fontFamily: "var(--font-mono)", color: "#F4A261" }}
                >
                  {">"} {contact.fields.budget}:
                </label>
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder={contact.placeholder.budget}
                  required
                  className="w-full outline-none px-3 py-2 text-[13px]"
                  style={{
                    fontFamily: "var(--font-mono)",
                    background: "var(--terminal-bg)",
                    border: "2px solid var(--border-subtle)",
                    color: "#F4A261",
                    transition: "border-color 0.1s",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#F4A261")}
                  onBlur={(e)  => (e.currentTarget.style.borderColor = "var(--border-subtle)")}
                />
              </div>

              {/* Task */}
              <div>
                <label
                  className="block text-[11px] tracking-widest mb-1 font-bold"
                  style={{ fontFamily: "var(--font-mono)", color: "#E63946" }}
                >
                  {">"} {contact.fields.task}:
                </label>
                <textarea
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  placeholder={contact.placeholder.task}
                  required
                  rows={3}
                  className="w-full outline-none px-3 py-2 resize-none text-[13px]"
                  style={{
                    fontFamily: "var(--font-mono)",
                    background: "var(--terminal-bg)",
                    border: "2px solid var(--border-subtle)",
                    color: "#fff",
                    transition: "border-color 0.1s",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#E63946")}
                  onBlur={(e)  => (e.currentTarget.style.borderColor = "var(--border-subtle)")}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                className="w-full py-4 text-white font-black text-[13px] tracking-[0.4em] uppercase cursor-pointer"
                style={{
                  fontFamily: "var(--font-heading)",
                  background: "#E63946",
                  border: "2px solid #E63946",
                  transition: "background 0.1s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#c62d39")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#E63946")}
              >
                ▶ {contact.submit}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-10 space-y-5"
            >
              <div
                className="text-[13px] tracking-widest font-bold"
                style={{ fontFamily: "var(--font-mono)", color: "var(--terminal-green)" }}
              >
                {contact.success}
              </div>
              <button
                onClick={handleReset}
                className="px-8 py-3 text-[11px] tracking-widest uppercase cursor-pointer"
                style={{
                  fontFamily: "var(--font-mono)",
                  border: "2px solid var(--border-subtle)",
                  color: "var(--text-muted)",
                  background: "transparent",
                  transition: "border-color 0.1s, color 0.1s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-main)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-subtle)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)"; }}
              >
                // RESET_TERMINAL
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
