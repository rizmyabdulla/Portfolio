import Image from "next/image";
import { portfolio } from "@/lib/portfolio";
import portrait from "@/public/images/portrait-cutout.png";

export function HeroPortrait() {
  return (
    <figure className="hero-portrait">
      <div className="portrait-stage">
        <div className="portrait-paper portrait-paper-yellow" aria-hidden="true" />
        <div className="portrait-paper portrait-paper-blue" aria-hidden="true" />
        <svg className="portrait-scribbles" viewBox="0 0 340 425" fill="none" aria-hidden="true">
          <g className="portrait-loop">
            <path d="M47 317C-2 242 26 93 126 56C222 18 330 109 324 224C319 335 220 404 122 374C66 357 32 309 40 258" stroke="#789aa8" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="4 9" />
          </g>
          <g className="portrait-spark portrait-spark-one">
            <path d="M291 54L297 72L316 79L298 86L291 105L284 87L266 80L283 73L291 54Z" fill="#f2e399" stroke="#55594e" strokeWidth="2" strokeLinejoin="round" />
            <path d="M313 46L317 55M324 59L332 62" stroke="#789aa8" strokeWidth="2" strokeLinecap="round" />
          </g>
          <g className="portrait-spark portrait-spark-two">
            <path d="M34 240L39 253L52 258L39 263L34 277L29 264L16 258L29 253L34 240Z" fill="#b0d4f1" stroke="#55594e" strokeWidth="1.8" strokeLinejoin="round" />
          </g>
          <g className="portrait-small-marks">
            <path d="M35 138L23 148L37 157M60 137L72 147L59 158M52 133L44 162" stroke="#6d8992" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M282 264C300 247 314 258 300 271C289 282 305 290 322 275" stroke="#b29d50" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M71 378C101 389 144 388 168 379M82 387C105 394 134 393 151 388" stroke="#7faac3" strokeWidth="3" strokeLinecap="round" />
          </g>
          <g className="portrait-dot-marks" fill="#91a58f">
            <circle cx="39" cy="206" r="3" /><circle cx="303" cy="166" r="3.5" /><circle cx="282" cy="332" r="3" />
          </g>
        </svg>
        <Image className="portrait-photo" src={portrait} alt={`Portrait of ${portfolio.name}`} sizes="(max-width: 560px) 280px, (max-width: 760px) 32vw, 340px" preload />
        <span className="portrait-little-note" aria-hidden="true">a work in progress <span>✳</span></span>
      </div>
      <figcaption className="portrait-photo-caption">
        <div className="portrait-caption-arrow"><svg viewBox="0 0 46 33" fill="none" aria-hidden="true"><path d="M43 29C25 33 6 23 9 6M3 12L9 4L16 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg><span>hey, that&apos;s me!</span></div>
        <span className="portrait-caption-joke">Do I look like a kid? I ain&apos;t no kid! <span className="crying-emoji" role="img" aria-label="crying face">😭</span></span>
      </figcaption>
    </figure>
  );
}
