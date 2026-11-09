export const emojis = {
  wave: { label: "A friendly wave", hint: ":wave: hello, internet!" },
  cool: { label: "A blob wearing sunglasses", hint: ":cool: a little personality" },
  typing: { label: "A cat typing", hint: ":typing: making things happen" },
  coffee: { label: "A character sipping coffee", hint: ":coffee: let's talk ideas" },
  giggle: { label: "A laughing character", hint: ":giggle: keep it fun" },
} as const;

export type EmojiName = keyof typeof emojis;
