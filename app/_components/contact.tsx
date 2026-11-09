import { profile, socials } from "../_data/content";
import { ContactForm } from "./contact-form";
import { GitHubIcon, LinkedInIcon, MailIcon, XIcon } from "./icons";
import { Reveal } from "./reveal";

const socialIcons = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  X: XIcon,
};

export function Contact() {
  return (
    <section id="contact" className="relative border-t border-line py-24 md:py-32">
      <div
        className="animate-float-slow absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/5 blur-[120px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Reveal>
              <div className="flex items-center gap-3 font-mono text-sm">
                <span className="text-accent">05</span>
                <span className="h-px w-10 bg-line" aria-hidden />
                <span className="text-muted">Get in touch</span>
              </div>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink md:text-5xl">
                Let&apos;s build something
                <br />
                <span className="text-gradient">great together.</span>
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted md:text-lg">
                Have a project in mind, a role to fill, or just want to say hi? My inbox is
                always open — I&apos;ll get back to you within a day.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-8 flex items-center gap-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-background transition-all hover:bg-accent-2 hover:shadow-[0_0_32px_-6px_rgba(52,211,153,0.7)]"
                >
                  <MailIcon className="h-4 w-4" />
                  {profile.email}
                </a>
                <div className="flex items-center gap-2">
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
                        className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-muted transition-all hover:border-accent/40 hover:text-accent"
                      >
                        <Icon className="h-4.5 w-4.5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={180}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}