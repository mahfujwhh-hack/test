import { useState, useEffect, useRef } from "react";

const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#@$%&";

function useGlitchText(text, active) {
  const [displayed, setDisplayed] = useState(text);
  useEffect(() => {
    if (!active) { setDisplayed(text); return; }
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayed(
        text.split("").map((char, i) =>
          i < iteration ? text[i] : char === " " ? " " : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        ).join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 0.5;
    }, 30);
    return () => clearInterval(interval);
  }, [active, text]);
  return displayed;
}

function TerminalCursor() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setVisible(v => !v), 530);
    return () => clearInterval(t);
  }, []);
  return <span style={{ opacity: visible ? 1 : 0, color: "#00ff41" }}>█</span>;
}

function MatrixRain() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const cols = Math.floor(canvas.width / 20);
    const drops = Array(cols).fill(1);
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff4122";
      ctx.font = "14px monospace";
      drops.forEach((y, i) => {
        const char = String.fromCharCode(0x30A0 + Math.random() * 96);
        ctx.fillText(char, i * 20, y * 20);
        if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };
    const id = setInterval(draw, 50);
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => { clearInterval(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, zIndex: 0, opacity: 0.18, pointerEvents: "none" }} />;
}

function ScanLine() {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.015) 2px, rgba(0,255,65,0.015) 4px)",
      pointerEvents: "none", zIndex: 1
    }} />
  );
}

const NAV_ITEMS = ["HOME", "ABOUT", "SKILLS", "RESEARCH", "CONTACT"];

const SKILLS = [
  { cat: "Offensive Security", tools: ["Metasploit", "Burp Suite", "Nmap", "SQLMap", "Hydra", "Nikto"], icon: "⚔️" },
  { cat: "Network Analysis", tools: ["Wireshark", "Tcpdump", "Nessus", "OpenVAS", "Snort"], icon: "🌐" },
  { cat: "OSINT & Recon", tools: ["Maltego", "Shodan", "theHarvester", "Recon-ng", "OSINT Framework"], icon: "🔍" },
  { cat: "Forensics & Malware", tools: ["Ghidra", "IDA Pro", "Volatility", "Autopsy", "Strings"], icon: "🧬" },
  { cat: "Web Security", tools: ["OWASP Top 10", "XSS", "CSRF", "SSRF", "JWT Attacks", "API Security"], icon: "🕸️" },
  { cat: "Scripting", tools: ["Python", "Bash", "PowerShell", "Go", "Ruby"], icon: "💻" },
];

const PROJECTS = [
  {
    id: "01",
    title: "Zero-Day Research Lab",
    tag: "Vulnerability Research",
    desc: "Independent research on undisclosed vulnerabilities in web applications and network protocols. Responsible disclosure to vendors with detailed PoC documentation.",
    badges: ["CVE Research", "PoC Dev", "Disclosure"],
    status: "ACTIVE",
  },
  {
    id: "02",
    title: "OSINT Automation Framework",
    tag: "Tool Development",
    desc: "Custom Python-based OSINT framework that automates digital footprint analysis, social media reconnaissance, and passive information gathering at scale.",
    badges: ["Python", "API Integration", "Automation"],
    status: "COMPLETED",
  },
  {
    id: "03",
    title: "Phishing Simulation Engine",
    tag: "Red Team",
    desc: "Advanced phishing campaign simulator for authorized red team engagements — tracks click rates, credential harvesting simulation, and awareness reporting.",
    badges: ["Red Team", "Social Engineering", "Reporting"],
    status: "ACTIVE",
  },
  {
    id: "04",
    title: "Network Intrusion Detection",
    tag: "Blue Team",
    desc: "Custom SNORT rules + Python anomaly detector for detecting lateral movement, port scans, and beaconing behavior in enterprise networks.",
    badges: ["IDS", "Snort", "ML Anomaly"],
    status: "COMPLETED",
  },
];

const SOCIALS = [
  { name: "GitHub", handle: "@mahfujwhh", icon: "⬡", url: "https://github.com/mahfujwhh", color: "#00ff41" },
  { name: "Twitter/X", handle: "@mahfujwhh", icon: "✕", url: "https://twitter.com/mahfujwhh", color: "#00d4ff" },
  { name: "LinkedIn", handle: "MD Mahfujur Rahman", icon: "in", url: "https://linkedin.com/in/mahfujwhh", color: "#00ff41" },
  { name: "HackerOne", handle: "@mahfujwhh", icon: "H1", url: "#", color: "#00d4ff" },
  { name: "TryHackMe", handle: "@mahfujwhh", icon: "THM", url: "#", color: "#00ff41" },
];

function NavBar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 2.5rem",
      height: "64px",
      background: scrolled ? "rgba(0,0,0,0.92)" : "transparent",
      borderBottom: scrolled ? "1px solid #00ff4133" : "none",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      transition: "all 0.4s",
      fontFamily: "'Share Tech Mono', monospace",
    }}>
      <div style={{ color: "#00ff41", fontSize: "1.1rem", letterSpacing: "0.15em" }}>
        <span style={{ opacity: 0.5 }}>[</span>
        <span style={{ fontWeight: 700 }}>0xMAHFUJ</span>
        <span style={{ opacity: 0.5 }}>]</span>
      </div>
      <div style={{ display: "flex", gap: "2rem" }}>
        {NAV_ITEMS.map(item => (
          <button key={item} onClick={() => setActive(item)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: active === item ? "#00ff41" : "#00ff4166",
              fontSize: "0.78rem", letterSpacing: "0.18em",
              fontFamily: "inherit",
              borderBottom: active === item ? "1px solid #00ff41" : "1px solid transparent",
              paddingBottom: "2px",
              transition: "all 0.2s",
            }}
          >{item}</button>
        ))}
      </div>
    </nav>
  );
}

function HeroSection({ setActive }) {
  const [glitch, setGlitch] = useState(false);
  const name = useGlitchText("MD MAHFUJUR RAHMAN", glitch);
  useEffect(() => {
    const t = setTimeout(() => setGlitch(true), 600);
    return () => clearTimeout(t);
  }, []);

  const [typed, setTyped] = useState("");
  const roles = ["Cybersecurity Researcher", "Ethical Hacker", "Vulnerability Hunter", "OSINT Analyst", "Red Teamer"];
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const role = roles[roleIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setTyped(role.slice(0, charIdx + 1));
        if (charIdx + 1 === role.length) setTimeout(() => setDeleting(true), 1400);
        else setCharIdx(c => c + 1);
      } else {
        setTyped(role.slice(0, charIdx - 1));
        if (charIdx === 0) { setDeleting(false); setRoleIdx(i => (i + 1) % roles.length); }
        else setCharIdx(c => c - 1);
      }
    }, deleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, roleIdx]);

  return (
    <section style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "flex-start",
      padding: "0 10vw", position: "relative", zIndex: 2,
    }}>
      <div style={{ marginBottom: "1rem", color: "#00ff4188", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.85rem", letterSpacing: "0.2em" }}>
        &gt; INITIALIZING PROFILE...
      </div>
      <h1 style={{
        fontFamily: "'Orbitron', monospace",
        fontSize: "clamp(2.2rem, 6vw, 5.5rem)",
        color: "#00ff41",
        margin: 0, letterSpacing: "0.06em",
        textShadow: "0 0 40px #00ff4166, 0 0 80px #00ff4122",
        lineHeight: 1.05,
      }}>{name}</h1>
      <div style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
        color: "#00d4ff",
        margin: "1.2rem 0 2.5rem",
        letterSpacing: "0.1em",
        minHeight: "2em",
      }}>
        <span style={{ opacity: 0.5 }}>// </span>{typed}<TerminalCursor />
      </div>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <button onClick={() => setActive("RESEARCH")}
          style={{
            background: "transparent", border: "1px solid #00ff41", color: "#00ff41",
            padding: "0.8rem 2rem", fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.85rem", letterSpacing: "0.2em", cursor: "pointer",
            transition: "all 0.3s",
            boxShadow: "0 0 20px #00ff4122",
          }}
          onMouseEnter={e => { e.target.style.background = "#00ff41"; e.target.style.color = "#000"; e.target.style.boxShadow = "0 0 40px #00ff4188"; }}
          onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#00ff41"; e.target.style.boxShadow = "0 0 20px #00ff4122"; }}
        >VIEW RESEARCH</button>
        <button onClick={() => setActive("CONTACT")}
          style={{
            background: "transparent", border: "1px solid #00ff4144", color: "#00ff4188",
            padding: "0.8rem 2rem", fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.85rem", letterSpacing: "0.2em", cursor: "pointer",
            transition: "all 0.3s",
          }}
          onMouseEnter={e => { e.target.style.borderColor = "#00ff41"; e.target.style.color = "#00ff41"; }}
          onMouseLeave={e => { e.target.style.borderColor = "#00ff4144"; e.target.style.color = "#00ff4188"; }}
        >CONTACT</button>
      </div>
      <div style={{ position: "absolute", right: "8vw", top: "50%", transform: "translateY(-50%)", opacity: 0.06, fontFamily: "monospace", fontSize: "0.7rem", color: "#00ff41", lineHeight: 1.8, userSelect: "none" }}>
        {`SELECT * FROM hackers\nWHERE skill='elite'\nAND target='vuln';\n\n> CONNECTED\n> PORT 443 OPEN\n> SCANNING...\n> PAYLOAD INJECTED\n> ACCESS GRANTED`}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section style={{ minHeight: "80vh", padding: "8rem 10vw", position: "relative", zIndex: 2 }}>
      <SectionHeader label="ABOUT" num="01" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", marginTop: "3rem", alignItems: "start" }}>
        <div>
          <p style={{ fontFamily: "'Share Tech Mono', monospace", color: "#00ff41cc", lineHeight: 2, fontSize: "0.95rem" }}>
            <span style={{ color: "#00d4ff" }}>&gt;</span> Cybersecurity researcher with a passion for uncovering vulnerabilities before the bad guys do.
          </p>
          <p style={{ fontFamily: "'Share Tech Mono', monospace", color: "#00ff4199", lineHeight: 2, fontSize: "0.92rem", marginTop: "1.2rem" }}>
            I specialize in offensive security, OSINT, and vulnerability research — turning complex attack surfaces into actionable intelligence. I believe in responsible disclosure and building a safer digital world.
          </p>
          <p style={{ fontFamily: "'Share Tech Mono', monospace", color: "#00ff4177", lineHeight: 2, fontSize: "0.88rem", marginTop: "1.2rem" }}>
            Username: <span style={{ color: "#00ff41" }}>@mahfujwhh</span><br />
            Focus: Web Security · Network Pentesting · Malware Analysis<br />
            Status: <span style={{ color: "#00ff41" }}>AVAILABLE FOR COLLABORATION</span>
          </p>
        </div>
        <div style={{ fontFamily: "monospace", color: "#00ff4155", fontSize: "0.8rem", lineHeight: 2 }}>
          <div style={{ border: "1px solid #00ff4122", padding: "1.5rem", background: "#00ff4105" }}>
            <div style={{ color: "#00d4ff", marginBottom: "1rem" }}>$ whoami</div>
            <div style={{ color: "#00ff41cc" }}>md_mahfujur_rahman</div>
            <div style={{ color: "#00d4ff", marginTop: "1rem", marginBottom: "0.5rem" }}>$ cat /etc/profile</div>
            <div>Role: Cybersecurity Researcher</div>
            <div>Handle: @mahfujwhh</div>
            <div>Speciality: Offensive Security</div>
            <div>Ethics: Responsible Disclosure</div>
            <div style={{ color: "#00d4ff", marginTop: "1rem" }}>$ ping 8.8.8.8</div>
            <div style={{ color: "#00ff41" }}>PONG — I'm online.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const [hovered, setHovered] = useState(null);
  return (
    <section style={{ minHeight: "80vh", padding: "8rem 10vw", position: "relative", zIndex: 2 }}>
      <SectionHeader label="SKILLS & TOOLS" num="02" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem", marginTop: "3rem" }}>
        {SKILLS.map((s, i) => (
          <div key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
            style={{
              border: `1px solid ${hovered === i ? "#00ff41" : "#00ff4122"}`,
              padding: "1.5rem",
              background: hovered === i ? "#00ff4108" : "transparent",
              transition: "all 0.3s",
              cursor: "default",
              boxShadow: hovered === i ? "0 0 30px #00ff4122" : "none",
            }}>
            <div style={{ fontFamily: "'Orbitron', monospace", color: "#00ff41", fontSize: "0.8rem", letterSpacing: "0.15em", marginBottom: "0.8rem" }}>
              {s.icon} {s.cat}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {s.tools.map((t, j) => (
                <span key={j} style={{
                  fontFamily: "'Share Tech Mono', monospace", fontSize: "0.75rem",
                  color: "#00ff4199", border: "1px solid #00ff4133",
                  padding: "0.2rem 0.6rem",
                  transition: "all 0.2s",
                }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ResearchSection() {
  return (
    <section style={{ minHeight: "80vh", padding: "8rem 10vw", position: "relative", zIndex: 2 }}>
      <SectionHeader label="RESEARCH & PROJECTS" num="03" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginTop: "3rem" }}>
        {PROJECTS.map((p, i) => (
          <ProjectCard key={i} project={p} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        border: `1px solid ${hov ? "#00ff41" : "#00ff4122"}`,
        padding: "2rem",
        background: hov ? "#00ff4106" : "transparent",
        transition: "all 0.3s",
        boxShadow: hov ? "0 0 40px #00ff4115" : "none",
        position: "relative", overflow: "hidden",
      }}>
      <div style={{ position: "absolute", top: "1rem", right: "1rem", fontFamily: "monospace", fontSize: "0.7rem",
        color: project.status === "ACTIVE" ? "#00ff41" : "#00d4ff",
        border: `1px solid ${project.status === "ACTIVE" ? "#00ff4144" : "#00d4ff44"}`,
        padding: "0.15rem 0.5rem",
      }}>{project.status}</div>
      <div style={{ fontFamily: "'Orbitron', monospace", color: "#00ff4155", fontSize: "2.5rem", marginBottom: "0.3rem" }}>{project.id}</div>
      <div style={{ fontFamily: "'Orbitron', monospace", color: "#00ff41", fontSize: "0.95rem", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>{project.title}</div>
      <div style={{ fontFamily: "'Share Tech Mono', monospace", color: "#00d4ff88", fontSize: "0.75rem", letterSpacing: "0.15em", marginBottom: "1rem" }}>{project.tag}</div>
      <p style={{ fontFamily: "'Share Tech Mono', monospace", color: "#00ff4188", fontSize: "0.83rem", lineHeight: 1.8, marginBottom: "1.2rem" }}>{project.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {project.badges.map((b, i) => (
          <span key={i} style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "#00d4ff", border: "1px solid #00d4ff33", padding: "0.2rem 0.5rem" }}>{b}</span>
        ))}
      </div>
    </div>
  );
}

function ContactSection() {
  return (
    <section style={{ minHeight: "80vh", padding: "8rem 10vw", position: "relative", zIndex: 2 }}>
      <SectionHeader label="CONTACT & SOCIAL" num="04" />
      <div style={{ marginTop: "3rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
        <div>
          <p style={{ fontFamily: "'Share Tech Mono', monospace", color: "#00ff4188", lineHeight: 2, fontSize: "0.9rem", marginBottom: "2rem" }}>
            &gt; Open to bug bounty collaborations, research partnerships, CTF teams, and responsible disclosure coordination. Let's make the internet safer.
          </p>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", color: "#00ff4166", fontSize: "0.85rem", lineHeight: 2 }}>
            <div>EMAIL: <a href="mailto:mahfujwhh@proton.me" style={{ color: "#00ff41", textDecoration: "none" }}>mahfujwhh@proton.me</a></div>
            <div>PGP: <span style={{ color: "#00d4ff" }}>Available on request</span></div>
            <div>RESPONSE TIME: <span style={{ color: "#00ff41" }}>&lt; 24 hours</span></div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
          {SOCIALS.map((s, i) => (
            <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: "1rem",
                border: "1px solid #00ff4122", padding: "1rem 1.5rem",
                textDecoration: "none", transition: "all 0.3s",
                fontFamily: "'Share Tech Mono', monospace",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#00ff41"; e.currentTarget.style.background = "#00ff4108"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#00ff4122"; e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ color: s.color, fontSize: "0.9rem", minWidth: "2rem", textAlign: "center" }}>{s.icon}</span>
              <span style={{ color: "#00ff41cc", fontSize: "0.85rem" }}>{s.name}</span>
              <span style={{ color: "#00ff4166", fontSize: "0.78rem", marginLeft: "auto" }}>{s.handle}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ label, num }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
      <span style={{ fontFamily: "'Share Tech Mono', monospace", color: "#00ff4133", fontSize: "0.85rem" }}>{num}</span>
      <div style={{ width: "3rem", height: "1px", background: "#00ff4133" }} />
      <h2 style={{
        fontFamily: "'Orbitron', monospace", color: "#00ff41",
        fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)", letterSpacing: "0.2em", margin: 0,
        textShadow: "0 0 30px #00ff4144",
      }}>{label}</h2>
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, #00ff4122, transparent)" }} />
    </div>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("HOME");

  const renderSection = () => {
    switch (activeSection) {
      case "HOME": return <HeroSection setActive={setActiveSection} />;
      case "ABOUT": return <AboutSection />;
      case "SKILLS": return <SkillsSection />;
      case "RESEARCH": return <ResearchSection />;
      case "CONTACT": return <ContactSection />;
      default: return <HeroSection setActive={setActiveSection} />;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #000; color: #00ff41; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #00ff4144; }
        ::selection { background: #00ff4133; color: #00ff41; }
      `}</style>
      <div style={{ minHeight: "100vh", background: "#000", position: "relative" }}>
        <MatrixRain />
        <ScanLine />
        <NavBar active={activeSection} setActive={setActiveSection} />
        <main style={{ position: "relative", zIndex: 2 }}>
          {renderSection()}
        </main>
        <footer style={{
          position: "relative", zIndex: 2, textAlign: "center",
          padding: "2rem", fontFamily: "'Share Tech Mono', monospace",
          color: "#00ff4133", fontSize: "0.75rem", borderTop: "1px solid #00ff4111",
        }}>
          © 2024 @mahfujwhh · MD Mahfujur Rahman · Cybersecurity Researcher
        </footer>
      </div>
    </>
  );
}
