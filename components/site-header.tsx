import Image from "next/image";
import Link from "next/link";
import { Code2 } from "lucide-react";
import { portfolio } from "@/lib/portfolio";
import { Tooltip } from "@/components/tooltip";

export function SiteHeader({ blogActive = false }: { blogActive?: boolean }) {
  return (
    <header className="site-header">
      <Tooltip text="Back to the first page">
        <Link
          href="/"
          className="wordmark"
          aria-label={`${portfolio.name}, home`}
        >
          <Image
            src="/images/portrait-cutout.png"
            width={38}
            height={38}
            className="profile-avatar"
            alt=""
          />
          <span>
            {portfolio.firstName}
            <span className="blue-dot">.</span>
          </span>
        </Link>
      </Tooltip>
      <nav aria-label="Main navigation">
        <Link className="ink-link" href="/#about">
          About
        </Link>
        <Link className="ink-link" href="/#work">
          Work
        </Link>
        <Link
          className="ink-link"
          href="/blog"
          aria-current={blogActive ? "location" : undefined}
        >
          Blog
        </Link>
        <Link className="ink-link" href="/#contact">
          Contact
        </Link>
        <Link
          className="nav-note"
          href="https://github.com/rizmyabdulla/portfolio"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Tools I work with"
        >
          <Code2 size={23} aria-hidden="true" />
        </Link>
      </nav>
    </header>
  );
}
