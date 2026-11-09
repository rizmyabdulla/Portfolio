import Image from "next/image";
import { ArrowDown, ArrowUpRight, Github, Instagram, Linkedin, Mail, MoveUpRight, Send, Sparkles, Twitter } from "lucide-react";
import { CopyDomain } from "@/components/copy-domain";
import { HeroPortrait } from "@/components/hero-portrait";
import { portfolio } from "@/lib/portfolio";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AnimatedEmoji } from "@/components/animated-emoji";
import { HoverCard } from "@/components/hover-card";
import { Tooltip } from "@/components/tooltip";

const socialIcons: Record<string, typeof Github> = { GitHub: Github, Instagram, LinkedIn: Linkedin, Telegram: Send, X: Twitter };

export default function Home() {
  return (
    <div className="notebook">
      <div className="paper-margin" aria-hidden="true" />
      <div className="page-shell">
        <SiteHeader />

        <main id="main" tabIndex={-1}>
          <section className="hero" aria-labelledby="intro-title">
            <div className="intro-copy">
              <div className="eyebrow"><span className="tiny-star" aria-hidden="true">✳</span> a personal notebook, on the internet</div>
              <h1 id="intro-title">Hey, I&apos;m<br /><span className="name-highlight">{portfolio.name}</span><AnimatedEmoji name="wave" size={44} className="wave" eager /></h1>
              <p className="intro-lead">{portfolio.role}</p>
              <p className="intro-description">{portfolio.introduction}</p>
              <div className="intro-actions"><a href="#work" className="text-cta">Explore my work <ArrowDown size={17} aria-hidden="true" /></a>{portfolio.email && <a href={`mailto:${portfolio.email}`} className="intro-contact">Say hello <ArrowUpRight size={17} aria-hidden="true" /></a>}</div>
            </div>
            <div className="hero-art"><HeroPortrait /></div>
          </section>

          <section id="about" className="section about-section" aria-labelledby="about-title">
            <div className="section-heading"><span className="section-number">01 /</span><h2 id="about-title">A little about me <AnimatedEmoji name="cool" size={32} className="heading-emoji" /></h2></div>
            <p className="about-copy">{portfolio.about}</p>
            <div className="principles">
              <p><span className="scribble-number">01.</span> Start with a <mark>little curiosity.</mark></p>
              <p><span className="scribble-number">02.</span> Make something <span className="wavy-underline">worth sharing.</span></p>
              <p><span className="scribble-number">03.</span> Keep learning. Keep building. <span aria-hidden="true">↗</span></p>
            </div>
          </section>

          <section id="work" className="section" aria-labelledby="work-title">
            <div className="section-heading"><span className="section-number">02 /</span><h2 id="work-title">Things I&apos;m building <AnimatedEmoji name="typing" size={34} className="heading-emoji" /></h2></div>
            <p className="section-description">From a first idea to something out in the world.</p>
            <div className="projects">
              {portfolio.projects.map((project, index) => (
                <HoverCard key={project.title}>
                  <div className={`project-art project-art-${project.theme}`}><a href={project.url} target="_blank" rel="noopener noreferrer" className="project-preview" aria-label={`Visit ${project.title} (opens in a new tab)`}><div className="browser-top" aria-hidden="true"><i /><i /><i /><span>{project.domain}</span><ArrowUpRight size={11} /></div><Image src={project.image} alt={project.imageAlt} width={1280} height={840} sizes="(max-width: 560px) 90vw, 380px" /></a><span className="project-sticker" aria-hidden="true">{project.note} ✳</span></div>
                  <div className="project-details"><div className="project-meta"><span>{project.category}</span><span>0{index + 1}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="project-bottom"><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><a href={project.url} target="_blank" rel="noopener noreferrer" className="project-link">{project.label}<ArrowUpRight size={18} aria-hidden="true" /></a></div></div>
                </HoverCard>
              ))}
            </div>
            <div className="coming-note"><Sparkles size={19} aria-hidden="true" /><p>More experiments and open-source work on <a className="ink-link" href="https://github.com/rizmyabdulla" target="_blank" rel="noopener noreferrer">my GitHub <ArrowUpRight size={14} aria-hidden="true" /></a>.</p></div>
          </section>

          <section id="colophon" className="section colophon" aria-labelledby="colophon-title">
            <div className="section-heading"><span className="section-number">03 /</span><h2 id="colophon-title">Things I work with <AnimatedEmoji name="giggle" size={31} className="heading-emoji" /></h2></div>
            <p className="section-description">A few familiar tools for web, mobile, and everything in between.</p>
            <ul className="tech-list" aria-label="Technologies I work with">{portfolio.skills.map(skill => <li key={skill.name}><Tooltip text={skill.hint}><span className="tech-chip" tabIndex={0}><span className={`tech-symbol symbol-${skill.tone}`} aria-hidden="true">{skill.mark}</span>{skill.name}</span></Tooltip></li>)}</ul>
            <p className="colophon-note">Always room in the toolbox for something new.</p>
          </section>

          <section id="contact" className="closing-note" aria-labelledby="closing-title">
            <AnimatedEmoji name="coffee" size={42} className="closing-emoji" />
            <div><p className="eyebrow">good things start with a hello</p><h2 id="closing-title">Have a little idea?</h2><p>Let&apos;s talk about what it could become.</p>{portfolio.email && <a className="email-link" href={`mailto:${portfolio.email}`}><Mail size={18} aria-hidden="true" />{portfolio.email}<ArrowUpRight size={17} aria-hidden="true" /></a>}<CopyDomain domain={portfolio.domain} /></div>
            <MoveUpRight className="closing-arrow" size={55} strokeWidth={1.2} aria-hidden="true" />
          </section>

          <section id="online" className="social-links" aria-labelledby="online-title">
            <h2 id="online-title">Find me online</h2>
            <ul>{portfolio.socials.map(social => { const Icon = socialIcons[social.label] ?? ArrowUpRight; return <li key={social.url}><a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={`${social.label}: ${social.display}`} data-social={social.label}><Icon size={26} strokeWidth={1.6} aria-hidden="true" /><span>{social.label}</span></a></li>; })}{portfolio.email && <li><a href={`mailto:${portfolio.email}`} aria-label="Email"><Mail size={26} strokeWidth={1.6} aria-hidden="true" /><span>Email</span></a></li>}</ul>
          </section>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
