import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Braces, Code2, Heart, Mail, MoveUpRight, PencilLine, Sparkles } from "lucide-react";
import { CopyDomain } from "@/components/copy-domain";
import { NotebookArt } from "@/components/notebook-art";
import { portfolio } from "@/lib/portfolio";

export default function Home() {
  return (
    <div className="notebook">
      <div className="paper-margin" aria-hidden="true" />
      <div className="page-shell">
        <header className="site-header">
          <Link href="/" className="wordmark" aria-label={`${portfolio.name}, home`}>
            <Image src="/images/rizmy-avatar.png" width={38} height={38} className="profile-avatar" alt="" />
            <span>{portfolio.firstName}<span className="blue-dot">.</span></span>
          </Link>
          <nav aria-label="Main navigation">
            <a className="ink-link" href="#about">About</a>
            <a className="ink-link" href="#work">Work</a>
            <a className="ink-link" href="#contact">Contact</a>
            <a className="nav-note" href="#colophon" aria-label="Tools I work with"><Code2 size={23} aria-hidden="true" /></a>
          </nav>
        </header>

        <main id="main" tabIndex={-1}>
          <section className="hero" aria-labelledby="intro-title">
            <div className="intro-copy">
              <div className="eyebrow"><span className="tiny-star" aria-hidden="true">✳</span> A PERSONAL NOTEBOOK, ON THE INTERNET</div>
              <h1 id="intro-title">Hey, I&apos;m<br /><span className="name-highlight">{portfolio.name}</span><span className="wave" role="img" aria-label="waving hand">👋</span></h1>
              <p className="intro-lead">{portfolio.role}</p>
              <p className="intro-description">{portfolio.introduction}</p>
              <div className="intro-actions"><a href="#work" className="text-cta">Explore my work <ArrowDown size={17} aria-hidden="true" /></a>{portfolio.email && <a href={`mailto:${portfolio.email}`} className="intro-contact">Say hello <ArrowUpRight size={17} aria-hidden="true" /></a>}</div>
            </div>
            <div className="hero-art"><NotebookArt /><span className="side-note">make yourself at home ↗</span></div>
          </section>

          <section id="about" className="section about-section" aria-labelledby="about-title">
            <div className="section-heading"><span className="section-number">01 /</span><h2 id="about-title">A little about me <Heart className="heading-icon heart" size={25} aria-hidden="true" /></h2></div>
            <p className="about-copy">{portfolio.about}</p>
            <div className="principles">
              <p><span className="scribble-number">01.</span> Start with a <mark>little curiosity.</mark></p>
              <p><span className="scribble-number">02.</span> Make something <span className="wavy-underline">worth sharing.</span></p>
              <p><span className="scribble-number">03.</span> Keep learning. Keep building. <span aria-hidden="true">↗</span></p>
            </div>
          </section>

          <section id="work" className="section" aria-labelledby="work-title">
            <div className="section-heading"><span className="section-number">02 /</span><h2 id="work-title">Things I&apos;m building <PencilLine className="heading-icon" size={26} aria-hidden="true" /></h2></div>
            <p className="section-description">From a first idea to something out in the world.</p>
            <div className="projects">
              {portfolio.projects.map((project, index) => (
                <article className="project-card" key={project.title}>
                  <div className={`project-art project-art-${project.theme}`}><a href={project.url} target="_blank" rel="noopener noreferrer" className="project-preview" aria-label={`Visit ${project.title} (opens in a new tab)`}><div className="browser-top" aria-hidden="true"><i /><i /><i /><span>{project.domain}</span><ArrowUpRight size={11} /></div><Image src={project.image} alt={project.imageAlt} width={1280} height={840} sizes="(max-width: 560px) 90vw, 380px" /></a><span className="project-sticker" aria-hidden="true">{project.note} ✳</span></div>
                  <div className="project-details"><div className="project-meta"><span>{project.category}</span><span>0{index + 1}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="project-bottom"><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><a href={project.url} target="_blank" rel="noopener noreferrer" className="project-link">{project.label}<ArrowUpRight size={18} aria-hidden="true" /></a></div></div>
                </article>
              ))}
            </div>
            <div className="coming-note"><Sparkles size={19} aria-hidden="true" /><p>More experiments and open-source work on <a className="ink-link" href="https://github.com/rizmyabdulla" target="_blank" rel="noopener noreferrer">my GitHub <ArrowUpRight size={14} aria-hidden="true" /></a>.</p></div>
          </section>

          <section id="colophon" className="section colophon" aria-labelledby="colophon-title">
            <div className="section-heading"><span className="section-number">03 /</span><h2 id="colophon-title">Things I work with <Braces className="heading-icon" size={27} aria-hidden="true" /></h2></div>
            <p className="section-description">A few familiar tools for web, mobile, and everything in between.</p>
            <ul className="tech-list" aria-label="Technologies I work with">{portfolio.skills.map(skill => <li key={skill.name}><span className={`tech-symbol symbol-${skill.tone}`} aria-hidden="true">{skill.mark}</span>{skill.name}</li>)}</ul>
            <p className="colophon-note">Always room in the toolbox for something new.</p>
          </section>

          <section id="contact" className="closing-note" aria-labelledby="closing-title">
            <span className="closing-star" aria-hidden="true">✳</span>
            <div><p className="eyebrow">GOOD THINGS START WITH A HELLO</p><h2 id="closing-title">Have a little idea?</h2><p>Let&apos;s talk about what it could become.</p>{portfolio.email && <a className="email-link" href={`mailto:${portfolio.email}`}><Mail size={18} aria-hidden="true" />{portfolio.email}<ArrowUpRight size={17} aria-hidden="true" /></a>}<CopyDomain domain={portfolio.domain} /></div>
            <MoveUpRight className="closing-arrow" size={55} strokeWidth={1.2} aria-hidden="true" />
          </section>

          {(portfolio.email || portfolio.socials.length > 0) && <section className="social-links" aria-label="Find Rizmy online">{portfolio.email && <a className="ink-link" href={`mailto:${portfolio.email}`}>Say hello <ArrowUpRight size={16} aria-hidden="true" /></a>}{portfolio.socials.map(social => <a key={social.url} className="ink-link" href={social.url} target="_blank" rel="noopener noreferrer">{social.label}<ArrowUpRight size={16} aria-hidden="true" /></a>)}</section>}
        </main>

        <footer className="site-footer"><p>© {new Date().getFullYear()} {portfolio.name}</p><p>Made with care & a little <Heart size={13} aria-hidden="true" /></p><a className="back-top" href="#main">Back to top ↑</a></footer>
      </div>
    </div>
  );
}
