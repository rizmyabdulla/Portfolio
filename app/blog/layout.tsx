import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./blog.css";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="notebook">
      <div className="paper-margin" aria-hidden="true" />
      <div className="page-shell">
        <SiteHeader />
        <main id="main" tabIndex={-1} className="blog-main">{children}</main>
        <SiteFooter />
      </div>
    </div>
  );
}
