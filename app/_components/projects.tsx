import { projects } from "../_data/content";
import {
  ArrowUpRightIcon,
  BriefcaseIcon,
  CodeIcon,
  DatabaseIcon,
  LayersIcon,
  RocketIcon,
  SparkleIcon,
} from "./icons";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const projectIcons = {
  layers: LayersIcon,
  globe: CodeIcon,
  briefcase: BriefcaseIcon,
  database: DatabaseIcon,
  sparkle: SparkleIcon,
  rocket: RocketIcon,
};

export function Projects() {
  return (
    <section
      id="projects"
      className="relative border-t border-line bg-surface/30 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          index="04"
          kicker="Portfolio"
          title="Things I've built"
          description="A selection of projects — from analytics platforms to e-commerce — where I owned the full lifecycle: architecture, build and launch."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => {
            const Icon = projectIcons[project.icon as keyof typeof projectIcons];
            return (
              <Reveal
                key={project.name}
                delay={(i % 2) * 100}
                className={project.featured ? "md:col-span-2" : ""}
              >
                <article className="glass card-hover group flex h-full flex-col overflow-hidden rounded-2xl">
                  <a
                    href={(project.links.live ?? project.links.repo) ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-gradient-to-br ${project.gradient} relative block h-40 overflow-hidden border-b border-line`}
                    aria-label={`Open ${project.name}`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className="h-14 w-14 text-ink/20 transition-all duration-300 group-hover:scale-110 group-hover:text-accent/60" />
                    </div>
                    <div className="absolute left-4 top-4 font-mono text-xs uppercase tracking-widest text-ink/50">
                      {project.name}
                    </div>
                    <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-background/60 text-ink/60 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-accent">
                      <ArrowUpRightIcon className="h-4 w-4" />
                    </span>
                  </a>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {project.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      {project.description}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-line bg-surface-2 px-2 py-1 font-mono text-[11px] text-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center gap-5 border-t border-line pt-4 text-sm">
                      {project.links.live ? (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-accent"
                        >
                          Live demo <ArrowUpRightIcon className="h-3.5 w-3.5" />
                        </a>
                      ) : null}
                      {project.links.repo ? (
                        <a
                          href={project.links.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-accent"
                        >
                          <CodeIcon className="h-3.5 w-3.5" />
                          Source
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}