"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useId, useRef, useState } from "react";
import portrait from "@/public/images/portrait-cutout.png";

export function PortraitInteraction({ name }: { name: string }) {
  const id = useId();
  const image = useRef<HTMLImageElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const pixels = useRef<{ data: Uint8ClampedArray; width: number; height: number } | null>(null);
  const [hovered, setHovered] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const [touchActive, setTouchActive] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [point, setPoint] = useState({ left: 10, top: 10 });
  const open = hovered || keyboardFocus || touchActive;

  function isPhoto(x: number, y: number) {
    const img = image.current;
    if (!img || !img.complete || !img.naturalWidth || document.elementFromPoint(x, y) !== img) return false;
    try {
      if (!pixels.current) {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const context = canvas.getContext("2d", { willReadFrequently: true });
        if (!context) return false;
        context.drawImage(img, 0, 0);
        pixels.current = context.getImageData(0, 0, canvas.width, canvas.height);
      }
      const rect = img.getBoundingClientRect();
      const scale = Math.min(rect.width / img.naturalWidth, rect.height / img.naturalHeight);
      const left = rect.left + (rect.width - img.naturalWidth * scale) / 2;
      const top = rect.bottom - img.naturalHeight * scale;
      const px = Math.floor((x - left) / scale);
      const py = Math.floor((y - top) / scale);
      const data = pixels.current;
      return px >= 0 && py >= 0 && px < data.width && py < data.height && data.data[(py * data.width + px) * 4 + 3] > 32;
    } catch { return false; }
  }

  function place(x: number, y: number) {
    setPoint({ left: Math.max(10, Math.min(x + 14, window.innerWidth - 240)), top: Math.max(10, Math.min(y + 20, window.innerHeight - 65)) });
  }

  useEffect(() => {
    if (!touchActive) return;
    const dismiss = (event: PointerEvent) => {
      if (!button.current?.contains(event.target as Node)) { setTouchActive(false); setClicked(false); }
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [touchActive]);

  return (
    <>
      <button ref={button} type="button" className={`portrait-photo-trigger${hovered ? " is-over-photo" : ""}`} aria-label={`Portrait of ${name}. Activate for a playful reaction.`} aria-describedby={open ? id : undefined}
        onPointerMove={event => {
          if (event.pointerType === "touch") return;
          const hit = isPhoto(event.clientX, event.clientY);
          setHovered(hit);
          if (hit) place(event.clientX, event.clientY);
          else setClicked(false);
        }}
        onPointerLeave={() => { setHovered(false); setClicked(false); }}
        onPointerDown={event => { if (!isPhoto(event.clientX, event.clientY)) event.preventDefault(); }}
        onFocus={event => {
          if (!event.currentTarget.matches(":focus-visible")) return;
          const rect = event.currentTarget.getBoundingClientRect();
          place(rect.left, rect.bottom - 20);
          setKeyboardFocus(true);
        }}
        onBlur={() => { setKeyboardFocus(false); setClicked(false); }}
        onKeyDown={event => { if (event.key === "Escape") { setHovered(false); setKeyboardFocus(false); setTouchActive(false); setClicked(false); } }}
        onClick={event => {
          if (event.detail !== 0 && !isPhoto(event.clientX, event.clientY)) return;
          if (event.detail !== 0) place(event.clientX, event.clientY);
          setClicked(true);
          if (event.detail !== 0 && !window.matchMedia("(hover: hover)").matches) setTouchActive(true);
        }}
      >
        <Image ref={image} className="portrait-photo" src={portrait} alt={`Portrait of ${name}`} sizes="(max-width: 560px) 280px, (max-width: 760px) 32vw, 340px" preload onLoad={() => { pixels.current = null; }} />
      </button>
      {open && createPortal(<div id={id} role="tooltip" className="paper-tooltip" style={point}>{clicked ? "Ew, stop touching me!" : "Don't touch me. Okay?"} <span className="animated-emoji portrait-tooltip-emoji" aria-hidden="true"><Image className="emoji-moving" src={clicked ? "/emojis/sob.gif" : "/emojis/giggle.gif"} width={24} height={24} alt="" unoptimized /><Image className="emoji-still" src={clicked ? "/emojis/sob.png" : "/emojis/giggle.png"} width={24} height={24} alt="" unoptimized /></span></div>, document.body)}
    </>
  );
}
