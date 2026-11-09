"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type CopyLinkProps = { url: string; label: string; accessibleLabel: string; fallbackLabel: string };

export function CopyLink({ url, label, accessibleLabel, fallbackLabel }: CopyLinkProps) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fallback = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state === "error") fallback.current?.focus();
  }, [state]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function copy() {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(url);
      setState("copied");
      timer.current = setTimeout(() => setState("idle"), 3000);
    } catch {
      setState("error");
      fallback.current?.focus();
    }
  }

  return (
    <div className="copy-wrap">
      <button className="domain-copy" type="button" onClick={copy} aria-label={accessibleLabel}>
        <span>{label}</span>
        {state === "copied" ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      </button>
      <span className="copy-status" role="status">
        {state === "copied" ? "Link copied. Pass it on :)" : state === "error" ? "Select and copy the link below." : ""}
      </span>
      {state === "error" && (
        <label className="copy-fallback">
          {fallbackLabel}
          <input ref={fallback} readOnly value={url} onFocus={event => event.currentTarget.select()} />
        </label>
      )}
    </div>
  );
}
