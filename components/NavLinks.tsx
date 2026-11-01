"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Gallery" },
  { href: "/hooks/", label: "Hooks" },
  { href: "/structures/", label: "Structures" },
  { href: "/about/", label: "Data notes" },
];

export default function NavLinks() {
  const path = usePathname() ?? "/";
  return (
    <nav className="nav-links">
      {LINKS.map((l) => {
        const active = l.href === "/" ? path === "/" || path.startsWith("/v/") : path.startsWith(l.href.replace(/\/$/, ""));
        return (
          <Link key={l.href} href={l.href} aria-current={active ? "page" : undefined}>
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
