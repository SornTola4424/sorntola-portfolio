const CONTACT_TO = process.env.CONTACT_TO_EMAIL ?? "sorntola73@gmail.com";
const CONTACT_FROM =
  process.env.CONTACT_FROM_EMAIL ?? "Sorntola Portfolio <onboarding@resend.dev>";
const SITE_URL = "https://sorntola.dev";

const WINDOW_MS = 60 * 60_000;
const MAX_PER_WINDOW = 5;
/** Per-instance counters; a restart or redeploy clears them. */
const buckets = new Map<string, number[]>();

/** Drop hits older than the window so the bucket reflects the last hour only. */
function recentHits(key: string) {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length) buckets.set(key, recent);
  else buckets.delete(key);
  return recent;
}

/** Best-effort abuse guard; each serverless instance keeps its own counts. */
function recordHit(key: string) {
  const recent = recentHits(key);
  recent.push(Date.now());
  buckets.set(key, recent);
  if (buckets.size > 2000) buckets.clear();
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

type Fields = { name: string; email: string; message: string };
type Delivery = { ok: true } | { ok: false };

/** Preferred path: direct send through Resend once RESEND_API_KEY is set. */
async function sendWithResend(apiKey: string, fields: Fields): Promise<Delivery> {
  const text = [
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    "",
    fields.message,
    "",
    "— Sent from the portfolio contact form",
  ].join("\n");

  const html = `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;font-size:15px;line-height:1.6;color:#0f172a">
      <p style="margin:0 0 4px"><strong>${escapeHtml(fields.name)}</strong></p>
      <p style="margin:0 0 20px;color:#475569">${escapeHtml(fields.email)}</p>
      <div style="padding:16px 18px;border-radius:12px;background:#f1f5f9;white-space:pre-wrap">${escapeHtml(
        fields.message,
      )}</div>
      <p style="margin:20px 0 0;color:#94a3b8;font-size:12px">Sent from the portfolio contact form</p>
    </div>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: CONTACT_FROM,
      to: [CONTACT_TO],
      reply_to: fields.email,
      subject: `Portfolio message from ${fields.name}`,
      text,
      html,
    }),
  });

  if (!response.ok) {
    console.error("Resend delivery failed", response.status, await response.text());
    return { ok: false };
  }
  return { ok: true };
}

/**
 * Zero-setup path: FormSubmit relays the message to the inbox without an account.
 * The very first submission makes FormSubmit email an activation link, which the
 * owner has to click once; messages sent before that are held and delivered after.
 */
async function sendWithFormSubmit(fields: Fields): Promise<Delivery> {
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_TO)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // FormSubmit refuses requests that don't look like they came from a web page.
      Origin: SITE_URL,
      Referer: `${SITE_URL}/`,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
    },
    body: JSON.stringify({
      // Required over AJAX; the honeypot and per-hour limit cover abuse instead.
      _captcha: "false",
      _template: "table",
      _subject: `Portfolio message from ${fields.name}`,
      _url: SITE_URL,
      name: fields.name,
      email: fields.email,
      message: fields.message,
    }),
  });

  const data = (await response.json().catch(() => null)) as {
    success?: boolean | string;
    message?: string;
  } | null;

  const delivered = data?.success === true || data?.success === "true";
  const activationPending = /activation/i.test(data?.message ?? "");

  if (delivered || activationPending) return { ok: true };

  console.error("FormSubmit delivery failed", response.status, data);
  return { ok: false };
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  const honeypot = typeof payload.company === "string" ? payload.company.trim() : "";

  // Hidden field only bots fill in.
  if (honeypot) return Response.json({ ok: true });

  if (!name || name.length > 100) {
    return Response.json({ error: "Please add your name (100 characters max)." }, { status: 400 });
  }
  if (!isEmail(email) || email.length > 200) {
    return Response.json({ error: "Please add a valid email address." }, { status: 400 });
  }
  if (message.length < 10 || message.length > 5000) {
    return Response.json(
      { error: "Please write a message between 10 and 5000 characters." },
      { status: 400 },
    );
  }

  // Five messages per hour, per sender address and (when the host tells us) per IP.
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "";
  const keys = [`email:${email.toLowerCase()}`];
  if (ip) keys.push(`ip:${ip}`);

  if (keys.some((key) => recentHits(key).length >= MAX_PER_WINDOW)) {
    return Response.json(
      { error: "You've sent the maximum of 5 messages this hour — please try again later." },
      { status: 429 },
    );
  }
  keys.forEach(recordHit);

  const fields: Fields = { name, email, message };
  const apiKey = process.env.RESEND_API_KEY;

  try {
    const delivery = apiKey
      ? await sendWithResend(apiKey, fields)
      : await sendWithFormSubmit(fields);

    if (!delivery.ok) {
      return Response.json(
        { error: "I couldn't send that message right now. Please email me directly." },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact delivery request failed", error);
    return Response.json(
      { error: "I couldn't send that message right now. Please email me directly." },
      { status: 502 },
    );
  }
}
