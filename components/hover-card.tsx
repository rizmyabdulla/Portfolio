"use client";

import type { ReactNode } from "react";

export function HoverCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <article
      className={`project-card hover-card ${className}`}
      onPointerMove={event => {
        if (event.pointerType !== "mouse" || document.documentElement.dataset.motion === "paused" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const card = event.currentTarget;
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--card-x", `${((event.clientY - rect.top) / rect.height - 0.5) * -3}deg`);
        card.style.setProperty("--card-y", `${((event.clientX - rect.left) / rect.width - 0.5) * 3}deg`);
      }}
      onPointerLeave={event => {
        event.currentTarget.style.removeProperty("--card-x");
        event.currentTarget.style.removeProperty("--card-y");
      }}
    >
      {children}
    </article>
  );
}
