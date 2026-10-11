import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import './index.css';
import portrait from './assets/stephanie.webp';
import field from './assets/steph_arc_infield.JPG';
import drill from './assets/disaster-management.webp';
import nbc from './assets/logo-nbc.svg';
import today from './assets/logo-today.svg';
import nyt from './assets/logo-nyt.svg';
import cbs from './assets/logo-cbs.svg';

const StudioTuner = import.meta.env.DEV ? lazy(() => import('./StudioTuner.jsx')) : null;
const copy = {
  en: {
    role: 'Communications leadership · English & Spanish', nav: ['Work', 'About', 'Expertise', 'Contact'],
    title: <>Clear stories.<br />Lasting <span>trust.</span></>,
    intro: 'I’m Stephanie Rendon. I help organizations explain complex work, prepare leaders for the spotlight, and communicate when the stakes are high.',
    cta: 'Explore my work', cv: 'Download résumé', portrait: 'Stephanie Rendon, communications leader',
    location: 'New York City', caption: 'A clear voice. A human perspective.', fieldAlt:'A Red Cross field interview with a family', fieldCaption:'Field reporting with the American Red Cross.',
    experience: 'Experience across',
    workLabel: '01 / Selected work', workTitle: <>The story behind<br /><span>the story.</span></>, workIntro: 'National media, public health research and communications in moments that matter.', read: 'Read the case study',
    cases: [
      {slug:'blood-supply',org:'American Red Cross',tag:'National media · Public health',title:'Making an urgent need a national story.',desc:'Blood supply communications during COVID-19, with a direct public call to action.',poster:<>A message<br />people could<br /><span>act on.</span></>},
      {slug:'crisis-spokesperson',org:'American Red Cross',tag:'Crisis communications · Media training',title:'A prepared voice when the stakes are high.',artLabel:'Quoted spokesperson · 2020',artTitle:'Shelter planning during a pandemic.',desc:'Executive interview preparation, field spokesperson training and bilingual disaster response.'},
      {slug:'research-communications',org:'Florida International University',tag:'Research · Higher education',title:'Making research and training clear.',desc:'Public health research and disaster-response education, explained for wider audiences.',imageAlt:'FIU students beside Miami-Dade Fire Rescue vehicles during a disaster-response field course',imageCaption:'FIU disaster response field course · 2024'},
    ],
    proofLabel:'Selected coverage', proofNote:'Media relations work and spokesperson interviews. Each link identifies the organization and my role.',
    press:[['TODAY','Blood donation during COVID-19','Red Cross · Media pitch'],['The New York Times','Preparing shelters for a pandemic hurricane season','Red Cross · Quoted spokesperson'],['NBC News','A Syrian family’s story','SOS Children’s Villages · Media pitch'],['CBS News Miami','Learning disaster response in the field','FIU · Program coverage']],
    aboutLabel:'02 / About', aboutTitle:<>Big-picture thinking.<br /><span>Close attention to people.</span></>,
    about:['My work sits at the intersection of institutional reputation and human experience. I’ve supported national disaster response, helped researchers explain their work, and built communications functions for organizations with a public purpose.','Today, I build and run marketing and communications at School in the Square, a dual-language public charter network in Upper Manhattan. I lead brand and family communications, work with the enrollment team, and manage creative partners.','Previously, I led communications at FIU’s Stempel College of Public Health & Social Work and worked in national media relations at the American Red Cross and SOS Children’s Villages. I work in English and Spanish.'],
    stats:[['100+','National media placements','American Red Cross'],['100+','Field spokespeople trained and deployed','American Red Cross'],['EN / ES','Bilingual communications','English & Spanish']],
    expertiseLabel:'03 / Expertise', expertiseTitle:<>From the first question<br />to the <span>public conversation.</span></>,
    expertise:[['Media relations','Finding the public interest in a complex story, building a focused pitch, and preparing for the questions that follow.'],['Executive & crisis communications','Interview preparation, talking points, rapid response and a steady voice under pressure.'],['Research & editorial','Research stories, speeches, annual reports and thought leadership shaped for the people who need to understand them.'],['Bilingual strategy','English and Spanish communications shaped around families, communities and the contexts they live in.']],
    moreLabel:'04 / Writing & production', moreTitle:<>Work you can <span>read, watch and hold.</span></>,
    samples:[['Writing','Researching the risks linked to childhood lead exposure','FIU News · 2024'],['Writing','Hands-on experience in large-scale disaster response','FIU News · 2024'],['Editorial direction','Stempel College Impact Report','FIU · 2024'],['Video production','Inside FIU’s disaster preparedness program','FIU'],['Campaign','An integrated campaign for children and families','SOS Children’s Villages']],
    contactLabel:'Let’s connect', contactTitle:<>Good work deserves<br />a <span>clear voice.</span></>, contactBody:'For conversations about communications leadership, media relations or a project that needs a thoughtful approach.', book:'Download selected work', audit:'Explore the bilingual communications audit', footer:'Communications. With people at the center.',
  },
  es: {
    role:'Liderazgo en comunicación · Inglés y español', nav:['Trabajo','Perfil','Experiencia','Contacto'],
    title:<>Historias claras.<br /><span>Confianza duradera.</span></>,
    intro:'Soy Stephanie Rendon. Ayudo a las organizaciones a explicar trabajos complejos, preparar a sus líderes para hablar en público y comunicar cuando más importa.',
    cta:'Conoce mi trabajo',cv:'Currículum (inglés)',portrait:'Stephanie Rendon, líder en comunicación',location:'Nueva York',caption:'Una voz clara. Una perspectiva humana.',fieldAlt:'Entrevista de campo de la Cruz Roja con una familia',fieldCaption:'Trabajo periodístico de campo con la Cruz Roja Americana.',experience:'Trayectoria en',
    workLabel:'01 / Trabajo seleccionado',workTitle:<>La historia detrás<br /><span>de cada historia.</span></>,workIntro:'Medios nacionales, investigación en salud pública y comunicación en momentos decisivos.',read:'Leer el caso',
    cases:[
      {slug:'blood-supply',org:'American Red Cross',tag:'Medios nacionales · Salud pública',title:'Una necesidad urgente, una historia nacional.',desc:'Comunicación sobre el suministro de sangre durante COVID-19, con un llamado claro a la acción.',poster:<>Un mensaje<br />que invita<br /><span>a actuar.</span></>},
      {slug:'crisis-spokesperson',org:'American Red Cross',tag:'Comunicación de crisis · Vocería',title:'Una voz preparada en momentos críticos.',artLabel:'Portavoz citada · 2020',artTitle:'Planificar refugios durante una pandemia.',desc:'Preparación de ejecutivos, capacitación de portavoces y respuesta bilingüe ante desastres.'},
      {slug:'research-communications',org:'Florida International University',tag:'Investigación · Educación superior',title:'Explicar la investigación y la formación práctica.',desc:'Investigación en salud pública y formación ante desastres, explicadas para un público amplio.',imageAlt:'Estudiantes de FIU junto a vehículos de Miami-Dade Fire Rescue durante un curso práctico de respuesta a desastres',imageCaption:'Curso práctico de respuesta a desastres de FIU · 2024'}],
    proofLabel:'Cobertura seleccionada',proofNote:'Trabajo de relaciones con medios y entrevistas como portavoz. Cada enlace identifica la organización y mi función.',
    press:[['TODAY','Donación de sangre durante COVID-19','Cruz Roja · Propuesta a medios'],['The New York Times','Refugios durante una temporada de huracanes y pandemia','Cruz Roja · Portavoz citada'],['NBC News','La historia de una familia siria','SOS Children’s Villages · Propuesta a medios'],['CBS News Miami','Aprender a responder ante desastres','FIU · Cobertura del programa']],
    aboutLabel:'02 / Perfil',aboutTitle:<>Visión estratégica.<br /><span>Atención a las personas.</span></>,
    about:['Mi trabajo une la reputación institucional con la experiencia humana. He apoyado respuestas nacionales ante desastres, ayudado a investigadores a explicar su trabajo y creado funciones de comunicación para organizaciones con una misión pública.','Actualmente construyo y dirijo la función de marketing y comunicación en School in the Square, una red de escuelas públicas chárter de doble idioma en el norte de Manhattan. Lidero la marca y la comunicación con las familias, colaboro con el equipo de inscripciones y gestiono socios creativos.','Anteriormente dirigí comunicación en Stempel College of Public Health & Social Work de FIU y trabajé en relaciones con medios nacionales en American Red Cross y SOS Children’s Villages. Trabajo en inglés y español.'],
    stats:[['100+','Publicaciones en medios nacionales','American Red Cross'],['100+','Portavoces capacitados y desplegados','American Red Cross'],['EN / ES','Comunicación bilingüe','Inglés y español']],
    expertiseLabel:'03 / Experiencia',expertiseTitle:<>De la primera pregunta<br />a la <span>conversación pública.</span></>,
    expertise:[['Relaciones con medios','Encontrar el interés público de una historia compleja, desarrollar una propuesta y preparar las respuestas.'],['Comunicación ejecutiva y de crisis','Preparación para entrevistas, mensajes clave, respuesta rápida y una voz serena bajo presión.'],['Investigación y contenido editorial','Historias de investigación, discursos, informes anuales y artículos adaptados a cada audiencia.'],['Estrategia bilingüe','Comunicación en inglés y español que considera a las familias, las comunidades y sus contextos.']],
    moreLabel:'04 / Escritura y producción',moreTitle:<>Trabajo para <span>leer y ver.</span></>,
    samples:[['Escritura','Investigar los riesgos de la exposición al plomo en la infancia','FIU News · 2024'],['Escritura','Experiencia práctica en respuesta a desastres','FIU News · 2024'],['Dirección editorial','Informe de impacto de Stempel College','FIU · 2024'],['Producción de video','El programa de preparación ante desastres de FIU','FIU'],['Campaña','Una campaña integrada para niños y familias','SOS Children’s Villages']],
    contactLabel:'Conversemos',contactTitle:<>El buen trabajo merece<br />una <span>voz clara.</span></>,contactBody:'Para conversar sobre liderazgo en comunicación, relaciones con medios o proyectos que necesitan una perspectiva atenta.',book:'Trabajo seleccionado (inglés)',audit:'Evaluación de comunicación bilingüe (inglés)',footer:'Comunicación con las personas en el centro.',
  },
};
const employers=['American Red Cross','Florida International University','SOS Children’s Villages','School in the Square'];
const pressLinks=['https://www.today.com/health/red-cross-urges-people-donate-blood-amid-coronavirus-concerns-t175665','https://www.nytimes.com/2020/05/21/climate/hurricane-season-2020-noaa.html','https://www.nbcnews.com/storyline/syrias-suffering-families/shot-during-cookies-milk-syrian-boys-story-n266356','https://www.cbsnews.com/miami/news/florida-international-university-stages-largest-disaster-drill-in-the-state/'];
const logos=[today,nyt,nbc,cbs];
const serviceSlugs=['media-relations','crisis-communications','editorial-content','bilingual-campaigns'];
const sampleLinks=['https://news.fiu.edu/2024/researching-psychiatric-disease-risks-linked-to-childhood-lead-exposure','https://news.fiu.edu/2024/fiu-students-get-hands-on-experience-in-large-scale-disaster-response','https://issuu.com/fiupublications/docs/4965759993_stmpl_2024annualreport-issuu','https://www.youtube.com/watch?v=2CLX2927mpQ','/work/sos-villages/'];
function Arrow({diagonal=false}){return <span aria-hidden="true" className="arrow">{diagonal?'↗':'→'}</span>}

export default function App({language='en'}){
  const t=copy[language], prefix=language==='es'?'/es':'';
  const [menuOpen,setMenuOpen]=useState(false);
  const menuRef=useRef(null),toggleRef=useRef(null);
  useEffect(()=>{
    if(!menuOpen)return;
    const previous=document.body.style.overflow;
    document.body.style.overflow='hidden';
    menuRef.current?.querySelector('a')?.focus();
    const key=(event)=>{
      if(event.key==='Escape'){setMenuOpen(false);toggleRef.current?.focus()}
      if(event.key==='Tab'){
        const links=Array.from(menuRef.current.querySelectorAll('a')),first=links[0],last=links[links.length-1];
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();toggleRef.current?.focus()}
        else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();toggleRef.current?.focus()}
        else if(document.activeElement===toggleRef.current){event.preventDefault();(event.shiftKey?last:first).focus()}
      }
    };
    document.addEventListener('keydown',key);
    return()=>{document.body.style.overflow=previous;document.removeEventListener('keydown',key)};
  },[menuOpen]);
  const sections=['work','about','expertise','contact'];
  return <>
    <a className="skip" href="#main">{language==='es'?'Saltar al contenido':'Skip to content'}</a>
    <header className="site-header"><a className="wordmark" href={prefix+'/'} aria-label="Stephanie Rendon home"><span className="monogram" aria-hidden="true">sr.</span><span>Stephanie<br/>Rendon</span></a><nav className="desktop-nav" aria-label="Main">{sections.map((s,i)=><a href={'#'+s} key={s}>{t.nav[i]}</a>)}</nav><div className="header-right"><a className="language" href={language==='es'?'/':'/es/'} hrefLang={language==='es'?'en':'es'} aria-label={language==='es'?'Read in English':'Leer en español'}>{language==='es'?'EN':'ES'}</a><button ref={toggleRef} className="menu-toggle" aria-controls="mobile-nav" aria-expanded={menuOpen} onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?(language==='es'?'Cerrar':'Close'):(language==='es'?'Menú':'Menu')}<span aria-hidden="true">{menuOpen?'−':'+'}</span></button></div></header>
    <nav ref={menuRef} id="mobile-nav" className="mobile-nav" aria-label="Mobile" hidden={!menuOpen}>{sections.map((s,i)=><a href={'#'+s} key={s} onClick={()=>setMenuOpen(false)}>{t.nav[i]}<Arrow/></a>)}</nav>
    <main id="main">
      <section className="hero section-shell"><div className="hero-copy"><p className="eyebrow"><span className="signal"/>{t.role}</p><h1>{t.title}</h1><p className="hero-intro">{t.intro}</p><div className="hero-actions"><a className="button solid" href="#work">{t.cta}<Arrow/></a><a className="text-link" href="/downloads/Stephanie-Rendon-Resume.pdf">{t.cv} ↓</a></div><div className="hero-note"><span>{t.location}</span><span>EN / ES</span><span>2012–2026</span></div></div><figure className="hero-portrait"><img src={portrait} width="800" height="800" alt={t.portrait} fetchPriority="high"/><figcaption><span>{t.caption}</span><span className="portrait-stamp" aria-hidden="true">SR</span></figcaption></figure></section>
      <div className="experience-strip section-shell"><span className="eyebrow">{t.experience}</span><div>{employers.map(e=><span key={e}>{e}</span>)}</div></div>
      <section className="selected section-shell" id="work"><div className="section-heading"><p className="eyebrow">{t.workLabel}</p><h2>{t.workTitle}</h2><p className="section-intro">{t.workIntro}</p></div><div className="case-grid">{t.cases.map((c,i)=><a className={'case-card case-'+i} key={c.slug} href={prefix+'/work/'+c.slug+'/'}><div className="case-art">{i===0?<><div className="poster-top"><span>2020</span><span>{c.org}</span></div><div className="poster-type">{c.poster}</div><img className="poster-logo" src={today} alt="TODAY"/><span className="poster-rings" aria-hidden="true"/></>:i===1?<div className="case-proof-art"><span className="eyebrow">{c.artLabel}</span><img src={nyt} alt="The New York Times"/><span className="case-proof-title">{c.artTitle}</span></div>:<img src={drill} alt={c.imageAlt} loading="lazy"/>}<span className="case-index">0{i+1}</span><span className="case-open"><Arrow diagonal/></span></div>{c.imageCaption&&<p className="image-caption">{c.imageCaption}</p>}<div className="case-meta"><span>{c.org}</span><span>{c.tag}</span></div><h3>{c.title}</h3><p>{c.desc}</p><span className="case-read">{t.read}<Arrow/></span></a>)}</div></section>
      <section className="press-section section-shell" id="press"><div className="press-heading"><h2>{t.proofLabel}</h2><p>{t.proofNote}</p></div><div className="press-grid">{t.press.map((p,i)=><a href={pressLinks[i]} key={p[0]} target="_blank" rel="noopener noreferrer"><img src={logos[i]} alt={p[0]} loading="lazy"/><h3>{p[1]}</h3><div><span>{p[2]}</span><Arrow diagonal/></div></a>)}</div></section>
      <section className="about-section section-shell" id="about"><div><p className="eyebrow">{t.aboutLabel}</p><h2>{t.aboutTitle}</h2><a className="text-link" href="/downloads/Stephanie-Rendon-Resume.pdf">{t.cv} ↓</a><figure className="about-field"><img src={field} width="800" height="533" loading="lazy" alt={t.fieldAlt}/><figcaption>{t.fieldCaption}</figcaption></figure></div><div className="about-copy">{t.about.map(p=><p key={p}>{p}</p>)}</div><div className="stats">{t.stats.map(s=><div key={s[1]}><strong>{s[0]}</strong><p>{s[1]}</p><span>{s[2]}</span></div>)}</div></section>
      <section className="expertise-section section-shell" id="expertise"><div className="section-heading"><p className="eyebrow">{t.expertiseLabel}</p><h2>{t.expertiseTitle}</h2></div><div className="expertise-list">{t.expertise.map((e,i)=><a href={prefix+'/services/'+serviceSlugs[i]+'/'} key={e[0]}><span className="eyebrow">0{i+1}</span><h3>{e[0]}</h3><p>{e[1]}</p><Arrow diagonal/></a>)}</div></section>
      <section className="samples-section section-shell" id="writing"><p className="eyebrow">{t.moreLabel}</p><h2>{t.moreTitle}</h2><div className="sample-list">{t.samples.map((s,i)=><a href={i===4?prefix+sampleLinks[i]:sampleLinks[i]} key={s[1]} {...(i<4?{target:'_blank',rel:'noopener noreferrer'}:{})}><span>{s[0]}</span><h3>{s[1]}</h3><span>{s[2]}</span><Arrow diagonal/></a>)}</div></section>
      <section className="contact-section section-shell" id="contact"><p className="eyebrow">{t.contactLabel}</p><h2>{t.contactTitle}</h2><div className="contact-bottom"><div><p>{t.contactBody}</p><a className="contact-email" href="mailto:hello@stephanierendon.com">hello@stephanierendon.com<Arrow diagonal/></a></div><div className="contact-links"><a href="https://www.linkedin.com/in/rendonstephanie/">LinkedIn<Arrow diagonal/></a><a href="/downloads/Stephanie-Rendon-Resume.pdf">{t.cv}<span>↓</span></a><a href="/downloads/Stephanie-Rendon-Selected-Work.pdf">{t.book}<span>↓</span></a><a href="/tools/bilingual-comms-audit/">{t.audit}<Arrow/></a></div></div></section>
    </main><footer className="section-shell"><a className="footer-mark" href="#main">Stephanie Rendon<span aria-hidden="true">.</span></a><div className="footer-meta"><span>© 2026 Stephanie Rendon</span><span>{t.footer}</span><span>{t.location} · EN / ES</span></div></footer>
    {StudioTuner&&<Suspense fallback={null}><StudioTuner/></Suspense>}
  </>;
}
