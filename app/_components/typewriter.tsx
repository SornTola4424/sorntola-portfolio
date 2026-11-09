"use client";

import { useEffect, useState } from "react";

const ROLES = [
  "Full-Stack Developer",
  "Next.js Enthusiast",
  "API Architect",
  "Problem Solver",
];

export function Typewriter() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = ROLES[index % ROLES.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && text === "") {
      timeout = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % ROLES.length);
      }, 350);
    } else {
      timeout = setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? 30 : 65,
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index]);

  return (
    <span className="font-mono text-2xl text-accent md:text-4xl">
      <span className="text-muted">&gt;</span> {text}
      <span className="animate-blink text-accent-2">_</span>
    </span>
  );
}