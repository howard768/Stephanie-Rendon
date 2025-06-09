import './index.css';
import headshot from './assets/Stephanie_Headshot.jpeg';
import disasterImg from './assets/disaster-management.jpeg';
import socialworkProfImg from './assets/socialwork_prof.jpeg';
import socialMediaPlanImg from './assets/Stephanie Rendon -  Social Media Plan - School in the Square.jpg';
import illustrationImg from './assets/Illustration_Example.png';
import expertTappedImg from './assets/expert_tapped.jpg';
import majorAgenciesImg from './assets/major_agencies.png';
import aspiringMedicalImg from './assets/aspiring_medical.png';
import celebratingHeroesImg from './assets/celebrating_heroes.jpg';
import nbcLogo from './assets/NBC_Peacock_1986.svg.png';
import todayLogo from './assets/Today_logo.svg.png';
import nytLogo from './assets/New_York_Times_logo_variation.jpg';
import cbsLogo from './assets/CBS_News.svg.png';
import stephArcInfield from './assets/steph_arc_infield.JPG';
import stephOnCopter from './assets/steph_oncopter.jpg';
import { useState, useEffect } from 'react';

function NavLink({ href, children, onClick, isActive }) {
  return (
    <div className="flex flex-col items-center">
      <a
        href={href}
        onClick={onClick}
        className={`text-lg font-extrabold uppercase text-amber-900 tracking-wide transition-all px-8 py-3 rounded-md relative flex items-center justify-center hover:text-rose-700 hover:scale-105 focus:scale-105 focus:text-rose-700 duration-200${isActive ? ' text-rose-700 scale-105' : ''}`}
        style={{ minWidth: '120px', minHeight: '48px', height: '48px', cursor: 'pointer' }}
      >
        {children}
      </a>
      {isActive && <div className="w-full h-1 bg-rose-200 mt-1 rounded" style={{ maxWidth: 60 }}></div>}
    </div>
  );
}

const bio = `For the past 13 years, I've focused on building bridges through strategic communication, driving measurable results in brand visibility and community engagement. As a bilingual professional fluent in English and Spanish, I specialize in crafting compelling narratives that help mission-driven organizations enhance their visibility and build meaningful community engagement. I thrive on connecting with diverse audiences and telling stories that resonate, leveraging a blend of empathy and data-driven insights to create lasting impact. I'm always eager to collaborate on projects that empower communities and foster authentic connections.`;

function AboutPage() {
  return (
    <div className="flex flex-1 items-center justify-center w-full max-w-6xl mx-auto min-h-[70vh]">
      <div className="flex flex-row w-full items-center justify-center gap-12">
        <img
          src={headshot}
          alt="Stephanie Rendon headshot"
          className="w-80 h-80 object-cover rounded-full border-8 border-rose-200 shadow-xl"
          style={{ background: '#fff8f1' }}
        />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-2xl text-rose-900 text-left max-w-2xl" style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 300 }}>
            {bio}
          </p>
        </div>
      </div>
    </div>
  );
}

function PortfolioCategory({ title, onBack, children }) {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto min-h-[70vh]">
      <button onClick={onBack} className="mb-8 px-6 py-2 rounded bg-amber-200 text-amber-900 font-bold hover:bg-amber-300 transition">&larr; Back to Portfolio</button>
      <h2 className="text-3xl font-bold text-amber-900 mb-4">{title}</h2>
      <div className="w-full flex flex-col items-center">{children}</div>
    </div>
  );
}

function PortfolioSubNav({ active, onSelect }) {
  const items = [
    { key: 'press', label: 'PRESS RELEASES & STORIES' },
    { key: 'videos', label: 'VIDEOS' },
    { key: 'reports', label: 'ANNUAL REPORTS' },
    { key: 'media', label: 'EARNED MEDIA' }
  ];
  return (
    <div className="w-full flex justify-end gap-8 mt-10 mb-12 pr-10">
      {items.map(item => (
        <div key={item.key} className="flex flex-col items-center">
          <button
            onClick={() => onSelect(item.key)}
            className={`text-lg font-extrabold uppercase tracking-wide px-8 py-3 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-300 ${active === item.key ? 'text-rose-700 scale-105' : 'text-amber-900 hover:text-rose-700 hover:scale-105'}`}
            style={{ minWidth: '120px', minHeight: '48px', height: '48px', cursor: 'pointer', background: 'transparent', boxShadow: 'none', border: 'none' }}
          >
            {item.label}
          </button>
          {active === item.key && <div className="w-full h-1 bg-rose-200 mt-1 rounded" style={{ maxWidth: 60 }}></div>}
        </div>
      ))}
    </div>
  );
}

function PortfolioPage({ activeCategory, onSelectCategory }) {
  // Example placeholder content for each category
  const portfolioContent = {
    press: (
      <div className="w-full flex flex-row items-start max-w-6xl mx-auto mt-8 gap-12">
        {/* Left: Section title and subtitle */}
        <div className="flex flex-col items-start justify-start min-w-[260px] max-w-[320px] pt-4">
          <h2 className="text-3xl font-extrabold text-amber-900 mb-2 uppercase">Press Releases & Stories</h2>
          <span className="text-xl text-rose-900 mb-2">Select work</span>
        </div>
        {/* Right: Grid of cards */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-start max-w-xl">
            <img src={disasterImg} alt="Disaster management field course" className="w-full h-48 object-cover rounded-xl mb-4" />
            <span className="text-sm font-bold text-amber-900 mb-2 uppercase" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>FIU NEWS</span>
            <h3 className="text-lg font-bold text-amber-900 mb-2" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>FIU students get hands-on experience in large-scale disaster response</h3>
            <p className="text-base text-rose-900 mb-4" style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 300 }}>Press release highlighting unique, hands-on graduate degree program.</p>
            <a
              href="https://news.fiu.edu/2024/fiu-students-get-hands-on-experience-in-large-scale-disaster-response#:~:text=The%20field%20course%20is%20part,management%20and%20humanitarian%20assistance%2Fcoordination"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 font-bold text-rose-900 transition-all duration-200 hover:text-rose-700 hover:underline hover:decoration-2 hover:underline-offset-4 focus:outline-none focus:text-rose-700"
              style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}
            >
              READ
            </a>
          </div>
          <div className="flex flex-col items-start max-w-xl">
            <img src={socialworkProfImg} alt="Social work professor" className="w-full h-48 object-cover rounded-xl mb-4" />
            <span className="text-sm font-bold text-amber-900 mb-2 uppercase" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>FIU NEWS</span>
            <h3 className="text-lg font-bold text-amber-900 mb-2" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>Professor named social work educator of the year</h3>
            <p className="text-base text-rose-900 mb-4" style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 300 }}>
              Feature story on social work professor who was recognized for her contributions to the field.
            </p>
            <a
              href="https://news.fiu.edu/2025/social-work-professor-named-educator-of-the-year"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 font-bold text-rose-900 transition-all duration-200 hover:text-rose-700 hover:underline hover:decoration-2 hover:underline-offset-4 focus:outline-none focus:text-rose-700"
              style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}
            >
              READ
            </a>
          </div>
          <div className="flex flex-col items-start max-w-xl">
            <img src={expertTappedImg} alt="FIU experts tapped for study" className="w-full h-48 object-cover rounded-xl mb-4" />
            <span className="text-sm font-bold text-amber-900 mb-2 uppercase" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>FIU NEWS</span>
            <h3 className="text-lg font-bold text-amber-900 mb-2" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>FIU experts tapped for study of possible links between childhood lead exposure and psychiatric diseases</h3>
            <p className="text-base text-rose-900 mb-4" style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 300 }}>
              Multimillion-dollar investigation aims to explore the effects of the toxic metal on neurons, brain circuitry and behavior.
            </p>
            <a
              href="https://news.fiu.edu/2024/researching-psychiatric-disease-risks-linked-to-childhood-lead-exposure"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 font-bold text-rose-900 transition-all duration-200 hover:text-rose-700 hover:underline hover:decoration-2 hover:underline-offset-4 focus:outline-none focus:text-rose-700"
              style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}
            >
              READ
            </a>
          </div>
          <div className="flex flex-col items-start max-w-xl">
            <img src={majorAgenciesImg} alt="Major Agencies and Networks Support PSA" className="w-full h-48 object-cover rounded-xl mb-4" />
            <span className="text-sm font-bold text-amber-900 mb-2 uppercase" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>PR NEWSWIRE</span>
            <h3 className="text-lg font-bold text-amber-900 mb-2" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>Major Agencies and Networks Support a New PSA that Emphasizes SOS Children's Villages' Dedication to Supporting Vulnerable Children Worldwide</h3>
            <p className="text-base text-rose-900 mb-4" style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 300 }}>
              Press release about SOS Children's Villages' new PSA campaign and its impact for vulnerable children.
            </p>
            <a
              href="https://www.prnewswire.com/news-releases/major-agencies-and-networks-support-a-new-psa-that-emphasizes-sos-childrens-villages-dedication-to-supporting-vulnerable-children-worldwide-300347663.html"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 font-bold text-rose-900 transition-all duration-200 hover:text-rose-700 hover:underline hover:decoration-2 hover:underline-offset-4 focus:outline-none focus:text-rose-700"
              style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}
            >
              READ
            </a>
          </div>
          <div className="flex flex-col items-start max-w-xl">
            <img src={aspiringMedicalImg} alt="FIU doctoral student dreams of improving health" className="w-full h-48 object-cover rounded-xl mb-4" />
            <span className="text-sm font-bold text-amber-900 mb-2 uppercase" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>FIU NEWS</span>
            <h3 className="text-lg font-bold text-amber-900 mb-2" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>FIU doctoral student dreams of improving people's health, one TV segment at a time</h3>
            <p className="text-base text-rose-900 mb-4" style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 300 }}>
              Feature story on an FIU doctoral student's inspiring journey to become a medical correspondent.
            </p>
            <a
              href="https://news.fiu.edu/2023/fiu-doctoral-student-dreams-of-improving-peoples-health-one-tv-segment-at-a-time"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 font-bold text-rose-900 transition-all duration-200 hover:text-rose-700 hover:underline hover:decoration-2 hover:underline-offset-4 focus:outline-none focus:text-rose-700"
              style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}
            >
              READ
            </a>
          </div>
          <div className="flex flex-col items-start max-w-xl">
            <img src={celebratingHeroesImg} alt="Celebrating heroes: earthquake survivors" className="w-full h-48 object-cover rounded-xl mb-4" />
            <span className="text-sm font-bold text-amber-900 mb-2 uppercase" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>RED CROSS CHAT</span>
            <h3 className="text-lg font-bold text-amber-900 mb-2" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>Celebrating heroes: Meet 6 inspiring earthquake survivors</h3>
            <p className="text-base text-rose-900 mb-4" style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 300 }}>
              Feature story on earthquake survivors in Mexico that received help from the American Red Cross.
            </p>
            <a
              href="https://redcrosschat.org/2018/03/02/celebrating-heroes-meet-6-inspiring-earthquake-survivors/"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 font-bold text-rose-900 transition-all duration-200 hover:text-rose-700 hover:underline hover:decoration-2 hover:underline-offset-4 focus:outline-none focus:text-rose-700"
              style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}
            >
              READ
            </a>
          </div>
        </div>
      </div>
    ),
    videos: (
      <div className="w-full flex flex-row items-start max-w-6xl mx-auto mt-8 gap-12">
        {/* Left: Section title and subtitle */}
        <div className="flex flex-col items-start justify-start min-w-[260px] max-w-[320px] pt-4">
          <h2 className="text-3xl font-extrabold text-amber-900 mb-2 uppercase">Videos</h2>
          <span className="text-xl text-rose-900 mb-2">Select work</span>
          <p className="text-base text-rose-900 mb-4 max-w-xs text-left" style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 300 }}>
            As the producer for these projects, I managed the production from start to finish. I identified compelling interviewees, secured shoot locations, prepped all participants, and directed on-site logistics. Following the shoot, I guided the post-production process to ensure the final story aligned perfectly with our messaging goals.
          </p>
        </div>
        {/* Right: Placeholder for video cards */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 ml-12">
          <div className="flex flex-col items-start max-w-xl">
            <iframe width="100%" height="250" src="https://www.youtube.com/embed/m0uM1KTXAeg" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className="rounded-xl mb-4"></iframe>
            <span className="text-base text-rose-900 font-bold mb-2">Feature video on young boy supported by SOS Children's Villages</span>
          </div>
          <div className="flex flex-col items-start max-w-xl">
            <iframe width="100%" height="250" src="https://www.youtube.com/embed/2CLX2927mpQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className="rounded-xl mb-4"></iframe>
            <span className="text-base text-rose-900 font-bold mb-2">Feature video on disaster preparedness program at FIU</span>
          </div>
          <div className="flex flex-col items-start max-w-xl">
            <iframe width="100%" height="250" src="https://www.youtube.com/embed/FcaM2s0_5AY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className="rounded-xl mb-4"></iframe>
            <span className="text-base text-rose-900 font-bold mb-2">Feature video on researcher and how she's helping doctors treat hard-to-treat cancers</span>
          </div>
        </div>
      </div>
    ),
    reports: (
      <div className="w-full flex flex-row items-start max-w-6xl mx-auto mt-8 gap-12">
        {/* Left: Section title and subtitle */}
        <div className="flex flex-col items-start justify-start min-w-[260px] max-w-[320px] pt-4">
          <h2 className="text-3xl font-extrabold text-amber-900 mb-2 uppercase">Annual Reports</h2>
          <span className="text-xl text-rose-900 mb-2">Select work</span>
          <p className="text-base text-rose-900 mb-4 max-w-xs text-left" style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 300 }}>
            As editor at FIU Stempel College, I used the annual Impact Report to highlight the work of our researchers, students, and alumni. I oversaw all aspects of production—from writing and editing to managing designers, leading photoshoots, and coordinating with stakeholders across departments. The final report served as a key piece to showcase the college's achievements to peers, donors, supporters, and the broader college community.
          </p>
        </div>
        {/* Right: Placeholder for report cards */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 ml-12">
          <div className="flex flex-col items-start max-w-xl">
            <img src="https://image.isu.pub/241205140157-7c9412ec698449efdf2ac636674d7584/jpg/page_1_thumb_large.jpg" alt="2024 Impact Report Cover" className="w-full h-48 object-cover rounded-xl mb-4" />
            <span className="text-sm font-bold text-amber-900 mb-2 uppercase" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>FIU STEMPEL COLLEGE</span>
            <h3 className="text-lg font-bold text-amber-900 mb-2" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>2024 Impact Report</h3>
            <p className="text-base text-rose-900 mb-4" style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 300 }}>
              Annual report highlighting the achievements, research, and community impact of FIU Stempel College in 2024.
            </p>
            <a
              href="https://issuu.com/fiupublications/docs/4965759993_stmpl_2024annualreport-issuu?fr=sYWYwYTYzMjg1Mjk"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 font-bold text-rose-900 transition-all duration-200 hover:text-rose-700 hover:underline hover:decoration-2 hover:underline-offset-4 focus:outline-none focus:text-rose-700"
              style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}
            >
              VIEW REPORT
            </a>
          </div>
          <div className="flex flex-col items-start max-w-xl">
            <img src="https://image.isu.pub/231116150455-7d23796d72a7b980ec738b1fd98cdbf8/jpg/page_1_thumb_large.jpg" alt="2023 Public Health Impact Report Cover" className="w-full h-48 object-cover rounded-xl mb-4" />
            <span className="text-sm font-bold text-amber-900 mb-2 uppercase" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>FIU STEMPEL COLLEGE</span>
            <h3 className="text-lg font-bold text-amber-900 mb-2" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>2023 Public Health Impact Report</h3>
            <p className="text-base text-rose-900 mb-4" style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 300 }}>
              Annual report showcasing the public health initiatives, research, and stories from FIU Stempel College in 2023.
            </p>
            <a
              href="https://issuu.com/fiupublications/docs/stmpl_2023_public_health_impact_report_4965759993?fr=sZjdlMzYzMjg1Mjk"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 font-bold text-rose-900 transition-all duration-200 hover:text-rose-700 hover:underline hover:decoration-2 hover:underline-offset-4 focus:outline-none focus:text-rose-700"
              style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}
            >
              VIEW REPORT
            </a>
          </div>
        </div>
      </div>
    ),
    media: (
      <div className="w-full flex flex-row items-start max-w-6xl mx-auto mt-8 gap-12">
        {/* Left: Section title and subtitle */}
        <div className="flex flex-col items-start justify-start min-w-[260px] max-w-[320px] pt-4">
          <h2 className="text-3xl font-extrabold text-amber-900 mb-2 uppercase">Earned Media</h2>
          <span className="text-xl text-rose-900 mb-2">Select work</span>
          <p className="text-base text-rose-900 mb-4 max-w-xs text-left" style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 300 }}>
            I've worked closely with media outlets to secure coverage that highlights key programs and initiatives, helping to raise visibility, attract support, and position our work as impactful and newsworthy.
          </p>
        </div>
        {/* Right: Placeholder for media cards */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 ml-12">
          <div className="flex flex-col items-start max-w-xl">
            <img src={nbcLogo} alt="NBC News Logo" className="h-10 w-auto mb-2" />
            <span className="text-sm font-bold text-amber-900 mb-2 uppercase" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>NBC NEWS</span>
            <h3 className="text-lg font-bold text-amber-900 mb-2" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>Shot During Cookies and Milk: A Syrian Boy's Story</h3>
            <p className="text-base text-rose-900 mb-4" style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 300 }}>
              Feature on a Syrian boy's journey and recovery after being injured in the conflict, with support from SOS Children's Villages.
            </p>
            <a
              href="https://www.nbcnews.com/storyline/syrias-suffering-families/shot-during-cookies-milk-syrian-boys-story-n266356"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 font-bold text-rose-900 transition-all duration-200 hover:text-rose-700 hover:underline hover:decoration-2 hover:underline-offset-4 focus:outline-none focus:text-rose-700"
              style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}
            >
              VIEW COVERAGE
            </a>
          </div>
          <div className="flex flex-col items-start max-w-xl">
            <img src={nbcLogo} alt="NBC News Logo" className="h-10 w-auto mb-2" />
            <span className="text-sm font-bold text-amber-900 mb-2 uppercase" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>NBC NEWS</span>
            <h3 className="text-lg font-bold text-amber-900 mb-2" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>Child War Survivor to Syria's Children: Don't Give Up</h3>
            <p className="text-base text-rose-900 mb-4" style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 300 }}>
              Story of a Liberian war survivor sharing hope and advice with Syrian children, highlighting the impact of SOS Children's Villages.
            </p>
            <a
              href="https://www.nbcnews.com/storyline/syrias-children/child-war-survivor-syrias-children-dont-give-n51161"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 font-bold text-rose-900 transition-all duration-200 hover:text-rose-700 hover:underline hover:decoration-2 hover:underline-offset-4 focus:outline-none focus:text-rose-700"
              style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}
            >
              VIEW COVERAGE
            </a>
          </div>
          <div className="flex flex-col items-start max-w-xl">
            <img src={todayLogo} alt="TODAY Logo" className="h-10 w-auto mb-2" />
            <span className="text-sm font-bold text-amber-900 mb-2 uppercase" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>TODAY</span>
            <h3 className="text-lg font-bold text-amber-900 mb-2" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>Red Cross urges people to donate blood amid coronavirus concerns</h3>
            <p className="text-base text-rose-900 mb-4" style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 300 }}>
              Coverage of the Red Cross's call for blood donations during the COVID-19 pandemic, featuring expert commentary and public health messaging.
            </p>
            <a
              href="https://www.today.com/health/red-cross-urges-people-donate-blood-amid-coronavirus-concerns-t175665"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 font-bold text-rose-900 transition-all duration-200 hover:text-rose-700 hover:underline hover:decoration-2 hover:underline-offset-4 focus:outline-none focus:text-rose-700"
              style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}
            >
              VIEW COVERAGE
            </a>
          </div>
          <div className="flex flex-col items-start max-w-xl">
            <img src={nytLogo} alt="New York Times Logo" className="h-10 w-auto mb-2" />
            <span className="text-sm font-bold text-amber-900 mb-2 uppercase" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>NEW YORK TIMES</span>
            <h3 className="text-lg font-bold text-amber-900 mb-2" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>Hurricane Season 2020: NOAA Predicts Busy Atlantic Season</h3>
            <p className="text-base text-rose-900 mb-4" style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 300 }}>
              Article on NOAA's forecast for an active hurricane season, with insights from FIU experts on disaster preparedness and climate impacts.
            </p>
            <a
              href="https://www.nytimes.com/2020/05/21/climate/hurricane-season-2020-noaa.html"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 font-bold text-rose-900 transition-all duration-200 hover:text-rose-700 hover:underline hover:decoration-2 hover:underline-offset-4 focus:outline-none focus:text-rose-700"
              style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}
            >
              VIEW COVERAGE
            </a>
          </div>
          <div className="flex flex-col items-start max-w-xl">
            <img src={cbsLogo} alt="CBS News Logo" className="h-10 w-auto mb-2" />
            <span className="text-sm font-bold text-amber-900 mb-2 uppercase" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>CBS NEWS MIAMI</span>
            <h3 className="text-lg font-bold text-amber-900 mb-2" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>FIU stages largest disaster drill in the state</h3>
            <p className="text-base text-rose-900 mb-4" style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 300 }}>
              News coverage of Florida International University's large-scale disaster drill, highlighting the university's leadership in emergency preparedness.
            </p>
            <a
              href="https://www.cbsnews.com/miami/news/florida-international-university-stages-largest-disaster-drill-in-the-state/"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 font-bold text-rose-900 transition-all duration-200 hover:text-rose-700 hover:underline hover:decoration-2 hover:underline-offset-4 focus:outline-none focus:text-rose-700"
              style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}
            >
              VIEW COVERAGE
            </a>
          </div>
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

function HomePage() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-x-hidden">
      {/* Below the fold color block */}
      <div className="absolute left-0 right-0 top-1/2 h-[60vh] z-0 bg-gradient-to-b from-transparent to-rose-100" style={{ minHeight: 400 }} />
      {/* Centered, large, overlapping images */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 mt-12 md:mt-0">
        <img
          src={stephArcInfield}
          alt="Stephanie Rendon in field"
          className={`w-[32rem] h-[32rem] max-w-full object-cover rounded-2xl shadow-2xl transition-opacity duration-1000 ${show ? 'opacity-100' : 'opacity-0'}`}
          style={{ background: '#fff8f1' }}
        />
        <img
          src={stephOnCopter}
          alt="Stephanie Rendon on helicopter"
          className={`w-[32rem] h-[32rem] max-w-full object-cover rounded-2xl shadow-2xl transition-opacity duration-1000 ${show ? 'opacity-100' : 'opacity-0'}`}
          style={{ background: '#fff8f1' }}
        />
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full">
      <div className="text-2xl md:text-3xl font-light text-rose-900 text-center" style={{ fontFamily: 'Roboto, system-ui, sans-serif', letterSpacing: '0.01em' }}>
        Stephanie Rendon <span className="mx-2">|</span> 786.222.0406 <span className="mx-2">|</span> stephanie.rendon@gmail.com
      </div>
    </div>
  );
}

function App() {
  const [page, setPage] = useState('home');
  const [portfolioCategory, setPortfolioCategory] = useState(null);

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 flex flex-col">
      {/* Navigation Bar */}
      <header className="w-full">
        <nav className="w-full flex items-center justify-between px-10 py-6">
          <span
            className="text-2xl font-extrabold tracking-wide text-amber-900 uppercase cursor-pointer"
            style={{ letterSpacing: '0.05em' }}
            onClick={() => { setPage('home'); setPortfolioCategory(null); }}
          >
            STEPHANIE RENDON
          </span>
          <div className="flex gap-10">
            <NavLink href="#about" onClick={e => { e.preventDefault(); setPage('about'); setPortfolioCategory(null); }} isActive={page === 'about'}>About</NavLink>
            <NavLink href="#portfolio" onClick={e => { e.preventDefault(); setPage('portfolio'); setPortfolioCategory('press'); }} isActive={page === 'portfolio'}>Portfolio</NavLink>
            <NavLink href="#contact" onClick={e => { e.preventDefault(); setPage('contact'); setPortfolioCategory(null); }} isActive={page === 'contact'}>Contact</NavLink>
          </div>
        </nav>
        <div className="w-full flex justify-center">
          <div className="border-t-4 border-t-rose-200 w-full max-w-6xl mx-10"></div>
        </div>
      </header>
      {page === 'home' && <HomePage />}
      {page === 'about' && <AboutPage />}
      {page === 'portfolio' && (
        <div className="pb-24 w-full">
          <PortfolioPage activeCategory={portfolioCategory} onSelectCategory={setPortfolioCategory} />
        </div>
      )}
      {page === 'contact' && <ContactPage />}
    </div>
  );
}

export default App;
