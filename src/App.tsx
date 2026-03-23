/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Network, 
  Cloud, 
  Store, 
  CloudSunRain, 
  Server, 
  Shield, 
  Fingerprint, 
  Lock, 
  Terminal, 
  ExternalLink, 
  Github, 
  Mail, 
  Linkedin,
  ChevronRight,
  Monitor,
  Cpu,
  Database
} from 'lucide-react';

// --- Components ---

const GlitchText = ({ text, dataValue }: { text: string; dataValue: string }) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%^&*";
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startGlitch = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(prev => 
        prev.split("").map((_, index) => {
          if (index < iteration) {
            return dataValue[index];
          }
          return letters[Math.floor(Math.random() * letters.length)];
        }).join("")
      );

      if (iteration >= dataValue.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      iteration += 1 / 3;
    }, 30);
  };

  useEffect(() => {
    startGlitch();
    const autoGlitch = setInterval(startGlitch, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      clearInterval(autoGlitch);
    };
  }, [dataValue]);

  return (
    <span 
      className="font-mono bg-brand-red text-black px-2 rounded-sm inline-block min-w-[200px] text-center cursor-pointer"
      onMouseOver={startGlitch}
    >
      {displayText}
    </span>
  );
};

const ScrambleTextOnView = ({ text }: { text: string }) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%^&*";
  const [displayText, setDisplayText] = useState(text.replace(/[a-zA-Z0-9]/g, '-'));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startGlitch = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(prev => 
        prev.split("").map((_, index) => {
          if (index < iteration) {
            return text[index];
          }
          return text[index] === ' ' ? ' ' : letters[Math.floor(Math.random() * letters.length)];
        }).join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      iteration += 1 / 2;
    }, 30);
  };

  return (
    <motion.span onViewportEnter={startGlitch} viewport={{ once: true, margin: "-50px" }}>
      {displayText}
    </motion.span>
  );
};

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const bootSequence = [
    "> INITIALIZING SYSTEM BOOT...",
    "> LOADING KERNEL MODULES...",
    "> ESTABLISHING SECURE CONNECTION...",
    "> BYPASSING FIREWALLS...",
    "> DECRYPTING ASSETS...",
    "> ACCESS GRANTED.",
    "> WELCOME"
  ];

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current < bootSequence.length) {
        setLogs(prev => [...prev, bootSequence[current]]);
        current++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 400);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-brand-dark z-[9999] flex flex-col items-center justify-center p-6 font-mono"
    >
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-4 text-brand-red">
          <Terminal size={24} />
          <span className="text-sm font-bold tracking-widest uppercase">System Initialization</span>
        </div>
        <div className="bg-black/50 border border-brand-red/30 p-4 rounded-lg h-64 overflow-hidden flex flex-col justify-end">
          {logs.map((log, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`text-sm mb-1 ${i === logs.length - 1 ? 'text-brand-red' : 'text-gray-500'}`}
            >
              {log}
            </motion.div>
          ))}
          <motion.div 
            animate={{ opacity: [0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2 h-4 bg-brand-red inline-block ml-1"
          />
        </div>
        <div className="mt-6 w-full bg-gray-900 h-1 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: bootSequence.length * 0.15, ease: "linear" }}
            className="h-full bg-brand-red shadow-[0_0_10px_#ff4d4d]"
          />
        </div>
      </div>
      <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />
    </motion.div>
  );
};

const Card = ({ title, icon: Icon, children, status, links }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-brand-gray border border-white/5 p-6 rounded-xl transition-colors hover:border-brand-red/50 group"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="p-3 bg-brand-red/10 rounded-lg text-brand-red group-hover:bg-brand-red group-hover:text-white transition-colors">
        <Icon size={24} />
      </div>
      {status && (
        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full border border-yellow-500/50 text-yellow-500 bg-yellow-500/10">
          {status}
        </span>
      )}
    </div>
    <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
    <div className="text-gray-400 text-sm mb-6 leading-relaxed">
      {children}
    </div>
    {links && (
      <div className="flex flex-wrap gap-3">
        {links.map((link: any, i: number) => (
          <a 
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-red border border-brand-red/30 px-3 py-2 rounded hover:bg-brand-red hover:text-white transition-all"
          >
            {link.icon}
            {link.label}
          </a>
        ))}
      </div>
    )}
  </motion.div>
);

const ScrollReveal = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const SkillBar = ({ name, level }: { name: string; level: number }) => (
  <div className="mb-6">
    <div className="flex justify-between mb-2">
      <span className="text-sm font-bold tracking-wide uppercase">{name}</span>
      <span className="text-sm font-mono text-brand-red">{level}%</span>
    </div>
    <div className="h-2 bg-brand-gray rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="h-full bg-brand-red shadow-[0_0_8px_#ff4d4d]"
      />
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen font-sans selection:bg-brand-red selection:text-white">
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Navigation */}
          <nav className="fixed top-0 w-full z-50 bg-brand-dark/80 backdrop-blur-md border-b border-brand-red/20">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              <div className="text-xl font-bold tracking-tighter text-brand-red uppercase">
                CHOIYON'S <span className="text-white">PORTFOLIO</span>
              </div>
              <div className="hidden md:flex gap-8">
                {['About', 'Portfolio', 'Home Lab', 'Skills', 'Experience', 'Contact'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase().replace(' ', '')}`}
                    className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-brand-red transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
              <div className="md:hidden text-brand-red">
                <Monitor size={20} />
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <section className="relative h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,77,77,0.05)_0%,transparent_70%)]" />
            <div className="absolute inset-0 scanline opacity-10 pointer-events-none" />
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-brand-red font-mono text-sm tracking-[0.3em] uppercase mb-4"
            >
              Cyber Security Student
            </motion.p>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-8 flex flex-col md:flex-row items-center gap-4"
            >
              Hi, I'm <GlitchText text="CHOIYON" dataValue="CHOIYON" />
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="max-w-2xl text-gray-400 text-lg leading-relaxed mb-10"
            >
              I'm a Temple University Cyber Security Student, currently looking for full-time positions in Security!
            </motion.p>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <a 
                href="#contact" 
                className="group relative inline-flex items-center gap-2 bg-brand-red text-white px-8 py-4 rounded-lg font-bold uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95"
              >
                <span className="relative z-10">Get in Touch</span>
                <ChevronRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>
            </motion.div>
          </section>

          {/* About Section */}
          <section id="about" className="py-24 px-6 bg-brand-gray/30">
            <ScrollReveal className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row gap-16 items-center">
                <div className="flex-1">
                  <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-brand-red mb-4">About Me</h2>
                  <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">
                    Improving one step at a time in the world of security.
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    Hi! I’m a Cybersecurity student at Temple University with a passion for breaking and securing systems. I constantly immerse myself in the security world by developing my own tools and preparing for industry certifications.
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    I am eager to launch my career in a full-time role that challenges me to grow as a security professional.
                  </p>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4">
                  {[
                    { icon: Shield, label: "Security", value: "Focused" },
                    { icon: Cpu, label: "Hardware", value: "Lab Enthusiast" },
                    { icon: Database, label: "Data", value: "Cloud Security" },
                    { icon: Network, label: "Network", value: "CCNA Student" }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ 
                        opacity: [0, 1, 0.2, 1, 0.8, 1],
                        x: [0, -5, 5, -2, 2, 0],
                        y: [20, 0, 0, 0, 0, 0],
                        skewX: [0, -10, 10, -5, 5, 0],
                        filter: [
                          'drop-shadow(0 0 0 rgba(255,77,77,0))',
                          'drop-shadow(-4px 0 0 rgba(255,77,77,1)) drop-shadow(4px 0 0 rgba(0,255,255,1))',
                          'drop-shadow(4px 0 0 rgba(255,77,77,1)) drop-shadow(-4px 0 0 rgba(0,255,255,1))',
                          'drop-shadow(0 0 0 rgba(255,77,77,0))'
                        ]
                      }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.4, delay: i * 0.15, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
                      className="bg-brand-gray p-6 rounded-xl border border-white/5"
                    >
                      <item.icon className="text-brand-red mb-4" size={24} />
                      <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{item.label}</div>
                      <div className="text-sm font-bold text-white">
                        <ScrambleTextOnView text={item.value} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* Portfolio Section */}
          <section id="portfolio" className="py-24 px-6">
            <ScrollReveal className="max-w-7xl mx-auto">
              <div className="mb-16">
                <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-brand-red mb-4">Portfolio</h2>
                <h3 className="text-3xl font-bold text-white">Featured Projects</h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card 
                  title="IT Infrastructure Simulation" 
                  icon={Network}
                  status="In Progress"
                  links={[{ label: "GitHub", url: "https://github.com/cchoiyon/IT-Infrastructure-Simulation-Project", icon: <Github size={14} /> }]}
                >
                  A comprehensive enterprise IT environment built from scratch using Hyper-V virtualization. Features Active Directory, Windows Server 2022, DNS/DHCP, and Linux monitoring.
                </Card>
                <Card 
                  title="Cloud Security Analysis" 
                  icon={Cloud}
                  links={[{ label: "View Report", url: "#", icon: <ExternalLink size={14} /> }]}
                >
                  Simulated cloud storage using MinIO to replicate AWS S3. Configured and tested bucket policies to demonstrate data confidentiality and analyzed the 2019 Capital One breach.
                </Card>
                <Card 
                  title="On-Path (AiTM) Attack Simulation" 
                  icon={Fingerprint}
                  links={[
                    { label: "GitHub", url: "https://github.com/cchoiyon/Project-Performing-an-On-Path-AiTM-Attack", icon: <Github size={14} /> }
                  ]}
                >
                  A penetration testing simulation demonstrating the execution of an On-Path (AitM) attack to intercept web credentials through social engineering and Business Email Compromise (BEC) tactics.
                </Card>
                <Card 
                  title="Network Sniffing & Forensics" 
                  icon={Terminal}
                  links={[{ label: "GitHub", url: "https://github.com/cchoiyon/Project-Network-Traffic-Sniffing-Forensic-Analysis", icon: <Github size={14} /> }]}
                >
                  A Python-based forensic project utilizing tcpdump and Wireshark to intercept network traffic and extract plaintext credentials and security certificates from unencrypted protocols.
                </Card>
                
                {/* NEW ESCAPE PROJECT CARD */}
                <Card 
                  title="Escape" 
                  icon={Shield}
                  links={[{ label: "GitHub", url: "https://github.com/cchoiyon/Escape", icon: <Github size={14} /> }]}
                >
                  An interactive web-based game designed to help users master the Linux command line through immersive gameplay
                </Card>

              </div>
            </ScrollReveal>
          </section>

          {/* Home Lab Section */}
          <section id="homelab" className="py-24 px-6 bg-brand-gray/30">
            <ScrollReveal className="max-w-7xl mx-auto">
              <div className="mb-16">
                <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-brand-red mb-4">Home Lab</h2>
                <h3 className="text-3xl font-bold text-white">Practical Cybersecurity Lab</h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "Infrastructure", icon: Server, desc: "DNS, DHCP, Active Directory, and pfSense firewall simulation." },
                  { title: "Monitoring", icon: Shield, desc: "Splunk SIEM for event detection and Nessus for vulnerability scanning." },
                  { title: "Networking", icon: Network, desc: "OpenVPN with LDAP authentication and TCP/IP protocol fundamentals." },
                  { title: "Threat Sim", icon: Fingerprint, desc: "Threat actor simulation using Raspberry Pi hardware across multiple OS." }
                ].map((item, i) => (
                  <div key={i} className="bg-brand-dark p-8 rounded-xl border border-white/5 hover:border-brand-red/30 transition-colors">
                    <item.icon className="text-brand-red mb-6" size={32} />
                    <h4 className="text-lg font-bold mb-4 text-white">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-12 text-center">
                <a 
                  href="https://github.com/cchoiyon/Cybersecurity-HomeLab" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-red font-bold uppercase tracking-widest hover:underline"
                >
                  <Github size={20} />
                  View Full Documentation on GitHub
                </a>
              </div>
            </ScrollReveal>
          </section>

          {/* Skills & Experience */}
          <section id="skills" className="py-24 px-6">
            <ScrollReveal className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-24">
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-brand-red mb-4">Skills</h2>
                  <h3 className="text-3xl font-bold text-white mb-12">Technical Proficiency</h3>
                  <SkillBar name="Network Security" level={75} />
                  <SkillBar name="Linux Administration" level={85} />
                  <SkillBar name="Python Scripting" level={70} />
                  <SkillBar name="Cloud Security" level={65} />
                </div>
                <div id="experience">
                  <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-brand-red mb-4">Experience</h2>
                  <h3 className="text-3xl font-bold text-white mb-12">Timeline</h3>
                  <div className="space-y-12">
                    {[
                      { date: "2023 - 2024", title: "TU DEV Member", company: "Temple University", desc: "Active member of Temple's software development community." },
                      { date: "2022 - 2022", title: "Temple Help Desk", company: "Temple University", desc: "Provided technical support and troubleshooting for library patrons." },
                      { date: "2020 - 2022", title: "Web Developer", company: "ABHS", desc: "Developed and maintained community resource website." }
                    ].map((item, i) => (
                      <div key={i} className="relative pl-8 border-l border-brand-red/30">
                        <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-brand-red shadow-[0_0_8px_#ff4d4d]" />
                        <div className="text-xs font-mono text-brand-red mb-2">{item.date}</div>
                        <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                        <div className="text-sm text-gray-500 italic mb-3">{item.company}</div>
                        <p className="text-gray-400 text-sm">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* Certifications */}
          <section id="certifications" className="py-24 px-6 bg-brand-gray/30">
            <ScrollReveal className="max-w-7xl mx-auto">
              <div className="mb-16">
                <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-brand-red mb-4">Certifications</h2>
                <h3 className="text-3xl font-bold text-white">Industry Credentials</h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card title="CompTIA Security+" icon={Lock} status="In Progress">
                  Target: Jan 2026. Focusing on risk management, cryptography, and network architecture.
                </Card>
                <Card title="Cisco CCNA" icon={Network} status="In Progress">
                  Studying network fundamentals, IP connectivity, security fundamentals, and automation.
                </Card>
                <Card 
                  title="IT Support Fundamentals" 
                  icon={Monitor} 
                  links={[{ label: "Verify", url: "https://www.coursera.org/account/accomplishments/verify/C2S6MG2RYLWZ", icon: <ExternalLink size={14} /> }]}
                >
                  Google/Coursera. Covered troubleshooting, networking, operating systems, and security.
                </Card>
                <Card 
                  title="Google AI Essentials" 
                  icon={Cpu} 
                  links={[{ label: "Verify", url: "https://www.coursera.org/account/accomplishments/verify/D1FUR9ZY5LY1", icon: <ExternalLink size={14} /> }]}
                >
                  Mastered strategies for generative AI, prompt engineering, and responsible AI principles.
                </Card>
              </div>
            </ScrollReveal>
          </section>

          {/* Footer / Contact */}
          <footer id="contact" className="py-24 px-6 border-t border-white/5">
            <ScrollReveal className="max-w-7xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Let's connect.</h2>
              <p className="text-gray-400 mb-12 max-w-lg mx-auto">
                I'm always open to discussing security projects, job opportunities, or technical collaborations.
              </p>
              <div className="flex justify-center gap-8 mb-16">
                {[
                  { icon: Linkedin, url: "https://www.linkedin.com/in/choiyon-chakraborty/", label: "LinkedIn" },
                  { icon: Mail, url: "mailto:choiyon321@gmail.com", label: "Email" },
                  { icon: Github, url: "https://github.com/cchoiyon", label: "GitHub" }
                ].map((social, i) => (
                  <a 
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-brand-red transition-colors flex flex-col items-center gap-2"
                  >
                    <social.icon size={24} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{social.label}</span>
                  </a>
                ))}
              </div>
              <div className="text-xs text-gray-600 font-mono">
                © 2026 CHOIYON CHAKRABORTY. ALL RIGHTS RESERVED. // SYSTEM_STATUS: ONLINE
              </div>
            </ScrollReveal>
          </footer>
        </motion.div>
      )}
    </div>
  );
}
