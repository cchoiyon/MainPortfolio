/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Linkedin, Mail, ExternalLink, X, Menu } from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Project {
  name: string;
  description: string;
  url: string;
  status?: string;
}



interface NavItem {
  label: string;
  href: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
];

const PROJECTS: Project[] = [
  {
    name: 'IT Infrastructure Simulation',
    description: 'Enterprise IT environment built from scratch using Hyper-V. Active Directory, Windows Server 2022, DNS/DHCP, and Linux monitoring.',
    url: 'https://github.com/cchoiyon/IT-Infrastructure-Simulation-Project',
    status: 'In Progress',
  },
  {
    name: 'Ghostflow',
    description: 'VS Code extension for live security architecture visualization and automated Data Flow Diagram generation using STRIDE methodology.',
    url: 'https://github.com/cchoiyon',
    status: 'In Progress',
  },
  {
    name: 'Cloud Security Analysis',
    description: 'Simulated cloud storage with MinIO to replicate AWS S3. Configured bucket policies and analyzed the 2019 Capital One breach.',
    url: '#',
  },
  {
    name: 'On-Path (AiTM) Attack Simulation',
    description: 'Penetration testing simulation demonstrating an AitM attack to intercept credentials via social engineering and BEC tactics.',
    url: 'https://github.com/cchoiyon/Project-Performing-an-On-Path-AiTM-Attack',
  },
  {
    name: 'Network Sniffing & Forensics',
    description: 'Python-based forensic project using tcpdump and Wireshark to extract plaintext credentials from unencrypted protocols.',
    url: 'https://github.com/cchoiyon/Project-Network-Traffic-Sniffing-Forensic-Analysis',
  },
  {
    name: 'Escape',
    description: 'Interactive web-based game to help users master the Linux command line through immersive gameplay.',
    url: 'https://github.com/cchoiyon/Escape',
  },
];



interface ExperienceItem {
  period: string;
  role: string;
  org: string;
  location: string;
  bullets: string[];
}

const EXPERIENCE: ExperienceItem[] = [
  {
    period: 'August 2023 – May 2025',
    role: 'TU Dev Member',
    org: 'Temple University',
    location: 'Philadelphia, PA',
    bullets: [
      'Active member of Temple's premier software development community.',
      'Collaborated on various projects, enhancing coding skills and teamwork abilities.',
      'Participated in weekly technical workshops and coding challenges to sharpen proficiency in development technologies.',
    ],
  },
  {
    period: 'May 2024 – August 2024',
    role: 'Software Developer Intern',
    org: 'AnswerRocket',
    location: 'Remote',
    bullets: [
      'Participated in daily Agile ceremonies, including stand-ups and sprint planning, ensuring timely project delivery.',
      'Debugged and optimized existing code, improving the performance of core product features.',
      'Developed automated unit tests to ensure software reliability and reduce future code defects.',
    ],
  },
  {
    period: 'August 2022 – December 2022',
    role: 'IT Help Desk Support',
    org: 'Temple University',
    location: 'Philadelphia, PA',
    bullets: [
      'Installed and customized network hardware and software to maintain a centralized community resource hub, ensuring a secure and dynamic environment.',
      'Planned and executed hardware/software system upgrades and configuration changes to improve network performance.',
      'Ran installation jobs and scripts to automate routine maintenance tasks, demonstrating keen attention to detail.',
    ],
  },
];

const CERTIFICATIONS = [
  { name: 'Cisco CCNA', status: 'In Progress' },
  { name: 'CompTIA Security+', url: 'https://cp.certmetrics.com/comptia/en/public/verify/credential/ddcc7e2bbb2241b1a0e4b57ead24c7aa' },
  { name: 'IT Support Fundamentals', org: 'Google / Coursera', url: 'https://www.coursera.org/account/accomplishments/verify/C2S6MG2RYLWZ' },
  { name: 'Google AI Essentials', org: 'Google / Coursera', url: 'https://www.coursera.org/account/accomplishments/verify/D1FUR9ZY5LY1' },
];

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

const Divider = () => (
  <div style={{ borderTop: '1px solid #1f1f1f', marginTop: 40, marginBottom: 40 }} />
);

const SectionLabel = ({ text }: { text: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
    <span style={{ fontSize: 12, color: '#666', letterSpacing: '0.05em', fontWeight: 500 }}>
      {text}
    </span>
    <ChevronIcon />
  </div>
);

const ChevronIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

// ---------------------------------------------------------------------------
// Menu overlay (slide-in from left, like the reference)
// ---------------------------------------------------------------------------

interface MenuOverlayProps {
  open: boolean;
  onClose: () => void;
  activeSection: string;
}

const MenuOverlay = ({ open, onClose, activeSection }: MenuOverlayProps) => (
  <AnimatePresence>
    {open && (
      <>
        {/* Backdrop */}
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 90,
          }}
        />

        {/* Panel */}
        <motion.nav
          key="panel"
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.28, ease: [0.32, 0, 0.67, 0] }}
          style={{
            position: 'fixed', top: 0, left: 0, bottom: 0,
            width: 280, background: '#0a0a0a',
            zIndex: 100, padding: '28px 32px',
            display: 'flex', flexDirection: 'column',
          }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close menu"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#999', marginBottom: 40, alignSelf: 'flex-start',
              display: 'flex', alignItems: 'center', padding: 0,
            }}
          >
            <X size={18} />
          </button>

          {/* Nav links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 48 }}>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={onClose}
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  color: activeSection === item.href.replace('#', '') ? '#e8e8e8' : '#555',
                  padding: '8px 0',
                  transition: 'color 0.15s',
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          <Divider />

          {/* Projects group */}
          <div>
            <div style={{ fontSize: 11, color: '#444', letterSpacing: '0.07em', marginBottom: 12, textTransform: 'uppercase' }}>
              Projects
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {PROJECTS.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    color: '#555',
                    padding: '6px 0',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#e8e8e8')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#555')}
                >
                  {p.name}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom socials */}
          <div style={{ marginTop: 'auto', display: 'flex', gap: 20 }}>
            {[
              { icon: Linkedin, href: 'https://www.linkedin.com/in/choiyon-chakraborty/', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:choiyon321@gmail.com', label: 'Email' },
              { icon: Github, href: 'https://github.com/cchoiyon', label: 'GitHub' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{ color: '#444', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#e8e8e8')}
                onMouseLeave={e => (e.currentTarget.style.color = '#444')}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </motion.nav>
      </>
    )}
  </AnimatePresence>
);

// ---------------------------------------------------------------------------
// Main App
// ---------------------------------------------------------------------------

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Lightweight scroll spy
  useEffect(() => {
    const ids = ['home', 'about', 'projects', 'experience'];
    const onScroll = () => {
      const scrollY = window.scrollY;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.offsetTop - 120 <= scrollY) {
          setActiveSection(ids[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#e8e8e8' }}>
      {/* Hamburger trigger */}
      <button
        id="menu-trigger"
        aria-label="Open navigation"
        onClick={() => setMenuOpen(true)}
        style={{
          position: 'fixed', top: 20, left: 20, zIndex: 80,
          background: 'none', border: 'none', cursor: 'pointer',
          color: '#555', padding: 4,
          transition: 'color 0.15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = '#e8e8e8')}
        onMouseLeave={e => (e.currentTarget.style.color = '#555')}
      >
        <Menu size={18} />
      </button>

      {/* Menu overlay */}
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} activeSection={activeSection} />

      {/* ------------------------------------------------------------------ */}
      {/* Main content — single column, left-aligned, tight max-width         */}
      {/* ------------------------------------------------------------------ */}
      <main
        style={{
          maxWidth: 560,
          margin: '0 auto',
          padding: '80px 24px 120px',
        }}
      >
        {/* ── Hero / Identity ── */}
        <section id="home">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: 20 }}
          >
            <div
              style={{
                width: 48, height: 48, borderRadius: '50%',
                background: 'linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, color: '#666', fontWeight: 600,
                border: '2px solid #1f1f1f',
                userSelect: 'none',
              }}
            >
              C
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10, color: '#e8e8e8' }}>
              Choiyon Chakraborty
            </h1>
            <p style={{ fontSize: 15, color: '#999', lineHeight: 1.65, maxWidth: 440, marginBottom: 24 }}>
              I'm a Cybersecurity student at Temple University, building tools and systems that defend — and sometimes break —{' '}
              <span style={{ color: '#e8e8e8' }}>network infrastructure</span>.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              {[
                { icon: Linkedin, href: 'https://www.linkedin.com/in/choiyon-chakraborty/', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:choiyon321@gmail.com', label: 'Email' },
                { icon: Github, href: 'https://github.com/cchoiyon', label: 'GitHub' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{ color: '#444', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#e8e8e8')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#444')}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>
        </section>

        <Divider />

        {/* ── About ── */}
        <section id="about">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <SectionLabel text="About" />
            <p style={{ color: '#888', lineHeight: 1.75, marginBottom: 14 }}>
              I'm currently in my final year studying Cybersecurity at Temple University. My focus is on network security, cloud infrastructure, and building developer tools — most recently{' '}
              <a
                href="https://github.com/cchoiyon"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#e8e8e8', borderBottom: '1px solid #2f2f2f', transition: 'border-color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#666')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#2f2f2f')}
              >Ghostflow
              </a>
              , a VS Code extension for live threat visualization.
            </p>
            <p style={{ color: '#888', lineHeight: 1.75 }}>
              I'm actively seeking full-time roles in security engineering or security operations. I learn by doing, almost every concept I've studied has a matching project in my GitHub.
            </p>
          </motion.div>
        </section>

        <Divider />

        {/* ── Projects ── */}
        <section id="projects">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <SectionLabel text="Projects" />
            <ul style={{ listStyle: 'none' }}>
              {PROJECTS.map((project, i) => (
                <li key={i}>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'block',
                      padding: '12px 0',
                      borderBottom: i < PROJECTS.length - 1 ? '1px solid #141414' : 'none',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget.querySelector('.proj-name') as HTMLElement).style.color = '#e8e8e8';
                      (e.currentTarget.querySelector('.proj-arrow') as HTMLElement).style.opacity = '1';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget.querySelector('.proj-name') as HTMLElement).style.color = '#bbb';
                      (e.currentTarget.querySelector('.proj-arrow') as HTMLElement).style.opacity = '0';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span className="proj-name" style={{ fontSize: 14, fontWeight: 500, color: '#bbb', transition: 'color 0.15s' }}>
                        {project.name}
                      </span>
                      {project.status && (
                        <span style={{
                          fontSize: 10, color: '#666', border: '1px solid #2a2a2a',
                          padding: '1px 6px', borderRadius: 4, letterSpacing: '0.04em',
                        }}>
                          {project.status}
                        </span>
                      )}
                      <span className="proj-arrow" style={{ marginLeft: 'auto', opacity: 0, transition: 'opacity 0.15s', color: '#555' }}>
                        <ExternalLink size={12} />
                      </span>
                    </div>
                    <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>
                      {project.description}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </section>

        <Divider />

        {/* ── Experience ── */}
        <section id="experience">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <SectionLabel text="Experience" />
            <ul style={{ listStyle: 'none' }}>
              {EXPERIENCE.map((item, i) => (
                <li
                  key={i}
                  style={{
                    padding: '18px 0',
                    borderBottom: i < EXPERIENCE.length - 1 ? '1px solid #141414' : 'none',
                  }}
                >
                  {/* Header row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, marginBottom: 2 }}>
                    <div style={{ fontSize: 14, color: '#bbb', fontWeight: 500 }}>{item.role}</div>
                    <div style={{ fontSize: 12, color: '#3d3d3d', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>
                      {item.period}
                    </div>
                  </div>
                  {/* Org + location row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, marginBottom: 10 }}>
                    <div style={{ fontSize: 13, color: '#4a4a4a', fontStyle: 'italic' }}>{item.org}</div>
                    <div style={{ fontSize: 12, color: '#3d3d3d', whiteSpace: 'nowrap', flexShrink: 0 }}>{item.location}</div>
                  </div>
                  {/* Bullets */}
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {item.bullets.map((bullet, j) => (
                      <li key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <span style={{ color: '#333', marginTop: 2, flexShrink: 0, fontSize: 12 }}>–</span>
                        <span style={{ fontSize: 13, color: '#666', lineHeight: 1.65 }}>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </motion.div>
        </section>

        <Divider />

        {/* ── Certifications ── */}
        <section>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <SectionLabel text="Certifications" />
            <ul style={{ listStyle: 'none' }}>
              {CERTIFICATIONS.map((cert, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 16,
                    padding: '9px 0',
                    borderBottom: i < CERTIFICATIONS.length - 1 ? '1px solid #141414' : 'none',
                  }}
                >
                  <div>
                    {cert.url ? (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: 14, color: '#bbb', fontWeight: 500, transition: 'color 0.15s', borderBottom: '1px solid #2f2f2f' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#e8e8e8')}
                        onMouseLeave={e => (e.currentTarget.style.color = '#bbb')}
                      >
                        {cert.name}
                      </a>
                    ) : (
                      <span style={{ fontSize: 14, color: '#bbb', fontWeight: 500 }}>{cert.name}</span>
                    )}
                    {cert.org && <div style={{ fontSize: 13, color: '#555' }}>{cert.org}</div>}
                  </div>
                  {cert.status && (
                    <span style={{
                      fontSize: 10, color: '#555', border: '1px solid #222',
                      padding: '2px 7px', borderRadius: 4, letterSpacing: '0.04em', whiteSpace: 'nowrap',
                    }}>
                      {cert.status}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </section>

        {/* ── Footer ── */}
        <Divider />
        <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontSize: 12, color: '#3a3a3a' }}>
            © 2026 Choiyon Chakraborty
          </span>
          <a
            href="mailto:choiyon321@gmail.com"
            style={{ fontSize: 12, color: '#555', transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#e8e8e8')}
            onMouseLeave={e => (e.currentTarget.style.color = '#555')}
          >
            choiyon321@gmail.com
          </a>
        </footer>
      </main>
    </div>
  );
}
