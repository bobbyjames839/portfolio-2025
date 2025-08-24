import './App.css';
import { useEffect, useState, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

const technologies = [ 'TypeScript','JavaScript','Python','Node.js','Flask','FastAPI','Next.js','ReactJS','SQL' ];

// Placeholder academic data (replace with your real results if different)
const aLevels = [
  { subject:'Biology', grade:'A*' },
  { subject:'Chemistry', grade:'A*' },
  { subject:'Mathematics', grade:'A*' },
  { subject:'EPQ', grade:'A*' }
];

// Notable university results (UCL BSc Biochemistry – First Class)
const uniNotables = [
  { module:'Python for Bioscience Research (Final Exam)', grade:'96%' },
  { module:'Dissertation: Deep Learning in NMR', grade:'80%' }
];

// Removed interests chips per user request
const interests = [];

const experiences = [
  {
    company: 'Deutsche Bank',
    role: 'Full Stack Engineer Intern',
    period: 'Jun 2025 – Aug 2025',
    summary: 'Summer internship delivering full stack features (UI + services) with an emphasis on performance and reliability.'
  },
  {
    company: 'Avanade',
    role: 'Data & AI Intern',
    period: 'Jun 2024 – Aug 2024',
    summary: 'Worked across data engineering & applied AI: pipelines, model experimentation, and insight delivery.'
  }
];

const education = [
  {
    institution: 'University College London',
    period: '2022–2025',
    degree: 'BSc Biochemistry',
    degreeGrade: 'First Class Honours'
  },
  {
    institution: 'A Levels',
    period: '2020–2022', // assumption; adjust if different
    detail: 'Biology, Chemistry, Mathematics, EPQ – 4 A*'
  }
];

// Projects (cleaned + with links)
const projects = [
  {
    name: 'Bobee',
    period: 'Jun 2025',
  summary: 'AI journalling & reflection app.',
    stack: ['React Native','Node.js','Firebase','OpenAI', 'Stripe', 'Render'],
    highlights: [
      'Voice note → transcript + insight pipeline',
      'Mood & productivity trend charts',
      'Personalised chatbot using stored profile context',
      'Subscription billing (Stripe)'
    ],
    links: {
      demo: 'https://www.youtube.com/watch?v=fFQEB0aCTBg' // TODO: replace with real demo video link
    }
  },
  {
    name: 'ChatGPT Clone',
    period: 'Jul 2024',
  summary: 'Lightweight ChatGPT-style web app.',
    stack: ['ReactJS','Flask','Firebase','OpenAI','Stripe'],
    highlights: [
      'Token streaming responses (real-time reveal)',
      'Persistent conversation memory & context windowing',
      'System / user prompt layering + model & temperature controls',
      'Session history stored (auth + secure persistence)'
    ],
    links: {
      demo: 'https://www.youtube.com/watch?v=G8Z5GTUMJG8' // TODO: replace with real demo video link
    }
  },
  {
    name: 'Calendar Booking System',
    period: 'Aug 2024',
  summary: 'Multi-role scheduling & appointment platform for salons.',
    stack: ['ReactJS','Flask','Firebase', 'Netlify'],
    highlights: [
      'Client self-service booking with real‑time slot availability',
      'Stylist dashboard: daily/weekly calendar, drag-to-reschedule',
      'Automated email confirmations & cancellations',
      'Blocked time / PTO & recurring schedule templates'
    ]
  }
  ,{
    name: 'Insulin Dose Predictor',
    period: 'Jun 2024',
    summary: 'ML tool estimating mealtime insulin dose.',
    stack: ['React','Flask','Scikit-learn'],
    highlights: [
      'Food entry with Open Food API → auto carb & macro parsing',
      'Feature set: carbs, time-of-day, pre-meal glucose, activity level, +10',
      'Random Forest Regressor tuned for MAE < 1.0U',
      'Confidence band + warning when uncertainty high'
    ],
    links: { demo: '' }
  }
];

function Home() {
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = setTimeout(()=>setReady(true),60); return ()=>clearTimeout(t); }, []);
  return (
    <div className={`hero-wrapper no-visual ${ready ? 'is-ready' : ''}`}>
  <SiteHeader />
      <main className="hero">
        <div className="hero-left">
          <div className="group group-intro">
            <p className="eyebrow fade-up">HEY THERE !</p>
            <h1 className="headline fade-up" style={{'--d':'60ms'}}>I AM <span className="gradient-accent glow-text">BOBBY DAVIDSON</span></h1>
            <p className="subhead fade-up" style={{'--d':'120ms'}}>Software Engineer</p>
          </div>
          <div className="group group-skills fade-up" style={{'--d':'180ms'}}>
            <div className="tech-stack" aria-label="Technologies I work with">
              {technologies.map((t,i)=>(<span key={t} className="tech-pill pill-anim" style={{'--i':i}}>{t}</span>))}
            </div>
            <div className="socials" aria-label="Social links">
              <a href="https://www.linkedin.com/in/bobby-davidson1/" aria-label="LinkedIn" className="icon icon-anim" style={{'--i':0}}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 0 0 5.001 2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM14.5 9c-2.042 0-3.019 1.153-3.5 1.96V9H7v12h4v-6.2c0-1.288.94-2.3 2.2-2.3 1.187 0 1.8.86 1.8 2.3V21h4v-6.8C19 10.63 17.463 9 15.3 9c-.3 0-.6.02-.8.06z"/></svg>
              </a>
              <a href="https://github.com/bobbyjames839" aria-label="GitHub" className="icon icon-anim" style={{'--i':1}}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.93c.58.1.79-.25.79-.56v-2.05c-3.2.7-3.87-1.37-3.87-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.18.08 1.8 1.22 1.8 1.22 1.04 1.78 2.73 1.27 3.4.97.1-.77.4-1.28.72-1.57-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.28 1.2-3.08-.12-.3-.52-1.52.11-3.17 0 0 .97-.31 3.18 1.18a11 11 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.5 3.17-1.18 3.17-1.18.63 1.65.23 2.87.11 3.17.75.8 1.2 1.82 1.2 3.08 0 4.43-2.69 5.4-5.25 5.69.41.36.77 1.07.77 2.17v3.22c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>
              </a>
            </div>
          </div>
          <div className="group group-cta fade-up" style={{'--d':'260ms'}}>
            <div className="actions">
              <Link to="/work" className="cta pulse-on-hover" style={{textDecoration:'none', display:'inline-flex', alignItems:'center'}}>See My Work</Link>
              <Link to="/about" className="btn-secondary fade-up" style={{'--d':'320ms', textDecoration:'none', display:'inline-flex', alignItems:'center'}}>About Me</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function AboutPage() {
  const [ready,setReady]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setReady(true),40); return ()=>clearTimeout(t);},[]);
  return (
    <div className={`about-page-wrapper ${ready ? 'is-ready': ''}`}>
      <div className="about-page-hero">
  <SiteHeader />
        <div className="about-page-content">
          <div className="about-left">
            <h1 className="about-page-title fade-up" style={{'--d':'60ms'}}>About <span className="gradient-accent glow-text">Me</span></h1>
            <p className="about-lead fade-up" style={{'--d':'120ms'}}>
              I’m a self-taught software engineer with a background in Biochemistry, where I first began coding. I like building reliable products that transform slow, manual workflows into fast, scalable systems—combining efficient backends with clean, accessible interfaces. I enjoy working on both the frontend and the backend
            </p>
            <div className="experience-inline fade-up" style={{'--d':'180ms'}}>
              <h2 className="exp-inline-title">Experience</h2>
              <ul className="exp-inline-list" aria-label="Experience summary">
                {experiences.map(exp => (
                  <li key={exp.company} className={`exp-inline-item${exp.company === 'Avanade' ? ' exp-extra-gap' : ''}`}>
                    <div className="exp-inline-row">
                      <span className="exp-inline-company">{exp.company}</span>
                      <span className="exp-inline-period"><span>{exp.period}</span></span>
                    </div>
                    <span className="exp-inline-role">{exp.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="about-right fade-up" style={{'--d':'220ms'}}>
            <div className="education-inline">
              <h2 className="exp-inline-title">Education</h2>
              <ul className="exp-inline-list" aria-label="Education summary">
                {education.map(item => (
                  <li key={item.institution} className={`exp-inline-item${item.institution === 'A Levels' ? ' edu-a-levels' : ''}`}>
                    <div className="exp-inline-row">
                      <span className="exp-inline-company">{item.institution}</span>
                      <span className="exp-inline-period"><span>{item.period}</span></span>
                    </div>
                    {item.institution !== 'A Levels' && item.degree && (
                      <div className="edu-degree-row">
                        <span className="edu-degree-title">{item.degree}</span>
                        <span className="edu-degree-grade">{item.degreeGrade}</span>
                      </div>
                    )}
                    {item.institution === 'University College London' && (
                      <div className="edu-modules-block">
                        <h3 className="edu-subtitle">Notable Modules</h3>
                        <ul className="uni-inline-modules" aria-label="Notable modules">
                          {uniNotables.map(n => (
                            <li key={n.module} className="module-item">
                              <span className="module-name">{n.module}</span>
                              <strong className="module-grade">{n.grade}</strong>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {item.institution === 'A Levels' && (
                      <div className="a-level-compact" aria-label="A Level subjects list">
                        {aLevels.map(s => (
                          <div key={s.subject} className="a-level-row">
                            <span className="a-level-subject-small">{s.subject}</span>
                            <strong className="a-level-grade-strong">{s.grade}</strong>
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="about-bg" aria-hidden="true" />
      </div>
    </div>
  );
}

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<AboutPage />}/>
  <Route path="/work" element={<WorkPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

// Removed separate ExperienceSection; experience now inline under About intro within 100vh

function WorkPage(){
  const [ready,setReady]=useState(false);
  const [index,setIndex]=useState(0); // slide index
  const sliderRef = useRef(null);
  // Responsive: single project per slide below 900px, otherwise pairs of two
  const useMedia = (query)=>{
    const [match,setMatch] = useState(()=> window.matchMedia ? window.matchMedia(query).matches : false);
    useEffect(()=>{
      if(!window.matchMedia) return;
      const mq = window.matchMedia(query);
      const handler = (e)=> setMatch(e.matches);
      mq.addEventListener ? mq.addEventListener('change',handler) : mq.addListener(handler);
      return ()=>{ mq.removeEventListener ? mq.removeEventListener('change',handler) : mq.removeListener(handler); };
    },[query]);
    return match;
  };
  // Single-card mode threshold slightly reduced (was 1100px) per request
  const isSingle = useMedia('(max-width:1050px)');
  const slides = [];
  if(isSingle){
    for(let i=0;i<projects.length;i++){ slides.push([projects[i]]); }
  } else {
    for(let i=0;i<projects.length;i+=2){ slides.push(projects.slice(i,i+2)); }
  }
  const maxIndex = slides.length - 1;
  // Clamp index if layout mode changes reducing slides
  useEffect(()=>{ setIndex(i=> Math.min(i, maxIndex)); },[maxIndex]);
  useEffect(()=>{const t=setTimeout(()=>setReady(true),40); return ()=>clearTimeout(t);},[]);
  useEffect(()=>{
    const el = sliderRef.current; if(!el) return;
    const slideWidth = el.clientWidth; // each slide full width
    el.scrollTo({ left: index * slideWidth, behavior:'smooth'});
  },[index]);

  const go = (dir)=> setIndex(i=> Math.min(maxIndex, Math.max(0, i+dir)));

  // keyboard arrow navigation
  useEffect(()=>{
    const handler = (e)=>{
      if(e.key === 'ArrowRight') { go(1); }
      else if(e.key === 'ArrowLeft'){ go(-1); }
    };
    window.addEventListener('keydown',handler);
    return ()=>window.removeEventListener('keydown',handler);
  },[maxIndex]);

  return (
    <div className={`work-page-wrapper ${ready ? 'is-ready': ''}`}>
	<SiteHeader />
      <main className="work-content work-slider-shell">
        <div className="work-header fade-up" style={{'--d':'60ms'}}>
          <h1 className="work-title">My <span className="gradient-accent glow-text">Work</span></h1>
          <p className="work-lead">Some of my projects. Source code for these and others is on <a href="https://github.com/bobbyjames839" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
        </div>
        <div className="work-slider" ref={sliderRef} aria-label="Projects carousel">
          {slides.map((group,i)=> (
            <div className={`work-slide ${isSingle ? 'single-mode' : ''}`} key={i} aria-roledescription="slide" aria-label={group.length===2 ? `Projects ${i*2+1} & ${i*2+2}` : `Project ${projects.indexOf(group[0])+1}`}> 
              {group.map(p => (
                <div key={p.name} className="project-card fade-up" style={{'--d': `${120 + (i===index ? 0: 0)}ms`}}>
                  <div className="project-card-top">
                    <div className="project-heading-row">
                      <h2 className="project-name">{p.name}</h2>
                      <span className="project-period"><span>{p.period}</span></span>
                    </div>
                    <p className="project-summary">{p.summary}</p>
                  </div>
                  <div className="project-meta">
                    <div className="project-stack" aria-label="Tech stack">
                      {p.stack.map(t=> <span key={t} className="stack-pill">{t}</span>)}
                    </div>
                    {p.highlights && (
                      <ul className="project-highlights" aria-label="Key highlights">
                        {p.highlights.map(h=> <li key={h}>{h}</li>)}
                      </ul>
                    )}
                    {p.links && (p.links.live || p.links.repo) && (
                      <div className="project-links" aria-label="Project links">
                        {p.links.live && <a href={p.links.live} target="_blank" rel="noopener noreferrer" className="proj-link">Live</a>}
                        {p.links.repo && <a href={p.links.repo} target="_blank" rel="noopener noreferrer" className="proj-link">Code</a>}
                      </div>
                    )}
                  </div>
                  {p.links && p.links.demo && (
                    <a href={p.links.demo} target="_blank" rel="noopener noreferrer" className="proj-link demo-video-link" aria-label={`${p.name} demo video`}>Demo Video</a>
                  )}
                </div>
              ))}
              {group.length === 1 && !isSingle && (
                <div className="project-card project-card-empty" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
        <div className="work-slider-controls">
          <button className="slider-btn prev" onClick={()=>go(-1)} disabled={index===0} aria-label="Previous projects">←</button>
          <div className="slider-dots" role="tablist" aria-label="Project groups">
            {slides.map((_,i)=>(
              <button key={i} role="tab" aria-selected={i===index} className={`dot ${i===index? 'active':''}`} onClick={()=>setIndex(i)} aria-label={`Go to group ${i+1}`}></button>
            ))}
          </div>
          <button className="slider-btn next" onClick={()=>go(1)} disabled={index===maxIndex} aria-label="Next projects">→</button>
        </div>
      </main>
    </div>
  );
}

// Reusable site header
function SiteHeader(){
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  return (
    <header className="site-nav about-nav">
      <Link to="/" className="brand">BD</Link>
      <nav className="about-links">
  <Link to="/" className="mini-link" aria-current={isActive('/') ? 'page': undefined}>Home</Link>
  <Link to="/work" className="mini-link" aria-current={isActive('/work') ? 'page': undefined}>Work</Link>
  <Link to="/about" className="mini-link" aria-current={isActive('/about') ? 'page': undefined}>About</Link>
      </nav>
    </header>
  );
}
