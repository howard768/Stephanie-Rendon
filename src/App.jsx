import { useEffect, useRef, useState } from 'react';
import './index.css';

import stephaniePortrait from './assets/stephanie.webp';
import disasterImg from './assets/disaster-management.webp';
import logoNbc from './assets/logo-nbc.svg';
import logoToday from './assets/logo-today.svg';
import logoNyt from './assets/logo-nyt.svg';
import logoCbs from './assets/logo-cbs.svg';
import logoCnn from './assets/logo-cnn.svg';
import logoWapo from './assets/logo-wapo.svg';
// AP omitted: roundel logo collapses to a blank shape under the marquee's single-tone flatten.
import logoBloomberg from './assets/logo-bloomberg.svg';
import logoReuters from './assets/logo-reuters.svg';
import logoHuffpost from './assets/logo-huffpost.svg';

const HERO_LINES = [
  ['Strategic'],
  ['communications'],
  ['for ', { em: 'mission-' }],
  [{ em: 'driven' }, ' work.'],
];

const MARQUEE_OUTLETS = [
  { logo: logoNyt, alt: 'The New York Times', scale: 1 },
  { logo: logoNbc, alt: 'NBC News', scale: 1.15 },
  { logo: logoCbs, alt: 'CBS News', scale: 1.05 },
  { logo: logoToday, alt: 'The Today Show', scale: 1 },
  { logo: logoCnn, alt: 'CNN', scale: 1 },
  { logo: logoWapo, alt: 'The Washington Post', scale: 0.95 },
  { logo: logoBloomberg, alt: 'Bloomberg', scale: 0.95 },
  { logo: logoReuters, alt: 'Reuters', scale: 1 },
];

const WORK_ITEMS = [
  {
    href: '/work/fiu-disaster-drill/',
    internal: true,
    num: '01',
    titleParts: [{ em: 'Disaster' }, ' Response Field Course'],
    sector: "Press release translating FIU's hands-on graduate disaster-management program into a story the public could feel — picked up by CBS News Miami.",
    tags: ['Case Study', 'Higher Ed'],
    year: 'FIU · 2024',
  },
  {
    href: '/work/sos-villages/',
    internal: true,
    num: '02',
    titleParts: [{ em: 'SOS Villages' }, ' Doubled Web Traffic'],
    sector: "Bilingual integrated campaign with HuffPost and Johnson & Johnson that doubled SOS Children's Villages' web traffic.",
    tags: ['Case Study', 'NGO', 'National'],
    year: '2014–2016',
  },
  {
    href: '/work/red-cross/',
    internal: true,
    num: '03',
    titleParts: ['Celebrating ', { em: 'Heroes' }, " of Mexico's Quake"],
    sector: 'Feature on six earthquake survivors in Mexico — written to lead with resilience, not victimhood. Signature editorial for the American Red Cross.',
    tags: ['Case Study', 'Red Cross', 'Crisis'],
    year: '2018',
  },
  {
    href: 'https://news.fiu.edu/2024/researching-psychiatric-disease-risks-linked-to-childhood-lead-exposure',
    num: '04',
    titleParts: ['Childhood Lead & ', { em: 'Psychiatric' }, ' Disease'],
    sector: 'Multimillion-dollar study framed for a general audience — neurons, brain circuitry, behavior.',
    tags: ['Research', 'Public Health'],
    year: 'FIU · 2024',
  },
  {
    href: 'https://news.fiu.edu/2025/social-work-professor-named-educator-of-the-year',
    num: '05',
    titleParts: ['Social Work ', { em: 'Educator' }, ' of the Year'],
    sector: 'Feature profile on the FIU professor recognized for her contributions to the field.',
    tags: ['Profile', 'Higher Ed'],
    year: 'FIU · 2025',
  },
  {
    href: 'https://news.fiu.edu/2023/fiu-doctoral-student-dreams-of-improving-peoples-health-one-tv-segment-at-a-time',
    num: '06',
    titleParts: ['One ', { em: 'TV Segment' }, ' at a Time'],
    sector: "Feature story on a doctoral student's journey to become a medical correspondent.",
    tags: ['Feature', 'Health'],
    year: 'FIU · 2023',
  },
];

const SERVICES = [
  { num: 'S · 01', href: '/services/brand-narrative-strategy/', title: 'Brand & Narrative Strategy', body: 'Positioning, voice, and story architecture for organizations whose work is too complex for the category default.' },
  { num: 'S · 02', href: '/services/media-relations/', title: 'Media Relations', body: 'Earned-media strategy, pitching, spokesperson prep, and relationships that make reporters call you back.' },
  { num: 'S · 03', href: '/services/crisis-communications/', title: 'Crisis Communications', body: 'Rapid-response playbooks, bilingual family and stakeholder comms, and on-the-ground coordination when it counts.' },
  { num: 'S · 04', href: '/services/community-engagement/', title: 'Community Engagement', body: 'Programs that treat families, staff, and neighbors as audiences whose trust is earned — not assumed.' },
  { num: 'S · 05', href: '/services/editorial-content/', title: 'Editorial & Content', body: 'Publications, annual reports, long-form storytelling, and thought leadership that actually gets read.' },
  { num: 'S · 06', href: '/services/bilingual-campaigns/', title: 'Bilingual (EN/ES) Campaigns', body: 'Campaigns built bilingual from the start — not translated at the end. Cultural fluency, not just linguistic.' },
];

const PRESS_ITEMS = [
  {
    href: 'https://www.nbcnews.com/storyline/syrias-suffering-families/shot-during-cookies-milk-syrian-boys-story-n266356',
    logo: logoNbc, alt: 'NBC News',
    headline: "Shot During Cookies and Milk — a Syrian boy's story, supported by SOS Children's Villages.",
    metaLeft: 'SOS · NGO',
  },
  {
    href: 'https://www.nbcnews.com/storyline/syrias-children/child-war-survivor-syrias-children-dont-give-n51161',
    logo: logoNbc, alt: 'NBC News',
    headline: "A Liberian war survivor to Syria's children: Don't give up.",
    metaLeft: 'SOS · NGO',
  },
  {
    href: 'https://www.today.com/health/red-cross-urges-people-donate-blood-amid-coronavirus-concerns-t175665',
    logo: logoToday, alt: 'TODAY',
    headline: 'Red Cross urges blood donations as the pandemic squeezes supply.',
    metaLeft: 'Red Cross',
  },
  {
    href: 'https://www.nytimes.com/2020/05/21/climate/hurricane-season-2020-noaa.html',
    logo: logoNyt, alt: 'The New York Times',
    headline: 'NOAA predicts a busy Atlantic season — with FIU experts on preparedness.',
    metaLeft: 'FIU · Climate',
  },
  {
    href: 'https://www.cbsnews.com/miami/news/florida-international-university-stages-largest-disaster-drill-in-the-state/',
    logo: logoCbs, alt: 'CBS News',
    headline: 'FIU stages the largest disaster drill in the state.',
    metaLeft: 'FIU',
  },
  {
    href: 'https://www.huffpost.com/entry/why-it-is-important-to-he_b_7052246',
    logo: logoHuffpost, alt: 'HuffPost',
    headline: "Why it is important to help children in need — part of the J&J / HuffPost partnership that doubled SOS Children's Villages' web traffic.",
    metaLeft: 'SOS · NGO',
  },
];

const VIDEOS = [
  {
    href: 'https://www.youtube.com/watch?v=m0uM1KTXAeg',
    date: 'SOS Villages',
    titleParts: ['Feature on a young boy supported by ', { em: "SOS Children's Villages." }],
    publication: 'YouTube',
    category: 'Feature',
  },
  {
    href: 'https://www.youtube.com/watch?v=2CLX2927mpQ',
    date: 'FIU',
    titleParts: ["Inside FIU's ", { em: 'disaster preparedness' }, ' program.'],
    publication: 'YouTube',
    category: 'Feature',
  },
  {
    href: 'https://www.youtube.com/watch?v=FcaM2s0_5AY',
    date: 'FIU',
    titleParts: ['A researcher helping doctors treat ', { em: 'hard-to-treat cancers.' }],
    publication: 'YouTube',
    category: 'Feature',
  },
];

const ANNUAL_REPORTS = [
  {
    href: 'https://issuu.com/fiupublications/docs/4965759993_stmpl_2024annualreport-issuu',
    date: 'FIU Stempel College · 2024',
    title: '2024 Impact Report',
    body: 'The annual publication I led end-to-end: writing, editing, designer management, photo direction, and cross-department coordination.',
  },
  {
    href: 'https://issuu.com/fiupublications/docs/stmpl_2023_public_health_impact_report_4965759993',
    date: 'FIU Stempel College · 2023',
    title: '2023 Public Health Impact Report',
    body: "Showcasing public health research, programs, and community stories — a year's worth of work distilled for donors and peers.",
  },
];

function renderParts(parts) {
  return parts.map((p, i) =>
    typeof p === 'string'
      ? <span key={i}>{p}</span>
      : <em key={i}>{p.em}</em>
  );
}

export default function App() {
  const topbarRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const topbar = topbarRef.current;
    const onScroll = () => {
      if (!topbar) return;
      if (window.scrollY > 40) topbar.classList.add('scrolled');
      else topbar.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const spans = document.querySelectorAll('.hero-headline .row > span');
    spans.forEach((el, i) => {
      el.style.transform = 'translateY(110%)';
      el.style.display = 'inline-block';
      el.style.transition = `transform 1.2s cubic-bezier(.2,.8,.2,1) ${0.15 + i * 0.1}s`;
    });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        spans.forEach((el) => { el.style.transform = 'translateY(0)'; });
      });
    });
  }, []);

  return (
    <>
      <header className="topbar" id="topbar" ref={topbarRef}>
        <a href="#top" className="brand" onClick={() => setMenuOpen(false)}><span className="dot"></span> Stephanie Rendon</a>
        <nav className="nav">
          <a href="#about">About</a>
          <a href="#work">Selected Work</a>
          <a href="#services">Services</a>
          <a href="#writing">Videos</a>
          <a href="#press">Press</a>
          <a href="/es/">ES</a>
          <a href="#contact" className="cta">Work with me</a>
        </nav>
        <button
          type="button"
          className={`nav-toggle${menuOpen ? ' open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span></span><span></span>
        </button>
      </header>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <nav className="mobile-menu-nav" onClick={() => setMenuOpen(false)}>
          <a href="#about">About</a>
          <a href="#work">Selected Work</a>
          <a href="#services">Services</a>
          <a href="#writing">Videos</a>
          <a href="#press">Press</a>
          <a href="#contact">Work with me</a>
        </nav>
        <div className="mobile-menu-foot">New York · Remote · EN · ES</div>
      </div>

      <section className="hero" id="top">
        <div className="hero-grain"></div>
        <div className="hero-inner">
          <div className="hero-meta">
            <span>Practice 2012 — 2026</span>
            <span>Based in New York City</span>
            <span>EN · ES</span>
          </div>

          <h1 className="hero-headline">
            {HERO_LINES.map((parts, i) => (
              <span key={i} className="row"><span>{renderParts(parts)}</span></span>
            ))}
          </h1>

          <div className="hero-bottom">
            <p>Fourteen years shaping narratives for nonprofits, NGOs, and education organizations — turning complex, human stories into coverage that moves people to act.</p>
            <div className="hero-status">
              <div className="available"><span className="pulse"></span> Available for freelance consulting</div>
              <div style={{ marginTop: '10px' }}>New York · Remote · Bilingual EN/ES</div>
            </div>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...MARQUEE_OUTLETS, ...MARQUEE_OUTLETS].map((o, i) => (
            <span key={i}>
              <img
                src={o.logo}
                alt={o.alt}
                style={{ transform: `scale(${o.scale ?? 1})`, transformOrigin: 'center' }}
              />
            </span>
          ))}
        </div>
      </div>

      <section className="about" id="about">
        <div className="section-inner">
          <div className="section-head reveal">
            <div className="num">01 — About</div>
            <h2>A communicator for the organizations <em>building the world we need.</em></h2>
          </div>

          <div className="about-grid">
            <div className="about-portrait reveal">
              <img src={stephaniePortrait} alt="Stephanie Rendon" />
              <div className="portrait-caption">
                <span>Stephanie Rendon</span>
                <span>NYC · 2026</span>
              </div>
            </div>

            <div className="about-body reveal">
              <p className="lead">I'm Stephanie Rendon — a bilingual communications leader with <em>14+ years</em> shaping narratives for mission-driven organizations.</p>
              <p>I'm currently Head of Marketing & Communications at School in the Square, a PreK–12 public charter network in Washington Heights and Inwood serving 800+ students through a dual-language English/Spanish model.</p>
              <p>Before that, I led brand strategy, media relations, and editorial at FIU's Robert Stempel College of Public Health & Social Work, and shaped national communications for the American Red Cross and SOS Children's Villages.</p>
              <p>I specialize in brand strategy, community engagement, crisis communications, and turning complex stories into coverage that moves people to act.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="work" id="work">
        <div className="section-inner">
          <div className="section-head reveal">
            <div className="num">02 — Selected Work</div>
            <h2>Campaigns, crises, and <em>coverage</em> — across sectors that matter.</h2>
          </div>

          <div className="work-list">
            {WORK_ITEMS.map((w) => (
              <a
                key={w.num}
                href={w.href}
                {...(w.internal ? {} : { target: '_blank', rel: 'noopener' })}
                className="work-item"
              >
                <div className="work-num">{w.num}</div>
                <div className="work-title">{renderParts(w.titleParts)}</div>
                <div className="work-sector">{w.sector}</div>
                <div className="work-tags">{w.tags.map((t) => <span key={t}>{t}</span>)}</div>
                <div className="work-year">{w.year}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="feature" id="feature">
        <div className="feature-inner">
          <div className="feature-image reveal" style={{ padding: 0, background: '#000' }}>
            <img
              src={disasterImg}
              alt="FIU disaster response field course"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <span style={{ position: 'relative', zIndex: 1, color: 'oklch(0.965 0.012 85 / 0.9)', textShadow: '0 1px 12px rgba(0,0,0,.6)' }}>Featured · Press Release</span>
            <span style={{ position: 'relative', zIndex: 1, color: 'oklch(0.965 0.012 85 / 0.9)', textShadow: '0 1px 12px rgba(0,0,0,.6)' }}>FIU · 2024</span>
          </div>

          <div className="feature-content reveal">
            <div className="eyebrow">Featured Case Study</div>
            <h3>How a grad program got <em>national</em> press for being hands-on.</h3>
            <div className="feature-pull">A dense, academic field course — a multi-agency disaster drill run across a Florida campus — turned into the kind of press release that reporters actually picked up. It ran in FIU News and was syndicated through regional outlets, including CBS News Miami.</div>

            <div className="feature-metrics">
              <div className="m"><div className="v">CBS</div><div className="l">News Miami<br />coverage</div></div>
              <div className="m"><div className="v">1<em>st</em></div><div className="l">State's largest<br />disaster drill</div></div>
              <div className="m"><div className="v">Multi-<em>agency</em></div><div className="l">Field<br />coordination</div></div>
            </div>

            <a href="/work/fiu-disaster-drill/" className="link-arrow">Read the case study →</a>
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <div className="section-inner">
          <div className="section-head reveal">
            <div className="num">03 — Services</div>
            <h2>What I bring to <em>mission-driven teams.</em></h2>
          </div>

          <div className="services-grid reveal">
            {SERVICES.map((s) => (
              <a key={s.num} href={s.href} className="service">
                <div className="s-num">{s.num}</div>
                <h4>{s.title}</h4>
                <p>{s.body}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="press" id="press">
        <div className="section-inner">
          <div className="section-head reveal">
            <div className="num">04 — In the Press</div>
            <h2>Where the stories <em>landed.</em></h2>
          </div>

          <div className="press-grid reveal">
            {PRESS_ITEMS.map((p, i) => (
              <a key={i} href={p.href} target="_blank" rel="noopener" className="press-item">
                <div className="press-logo" aria-label={p.alt}>
                  <img src={p.logo} alt={p.alt} />
                </div>
                <div className="press-headline">{p.headline}</div>
                <div className="press-meta"><span>{p.metaLeft}</span><span>View ↗</span></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="writing" id="writing">
        <div className="section-inner">
          <div className="section-head reveal">
            <div className="num">05 — Video Production</div>
            <h2>Produced <em>end-to-end</em> — from interview to edit.</h2>
          </div>

          <div className="writing-list reveal">
            {VIDEOS.map((v, i) => (
              <a key={i} href={v.href} target="_blank" rel="noopener" className="writing-row">
                <div className="writing-date">{v.date}</div>
                <div className="writing-title">{renderParts(v.titleParts)}</div>
                <div className="writing-publication">{v.publication}</div>
                <div className="writing-category">{v.category}</div>
                <div className="writing-length">Watch ↗</div>
              </a>
            ))}
          </div>
          <p style={{ marginTop: '28px', fontFamily: 'var(--serif)', fontSize: '15px', color: 'oklch(0.965 0.012 85 / 0.65)', maxWidth: '64ch' }}>
            As producer: identified interviewees, secured locations, prepped participants, directed on-site logistics, and guided post‑production to keep every cut on-message.
          </p>
        </div>
      </section>

      <section className="speaking" id="speaking">
        <div className="section-inner">
          <div className="section-head reveal">
            <div className="num">06 — Annual Reports</div>
            <h2>Edited, written, and <em>produced.</em></h2>
          </div>

          <div className="speaking-grid speaking-grid-2 reveal">
            {ANNUAL_REPORTS.map((a) => (
              <a key={a.title} href={a.href} target="_blank" rel="noopener" className="speaking-card">
                <div className="speaking-date">{a.date}</div>
                <h4>{a.title}</h4>
                <p>{a.body}</p>
                <div className="speaking-venue">View on Issuu ↗</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-inner">
          <div className="eyebrow" style={{ color: 'var(--moss)', marginBottom: '32px' }}>07 — Contact</div>
          <h2>Let's tell a story <br />worth <em>telling well.</em></h2>

          <div className="contact-grid">
            <div className="contact-col">
              <h5>Freelance & consulting</h5>
              <a href="mailto:hello@stephanierendon.com" className="big">hello@stephanierendon.com</a>
              <div className="contact-links">
                <a href="https://www.linkedin.com/in/rendonstephanie/">LinkedIn</a>
                <a href="#">Download CV</a>
                <a href="#">Download media kit</a>
              </div>
            </div>

            <div className="contact-col"></div>
          </div>
        </div>
      </section>

      <footer>
        <div className="foot-inner">
          <div>© 2026 Stephanie Rendon</div>
          <div>New York City · EN · ES</div>
          <div>Site, 2026 Edition</div>
        </div>
      </footer>
    </>
  );
}
