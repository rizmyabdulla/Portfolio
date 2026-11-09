import { Heart } from "lucide-react";
import { portfolio } from "@/lib/portfolio";
import { MotionToggle } from "@/components/motion-toggle";
import { socialIcons } from "@/components/social-icons";

export function SiteFooter() {
  const now = new Date();
  const updated = now.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
  return (
    <footer className="site-footer">
      <p>© {now.getUTCFullYear()} {portfolio.name}</p>
      <p>Made with care & a little <Heart size={15} aria-hidden="true" /></p>
      <ul className="footer-socials" aria-label="Social links">
        {portfolio.socials.map(social => {
          const Icon = socialIcons[social.label];
          return <li key={social.url}><a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.label}>{Icon && <Icon size={22} strokeWidth={1.6} aria-hidden="true" />}</a></li>;
        })}
      </ul>
      <p className="footer-updated">Updated {updated}</p>
      <MotionToggle />
      <a className="back-top scribble-top" href="#main">Back to top ↑</a>
    </footer>
  );
}
