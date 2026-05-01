// Programmatic long-tail service page generator.
// Builds each page from a content config, sharing the inline CSS template
// from public/services/brand-narrative-strategy/index.html.
// Skips files that already exist so the two hand-written ones (foundations,
// charter-schools under bilingual-campaigns) don't get overwritten.

import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC = join(ROOT, "public");

const STYLE = `:root{--forest:oklch(0.24 0.04 162);--forest-deep:oklch(0.18 0.035 162);--forest-ink:oklch(0.14 0.025 162);--ivory:oklch(0.965 0.012 85);--ivory-warm:oklch(0.94 0.018 80);--moss:oklch(0.58 0.09 142);--rule:oklch(0.24 0.04 162 / 0.18);--muted:oklch(0.24 0.04 162 / 0.62);--serif:"Newsreader",Georgia,serif;--display:"Instrument Serif","Newsreader",Georgia,serif;--sans:"Geist",ui-sans-serif,system-ui,sans-serif;--mono:"JetBrains Mono",ui-monospace,Menlo,monospace;--max:720px;--gutter:clamp(20px,4vw,56px);}
      *{box-sizing:border-box;margin:0;padding:0;}html{scroll-behavior:smooth;}
      body{background:var(--ivory);color:var(--forest-ink);font-family:var(--serif);font-size:18px;line-height:1.65;-webkit-font-smoothing:antialiased;}
      ::selection{background:var(--forest);color:var(--ivory);}
      a{color:var(--forest);text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:3px;}a:hover{color:var(--moss);}
      .topbar{padding:22px var(--gutter);display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--rule);font-family:var(--sans);}
      .brand{font-family:var(--display);font-size:22px;letter-spacing:-0.02em;display:flex;align-items:center;gap:10px;color:var(--forest-ink);text-decoration:none;}
      .brand .dot{display:inline-block;width:8px;height:8px;background:var(--moss);border-radius:50%;}
      .topbar nav{display:flex;gap:24px;font-size:14px;}.topbar nav a{color:var(--forest-ink);text-decoration:none;}.topbar nav a:hover{color:var(--moss);}
      main{max-width:var(--max);margin:0 auto;padding:64px var(--gutter) 96px;}
      .eyebrow{font-family:var(--mono);font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:var(--muted);display:inline-flex;align-items:center;gap:10px;margin-bottom:24px;}
      .eyebrow::before{content:"";width:28px;height:1px;background:currentColor;opacity:0.55;}
      h1{font-family:var(--display);font-weight:400;font-size:clamp(36px,5.5vw,56px);letter-spacing:-0.02em;line-height:1.05;margin-bottom:28px;}h1 em{font-style:italic;}
      .lede{font-size:22px;line-height:1.5;margin-bottom:48px;}
      h2{font-family:var(--display);font-weight:400;font-size:clamp(28px,4vw,36px);letter-spacing:-0.015em;line-height:1.15;margin-top:56px;margin-bottom:20px;}h2 em{font-style:italic;}
      p{margin-bottom:20px;}strong{font-weight:600;}
      ol,ul{margin:8px 0 24px 24px;}li{margin-bottom:10px;}
      .pullquote{font-family:var(--display);font-style:italic;font-size:clamp(24px,3.2vw,32px);line-height:1.3;color:var(--forest-deep);padding:16px 0 16px 24px;border-left:2px solid var(--moss);margin:40px 0;}
      .related{margin-top:48px;padding-top:24px;border-top:1px solid var(--rule);font-family:var(--sans);font-size:14px;}
      .related h3{font-family:var(--mono);font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:var(--muted);margin-bottom:16px;font-weight:400;}
      .related li{margin-bottom:8px;}
      .cta{margin-top:64px;padding:40px;background:var(--ivory-warm);border:1px solid var(--rule);text-align:center;}
      .cta p{font-size:20px;margin-bottom:16px;}
      .cta .button{display:inline-block;font-family:var(--sans);font-size:14px;letter-spacing:0.02em;padding:14px 28px;background:var(--forest-ink);color:var(--ivory);text-decoration:none;border-radius:4px;}
      .cta .button:hover{background:var(--moss);}
      footer{max-width:var(--max);margin:0 auto;padding:40px var(--gutter);border-top:1px solid var(--rule);font-family:var(--sans);font-size:13px;color:var(--muted);display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;}
      footer a{color:var(--muted);text-decoration:none;}footer a:hover{color:var(--forest);}`;

const SERVICE_PARENT_NAMES = {
  "bilingual-campaigns": "Bilingual Campaigns",
  "crisis-communications": "Crisis Communications",
  "media-relations": "Media Relations",
  "brand-narrative-strategy": "Brand & Narrative Strategy",
  "community-engagement": "Community Engagement",
  "editorial-content": "Editorial & Content",
};

function htmlEscape(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function jsonEscape(s) {
  // Drop any HTML tags (we don't want <em> in schema descriptions) then
  // escape ampersand only — JSON.stringify handles the rest.
  return s.replace(/<[^>]+>/g, "");
}

function pageHtml(p) {
  const url = `https://stephanierendon.com/services/${p.serviceSlug}/${p.audienceSlug}/`;
  const parentUrl = `https://stephanierendon.com/services/${p.serviceSlug}/`;
  const parentName = SERVICE_PARENT_NAMES[p.serviceSlug];

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: jsonEscape(p.title),
    description: jsonEscape(p.metaDescription),
    provider: {
      "@type": "Person",
      name: "Stephanie Rendon",
      url: "https://stephanierendon.com/",
      jobTitle: "Strategic Communications Consultant",
      sameAs: ["https://www.linkedin.com/in/rendonstephanie/"],
    },
    areaServed: [
      { "@type": "City", name: "New York" },
      { "@type": "Country", name: "United States" },
    ],
    serviceType: p.serviceType || parentName,
    url,
    audience: { "@type": "Audience", audienceType: p.audienceType },
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://stephanierendon.com/" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://stephanierendon.com/#services" },
      { "@type": "ListItem", position: 3, name: parentName, item: parentUrl },
      { "@type": "ListItem", position: 4, name: p.breadcrumbName, item: url },
    ],
  };

  const relatedHtml = p.related
    .map((r) => `          <li><a href="${r.href}">${htmlEscape(r.label)}</a></li>`)
    .join("\n");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${htmlEscape(p.title)} | Stephanie Rendon</title>
    <meta name="description" content="${htmlEscape(p.metaDescription)}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:title" content="${htmlEscape(p.title)}" />
    <meta property="og:description" content="${htmlEscape(p.ogDescription || p.metaDescription)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="https://stephanierendon.com/og-image.png" />
    <meta property="og:site_name" content="Stephanie Rendon" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${htmlEscape(p.twitterTitle || p.title)}" />
    <meta name="twitter:description" content="${htmlEscape(p.twitterDescription || p.ogDescription || p.metaDescription)}" />
    <meta name="twitter:image" content="https://stephanierendon.com/og-image.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,300..700&family=Geist:wght@300..700&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
    <script type="application/ld+json">
    ${JSON.stringify(serviceJsonLd)}
    </script>
    <script type="application/ld+json">
    ${JSON.stringify(breadcrumbs)}
    </script>
    <style>
      ${STYLE}
    </style>
  </head>
  <body>
    <header class="topbar">
      <a class="brand" href="/"><span class="dot"></span>Stephanie Rendon</a>
      <nav><a href="/#about">About</a><a href="/#work">Selected Work</a><a href="/#services">Services</a><a href="/#contact">Work with me</a></nav>
    </header>

    <main>
      <div class="eyebrow">${htmlEscape(p.eyebrow)}</div>

      <h1>${p.h1}</h1>

      <p class="lede">${p.lede}</p>

${p.body}

      <div class="cta">
        <p>${p.ctaText}</p>
        <a class="button" href="/#contact">Work with me →</a>
      </div>

      <div class="related">
        <h3>Related case studies</h3>
        <ul>
${relatedHtml}
        </ul>
      </div>
    </main>

    <footer>
      <span>© 2026 Stephanie Rendon · New York City · EN · ES</span>
      <span><a href="/">Back to home</a> · <a href="https://www.linkedin.com/in/rendonstephanie/">LinkedIn</a></span>
    </footer>
  </body>
</html>
`;
}

// Per-page configs. Keep the body text in heredoc-style template literals so the
// content is the focus. Each page is 400-600 words of body copy.
const pages = [
  // ============================================================
  // BILINGUAL CAMPAIGNS × audiences (already did foundations + charter-schools by hand)
  // ============================================================
  {
    serviceSlug: "bilingual-campaigns",
    audienceSlug: "health-clinics",
    audienceType: "Community health clinics",
    title: "Bilingual Communications for Community Health Clinics",
    metaDescription:
      "Bilingual (EN/ES) communications for community health clinics whose patients are predominantly Spanish-speaking. Patient education, public-health campaigns, and crisis comms built bilingual from the start.",
    breadcrumbName: "Health Clinics",
    eyebrow: "Service · S · 06 · Health Clinics",
    h1: "Bilingual Communications for <em>Community Health Clinics</em>",
    lede: "Community clinics whose patients are predominantly Spanish-speaking deserve communications that meet them where they are — not English copy with translation as the last line item in the budget.",
    ctaText: "Patients deserve communications built for them, not translated to them.",
    body: `      <h2>What community clinics need bilingual to do</h2>
      <p>For community health clinics, bilingual communications are not a marketing function. They are a clinical-care function. The patient who can't read the appointment-prep instructions misses the appointment. The family who can't follow the after-visit summary doesn't follow the treatment plan. The community that doesn't understand the clinic's outreach doesn't show up to the screening day.</p>
      <p>Most clinics know this. The gap is between knowing it and resourcing it. Bilingual gets handled by whoever on staff happens to speak Spanish, in addition to their actual job. The result is uneven and exhausted communications that the clinic itself doesn't trust.</p>

      <h2>What I deliver</h2>
      <ul>
        <li><strong>Patient education materials.</strong> Plain-language, bilingual, designed to be read by people in waiting rooms and at home — not the dense pamphlet voice that comes out of legal review.</li>
        <li><strong>Public-health campaigns and outreach.</strong> Vaccination, screening, enrollment-period campaigns developed bilingual with Spanish-language outlets and channels treated as primary, not afterthought.</li>
        <li><strong>Crisis and outbreak communications.</strong> When a clinic needs to communicate quickly during a health emergency, the Spanish version cannot be three days behind the English one.</li>
        <li><strong>Earned media in Spanish-language press.</strong> Univision, Telemundo, regional Spanish-language outlets — channels with their own beat reporters and clinical-story logic.</li>
      </ul>

      <h2>Where the work shows up</h2>
      <p>My foundational health-comms work came from the FIU Robert Stempel College of Public Health &amp; Social Work, where the editorial brief was always how to translate clinical and public-health research into language that general audiences could understand and act on. Earlier American Red Cross work spanned biomedical services, COVID coordination, and disaster response — each with bilingual communications components, often built quickly under pressure. Both contexts taught the same lesson: when public-health communications fail, it's almost always because the language failed first.</p>

      <p class="pullquote">"Bilingual communications at a community clinic are not a marketing function. They are a clinical-care function. Patients who don't understand the instructions don't follow them."</p>

      <h2>When to bring me in</h2>
      <p>Before a screening day or vaccination push, not after the English collateral is printed. Before an enrollment-period campaign opens. Before the next public-health emergency requires fast, accurate communications in two languages at once. Bilingual-from-the-start clinics are the ones whose Spanish-speaking patients show up.</p>`,
    related: [
      { href: "/work/sos-villages/", label: "How an integrated campaign doubled SOS Children's Villages' web traffic" },
      { href: "/work/red-cross/", label: "Storytelling that moves people: a Red Cross feature about earthquake survivors" },
    ],
  },
  {
    serviceSlug: "bilingual-campaigns",
    audienceSlug: "immigrant-services",
    audienceType: "Immigrant services organizations",
    title: "Bilingual Campaigns for Immigrant Services Organizations",
    metaDescription:
      "Bilingual (EN/ES) campaigns and communications for immigrant services organizations. Cultural fluency for organizations whose mission and clients are bilingual by definition.",
    breadcrumbName: "Immigrant Services",
    eyebrow: "Service · S · 06 · Immigrant Services",
    h1: "Bilingual Campaigns for <em>Immigrant Services Organizations</em>",
    lede: "For organizations whose mission and clients are bilingual by definition, communications cannot be English with a Spanish translation step bolted on. The work is bilingual or it isn't the work.",
    ctaText: "Mission is bilingual. Communications should be too.",
    body: `      <h2>What's at stake</h2>
      <p>Immigrant services organizations operate in a crowded, scrutinized, and politically contested space. The communications work is high-stakes by default: a misframed press release becomes opposition fuel, a poorly translated client letter becomes a grievance, a campaign that flatters English-speaking donors but condescends to Spanish-speaking clients erodes the trust the organization spent years building.</p>
      <p>Doing bilingual right for this audience is not a matter of preference. It is a matter of organizational integrity. The clients are bilingual. The funders increasingly expect bilingual reporting. The press calls in two languages. The communications need to match.</p>

      <h2>What I deliver</h2>
      <ul>
        <li><strong>Bilingual brand and narrative work.</strong> The story of who the organization serves and how — built bilingual so that the English and Spanish versions are both designed for their audience, not derived from one another.</li>
        <li><strong>Earned media in Spanish-language outlets.</strong> Reporters at Univision, Telemundo, EFE, El Diario NY, and regional Spanish-language press cover this beat differently than English-language press. The pitch, the story angle, and the spokespeople need to be designed for those expectations.</li>
        <li><strong>Client-facing communications.</strong> Application materials, intake forms, program announcements, eligibility communications — the documents clients actually read and act on.</li>
        <li><strong>Crisis communications.</strong> Policy changes, ICE-related incidents, community alerts — moments when the speed and accuracy of bilingual communications determine outcomes for the people the organization serves.</li>
      </ul>

      <h2>Where the work shows up</h2>
      <p>Earlier work at SOS Children's Villages USA included bilingual campaigns for an organization whose clients and beneficiaries lived across English and Spanish-speaking communities. The integrated campaign — earned media, paid distribution, and a HuffPost / Johnson &amp; Johnson partnership — doubled web traffic and earned coverage in AP, NBC, CNN, Reuters, and The Atlantic. American Red Cross work spanned Mexican earthquake response and disaster response work in immigrant-receiving communities. The connective tissue across both: bilingual was structural, not cosmetic.</p>

      <p class="pullquote">"For an immigrant services organization, communications that condescend to Spanish-speaking clients erode the trust the organization spent years building."</p>

      <h2>When to bring me in</h2>
      <p>Before a major campaign launches. Before a sensitive press cycle. Before an annual report cycle that will be read by both an English-speaking funder community and a Spanish-speaking client community. The earlier bilingual enters the work, the better it lands.</p>`,
    related: [
      { href: "/work/sos-villages/", label: "How an integrated campaign doubled SOS Children's Villages' web traffic" },
      { href: "/work/red-cross/", label: "Storytelling that moves people: a Red Cross feature about earthquake survivors" },
    ],
  },
  {
    serviceSlug: "bilingual-campaigns",
    audienceSlug: "family-services",
    audienceType: "Family services nonprofits",
    title: "Bilingual Communications for Family Services Nonprofits",
    metaDescription:
      "Bilingual (EN/ES) family-facing communications for family services nonprofits. Plain-language, culturally fluent campaigns and program communications.",
    breadcrumbName: "Family Services",
    eyebrow: "Service · S · 06 · Family Services",
    h1: "Bilingual Communications for <em>Family Services Nonprofits</em>",
    lede: "Family services nonprofits live or die on whether the families they serve actually understand the help available. Bilingual communications are how the help becomes legible.",
    ctaText: "Families served deserve communications they can actually read.",
    body: `      <h2>The challenge for family services nonprofits</h2>
      <p>Family services organizations — child welfare, kinship care, youth services, parenting and family-stability programs — depend on families finding, understanding, and trusting the services on offer. Communications failures here are high-cost: a family that doesn't understand the eligibility letter doesn't apply; a community that doesn't recognize the organization's name doesn't refer to it.</p>
      <p>For organizations whose populations are predominantly Spanish-speaking, the bilingual gap shows up everywhere — intake materials, eligibility communications, family-facing campaigns, board reporting that talks about the families without quoting them. Bilingual built late always reads as bilingual built late.</p>

      <h2>What I deliver</h2>
      <ul>
        <li><strong>Family-facing program communications.</strong> Application materials, eligibility letters, intake forms, calendar communications — written bilingual so that the Spanish-speaking parent reads the same quality of information as the English-speaking parent.</li>
        <li><strong>Awareness and outreach campaigns.</strong> The campaigns that get families to discover the program in the first place. Designed bilingual, with Spanish-language media, community channels, and trusted-messenger relationships treated as primary.</li>
        <li><strong>Donor and funder communications.</strong> Annual reports, grantee storytelling, impact narratives that surface the bilingual reality of the work rather than translating it out for the English-speaking board.</li>
        <li><strong>Crisis and policy communications</strong> for moments when the families served need fast, accurate communications in both languages at once.</li>
      </ul>

      <h2>Where the work shows up</h2>
      <p>SOS Children's Villages USA was structurally a family services NGO — providing family-based care for children who had lost parental support. The integrated bilingual campaign there doubled the organization's web traffic and earned coverage in AP, NBC, CNN, Reuters, and The Atlantic — but the underlying choice was that bilingual was native to the brief, not appended to the deliverable. American Red Cross work spanning Mexican earthquake response and family-reunification communications applied the same playbook to disaster context. The pattern is portable to any family services organization willing to do bilingual once, properly.</p>

      <p class="pullquote">"A family that doesn't understand the eligibility letter doesn't apply. The communications failure becomes a service failure."</p>

      <h2>When to bring me in</h2>
      <p>Before an outreach campaign launches. Before an annual report cycle. Before the next family-facing program announcement. Bilingual-from-the-start communications are how a family services organization stays legible to the families it exists to serve.</p>`,
    related: [
      { href: "/work/sos-villages/", label: "How an integrated campaign doubled SOS Children's Villages' web traffic" },
      { href: "/work/red-cross/", label: "Storytelling that moves people: a Red Cross feature about earthquake survivors" },
    ],
  },
  {
    serviceSlug: "bilingual-campaigns",
    audienceSlug: "dual-language-schools",
    audienceType: "Dual-language schools",
    title: "Bilingual Campaigns for Dual-Language Schools",
    metaDescription:
      "Bilingual (EN/ES) family communications, enrollment marketing, and earned media for dual-language schools. Communications that match the bilingual academic model.",
    breadcrumbName: "Dual-Language Schools",
    eyebrow: "Service · S · 06 · Dual-Language Schools",
    h1: "Bilingual Campaigns for <em>Dual-Language Schools</em>",
    lede: "A dual-language school whose communications are English-first contradicts itself. The model is bilingual. The communications need to match.",
    ctaText: "The model is bilingual. The communications should match.",
    body: `      <h2>The mismatch most dual-language schools have</h2>
      <p>Dual-language schools sell families on a bilingual academic model — children who graduate biliterate, with the cultural fluency that comes from learning in two languages from the start. The classroom delivers it. The communications, often, do not. The website is English-first; the Spanish version is a translation buried under a flag icon. The newsletter goes out in English with a Google-translate Spanish appended at the bottom. The enrollment materials are designed in English and reformatted for Spanish at print time.</p>
      <p>Families notice. The mismatch between the academic promise and the family-facing communications is the first sign of whether a school takes its bilingual model seriously.</p>

      <h2>What I deliver</h2>
      <ul>
        <li><strong>Bilingual enrollment marketing.</strong> Open-house materials, application process, family information sessions — designed in both languages from the brief stage. The Spanish version is not derivative; it's primary.</li>
        <li><strong>Family communications during the school year.</strong> Newsletters, urgent updates, calendar communications, board reporting back to families.</li>
        <li><strong>Earned media in English and Spanish-language press.</strong> Local outlets — Univision, Telemundo, El Diario NY, regional Spanish-language press — that move enrollment and reputation in your community.</li>
        <li><strong>Funder and partner communications</strong> that surface the bilingual reality of the school rather than translating it out.</li>
      </ul>

      <h2>Where the work shows up</h2>
      <p>I currently lead marketing and communications at School in the Square, a PreK–12 dual-language English/Spanish public charter network in Washington Heights and Inwood serving 800+ students. The day-to-day of running a bilingual comms operation for a dual-language school — building family-engagement infrastructure, handling enrollment season, fielding press, drafting board reporting, managing crisis comms — is what consulting clients hire me to install or strengthen for them.</p>

      <p class="pullquote">"A dual-language school whose communications are English-first contradicts itself. Families notice."</p>

      <h2>When to bring me in</h2>
      <p>Before enrollment season. Before the next family-facing campaign. Before the brand refresh that's about to happen anyway. Building the bilingual infrastructure once is cheaper and better than rebuilding it every year under deadline pressure.</p>`,
    related: [
      { href: "/work/sos-villages/", label: "How an integrated campaign doubled SOS Children's Villages' web traffic" },
    ],
  },

  // ============================================================
  // CRISIS COMMUNICATIONS × audiences (5)
  // ============================================================
  {
    serviceSlug: "crisis-communications",
    audienceSlug: "charter-schools",
    audienceType: "Charter schools",
    title: "Crisis Communications for Charter Schools",
    metaDescription:
      "Crisis communications for charter schools and charter networks. Family-facing, bilingual where needed, designed for the unique scrutiny charter schools face during a crisis.",
    breadcrumbName: "Charter Schools",
    eyebrow: "Service · S · 03 · Charter Schools",
    h1: "Crisis Communications for <em>Charter Schools</em>",
    lede: "Charter schools face a different scrutiny during a crisis than district schools. The communications playbook needs to account for that — without losing the families the school exists to serve.",
    ctaText: "Need a crisis playbook before the crisis arrives?",
    body: `      <h2>What's different about charter school crises</h2>
      <p>Charter schools operate inside a political contest about charter schools generally. A safety incident, a leadership transition, an academic scandal, a financial-management story — each lands inside that wider frame. Local press, parent groups, district authorizers, and policy critics all read the same incident through their own lens. The communications work has to address each audience without compounding the problem with any of them.</p>
      <p>And in most charter networks, the families come first. Whatever the press cycle is, the family communications cannot be a translation of the press release. Families need direct, honest, fast information about what happened, what the school is doing, and what they should expect.</p>

      <h2>What I deliver</h2>
      <ul>
        <li><strong>Crisis communications playbooks.</strong> Built before the crisis arrives. Roles, decision rights, draft language for the most likely scenarios, escalation paths, and the bilingual layer if your families are bilingual.</li>
        <li><strong>Live-incident response.</strong> Drafting, sequencing, and pacing the family-facing, staff-facing, board-facing, and press-facing communications during the first 48 hours.</li>
        <li><strong>Spokesperson preparation.</strong> The board chair, head of school, or executive director who will be on camera or quoted in print. The work is to make them effective without making them defensive.</li>
        <li><strong>Post-crisis review.</strong> The work after the news cycle ends — what to surface to families, what to retain in the institutional record, what to change in the playbook for next time.</li>
      </ul>

      <h2>Where the work shows up</h2>
      <p>I currently lead marketing and communications at School in the Square, a PreK–12 dual-language public charter network in Washington Heights and Inwood serving 800+ students. Crisis communications work in this context is part of the day job — bilingual family communications, board reporting, press response, staff communications. The infrastructure clients hire me to build for them is the same infrastructure I run live.</p>

      <p class="pullquote">"In a charter school crisis, the families come first. Whatever the press cycle is, family communications cannot be a translation of the press release."</p>

      <h2>When to bring me in</h2>
      <p>Before the crisis. Crisis playbooks built mid-crisis are the wrong work at the wrong time. The right time is the quiet quarter when nothing is on fire and the leadership team has 90 minutes to think about what they would do if it were.</p>`,
    related: [
      { href: "/work/red-cross/", label: "Storytelling that moves people: a Red Cross feature about earthquake survivors" },
      { href: "/work/fiu-disaster-drill/", label: "How a graduate field course at FIU got national press for being hands-on" },
    ],
  },
  {
    serviceSlug: "crisis-communications",
    audienceSlug: "foundations",
    audienceType: "Foundations and grantmakers",
    title: "Crisis Communications for Foundations",
    metaDescription:
      "Crisis communications for foundations and grantmakers. Reputational, governance, and grantee-related crisis response designed for the institutions that fund the work.",
    breadcrumbName: "Foundations",
    eyebrow: "Service · S · 03 · Foundations",
    h1: "Crisis Communications for <em>Foundations</em>",
    lede: "Foundations face crises of governance, reputation, and grantee fallout that require a different communications calculus than the organizations they fund. The work is quieter, more careful, and just as urgent.",
    ctaText: "Need foundation-specific crisis preparation?",
    body: `      <h2>Why foundations need their own playbook</h2>
      <p>Foundation crises are rarely loud. A grantee organization is in the news for the wrong reasons and reporters are calling about the funder's grant decisions. A board governance issue is leaking. A program is being criticized in policy press for unintended consequences. A founder or leadership figure is the subject of a story.</p>
      <p>The temptation is to handle these the way an operating organization would. That is usually wrong. Foundations communicate differently because their relationships are different — they speak to a small, sophisticated audience of grantees, peer funders, board members, and policy press. The communications need to be precise, low-volume, and trust-preserving.</p>

      <h2>What I deliver</h2>
      <ul>
        <li><strong>Reputational and governance crisis response.</strong> Drafting and sequencing communications when the foundation itself or its leadership is in the news.</li>
        <li><strong>Grantee-related crisis support.</strong> When a grantee organization is in trouble and the funder needs to communicate carefully about its grant relationship without abandoning the grantee or compounding the press cycle.</li>
        <li><strong>Crisis playbooks built ahead of time.</strong> The most likely scenarios, draft language, decision rights, board-facing protocols, and the relationships with peer funders that matter when something goes wrong.</li>
        <li><strong>Spokesperson preparation</strong> for board chairs, presidents, and program officers who may need to speak to press during a crisis.</li>
      </ul>

      <h2>Where the work shows up</h2>
      <p>The communications discipline of careful, donor-facing storytelling under pressure is what I built across SOS Children's Villages USA, where work for an NGO with funder, board, and beneficiary audiences taught the underlying lesson: the audiences for crisis communications are layered and the wrong message to one audience can cost relationships with the others. American Red Cross work — Mexican earthquake response, COVID coordination, disaster response — added the dimension of communicating during real emergencies with national press attention, and required the same calculus: precision, sequencing, audience layering.</p>

      <p class="pullquote">"Foundation crises are rarely loud. The work is more careful, more sequenced, more trust-preserving. The wrong message to a grantee can cost the relationship."</p>

      <h2>When to bring me in</h2>
      <p>Before a crisis arrives. The foundations that handle a hard moment well have built the infrastructure during the quiet quarters — not at 11pm on a Sunday when a Times reporter calls.</p>`,
    related: [
      { href: "/work/sos-villages/", label: "How an integrated campaign doubled SOS Children's Villages' web traffic" },
      { href: "/work/red-cross/", label: "Storytelling that moves people: a Red Cross feature about earthquake survivors" },
    ],
  },
  {
    serviceSlug: "crisis-communications",
    audienceSlug: "health-organizations",
    audienceType: "Health organizations and public health institutions",
    title: "Crisis Communications for Health Organizations",
    metaDescription:
      "Crisis communications for hospitals, community health clinics, public health institutions, and health research organizations. Built around clinical accuracy, bilingual where needed, calibrated for high-stakes audiences.",
    breadcrumbName: "Health Organizations",
    eyebrow: "Service · S · 03 · Health Organizations",
    h1: "Crisis Communications for <em>Health Organizations</em>",
    lede: "Health organization crises are different. Clinical accuracy, regulatory exposure, and the trust patients place in institutions all factor into communications that can't afford to be wrong.",
    ctaText: "Health crisis prep that respects clinical accuracy?",
    body: `      <h2>What makes health crises different</h2>
      <p>The crisis playbook for a health organization carries weight that other sectors don't have. Clinical inaccuracy in a press statement isn't a brand problem; it's a regulatory and patient-safety problem. The reporters covering the story know the field. The legal review is real. The communications team is operating alongside risk-management, infection-control, clinical leadership, and often state or federal regulators.</p>
      <p>And the communications can't only speak to press. Patients, families, staff, referring providers, board, and funders all need different versions of the same story, sequenced correctly, in the languages the audiences actually read.</p>

      <h2>What I deliver</h2>
      <ul>
        <li><strong>Crisis playbooks built before the incident.</strong> Decision rights, draft language for the most likely scenarios — outbreak, safety incident, leadership transition, regulatory action — and the bilingual infrastructure if patients are bilingual.</li>
        <li><strong>Live-incident response.</strong> Drafting, sequencing, and pacing communications across patient, staff, press, regulatory, and partner audiences during the first 24 to 72 hours.</li>
        <li><strong>Clinical-leadership spokesperson preparation.</strong> The chief medical officer, the public-health director, the head of nursing — the people who will be quoted and who need to be effective without becoming defensive.</li>
        <li><strong>Post-crisis editorial.</strong> The longer pieces — letters to the community, board reports, year-in-review write-throughs — that close the loop on a crisis the right way.</li>
      </ul>

      <h2>Where the work shows up</h2>
      <p>American Red Cross work spanning Mexican earthquake response, COVID coordination, and biomedical services was crisis communications inside an organization whose work is largely emergency response. FIU Robert Stempel College of Public Health &amp; Social Work added the dimension of clinical and academic accuracy under press pressure — translating research-grade information into language general-audience reporters could use and patients could understand. Both contexts share the discipline at the heart of health crisis communications: get the clinical content right, and let the rest of the message follow from there.</p>

      <p class="pullquote">"Clinical inaccuracy in a press statement isn't a brand problem. It's a regulatory and patient-safety problem. The communications calculus changes."</p>

      <h2>When to bring me in</h2>
      <p>Before the crisis. Health organizations that handle a hard moment well have run the tabletop exercises, drafted the templates, and aligned with clinical and legal leadership during the quiet quarters.</p>`,
    related: [
      { href: "/work/red-cross/", label: "Storytelling that moves people: a Red Cross feature about earthquake survivors" },
      { href: "/work/fiu-disaster-drill/", label: "How a graduate field course at FIU got national press for being hands-on" },
    ],
  },
  {
    serviceSlug: "crisis-communications",
    audienceSlug: "higher-education",
    audienceType: "Higher education institutions",
    title: "Crisis Communications for Higher Education Institutions",
    metaDescription:
      "Crisis communications for universities, colleges, and academic centers. Designed for the multi-stakeholder environment higher ed crises actually live in — students, families, faculty, alumni, donors, regulators, press.",
    breadcrumbName: "Higher Education",
    eyebrow: "Service · S · 03 · Higher Education",
    h1: "Crisis Communications for <em>Higher Education Institutions</em>",
    lede: "Higher ed crises live in a multi-stakeholder environment that no playbook from another sector handles cleanly. Students, families, faculty, alumni, donors, regulators, and press all expect different things at the same time.",
    ctaText: "Higher ed crisis prep with the audience layering it actually requires?",
    body: `      <h2>What makes higher ed crises hard</h2>
      <p>The crisis communications work at a university is rarely about a single audience. Students need to know what to do today. Families need to know their student is safe. Faculty need to know what's expected of them. Alumni need to feel the institution is being handled responsibly. Donors are reading what alumni are reading and asking what it means for their giving. Regulators and accreditors are reading what the press is reading. The press is reading everyone else's emails because someone forwarded them.</p>
      <p>And every one of these audiences is sophisticated. None of them want corporate-PR voice. The communications need to be plain, fast, and trust-preserving — and sequenced so that internal audiences hear from the institution before they hear about it from press.</p>

      <h2>What I deliver</h2>
      <ul>
        <li><strong>Crisis playbooks built ahead of time.</strong> The most likely scenarios mapped, draft language drafted, decision rights clear, sequencing defined — including the moments when the right answer is to say less, not more.</li>
        <li><strong>Live-incident response.</strong> Drafting and sequencing communications across student, family, faculty, alumni, donor, regulatory, and press audiences during a real incident.</li>
        <li><strong>Spokesperson preparation</strong> for presidents, provosts, deans, and board chairs who may need to be on camera or in print.</li>
        <li><strong>Post-crisis editorial.</strong> The community letters and year-in-review communications that re-establish institutional voice after a hard cycle.</li>
      </ul>

      <h2>Where the work shows up</h2>
      <p>FIU Robert Stempel College of Public Health &amp; Social Work was where I learned higher-ed communications discipline — how to write press releases that earn coverage (the multi-agency disaster simulation release that CBS News Miami picked up was one example), how to translate research and academic programs into general-audience language, and how to navigate the layered audiences of a public research institution. American Red Cross work added national-press crisis experience under real time pressure. Both inform the higher-ed crisis playbook.</p>

      <p class="pullquote">"Higher ed audiences are sophisticated. None of them want corporate-PR voice. The work is to be plain, fast, and trust-preserving — and to sequence the internal audiences before the external ones."</p>

      <h2>When to bring me in</h2>
      <p>Before the next academic year, ideally. The institutions that handle hard moments well have built the playbooks during the quiet weeks — and have spokespeople who've already done the prep work, not who are doing it for the first time at 11pm during a real incident.</p>`,
    related: [
      { href: "/work/fiu-disaster-drill/", label: "How a graduate field course at FIU got national press for being hands-on" },
      { href: "/work/red-cross/", label: "Storytelling that moves people: a Red Cross feature about earthquake survivors" },
    ],
  },
  {
    serviceSlug: "crisis-communications",
    audienceSlug: "disaster-response-orgs",
    audienceType: "Disaster response organizations",
    title: "Crisis Communications for Disaster Response Organizations",
    metaDescription:
      "Crisis communications for disaster response organizations and humanitarian NGOs. Built for the operational tempo and donor-facing demands of communications during a real emergency.",
    breadcrumbName: "Disaster Response",
    eyebrow: "Service · S · 03 · Disaster Response",
    h1: "Crisis Communications for <em>Disaster Response Organizations</em>",
    lede: "Disaster response communications operate at a tempo and under a public scrutiny that no other crisis playbook prepares for. The work has to be fast, accurate, donor-aware, and dignified to the people in the story — at the same time.",
    ctaText: "Disaster response comms support, before or during?",
    body: `      <h2>The double brief of disaster response comms</h2>
      <p>Disaster response organizations do two communications jobs at once: serve the people on the ground, and tell their story to the people whose donations make the response possible. Both jobs are urgent. They pull in slightly different directions. The communications work is to honor both without compromising either.</p>
      <p>Get this wrong and the editorial flattens survivors into objects of pity, the donor messaging reads as exploitation, and the staff in the field lose trust that the comms team is on their side. Get it right and the editorial moves donors and respects subjects, the response gets the funding it needs, and the people in the story remain people in the story — not symbols.</p>

      <h2>What I deliver</h2>
      <ul>
        <li><strong>Live-response communications.</strong> Drafting and sequencing press releases, donor-facing editorial, social copy, and partner communications during the first hours and days of a response.</li>
        <li><strong>Editorial that builds long-term donor relationships.</strong> The features, profiles, and follow-up pieces that turn one-time crisis donors into recurring supporters by leading with what survivors are doing, not only what was done to them.</li>
        <li><strong>Bilingual infrastructure.</strong> When the affected community is Spanish-speaking, the response communications cannot be three days behind in Spanish.</li>
        <li><strong>Crisis playbooks built ahead of disasters.</strong> Pre-drafted templates, role definitions, sequencing protocols, and the relationships with reporters and partners that hold under pressure.</li>
      </ul>

      <h2>Where the work shows up</h2>
      <p>The American Red Cross response to Mexico's 2017 earthquakes is the work I'd point to. <a href="/work/red-cross/">A feature on six survivors</a>, framed around resilience rather than victimhood, became signature editorial the organization continued to reference. COVID coordination and broader disaster-response communications work added the dimension of communicating across multi-month responses where the news cycle moves but the work doesn't. The discipline that comes out of that experience is what disaster response clients hire me to bring to their own playbooks.</p>

      <p class="pullquote">"Donors who give once out of pity often don't give again. Donors who give to recovery-in-progress see their contribution as an investment in something that's already working."</p>

      <h2>When to bring me in</h2>
      <p>Ideally before the next disaster. During an active response works too — the work just compresses into hours instead of weeks. The earlier the engagement, the more durable the editorial.</p>`,
    related: [
      { href: "/work/red-cross/", label: "Storytelling that moves people: a Red Cross feature about earthquake survivors" },
      { href: "/work/fiu-disaster-drill/", label: "How a graduate field course at FIU got national press for being hands-on" },
    ],
  },

  // ============================================================
  // MEDIA RELATIONS × audiences (4)
  // ============================================================
  {
    serviceSlug: "media-relations",
    audienceSlug: "spanish-language-outlets",
    audienceType: "Organizations pitching Spanish-language media",
    title: "Spanish-Language Media Relations",
    metaDescription:
      "Spanish-language media relations for nonprofits, NGOs, and education organizations. Univision, Telemundo, EFE, El Diario NY, and regional Spanish-language press — pitched as a primary audience, not a translation list.",
    breadcrumbName: "Spanish-Language Media",
    eyebrow: "Service · S · 02 · Spanish-Language Media",
    h1: "<em>Spanish-Language</em> Media Relations",
    lede: "Spanish-language press is not an English-language media list with translated subject lines. It is its own ecosystem of beat reporters, story logic, and editorial expectations — and it earns coverage for the organizations that treat it that way.",
    ctaText: "Pitching Spanish-language press? Treat it as primary, not derived.",
    body: `      <h2>Why most Spanish-language pitches fail</h2>
      <p>The default approach in US nonprofit comms is to build an English pitch, get coverage, and translate the press release for a Spanish-language list as a second-step deliverable. The result is predictable: the pitch reads like exactly what it is, the reporters at Univision, Telemundo, EFE, and El Diario NY can tell the organization didn't think of them first, and the coverage either doesn't happen or happens at the level of "translated press release reprinted as a brief."</p>
      <p>Spanish-language press has its own beat reporters, its own editorial calendars, its own definition of what makes a story. Pitches built specifically for those reporters — with specific story angles, specific spokespeople, specific timing — earn coverage at a different level than translated pitches do.</p>

      <h2>What I deliver</h2>
      <ul>
        <li><strong>Spanish-language pitch development.</strong> Story selection and angle work designed for Spanish-language outlets specifically — not adapted from an English pitch.</li>
        <li><strong>Bilingual press materials.</strong> Releases, fact sheets, spokesperson bios, B-roll and photo packages prepared in both languages from the brief stage.</li>
        <li><strong>Spokesperson preparation in Spanish.</strong> The interview prep, message training, and on-camera coaching for spokespeople who'll work in both languages.</li>
        <li><strong>Outlet relationships.</strong> The work of building reporter relationships across Univision, Telemundo, EFE, El Diario NY, and the regional Spanish-language press your organization actually needs to be in.</li>
      </ul>

      <h2>Where the work shows up</h2>
      <p>The bilingual layer of the SOS Children's Villages campaign — built bilingual from the brief stage, with Spanish-language outlets treated as primary — was part of what made the integrated campaign double the organization's web traffic and earn coverage in AP, NBC, CNN, Reuters, and The Atlantic alongside Spanish-language press. American Red Cross work in Mexican-American communities during disaster response added the dimension of pitching Spanish-language press during real emergencies, when the speed and specificity of the relationship is what determines whether the story runs.</p>

      <p class="pullquote">"Spanish-language press has its own beat reporters and its own editorial calendars. Pitches built for those reporters earn coverage at a different level than translated pitches do."</p>

      <h2>When to bring me in</h2>
      <p>Before the next campaign or major announcement. Spanish-language media relations built into the brief stage costs less and produces more than Spanish-language pitching added at the end.</p>`,
    related: [
      { href: "/work/sos-villages/", label: "How an integrated campaign doubled SOS Children's Villages' web traffic" },
      { href: "/work/red-cross/", label: "Storytelling that moves people: a Red Cross feature about earthquake survivors" },
    ],
  },
  {
    serviceSlug: "media-relations",
    audienceSlug: "higher-education",
    audienceType: "Higher education institutions",
    title: "Media Relations for Higher Education",
    metaDescription:
      "Media relations and earned media strategy for universities, colleges, and academic centers. Press releases that get picked up, faculty experts that get booked, programs that earn the coverage they deserve.",
    breadcrumbName: "Higher Education",
    eyebrow: "Service · S · 02 · Higher Education",
    h1: "Media Relations for <em>Higher Education</em>",
    lede: "Most university press releases read like curriculum descriptions — accurate and ignorable. The ones that earn coverage do something different.",
    ctaText: "Programs deserving coverage that read like curriculum?",
    body: `      <h2>The higher-ed earned-media problem</h2>
      <p>Higher education has more story than almost any other sector — research, faculty experts, students doing extraordinary things, partnerships with the cities universities live in — and gets less coverage than the story justifies. The reason is rarely that the story isn't there. It is usually that the story is being pitched in academic voice, to general-audience reporters, who don't have the context to translate it themselves.</p>
      <p>The press releases read like curriculum descriptions. The faculty expert pitches read like CV entries. The story angles are the angles the institution wishes were interesting, not the ones a reporter can actually use.</p>

      <h2>What I deliver</h2>
      <ul>
        <li><strong>Press releases that earn coverage.</strong> Hooks that pass a reporter's smell test. Concrete, named, and verifiable claims. Visual assets ready before pitching.</li>
        <li><strong>Faculty expert positioning.</strong> Identifying the faculty whose work is genuinely newsworthy and building the pitches that get them booked as the expert source on relevant news cycles.</li>
        <li><strong>Program and research storytelling.</strong> Translating academic programs and research findings into language general-audience reporters can use and general-audience readers can follow.</li>
        <li><strong>Bilingual press infrastructure</strong> for institutions whose communities or programs reach Spanish-speaking audiences.</li>
      </ul>

      <h2>Where the work shows up</h2>
      <p>FIU Robert Stempel College of Public Health &amp; Social Work was where I built the higher-ed earned-media discipline. <a href="/work/fiu-disaster-drill/">The release for FIU's multi-agency disaster simulation</a> — the largest such drill in the state — got picked up by CBS News Miami and syndicated through regional outlets. The trick wasn't the program; the program was already extraordinary. The trick was making that obvious to a general-audience reporter in the first 90 seconds of reading. That's the discipline. It's portable to any university, college, or academic center willing to put the work in at the front end.</p>

      <p class="pullquote">"Higher education has more story than almost any other sector and gets less coverage than the story justifies. The fix is in the front end of the pitch, not the volume of pitches."</p>

      <h2>When to bring me in</h2>
      <p>Before the next academic-year news cycle. Programs deserving coverage rarely break through cold; they break through after the right reporter relationships and the right pitch architecture have been built.</p>`,
    related: [
      { href: "/work/fiu-disaster-drill/", label: "How a graduate field course at FIU got national press for being hands-on" },
      { href: "/work/sos-villages/", label: "How an integrated campaign doubled SOS Children's Villages' web traffic" },
    ],
  },
  {
    serviceSlug: "media-relations",
    audienceSlug: "health-research",
    audienceType: "Public health research institutions",
    title: "Media Relations for Public Health Research Institutions",
    metaDescription:
      "Media relations for public health research institutions, schools of public health, and health research organizations. Translating research into coverage without losing what makes the research worth covering.",
    breadcrumbName: "Public Health Research",
    eyebrow: "Service · S · 02 · Public Health Research",
    h1: "Media Relations for <em>Public Health Research Institutions</em>",
    lede: "Public health research is high-stakes, high-context, and easy to misreport. The earned-media work is to make the findings legible to a general-audience reporter without flattening what makes them findings worth reporting.",
    ctaText: "Research deserving general-audience coverage?",
    body: `      <h2>The translation problem</h2>
      <p>Public health research lives in a tension that earned-media work for the sector has to manage carefully. The research is technical; the findings often have direct policy or behavior implications; the reporters covering the story are sometimes specialist science reporters and sometimes general-assignment reporters who'll get one shot to understand the work in 20 minutes. Misreporting a public health study isn't a brand problem. It's a public-health problem.</p>
      <p>The institutions that handle this well do two things: they translate carefully (no over-claim, no under-claim, no quotable hyperbole), and they invest in the relationships with reporters whose coverage actually moves the field — not the wire pickups that look like coverage but don't change anything.</p>

      <h2>What I deliver</h2>
      <ul>
        <li><strong>Press materials for research findings.</strong> Releases, embargo strategy, journal-coordination, and Q&amp;A docs that anticipate what reporters will ask and answer it before they ask.</li>
        <li><strong>Faculty expert positioning.</strong> The work of building researcher visibility in a way that respects the academic norms of the field while making them genuinely useful sources for press.</li>
        <li><strong>Editorial translation.</strong> Long-form features, op-eds, and explainer content that surface research findings to general audiences without losing the technical specificity.</li>
        <li><strong>Bilingual press infrastructure</strong> for institutions whose research has direct relevance to Spanish-speaking communities.</li>
      </ul>

      <h2>Where the work shows up</h2>
      <p>FIU Robert Stempel College of Public Health &amp; Social Work was the foundational context for this work — translating clinical and public-health research into general-audience press, building faculty expert relationships, navigating the academic-press interface. American Red Cross biomedical-services work added the layer of communicating about clinical research and donor-facing biomedical programs under media scrutiny. The connective discipline: translate carefully, never over-claim, and invest in the reporters whose coverage actually changes how the work is understood.</p>

      <p class="pullquote">"Misreporting a public health study isn't a brand problem. It's a public-health problem. The earned-media work has to translate without flattening."</p>

      <h2>When to bring me in</h2>
      <p>Before the next major findings release. Embargo strategy, faculty prep, and reporter relationships built ahead of time consistently produce better coverage than the same work compressed into the week of publication.</p>`,
    related: [
      { href: "/work/fiu-disaster-drill/", label: "How a graduate field course at FIU got national press for being hands-on" },
      { href: "/work/red-cross/", label: "Storytelling that moves people: a Red Cross feature about earthquake survivors" },
    ],
  },
  {
    serviceSlug: "media-relations",
    audienceSlug: "national-ngos",
    audienceType: "National NGOs",
    title: "Media Relations for National NGOs",
    metaDescription:
      "Media relations and earned media strategy for national and international NGOs. Top-tier earned coverage in AP, Reuters, NYT, NBC, CNN, and the outlets that move both donor attention and policy.",
    breadcrumbName: "National NGOs",
    eyebrow: "Service · S · 02 · National NGOs",
    h1: "Media Relations for <em>National NGOs</em>",
    lede: "For a national NGO, earned coverage is more than visibility. It is donor pipeline, policy leverage, and the proof of relevance that the next funding cycle is built on.",
    ctaText: "NGO mission deserves coverage that compounds.",
    body: `      <h2>Why volume isn't the metric</h2>
      <p>A common mistake in NGO media relations is treating earned coverage as a volume game — measure success by clip count, optimize for placements wherever they land. The result is a wall of low-leverage coverage that doesn't change donor behavior or policy attention.</p>
      <p>The NGOs that break through do something different. They identify the specific outlets and reporters whose coverage actually moves the audiences the NGO depends on — major individual donors, institutional funders, peer NGOs, policy press, the platforms that book panels at CGI and the UN. Then they invest disproportionately in those relationships.</p>

      <h2>What I deliver</h2>
      <ul>
        <li><strong>Earned-media strategy.</strong> Identifying which outlets and reporters move the audiences your NGO actually depends on — and where the marginal pitch goes.</li>
        <li><strong>Pitch development and reporter outreach.</strong> Story angles, spokesperson selection, embargo strategy, and the discipline to pitch fewer outlets, better.</li>
        <li><strong>Spokesperson and panel placement.</strong> The work of getting NGO leadership and program experts onto the platforms — panels, conferences, expert lists — that build long-term authority.</li>
        <li><strong>Bilingual press infrastructure</strong> for NGOs whose constituencies span English and Spanish-speaking communities.</li>
      </ul>

      <h2>Where the work shows up</h2>
      <p>The SOS Children's Villages USA campaign — earned coverage in AP, NBC, CNN, Reuters, and The Atlantic, plus a HuffPost / Johnson &amp; Johnson partnership and panel placements at the Clinton Global Initiative and the UN Foundation — is the case study I'd point to. <a href="/work/sos-villages/">Web traffic doubled and held.</a> But the headline numbers are downstream of the harder choice: pitch fewer outlets, better, and design the channels to reinforce each other rather than compete for budget.</p>

      <p class="pullquote">"Most NGO campaigns run paid, earned, and partnerships as separate workstreams that happen to share a logo. The ones that compound have a single editorial spine."</p>

      <h2>When to bring me in</h2>
      <p>Before the next signature campaign. Earned coverage that compounds is the result of relationships built before the campaign, not the volume of outreach during it.</p>`,
    related: [
      { href: "/work/sos-villages/", label: "How an integrated campaign doubled SOS Children's Villages' web traffic" },
      { href: "/work/red-cross/", label: "Storytelling that moves people: a Red Cross feature about earthquake survivors" },
    ],
  },

  // ============================================================
  // BRAND & NARRATIVE × audiences (3)
  // ============================================================
  {
    serviceSlug: "brand-narrative-strategy",
    audienceSlug: "foundations",
    audienceType: "Foundations and grantmakers",
    title: "Brand Strategy for Foundations",
    metaDescription:
      "Brand and narrative strategy for foundations and grantmakers. Positioning, voice, and story architecture for institutions whose work is layered, careful, and easy to mis-describe.",
    breadcrumbName: "Foundations",
    eyebrow: "Service · S · 01 · Foundations",
    h1: "Brand Strategy for <em>Foundations</em>",
    lede: "Foundations are some of the hardest organizations to brand well. The work is layered, the audiences are sophisticated, and the wrong language flattens decades of careful program design into a tagline.",
    ctaText: "Foundation language no longer matching the work?",
    body: `      <h2>Why foundation brand work is hard</h2>
      <p>Most foundation brand projects start in the same place: a strategic plan refresh, a new president, a major program expansion, or a board concern that the public-facing language no longer matches what the foundation actually does. The temptation is to hand the project to an agency that does corporate brand work and expect the deliverable to translate.</p>
      <p>It usually doesn't. Foundation audiences — grantees, peer funders, board, policy press, communities served — read brand work for signal about the foundation's actual values, theory of change, and decision-making. Performative brand work is read as performative. The language has to come out of the work, not be applied to it.</p>

      <h2>What I deliver</h2>
      <ul>
        <li><strong>Positioning audits.</strong> What the foundation says about itself versus what its grantees, peer funders, and constituencies actually hear — with the gap mapped concretely.</li>
        <li><strong>Voice and tone work.</strong> Plain-language, foundation-appropriate, and useful to the program staff who actually do the writing — not just the communications director.</li>
        <li><strong>Story architecture.</strong> The 3–5 story pillars that anchor everything from the homepage to the annual report to the program-area announcement, without flattening the program design.</li>
        <li><strong>Bilingual brand work</strong> for foundations whose grantees and constituencies span English and Spanish-speaking communities.</li>
      </ul>

      <h2>Where the work shows up</h2>
      <p>SOS Children's Villages USA was structurally a brand project: a national NGO with limited US visibility, building the language and story architecture that would let an integrated campaign double its web traffic and earn coverage in AP, NBC, CNN, Reuters, and The Atlantic. The work that came out of that project — story pillars, voice and tone direction, the choice to lead with what's happening in the lives of the children supported rather than what the organization does — was foundation-relevant brand work in NGO context. The discipline transfers directly.</p>

      <p class="pullquote">"Foundation audiences read brand work for signal about actual values and decision-making. Performative brand work gets read as performative."</p>

      <h2>When to bring me in</h2>
      <p>At the start of a strategic plan refresh, a leadership transition, a major program expansion, or whenever the public-facing language no longer matches the work. The earlier the engagement, the less the brand work fights against an already-set strategy.</p>`,
    related: [
      { href: "/work/sos-villages/", label: "How an integrated campaign doubled SOS Children's Villages' web traffic" },
      { href: "/work/red-cross/", label: "Storytelling that moves people: a Red Cross feature about earthquake survivors" },
    ],
  },
  {
    serviceSlug: "brand-narrative-strategy",
    audienceSlug: "charter-schools",
    audienceType: "Charter school networks",
    title: "Brand Strategy for Charter School Networks",
    metaDescription:
      "Brand and narrative strategy for charter school networks. Positioning, voice, and story architecture that match the model on the ground — and that hold up under the political scrutiny charters face.",
    breadcrumbName: "Charter Schools",
    eyebrow: "Service · S · 01 · Charter Schools",
    h1: "Brand Strategy for <em>Charter School Networks</em>",
    lede: "A charter network's brand has to do double duty: convince families to enroll and hold up under political scrutiny that district schools don't face. The language has to be both warm and defensible.",
    ctaText: "Network language not yet matching what's happening on the ground?",
    body: `      <h2>The double brief of charter brand work</h2>
      <p>Charter school networks live in two conversations at once. One is the family-facing conversation — open houses, enrollment season, family information sessions, the daily work of getting families to choose this school for their child. The other is the policy-facing conversation — about charters generally, about authorizer relationships, about what the network represents in the local district fight.</p>
      <p>Brand work that only addresses one of these two leaves the network exposed in the other. Family-friendly language that can't hold up to a critical reporter doesn't survive the next news cycle. Policy-defensive language that doesn't translate to families empties the seats.</p>

      <h2>What I deliver</h2>
      <ul>
        <li><strong>Positioning audits.</strong> What the network says about itself versus what families, district authorizers, and local press actually hear — mapped concretely.</li>
        <li><strong>Voice and tone work.</strong> Language that's warm enough for families and rigorous enough for press — and that the school staff using it daily can keep using consistently.</li>
        <li><strong>Story architecture.</strong> The 3–5 story pillars that anchor every channel — homepage, enrollment marketing, board reporting, press response, family communications — without flattening the academic model.</li>
        <li><strong>Bilingual brand work</strong> for networks whose families are predominantly Spanish-speaking. Both versions designed for their audience, not derived from one another.</li>
      </ul>

      <h2>Where the work shows up</h2>
      <p>I currently lead marketing and communications at School in the Square, a PreK–12 dual-language English/Spanish public charter network in Washington Heights and Inwood serving 800+ students. The brand work in that role — building the language that holds up across enrollment season, board reporting, family communications, press response, and crisis comms — is the same work consulting clients hire me to install or strengthen for them in compressed time. The infrastructure is portable.</p>

      <p class="pullquote">"Family-friendly language that can't hold up under critical press scrutiny doesn't survive the next news cycle. Policy-defensive language that doesn't translate to families empties the seats."</p>

      <h2>When to bring me in</h2>
      <p>Before enrollment season. Before the next board strategic-plan refresh. Before the brand refresh that's already on the calendar for next year. Building the language once, properly, is cheaper than rebuilding it after a rough press cycle.</p>`,
    related: [
      { href: "/work/sos-villages/", label: "How an integrated campaign doubled SOS Children's Villages' web traffic" },
    ],
  },
  {
    serviceSlug: "brand-narrative-strategy",
    audienceSlug: "research-institutions",
    audienceType: "Research institutions",
    title: "Brand Strategy for Research Institutions",
    metaDescription:
      "Brand and narrative strategy for research institutions, academic centers, and schools of public health. Positioning, voice, and story architecture that respect the work and earn the audiences it deserves.",
    breadcrumbName: "Research Institutions",
    eyebrow: "Service · S · 01 · Research Institutions",
    h1: "Brand Strategy for <em>Research Institutions</em>",
    lede: "Research institutions have a translation problem more often than a brand problem. The work is real, the impact is measurable, but the language built up for grant reports and academic audiences doesn't move the public, the press, or the next class of students.",
    ctaText: "Research deserves language as good as the work.",
    body: `      <h2>The translation problem</h2>
      <p>Most research institutions don't have a brand problem. They have a translation problem. The research is rigorous; the faculty are recognized; the programs are doing real work. But the public-facing language has accreted from grant proposals, journal abstracts, and accreditation documents into something that doesn't sound like anyone in particular — and doesn't help reporters, prospective students, or potential donors understand what makes the work distinctive.</p>
      <p>The brand work for a research institution starts with what's already true and builds the language back out: who specifically the institution serves, what specifically it does that no peer institution does, and what that sounds like in the voice of the researchers and program staff who actually do the work.</p>

      <h2>What I deliver</h2>
      <ul>
        <li><strong>Positioning audits.</strong> What the institution says about itself versus what prospective students, faculty hires, donors, peer institutions, and press actually hear — mapped concretely.</li>
        <li><strong>Voice and tone work.</strong> Plain English, plus the voice that the program staff and faculty experts can actually use without sounding like marketing has captured them.</li>
        <li><strong>Story architecture.</strong> The 3–5 story pillars that anchor every channel — homepage, recruiting materials, press releases, donor communications — without flattening the research.</li>
        <li><strong>Editorial direction</strong> for annual reports, year-in-review communications, and the long-form content that surfaces faculty work to general audiences.</li>
      </ul>

      <h2>Where the work shows up</h2>
      <p>FIU Robert Stempel College of Public Health &amp; Social Work was the foundational context — building brand and editorial work for a school of public health where the audiences ranged from prospective graduate students to research funders to general-audience press to the agency partners who participated in the school's hands-on programming. <a href="/work/fiu-disaster-drill/">The release for the multi-agency disaster simulation</a> — picked up by CBS News Miami — was downstream of brand work that had positioned the school's hands-on academic identity as the lead, not the curriculum description.</p>

      <p class="pullquote">"Most research institutions don't have a brand problem. They have a translation problem. The work is real; the language built up for grants doesn't help reporters or students understand it."</p>

      <h2>When to bring me in</h2>
      <p>At the start of a strategic plan, a leadership transition, a school or center launch, or whenever the language built for grants is no longer serving the public-facing work.</p>`,
    related: [
      { href: "/work/fiu-disaster-drill/", label: "How a graduate field course at FIU got national press for being hands-on" },
      { href: "/work/sos-villages/", label: "How an integrated campaign doubled SOS Children's Villages' web traffic" },
    ],
  },

  // ============================================================
  // COMMUNITY ENGAGEMENT × audiences (3)
  // ============================================================
  {
    serviceSlug: "community-engagement",
    audienceSlug: "dual-language-schools",
    audienceType: "Dual-language schools",
    title: "Community Engagement for Dual-Language Schools",
    metaDescription:
      "Community engagement strategy for dual-language schools. Family engagement, neighborhood partnerships, and bilingual community communications that match the academic model.",
    breadcrumbName: "Dual-Language Schools",
    eyebrow: "Service · S · 04 · Dual-Language Schools",
    h1: "Community Engagement for <em>Dual-Language Schools</em>",
    lede: "Community engagement at a dual-language school is not an event-planning function. It is the daily infrastructure that determines whether the families and the neighborhood see the school as theirs.",
    ctaText: "Engagement infrastructure that holds across a school year?",
    body: `      <h2>What community engagement actually means at a dual-language school</h2>
      <p>The phrase "community engagement" tends to get used to describe one-off events: family nights, ribbon cuttings, neighborhood open houses. Those matter. But the engagement that actually holds is structural — the weekly newsletter that families read because it tells them what they need to know, the bilingual hotline that gets answered, the relationship with the local block association, the partnerships with neighborhood organizations that have lived in the same blocks for longer than the school has.</p>
      <p>For a dual-language school, the bilingual layer is non-negotiable. Engagement that's only legible in English to half the families isn't engagement.</p>

      <h2>What I deliver</h2>
      <ul>
        <li><strong>Family engagement infrastructure.</strong> The weekly and monthly communications cadence — bilingual, plain-language, and designed to be useful, not impressive.</li>
        <li><strong>Neighborhood partnership strategy.</strong> Identifying the local organizations, businesses, and civic actors whose relationships matter to the school, and building the partnerships that hold across years.</li>
        <li><strong>Family-facing programs.</strong> Workshops, listening sessions, family information sessions — designed bilingual from the brief stage.</li>
        <li><strong>Crisis-ready communications.</strong> The infrastructure that holds up when a hard moment arrives, so that families hear from the school directly rather than from social media first.</li>
      </ul>

      <h2>Where the work shows up</h2>
      <p>I currently lead marketing and communications at School in the Square, a PreK–12 dual-language English/Spanish public charter network in Washington Heights and Inwood serving 800+ students. The day-to-day work — running the family engagement cadence, building neighborhood partnerships, managing bilingual communications across enrollment season and the academic year — is the same infrastructure consulting clients hire me to install or strengthen for them.</p>

      <p class="pullquote">"Engagement that's only legible in English to half the families isn't engagement. It's a missed audience the school is trying to serve."</p>

      <h2>When to bring me in</h2>
      <p>Before the next school year. Before enrollment season. Before the brand refresh or strategic plan that's about to drive engagement work. Building the infrastructure once, properly, is cheaper than rebuilding it every year.</p>`,
    related: [
      { href: "/work/sos-villages/", label: "How an integrated campaign doubled SOS Children's Villages' web traffic" },
    ],
  },
  {
    serviceSlug: "community-engagement",
    audienceSlug: "health-clinics",
    audienceType: "Community health clinics",
    title: "Community Engagement for Health Clinics",
    metaDescription:
      "Community engagement strategy for community health clinics. Bilingual outreach, trusted-messenger partnerships, and patient communications that bring the community in rather than pushing services out.",
    breadcrumbName: "Health Clinics",
    eyebrow: "Service · S · 04 · Health Clinics",
    h1: "Community Engagement for <em>Health Clinics</em>",
    lede: "Community engagement at a health clinic isn't a marketing exercise. It is the work of being the trusted institution patients turn to, which determines whether outreach campaigns work, whether enrollment-period pushes land, and whether patients show up for the screening day.",
    ctaText: "Engagement that turns the clinic into a trusted institution?",
    body: `      <h2>What clinic engagement actually requires</h2>
      <p>The clinics that lead in community engagement do something most clinics don't: they invest in being part of the community before they need anything from it. The relationships with neighborhood civic groups, the partnerships with schools, the trusted-messenger network of community health workers, the bilingual patient-education infrastructure — all of it gets built before the next vaccination campaign needs it. So when the campaign arrives, the trust is already there.</p>
      <p>Clinics that only show up at the community-facing event circuit when there's a metric to hit get treated accordingly. The trust isn't transactional.</p>

      <h2>What I deliver</h2>
      <ul>
        <li><strong>Trusted-messenger partnerships.</strong> Community health workers, faith leaders, neighborhood civic groups — the relationships that determine whether a campaign reaches the patients it needs to reach.</li>
        <li><strong>Patient education and outreach materials.</strong> Bilingual, plain-language, and designed for the populations the clinic actually serves — not the populations the marketing template assumes.</li>
        <li><strong>Outreach campaign architecture.</strong> Vaccination, screening, enrollment, public-health campaigns that combine earned media, paid distribution, and trusted-messenger relationships into a single campaign rather than parallel workstreams.</li>
        <li><strong>Crisis-ready communications</strong> for the moments when the clinic needs to communicate quickly to a community that already trusts it.</li>
      </ul>

      <h2>Where the work shows up</h2>
      <p>The American Red Cross response work — Mexican earthquake response, COVID coordination, biomedical services — was structurally community engagement under crisis pressure: identifying the community partners, the trusted messengers, and the bilingual infrastructure required to communicate with affected communities at the speed events demanded. FIU Robert Stempel College of Public Health &amp; Social Work added the layer of public-health communications and research-translation work that bridges clinical knowledge and patient understanding. The connective discipline transfers directly to clinic-side community engagement.</p>

      <p class="pullquote">"Clinics that only show up at community events when there's a metric to hit get treated transactionally. The trust isn't built that way."</p>

      <h2>When to bring me in</h2>
      <p>Before the next outreach push. Before flu season, enrollment period, or whatever the next major campaign cycle is. Engagement infrastructure built once, properly, compounds across every campaign that follows.</p>`,
    related: [
      { href: "/work/red-cross/", label: "Storytelling that moves people: a Red Cross feature about earthquake survivors" },
      { href: "/work/sos-villages/", label: "How an integrated campaign doubled SOS Children's Villages' web traffic" },
    ],
  },
  {
    serviceSlug: "community-engagement",
    audienceSlug: "immigrant-services",
    audienceType: "Immigrant services organizations",
    title: "Community Engagement for Immigrant Services",
    metaDescription:
      "Community engagement strategy for immigrant services organizations. Bilingual outreach, trusted-messenger networks, and client-facing communications that keep the organization in the rooms that matter.",
    breadcrumbName: "Immigrant Services",
    eyebrow: "Service · S · 04 · Immigrant Services",
    h1: "Community Engagement for <em>Immigrant Services</em>",
    lede: "For an immigrant services organization, community engagement is not optional infrastructure. It is the difference between an organization that the community trusts and an organization that runs programs in the community.",
    ctaText: "Engagement infrastructure that holds across the program year?",
    body: `      <h2>The trust calculus</h2>
      <p>Immigrant services organizations operate in communities where trust in institutions is conditional, hard-won, and easy to lose. A policy change, an ICE incident, a leadership transition, a misstep in client communications — any of these can erode trust the organization spent years building. And trust lost in this space is harder to rebuild than in almost any other.</p>
      <p>The organizations that hold up across hard cycles do so because they invested in the engagement infrastructure during the quiet quarters. Trusted messenger networks that already exist when a community alert needs to go out. Partnerships with community organizations that already trust the work. Client-facing communications that already feel like the organization's voice, in both languages.</p>

      <h2>What I deliver</h2>
      <ul>
        <li><strong>Trusted-messenger partnerships.</strong> Community organizations, faith leaders, civic groups, and individual messengers whose relationships with the community matter more than the organization's own brand.</li>
        <li><strong>Client-facing engagement.</strong> Workshops, listening sessions, intake events, and the day-to-day client communications that determine whether the organization is in the rooms that matter.</li>
        <li><strong>Bilingual community communications.</strong> Newsletters, alerts, program announcements, urgent communications. Spanish-speaking clients should not be reading translations of English communications.</li>
        <li><strong>Crisis-ready engagement</strong> for moments when the community needs to hear from the organization quickly and accurately, in both languages, through the channels community members actually use.</li>
      </ul>

      <h2>Where the work shows up</h2>
      <p>SOS Children's Villages USA work was structurally adjacent — engaging communities across the US and Latin America where the organization served children and families, often in immigrant-receiving communities, with bilingual communications and trusted-partner relationships built into the campaign architecture. American Red Cross response work in Mexican-American communities during disaster response added the layer of community engagement under live pressure. Both inform the immigrant services engagement playbook.</p>

      <p class="pullquote">"Trust lost in this space is harder to rebuild than in almost any other. The engagement infrastructure has to be built during the quiet quarters."</p>

      <h2>When to bring me in</h2>
      <p>Before the next program cycle. Before the next major policy announcement that will affect the community served. Before the next press cycle that may turn on the organization. The engagement infrastructure built ahead of time is what holds when something hard arrives.</p>`,
    related: [
      { href: "/work/sos-villages/", label: "How an integrated campaign doubled SOS Children's Villages' web traffic" },
      { href: "/work/red-cross/", label: "Storytelling that moves people: a Red Cross feature about earthquake survivors" },
    ],
  },

  // ============================================================
  // EDITORIAL & CONTENT × audiences (3)
  // ============================================================
  {
    serviceSlug: "editorial-content",
    audienceSlug: "foundation-annual-reports",
    audienceType: "Foundations producing annual reports",
    title: "Editorial Direction for Foundation Annual Reports",
    metaDescription:
      "Editorial direction for foundation annual reports. Story selection, narrative architecture, and write-through that turn the annual cycle into a publication grantees and peer funders actually read.",
    breadcrumbName: "Foundation Annual Reports",
    eyebrow: "Service · S · 05 · Foundation Annual Reports",
    h1: "Editorial Direction for <em>Foundation Annual Reports</em>",
    lede: "The foundation annual report is the publication grantees, peer funders, and the board read to take the foundation's measure. Most read like a list of grants. The ones that do their job read like a publication.",
    ctaText: "Annual report cycle starting? The editorial work begins now.",
    body: `      <h2>Why most foundation annuals don't land</h2>
      <p>The default foundation annual report is a list of grants, a financial summary, a letter from the president, and a few photos. It's accurate and ignorable. It gets read by the people who have to read it — auditors, board, the most diligent grantees — and not by the audiences the foundation hopes will read it.</p>
      <p>The foundation annuals that get read do something different. They make editorial choices. They pick a small number of stories that say something specific about how the foundation thinks about its work. They write through with voice and craft. They treat the publication as a publication, not a deliverable.</p>

      <h2>What I deliver</h2>
      <ul>
        <li><strong>Editorial direction across the cycle.</strong> Story selection, narrative architecture, source identification, and the editorial calendar that turns "the annual" into something that gets started in spring rather than panicked in fall.</li>
        <li><strong>Write-through and voice.</strong> The features, the letter from the president, the program-area essays — written with the voice of the people doing the work, not the voice that grant-report writing has accreted into.</li>
        <li><strong>Bilingual editorial</strong> for foundations whose grantees and constituencies span English and Spanish-speaking communities. Both versions designed for their audience, not derived from one another.</li>
        <li><strong>Production direction.</strong> Working with design and production partners to make sure the editorial voice survives the layout process.</li>
      </ul>

      <h2>Where the work shows up</h2>
      <p>The annual report and editorial work I led at FIU Robert Stempel College of Public Health &amp; Social Work was structurally similar to foundation editorial: a research institution with multiple program areas, layered audiences (students, faculty, donors, partners, peer institutions), and a year's worth of work to be told as a publication rather than a list of activities. The editorial discipline — story selection, voice work, write-through, production — transfers directly to foundation annual cycles.</p>

      <p class="pullquote">"The foundation annual that doesn't get read is the one that lists every grant. The one that gets read makes editorial choices."</p>

      <h2>When to bring me in</h2>
      <p>At the start of the annual cycle, not in the middle of it. The editorial decisions that distinguish a publication from a deliverable are made in spring, not when copy is due in fall.</p>`,
    related: [
      { href: "/work/sos-villages/", label: "How an integrated campaign doubled SOS Children's Villages' web traffic" },
      { href: "/work/fiu-disaster-drill/", label: "How a graduate field course at FIU got national press for being hands-on" },
    ],
  },
  {
    serviceSlug: "editorial-content",
    audienceSlug: "research-translations",
    audienceType: "Research institutions translating findings for general audiences",
    title: "Translating Research for General Audiences",
    metaDescription:
      "Editorial work that translates research findings into language general-audience readers can use. Long-form features, op-eds, explainers, and press materials for research institutions and academic centers.",
    breadcrumbName: "Research Translations",
    eyebrow: "Service · S · 05 · Research Translations",
    h1: "Translating Research for <em>General Audiences</em>",
    lede: "Research findings live or die on whether anyone outside the field reads them. The editorial work is to make the findings legible without flattening what makes them findings worth reading.",
    ctaText: "Research that deserves general-audience attention?",
    body: `      <h2>The translation problem in research editorial</h2>
      <p>Most research-to-public editorial fails in one of two directions. It over-simplifies — strips out the specificity that made the research worth doing, leaves a generic claim that any reader could have made without the study. Or it under-translates — preserves the academic register, leaves the general-audience reader stranded in a paragraph of jargon, and ends up being read only by the field that already knows the work.</p>
      <p>The middle is harder than it looks. It requires editorial judgment about what specificity to keep, what jargon to translate, and what structural choices make the piece readable to a non-specialist without betraying the research.</p>

      <h2>What I deliver</h2>
      <ul>
        <li><strong>Long-form features and explainers.</strong> Pieces that take a research finding and write it through for a general audience without losing the technical specificity that made the work worth doing.</li>
        <li><strong>Op-eds and bylined pieces.</strong> Working with researchers to produce op-eds that get placed and that the researcher actually wants to put their name on.</li>
        <li><strong>Press materials for findings.</strong> Releases, Q&amp;A docs, and embargo-stage materials that anticipate what reporters will ask and answer it before they ask.</li>
        <li><strong>Bilingual editorial</strong> when the research has direct relevance to Spanish-speaking communities. Both versions designed for their audience, not derived from one another.</li>
      </ul>

      <h2>Where the work shows up</h2>
      <p>FIU Robert Stempel College of Public Health &amp; Social Work was the foundational context — translating clinical and public-health research into press releases, features, and explainers for general audiences. <a href="/work/fiu-disaster-drill/">The press release for the multi-agency disaster simulation</a>, picked up by CBS News Miami, was downstream of editorial discipline that prioritized what a general-audience reporter could see and use over what an academic abstract would say. American Red Cross biomedical-services work added the dimension of communicating about clinical research to donor-facing and media audiences.</p>

      <p class="pullquote">"Most research-to-public editorial either oversimplifies or under-translates. The middle requires judgment about what specificity to keep."</p>

      <h2>When to bring me in</h2>
      <p>Before a major findings release. Before the next op-ed pitch cycle. Before the explainer that's been on the to-do list for six months and keeps getting outranked by something more urgent.</p>`,
    related: [
      { href: "/work/fiu-disaster-drill/", label: "How a graduate field course at FIU got national press for being hands-on" },
      { href: "/work/sos-villages/", label: "How an integrated campaign doubled SOS Children's Villages' web traffic" },
    ],
  },
  {
    serviceSlug: "editorial-content",
    audienceSlug: "higher-ed-publications",
    audienceType: "Higher education publications",
    title: "Editorial for Higher Ed Publications",
    metaDescription:
      "Editorial direction for higher education publications — alumni magazines, year-in-review reports, school and center publications. Editorial that respects the institution and earns the audiences it deserves.",
    breadcrumbName: "Higher Ed Publications",
    eyebrow: "Service · S · 05 · Higher Ed Publications",
    h1: "Editorial for <em>Higher Ed Publications</em>",
    lede: "The university publication that gets read does something the default doesn't: it makes editorial choices, treats the audience as readers rather than recipients, and preserves the voice of the people who actually do the work.",
    ctaText: "Alumni magazine, school publication, or year-in-review cycle starting?",
    body: `      <h2>What university publications usually get wrong</h2>
      <p>The default university publication — alumni magazine, year-in-review, school or center annual — covers a lot and says little. Each program area gets equal weight. Each story is written in institutional voice. The publication arrives in mailboxes and goes mostly unread, except for the class notes section.</p>
      <p>The publications that get read make editorial choices. They give weight to a small number of stories. They use first-person where it serves. They preserve the specificity of the people doing the work. They treat the publication as a publication, not a coverage document.</p>

      <h2>What I deliver</h2>
      <ul>
        <li><strong>Editorial direction for the cycle.</strong> Story selection, narrative architecture, source identification, and the editorial calendar that turns the cycle into a publication rather than a deadline crunch.</li>
        <li><strong>Long-form features and write-throughs.</strong> The features, profiles, and program-area pieces that anchor the publication.</li>
        <li><strong>Voice direction across contributors.</strong> When the publication has multiple contributing writers — communications staff, faculty, students — the editorial voice has to hold across the contributions. That's editorial direction work, not a copy-edit step.</li>
        <li><strong>Production direction.</strong> Working with design and production partners to ensure the editorial voice survives the layout process.</li>
      </ul>

      <h2>Where the work shows up</h2>
      <p>FIU Robert Stempel College of Public Health &amp; Social Work was where I built higher-ed editorial discipline — annual reports, year-in-review communications, press materials, faculty editorial work. The press release for FIU's multi-agency disaster simulation, picked up by CBS News Miami, was downstream of the same editorial muscle: lead with what's visible, name the partners, respect the reader's time. The discipline transfers directly to alumni magazines, school publications, and year-in-review cycles at any university or college willing to put the work in at the editorial-direction stage.</p>

      <p class="pullquote">"The university publication that gets read makes editorial choices. The default covers a lot and says little."</p>

      <h2>When to bring me in</h2>
      <p>At the start of the cycle, not in the middle of it. The editorial decisions that distinguish a publication from a coverage document are made when the editorial calendar is being built, not when copy is due.</p>`,
    related: [
      { href: "/work/fiu-disaster-drill/", label: "How a graduate field course at FIU got national press for being hands-on" },
      { href: "/work/sos-villages/", label: "How an integrated campaign doubled SOS Children's Villages' web traffic" },
    ],
  },

  // ============================================================
  // GEOGRAPHIC × bilingual-campaigns (3)
  // ============================================================
  {
    serviceSlug: "bilingual-campaigns",
    audienceSlug: "nyc",
    audienceType: "New York City nonprofits and education organizations",
    title: "Bilingual Communications Consultant in New York City",
    metaDescription:
      "Bilingual (EN/ES) communications consultant based in New York City. Strategic communications for NYC nonprofits, schools, NGOs, and foundations whose audiences are bilingual.",
    breadcrumbName: "New York City",
    eyebrow: "Service · S · 06 · New York City",
    h1: "Bilingual Communications Consultant in <em>New York City</em>",
    lede: "Bilingual (EN/ES) communications consulting, based in New York City, for the nonprofits, schools, NGOs, and foundations whose audiences are bilingual by default — not by translation.",
    ctaText: "NYC organization with a bilingual audience? Let's talk.",
    body: `      <h2>Why NYC is a bilingual market</h2>
      <p>New York City's nonprofit, education, and NGO sectors operate in one of the most bilingual environments in the United States. School networks across Washington Heights, Inwood, Sunset Park, Jackson Heights, and the South Bronx serve majority-Spanish-speaking families. Foundations whose grantees serve those communities issue grants and reports that reach a bilingual field. NGOs headquartered in NYC run global programs in Spanish-speaking countries. Health clinics across the boroughs serve patients in two languages every day.</p>
      <p>And yet, the consulting market that serves these organizations often doesn't reflect the bilingual reality of the work. Communications get built in English and translated late, by translators who don't know the work. The Spanish version reads like exactly what it is.</p>

      <h2>What I deliver to NYC organizations</h2>
      <ul>
        <li><strong>Bilingual brand and narrative work.</strong> Built bilingual from the brief stage, with both languages treated as primary.</li>
        <li><strong>Bilingual family, client, and community communications.</strong> The day-to-day infrastructure that determines whether the communities served feel served or translated for.</li>
        <li><strong>Spanish-language media relations.</strong> Univision, Telemundo, El Diario NY, regional Spanish-language outlets — channels with their own beat reporters, expectations, and timelines.</li>
        <li><strong>Crisis communications</strong> in both languages, at the speed New York City news cycles actually move.</li>
      </ul>

      <h2>Where the work shows up locally</h2>
      <p>I currently lead marketing and communications at School in the Square, a PreK–12 dual-language English/Spanish public charter network in Washington Heights and Inwood serving 800+ students. The day-to-day NYC bilingual comms work — family engagement, enrollment season, board reporting, press response, crisis comms, neighborhood partnerships — is part of the role. Consulting clients in NYC and beyond hire me to bring that infrastructure into their own organizations on a compressed timeline.</p>

      <p class="pullquote">"NYC is one of the most bilingual nonprofit markets in the United States. The consulting market that serves it should reflect that."</p>

      <h2>When to bring me in</h2>
      <p>Before the next major campaign, brand cycle, enrollment season, or annual report cycle. Available for NYC-based engagements and remote work. Bilingual (EN/ES) by default.</p>`,
    related: [
      { href: "/work/sos-villages/", label: "How an integrated campaign doubled SOS Children's Villages' web traffic" },
      { href: "/work/red-cross/", label: "Storytelling that moves people: a Red Cross feature about earthquake survivors" },
    ],
  },
  {
    serviceSlug: "bilingual-campaigns",
    audienceSlug: "brooklyn",
    audienceType: "Brooklyn nonprofits and education organizations",
    title: "Bilingual Communications in Brooklyn",
    metaDescription:
      "Bilingual (EN/ES) communications consulting for Brooklyn-based nonprofits, schools, and community organizations whose audiences are bilingual.",
    breadcrumbName: "Brooklyn",
    eyebrow: "Service · S · 06 · Brooklyn",
    h1: "Bilingual Communications in <em>Brooklyn</em>",
    lede: "Brooklyn's bilingual neighborhoods — Sunset Park, Bushwick, parts of Bay Ridge, Williamsburg's outer blocks — deserve communications built for them, not translated to them.",
    ctaText: "Brooklyn-based organization serving bilingual communities?",
    body: `      <h2>Brooklyn's bilingual reality</h2>
      <p>Brooklyn's bilingual neighborhoods are not a single audience. Sunset Park's Spanish-speaking population, with its mix of Mexican, Central American, and Dominican communities, reads very differently than the Caribbean diasporic Spanish of parts of East Flatbush and Crown Heights, or the South American populations in pockets of Bushwick and Bay Ridge. The organizations serving these neighborhoods need communications that recognize the difference rather than flattening it.</p>
      <p>And in nearly every case, "bilingual" can't mean "English with a Spanish translation appended." The neighborhoods notice. The communications either feel like the organization belongs there, or they don't.</p>

      <h2>What I deliver to Brooklyn organizations</h2>
      <ul>
        <li><strong>Bilingual community-facing communications.</strong> The newsletters, alerts, program announcements, and family communications that determine whether the organization is part of the neighborhood's daily information environment.</li>
        <li><strong>Earned media in Spanish-language press.</strong> Univision, Telemundo, El Diario NY, and the regional and neighborhood-level Spanish-language outlets that move attention in specific Brooklyn communities.</li>
        <li><strong>Brand and narrative work</strong> for organizations whose Brooklyn-rooted identity is part of what they offer, and whose bilingual audiences deserve that identity in two languages.</li>
        <li><strong>Crisis communications</strong> in both languages, sequenced to reach the actual channels Brooklyn community members use.</li>
      </ul>

      <h2>Where the work shows up</h2>
      <p>The structural work I do — building bilingual communications infrastructure for organizations whose audiences are bilingual by default — is the same work I currently lead at School in the Square, a PreK–12 dual-language public charter network in Washington Heights and Inwood. The cross-borough discipline transfers: build bilingual from the brief stage, treat each audience as primary, and invest in the relationships and channels that actually reach the communities served.</p>

      <p class="pullquote">"Brooklyn's bilingual neighborhoods are not a single audience. Communications that recognize the difference land differently than communications that don't."</p>

      <h2>When to bring me in</h2>
      <p>Before the next major campaign, brand cycle, or community-facing program launch. Available for NYC-based engagements and remote work, with on-the-ground availability for Brooklyn-rooted organizations.</p>`,
    related: [
      { href: "/work/sos-villages/", label: "How an integrated campaign doubled SOS Children's Villages' web traffic" },
    ],
  },
  {
    serviceSlug: "bilingual-campaigns",
    audienceSlug: "manhattan",
    audienceType: "Manhattan nonprofits and education organizations",
    title: "Bilingual Communications in Manhattan",
    metaDescription:
      "Bilingual (EN/ES) communications consulting for Manhattan-based nonprofits, schools, NGOs, and foundations whose audiences are bilingual.",
    breadcrumbName: "Manhattan",
    eyebrow: "Service · S · 06 · Manhattan",
    h1: "Bilingual Communications in <em>Manhattan</em>",
    lede: "Manhattan's bilingual communities — Washington Heights, Inwood, El Barrio, and the Lower East Side — deserve organizations whose communications match the neighborhoods they're part of.",
    ctaText: "Manhattan organization serving a bilingual community?",
    body: `      <h2>Manhattan's bilingual neighborhoods</h2>
      <p>Manhattan's bilingual neighborhoods have their own histories, populations, and information environments. Washington Heights and Inwood, with their large Dominican populations, read different communications than El Barrio's predominantly Mexican and Puerto Rican community, or the Lower East Side's mix of long-rooted Spanish-speaking residents and newer arrivals.</p>
      <p>The organizations rooted in these neighborhoods — the schools, the clinics, the community organizations, the cultural institutions — depend on communications that treat the neighborhoods as audiences, not as sites of programming.</p>

      <h2>What I deliver to Manhattan organizations</h2>
      <ul>
        <li><strong>Bilingual community-facing communications.</strong> Family-facing, client-facing, and neighborhood-facing communications that determine whether the organization belongs to the community or operates in it.</li>
        <li><strong>Earned media in Spanish-language press.</strong> Univision, Telemundo, El Diario NY, and the regional Spanish-language outlets that move attention in Manhattan's bilingual neighborhoods.</li>
        <li><strong>Brand and narrative work</strong> built bilingual from the brief stage, with both languages treated as primary.</li>
        <li><strong>Crisis communications</strong> in both languages, sequenced for the actual channels Manhattan community members use.</li>
      </ul>

      <h2>Where the work shows up</h2>
      <p>I currently lead marketing and communications at School in the Square, a PreK–12 dual-language English/Spanish public charter network based in Washington Heights and Inwood, serving 800+ students. The community engagement infrastructure — bilingual family communications, neighborhood partnerships, enrollment season, crisis comms — is the day job. Consulting clients elsewhere in Manhattan and beyond hire me to install or strengthen that infrastructure for them on a compressed timeline.</p>

      <p class="pullquote">"The organizations rooted in Manhattan's bilingual neighborhoods depend on communications that treat the neighborhoods as audiences, not as sites of programming."</p>

      <h2>When to bring me in</h2>
      <p>Before the next major campaign, brand cycle, enrollment season, or annual report cycle. Available for NYC-based engagements and remote work, with on-the-ground availability for Manhattan-rooted organizations.</p>`,
    related: [
      { href: "/work/sos-villages/", label: "How an integrated campaign doubled SOS Children's Villages' web traffic" },
    ],
  },
];

let createdCount = 0;
let skippedCount = 0;

for (const p of pages) {
  const dir = join(PUBLIC, "services", p.serviceSlug, p.audienceSlug);
  const file = join(dir, "index.html");
  if (existsSync(file)) {
    skippedCount++;
    continue;
  }
  mkdirSync(dir, { recursive: true });
  writeFileSync(file, pageHtml(p), "utf8");
  createdCount++;
}

console.log(`Created: ${createdCount}, Skipped (already exists): ${skippedCount}`);
console.log(`Total in config: ${pages.length}`);
