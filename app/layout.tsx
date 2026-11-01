import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import NavLinks from "@/components/NavLinks";

export const metadata: Metadata = {
  title: { default: "Launch Video Library by Dreamstate", template: "%s | Launch Video Library" },
  description: "Launch videos from startups, with dated public metrics, hook labels, timed structures, and agent skills to plan your own. By Dreamstate.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="nav">
          <div className="wrap">
            <Link href="/" className="brand">
              <span className="brand-mark" aria-hidden />
              Dreamstate <small>Launch Library</small>
            </Link>
            <NavLinks />
          </div>
        </header>
        <main>{children}</main>
        <footer>
          <div className="wrap">
            <span>Built by Dreamstate. Code under MIT. Metrics are reported public counts with the date they were read.</span>
            <span className="mono">
              <Link href="/about/">Data notes</Link>
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
