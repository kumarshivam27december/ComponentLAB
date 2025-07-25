import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import styles from "./page.module.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ComponentLab",
  description: "Hacker-themed AI React component playground",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${styles.hackerBg}`}
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <main style={{ flex: 1 }}>{children}</main>
        </div>
        <footer className={styles.hackerFooter}>
          <div>
            <span className={styles.neon}>ComponentLab</span> &copy;{" "}
            {new Date().getFullYear()} &mdash; Made with{" "}
            <span style={{ color: "#39ff14" }}>❤</span> by Developers
          </div>
          <div className={styles.footerLinks}>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
