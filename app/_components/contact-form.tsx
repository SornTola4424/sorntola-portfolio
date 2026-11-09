"use client";

import { useState, type FormEvent } from "react";
import { profile } from "../_data/content";
import { ArrowUpRightIcon } from "./icons";

type Status = "idle" | "sending" | "sent" | "error";

const EMPTY = { name: "", email: "", message: "" };

const mailtoHref = (form: { name: string; email: string; message: string }) => {
  const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || "you"}`);
  const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
  return `mailto:${profile.email}?subject=${subject}&body=${body}`;
};

export function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, company }),
      });

      if (response.ok) {
        setForm(EMPTY);
        setStatus("sent");
        return;
      }

      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setError("Network error — please check your connection and try again.");
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="glass rounded-2xl p-8 md:p-10" aria-live="polite">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/40 bg-accent/10 text-accent">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
            <path
              d="M4 12.5 9.5 18 20 6.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink">
          Message sent
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Thanks for reaching out — your message just landed in my inbox and I&apos;ll reply
          within a day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 inline-flex items-center gap-2 rounded-lg border border-line bg-surface-2/70 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent/40 hover:text-accent"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8">
      {/* Honeypot: hidden from people, tempting to bots. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        value={company}
        onChange={(event) => setCompany(event.target.value)}
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted">
            Your name
          </span>
          <input
            type="text"
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Jane Doe"
            className="w-full rounded-lg border border-line bg-surface-2 px-4 py-3 text-sm text-ink placeholder:text-muted/50 transition-colors focus:border-accent/60 focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted">
            Your email
          </span>
          <input
            type="email"
            name="email"
            required
            maxLength={200}
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="jane@company.com"
            className="w-full rounded-lg border border-line bg-surface-2 px-4 py-3 text-sm text-ink placeholder:text-muted/50 transition-colors focus:border-accent/60 focus:outline-none"
          />
        </label>
      </div>
      <label className="mt-5 block">
        <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted">
          Your message
        </span>
        <textarea
          name="message"
          required
          rows={5}
          minLength={10}
          maxLength={5000}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell me about your project…"
          className="w-full resize-none rounded-lg border border-line bg-surface-2 px-4 py-3 text-sm text-ink placeholder:text-muted/50 transition-colors focus:border-accent/60 focus:outline-none"
        />
      </label>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold text-background transition-all hover:bg-accent-2 hover:shadow-[0_0_32px_-6px_rgba(52,211,153,0.7)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {status === "sending" ? "Sending…" : "Send message"}
          <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
        <span className="font-mono text-xs text-muted">or email me directly</span>
      </div>

      <div aria-live="polite" className="min-h-0">
        {status === "error" ? (
          <p className="mt-4 rounded-lg border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-xs leading-relaxed text-rose-200">
            {error}{" "}
            <a
              href={mailtoHref(form)}
              className="font-medium text-accent underline-offset-2 hover:underline"
            >
              Email me directly
            </a>
            .
          </p>
        ) : null}
      </div>
    </form>
  );
}
