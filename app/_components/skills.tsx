import { skillGroups } from "../_data/content";
import { CodeIcon, TerminalIcon, WrenchIcon } from "./icons";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const groupIcons = {
  code: CodeIcon,
  terminal: TerminalIcon,
  wrench: WrenchIcon,
};

export function Skills() {
  return (
    <section id="skills" className="relative border-t border-line bg-surface/30 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          index="02"
          kicker="Toolbox"
          title="Technologies I work with"
          description="A pragmatic stack — proven tools for the job, chosen for developer experience and long-term maintainability."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {skillGroups.map((group, gi) => {
            const Icon = groupIcons[group.icon as keyof typeof groupIcons];
            return (
              <Reveal key={group.title} delay={gi * 100}>
                <article className="glass card-hover group h-full rounded-2xl p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {group.title}
                    </h3>
                  </div>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-md border border-line bg-surface-2 px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-accent/40 hover:text-accent"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}