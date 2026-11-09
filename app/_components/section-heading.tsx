import { Reveal } from "./reveal";

export function SectionHeading({
  index,
  kicker,
  title,
  description,
}: {
  index: string;
  kicker: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="flex items-center gap-3 font-mono text-sm">
        <span className="text-accent">{index}</span>
        <span className="h-px w-10 bg-line" aria-hidden />
        <span className="text-muted">{kicker}</span>
      </div>
      <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{description}</p>
      ) : null}
    </Reveal>
  );
}