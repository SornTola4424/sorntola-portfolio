export const profile = {
  name: "SornTola",
  firstName: "Sornt Tola",
  role: "Full-Stack Developer",
  location: "Phnom Penh, Cambodia",
  email: "sorntola73@gmail.com",
  github: "https://github.com/SornTola4424",
  photo: "/profile.jpg",
  resume: "/sorntola-resume.pdf",
  availability: "Available for freelance",
  bio: [
    "I'm a full-stack developer who loves turning ambiguous problems into clean, performant software. I build products end-to-end — from pixel-perfect interfaces to reliable APIs and databases.",
    "My sweet spot is the modern JavaScript ecosystem: Next.js, React and Node.js, where I can move fast without sacrificing quality. I care deeply about performance budgets, accessible UI and code that the next person can read.",
  ],
  highlights: [
    { label: "Focus", value: "Web apps, APIs, SaaS" },
    { label: "Experience", value: "..." },
    { label: "Currently", value: "Building with Next.js/Laravel" },
    { label: "Open to", value: " Freelance" },
  ],
};

export const socials = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sorntola" },
  { label: "X", href: "https://x.com/sorntola" },
];

export const stats = [
  { value: "4", label: "Projects shipped" },
  { value: "..", label: "Years experience" },
  { value: "1", label: "Happy clients" },
  { value: "∞", label: "Cups of coffee" },
];

export const skillGroups = [
  {
    title: "Frontend",
    icon: "code",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Flutter",
    ],
  },
  {
    title: "Backend",
    icon: "terminal",
    skills: [
      "Laravel",
      "Express",
      "Spring Boot",
      "REST",
      "Auth & Security",
    ],
  },
  {
    title: "DevOps & Tools",
    icon: "wrench",
    skills: [
      "Docker",
      "GitHub Actions",
      "Vercel",
      "AWS",
      "Supabase",
      "Testing (Jest, Playwright)",
      "Figma",
    ],
  },
];

export const experience = [
  {
    role: "Senior Full-Stack Developer",
    company: "TechNova Solutions",
    period: "2023 — Present",
    points: [
      "Led a squad of 4 engineers rebuilding a legacy platform into a Next.js + NestJS SaaS serving 50k MAU.",
      "Cut initial load time 62% through code-splitting, caching strategies and image optimization.",
      "Introduced CI/CD pipelines, PR reviews and testing culture that reduced regressions by 40%.(DEMO)",
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "PixelCraft Agency",
    period: "2021 — 2023",
    points: [
      "Delivered 15+ client projects including e-commerce stores, dashboards and booking systems.",
      "Built reusable component libraries and design systems adopted across the agency.",
      "Worked directly with designers and clients to scope, prototype and ship on deadline.(DEMO)",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Nexa Digital",
    period: "2019 — 2021",
    points: [
      "Developed responsive marketing sites and SPAs with React and TypeScript.",
      "Improved Lighthouse performance scores from 60 to 95+ across flagship sites.",
      "Mentored two junior developers through code reviews and pair programming.(DEMO)",
    ],
  },
];

export const projects = [
  {
    name: "Nova Analytics",
    description:
      "Real-time analytics dashboard with event tracking, funnels and customizable reports. Handles millions of events per day.(DEMO)",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "ClickHouse", "tRPC"],
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    icon: "layers",
    links: { live: "#", repo: "#" },
    featured: true,
  },
  {
    name: "ShopSphere",
    description:
      "Headless e-commerce storefront with instant search, cart and Stripe checkout. Admin panel with inventory and order management.(DEMO)",
    tech: ["Next.js", "Prisma", "PostgreSQL", "Stripe", "Tailwind CSS"],
    gradient: "from-cyan-500/20 via-sky-500/10 to-transparent",
    icon: "globe",
    links: { live: "#", repo: "#" },
    featured: true,
  },
  {
    name: "DevBoard",
    description:
      "Kanban board for engineering teams with real-time collaboration, drag-and-drop and sprint analytics.(DEMO)",
    tech: ["React", "Node.js", "Socket.io", "Redis", "MongoDB"],
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    icon: "briefcase",
    links: { repo: "#" },
  },
  {
    name: "PulseAPI",
    description:
      "Drop-in API rate limiting and observability middleware for Node.js services, with a live metrics playground.(DEMO)",
    tech: ["Node.js", "TypeScript", "Redis", "OpenTelemetry"],
    gradient: "from-rose-500/20 via-red-500/10 to-transparent",
    icon: "database",
    links: { live: "#", repo: "#" },
  },
  {
    name: "SnapResume",
    description:
      "ATS-friendly resume builder with live preview, multiple templates and one-click export to PDF.(DEMO)",
    tech: ["Next.js", "TypeScript", "Zustand", "Puppeteer"],
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    icon: "sparkle",
    links: { live: "#", repo: "#" },
  },
  {
    name: "OrbitChat",
    description:
      "Lightweight team chat application with threads, reactions and end-to-end encrypted DMs.(DEMO)",
    tech: ["React", "NestJS", "PostgreSQL", "WebSockets"],
    gradient: "from-sky-500/20 via-blue-500/10 to-transparent",
    icon: "rocket",
    links: { repo: "#" },
  },
];

export const navLinks = [
  { label: "About", href: "#about", index: "01" },
  { label: "Skills", href: "#skills", index: "02" },
  { label: "Experience", href: "#experience", index: "03" },
  { label: "Projects", href: "#projects", index: "04" },
  { label: "Contact", href: "#contact", index: "05" },
];