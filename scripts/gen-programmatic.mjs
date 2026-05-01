// Generates the 25 remaining programmatic service × audience pages.
// Run with: node scripts/gen-programmatic.mjs
// Skips charter-schools and foundations under bilingual-campaigns (already done by agent).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const SERVICE_NAMES = {
  'bilingual-campaigns': { display: 'Bilingual Campaigns', num: 'S · 06', parent: 'Bilingual Campaigns' },
  'crisis-communications': { display: 'Crisis Communications', num: 'S · 03', parent: 'Crisis Communications' },
  'media-relations': { display: 'Media Relations', num: 'S · 02', parent: 'Media Relations' },
  'brand-narrative-strategy': { display: 'Brand & Narrative Strategy', num: 'S · 01', parent: 'Brand & Narrative Strategy' },
  'community-engagement': { display: 'Community Engagement', num: 'S · 04', parent: 'Community Engagement' },
  'editorial-content': { display: 'Editorial & Content', num: 'S · 05', parent: 'Editorial & Content' },
};

// Content configs for the 25 remaining combos. Voice-aligned, concrete connectors to her real career.
const PAGES = [
  // ─── Bilingual Campaigns × audiences (4 remaining) ───
  {
    slug: 'bilingual-campaigns/health-clinics',
    audience: 'Community Health Clinics',
    audienceTitle: 'Community Health Clinics',
    h1: ['Bilingual Communications for ', { em: 'Community Health Clinics' }],
    metaDesc: 'Bilingual (EN/ES) patient communications, family-facing materials, and Spanish-language media for community health clinics serving Spanish-speaking populations.',
    lede: 'Community health clinics serving Spanish-speaking populations need patient communications, family materials, and public health messaging that work the first time — not English content with a translation step that lands a week late.',
    sections: [
      { h2: 'The clinic-specific challenge', body: '<p>Public health communications fail predictably when they are translated rather than built bilingual. Patients miss appointment reminders that read awkwardly in Spanish. Vaccination outreach lands flat in communities where the trusted-messenger voice was never part of the brief. Crisis updates during a public health emergency arrive in Spanish hours after English — a gap clinics cannot afford.</p><p>The clinics that get this right have bilingual production discipline: writing in both languages from the brief stage, with cultural fluency, not just language fluency.</p>' },
      { h2: 'What I deliver', body: '<ul><li><strong>Patient and family communications.</strong> Appointment reminders, vaccination outreach, post-visit instructions, intake materials. Built bilingual.</li><li><strong>Spanish-language media relations on health stories.</strong> Univision, Telemundo, EFE, El Diario NY — the outlets where Spanish-speaking patients actually get health information.</li><li><strong>Crisis playbooks for public health events.</strong> Pre-built bilingual templates for outbreaks, recalls, service changes, weather closures.</li><li><strong>Cultural-fluency review for monolingual clinic comms teams.</strong> When your in-house team writes in English, I review and rewrite the Spanish.</li></ul>' },
      { h2: 'Where the work connects to my career', body: '<p>I led brand strategy, media relations, and editorial at FIU\'s Robert Stempel College of Public Health &amp; Social Work — one of the largest schools of public health in the country. Translating dense research into communications that reached general audiences (and Spanish-speaking audiences specifically) was the core of that role. The disaster preparedness work in particular involved coordinating multi-agency communications during simulated and real public health events.</p>' },
    ],
    pullquote: '"Patients miss appointment reminders that read awkwardly in Spanish. Vaccination outreach lands flat. Crisis updates arrive late. Clinics cannot afford the gap."',
    related: ['fiu-disaster-drill', 'sos-villages'],
  },
  {
    slug: 'bilingual-campaigns/immigrant-services',
    audience: 'Immigrant Services Organizations',
    audienceTitle: 'Immigrant Services Organizations',
    h1: ['Bilingual Campaigns for ', { em: 'Immigrant Services' }],
    metaDesc: 'Bilingual (EN/ES) communications for immigrant services nonprofits — built bilingual from the brief stage, with cultural fluency, not as a translation step.',
    lede: 'Immigrant services nonprofits cannot afford translation-step bilingual. The communities you serve are the most attuned audience in the country to which organizations actually communicate with them, and which ones perform bilingual without doing the work.',
    sections: [
      { h2: 'The challenge', body: '<p>Immigrant services orgs serve communities whose trust is hard-won. Spanish copy that reads as a translation — generic vocabulary, missing cultural references, the wrong register for the audience\'s country of origin — quietly erodes that trust over time. So does English-only crisis comms during a moment when the Spanish-speaking part of the audience needed information first.</p><p>The fix is structural: bilingual at the brief stage, with attention to which Spanish (Mexican, Caribbean, Andean, Southern Cone) matches the audience.</p>' },
      { h2: 'What I deliver', body: '<ul><li><strong>Bilingual member, family, and community communications.</strong> Built in both languages from day one with cultural register matched to the audience.</li><li><strong>Spanish-language media relations on immigrant rights, family separation, citizenship, and DACA stories.</strong></li><li><strong>Bilingual crisis playbooks</strong> for ICE enforcement events, policy changes, and rapid-response advocacy.</li><li><strong>Bilingual fundraising and donor communications.</strong> Spanish-speaking donors are a real and underserved audience.</li></ul>' },
      { h2: 'Where the work connects to my career', body: '<p>I currently lead marketing and communications at School in the Square, a PreK–12 dual-language English/Spanish public charter network in Washington Heights and Inwood — neighborhoods where immigrant services work happens every day. The family communications discipline transfers directly: bilingual at the brief stage, cultural fluency in both languages, audience-specific story selection.</p>' },
    ],
    pullquote: '"The communities you serve are the most attuned audience in the country to which organizations actually communicate with them, and which ones perform bilingual without doing the work."',
    related: ['sos-villages', 'red-cross'],
  },
  {
    slug: 'bilingual-campaigns/family-services',
    audience: 'Family Services Nonprofits',
    audienceTitle: 'Family Services Nonprofits',
    h1: ['Bilingual Communications for ', { em: 'Family Services' }],
    metaDesc: 'Bilingual (EN/ES) program communications, family-facing materials, and donor messaging for family services nonprofits whose audiences are predominantly Spanish-speaking.',
    lede: 'Family services nonprofits — child welfare, foster care, family preservation, parent support — work with audiences whose first language is often Spanish. Communications that treat Spanish as a translation step miss the families they are supposed to serve.',
    sections: [
      { h2: 'The challenge', body: '<p>Family services communications carry weight that other nonprofit comms do not. A foster placement update in awkward Spanish reads as cold to the family receiving it. A parenting class invitation translated badly never converts to attendance. A donor appeal about Spanish-speaking families written entirely in English signals that the organization talks <em>about</em> the community more than it talks <em>to</em> it.</p>' },
      { h2: 'What I deliver', body: '<ul><li><strong>Bilingual program and family communications.</strong> Updates, invitations, intake forms, post-program follow-up.</li><li><strong>Bilingual donor communications.</strong> Annual appeals, year-end campaigns, major-gift cultivation that respects the bilingual character of the work.</li><li><strong>Editorial: bilingual annual reports and impact stories.</strong> Built in both languages from the brief.</li><li><strong>Bilingual training materials</strong> for caseworkers and family-facing staff.</li></ul>' },
      { h2: 'Where the work connects to my career', body: '<p>The integrated bilingual campaign I led at SOS Children\'s Villages USA — partnering with HuffPost and Johnson &amp; Johnson — doubled the organization\'s web traffic and built a model for family-services storytelling that combined English and Spanish-language outlets without translating.</p>' },
    ],
    pullquote: '"A donor appeal about Spanish-speaking families written entirely in English signals that the organization talks <em>about</em> the community more than it talks <em>to</em> it."',
    related: ['sos-villages', 'red-cross'],
  },
  {
    slug: 'bilingual-campaigns/dual-language-schools',
    audience: 'Dual-Language Schools',
    audienceTitle: 'Dual-Language Schools',
    h1: ['Bilingual Campaigns for ', { em: 'Dual-Language Schools' }],
    metaDesc: 'Bilingual (EN/ES) family communications, enrollment marketing, and brand strategy for dual-language schools and charter networks. From a current operator.',
    lede: 'Dual-language schools have an obvious bilingual mandate — and a quiet trap. The mandate gets met in the classroom. The communications often do not. Family updates, enrollment marketing, and board reporting all need to be as bilingual as the school is.',
    sections: [
      { h2: 'The dual-language-specific challenge', body: '<p>Dual-language schools serve families whose linguistic expectation of the school is precise. If the school teaches in Spanish 50% of the time, families expect the school to communicate that way too. When the principal\'s weekly note arrives in fluent English and stilted Spanish, parents notice. The school is bilingual; the communications office often is not.</p>' },
      { h2: 'What I deliver', body: '<ul><li><strong>Bilingual family communications systems.</strong> ParentSquare, email, SMS, in-person — built bilingual with rotating-channel discipline.</li><li><strong>Enrollment marketing in both languages.</strong> Open houses, application materials, virtual tour scripts, follow-up sequences.</li><li><strong>Bilingual board and donor reporting.</strong> Annual reports, impact summaries, strategic plan rollouts.</li><li><strong>Crisis playbooks tailored to dual-language schools.</strong> Pre-built family templates for closures, incidents, and policy changes.</li></ul>' },
      { h2: 'Where the work connects to my career', body: '<p>I currently lead marketing and communications at School in the Square — a PreK–12 dual-language English/Spanish public charter network in Washington Heights and Inwood serving more than 800 students. Family communications, enrollment marketing, and board reporting at S² are bilingual at the brief stage, not the translation stage. The work transfers directly to other dual-language schools.</p>' },
    ],
    pullquote: '"The school is bilingual. The communications office often is not. Families notice."',
    related: ['sos-villages'],
  },

  // ─── Crisis Communications × audiences (5) ───
  {
    slug: 'crisis-communications/charter-schools',
    audience: 'Charter Schools',
    audienceTitle: 'Charter Schools',
    h1: ['Crisis Communications for ', { em: 'Charter Schools' }],
    metaDesc: 'Crisis communications playbooks, bilingual family templates, and rapid response for charter schools and charter networks. From a current charter-school comms lead.',
    lede: 'Charter schools sit at the intersection of three crisis genres: school-incident communications, family communications during school disruptions, and political crises around charter authorization. The playbooks for each are different. Most charters have none.',
    sections: [
      { h2: 'The crisis genres charter schools face', body: '<ul><li><strong>School-incident crises.</strong> A student injury, a staff resignation under cause, a security incident.</li><li><strong>Operational crises.</strong> Building closures, weather, transportation disruptions, staffing shortages.</li><li><strong>Political crises.</strong> Authorization renewal disputes, board controversy, district-level fights over charter expansion.</li><li><strong>Family-trust crises.</strong> A pattern of incidents that erodes the family relationship, often slow-burn and harder to reverse than a single event.</li></ul>' },
      { h2: 'What I deliver', body: '<ul><li><strong>Crisis playbooks tailored to your school or network.</strong> One playbook per crisis genre, with pre-approved family communications, board talking points, and press templates.</li><li><strong>Bilingual templates from day one.</strong> If your school serves Spanish-speaking families, your crisis comms must be bilingual at the brief stage.</li><li><strong>Spokesperson preparation</strong> for school leaders, board chairs, and authorizer-facing roles.</li><li><strong>On-the-ground coordination</strong> during active crises — working alongside legal, operations, and program leadership.</li></ul>' },
      { h2: 'Where the work connects to my career', body: '<p>I currently lead marketing and communications at School in the Square, a PreK–12 dual-language public charter network in Washington Heights and Inwood. The crisis playbooks I use day-to-day were built for a charter with 800+ students and bilingual families — exactly the audience and operating context most charter schools share.</p>' },
    ],
    pullquote: '"Charter schools sit at the intersection of three crisis genres. The playbooks for each are different. Most charters have none."',
    related: ['red-cross', 'fiu-disaster-drill'],
  },
  {
    slug: 'crisis-communications/foundations',
    audience: 'Foundations',
    audienceTitle: 'Foundations',
    h1: ['Crisis Communications for ', { em: 'Foundations' }],
    metaDesc: 'Crisis communications playbooks, board-facing comms, and grantee-relationship communications for foundations during reputational and operational crises.',
    lede: 'Foundation crises are quieter than corporate crises and slower to develop than nonprofit crises. They are also more reputation-sensitive: a foundation\'s name is its asset. The communications playbook has to match.',
    sections: [
      { h2: 'The foundation-specific crisis types', body: '<ul><li><strong>Grantee scandal communications.</strong> When a grantee is in the news for the wrong reasons, the foundation\'s response is scrutinized.</li><li><strong>Board-controversy communications.</strong> Trustee resignations, governance disputes, and family-foundation generational conflicts.</li><li><strong>Investment and fiduciary communications.</strong> Mission-aligned investment debates, divestment campaigns, and fiduciary scrutiny.</li><li><strong>Program-decision crises.</strong> Funding cuts, strategic pivots, and shifts that grantees and field stakeholders experience as betrayals.</li></ul>' },
      { h2: 'What I deliver', body: '<ul><li><strong>Crisis playbooks specific to foundation crisis genres.</strong></li><li><strong>Grantee communications during sensitive moments.</strong> The relationships you protect during a crisis are the ones that compound over decades.</li><li><strong>Board, trustee, and family-principal communications support.</strong></li><li><strong>Spokesperson preparation</strong> for foundation presidents and program officers facing press inquiries.</li></ul>' },
      { h2: 'Where the work connects to my career', body: '<p>National crisis communications at the American Red Cross — including disaster response coordination, executive media training, and earned-media management during high-pressure moments — transfers directly to foundation crisis work. The discipline is the same: speed, accuracy, humanity, in that order, under scrutiny.</p>' },
    ],
    pullquote: '"A foundation\'s name is its asset. The communications playbook has to match."',
    related: ['red-cross', 'sos-villages'],
  },
  {
    slug: 'crisis-communications/health-organizations',
    audience: 'Health Organizations',
    audienceTitle: 'Health Organizations',
    h1: ['Crisis Communications for ', { em: 'Health Organizations' }],
    metaDesc: 'Crisis communications for hospitals, clinics, public health agencies, and health nonprofits. Bilingual playbooks, spokesperson prep, and rapid response.',
    lede: 'Health organizations face crises with public health implications: outbreaks, recalls, patient-safety incidents, regulatory scrutiny, and pandemic-era operational disruptions. The communications must be fast, accurate, and bilingual where the patient population is.',
    sections: [
      { h2: 'The challenge', body: '<p>Health-organization crisis comms have a higher accuracy bar than most sectors. Misinformation at scale costs lives. Slow Spanish-language updates during a public health event leave entire patient populations operating on incomplete information. The internal coordination — between clinical, legal, operations, and communications — is harder than at a typical nonprofit.</p>' },
      { h2: 'What I deliver', body: '<ul><li><strong>Bilingual crisis communications playbooks</strong> for outbreaks, recalls, service changes, and patient-safety incidents.</li><li><strong>Spokesperson preparation</strong> for clinical leaders, including media training that respects the constraints of clinical credibility.</li><li><strong>Rapid response coordination</strong> across clinical, legal, operations, and communications during active crises.</li><li><strong>Spanish-language press relationships</strong> built in advance so they\'re available when you need them.</li></ul>' },
      { h2: 'Where the work connects to my career', body: '<p>I led national media strategy for the American Red Cross during COVID-19 and back-to-back disasters. The work included Satellite Media Tours during active events, executive media training, and bilingual spokesperson coordination. Earlier work at FIU\'s Robert Stempel College of Public Health translated public health research into communications for general audiences.</p>' },
    ],
    pullquote: '"Misinformation at scale costs lives. Slow Spanish-language updates during a public health event leave entire patient populations operating on incomplete information."',
    related: ['red-cross', 'fiu-disaster-drill'],
  },
  {
    slug: 'crisis-communications/higher-education',
    audience: 'Higher Education',
    audienceTitle: 'Higher Education Institutions',
    h1: ['Crisis Communications for ', { em: 'Higher Education' }],
    metaDesc: 'Crisis communications for universities, colleges, and graduate schools. Faculty incident response, campus-event coordination, and bilingual family communications.',
    lede: 'University crises are slow until they\'re fast. A faculty incident, a student protest, a Title IX matter, a campus-safety event — each one carries reputational consequences that outlast the news cycle by years.',
    sections: [
      { h2: 'The higher-ed-specific crisis genres', body: '<ul><li><strong>Faculty and staff incident communications.</strong></li><li><strong>Student-safety and Title IX communications.</strong></li><li><strong>Campus-event coordination</strong> during protests, weather events, or threats.</li><li><strong>Research-integrity and data-disclosure crises.</strong></li><li><strong>Bilingual family communications</strong> for institutions whose student populations are bilingual or multilingual.</li></ul>' },
      { h2: 'What I deliver', body: '<ul><li><strong>Crisis playbooks built for the academic calendar.</strong> Most university communications functions are understaffed during summer; the playbooks need to operate with reduced personnel.</li><li><strong>Spokesperson preparation</strong> for presidents, provosts, deans, and emergency-information officers.</li><li><strong>Bilingual family communications templates</strong> for campus events.</li><li><strong>Faculty media coordination</strong> when external press wants to talk to a researcher mid-crisis.</li></ul>' },
      { h2: 'Where the work connects to my career', body: '<p>I led brand strategy, media relations, and editorial at FIU\'s Robert Stempel College of Public Health &amp; Social Work — including the press release and earned-media work that resulted in CBS News Miami pickup of a multi-agency disaster simulation. The day-to-day operating context — academic calendar, research-faculty media coordination, and crisis response — is the operating context most higher-ed comms teams know.</p>' },
    ],
    pullquote: '"University crises are slow until they\'re fast. The reputational consequences outlast the news cycle by years."',
    related: ['fiu-disaster-drill', 'red-cross'],
  },
  {
    slug: 'crisis-communications/disaster-response-orgs',
    audience: 'Disaster Response Organizations',
    audienceTitle: 'Disaster Response Organizations',
    h1: ['Crisis Communications for ', { em: 'Disaster Response Organizations' }],
    metaDesc: 'Crisis and disaster communications for humanitarian organizations. National media coordination, Satellite Media Tours, bilingual spokesperson preparation.',
    lede: 'Disaster response organizations are professional crisis communicators. The discipline is what scales when the disasters are concurrent. The bilingual layer is what determines whether the response reaches the populations that need it most.',
    sections: [
      { h2: 'The challenge', body: '<p>Disaster comms during a single event is a challenge most organizations can solve. Disaster comms during three concurrent events, with national media in active engagement, with Satellite Media Tours running every other day, with field spokespersons being trained and deployed in 48-hour windows — that\'s a different discipline. The organizations that get it right have built the infrastructure long before they need it.</p>' },
      { h2: 'What I deliver', body: '<ul><li><strong>National media strategy and coordination</strong> during active disasters.</li><li><strong>Satellite Media Tour management</strong> for executive media coverage during high-pressure events.</li><li><strong>Field spokesperson training and deployment</strong> at scale — the mechanism for staffing 100+ spokespersons across overlapping zones.</li><li><strong>Bilingual crisis comms infrastructure.</strong> Spanish-language outlets, bilingual templates, and Spanish-speaking spokesperson rosters built in advance.</li></ul>' },
      { h2: 'Where the work connects to my career', body: '<p>I ran national media strategy for Biomedical Services at the American Red Cross during COVID-19 and concurrent disaster response. The work included executive media training for senior leadership, Satellite Media Tour management, training and deploying a 100+ field spokesperson roster, and the bilingual coordination that ensured Spanish-language coverage was not an afterthought during fast-moving events.</p>' },
    ],
    pullquote: '"The organizations that get disaster comms right have built the infrastructure long before they need it."',
    related: ['red-cross', 'sos-villages'],
  },

  // ─── Media Relations × audiences (4) ───
  {
    slug: 'media-relations/spanish-language-outlets',
    audience: 'Spanish-Language Outlets',
    audienceTitle: 'Spanish-Language Media Relations',
    h1: ['Spanish-Language ', { em: 'Media Relations' }],
    metaDesc: 'Spanish-language media relations: pitching to Univision, Telemundo, El Diario NY, EFE, and regional Spanish-language press. Built on cultural fluency, not translation.',
    lede: 'Spanish-language media relations is not a translation tactic. The outlets have their own beat reporters, their own editorial logic, their own deadlines. Pitching them as if they were English-language press translated to Spanish is the most common reason organizations get ignored.',
    sections: [
      { h2: 'What makes Spanish-language media relations different', body: '<p>Univision, Telemundo, EFE, El Diario NY, La Opinión, Hoy, and the regional Spanish-language press cover the same world as English-language outlets, but the angles, story selection, and source expectations are different. A pitch that lands at the New York Times will not necessarily land at El Diario NY — and vice versa.</p><p>The work is relational, like English-language media relations. The relationships take longer to build for organizations that are starting cold.</p>' },
      { h2: 'What I deliver', body: '<ul><li><strong>Pitching to Spanish-language press</strong> on the stories that fit their editorial logic.</li><li><strong>Spanish-language spokesperson preparation.</strong> Different register, often different cultural context, sometimes different content emphasis than the English version.</li><li><strong>Bilingual press releases</strong> built bilingual at the brief stage.</li><li><strong>Long-term relationship building</strong> with Spanish-language beat reporters.</li><li><strong>Cultural-fluency direction</strong> for monolingual comms teams pitching Spanish-language press for the first time.</li></ul>' },
      { h2: 'Where the work connects to my career', body: '<p>The integrated bilingual campaign at SOS Children\'s Villages — which doubled the organization\'s web traffic — included Spanish-language outlet coordination as architectural, not afterthought. National coverage in AP, NBC, CNN, Reuters, and The Atlantic was paired with Spanish-language coverage that reached the audience the campaign was actually for.</p>' },
    ],
    pullquote: '"A pitch that lands at the New York Times will not necessarily land at El Diario NY — and vice versa."',
    related: ['sos-villages', 'red-cross'],
  },
  {
    slug: 'media-relations/higher-education',
    audience: 'Higher Education',
    audienceTitle: 'Higher Education Media Relations',
    h1: ['Media Relations for ', { em: 'Higher Education' }],
    metaDesc: 'Media relations for universities, colleges, and research institutions: faculty positioning, research storytelling, and the press release writing that gets coverage.',
    lede: 'Higher-ed media relations is about translating dense academic work into stories general-audience reporters will run. The press release writing is the most-overlooked discipline in the field. A research paper does not pitch itself.',
    sections: [
      { h2: 'The challenge', body: '<p>Most university press releases read like curriculum descriptions — accurate and ignorable. Reporters who could be writing about a faculty member\'s research instead write about whatever was easier to grasp. The translation between academic discipline and general-audience interest is the work that most higher-ed comms offices underinvest in.</p>' },
      { h2: 'What I deliver', body: '<ul><li><strong>Press release writing that respects reporters\' time.</strong> Concrete leads, named partners, ready-to-use quotes, real visuals.</li><li><strong>Faculty positioning and earned-media strategy.</strong> Identifying which faculty have stories that fit which outlets.</li><li><strong>Research storytelling.</strong> Translating multimillion-dollar studies into narratives that general audiences can engage with.</li><li><strong>Higher-ed-specific reporter relationships.</strong> Different reporters cover higher-ed than general news; the relationships are different.</li></ul>' },
      { h2: 'Where the work connects to my career', body: '<p>I led brand strategy, media relations, and editorial at FIU\'s Robert Stempel College of Public Health &amp; Social Work for years. The disaster-preparedness press release that resulted in CBS News Miami coverage is one of dozens of placements from that period. Annual reports, faculty profiles, and research-into-coverage translation work were the daily work.</p>' },
    ],
    pullquote: '"A research paper does not pitch itself. The translation between academic discipline and general-audience interest is the work most higher-ed comms offices underinvest in."',
    related: ['fiu-disaster-drill'],
  },
  {
    slug: 'media-relations/health-research',
    audience: 'Health Research Institutions',
    audienceTitle: 'Public Health Research Media Relations',
    h1: ['Media Relations for ', { em: 'Public Health Research Institutions' }],
    metaDesc: 'Media relations for public health research institutions: faculty positioning, research-into-coverage translation, and bilingual coverage on health stories.',
    lede: 'Public health research institutions produce work that general audiences need. The communications discipline that determines whether the work reaches them is the press release writing, the faculty positioning, and the relationships with health beat reporters at major outlets.',
    sections: [
      { h2: 'The challenge', body: '<p>Public health research is high-stakes communication that is often poorly translated. Multimillion-dollar studies on childhood lead exposure, infectious disease, or health disparities frequently produce press releases that reporters skim and skip. The work to make the research land — narrative structure, quote prep, multi-outlet pitching — is real and underinvested.</p>' },
      { h2: 'What I deliver', body: '<ul><li><strong>Press release writing for research announcements.</strong> Lede first, methodology in the middle, quotable conclusions at the end.</li><li><strong>Faculty media training</strong> for principal investigators going on camera or to press calls.</li><li><strong>Bilingual coverage strategy.</strong> Public health research that involves Spanish-speaking populations should be covered by Spanish-language press too.</li><li><strong>Long-term reporter relationships</strong> with health beat reporters at NYT, WSJ, Washington Post, Today Show, ABC, NBC, and the major Spanish-language outlets.</li></ul>' },
      { h2: 'Where the work connects to my career', body: '<p>FIU\'s Robert Stempel College of Public Health &amp; Social Work is a major research institution. My work there included translating studies on disaster preparedness, childhood lead exposure, and faculty research into coverage that ran in CBS News Miami, The New York Times, and other major outlets. Earlier media training work at the American Red Cross included executive prep for satellite media tours and live broadcasts.</p>' },
    ],
    pullquote: '"Multimillion-dollar studies frequently produce press releases that reporters skim and skip. The work to make the research land is real and underinvested."',
    related: ['fiu-disaster-drill', 'red-cross'],
  },
  {
    slug: 'media-relations/national-ngos',
    audience: 'National NGOs',
    audienceTitle: 'National NGO Media Relations',
    h1: ['Media Relations for ', { em: 'National NGOs' }],
    metaDesc: 'Media relations for national NGOs: integrated campaigns combining earned media, paid distribution, and brand partnerships. From a campaign that doubled web traffic.',
    lede: 'National NGO media relations is about scale: getting a single story to land in multiple outlets, sustaining attention across a campaign cycle, and combining earned media with paid distribution and brand partnerships into something larger than any of the three alone.',
    sections: [
      { h2: 'The challenge', body: '<p>National NGOs compete for share of attention against larger, better-funded organizations. The traditional earned-media playbook — pitch reporters, hope they care — does not scale to the kind of attention NGOs actually need. Integrated campaign architecture does.</p>' },
      { h2: 'What I deliver', body: '<ul><li><strong>Integrated campaign architecture.</strong> Earned media + paid distribution + brand partnership designed together, not stitched together.</li><li><strong>National media strategy.</strong> The 3-5 stories worth telling per year, ranked by which reporters are likely to care, with an architecture for getting the right ones into the right inboxes.</li><li><strong>Brand partnerships</strong> with major editorial properties (HuffPost, The Atlantic, etc.) that amplify the editorial work.</li><li><strong>Bilingual coordination</strong> for NGOs whose audiences span Spanish-speaking populations.</li></ul>' },
      { h2: 'Where the work connects to my career', body: '<p>The integrated campaign at SOS Children\'s Villages USA — combining earned media, paid distribution, and a HuffPost / Johnson &amp; Johnson partnership — doubled the organization\'s web traffic and earned coverage in AP, NBC, CNN, Reuters, and The Atlantic. The architecture is portable to other national NGOs facing the same scale challenge.</p>' },
    ],
    pullquote: '"The traditional earned-media playbook — pitch reporters, hope they care — does not scale. Integrated campaign architecture does."',
    related: ['sos-villages', 'red-cross'],
  },

  // ─── Brand & Narrative Strategy × audiences (3) ───
  {
    slug: 'brand-narrative-strategy/foundations',
    audience: 'Foundations',
    audienceTitle: 'Foundation Brand Strategy',
    h1: ['Brand Strategy for ', { em: 'Foundations' }],
    metaDesc: 'Brand and narrative strategy for foundations: positioning, voice, and story architecture that match institutional gravitas with grantee credibility.',
    lede: 'Foundation brand work is different from corporate brand work. The audiences are smaller, the language conventions are stricter, and the consequences of getting it wrong are slower and more reputation-damaging. The discipline is different.',
    sections: [
      { h2: 'The foundation-specific challenge', body: '<p>Most foundation communications accrete from grant reports, board decks, and field-survey writeups. The voice that emerges is institutional and bland — accurate, careful, and unmemorable. The audiences (grantees, peer foundations, field stakeholders) read it once, recognize the genre, and move on.</p><p>Foundation brand work that earns attention starts from a clearer premise: who specifically does this foundation serve, what specifically does it do that no other foundation does, and what does that sound like in the voice of the people doing the work.</p>' },
      { h2: 'What I deliver', body: '<ul><li><strong>Positioning audits.</strong> What you say about the foundation versus what grantees and peer institutions actually hear.</li><li><strong>Voice and tone guides for foundation comms teams.</strong> Plain English, with the rigor that institutional communications require.</li><li><strong>Story architecture.</strong> The 3-5 narrative pillars that anchor every major piece of foundation communication.</li><li><strong>Brand-system work for foundations going through transitions.</strong> Leadership changes, program-area pivots, generational handoffs in family foundations.</li></ul>' },
      { h2: 'Where the work connects to my career', body: '<p>National-NGO brand work at SOS Children\'s Villages USA involved positioning and story architecture for an organization with similar scale and stakeholder dynamics: institutional, donor-facing, grantee-adjacent. The discipline transfers.</p>' },
    ],
    pullquote: '"Most foundation communications accrete from grant reports, board decks, and field-survey writeups. The voice that emerges is accurate, careful, and unmemorable."',
    related: ['sos-villages'],
  },
  {
    slug: 'brand-narrative-strategy/charter-schools',
    audience: 'Charter Schools',
    audienceTitle: 'Charter School Brand Strategy',
    h1: ['Brand Strategy for ', { em: 'Charter School Networks' }],
    metaDesc: 'Brand and narrative strategy for charter school networks: family-facing brand, enrollment marketing, board-facing voice, and authorizer-facing positioning.',
    lede: 'Charter schools have four audiences whose communications needs barely overlap: families, the authorizer, the board, and the donor base. The brand work is figuring out which voice belongs to which audience without fragmenting the institutional identity.',
    sections: [
      { h2: 'The charter-specific challenge', body: '<p>A charter school\'s brand has to work for the family deciding whether to enroll their kindergartener, the authorizer reviewing the renewal application, the board chair pitching foundation funders, and the philanthropy team writing the year-end appeal. Most charters write one set of materials and hope it works for all four. None of them are fully served.</p>' },
      { h2: 'What I deliver', body: '<ul><li><strong>Audience-specific brand work.</strong> The family-facing voice, the authorizer-facing voice, the board-facing voice, the donor-facing voice — each developed deliberately, with consistency at the institutional level.</li><li><strong>Enrollment marketing brand systems.</strong> Application materials, open-house messaging, virtual-tour scripts, follow-up sequences.</li><li><strong>Bilingual brand work for dual-language schools.</strong> The brand should hold in both languages from the brief stage.</li><li><strong>Board and donor brand materials.</strong> Annual reports, impact stories, strategic-plan rollouts.</li></ul>' },
      { h2: 'Where the work connects to my career', body: '<p>I currently lead marketing and communications at School in the Square, a PreK–12 dual-language charter network in Washington Heights and Inwood. Family communications, enrollment marketing, board-facing reporting, and authorizer-facing positioning are the daily work.</p>' },
    ],
    pullquote: '"Most charters write one set of materials and hope it works for all four audiences. None of them are fully served."',
    related: ['sos-villages'],
  },
  {
    slug: 'brand-narrative-strategy/research-institutions',
    audience: 'Research Institutions',
    audienceTitle: 'Research Institution Brand Strategy',
    h1: ['Brand Strategy for ', { em: 'Research Institutions' }],
    metaDesc: 'Brand and narrative strategy for research institutions, schools of public health, and academic centers: positioning, voice, and faculty-facing brand systems.',
    lede: 'Research institutions have a brand challenge most organizations do not: their primary stakeholders — faculty — actively resent corporate-style brand work. The discipline that succeeds in research environments is rigorous, accurate, and short on adjectives.',
    sections: [
      { h2: 'The research-institution challenge', body: '<p>Faculty are skeptical of brand consultants, and they are usually right to be. Most brand work in research environments is generic, performative, and disconnected from the actual work. It gets ignored or actively resisted by the people whose voices the brand is supposed to amplify.</p><p>The brand work that succeeds in research institutions starts from the faculty\'s actual work and builds language outward. It is more editorial than positioning.</p>' },
      { h2: 'What I deliver', body: '<ul><li><strong>Editorial-led brand work.</strong> Voice and story architecture grounded in what the institution\'s researchers actually do.</li><li><strong>Faculty positioning.</strong> Identifying which faculty members are positioned to be public-facing voices on which topics.</li><li><strong>Annual reports and major publications</strong> as brand vehicles in their own right.</li><li><strong>Brand systems that work for both academic and general-audience contexts.</strong></li></ul>' },
      { h2: 'Where the work connects to my career', body: '<p>I led brand strategy, media relations, and editorial at FIU\'s Robert Stempel College of Public Health &amp; Social Work for years. The work included two impact reports (2023 and 2024) on Issuu, faculty positioning across multiple subdisciplines, and the press releases and earned-media work that supported faculty research with national press placements.</p>' },
    ],
    pullquote: '"Faculty are skeptical of brand consultants, and they are usually right to be. The work that succeeds is rigorous, accurate, and short on adjectives."',
    related: ['fiu-disaster-drill'],
  },

  // ─── Community Engagement × audiences (3) ───
  {
    slug: 'community-engagement/dual-language-schools',
    audience: 'Dual-Language Schools',
    audienceTitle: 'Community Engagement for Dual-Language Schools',
    h1: ['Community Engagement for ', { em: 'Dual-Language Schools' }],
    metaDesc: 'Community engagement and family communications for dual-language schools and charter networks. From a current operator at a PreK-12 dual-language network.',
    lede: 'Community engagement at a dual-language school is the daily work — not the campaign work. It is the hundreds of small decisions about how the school talks to its families that accumulate, year after year, into either trust or its absence.',
    sections: [
      { h2: 'What this work actually looks like', body: '<p>Most community engagement at schools defaults to events: open houses, family nights, end-of-year celebrations. Those matter. But the engagement that determines whether families stay enrolled, refer their cousin\'s kid, and bring the second child to the school is the routine: the weekly principal\'s note, the ParentSquare update, the post-event follow-up, the way a one-on-one parent meeting unfolds.</p><p>For dual-language schools, every one of those touchpoints needs to work in both languages. Translated-after-the-fact erodes trust quietly.</p>' },
      { h2: 'What I deliver', body: '<ul><li><strong>Family communications strategy.</strong> Editorial calendars, voice guides, channel architecture — built bilingual.</li><li><strong>Engagement program design.</strong> Family events, parent council communications, town halls, advisory groups.</li><li><strong>Channel strategy.</strong> ParentSquare, email, SMS, in-person — which channel for which message, audited against what families actually read.</li><li><strong>Crisis-readiness for family communications.</strong> Pre-built bilingual templates for closures, incidents, policy changes.</li></ul>' },
      { h2: 'Where the work connects to my career', body: '<p>I currently lead marketing and communications at School in the Square. Family engagement at S² is the daily work, not the campaign work. The systems and discipline transfer to other dual-language schools.</p>' },
    ],
    pullquote: '"Community engagement at a dual-language school is the daily work — not the campaign work. It is hundreds of small decisions that accumulate into trust, or its absence."',
    related: ['sos-villages'],
  },
  {
    slug: 'community-engagement/health-clinics',
    audience: 'Health Clinics',
    audienceTitle: 'Community Engagement for Health Clinics',
    h1: ['Community Engagement for ', { em: 'Health Clinics' }],
    metaDesc: 'Community engagement and patient communications for community health clinics. Bilingual family communications, outreach programs, and trust-building at the patient-facing layer.',
    lede: 'Community engagement at a health clinic is more than the marketing function. It is the discipline that determines whether patients show up to appointments, complete preventive screenings, and trust the clinic enough to bring the rest of the family.',
    sections: [
      { h2: 'The challenge', body: '<p>Health clinic engagement work usually defaults to one-off campaigns — a vaccine drive, an open house, a public health awareness month. Those matter, but they do not build the patient relationship by themselves. The relationship-building work is the routine: how appointment reminders read, how post-visit follow-up arrives, how a family member of a patient experiences the clinic\'s communications without being a patient themselves.</p>' },
      { h2: 'What I deliver', body: '<ul><li><strong>Patient communications strategy and editorial calendars.</strong> Bilingual at the brief stage.</li><li><strong>Community outreach program design.</strong> Vaccination drives, screening campaigns, family-health programs.</li><li><strong>Trust-building communications</strong> with communities whose history with the medical system has earned skepticism.</li><li><strong>Bilingual training</strong> for clinic-facing staff on family communications discipline.</li></ul>' },
      { h2: 'Where the work connects to my career', body: '<p>FIU\'s Robert Stempel College of Public Health &amp; Social Work is housed within a major public-health-facing institution. The communications and community-engagement work I led there involved exactly this kind of routine relationship-building, applied at scale across research, programs, and outreach to general audiences.</p>' },
    ],
    pullquote: '"The relationship-building work is the routine. How appointment reminders read. How post-visit follow-up arrives. How a family member of a patient experiences the clinic without being a patient."',
    related: ['fiu-disaster-drill', 'red-cross'],
  },
  {
    slug: 'community-engagement/immigrant-services',
    audience: 'Immigrant Services',
    audienceTitle: 'Community Engagement for Immigrant Services',
    h1: ['Community Engagement for ', { em: 'Immigrant Services' }],
    metaDesc: 'Community engagement and member communications for immigrant services nonprofits. Bilingual at the brief stage, with cultural fluency, not as a translation step.',
    lede: 'Immigrant services orgs have to earn community trust in a context where the communities they serve have earned reasons to distrust institutions. Communications that read as performative — translated, generic, or disconnected from the audience\'s lived experience — work against the mission.',
    sections: [
      { h2: 'The challenge', body: '<p>The communities immigrant services nonprofits work with are accustomed to communications that talk <em>about</em> them more than <em>to</em> them. The standard playbook of English-first content with Spanish translation appended does not survive that scrutiny.</p>' },
      { h2: 'What I deliver', body: '<ul><li><strong>Member, family, and community communications systems.</strong> Built bilingual from the brief stage with cultural fluency in both languages.</li><li><strong>Outreach program design.</strong> Know-your-rights events, citizenship workshops, family services briefings.</li><li><strong>Bilingual editorial</strong> for member-facing publications, annual reports, and impact storytelling.</li><li><strong>Crisis-readiness</strong> for ICE enforcement events, policy changes, and rapid-response advocacy.</li></ul>' },
      { h2: 'Where the work connects to my career', body: '<p>Family-services work at SOS Children\'s Villages and dual-language family communications at School in the Square share the operating context: communities whose first language is often Spanish, whose trust is hard-won, and whose communications need to be bilingual at the brief stage.</p>' },
    ],
    pullquote: '"The communities immigrant services nonprofits work with are accustomed to communications that talk <em>about</em> them more than <em>to</em> them."',
    related: ['sos-villages'],
  },

  // ─── Editorial & Content × audiences (3) ───
  {
    slug: 'editorial-content/foundation-annual-reports',
    audience: 'Foundation Annual Reports',
    audienceTitle: 'Editorial Direction for Foundation Annual Reports',
    h1: ['Editorial Direction for ', { em: 'Foundation Annual Reports' }],
    metaDesc: 'End-to-end editorial direction for foundation annual reports: writing, editing, designer management, photo direction, and cross-department coordination.',
    lede: 'Foundation annual reports get read for about three minutes by donors, twelve seconds by peer foundations, and not at all by most grantees. The editorial work that changes any of those numbers is more rigorous and less covered than most foundations expect.',
    sections: [
      { h2: 'The challenge', body: '<p>Most foundation annual reports default to genre conventions: a letter from the president, financial highlights, program summaries, grantee spotlights, board roster. The genre is well-established and ignorable. The annual reports that get read are the ones whose editorial direction departed from the genre at the brief stage.</p>' },
      { h2: 'What I deliver', body: '<ul><li><strong>End-to-end editorial direction.</strong> Story selection, writing, editing, designer management, photo direction, and cross-department coordination.</li><li><strong>Story-selection strategy.</strong> The 8-12 stories in a typical foundation report should not be evenly weighted; two or three should be long enough to actually sit with.</li><li><strong>Bilingual editorial</strong> for foundations whose grantees and audiences are bilingual.</li><li><strong>Designer and photographer coordination</strong> aligned to the editorial choice, not the other way around.</li></ul>' },
      { h2: 'Where the work connects to my career', body: '<p>I led editorial direction for FIU\'s Robert Stempel College of Public Health &amp; Social Work\'s 2024 Impact Report and 2023 Public Health Impact Report — both available on Issuu. The discipline transfers directly to foundation reports: the audience is more engaged, the genre conventions are similar, the stakes for getting it right are higher.</p>' },
    ],
    pullquote: '"Foundation annual reports get read for about three minutes by donors, twelve seconds by peer foundations, and not at all by most grantees."',
    related: ['fiu-disaster-drill'],
  },
  {
    slug: 'editorial-content/research-translations',
    audience: 'Research Translations',
    audienceTitle: 'Translating Research for General Audiences',
    h1: ['Translating Research for ', { em: 'General Audiences' }],
    metaDesc: 'Editorial work that translates dense research — multimillion-dollar studies, public health findings, academic monographs — into narratives general audiences can engage with.',
    lede: 'A multimillion-dollar study on childhood lead exposure or hurricane preparedness sits in a peer-reviewed journal where general audiences will never read it. The editorial work that translates the study into a press release, an op-ed, or a long-form feature is what determines whether it reaches the audience that funded it.',
    sections: [
      { h2: 'The challenge', body: '<p>Most research-into-content translation reads like the research, just shorter. The structure (background, methodology, findings, limitations) gets preserved, the technical vocabulary gets simplified slightly, and the result is still mostly unreadable to a general audience. The work that succeeds restructures the writing entirely — narrative-first, with the methodology threaded through.</p>' },
      { h2: 'What I deliver', body: '<ul><li><strong>Press release writing</strong> for research announcements that respect reporters\' time.</li><li><strong>Long-form feature writing</strong> on major research findings — for foundation publications, alumni magazines, or general-audience venues.</li><li><strong>Op-ed ghostwriting</strong> for principal investigators on research-driven policy positions.</li><li><strong>Annual reports</strong> that include research summaries general audiences can engage with.</li></ul>' },
      { h2: 'Where the work connects to my career', body: '<p>At FIU\'s Robert Stempel College, I led the translation work for studies on childhood lead exposure, hurricane and disaster preparedness, public health research, and disaster simulations. The press release on the 2024 disaster simulation was picked up by CBS News Miami; coverage on the lead-exposure research ran in FIU News and beyond.</p>' },
    ],
    pullquote: '"Most research-into-content translation reads like the research, just shorter. The work that succeeds restructures the writing entirely."',
    related: ['fiu-disaster-drill'],
  },
  {
    slug: 'editorial-content/higher-ed-publications',
    audience: 'Higher Ed Publications',
    audienceTitle: 'Editorial for Higher Ed Publications',
    h1: ['Editorial for ', { em: 'Higher Ed Publications' }],
    metaDesc: 'Editorial direction for higher education publications: alumni magazines, college impact reports, departmental publications, and strategic-plan rollouts.',
    lede: 'Higher-ed publications are read more carefully than most institutional communications — by alumni, donors, prospective students, peer institutions, and faculty themselves. The editorial discipline that makes them worth reading is rigorous and underinvested.',
    sections: [
      { h2: 'The challenge', body: '<p>Most higher-ed publications get assigned to teams who handle them alongside three other comms responsibilities. The result is publications that hit deadline, look professional, and never become the kind of work the institution can point at. Real editorial direction — story selection, write-through, designer collaboration, photo direction — requires more time and more rigor than most teams have.</p>' },
      { h2: 'What I deliver', body: '<ul><li><strong>End-to-end editorial direction</strong> for college impact reports, alumni magazines, departmental publications, and strategic-plan rollouts.</li><li><strong>Faculty profiles and feature writing</strong> that respect academic credibility while engaging general audiences.</li><li><strong>Designer management</strong> aligned to editorial choice.</li><li><strong>Bilingual editorial</strong> where the institution serves bilingual audiences.</li></ul>' },
      { h2: 'Where the work connects to my career', body: '<p>I led the FIU Robert Stempel College 2024 Impact Report and 2023 Public Health Impact Report — both available on Issuu. The discipline involved story selection across four academic schools, faculty interviews, designer management, and the kind of cross-department coordination that determines whether a college impact report actually gets read.</p>' },
    ],
    pullquote: '"Real editorial direction requires more time and more rigor than most teams have."',
    related: ['fiu-disaster-drill'],
  },

  // ─── Geographic variations (3) ───
  {
    slug: 'bilingual-campaigns/nyc',
    audience: 'NYC',
    audienceTitle: 'Bilingual Communications Consultant in New York City',
    h1: ['Bilingual Communications Consultant in ', { em: 'New York City' }],
    metaDesc: 'Bilingual (EN/ES) strategic communications consultant based in New York City. Serving nonprofits, NGOs, and education organizations across the five boroughs.',
    lede: 'A bilingual strategic communications consultant based in New York City. The work is local where local matters — NYC nonprofits, charter networks, foundations, NGO chapters — and remote where remote works better.',
    sections: [
      { h2: 'Why local matters for some of this work', body: '<p>Some bilingual communications work is portable. National media relations, brand strategy, and editorial direction work fine remote. But community engagement, family communications for NYC schools, and crisis communications during local events benefit from on-the-ground availability.</p><p>I live in New York City and lead marketing and communications at School in the Square in Washington Heights and Inwood. The local context is the daily work, not a positioning angle.</p>' },
      { h2: 'What I deliver to NYC organizations', body: '<ul><li><strong>Bilingual campaigns and editorial</strong> for NYC nonprofits, schools, and foundations.</li><li><strong>Spanish-language media relations</strong> with NYC outlets — El Diario NY, Univision 41, Telemundo 47, Hoy.</li><li><strong>Family and community communications</strong> for organizations serving Spanish-speaking communities across the five boroughs.</li><li><strong>Crisis communications</strong> for NYC-based organizations and chapters of national NGOs.</li></ul>' },
      { h2: 'Career anchored in NYC nonprofit comms', body: '<p>I currently lead communications at a PreK–12 dual-language public charter network in Washington Heights and Inwood. Earlier work at SOS Children\'s Villages and the American Red Cross involved national coordination from New York City. The local network — outlets, reporters, peer comms leaders, partner organizations — is built up over years of local work.</p>' },
    ],
    pullquote: '"The local context is the daily work, not a positioning angle."',
    related: ['sos-villages', 'red-cross'],
  },
  {
    slug: 'bilingual-campaigns/brooklyn',
    audience: 'Brooklyn',
    audienceTitle: 'Bilingual Communications in Brooklyn',
    h1: ['Bilingual Communications in ', { em: 'Brooklyn' }],
    metaDesc: 'Bilingual (EN/ES) strategic communications consultant serving Brooklyn-based nonprofits, schools, and community organizations.',
    lede: 'Brooklyn nonprofits, charter schools, community organizations, and family services nonprofits need bilingual communications that fit the borough\'s actual demographics — not a generic national-NGO template adapted for local use.',
    sections: [
      { h2: 'Brooklyn-specific bilingual work', body: '<p>Sunset Park, Bushwick, Williamsburg, East New York, parts of Crown Heights, and other Brooklyn neighborhoods have substantial Spanish-speaking populations whose nonprofits and schools serve them daily. The Spanish those communities speak is not the same as Mexican Spanish, Caribbean Spanish, or generic Latin American Spanish — it is specifically the diasporic mix of NYC, with cultural register that matters.</p><p>The bilingual work for Brooklyn organizations should reflect that.</p>' },
      { h2: 'What I deliver', body: '<ul><li><strong>Bilingual family and community communications</strong> for Brooklyn-based nonprofits and schools.</li><li><strong>Brooklyn-specific media relations,</strong> including Spanish-language outlets that cover Brooklyn-specific stories.</li><li><strong>Crisis playbooks</strong> for Brooklyn organizations dealing with local events, funding shifts, or political pressure.</li><li><strong>Editorial work</strong> for Brooklyn-based publications, annual reports, and major communications.</li></ul>' },
      { h2: 'Where the work connects', body: '<p>NYC bilingual work generally; Brooklyn-specific work where local context matters. The career through SOS Children\'s Villages, American Red Cross, and School in the Square has involved NYC nonprofits and education orgs at every stage.</p>' },
    ],
    pullquote: '"The Spanish those communities speak is not generic Latin American Spanish — it is specifically the diasporic mix of NYC, with cultural register that matters."',
    related: ['sos-villages', 'red-cross'],
  },
  {
    slug: 'bilingual-campaigns/manhattan',
    audience: 'Manhattan',
    audienceTitle: 'Bilingual Communications in Manhattan',
    h1: ['Bilingual Communications in ', { em: 'Manhattan' }],
    metaDesc: 'Bilingual (EN/ES) strategic communications consultant serving Manhattan-based nonprofits, foundations, and education organizations.',
    lede: 'Manhattan-based nonprofits, foundations, NGOs, and education organizations: bilingual communications consulting from someone whose daily work is in upper Manhattan and whose career has been built across NYC institutions.',
    sections: [
      { h2: 'Manhattan-specific bilingual work', body: '<p>Washington Heights, Inwood, East Harlem, Lower East Side, and parts of upper Manhattan serve substantial Spanish-speaking populations. The communications work for organizations operating in these neighborhoods needs to be structurally bilingual — built that way at the brief stage, not as a translation step.</p>' },
      { h2: 'What I deliver to Manhattan organizations', body: '<ul><li><strong>Bilingual family and community communications</strong> for upper Manhattan schools, clinics, and family services nonprofits.</li><li><strong>Foundation brand and editorial work</strong> for Manhattan-based grantmakers.</li><li><strong>NGO chapter communications</strong> for organizations whose national HQ is in Manhattan.</li><li><strong>Spanish-language press relationships</strong> with NYC outlets.</li></ul>' },
      { h2: 'Where the work connects', body: '<p>I lead communications at School in the Square, a PreK–12 dual-language network operating in Washington Heights and Inwood. National NGO work at SOS Children\'s Villages and the American Red Cross was managed from Manhattan offices. The local network is built up over years of NYC nonprofit work.</p>' },
    ],
    pullquote: '"The communications work for organizations operating in these neighborhoods needs to be structurally bilingual — built that way at the brief stage."',
    related: ['sos-villages', 'red-cross'],
  },
];

const RELATED_TITLES = {
  'sos-villages': 'How an integrated campaign doubled SOS Children\'s Villages\' web traffic',
  'red-cross': 'Storytelling that moves people: a Red Cross feature about earthquake survivors',
  'fiu-disaster-drill': 'How a graduate field course at FIU got national press for being hands-on',
};

function renderH1(parts) {
  return parts.map(p => typeof p === 'string' ? p : `<em>${p.em}</em>`).join('');
}

function renderRelated(slugs) {
  if (!slugs || slugs.length === 0) return '';
  return `
      <div class="related">
        <h3>Related case studies</h3>
        <ul>
${slugs.map(s => `          <li><a href="/work/${s}/">${RELATED_TITLES[s]}</a></li>`).join('\n')}
        </ul>
      </div>`;
}

const CSS = `:root{--forest:oklch(0.24 0.04 162);--forest-deep:oklch(0.18 0.035 162);--forest-ink:oklch(0.14 0.025 162);--ivory:oklch(0.965 0.012 85);--ivory-warm:oklch(0.94 0.018 80);--moss:oklch(0.58 0.09 142);--rule:oklch(0.24 0.04 162 / 0.18);--muted:oklch(0.24 0.04 162 / 0.62);--serif:"Newsreader",Georgia,serif;--display:"Instrument Serif","Newsreader",Georgia,serif;--sans:"Geist",ui-sans-serif,system-ui,sans-serif;--mono:"JetBrains Mono",ui-monospace,Menlo,monospace;--max:720px;--gutter:clamp(20px,4vw,56px);}
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

function buildPage(p) {
  const url = `https://stephanierendon.com/services/${p.slug}/`;
  const [serviceSlug, audienceSlug] = p.slug.split('/');
  const service = SERVICE_NAMES[serviceSlug];
  const breadcrumb = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://stephanierendon.com/"},
      {"@type": "ListItem", "position": 2, "name": "Services", "item": "https://stephanierendon.com/#services"},
      {"@type": "ListItem", "position": 3, "name": service.parent, "item": `https://stephanierendon.com/services/${serviceSlug}/`},
      {"@type": "ListItem", "position": 4, "name": p.audience, "item": url}
    ]
  });
  const serviceLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": p.audienceTitle,
    "description": p.metaDesc,
    "provider": {
      "@type": "Person",
      "name": "Stephanie Rendon",
      "url": "https://stephanierendon.com/",
      "jobTitle": "Strategic Communications Consultant",
      "sameAs": ["https://www.linkedin.com/in/rendonstephanie/"]
    },
    "areaServed": [{"@type": "City", "name": "New York"}, {"@type": "Country", "name": "United States"}],
    "serviceType": service.parent,
    "url": url,
    "audience": {"@type": "Audience", "audienceType": p.audience}
  });
  const sectionsHtml = p.sections.map(s => `      <h2>${s.h2.replace(/\<em\>/g, '<em>').replace(/\<\/em\>/g, '</em>')}</h2>\n      ${s.body}`).join('\n\n');
  const pullquote = p.pullquote ? `\n\n      <p class="pullquote">${p.pullquote}</p>\n` : '';

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${p.audienceTitle} | Stephanie Rendon</title>
    <meta name="description" content="${p.metaDesc}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:title" content="${p.audienceTitle}" />
    <meta property="og:description" content="${p.metaDesc}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="https://stephanierendon.com/og-image.png" />
    <meta property="og:site_name" content="Stephanie Rendon" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${p.audienceTitle}" />
    <meta name="twitter:description" content="${p.metaDesc}" />
    <meta name="twitter:image" content="https://stephanierendon.com/og-image.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,300..700&family=Geist:wght@300..700&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
    <script type="application/ld+json">${serviceLd}</script>
    <script type="application/ld+json">${breadcrumb}</script>
    <style>${CSS}</style>
  </head>
  <body>
    <header class="topbar">
      <a class="brand" href="/"><span class="dot"></span>Stephanie Rendon</a>
      <nav><a href="/#about">About</a><a href="/#work">Selected Work</a><a href="/#services">Services</a><a href="/#contact">Work with me</a></nav>
    </header>

    <main>
      <div class="eyebrow">Service · ${service.num} · ${p.audience}</div>

      <h1>${renderH1(p.h1)}</h1>

      <p class="lede">${p.lede}</p>

${sectionsHtml}${pullquote}
      <div class="cta">
        <p>${getCta(p.slug)}</p>
        <a class="button" href="/#contact">Work with me →</a>
      </div>
${renderRelated(p.related)}
    </main>

    <footer>
      <span>© 2026 Stephanie Rendon · New York City · EN · ES</span>
      <span><a href="/">Back to home</a> · <a href="https://www.linkedin.com/in/rendonstephanie/">LinkedIn</a></span>
    </footer>
  </body>
</html>
`;
}

function getCta(slug) {
  const ctas = {
    'bilingual-campaigns/health-clinics': 'Building bilingual at the clinic level? Let\'s talk.',
    'bilingual-campaigns/immigrant-services': 'Doing bilingual right is part of how the community trusts you. Let\'s talk.',
    'bilingual-campaigns/family-services': 'Spanish-speaking families deserve more than translated copy. Let\'s talk.',
    'bilingual-campaigns/dual-language-schools': 'The school is bilingual. The communications should match.',
    'crisis-communications/charter-schools': 'Building a playbook, or running one in real time?',
    'crisis-communications/foundations': 'Reputation is the asset. Let\'s protect it.',
    'crisis-communications/health-organizations': 'Patient communications cannot wait for translation.',
    'crisis-communications/higher-education': 'Building a playbook for the academic calendar?',
    'crisis-communications/disaster-response-orgs': 'Building infrastructure before it\'s needed.',
    'media-relations/spanish-language-outlets': 'Pitching Spanish-language press for the first time, or scaling what works?',
    'media-relations/higher-education': 'Have research that deserves coverage but reads like curriculum?',
    'media-relations/health-research': 'Has the research, needs the coverage.',
    'media-relations/national-ngos': 'Scaling earned media beyond the press release.',
    'brand-narrative-strategy/foundations': 'Foundation brand work, done with rigor.',
    'brand-narrative-strategy/charter-schools': 'Brand that holds across families, board, donors, and authorizer.',
    'brand-narrative-strategy/research-institutions': 'Editorial-led brand work for research institutions.',
    'community-engagement/dual-language-schools': 'Family engagement, bilingual at the brief stage.',
    'community-engagement/health-clinics': 'Patient communications that build trust, not just compliance.',
    'community-engagement/immigrant-services': 'Communications that talk to the community, not about it.',
    'editorial-content/foundation-annual-reports': 'Annual reports that deserve to be read.',
    'editorial-content/research-translations': 'Research deserves to reach the audience that funded it.',
    'editorial-content/higher-ed-publications': 'Higher-ed editorial, done with rigor.',
    'bilingual-campaigns/nyc': 'Working with NYC nonprofits, schools, and foundations.',
    'bilingual-campaigns/brooklyn': 'Working with Brooklyn-based nonprofits and community organizations.',
    'bilingual-campaigns/manhattan': 'Working with Manhattan nonprofits, foundations, and schools.',
  };
  return ctas[slug] || 'Let\'s talk.';
}

let count = 0;
for (const p of PAGES) {
  const dir = path.join(ROOT, 'public', 'services', p.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), buildPage(p));
  count++;
}
console.log(`Wrote ${count} programmatic pages.`);
