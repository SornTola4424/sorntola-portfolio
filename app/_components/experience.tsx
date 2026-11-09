import { experience } from "../_data/content";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          index="03"
          kicker="Career"
          title="Where I've worked"
          description="A path shaped by shipping real products, mentoring teammates and constantly leveling up."
        />

        <div className="relative border-l border-line pl-8 md:pl-10">
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 100} className="relative pb-12 last:pb-0">
              <span
                className="absolute -left-[41px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-background md:-left-[49px]"
                aria-hidden
              />
              <div className="mb-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="font-display text-xl font-semibold text-ink">
                  {job.role}
                </h3>
                <span className="text-sm font-medium text-accent">@ {job.company}</span>
              </div>
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
                {job.period}
              </p>
              <ul className="space-y-2.5">
                {job.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}