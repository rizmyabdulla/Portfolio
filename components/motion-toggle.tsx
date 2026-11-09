"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const preferenceKey = "my-portfolio:motion";
type MotionPreference = "on" | "paused";

export function MotionToggle() {
  const [paused, setPaused] = useState(false);
  const preference = useRef<MotionPreference | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    try {
      const stored = localStorage.getItem(preferenceKey);
      if (stored === "on" || stored === "paused") preference.current = stored;
    } catch { /* The current page still supports the control without storage. */ }

    function apply() {
      const mode = preference.current ?? (media.matches ? "paused" : "on");
      document.documentElement.dataset.motion = mode;
      setPaused(mode === "paused");
    }
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  function toggle() {
    const next: MotionPreference = paused ? "on" : "paused";
    preference.current = next;
    document.documentElement.dataset.motion = next;
    setPaused(next === "paused");
    try { localStorage.setItem(preferenceKey, next); } catch { /* Keep the preference for this page. */ }
  }

  return <button className="motion-toggle" type="button" onClick={toggle} aria-pressed={paused}>{paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}<span>{paused ? "Resume motion" : "Pause motion"}</span></button>;
}
