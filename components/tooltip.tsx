"use client";

import { cloneElement, useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type ReactElement } from "react";
import { createPortal } from "react-dom";

export function Tooltip({ text, children, className = "" }: { text: string; children: ReactElement<{ "aria-describedby"?: string }>; className?: string }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const overlay = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLSpanElement>(null);
  const point = useRef({ x: 0, y: 0 });
  const anchored = useRef(false);

  const place = useCallback((x: number, y: number) => {
    const bounds = overlay.current?.getBoundingClientRect();
    const width = bounds?.width ?? 200;
    const height = bounds?.height ?? 40;
    setPosition({
      left: Math.max(10, Math.min(x, window.innerWidth - width - 10)),
      top: y + height > window.innerHeight - 10 ? Math.max(10, y - height - 30) : y,
    });
  }, []);

  useLayoutEffect(() => {
    if (open) place(point.current.x, point.current.y);
  }, [open, place]);

  useEffect(() => {
    const closeOther = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== id) setOpen(false);
    };
    window.addEventListener("my-portfolio:tooltip-open", closeOther);
    return () => window.removeEventListener("my-portfolio:tooltip-open", closeOther);
  }, [id]);

  useEffect(() => {
    if (!open) return;
    const dismiss = () => {
      if (trigger.current?.contains(document.activeElement)) {
        const rect = trigger.current.getBoundingClientRect();
        point.current = { x: rect.left, y: rect.bottom + 10 };
        place(point.current.x, point.current.y);
      } else setOpen(false);
    };
    window.addEventListener("scroll", dismiss, true);
    window.addEventListener("resize", dismiss);
    return () => {
      window.removeEventListener("scroll", dismiss, true);
      window.removeEventListener("resize", dismiss);
    };
  }, [open, place]);

  function show() {
    window.dispatchEvent(new CustomEvent("my-portfolio:tooltip-open", { detail: id }));
    setOpen(true);
  }

  return (
    <span
      ref={trigger}
      className={`hover-hint ${className}`}
      onPointerEnter={event => {
        if (event.pointerType === "touch") return;
        anchored.current = document.documentElement.dataset.motion === "paused" || (document.documentElement.dataset.motion !== "on" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
        const rect = event.currentTarget.getBoundingClientRect();
        point.current = anchored.current ? { x: rect.left, y: rect.bottom + 10 } : { x: event.clientX + 14, y: event.clientY + 20 };
        place(point.current.x, point.current.y);
        show();
      }}
      onPointerMove={event => {
        if (!open || anchored.current) return;
        point.current = { x: event.clientX + 14, y: event.clientY + 20 };
        place(point.current.x, point.current.y);
      }}
      onPointerLeave={event => {
        if (!event.currentTarget.contains(document.activeElement)) setOpen(false);
      }}
      onFocusCapture={event => {
        anchored.current = true;
        const rect = event.currentTarget.getBoundingClientRect();
        point.current = { x: rect.left, y: rect.bottom + 10 };
        place(point.current.x, point.current.y);
        show();
      }}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
      onKeyDown={event => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      {cloneElement(children, { "aria-describedby": open ? [children.props["aria-describedby"], id].filter(Boolean).join(" ") : children.props["aria-describedby"] })}
      {open && createPortal(<div ref={overlay} id={id} role="tooltip" className="paper-tooltip" style={position}>{text}</div>, document.body)}
    </span>
  );
}
