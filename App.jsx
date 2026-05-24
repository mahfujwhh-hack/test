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
  const [v, setV] = useState(true);
  useEffect(() => { const t = setInterval(() => setV(x => !x), 530); return () => clearInterval(t); }, []);
  return <span style={{ opacity: v ? 1 : 0, color: "#00ff41" }}>█</span>;
}

function MatrixRain() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
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
    window.addEventListener("resize", resize);
    return () => { clearInterval(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.22, pointerEvents: "none" }} />;
}

const NAV = ["HOME", "ABOUT", "SKILLS", "RESEARCH", "CONTACT"];

const SKILLS = [
  { cat: "Offensive Security", tools: ["Metasploit", "Burp Suite", "Nmap", "SQLMap", "Hydra", "Nikto"], icon: "⚔️" },
  { cat: "Network Analysis",   tools: ["Wireshark", "Tcpdump", "Nessus", "OpenVAS", "Snort"], icon: "🌐" },
  { cat: "OSINT & Recon",      tools: ["Maltego", "Shodan", "theHarvester", "Recon-ng"], icon: "🔍" },
  { cat: "Forensics & Malware",tools: ["Ghidra", "IDA Pro", "Volatility", "Autopsy"], icon: "🧬" },
  { cat: "Web Security",       tools: ["OWASP Top 10", "XSS", "CSRF", "SSRF", "JWT Attacks"], icon: "🕸️" },
  { cat: "Scripting",          tools: ["Python", "Bash", "PowerShell", "Go", "Ruby"], icon: "💻" },
];

const PROJECTS = [
  { id:"01", title:"Zero-Day Research Lab",       tag:"Vulnerability Research", desc:"Independent research on undisclosed vulnerabilities in web applications and network protocols. Responsible disclosure with detailed PoC documentation.", badges:["CVE Research","PoC Dev","Disclosure"], status:"ACTIVE" },
  { id:"02", title:"OSINT Automation Framework",  tag:"Tool Development",       desc:"Custom Python-based OSINT framework automating digital footprint analysis, social media recon, and passive information gathering at scale.",      badges:["Python","API Integration","Automation"], status:"COMPLETED" },
  { id:"03", title:"Phishing Simulation Engine",  tag:"Red Team",               desc:"Advanced phishing campaign simulator for authorized red team engagements — tracks click rates, credential harvesting simulation, and awareness reporting.", badges:["Red Team","Social Eng","Reporting"], status:"ACTIVE" },
  { id:"04", title:"Network Intrusion Detection", tag:"Blue Team",              desc:"Custom SNORT rules + Python anomaly detector for lateral movement, port scans, and beaconing behavior in enterprise networks.",                      badges:["IDS","Snort","ML Anomaly"], status:"COMPLETED" },
];

const SOCIALS = [
  { name:"GitHub",    handle:"@mahfujwhh",         icon:"⬡",   url:"https://github.com/mahfujwhh",      color:"#00ff41" },
  { name:"Twitter/X", handle:"@mahfujwhh",         icon:"✕",   url:"https://twitter.com/mahfujwhh",     color:"#00d4ff" },
  { name:"LinkedIn",  handle:"MD Mahfujur Rahman", icon:"in",  url:"https://linkedin.com/in/mahfujwhh", color:"#00ff41" },
  { name:"HackerOne", handle:"@mahfujwhh",         icon:"H1",  url:"#",                                 color:"#00d4ff" },
  { name:"TryHackMe", handle:"@mahfujwhh",         icon:"THM", url:"#",                                 color:"#00ff41" },
];

const SOURCE_CODE = `import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────
//  Portfolio  ·  MD Mahfujur Rahman
//  Username   ·  @mahfujwhh
//  Role       ·  Cybersecurity Researcher
// ─────────────────────────────────────────────

const SKILLS = [
  { cat: "Offensive Security",
    tools: ["Metasploit","Burp Suite","Nmap","SQLMap"] },
  { cat: "Network Analysis",
    tools: ["Wireshark","Tcpdump","Nessus","OpenVAS"] },
  { cat: "OSINT & Recon",
    tools: ["Maltego","Shodan","theHarvester"] },
  { cat: "Forensics & Malware",
    tools: ["Ghidra","IDA Pro","Volatility"] },
  { cat: "Web Security",
    tools: ["OWASP Top 10","XSS","CSRF","SSRF"] },
  { cat: "Scripting",
    tools: ["Python","Bash","PowerShell","Go"] },
];

const PROJECTS = [
  {
    id: "01",
    title: "Zero-Day Research Lab",
    tag: "Vulnerability Research",
    status: "ACTIVE",
  },
  {
    id: "02",
    title: "OSINT Automation Framework",
    tag: "Tool Development",
    status: "COMPLETED",
  },
  {
    id: "03",
    title: "Phishing Simulation Engine",
    tag: "Red Team",
    status: "ACTIVE",
  },
  {
    id: "04",
    title: "Network Intrusion Detection",
    tag: "Blue Team",
    status: "COMPLETED",
  },
];

// Matrix rain canvas background
function MatrixRain() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const cols = Math.floor(canvas.width / 20);
    const drops = Array(cols).fill(1);
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle = "#00ff4122";
      ctx.font = "14px monospace";
      drops.forEach((y, i) => {
        const char = String.fromCharCode(
          0x30A0 + Math.random() * 96
        );
        ctx.fillText(char, i * 20, y * 20);
        if (y * 20 > canvas.height
            && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };
    const id = setInterval(draw, 50);
    return () => clearInterval(id);
  }, []);
  return <canvas ref={ref} style={{
    position: "fixed", inset: 0,
    opacity: 0.2, pointerEvents: "none"
  }} />;
}

// Glitch text hook
function useGlitchText(text, active) {
  const CHARS = "!<>-_\\/[]{}—=+*^?#";
  const [displayed, setDisplayed] = useState(text);
  useEffect(() => {
    if (!active) { setDisplayed(text); return; }
    let i = 0;
    const iv = setInterval(() => {
      setDisplayed(text.split("").map((c, idx) =>
        idx < i ? text[idx]
        : c === " " ? " "
        : CHARS[Math.floor(Math.random() * CHARS.length)]
      ).join(""));
      if (i >= text.length) clearInterval(iv);
      i += 0.5;
    }, 30);
    return () => clearInterval(iv);
  }, [active, text]);
  return displayed;
}

// Typewriter role animator
function useTypewriter(roles) {
  const [typed, setTyped] = useState("");
  const [ri, setRi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const role = roles[ri];
    const t = setTimeout(() => {
      if (!del) {
        setTyped(role.slice(0, ci + 1));
        if (ci + 1 === role.length)
          setTimeout(() => setDel(true), 1400);
        else setCi(c => c + 1);
      } else {
        setTyped(role.slice(0, ci - 1));
        if (ci === 0) {
          setDel(false);
          setRi(r => (r + 1) % roles.length);
        } else setCi(c => c - 1);
      }
    }, del ? 40 : 80);
    return () => clearTimeout(t);
  }, [ci, del, ri]);
  return typed;
}

export default function Portfolio() {
  const [active, setActive] = useState("HOME");
  const [codeOpen, setCodeOpen] = useState(false);

  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <MatrixRain />
      <NavBar active={active} setActive={setActive} />
      <main>
        {active === "HOME"     && <HeroSection />}
        {active === "ABOUT"    && <AboutSection />}
        {active === "SKILLS"   && <SkillsSection />}
        {active === "RESEARCH" && <ResearchSection />}
        {active === "CONTACT"  && <ContactSection />}
      </main>
      <CodePanel
        visible={codeOpen}
        onToggle={() => setCodeOpen(o => !o)}
      />
    </div>
  );
}`;

// ── syntax highlight ──────────────────────────────────────────────────────────
function highlight(code) {
  return code.split("\n").map((line, li) => {
    const tokens = [];
    const push = (text, color) => tokens.push({ text, color });
    const ci = line.indexOf("//");
    if (ci !== -1) {
      tokenise(line.slice(0, ci), push);
      push(line.slice(ci), "#00ff4155");
      return { tokens, key: li };
    }
    tokenise(line, push);
    return { tokens, key: li };
  });
}

function tokenise(str, push) {
  const rules = [
    { re: /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, color: "#ffd700" },
    { re: /\b(import|export|default|from|const|let|var|function|return|useEffect|useState|useRef|if|else|forEach|new|true|false|null|undefined|async|await)\b/g, color: "#00d4ff" },
    { re: /\b(\d+)\b/g, color: "#ff6b6b" },
    { re: /(<\/?[A-Za-z][A-Za-z0-9]*)/g, color: "#00ff41" },
  ];
  const matches = [];
  rules.forEach(({ re, color }) => {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(str)) !== null)
      matches.push({ start: m.index, end: m.index + m[0].length, text: m[0], color });
  });
  matches.sort((a, b) => a.start - b.start);
  const used = [];
  const deduped = [];
  for (const match of matches) {
    if (used.some(u => match.start < u.end && match.end > u.start)) continue;
    used.push(match); deduped.push(match);
  }
  deduped.sort((a, b) => a.start - b.start);
  let last = 0;
  for (const { start, end, text, color } of deduped) {
    if (start > last) push(str.slice(last, start), "#00ff4188");
    push(text, color);
    last = end;
  }
  if (last < str.length) push(str.slice(last), "#00ff4188");
}

// ── section header ────────────────────────────────────────────────────────────
function SectionHeader({ label, num }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <span style={{ fontFamily: "'Share Tech Mono',monospace", color: "#00ff4133", fontSize: "0.8rem" }}>{num}</span>
      <div style={{ width: "2rem", height: "1px", background: "#00ff4133" }} />
      <h2 style={{ fontFamily: "'Orbitron',monospace", color: "#00ff41", fontSize: "clamp(0.9rem,2vw,1.4rem)", letterSpacing: "0.2em", margin: 0, textShadow: "0 0 20px #00ff4144" }}>{label}</h2>
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg,#00ff4133,transparent)" }} />
    </div>
  );
}

// ── hero ──────────────────────────────────────────────────────────────────────
function HeroSection({ setActive }) {
  const [glitch, setGlitch] = useState(false);
  const name = useGlitchText("MD MAHFUJUR RAHMAN", glitch);
  useEffect(() => { const t = setTimeout(() => setGlitch(true), 600); return () => clearTimeout(t); }, []);

  const roles = ["Cybersecurity Researcher", "Ethical Hacker", "Vulnerability Hunter", "OSINT Analyst", "Red Teamer"];
  const [typed, setTyped] = useState("");
  const [ri, setRi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const role = roles[ri];
    const t = setTimeout(() => {
      if (!del) {
        setTyped(role.slice(0, ci + 1));
        if (ci + 1 === role.length) setTimeout(() => setDel(true), 1400);
        else setCi(c => c + 1);
      } else {
        setTyped(role.slice(0, ci - 1));
        if (ci === 0) { setDel(false); setRi(r => (r + 1) % roles.length); }
        else setCi(c => c - 1);
      }
    }, del ? 40 : 80);
    return () => clearTimeout(t);
  }, [ci, del, ri]);

  const [v, setV] = useState(true);
  useEffect(() => { const t = setInterval(() => setV(x => !x), 530); return () => clearInterval(t); }, []);

  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", padding: "0 8%", position: "relative" }}>
      <div style={{ color: "#00ff4166", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.8rem", letterSpacing: "0.2em", marginBottom: "0.8rem" }}>&gt; INITIALIZING PROFILE...</div>
      <h1 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.8rem,5vw,4.5rem)", color: "#00ff41", margin: 0, letterSpacing: "0.06em", textShadow: "0 0 40px #00ff4155,0 0 80px #00ff4122", lineHeight: 1.05 }}>{name}</h1>
      <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "clamp(0.85rem,2vw,1.2rem)", color: "#00d4ff", margin: "1rem 0 2rem", letterSpacing: "0.1em", minHeight: "2em" }}>
        <span style={{ opacity: 0.5 }}>// </span>{typed}<span style={{ opacity: v ? 1 : 0, color: "#00ff41" }}>█</span>
      </div>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {[["VIEW RESEARCH", "RESEARCH"], ["CONTACT", "CONTACT"]].map(([label, sec]) => (
          <button key={sec} onClick={() => setActive(sec)}
            style={{ background: "transparent", border: `1px solid ${sec === "RESEARCH" ? "#00ff41" : "#00ff4144"}`, color: sec === "RESEARCH" ? "#00ff41" : "#00ff4177", padding: "0.7rem 1.6rem", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.8rem", letterSpacing: "0.18em", cursor: "pointer", transition: "all 0.3s" }}
            onMouseEnter={e => { e.target.style.background = "#00ff41"; e.target.style.color = "#000"; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = sec === "RESEARCH" ? "#00ff41" : "#00ff4177"; }}
          >{label}</button>
        ))}
      </div>
      <div style={{ position: "absolute", right: "6%", top: "50%", transform: "translateY(-50%)", opacity: 0.05, fontFamily: "monospace", fontSize: "0.7rem", color: "#00ff41", lineHeight: 2, userSelect: "none", whiteSpace: "pre" }}>
        {`SELECT * FROM hackers\nWHERE skill='elite';\n\n> CONNECTED\n> SCANNING...\n> ACCESS GRANTED`}
      </div>
    </section>
  );
}

// ── about ─────────────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section style={{ minHeight: "80vh", padding: "7rem 8%" }}>
      <SectionHeader label="ABOUT" num="01" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", marginTop: "2.5rem", alignItems: "start" }}>
        <div>
          <p style={{ fontFamily: "'Share Tech Mono',monospace", color: "#00ff41bb", lineHeight: 2, fontSize: "0.9rem" }}><span style={{ color: "#00d4ff" }}>&gt;</span> Cybersecurity researcher with a passion for uncovering vulnerabilities before the bad guys do.</p>
          <p style={{ fontFamily: "'Share Tech Mono',monospace", color: "#00ff4188", lineHeight: 2, fontSize: "0.88rem", marginTop: "1rem" }}>I specialize in offensive security, OSINT, and vulnerability research — turning complex attack surfaces into actionable intelligence. Responsible disclosure advocate.</p>
          <p style={{ fontFamily: "'Share Tech Mono',monospace", color: "#00ff4166", lineHeight: 2.2, fontSize: "0.85rem", marginTop: "1rem" }}>
            Username: <span style={{ color: "#00ff41" }}>@mahfujwhh</span><br />
            Focus: Web Security · Network Pentesting · Malware Analysis<br />
            Status: <span style={{ color: "#00ff41" }}>AVAILABLE FOR COLLABORATION</span>
          </p>
        </div>
        <div style={{ border: "1px solid #00ff4122", padding: "1.5rem", background: "#00ff4105", fontFamily: "monospace", color: "#00ff4177", fontSize: "0.78rem", lineHeight: 2 }}>
          <div style={{ color: "#00d4ff", marginBottom: "0.5rem" }}>$ whoami</div>
          <div style={{ color: "#00ff41bb" }}>md_mahfujur_rahman</div>
          <div style={{ color: "#00d4ff", margin: "0.8rem 0 0.4rem" }}>$ cat /etc/profile</div>
          <div>Role: Cybersecurity Researcher</div>
          <div>Handle: @mahfujwhh</div>
          <div>Speciality: Offensive Security</div>
          <div>Ethics: Responsible Disclosure</div>
          <div style={{ color: "#00d4ff", marginTop: "0.8rem" }}>$ ping 8.8.8.8</div>
          <div style={{ color: "#00ff41" }}>PONG — I'm online.</div>
        </div>
      </div>
    </section>
  );
}

// ── skills ────────────────────────────────────────────────────────────────────
function SkillsSection() {
  const [hov, setHov] = useState(null);
  return (
    <section style={{ minHeight: "80vh", padding: "7rem 8%" }}>
      <SectionHeader label="SKILLS & TOOLS" num="02" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "1.2rem", marginTop: "2.5rem" }}>
        {SKILLS.map((s, i) => (
          <div key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
            style={{ border: `1px solid ${hov === i ? "#00ff41" : "#00ff4122"}`, padding: "1.3rem", background: hov === i ? "#00ff4108" : "transparent", transition: "all 0.3s", boxShadow: hov === i ? "0 0 25px #00ff4120" : "none" }}>
            <div style={{ fontFamily: "'Orbitron',monospace", color: "#00ff41", fontSize: "0.75rem", letterSpacing: "0.12em", marginBottom: "0.8rem" }}>{s.icon} {s.cat}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {s.tools.map((t, j) => <span key={j} style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", color: "#00ff4188", border: "1px solid #00ff4133", padding: "0.15rem 0.5rem" }}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── research ──────────────────────────────────────────────────────────────────
function ResearchSection() {
  const [hov, setHov] = useState(null);
  return (
    <section style={{ minHeight: "80vh", padding: "7rem 8%" }}>
      <SectionHeader label="RESEARCH & PROJECTS" num="03" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginTop: "2.5rem" }}>
        {PROJECTS.map((p, i) => (
          <div key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
            style={{ border: `1px solid ${hov === i ? "#00ff41" : "#00ff4122"}`, padding: "1.8rem", background: hov === i ? "#00ff4106" : "transparent", transition: "all 0.3s", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "1rem", right: "1rem", fontFamily: "monospace", fontSize: "0.68rem", color: p.status === "ACTIVE" ? "#00ff41" : "#00d4ff", border: `1px solid ${p.status === "ACTIVE" ? "#00ff4144" : "#00d4ff44"}`, padding: "0.12rem 0.5rem" }}>{p.status}</div>
            <div style={{ fontFamily: "'Orbitron',monospace", color: "#00ff4144", fontSize: "2rem", marginBottom: "0.2rem" }}>{p.id}</div>
            <div style={{ fontFamily: "'Orbitron',monospace", color: "#00ff41", fontSize: "0.88rem", letterSpacing: "0.08em", marginBottom: "0.4rem" }}>{p.title}</div>
            <div style={{ fontFamily: "'Share Tech Mono',monospace", color: "#00d4ff77", fontSize: "0.72rem", letterSpacing: "0.12em", marginBottom: "0.8rem" }}>{p.tag}</div>
            <p style={{ fontFamily: "'Share Tech Mono',monospace", color: "#00ff4177", fontSize: "0.8rem", lineHeight: 1.8, marginBottom: "1rem" }}>{p.desc}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
              {p.badges.map((b, j) => <span key={j} style={{ fontFamily: "monospace", fontSize: "0.68rem", color: "#00d4ff", border: "1px solid #00d4ff33", padding: "0.15rem 0.45rem" }}>{b}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── contact ───────────────────────────────────────────────────────────────────
function ContactSection() {
  return (
    <section style={{ minHeight: "80vh", padding: "7rem 8%" }}>
      <SectionHeader label="CONTACT & SOCIAL" num="04" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", marginTop: "2.5rem", alignItems: "start" }}>
        <div>
          <p style={{ fontFamily: "'Share Tech Mono',monospace", color: "#00ff4177", lineHeight: 2, fontSize: "0.88rem", marginBottom: "1.5rem" }}>&gt; Open to bug bounty collaborations, research partnerships, CTF teams, and responsible disclosure coordination.</p>
          <div style={{ fontFamily: "'Share Tech Mono',monospace", color: "#00ff4166", fontSize: "0.82rem", lineHeight: 2.2 }}>
            <div>EMAIL: <a href="mailto:mahfujwhh@proton.me" style={{ color: "#00ff41", textDecoration: "none" }}>mahfujwhh@proton.me</a></div>
            <div>PGP: <span style={{ color: "#00d4ff" }}>Available on request</span></div>
            <div>RESPONSE: <span style={{ color: "#00ff41" }}>&lt; 24 hours</span></div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
          {SOCIALS.map((s, i) => (
            <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "1rem", border: "1px solid #00ff4122", padding: "0.9rem 1.2rem", textDecoration: "none", transition: "all 0.3s", fontFamily: "'Share Tech Mono',monospace" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#00ff41"; e.currentTarget.style.background = "#00ff4108"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#00ff4122"; e.currentTarget.style.background = "transparent"; }}>
              <span style={{ color: s.color, fontSize: "0.85rem", minWidth: "2rem", textAlign: "center" }}>{s.icon}</span>
              <span style={{ color: "#00ff41bb", fontSize: "0.82rem" }}>{s.name}</span>
              <span style={{ color: "#00ff4155", fontSize: "0.75rem", marginLeft: "auto" }}>{s.handle}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── code panel ────────────────────────────────────────────────────────────────
function CodePanel({ visible, onToggle }) {
  const lines = highlight(SOURCE_CODE);
  return (
    <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: visible ? "42%" : "0", transition: "width 0.4s cubic-bezier(0.77,0,0.175,1)", overflow: "hidden", zIndex: 200, display: "flex", flexDirection: "column", borderLeft: visible ? "1px solid #00ff4133" : "none", background: "#030f03" }}>
      <button onClick={onToggle} style={{ position: "absolute", left: "-36px", top: "50%", transform: "translateY(-50%)", background: "#030f03", border: "1px solid #00ff4144", borderRight: "none", color: "#00ff41", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.7rem", writingMode: "vertical-rl", textOrientation: "mixed", padding: "1rem 0.5rem", cursor: "pointer", letterSpacing: "0.15em", whiteSpace: "nowrap", zIndex: 201 }}>
        {visible ? "CLOSE CODE ✕" : "VIEW CODE ▶"}
      </button>
      <div style={{ padding: "0.8rem 1.2rem", borderBottom: "1px solid #00ff4122", display: "flex", alignItems: "center", gap: "0.6rem", flexShrink: 0 }}>
        {["#ff5f56", "#ffbd2e", "#27c93f"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
        <span style={{ fontFamily: "'Share Tech Mono',monospace", color: "#00ff4166", fontSize: "0.72rem", marginLeft: "0.4rem" }}>App.jsx</span>
        <span style={{ marginLeft: "auto", fontFamily: "'Share Tech Mono',monospace", color: "#00ff4133", fontSize: "0.68rem" }}>READ ONLY</span>
      </div>
      <div style={{ overflow: "auto", flex: 1, padding: "1rem 0" }}>
        <table style={{ borderCollapse: "collapse", width: "100%", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", lineHeight: 1.75 }}>
          <tbody>
            {lines.map(({ tokens, key }) => (
              <tr key={key} style={{ verticalAlign: "top" }}>
                <td style={{ color: "#00ff4133", padding: "0 0.8rem 0 1rem", userSelect: "none", textAlign: "right", minWidth: "2.5rem", borderRight: "1px solid #00ff4111" }}>{key + 1}</td>
                <td style={{ paddingLeft: "1rem", paddingRight: "1rem", whiteSpace: "pre" }}>
                  {tokens.map((tok, j) => <span key={j} style={{ color: tok.color }}>{tok.text}</span>)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── navbar ────────────────────────────────────────────────────────────────────
function NavBar({ active, setActive, codeOpen }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: codeOpen ? "42%" : 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2rem", height: "60px", background: scrolled ? "rgba(0,0,0,0.92)" : "transparent", borderBottom: scrolled ? "1px solid #00ff4122" : "none", backdropFilter: scrolled ? "blur(12px)" : "none", transition: "all 0.4s", fontFamily: "'Share Tech Mono',monospace" }}>
      <div style={{ color: "#00ff41", fontSize: "1rem", letterSpacing: "0.15em" }}>
        <span style={{ opacity: 0.4 }}>[</span>0xMAHFUJ<span style={{ opacity: 0.4 }}>]</span>
      </div>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        {NAV.map(item => (
          <button key={item} onClick={() => setActive(item)}
            style={{ background: "none", border: "none", cursor: "pointer", color: active === item ? "#00ff41" : "#00ff4555", fontSize: "0.72rem", letterSpacing: "0.18em", fontFamily: "inherit", borderBottom: active === item ? "1px solid #00ff41" : "1px solid transparent", paddingBottom: "2px", transition: "all 0.2s" }}
          >{item}</button>
        ))}
      </div>
    </nav>
  );
}

// ── root ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("HOME");
  const [codeOpen, setCodeOpen] = useState(false);
  const sections = { HOME: <HeroSection setActive={setActive} />, ABOUT: <AboutSection />, SKILLS: <SkillsSection />, RESEARCH: <ResearchSection />, CONTACT: <ContactSection /> };
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{background:#000;color:#00ff41;overflow-x:hidden}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:#00ff4133}
        ::selection{background:#00ff4133;color:#00ff41}
      `}</style>
      <div style={{ marginRight: codeOpen ? "42%" : "0", transition: "margin 0.4s cubic-bezier(0.77,0,0.175,1)", minHeight: "100vh", background: "#000", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "fixed", inset: 0, right: codeOpen ? "42%" : "0", overflow: "hidden", pointerEvents: "none" }}>
          <MatrixRain />
        </div>
        <div style={{ position: "fixed", inset: 0, right: codeOpen ? "42%" : "0", background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,65,0.012) 2px,rgba(0,255,65,0.012) 4px)", pointerEvents: "none", zIndex: 1 }} />
        <NavBar active={active} setActive={setActive} codeOpen={codeOpen} />
        <main style={{ position: "relative", zIndex: 2 }}>{sections[active]}</main>
        <footer style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "1.5rem", fontFamily: "'Share Tech Mono',monospace", color: "#00ff4122", fontSize: "0.72rem", borderTop: "1px solid #00ff4111" }}>
          © 2025 @mahfujwhh · MD Mahfujur Rahman · Cybersecurity Researcher
        </footer>
      </div>
      <CodePanel visible={codeOpen} onToggle={() => setCodeOpen(o => !o)} />
    </>
  );
}
