import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { GalaxyBackground } from "./_components/galaxy-background";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sorntola.dev"),
  title: {
    default: "Sorntola — Full-Stack Developer",
    template: "%s | Sorntola",
  },
  description:
    "Sorntola is a full-stack developer crafting fast, elegant and scalable web applications with Next.js, React, Node.js and modern tooling.",
  keywords: [
    "Sorntola",
    "full-stack developer",
    "web developer",
    "React",
    "Next.js",
    "Node.js",
    "portfolio",
  ],
  authors: [{ name: "Sorntola", url: "https://sorntola.dev" }],
  openGraph: {
    type: "website",
    url: "https://sorntola.dev",
    siteName: "Sorntola",
    title: "Sorntola — Full-Stack Developer",
    description:
      "Crafting fast, elegant and scalable web applications with Next.js, React and Node.js.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sorntola — Full-Stack Developer",
    description:
      "Crafting fast, elegant and scalable web applications with Next.js, React and Node.js.",
  },
};

export const viewport: Viewport = {
  themeColor: "#05070a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-ink">
        <GalaxyBackground />
        {children}
      </body>
    </html>
  );
}