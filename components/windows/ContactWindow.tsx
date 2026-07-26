"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LangContext";

/* Shown to the user only when delivery fails, so they always have a way through. */
const FALLBACK_EMAIL = "netbounce19@gmail.com";

type FieldName = "email" | "budget" | "task";
type ErrorKey = "validation" | "rateLimit" | "network" | "delivery";

export default function ContactWindow() {
  const { t } = useLang();
  const { contact } = t.windows;

  const [values, setValues] = useState({ email: "", budget: "", task: "" });
  const [company, setCompany] = useState(""); // honeypot — humans never fill this
  const [invalid, setInvalid] = useState<FieldName[]>([]);
  /* Store the key, not the resolved sentence — otherwise a visible error keeps
     the wording of whatever language was active when it was raised. */
  const [errorKey, setErrorKey] = useState<ErrorKey | null>(null);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (name: FieldName) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [name]: e.target.value }));
    setInvalid((f) => f.filter((x) => x !== name));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;

    setSending(true);
    setErrorKey(null);
    setInvalid([]);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company }),
      });

      if (res.ok) {
        setSubmitted(true);
        return;
      }

      const data = await res.json().catch(() => ({}));
      if (res.status === 429) {
        setErrorKey("rateLimit");
      } else if (data?.error === "validation_failed") {
        setInvalid(Object.keys(data.fieldErrors ?? {}) as FieldName[]);
        setErrorKey("validation");
      } else {
        setErrorKey("delivery");
      }
    } catch {
      setErrorKey("network");
    } finally {
      setSending(false);
    }
  };

  const handleReset = () => {
    setValues({ email: "", budget: "", task: "" });
    setCompany("");
    setInvalid([]);
    setErrorKey(null);
    setSubmitted(false);
  };

  const labelCls = "block text-[10px] tracking-[0.18em] uppercase mb-2 font-bold";
  const fieldStyle = (name: FieldName): React.CSSProperties => ({
    fontFamily: "var(--font-mono)",
    background: "transparent",
    border: `2px solid ${invalid.includes(name) ? "var(--accent-primary)" : "var(--border-subtle)"}`,
    color: "var(--text-primary)",
    transition: "border-color 0.15s",
  });

  return (
    <div className="p-6 md:p-8" style={{ background: "var(--bg-surface)" }}>
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            {(["email", "budget"] as const).map((name) => (
              <div key={name}>
                <label
                  htmlFor={`contact-${name}`}
                  className={labelCls}
                  style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
                >
                  {contact.fields[name]}
                </label>
                <input
                  id={`contact-${name}`}
                  type={name === "email" ? "email" : "text"}
                  value={values[name]}
                  onChange={set(name)}
                  placeholder={contact.placeholder[name]}
                  required
                  aria-invalid={invalid.includes(name)}
                  className="w-full outline-none px-3 py-2.5 text-sm"
                  style={fieldStyle(name)}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--text-primary)")}
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = invalid.includes(name)
                      ? "var(--accent-primary)"
                      : "var(--border-subtle)")
                  }
                />
              </div>
            ))}

            <div>
              <label
                htmlFor="contact-task"
                className={labelCls}
                style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
              >
                {contact.fields.task}
              </label>
              <textarea
                id="contact-task"
                value={values.task}
                onChange={set("task")}
                placeholder={contact.placeholder.task}
                required
                rows={4}
                aria-invalid={invalid.includes("task")}
                className="w-full outline-none px-3 py-2.5 resize-none text-sm"
                style={fieldStyle("task")}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--text-primary)")}
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = invalid.includes("task")
                    ? "var(--accent-primary)"
                    : "var(--border-subtle)")
                }
              />
            </div>

            {/* Honeypot — hidden from humans and assistive tech, bots fill it. */}
            <div aria-hidden className="absolute left-[-9999px] w-px h-px overflow-hidden">
              <label htmlFor="company-website">Company website</label>
              <input
                id="company-website"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            {errorKey && (
              <p
                role="alert"
                className="text-xs leading-relaxed"
                style={{ fontFamily: "var(--font-mono)", color: "var(--accent-primary)" }}
              >
                {contact.errors[errorKey]}
                <br />
                <span style={{ color: "var(--text-muted)" }}>
                  {contact.fallbackLabel}{" "}
                  <a href={`mailto:${FALLBACK_EMAIL}`} className="underline">
                    {FALLBACK_EMAIL}
                  </a>
                </span>
              </p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="w-full py-3.5 font-black text-[13px] tracking-[0.2em] uppercase cursor-pointer disabled:cursor-wait"
              style={{
                fontFamily: "var(--font-heading)",
                background: "var(--accent-primary)",
                color: "#fff",
                border: "2px solid var(--accent-primary)",
                opacity: sending ? 0.65 : 1,
                transition: "opacity 0.15s",
              }}
            >
              {sending ? contact.sending : contact.submit}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-8 text-center space-y-4"
          >
            <div
              className="text-sm tracking-[0.2em] font-bold uppercase"
              style={{ fontFamily: "var(--font-mono)", color: "var(--accent-primary)" }}
            >
              {contact.successTitle}
            </div>
            <p
              className="text-sm leading-relaxed max-w-xs mx-auto"
              style={{ fontFamily: "var(--font-heading)", color: "var(--text-secondary)" }}
            >
              {contact.success}
            </p>
            <button
              onClick={handleReset}
              className="mt-2 px-6 py-2.5 text-[11px] tracking-[0.18em] uppercase cursor-pointer font-bold"
              style={{
                fontFamily: "var(--font-mono)",
                border: "2px solid var(--border-subtle)",
                color: "var(--text-muted)",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--text-primary)";
                e.currentTarget.style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-subtle)";
                e.currentTarget.style.color = "var(--text-muted)";
              }}
            >
              {contact.reset}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
