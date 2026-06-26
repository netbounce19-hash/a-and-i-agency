import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/context/LangContext";
import { WindowManagerProvider } from "@/context/WindowManagerContext";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "A-AND-I Agency — Digital Architecture Studio",
  description:
    "A-AND-I Agency is a digital architecture studio specializing in high-performance Next.js web interfaces, cross-platform mobile applications, and AI automation workflows.",
  keywords: ["web development", "Next.js", "mobile app", "AI automation", "n8n", "digital agency"],
  authors: [{ name: "A-AND-I Agency" }],
  openGraph: {
    title: "A-AND-I Agency — Digital Architecture Studio",
    description: "High-performance web, mobile, and AI automation solutions.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <body className="grain-overlay">
        <ThemeProvider>
          <LangProvider>
            <WindowManagerProvider>{children}</WindowManagerProvider>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
