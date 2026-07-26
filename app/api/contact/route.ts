import { NextResponse } from "next/server";

/* Never prerender or cache a form endpoint. */
export const dynamic = "force-dynamic";

const MAX = { email: 254, budget: 120, task: 4000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* Best-effort flood guard. Serverless instances are short-lived, so this stops
   naive bursts rather than a determined attacker — pair with Vercel WAF or an
   Upstash-backed limiter if the form starts drawing real spam. */
const RATE_LIMIT = { windowMs: 60_000, max: 3 };
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 5000) hits.clear(); // crude memory ceiling

  return recent.length > RATE_LIMIT.max;
}

type Lead = { email: string; budget: string; task: string };

async function deliver(lead: Lead): Promise<boolean> {
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;

  const text = `New request from the A-AND-I site\n\nEmail:  ${lead.email}\nBudget: ${lead.budget}\n\nTask:\n${lead.task}`;

  if (RESEND_API_KEY && CONTACT_TO_EMAIL) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL || "A-AND-I Site <onboarding@resend.dev>",
        to: [CONTACT_TO_EMAIL],
        reply_to: lead.email,
        subject: `[A-AND-I] Request from ${lead.email}`,
        text,
      }),
    });
    if (!res.ok) {
      console.error("[contact] Resend failed:", res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  }

  if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text }),
    });
    if (!res.ok) {
      console.error("[contact] Telegram failed:", res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  }

  console.error("[contact] No delivery channel configured — see .env.example. Lead was NOT delivered:", lead.email);
  return false;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  /* Honeypot: a real user never sees this field, so any value means a bot.
     Answer 200 so the bot believes it succeeded and does not retry. */
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email = String(body.email ?? "").trim();
  const budget = String(body.budget ?? "").trim();
  const task = String(body.task ?? "").trim();

  const fieldErrors: Record<string, string> = {};
  if (!EMAIL_RE.test(email) || email.length > MAX.email) fieldErrors.email = "invalid_email";
  if (!budget || budget.length > MAX.budget) fieldErrors.budget = "invalid_budget";
  if (task.length < 10 || task.length > MAX.task) fieldErrors.task = "invalid_task";

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ error: "validation_failed", fieldErrors }, { status: 400 });
  }

  const delivered = await deliver({ email, budget, task });
  if (!delivered) {
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
