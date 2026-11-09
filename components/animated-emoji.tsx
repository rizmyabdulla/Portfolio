import Image from "next/image";
import { emojis, type EmojiName } from "@/lib/emojis";
import { Tooltip } from "@/components/tooltip";

export function AnimatedEmoji({ name, size = 30, className = "", eager = false, decorative = true }: { name: EmojiName; size?: number; className?: string; eager?: boolean; decorative?: boolean }) {
  const emoji = emojis[name];
  return (
    <Tooltip text={emoji.hint}>
      <span className={`animated-emoji ${className}`} style={{ width: size, height: size }} role={decorative ? undefined : "img"} aria-label={decorative ? undefined : emoji.label} aria-hidden={decorative ? true : undefined}>
        <Image className="emoji-moving" src={`/emojis/${name}.gif`} width={size} height={size} alt="" unoptimized loading={eager ? "eager" : "lazy"} />
        <Image className="emoji-still" src={`/emojis/${name}.png`} width={size} height={size} alt="" unoptimized loading={eager ? "eager" : "lazy"} />
      </span>
    </Tooltip>
  );
}
