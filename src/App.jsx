import './index.css';
import headshot from './assets/Stephanie_Headshot.jpeg';
import disasterImg from './assets/disaster-management.jpeg';
import socialworkProfImg from './assets/socialwork_prof.jpeg';
import illustrationImg from './assets/Illustration_Example.webp';
import expertTappedImg from './assets/expert_tapped.jpg';
import majorAgenciesImg from './assets/major_agencies.webp';
import aspiringMedicalImg from './assets/aspiring_medical.webp';
import celebratingHeroesImg from './assets/celebrating_heroes.jpg';
import nbcLogo from './assets/NBC_Peacock_1986.svg.webp';
import todayLogo from './assets/Today_logo.svg.webp';
import nytLogo from './assets/New_York_Times_logo_variation.jpg';
import cbsLogo from './assets/CBS_News.svg.webp';
import stephArcInfield from './assets/steph_arc_infield.JPG';
import stephOnCopter from './assets/steph_oncopter.jpg';
import { useState, useEffect } from 'react';

/* ─── Nav Link ─── */
function NavLink({ href, children, onClick, isActive }) {
  return (
    <div className="flex flex-col items-center">
      <a
        href={href}
        onClick={onClick}
        className={`text-sm sm:text-base lg:text-lg font-extrabold uppercase text-amber-900 tracking-wide transition-all px-3 sm:px-5 lg:px-8 py-2 sm:py-3 rounded-md relative flex items-center justify-center hover:text-rose-700 hover:scale-105 focus:scale-105 focus:text-rose-700 duration-200${isActive ? ' text-rose-700 scale-105' : ''}`}
        style={{ minHeight: '44px', cursor: 'pointer' }}
      >
        {children}
      </a>
      {isActive && <div className="w-8 sm:w-12 h-1 bg-rose-300 mt-1 rounded-full"></div>}
    </div>
  );
}

/* ─── Mobile Menu Button ─── */
function MobileMenuButton({ isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      className="sm:hidden flex flex-col justify-center items-center w-10 h-10 rounded-md hover:bg-amber-200/50 transition-colors"
      aria-label="Toggle menu"
      style={{ background: 'transparent', border: 'none' }}
    >
      <span className={`block w-5 h-0.5 bg-amber-900 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
      <span className={`block w-5 h-0.5 bg-amber-900 my-1 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
      <span className={`block w-5 h-0.5 bg-amber-900 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
    </button>
  );
}

/* ─── YouTube Facade (lazy-load iframe on click) ─── */
function YouTubeFacade({ videoId, title }) {
  const [loaded, setLoaded] = useState(false);
  const thumbUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  if (loaded) {
    return (
      <iframe
        width="100%" height="220"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="rounded-xl mb-4"
      />
    );
  }

  return (
    <button
      onClick={() => setLoaded(true)}
      className="relative w-full rounded-xl mb-4 overflow-hidden cursor-pointer group"
      style={{ height: '220px', border: 'none', padding: 0, background: '#000' }}
      aria-label={`Play video: ${title}`}
    >
      <img
        src={thumbUrl}
        alt={title}
        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
        loading="lazy"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all drop-shadow-lg" viewBox="0 0 68 48" fill="none">
          <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="red"/>
          <path d="M45 24L27 14v20" fill="white"/>
        </svg>
      </div>
    </button>
  );
}

/* ─── About Page ─── */
function AboutPage() {
  return (
    <div className="page-enter w-full max-w-6xl mx-auto px-6 sm:px-10 py-12 sm:py-16">
      {/* Bio section */}
      <div className="flex flex-col md:flex-row w-full items-center justify-center gap-8 md:gap-12 mb-16 sm:mb-20">
        <img
          src={headshot}
          alt="Stephanie Rendon headshot"
          className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 object-cover rounded-full border-8 border-rose-200 shadow-xl flex-shrink-0"
          style={{ background: '#fff8f1' }}
        />
        <div className="flex-1 flex flex-col gap-4">
          <p className="text-lg sm:text-xl md:text-2xl text-rose-900 text-center md:text-left max-w-2xl leading-relaxed" style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 300 }}>
            I'm a bilingual communications leader with 14+ years of experience shaping narratives for mission-driven organizations. Currently, I serve as Head of Marketing & Communications at School in the Square, a PreK–12 public charter school network in Washington Heights and Inwood serving 800+ students through a dual-language English/Spanish model. Before that, I led brand strategy, media relations, and editorial at FIU's Robert Stempel College of Public Health & Social Work, and shaped national communications for the American Red Cross and SOS Children's Villages.
          </p>
          <p className="text-base sm:text-lg text-rose-900/80 text-center md:text-left max-w-2xl leading-relaxed" style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 300 }}>
            My work has been featured in The New York Times, NBC News, CBS News, The Today Show, CNN, The Washington Post, The Associated Press, and Bloomberg. I specialize in brand strategy, community engagement, crisis communications, and turning complex stories into coverage that moves people to act.
          </p>
        </div>
      </div>

      {/* Featured In logo bar */}
      <div className="w-full mb-16 sm:mb-20">
        <p className="text-xs font-bold text-amber-800/60 uppercase tracking-widest text-center mb-6" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>Featured In</p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 opacity-60">
          <img src={nytLogo} alt="The New York Times" className="h-5 sm:h-6 w-auto object-contain grayscale" />
          <img src={nbcLogo} alt="NBC News" className="h-8 sm:h-10 w-auto object-contain grayscale" />
          <img src={todayLogo} alt="Today Show" className="h-6 sm:h-8 w-auto object-contain grayscale" />
          <img src={cbsLogo} alt="CBS News" className="h-6 sm:h-8 w-auto object-contain grayscale" />
        </div>
      </div>

      {/* Career highlights */}
      <div className="w-full max-w-3xl mx-auto">
        <p className="text-xs font-bold text-amber-800/60 uppercase tracking-widest text-center mb-8" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>Career Highlights</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
          {[
            'Leads marketing, communications, and community engagement for School in the Square, a PreK–12 charter network in Washington Heights and Inwood',
            'Ran media strategy at the American Red Cross and supported national crisis and disaster response communications across the organization',
            'Directed communications for SOS Children\'s Villages, landing coverage in NBC, CNN, Reuters, and The Associated Press',
            'Managed FIU Stempel College\'s marketing across brand, editorial, media, social, and advertising',
            'Coordinated a digital campaign with Huffington Post and Johnson & Johnson that doubled website traffic',
            'Placed panelists at the Clinton Global Initiative and United Nations Foundation events',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-rose-300 flex-shrink-0"></span>
              <p className="text-sm sm:text-base text-rose-900/80 leading-relaxed" style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 300 }}>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Portfolio Sub-Nav ─── */
function PortfolioSubNav({ active, onSelect }) {
  const items = [
    { key: 'press', label: 'Press Releases' },
    { key: 'videos', label: 'Videos' },
    { key: 'reports', label: 'Annual Reports' },
    { key: 'media', label: 'Earned Media' }
  ];
  return (
    <div className="w-full flex flex-wrap justify-center md:justify-end gap-2 sm:gap-4 lg:gap-8 mt-6 sm:mt-10 mb-8 sm:mb-12 px-4 sm:px-10">
      {items.map(item => (
        <div key={item.key} className="flex flex-col items-center">
          <button
            onClick={() => onSelect(item.key)}
            className={`text-xs sm:text-sm lg:text-base font-extrabold uppercase tracking-wide px-3 sm:px-5 lg:px-8 py-2 sm:py-3 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-300 ${active === item.key ? 'text-rose-700 scale-105' : 'text-amber-900 hover:text-rose-700 hover:scale-105'}`}
            style={{ minHeight: '40px', cursor: 'pointer', background: 'transparent', boxShadow: 'none', border: 'none' }}
          >
            {item.label}
          </button>
          {active === item.key && <div className="w-8 h-1 bg-rose-300 mt-1 rounded-full"></div>}
        </div>
      ))}
    </div>
  );
}

/* ─── Portfolio Card ─── */
function PortfolioCard({ image, source, title, description, linkUrl, linkText = 'READ' }) {
  return (
    <div className="portfolio-card flex flex-col items-start bg-white/40 rounded-xl p-4 backdrop-blur-sm">
      <div className="img-hover-zoom w-full mb-4">
        <img src={image} alt={title} className="w-full h-48 object-cover rounded-xl" loading="lazy" />
      </div>
      <span className="text-xs font-bold text-amber-800 mb-1.5 uppercase tracking-wider" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>{source}</span>
      <h3 className="text-base sm:text-lg font-bold text-amber-900 mb-2 leading-snug" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>{title}</h3>
      <p className="text-sm sm:text-base text-rose-900/80 mb-4 flex-1" style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 300 }}>{description}</p>
      <a
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 font-bold text-rose-800 transition-all duration-200 hover:text-rose-600 hover:gap-2 focus:outline-none focus:text-rose-600"
        style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '0.875rem' }}
      >
        {linkText} <span className="text-lg">&#8250;</span>
      </a>
    </div>
  );
}

/* ─── Media Card (for Earned Media with logos) ─── */
function MediaCard({ logo, logoAlt, source, title, description, linkUrl }) {
  return (
    <div className="portfolio-card flex flex-col items-start bg-white/40 rounded-xl p-4 backdrop-blur-sm">
      <img src={logo} alt={logoAlt} className="h-8 sm:h-10 w-auto mb-3 object-contain" loading="lazy" />
      <span className="text-xs font-bold text-amber-800 mb-1.5 uppercase tracking-wider" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>{source}</span>
      <h3 className="text-base sm:text-lg font-bold text-amber-900 mb-2 leading-snug" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>{title}</h3>
      <p className="text-sm sm:text-base text-rose-900/80 mb-4 flex-1" style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 300 }}>{description}</p>
      <a
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 font-bold text-rose-800 transition-all duration-200 hover:text-rose-600 hover:gap-2 focus:outline-none focus:text-rose-600"
        style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '0.875rem' }}
      >
        VIEW COVERAGE <span className="text-lg">&#8250;</span>
      </a>
    </div>
  );
}

/* ─── Section Header (left side of portfolio sections) ─── */
function SectionHeader({ title, subtitle, description }) {
  return (
    <div className="flex flex-col items-start justify-start w-full md:min-w-[220px] md:max-w-[280px] lg:max-w-[320px] pt-2 md:pt-4 mb-6 md:mb-0">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-900 mb-2 uppercase">{title}</h2>
      {subtitle && <span className="text-lg sm:text-xl text-rose-900 mb-2">{subtitle}</span>}
      {description && (
        <p className="text-sm sm:text-base text-rose-900/80 mb-4 text-left leading-relaxed" style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 300 }}>
          {description}
        </p>
      )}
    </div>
  );
}

/* ─── Portfolio Page ─── */
function PortfolioPage({ activeCategory, onSelectCategory }) {
  const portfolioContent = {
    press: (
      <div className="page-enter w-full flex flex-col md:flex-row items-start max-w-6xl mx-auto mt-4 sm:mt-8 gap-6 md:gap-12 px-4 sm:px-10">
        <SectionHeader title="Press Releases & Stories" subtitle="Select work" />
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <PortfolioCard
            image={disasterImg}
            source="FIU NEWS"
            title="FIU students get hands-on experience in large-scale disaster response"
            description="Press release highlighting unique, hands-on graduate degree program."
            linkUrl="https://news.fiu.edu/2024/fiu-students-get-hands-on-experience-in-large-scale-disaster-response#:~:text=The%20field%20course%20is%20part,management%20and%20humanitarian%20assistance%2Fcoordination"
          />
          <PortfolioCard
            image={socialworkProfImg}
            source="FIU NEWS"
            title="Professor named social work educator of the year"
            description="Feature story on social work professor who was recognized for her contributions to the field."
            linkUrl="https://news.fiu.edu/2025/social-work-professor-named-educator-of-the-year"
          />
          <PortfolioCard
            image={expertTappedImg}
            source="FIU NEWS"
            title="FIU experts tapped for study of possible links between childhood lead exposure and psychiatric diseases"
            description="Multimillion-dollar investigation aims to explore the effects of the toxic metal on neurons, brain circuitry and behavior."
            linkUrl="https://news.fiu.edu/2024/researching-psychiatric-disease-risks-linked-to-childhood-lead-exposure"
          />
          <PortfolioCard
            image={majorAgenciesImg}
            source="PR NEWSWIRE"
            title="Major Agencies and Networks Support a New PSA that Emphasizes SOS Children's Villages' Dedication to Supporting Vulnerable Children Worldwide"
            description="Press release about SOS Children's Villages' new PSA campaign and its impact for vulnerable children."
            linkUrl="https://www.prnewswire.com/news-releases/major-agencies-and-networks-support-a-new-psa-that-emphasizes-sos-childrens-villages-dedication-to-supporting-vulnerable-children-worldwide-300347663.html"
          />
          <PortfolioCard
            image={aspiringMedicalImg}
            source="FIU NEWS"
            title="FIU doctoral student dreams of improving people's health, one TV segment at a time"
            description="Feature story on an FIU doctoral student's inspiring journey to become a medical correspondent."
            linkUrl="https://news.fiu.edu/2023/fiu-doctoral-student-dreams-of-improving-peoples-health-one-tv-segment-at-a-time"
          />
          <PortfolioCard
            image={celebratingHeroesImg}
            source="RED CROSS CHAT"
            title="Celebrating heroes: Meet 6 inspiring earthquake survivors"
            description="Feature story on earthquake survivors in Mexico that received help from the American Red Cross."
            linkUrl="https://redcrosschat.org/2018/03/02/celebrating-heroes-meet-6-inspiring-earthquake-survivors/"
          />
        </div>
      </div>
    ),
    videos: (
      <div className="page-enter w-full flex flex-col md:flex-row items-start max-w-6xl mx-auto mt-4 sm:mt-8 gap-6 md:gap-12 px-4 sm:px-10">
        <SectionHeader
          title="Videos"
          subtitle="Select work"
          description="As the producer for these projects, I managed the production from start to finish. I identified compelling interviewees, secured shoot locations, prepped all participants, and directed on-site logistics. Following the shoot, I guided the post-production process to ensure the final story aligned perfectly with our messaging goals."
        />
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="portfolio-card flex flex-col items-start bg-white/40 rounded-xl p-4 backdrop-blur-sm">
            <YouTubeFacade videoId="m0uM1KTXAeg" title="SOS Children's Villages feature" />
            <span className="text-sm sm:text-base text-rose-900 font-bold">Feature video on young boy supported by SOS Children's Villages</span>
          </div>
          <div className="portfolio-card flex flex-col items-start bg-white/40 rounded-xl p-4 backdrop-blur-sm">
            <YouTubeFacade videoId="2CLX2927mpQ" title="FIU disaster preparedness" />
            <span className="text-sm sm:text-base text-rose-900 font-bold">Feature video on disaster preparedness program at FIU</span>
          </div>
          <div className="portfolio-card flex flex-col items-start bg-white/40 rounded-xl p-4 backdrop-blur-sm">
            <YouTubeFacade videoId="FcaM2s0_5AY" title="FIU researcher feature" />
            <span className="text-sm sm:text-base text-rose-900 font-bold">Feature video on researcher helping doctors treat hard-to-treat cancers</span>
          </div>
        </div>
      </div>
    ),
    reports: (
      <div className="page-enter w-full flex flex-col md:flex-row items-start max-w-6xl mx-auto mt-4 sm:mt-8 gap-6 md:gap-12 px-4 sm:px-10">
        <SectionHeader
          title="Annual Reports"
          subtitle="Select work"
          description="As editor at FIU Stempel College, I used the annual Impact Report to highlight the work of our researchers, students, and alumni. I oversaw all aspects of production—from writing and editing to managing designers, leading photoshoots, and coordinating with stakeholders across departments."
        />
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <PortfolioCard
            image="https://image.isu.pub/241205140157-7c9412ec698449efdf2ac636674d7584/jpg/page_1_thumb_large.jpg"
            source="FIU STEMPEL COLLEGE"
            title="2024 Impact Report"
            description="Annual report highlighting the achievements, research, and community impact of FIU Stempel College in 2024."
            linkUrl="https://issuu.com/fiupublications/docs/4965759993_stmpl_2024annualreport-issuu?fr=sYWYwYTYzMjg1Mjk"
            linkText="VIEW REPORT"
          />
          <PortfolioCard
            image="https://image.isu.pub/231116150455-7d23796d72a7b980ec738b1fd98cdbf8/jpg/page_1_thumb_large.jpg"
            source="FIU STEMPEL COLLEGE"
            title="2023 Public Health Impact Report"
            description="Annual report showcasing the public health initiatives, research, and stories from FIU Stempel College in 2023."
            linkUrl="https://issuu.com/fiupublications/docs/stmpl_2023_public_health_impact_report_4965759993?fr=sZjdlMzYzMjg1Mjk"
            linkText="VIEW REPORT"
          />
        </div>
      </div>
    ),
    media: (
      <div className="page-enter w-full flex flex-col md:flex-row items-start max-w-6xl mx-auto mt-4 sm:mt-8 gap-6 md:gap-12 px-4 sm:px-10">
        <SectionHeader
          title="Earned Media"
          subtitle="Select work"
          description="I've worked closely with media outlets to secure coverage that highlights key programs and initiatives, helping to raise visibility, attract support, and position our work as impactful and newsworthy."
        />
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <MediaCard
            logo={nbcLogo} logoAlt="NBC News Logo" source="NBC NEWS"
            title="Shot During Cookies and Milk: A Syrian Boy's Story"
            description="Feature on a Syrian boy's journey and recovery after being injured in the conflict, with support from SOS Children's Villages."
            linkUrl="https://www.nbcnews.com/storyline/syrias-suffering-families/shot-during-cookies-milk-syrian-boys-story-n266356"
          />
          <MediaCard
            logo={nbcLogo} logoAlt="NBC News Logo" source="NBC NEWS"
            title="Child War Survivor to Syria's Children: Don't Give Up"
            description="Story of a Liberian war survivor sharing hope with Syrian children, highlighting the impact of SOS Children's Villages."
            linkUrl="https://www.nbcnews.com/storyline/syrias-children/child-war-survivor-syrias-children-dont-give-n51161"
          />
          <MediaCard
            logo={todayLogo} logoAlt="TODAY Logo" source="TODAY"
            title="Red Cross urges people to donate blood amid coronavirus concerns"
            description="Coverage of the Red Cross's call for blood donations during the COVID-19 pandemic, featuring expert commentary."
            linkUrl="https://www.today.com/health/red-cross-urges-people-donate-blood-amid-coronavirus-concerns-t175665"
          />
          <MediaCard
            logo={nytLogo} logoAlt="New York Times Logo" source="NEW YORK TIMES"
            title="Hurricane Season 2020: NOAA Predicts Busy Atlantic Season"
            description="Article on NOAA's forecast for an active hurricane season, with insights from FIU experts on disaster preparedness."
            linkUrl="https://www.nytimes.com/2020/05/21/climate/hurricane-season-2020-noaa.html"
          />
          <MediaCard
            logo={cbsLogo} logoAlt="CBS News Logo" source="CBS NEWS MIAMI"
            title="FIU stages largest disaster drill in the state"
            description="News coverage of FIU's large-scale disaster drill, highlighting the university's leadership in emergency preparedness."
            linkUrl="https://www.cbsnews.com/miami/news/florida-international-university-stages-largest-disaster-drill-in-the-state/"
          />
        </div>
      </div>
    )
  };

  return (
    <div className="w-full flex flex-col items-center min-h-[70vh]">
      <PortfolioSubNav active={activeCategory} onSelect={onSelectCategory} />
      {activeCategory && (
        <div className="w-full flex flex-col items-center">
          {portfolioContent[activeCategory]}
        </div>
      )}
    </div>
  );
}

/* ─── Home Page ─── */
function HomePage() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full flex-1 flex flex-col items-center justify-center overflow-hidden px-6 sm:px-10 py-12 sm:py-0">
      {/* Subtle gradient overlay at bottom */}
      <div className="absolute left-0 right-0 bottom-0 h-1/3 z-0 bg-gradient-to-t from-rose-100/60 to-transparent pointer-events-none" />

      {/* Tagline */}
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-amber-900/70 mb-8 sm:mb-12 text-center tracking-wide transition-all duration-1000 z-10 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 100 }}
      >
        Storyteller. Communicator. Advocate.
      </h2>

      {/* Hero images */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12">
        <img
          src={stephArcInfield}
          alt="Stephanie Rendon in field"
          className={`w-full sm:w-64 md:w-80 lg:w-[28rem] xl:w-[32rem] aspect-square max-w-full object-cover rounded-2xl shadow-2xl transition-all duration-1000 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        />
        <img
          src={stephOnCopter}
          alt="Stephanie Rendon on helicopter"
          className={`w-full sm:w-64 md:w-80 lg:w-[28rem] xl:w-[32rem] aspect-square max-w-full object-cover rounded-2xl shadow-2xl transition-all duration-1000 delay-200 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        />
      </div>
    </div>
  );
}

/* ─── Contact Page ─── */
function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(false);
    const form = e.target;
    const data = new FormData(form);
    try {
      const res = await fetch('https://formspree.io/f/mvzvveqn', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
    setSending(false);
  };

  return (
    <div className="page-enter flex flex-col items-center justify-center min-h-[60vh] sm:min-h-[70vh] w-full px-6 sm:px-10 py-12">
      <h2
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-amber-900 mb-4 sm:mb-6"
        style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}
      >
        Let's Connect
      </h2>
      <p className="text-base sm:text-lg text-rose-900/70 mb-8 sm:mb-10 text-center max-w-lg" style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 300 }}>
        Available for strategic communications consulting, media training, campaign development, and crisis communications.
      </p>

      {submitted ? (
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 sm:p-10 w-full max-w-lg text-center">
          <p className="text-xl sm:text-2xl text-amber-900 font-bold mb-2" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>Thank you!</p>
          <p className="text-base text-rose-900/70" style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 300 }}>Your message has been sent. I'll be in touch soon.</p>
        </div>
      ) : (
        <>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 w-full max-w-lg mb-4 text-center">
            <p className="text-red-800 text-sm" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>Something went wrong. Please try again or reach out on LinkedIn.</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 w-full max-w-lg flex flex-col gap-4">
          {/* Honeypot field - hidden from humans, catches bots */}
          <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs font-bold text-amber-800 uppercase tracking-wider" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>Name</label>
              <input
                type="text" id="name" name="name" required
                className="w-full px-4 py-3 rounded-lg bg-white/70 border border-rose-200 text-amber-900 placeholder-amber-900/30 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all"
                style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 300 }}
                placeholder="Your name"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-bold text-amber-800 uppercase tracking-wider" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>Email</label>
              <input
                type="email" id="email" name="email" required
                className="w-full px-4 py-3 rounded-lg bg-white/70 border border-rose-200 text-amber-900 placeholder-amber-900/30 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all"
                style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 300 }}
                placeholder="your@email.com"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="subject" className="text-xs font-bold text-amber-800 uppercase tracking-wider" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>Subject</label>
            <input
              type="text" id="subject" name="subject"
              className="w-full px-4 py-3 rounded-lg bg-white/70 border border-rose-200 text-amber-900 placeholder-amber-900/30 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all"
              style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 300 }}
              placeholder="What's this about?"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-xs font-bold text-amber-800 uppercase tracking-wider" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>Message</label>
            <textarea
              id="message" name="message" rows={4} required
              className="w-full px-4 py-3 rounded-lg bg-white/70 border border-rose-200 text-amber-900 placeholder-amber-900/30 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all resize-none"
              style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 300 }}
              placeholder="Tell me about your project or how I can help..."
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={sending}
            className="w-full py-3 rounded-full bg-amber-900 text-white font-bold hover:bg-amber-800 transition-colors shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '0.95rem', cursor: 'pointer', border: 'none' }}
          >
            {sending ? 'Sending...' : 'Send Message'}
          </button>
        </form>
        </>
      )}

      <div className="mt-8">
        <a
          href="https://www.linkedin.com/in/rendonstephanie/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-amber-900/70 hover:text-rose-700 transition-colors"
          style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 300, fontSize: '0.95rem' }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          Or connect on LinkedIn
        </a>
      </div>
    </div>
  );
}

/* ─── App ─── */
function App() {
  const [page, setPage] = useState('home');
  const [portfolioCategory, setPortfolioCategory] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dynamic page titles for SEO and UX
  useEffect(() => {
    const titles = {
      home: 'Stephanie Rendon | Strategic Communications & Media Relations',
      about: 'About | Stephanie Rendon',
      portfolio: 'Portfolio | Stephanie Rendon',
      contact: 'Contact | Stephanie Rendon'
    };
    document.title = titles[page] || titles.home;
  }, [page]);

  const navigate = (newPage, category = null) => {
    setPage(newPage);
    setPortfolioCategory(category);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 flex flex-col">
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:text-amber-900 focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg focus:font-bold">
        Skip to content
      </a>
      {/* Navigation Bar */}
      <header className="w-full sticky top-0 z-50 bg-gradient-to-br from-amber-100/95 via-orange-50/95 to-rose-100/95 backdrop-blur-sm">
        <nav className="w-full flex items-center justify-between px-4 sm:px-10 py-4 sm:py-6">
          <span
            className="text-lg sm:text-xl lg:text-2xl font-extrabold tracking-wide text-amber-900 uppercase cursor-pointer hover:text-rose-700 transition-colors"
            style={{ letterSpacing: '0.05em' }}
            onClick={() => navigate('home')}
          >
            STEPHANIE RENDON
          </span>

          {/* Desktop nav */}
          <div className="hidden sm:flex gap-4 lg:gap-10">
            <NavLink href="#about" onClick={e => { e.preventDefault(); navigate('about'); }} isActive={page === 'about'}>About</NavLink>
            <NavLink href="#portfolio" onClick={e => { e.preventDefault(); navigate('portfolio', 'press'); }} isActive={page === 'portfolio'}>Portfolio</NavLink>
            <NavLink href="#contact" onClick={e => { e.preventDefault(); navigate('contact'); }} isActive={page === 'contact'}>Contact</NavLink>
          </div>

          {/* Mobile hamburger */}
          <MobileMenuButton isOpen={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
        </nav>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden flex flex-col items-center gap-2 pb-4 border-b border-rose-200">
            <NavLink href="#about" onClick={e => { e.preventDefault(); navigate('about'); }} isActive={page === 'about'}>About</NavLink>
            <NavLink href="#portfolio" onClick={e => { e.preventDefault(); navigate('portfolio', 'press'); }} isActive={page === 'portfolio'}>Portfolio</NavLink>
            <NavLink href="#contact" onClick={e => { e.preventDefault(); navigate('contact'); }} isActive={page === 'contact'}>Contact</NavLink>
          </div>
        )}

        <div className="w-full flex justify-center px-4 sm:px-0">
          <div className="border-t-2 border-t-rose-200/60 w-full max-w-6xl"></div>
        </div>
      </header>

      {/* Page content */}
      <main id="main-content" className="flex-1 flex flex-col">
        {page === 'home' && <HomePage />}
        {page === 'about' && <AboutPage />}
        {page === 'portfolio' && (
          <div className="pb-16 sm:pb-24 w-full">
            <PortfolioPage activeCategory={portfolioCategory} onSelectCategory={setPortfolioCategory} />
          </div>
        )}
        {page === 'contact' && <ContactPage />}
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-6 text-sm text-amber-900/40" style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 300 }}>
        &copy; {new Date().getFullYear()} Stephanie Rendon
      </footer>
    </div>
  );
}

export default App;
