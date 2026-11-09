"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const themeKey = "my-portfolio:theme";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => { setDark(document.documentElement.dataset.theme === "dark"); }, []);

  function toggle() {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    setDark(!dark);
    try { localStorage.setItem(themeKey, next); } catch { /* Theme still applies for this visit. */ }
  }

  return (
    <button className="theme-toggle" type="button" onClick={toggle} aria-pressed={dark} aria-label={dark ? "Switch to the light notebook" : "Switch to the night notebook"}>
      {dark ? <Sun size={21} aria-hidden="true" /> : <Moon size={21} aria-hidden="true" />}
    </button>
  );
}
