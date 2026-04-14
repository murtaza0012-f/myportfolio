import { useState, useEffect, useRef } from 'react'

// Data
const PROJECTS = [
  {
    id: '01',
    badge: 'wip',
    badgeText: '⚡ In Progress',
    name: 'Orgonoo',
    subtitle: 'Afghan Marketplace Platform',
    desc: 'Full-stack e-commerce marketplace built to empower Afghan women entrepreneurs — enabling global product distribution with a secure, scalable architecture from the ground up.',
    stack: ['Node.js', 'React', 'MySQL', 'Sequelize', 'JWT', 'Argon2', 'REST API', 'MVC'],
    highlights: ['Secure auth with JWT + Argon2', 'Role-based access control', 'Product & order management', 'Scalable MVC architecture'],
    links: [{ label: 'Private', url: '#' }],
  },
  {
    id: '02',
    badge: 'live',
    badgeText: '● Live',
    name: 'Walkman',
    subtitle: 'Password Manager — Hackathon AFEC 2026',
    desc: 'Secure password manager built in 48 hours during the AFEC Hackathon 2026. Developed in a team under pressure, delivered and deployed within the deadline.',
    stack: ['JavaScript', 'MERN', 'Security', 'Vercel'],
    highlights: ['Built in 48h team sprint', 'Deployed on Vercel', 'Focus on data security', 'Clean UX under deadline'],
    links: [
      { label: '↗ Live Demo', url: 'https://walkmanpass.vercel.app/' },
      { label: 'GitHub', url: 'https://github.com/murtaza0012-f/walkmanpass' },
    ],
  },
  {
    id: '03',
    badge: 'pro',
    badgeText: '🏢 Professional',
    name: 'ITAM Tool',
    subtitle: 'IT Asset Management — A2MI Informatique',
    desc: 'Full-stack contract and licence management system built from scratch during internship at A2MI Informatique. Handles software licences, maintenance contracts, and IT assets.',
    stack: ['PHP Native', 'MySQL', 'Merise', 'MVC Architecture', 'Agile'],
    highlights: ['Designed from zero', 'Database modelling (Merise)', 'Built in agile team', 'Real production context'],
    links: [{ label: 'Private — Professional Project', url: '#' }],
  },
]

const SKILLS = [
  { icon: '⚛️', title: 'Frontend', tags: ['React.js', 'JavaScript ES6+', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'EJS'], hot: ['React.js', 'JavaScript ES6+'] },
  { icon: '⚙️', title: 'Backend', tags: ['Node.js', 'Express.js', 'PHP Native', 'Python', 'Flask', 'REST API', 'MVC'], hot: ['Node.js', 'Express.js', 'PHP Native'] },
  { icon: '🗄️', title: 'Databases', tags: ['MySQL', 'MariaDB', 'MongoDB', 'SQLite', 'Sequelize ORM', 'Mongoose'], hot: ['MySQL', 'MongoDB', 'Sequelize ORM'] },
  { icon: '🔐', title: 'Security & Auth', tags: ['JWT', 'Argon2', 'Bcrypt', 'Sessions', 'OWASP', 'Crypto'], hot: ['JWT', 'Argon2', 'OWASP'] },
  { icon: '📐', title: 'Architecture & Design', tags: ['Merise (MCD/MLD)', 'UML', 'Clean Code', 'Figma', 'Canva'], hot: ['Merise (MCD/MLD)', 'Clean Code'] },
  { icon: '🛠️', title: 'Tools & Environment', tags: ['Git', 'GitHub', 'Linux', 'VS Code', 'Vercel', 'Railway'], hot: ['Git', 'GitHub'] },
]

const EXPERIENCES = [
  {
    period: 'Mar 2026 – Present',
    flag: '🇫🇷',
    location: 'La Rochelle, France',
    role: 'Web Developer Intern',
    company: 'A2MI Informatique',
    bullets: [
      'Building an ITAM tool from scratch — architecture, DB modelling, business logic in native PHP',
      'Full agile workflow — sprints, stand-ups, code reviews with the team',
      'Database design using Merise methodology',
    ],
  },
  {
    period: '2025',
    flag: '🌍',
    location: 'Remote',
    role: 'Full-Stack Developer — Freelance',
    company: 'Independent',
    bullets: [
      'Developed Orgonoo marketplace (Node.js, React, MySQL, JWT, Argon2)',
      'Secure MVC architecture, role management, REST API design',
    ],
  },
  {
    period: 'May 2023 – Dec 2024',
    flag: '🇮🇷',
    location: 'Tehran, Iran',
    role: 'System Analyst & Designer',
    company: 'Fara Rayaneh Co',
    bullets: [
      'Business needs analysis and Merise/UML system modelling',
      'Enterprise database design and application deployment',
    ],
  },
  {
    period: 'Aug 2021 – Jan 2023',
    flag: '🇦🇫',
    location: 'Kabul, Afghanistan',
    role: 'Web Developer',
    company: 'Hosh Zareen Co',
    bullets: [
      'Built web applications with HTML, CSS, JavaScript and Python',
      'UX optimisation and bug resolution',
    ],
  },
  {
    period: '4+ years',
    flag: '🇦🇫',
    location: 'Afghanistan',
    role: 'IT Technician (Polyvalent)',
    company: 'Indira Gandhi Hospital & National Exam Authority',
    bullets: [
      'Network and systems maintenance, database administration',
      'Server and surveillance infrastructure setup',
    ],
  },
]

// Hooks
function useCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const move = (e) => {
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top = e.clientY + 'px'
      }
      if (ringRef.current) {
        ringRef.current.style.left = e.clientX + 'px'
        ringRef.current.style.top = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return { dotRef, ringRef }
}

function useScrollFade() {
  useEffect(() => {
    const els = document.querySelectorAll('.fade-in')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.12 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

// Components
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <a href="#hero" className="nav-logo">MF<span>.</span></a>
      <ul className="nav-links">
        {['About','Skills','Projects','Experience','Contact'].map(l => (
          <li key={l}><a href={`#${l.toLowerCase()}`} className={l==='Contact'?'nav-cta':''}>{l}</a></li>
        ))}
      </ul>
    </nav>
  )
}

function Hero() {
  return (
    <div id="hero" className="hero">
      <p className="hero-eyebrow">Full-Stack Developer</p>
      <h1 className="hero-name">
        FETRAT<br /><span className="acc">Murtaza</span>
      </h1>
      <p className="hero-sub">
        Node.js · React · PHP · <span className="hl">Security</span>
      </p>
      <p className="hero-tagline">
        "I fixed routers, PCs and managed IT department in an Afghan hospital with limited resources.<br />
        analysed enterprise systems in Tehran.<br />
        Today I build secure web applications in France.<br />
        Three countries. One consistent drive."
      </p>
      <div className="hero-btns">
        <a href="#projects" className="btn btn-p">View Projects ↓</a>
        <a href="#contact" className="btn btn-s">Hire Me →</a>
        <a href="https://github.com/murtaza0012-f" target="_blank" rel="noreferrer" className="btn btn-s">GitHub ↗</a>
      </div>
      <div className="hero-scroll">
        <div className="scroll-bar" />
        Scroll to explore
      </div>
    </div>
  )
}

function About() {
  return (
    <section id="about">
      <p className="section-label fade-in">About me</p>
      <h2 className="section-title fade-in">A developer built by<br /><span>three countries</span></h2>
      <div className="about-grid">
        <div className="about-text fade-in">
          <p>I'm a <strong>junior full-stack developer</strong> with 5+ years of IT experience — systems, networks, analysis — deliberately transitioned into modern web development with a specialisation in <strong>secure REST APIs</strong>.</p>
          <blockquote className="about-quote">
            "Every environment I worked in taught me something the others couldn't. That's my edge."
          </blockquote>
          <p>Currently interning at <strong>A2MI Informatique</strong> (La Rochelle) building a complete ITAM tool from scratch in native PHP. In parallel, developing <strong>Orgonoo</strong> — an e-commerce marketplace built to support Afghan women entrepreneurs globally.</p>
          <p>My <strong>Licence in Computer Engineering</strong> is officially recognised as Bac+3 by ENIC-NARIC France. Currently completing <strong>DWWM (Titre RNCP)</strong> at AFEC La Rochelle.</p>
          <p style={{marginTop: 28}}>🎯 <strong>Seeking:</strong> Master Bac+5 alternance in full-stack / security-oriented web development — Lyon or remote — September 2026.</p>
          <div style={{display:'flex',gap:12,marginTop:32,flexWrap:'wrap'}}>
            <a href="https://linkedin.com/in/murtazafetrat0012" target="_blank" rel="noreferrer" className="btn btn-s" style={{fontSize:'0.76rem',padding:'9px 18px'}}>LinkedIn ↗</a>
            <a href="https://github.com/murtaza0012-f" target="_blank" rel="noreferrer" className="btn btn-s" style={{fontSize:'0.76rem',padding:'9px 18px'}}>GitHub ↗</a>
          </div>
        </div>
        <div className="journey fade-in">
          {[
            { flag: '🇫🇷 France · 2025–Now', role: 'DWWM Training + Internship', desc: 'AFEC La Rochelle · A2MI Informatique · Agile development · PHP, React, Node.js' },
            { flag: '🌍 Remote · 2025', role: 'Freelance Full-Stack Dev', desc: 'Built Orgonoo marketplace · Node.js, React, MySQL, JWT, Argon2' },
            { flag: '🇮🇷 Tehran · 2023–2024', role: 'System Analyst & Designer', desc: 'Fara Rayaneh Co · Merise/UML · Enterprise DB design & deployment' },
            { flag: '🇦🇫 Kabul · 2021–2023', role: 'Web Developer', desc: 'Hosh Zareen Co · HTML, CSS, JS, Python · UX optimisation' },
            { flag: '🇦🇫 Afghanistan · 4+ yrs', role: 'IT Technician', desc: 'Indira Gandhi Hospital & National Exam Authority · Networks, systems, DB admin' },
          ].map((s, i) => (
            <div key={i} className="j-step">
              <div className="j-left">
                <div className="j-dot" />
                <div className="j-line" />
              </div>
              <div>
                <p className="j-flag">{s.flag}</p>
                <p className="j-role">{s.role}</p>
                <p className="j-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills">
      <p className="section-label fade-in">Technical stack</p>
      <h2 className="section-title fade-in">Skills &amp; <span>Technologies</span></h2>
      <div className="skills-grid">
        {SKILLS.map((s, i) => (
          <div key={i} className="sk-card fade-in">
            <div className="sk-icon">{s.icon}</div>
            <p className="sk-title">{s.title}</p>
            <div className="sk-tags">
              {s.tags.map(t => (
                <span key={t} className={`sk-tag${s.hot.includes(t) ? ' hot' : ''}`}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects">
      <p className="section-label fade-in">What I've built</p>
      <h2 className="section-title fade-in">Featured <span>Projects</span></h2>
      <div className="proj-list">
        {PROJECTS.map((p, i) => (
          <div key={i} className="proj-card fade-in">
            <div className="proj-num">{p.id}</div>
            <div>
              <span className={`proj-badge badge-${p.badge}`}>{p.badgeText}</span>
              <h3 className="proj-name">{p.name}<span style={{color:'var(--text-mid)',fontWeight:400,fontSize:'1rem'}}> — {p.subtitle}</span></h3>
              <p className="proj-desc">{p.desc}</p>
              <div className="proj-stack">
                {p.stack.map(t => <span key={t} className="st-tag">{t}</span>)}
              </div>
              <div className="proj-links">
                {p.links.map((l, j) => (
                  <a key={j} href={l.url} target="_blank" rel="noreferrer" className="proj-link">{l.label}</a>
                ))}
              </div>
            </div>
            <div className="proj-highlights">
              {p.highlights.map((h, j) => (
                <div key={j} className="ph-item">{h}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience">
      <p className="section-label fade-in">Career path</p>
      <h2 className="section-title fade-in">Professional <span>Experience</span></h2>
      <div className="exp-list">
        {EXPERIENCES.map((e, i) => (
          <div key={i} className="exp-card fade-in">
            <div>
              <p className="exp-period">{e.period}</p>
              <p className="exp-flag">{e.flag}</p>
              <p className="exp-loc">{e.location}</p>
            </div>
            <div>
              <p className="exp-role">{e.role}</p>
              <p className="exp-co">{e.company}</p>
              <ul className="exp-buls">
                {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handle = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact">
      <p className="section-label fade-in">Get in touch</p>
      <h2 className="section-title fade-in">Let's <span>work together</span></h2>
      <div className="contact-wrap">
        <div className="fade-in">
          <p className="contact-intro">
            I'm actively looking for a <strong style={{color:'var(--text)'}}>Master Bac+5 alternance</strong> in full-stack web development — Lyon or remote — starting <strong style={{color:'var(--accent)'}}>September 2026</strong>.<br /><br />
            Whether you're a school, a company, or just want to talk tech — I'm available.
          </p>
          <div className="c-links">
            {[
              { icon: '✉️', label: 'murtazafetrat0012@gmail.com', url: 'mailto:murtazafetrat0012@gmail.com' },
              { icon: '📞', label: '+33 7 45 81 39 07', url: 'tel:+33745813907' },
              { icon: '💼', label: 'linkedin.com/in/murtazafetrat0012', url: 'https://linkedin.com/in/murtazafetrat0012' },
              { icon: '🐙', label: 'github.com/murtaza0012-f', url: 'https://github.com/murtaza0012-f' },
            ].map((l, i) => (
              <a key={i} href={l.url} target="_blank" rel="noreferrer" className="c-link">
                <span className="c-icon">{l.icon}</span>
                {l.label}
              </a>
            ))}
          </div>
        </div>
        <form className="c-form fade-in" onSubmit={handle}>
          <div className="f-group">
            <label>Your Name</label>
            <input type="text" placeholder="John Doe" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          </div>
          <div className="f-group">
            <label>Email</label>
            <input type="email" placeholder="hello@company.com" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          </div>
          <div className="f-group">
            <label>Message</label>
            <textarea rows={5} placeholder="Tell me about your project or alternance opportunity..." required value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
          </div>
          <button type="submit" className="btn btn-p" style={{width:'100%',justifyContent:'center',cursor:'none'}}>
            {sent ? '✓ Message sent!' : 'Send Message →'}
          </button>
        </form>
      </div>
    </section>
  )
}

// App
export default function App() {
  const { dotRef, ringRef } = useCursor()
  useScrollFade()

  return (
    <>
      <div className="cursor" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
      <div className="grid-overlay" />
      <div className="hero-bg">
        <div className="orb orb1" />
        <div className="orb orb2" />
        <div className="orb orb3" />
      </div>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <footer>
        <span className="f-logo">MF<span>.</span></span>
        <span>Designed & built by Murtaza Fetrat · La Rochelle, France · 2026</span>
        <span>Seeking alternance · Sept 2026</span>
      </footer>
    </>
  )
}
