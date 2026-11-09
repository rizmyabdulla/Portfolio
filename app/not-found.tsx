import Link from "next/link";

export default function NotFound() {
  return <main className="notebook" style={{ display: "grid", placeItems: "center", padding: 32 }}><div><p className="eyebrow">404 · a page out of place</p><h1 style={{ marginBottom: 24 }}>A little lost?</h1><p>This page isn&apos;t in the notebook.</p><Link className="text-cta" href="/">Back to the first page ↗</Link></div></main>;
}
