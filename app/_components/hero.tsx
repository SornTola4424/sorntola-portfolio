import Image from "next/image";
import { profile, socials, stats } from "../_data/content";
import {
  ArrowDownIcon,
  ArrowUpRightIcon,
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  XIcon,
} from "./icons";
import { Typewriter } from "./typewriter";

const socialIcons = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  X: XIcon,
};

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="bg-grid absolute inset-0" aria-hidden />
      <div
        className="animate-float-slow absolute -top-24 right-[-10%] hidden h-96 w-96 rounded-full bg-accent/10 blur-[120px] md:block"
        aria-hidden
      />
      <div
        className="animate-float-slow absolute bottom-0 left-[-8%] h-80 w-80 rounded-full bg-accent-2/10 blur-[120px]"
        style={{ animationDelay: "2.5s" }}
        aria-hidden
      />

      <div className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-6 pb-16 pt-28 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pt-32">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-2/70 px-4 py-1.5 font-mono text-xs text-muted">
            <span className="animate-pulse-dot h-2 w-2 rounded-full bg-accent" />
            {profile.availability}
          </div>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Build things that
            <br />
            <span className="text-gradient text-glow">work beautifully.</span>
          </h1>

          <div className="mt-6 h-8 md:h-10">
            <Typewriter />
          </div>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted md:text-lg">
            Hi, I&apos;m <span className="font-medium text-ink">{profile.name}</span> — I design
            and engineer polished, performant web experiences from design to deploy. Let me
            bring your next idea to life.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-background transition-all hover:bg-accent-2 hover:shadow-[0_0_32px_-6px_rgba(52,211,153,0.7)]"
            >
              View my work
              <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={profile.resume}
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface-2/70 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent/40 hover:text-accent"
            >
              <DownloadIcon className="h-4 w-4" />
              Download Resume
            </a>
          </div>

          <div className="mt-10 flex items-center gap-6">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              Connect
            </span>
            <span className="h-px w-10 bg-line" aria-hidden />
            <div className="flex items-center gap-3">
              {socials.map((social) => {
                const Icon = socialIcons[social.label as keyof typeof socialIcons];
                if (!Icon) return null;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-muted transition-all hover:border-accent/40 hover:text-accent hover:shadow-[0_0_20px_-6px_rgba(52,211,153,0.5)]"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                );
              })}
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-muted transition-all hover:border-accent/40 hover:text-accent hover:shadow-[0_0_20px_-6px_rgba(52,211,153,0.5)]"
              >
                <MailIcon className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div
            className="absolute -inset-8 rounded-3xl bg-accent/5 blur-3xl"
            aria-hidden
          />
          <div className="animate-float-slow relative w-full max-w-[280px] sm:max-w-xs lg:max-w-[21rem]">
            <div
              className="absolute -left-3 -top-3 z-10 h-16 w-16 rounded-tl-2xl border-l border-t border-accent/50"
              aria-hidden
            />
            <div
              className="absolute -bottom-3 -right-3 z-10 h-16 w-16 rounded-br-2xl border-b border-r border-accent/50"
              aria-hidden
            />

            <div className="relative overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-black/60">
              <div className="relative aspect-[4/5]">
                <Image
                  src={profile.photo}
                  alt={`Portrait of ${profile.firstName}`}
                  fill
                  sizes="(min-width: 1024px) 384px, 320px"
                  preload
                  className="object-cover object-top"
                />
                <div
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,transparent_35%,rgba(5,7,10,0.6)_100%)]"
                  aria-hidden
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-background from-10% via-background/55 via-45% to-transparent"
                  aria-hidden
                />

                <div className="absolute inset-x-0 bottom-0 z-10 p-5">
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                    {profile.role}
                  </div>
                  <div className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink">
                    {profile.firstName}
                  </div>
                  <div className="mt-2 flex items-center gap-2 font-mono text-[11px] text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {profile.location}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-line bg-surface-2/60 px-4 py-2.5 font-mono text-[11px] text-muted">
              <span className="truncate">
                <span className="text-accent-2">~/sorntola $</span> whoami
              </span>
              <span className="animate-blink text-accent">▊</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-y border-line bg-surface/50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-6 py-8 md:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label} className="px-4 py-2 text-center">
              <div className="font-display text-3xl font-semibold text-gradient md:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 font-mono text-xs uppercase tracking-widest text-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent md:flex"
      >
        <span>scroll</span>
        <ArrowDownIcon className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}