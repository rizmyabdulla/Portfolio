import { Heart } from "lucide-react";
import { portfolio } from "@/lib/portfolio";
import { MotionToggle } from "@/components/motion-toggle";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} {portfolio.name}</p>
      <p>Made with care & a little <Heart size={13} aria-hidden="true" /></p>
      <MotionToggle />
      <a className="back-top" href="#main">Back to top ↑</a>
    </footer>
  );
}
