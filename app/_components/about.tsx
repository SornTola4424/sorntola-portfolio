import { profile } from "../_data/content";
import { MapPinIcon, MailIcon, DownloadIcon } from "./icons";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          index="01"
          kicker="About me"
          title="Turning ideas into software that ships"
        />

        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="space-y-6">
            {profile.bio.map((p, i) => (
              <Reveal key={i} delay={i * 80}>
                <p className="text-base leading-relaxed text-muted md:text-lg">
                  {p}
                </p>
              </Reveal>
            ))}
            <Reveal delay={200}>
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href={profile.resume}
                  className="inline-flex items-center gap-2 rounded-lg border border-accent/30 px-5 py-2.5 text-sm font-medium text-accent transition-all hover:bg-accent/10"
                >
                  <DownloadIcon className="h-4 w-4" />
                  Download CV
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <div className="glass rounded-2xl p-6 md:p-7">
              <h3 className="font-display text-lg font-semibold text-ink">
                Quick facts
              </h3>
              <ul className="mt-5 space-y-4">
                {profile.highlights.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center justify-between gap-4 border-b border-line pb-4 last:border-0 last:pb-0"
                  >
                    <span className="font-mono text-xs uppercase tracking-widest text-muted">
                      {item.label}
                    </span>
                    <span className="text-right text-sm font-medium text-ink">
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-3 border-t border-line pt-5">
                <p className="flex items-center gap-2 text-sm text-muted">
                  <MapPinIcon className="h-4 w-4 text-accent" />
                  {profile.location}
                </p>
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-2 text-sm text-accent transition-colors hover:text-accent-2"
                >
                  <MailIcon className="h-4 w-4" />
                  {profile.email}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}