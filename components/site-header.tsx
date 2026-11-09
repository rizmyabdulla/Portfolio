"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Code2, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { portfolio } from "@/lib/portfolio";
import { Tooltip } from "@/components/tooltip";
import { ThemeToggle } from "@/components/theme-toggle";

const sectionIds = ["about", "work", "contact"];

export function SiteHeader() {
  const pathname = usePathname();
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const blogActive = pathname.startsWith("/blog");

  useEffect(() => {
    setOpen(false);
    if (pathname !== "/") { setActive(""); return; }
    const elements = sectionIds.map(id => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const visible = new Set<string>();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => (entry.isIntersecting ? visible.add(entry.target.id) : visible.delete(entry.target.id)));
      setActive(elements.find(el => visible.has(el.id))?.id ?? "");
    }, { rootMargin: "-30% 0px -50% 0px" });
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const current = (id: string) => (active === id ? "location" : undefined);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <Tooltip text="Back to the first page">
        <Link href="/" className="wordmark" aria-label={`${portfolio.name}, home`}>
          <Image src="/images/portrait-cutout.png" width={38} height={38} className="profile-avatar" alt="" />
          <span>{portfolio.firstName}<span className="blue-dot">.</span></span>
        </Link>
      </Tooltip>
      <div className="header-right">
        <nav id="site-nav" className={open ? "is-open" : undefined} aria-label="Main navigation">
          <Link className="ink-link" href="/#about" aria-current={current("about")} onClick={close}>About</Link>
          <Link className="ink-link" href="/#work" aria-current={current("work")} onClick={close}>Work</Link>
          <Link className="ink-link" href="/blog" aria-current={blogActive ? "location" : undefined} onClick={close}>Blog</Link>
          <Link className="ink-link" href="/#contact" aria-current={current("contact")} onClick={close}>Contact</Link>
          <Link className="nav-note" href="https://github.com/rizmyabdulla/portfolio" target="_blank" rel="noopener noreferrer" aria-label="Source code on GitHub">
            <Code2 size={23} aria-hidden="true" />
          </Link>
        </nav>
        <ThemeToggle />
        <button className="menu-toggle" type="button" onClick={() => setOpen(value => !value)} aria-expanded={open} aria-controls="site-nav" aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}
