import { navLinks, profile } from "../_data/content";
import { ChevronUpIcon } from "./icons";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="font-mono text-sm text-muted">
            © {year} <span className="text-ink">{profile.name}</span> — Built with Next.js
            &amp; Tailwind CSS.
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-5" aria-label="Footer">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#home"
            aria-label="Back to top"
            className="ml-2 flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted transition-all hover:border-accent/40 hover:text-accent"
          >
            <ChevronUpIcon className="h-4 w-4" />
          </a>
        </nav>
      </div>
    </footer>
  );
}