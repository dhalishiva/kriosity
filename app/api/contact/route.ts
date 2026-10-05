import nodemailer, { type Transporter } from "nodemailer";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

export const runtime = "nodejs";

const topicLabels: Record<string, string> = {
  ...Object.fromEntries(products.map((p) => [p.slug, `${p.name} question`])),
  support: "Support for an existing account",
  consulting: "Consulting or a custom build",
  partnership: "Partnership or reselling",
  other: "Something else",
};

// Best-effort limit per server instance: 5 messages per IP per 10 minutes.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

let transporter: Transporter | null = null;
function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  transporter ??= nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: Number(SMTP_PORT) === 465, // 587 uses STARTTLS
    requireTLS: Number(SMTP_PORT || 587) !== 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return transporter;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "The form data couldn't be read. Refresh the page and try again." }, { status: 400 });
  }

  // Spam traps: a hidden field bots fill in, and forms submitted faster than a person can type.
  const startedAt = Number(body.startedAt);
  if (clean(body.website, 200) || !startedAt || Date.now() - startedAt < 3000) {
    return Response.json({ ok: true });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const company = clean(body.company, 160);
  const message = clean(body.message, 5000);
  const topic = typeof body.topic === "string" && body.topic in topicLabels ? body.topic : "other";

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Add your name, a valid email address and a message, then send again." }, { status: 422 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return Response.json(
      { error: `Too many messages from this connection. Try again in a few minutes, or email ${site.email}.` },
      { status: 429 },
    );
  }

  const mailer = getTransporter();
  if (!mailer) {
    console.error("Contact form: SMTP_HOST, SMTP_USER or SMTP_PASS is not set.");
    return Response.json(
      { error: `Messages can't be sent from this form right now. Email ${site.email} directly.` },
      { status: 503 },
    );
  }

  const to = topic === "support" ? process.env.SUPPORT_TO || site.supportEmail : process.env.CONTACT_TO || site.email;
  const from = process.env.SMTP_FROM || `Kriosity website <${process.env.SMTP_USER}>`;
  const label = topicLabels[topic];
  const subject = `${label} — ${name}${company ? `, ${company}` : ""}`;

  const text = `${message}\n\n— \n${name}\n${company ? company + "\n" : ""}${email}\nTopic: ${label}\nSent from ${site.url}/contact`;
  const html = `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.55;color:#17202e">
<p style="white-space:pre-wrap;margin:0 0 20px">${escapeHtml(message)}</p>
<table style="border-top:1px solid #d8e0e8;padding-top:12px;font-size:14px;color:#56627a">
<tr><td style="padding:2px 16px 2px 0">Name</td><td style="color:#17202e">${escapeHtml(name)}</td></tr>
${company ? `<tr><td style="padding:2px 16px 2px 0">Company</td><td style="color:#17202e">${escapeHtml(company)}</td></tr>` : ""}
<tr><td style="padding:2px 16px 2px 0">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
<tr><td style="padding:2px 16px 2px 0">Topic</td><td style="color:#17202e">${escapeHtml(label)}</td></tr>
</table>
<p style="font-size:12px;color:#56627a;margin-top:16px">Sent from the contact form on ${site.url}. Reply to answer ${escapeHtml(name)} directly.</p>
</div>`;

  try {
    await mailer.sendMail({ from, to, replyTo: { name, address: email }, subject, text, html });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact form: SMTP send failed", err);
    return Response.json(
      { error: `The message didn't go through. Try again in a minute, or email ${site.email} directly.` },
      { status: 502 },
    );
  }
}
