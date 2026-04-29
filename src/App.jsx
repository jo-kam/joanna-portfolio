import { useState, useEffect, useRef } from "react";
import "./index.css";
import DesignSystemPage from "./DesignSystem";

function useRoute() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const handler = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);
  return path;
}

function NavLink({ href, children, style = {} }) {
  const navigate = (e) => {
    e.preventDefault();
    window.history.pushState({}, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo(0, 0);
  };
  return <a href={href} onClick={navigate} style={style}>{children}</a>;
}

function useIsMobile() {
  const [mobile, setMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth <= 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return mobile;
}

const DS = {
  colors: {
    void:        "#0a1209",
    surface:     "#0f1a0f",
    raised:      "#141f14",
    card:        "#182018",
    border:      "#1e301e",
    borderHover: "#2a4a2a",
    accent:      "#7AE650",
    accentLight: "#A8F07A",
    accentDim:   "#3a6e20",
    textPrimary: "#f0f7ee",
    textBody:    "#a8c4a0",
    textMuted:   "#5a7a52",
    textDim:     "#3a5a32",
  },
};

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={`fade-in${visible ? " visible" : ""}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

function Eyebrow({ children, style = {} }) {
  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500,
      letterSpacing: "0.14em", textTransform: "uppercase",
      color: DS.colors.accent, ...style,
    }}>{children}</div>
  );
}

function SectionDivider({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
      <div style={{ width: 32, height: 1.5, background: DS.colors.accent }} />
      <Eyebrow>{label}</Eyebrow>
    </div>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────

function Nav({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: isMobile ? "0 24px" : "0 40px", height: 60,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(10,18,9,0.92)" : "transparent",
      borderBottom: scrolled ? `0.5px solid ${DS.colors.border}` : "0.5px solid transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      transition: "all 0.3s ease",
    }}>
      <a href="#top" style={{
        fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
        fontSize: 16, letterSpacing: "-0.02em", color: DS.colors.textPrimary,
      }}>JK</a>
      {!isMobile && (
        <div style={{ display: "flex", gap: 32 }}>
          {[["work","Work"],["about","About"],["skills","Skills"],["contact","Contact"]].map(([id, label]) => (
            <a key={id} href={`#${id}`} style={{
              fontSize: 13, fontWeight: 400,
              color: activeSection === id ? DS.colors.accent : DS.colors.textMuted,
              transition: "color 0.2s", letterSpacing: "0.01em",
            }}>{label}</a>
          ))}
        </div>
      )}
      {isMobile && (
        <a href="#contact" style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500,
          color: DS.colors.accent, letterSpacing: "0.05em",
          border: `0.5px solid ${DS.colors.accentDim}`,
          padding: "6px 14px", borderRadius: 3,
        }}>Contact</a>
      )}
    </nav>
  );
}

// ── Industries tooltip stat ───────────────────────────────────────────────

const INDUSTRIES = [
  "Construction & Transport",
  "Recruitment & HR",
  "Renewable Energy",
  "Mental Health & Gaming",
  "E-commerce",
  "Consumer IoT",
  "Moving / Real Estate",
  "...and more",
];

function IndustriesStat({ isMobile }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ position: "relative", cursor: "default" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
        fontSize: isMobile ? 26 : 32, color: DS.colors.textPrimary, letterSpacing: "-0.02em",
      }}>6+</div>
      <div style={{
        fontSize: 11, color: DS.colors.textMuted, letterSpacing: "0.05em", marginTop: 2,
        borderBottom: `1px dashed ${DS.colors.textDim}`,
        display: "inline-block", paddingBottom: 1,
      }}>Industries</div>

      {/* Tooltip */}
      {hovered && (
        <div style={{
          position: "absolute", bottom: "calc(100% + 12px)", left: 0,
          background: DS.colors.raised,
          border: `0.5px solid ${DS.colors.border}`,
          borderRadius: 4, padding: "12px 16px",
          minWidth: 220, zIndex: 200,
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}>
          {/* Arrow */}
          <div style={{
            position: "absolute", bottom: -5, left: 16,
            width: 8, height: 8,
            background: DS.colors.raised,
            border: `0.5px solid ${DS.colors.border}`,
            borderTop: "none", borderLeft: "none",
            transform: "rotate(45deg)",
          }} />
          <div style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: DS.colors.accent, marginBottom: 8,
          }}>Industries</div>
          {INDUSTRIES.map((ind, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 8,
              marginBottom: i < INDUSTRIES.length - 1 ? 6 : 0,
            }}>
              <div style={{ width: 3, height: 3, borderRadius: "50%", background: DS.colors.accentDim, flexShrink: 0 }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 300, color: DS.colors.textBody }}>{ind}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────

function Hero() {
  const isMobile = useIsMobile();
  return (
    <section id="top" className="hero-section" style={{
      minHeight: "100svh", display: "flex", alignItems: "center",
      padding: isMobile ? "100px 24px 60px" : "120px 40px 80px",
      position: "relative", overflow: "hidden",
    }}>
      <div className="mesh-bg">
        <div className="mesh-base" />
        <div className="mesh-orb mesh-orb-1" />
        <div className="mesh-orb mesh-orb-2" />
        <div className="mesh-orb mesh-orb-3" />
        <div className="mesh-orb mesh-orb-4" />
        {!isMobile && [20, 40, 60, 80].map(p => (
          <div key={p} style={{
            position: "absolute", top: 0, bottom: 0, left: `${p}%`,
            width: "0.5px", background: DS.colors.border, opacity: 0.3,
          }} />
        ))}
      </div>

      {!isMobile && <>
        <div style={{
          position: "absolute", top: 120, right: 40,
          width: 6, height: 6, borderRadius: "50%",
          background: DS.colors.accent,
          animation: "pulse-dot 2.5s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", top: 120, right: 40,
          width: 0.5, height: "calc(100% - 120px)",
          background: DS.colors.border,
        }} />
      </>}

      <div style={{ maxWidth: 1100, width: "100%", margin: "0 auto", position: "relative" }}>

        <div className="hero-1">
          <Eyebrow style={{ marginBottom: isMobile ? 20 : 32 }}>UX / Product Designer — Stockholm</Eyebrow>
        </div>

        <div className="hero-2">
          <h1 style={{
            fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
            fontSize: isMobile ? "clamp(56px, 16vw, 80px)" : "clamp(72px, 12vw, 140px)",
            lineHeight: 0.9, letterSpacing: "-0.03em",
            color: DS.colors.textPrimary,
            marginBottom: isMobile ? 24 : 40,
          }}>
            Joanna<br /><span style={{ color: DS.colors.accent }}>Kaminska</span>
          </h1>
        </div>

        <div className="hero-3">
          <p style={{
            fontSize: isMobile ? 16 : "clamp(16px, 2vw, 20px)", fontWeight: 300,
            color: DS.colors.textBody, lineHeight: 1.7,
            maxWidth: 540, marginBottom: isMobile ? 32 : 48,
          }}>
            Complex problems → clear solutions. Research first, always. A decade of experience rooted in cognitive science. Ambiguity doesn't scare me.
          </p>
        </div>

        <div className="hero-4" style={{
          display: "flex", gap: 12,
          flexDirection: isMobile ? "column" : "row",
          flexWrap: "wrap",
          marginBottom: isMobile ? 56 : 96,
        }}>
          <a href="#work" style={{
            display: "block", background: DS.colors.accent, color: DS.colors.void,
            padding: "14px 32px", borderRadius: 3,
            fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500,
            textAlign: "center",
          }}>View my work</a>
          <a href="#contact" style={{
            display: "block", background: "transparent", color: DS.colors.textPrimary,
            border: "0.5px solid rgba(240,247,238,0.25)",
            padding: "14px 32px", borderRadius: 3,
            fontFamily: "'DM Sans', sans-serif", fontSize: 14,
            textAlign: "center",
          }}>Get in touch</a>
        </div>

        <div className="hero-5" style={{
          display: "flex", gap: isMobile ? 24 : 48, flexWrap: "wrap",
        }}>
          {[["10","Years experience"],["10+","Products designed"],["MSc","Cognitive science"]].map(s => (
            <div key={s[0]}>
              <div style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                fontSize: isMobile ? 26 : 32, color: DS.colors.textPrimary, letterSpacing: "-0.02em",
              }}>{s[0]}</div>
              <div style={{ fontSize: 11, color: DS.colors.textMuted, letterSpacing: "0.05em", marginTop: 2 }}>{s[1]}</div>
            </div>
          ))}

          {/* Industries stat with tooltip */}
          <IndustriesStat isMobile={isMobile} />
        </div>

      </div>
    </section>
  );
}

// ── Work ──────────────────────────────────────────────────────────────────

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeIn delay={index * 80} style={{ height: "100%" }}>
      <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? DS.colors.card : DS.colors.raised,
          border: `0.5px solid ${hovered ? DS.colors.borderHover : DS.colors.border}`,
          borderLeft: `2px solid ${hovered ? DS.colors.accent : DS.colors.accentDim}`,
          borderRadius: 4, overflow: "hidden", transition: "all 0.25s ease",
          height: "100%", display: "flex", flexDirection: "column",
        }}>
        <div style={{
          width: "100%", aspectRatio: "16/9",
          background: DS.colors.void,
          borderBottom: `0.5px solid ${DS.colors.border}`,
          position: "relative", overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15 }} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`grid-${index}`} width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#7AE650" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${index})`} />
          </svg>
          {[[0,0],[1,0],[0,1],[1,1]].map(([x,y],i) => (
            <div key={i} style={{
              position: "absolute",
              top: y === 0 ? 12 : "auto", bottom: y === 1 ? 12 : "auto",
              left: x === 0 ? 12 : "auto", right: x === 1 ? 12 : "auto",
              width: 12, height: 12,
              borderTop: y === 0 ? `1px solid ${DS.colors.accentDim}` : "none",
              borderBottom: y === 1 ? `1px solid ${DS.colors.accentDim}` : "none",
              borderLeft: x === 0 ? `1px solid ${DS.colors.accentDim}` : "none",
              borderRight: x === 1 ? `1px solid ${DS.colors.accentDim}` : "none",
            }} />
          ))}
          <div style={{
            fontFamily: "'DM Mono', monospace", fontSize: 10,
            color: DS.colors.textDim, letterSpacing: "0.1em",
            textTransform: "uppercase", textAlign: "center", lineHeight: 1.6,
          }}>Illustration<br />coming soon</div>
        </div>
        <div style={{ padding: "24px 28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <Eyebrow>{project.tag}</Eyebrow>
            {project.live && (
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: DS.colors.accent }} />
                <span style={{ fontSize: 11, color: DS.colors.textMuted, letterSpacing: "0.05em" }}>Live</span>
              </div>
            )}
          </div>
          <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: "-0.01em", color: DS.colors.textPrimary, marginBottom: 10 }}>{project.title}</h3>
          <p style={{ fontSize: 14, fontWeight: 300, color: DS.colors.textBody, lineHeight: 1.7 }}>{project.summary}</p>
        </div>
      </div>
    </FadeIn>
  );
}

function WorkSection() {
  const isMobile = useIsMobile();
  const groups = [
    { label: "Complex Operations — Two Worlds", description: "Products that serve two completely different users who depend on the same system.", projects: [
      { tag: "Transport / NCC Startup", title: "Hauly — Heavy Transport Platform", live: false, summary: "Lead designer on a digital ordering and transport platform for construction materials. Interviewed truck drivers at quarries. Drivers started logging deliveries they had never reported before — a clear signal the flow earned trust." },
      { tag: "Transport / NCC Stone Division", title: "NCC — Transport Management Platform", live: true, summary: "UX, UI, and research modernising transport planning across NCC's Stone Division. The tool cleared repetitive work and left space for human judgment. NCC dropped several paid tools and connected the workflow to Microsoft Dynamics." },
    ]},
    { label: "Early Stage — Zero to One", description: "No product. No validated assumptions. Often no clear user base yet.", projects: [
      { tag: "Recruitment / Social Impact", title: "Zynca — Recruitment Platform", live: true, summary: "From zero through to first live version. Led discovery, lean canvas, value proposition mapping, brand, full wireframes, and clickable prototype. Today over 1000 users. Clients include Max, Assa Abloy, and Subway." },
      { tag: "Energy / B2B SaaS", title: "Locus Energy — Monitoring Dashboard", live: true, summary: "Full product design for a platform monitoring renewable energy assets across Sweden, Norway, and Finland. Real-time map views, KPI dashboards, reporting. Dense data made fast to read for expert users." },
      { tag: "Concept Work / Music", title: "Soundroy", live: false, summary: "Early-stage product for music royalty management. Discovery workshops, user interviews, and clickable prototype. Designed for artists navigating a complex and opaque industry." },
      { tag: "Concept Work / Construction", title: "Pool", live: false, summary: "Early-stage product for construction materials reuse marketplace. Discovery, assumption mapping, user interviews, and clickable prototype delivered." },
      { tag: "Concept Work / Mining", title: "RockDoc", live: false, summary: "Early-stage product for underground mining operations. Discovery workshops, user interviews, and clickable prototype. Designed for a highly specialised and non-digital-native user base." },
    ]},
    { label: "Mature Products — Real Users", description: "Changes here are measured, tested, and argued for.", projects: [
      { tag: "Mental Health / Gaming", title: "Fig by Mindforce", live: true, summary: "First UX voice on a narrative game for people managing depression. Redesigned medication management, onboarding, paywall, and co-defined a rewards system. Users were people talking about their mental health." },
      { tag: "E-commerce / Scale", title: "Allegro — UX Design", live: true, summary: "Poland's dominant e-commerce platform. Login flows, live bidding, help center. Built a complex Axure prototype for real-time auction dynamics and ran usability studies." },
      { tag: "Consumer / IoT", title: "Tinitell — Kids Wearable Device", live: false, summary: "Entire design team. Redesigned the parents's mobile app, designed interaction patterns for a new watch version, coordinated diary studies. Collaborated with industrial designer for coherent digital and physical experience." },
      { tag: "UX Strategy / Brand", title: "Flyttsmart — UX Strategy & Brand Redesign", live: true, summary: "Research, full service mapping across four personas, broker engagement strategy, complete brand redesign. Logo, colour, typography, photography direction, guidelines. Delivered in two weeks." },
    ]},
    { label: "Brand and Web Design", description: null, projects: [
      { tag: "Executive Advisory / Brand", title: "9Yard Partner — Identity and Website", live: true, summary: "Full brand identity for an executive advisory consultancy. Logo, typography, deep charcoal and gold palette, pattern system, and Webflow website. Site is live at 9yardpartner.com." },

    ]},
  ];

  return (
    <section id="work" className="section-padded" style={{
      padding: isMobile ? "72px 24px" : "120px 40px",
      maxWidth: 1100, margin: "0 auto",
    }}>
      <FadeIn><SectionDivider label="Selected Work" /></FadeIn>
      <FadeIn><p style={{ fontSize: 14, color: DS.colors.textMuted, marginBottom: 56, maxWidth: 480, lineHeight: 1.7 }}>Projects chosen to show the range of environments I have worked in and the type of problems I am drawn to.</p></FadeIn>
      {groups.map((group, gi) => (
        <div key={gi} style={{ marginBottom: isMobile ? 56 : 80 }}>
          <FadeIn>
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 18 : 22, letterSpacing: "-0.01em", color: DS.colors.textPrimary, marginBottom: group.description ? 8 : 0 }}>{group.label}</h2>
              {group.description && <p style={{ fontSize: 13, color: DS.colors.textMuted, lineHeight: 1.7, maxWidth: 560 }}>{group.description}</p>}
            </div>
          </FadeIn>
          <div className="work-cards" style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 16,
            alignItems: "stretch",
          }}>
            {group.projects.map((p, pi) => <ProjectCard key={pi} project={p} index={pi} />)}
          </div>
        </div>
      ))}
      <FadeIn>
        <div style={{
          background: DS.colors.raised, border: `0.5px dashed ${DS.colors.border}`,
          borderRadius: 4, padding: isMobile ? "20px 20px" : "28px 32px",
          display: "flex", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center",
          flexDirection: isMobile ? "column" : "row",
          flexWrap: "wrap", gap: 12,
        }}>
          <div>
            <Eyebrow style={{ marginBottom: 8 }}>Coming soon</Eyebrow>
            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 16, color: DS.colors.textPrimary, letterSpacing: "-0.01em" }}>Subscription Keeper &amp; Expiry Keeper</h3>
            <p style={{ fontSize: 13, color: DS.colors.textMuted, marginTop: 8, maxWidth: 480, lineHeight: 1.7 }}>Two developer-built products getting a full design overhaul. This case study will also document how AI tools are reshaping what a designer can do.</p>
          </div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: DS.colors.accentDim, letterSpacing: "0.08em" }}>IN PROGRESS</div>
        </div>
      </FadeIn>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────

function AboutSection() {
  const isMobile = useIsMobile();
  return (
    <section id="about" style={{
      padding: isMobile ? "72px 24px" : "120px 40px",
      background: DS.colors.surface,
      borderTop: `0.5px solid ${DS.colors.border}`,
      borderBottom: `0.5px solid ${DS.colors.border}`,
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn><SectionDivider label="About" /></FadeIn>
        <div className="about-grid" style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 48 : 80,
          alignItems: "start",
        }}>
          <div>
            <FadeIn>
              <h2 style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                fontSize: isMobile ? "clamp(32px, 8vw, 44px)" : "clamp(36px, 5vw, 52px)",
                lineHeight: 1.0, letterSpacing: "-0.025em",
                color: DS.colors.textPrimary, marginBottom: 28,
              }}>
                I ask why<br /><span style={{ color: DS.colors.accent }}>before I design.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={100}>
              {[
                "I am a UX and product designer with a background in cognitive science: HCI, human perception, psychology, and logic. That foundation is not decorative. It shapes every research decision, every flow, every screen.",
                "I have worked across medical, e-commerce, transport, energy, gaming, and early-stage startups. My strongest skill is coming in at zero: no product, no users, no validated assumptions, and delivering something real at the other end.",
                "I do not want to be a consultant. I want to own a product, sit at the table where decisions happen, and work alongside POs, PMs, and developers who take design seriously.",
              ].map((p, i) => (
                <p key={i} style={{ fontSize: 15, fontWeight: 300, color: DS.colors.textBody, lineHeight: 1.8, marginBottom: 20 }}>{p}</p>
              ))}
            </FadeIn>
          </div>
          <div>
            <FadeIn delay={isMobile ? 0 : 150}>
              <Eyebrow style={{ marginBottom: 20 }}>How I work</Eyebrow>
              {[
                "I start with questions, not solutions.",
                "I switch between zooming into a single interaction problem and stepping back to see the whole product. Both matter.",
                "Design decisions need reasons. Not preferences, not trends. Cognitive science, established UX frameworks, real product examples.",
                "I treat developers, PMs, and stakeholders as collaborators, not audiences.",
              ].map((line, i) => (
                <div key={i} style={{ display: "flex", gap: 16, marginBottom: 20, alignItems: "flex-start" }}>
                  <div style={{ width: 2, height: 2, borderRadius: "50%", background: DS.colors.accent, marginTop: 10, flexShrink: 0 }} />
                  <p style={{ fontSize: 14, fontWeight: 300, color: DS.colors.textBody, lineHeight: 1.7 }}>{line}</p>
                </div>
              ))}
            </FadeIn>
            <FadeIn delay={isMobile ? 0 : 200}>
              <div style={{ background: DS.colors.card, border: `0.5px solid ${DS.colors.border}`, borderLeft: `2px solid #8C50DC`, borderRadius: 4, padding: "20px 24px", marginBottom: 32 }}>
                <Eyebrow style={{ marginBottom: 12, color: "#8C50DC" }}>Not a fit for</Eyebrow>
                <p style={{ fontSize: 13, fontWeight: 300, color: DS.colors.textBody, lineHeight: 1.7 }}>Agency or consultancy work. Roles where design executes decisions made elsewhere. Teams that need someone who won't push back.</p>
              </div>
            </FadeIn>
            <FadeIn delay={isMobile ? 0 : 250}>
              <Eyebrow style={{ marginBottom: 16 }}>Education</Eyebrow>
              <div style={{ borderLeft: `0.5px solid ${DS.colors.border}`, paddingLeft: 20 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 15, color: DS.colors.textPrimary, letterSpacing: "-0.01em" }}>MSc Cognitive Science</div>
                <div style={{ fontSize: 13, color: DS.colors.textMuted, marginTop: 2 }}>Adam Mickiewicz University, Poznań — 2007–2012</div>
                <p style={{ fontSize: 13, fontWeight: 300, color: DS.colors.textBody, lineHeight: 1.7, marginTop: 10 }}>The first program of its kind in Poland. HCI, human perception, memory, reasoning, language, epistemology. The breadth trained a specific way of thinking: holding multiple frameworks at once, questioning assumptions, building arguments from evidence.</p>
              </div>
            </FadeIn>
          </div>
        </div>
        {/* Testimonials hidden for now
        <FadeIn delay={100} style={{ marginTop: isMobile ? 48 : 80 }}>
          <div style={{ borderTop: `0.5px solid ${DS.colors.border}`, paddingTop: 40 }}>
            <Eyebrow style={{ marginBottom: 28 }}>What people say</Eyebrow>
            <div className="testimonials-grid" style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
            }}>
              {[
                { quote: "Thank you for pouring in so much passion and thoughtfulness into this product. Let's work again soon.", name: "Anders", company: "Fig by Mindforce" },
                { quote: "I have really appreciated your curiosity, how quickly you learn, and how easy it is to collaborate with you.", name: "Moa-Stina", company: "Fig by Mindforce" },
                { quote: "It's been great having you around, with your kind and relaxed attitude as well as your sharp analyses.", name: "Carl", company: "Fig by Mindforce" },
                { quote: "It's been a pleasure to collaborate with you and share the experience of creating beautiful things with such care for details.", name: "Jakov", company: "Fig by Mindforce" },
              ].map((t, i) => (
                <div key={i} style={{ background: DS.colors.raised, border: `0.5px solid ${DS.colors.border}`, borderRadius: 4, padding: "20px 24px" }}>
                  <p style={{ fontSize: 13, fontWeight: 300, fontStyle: "italic", color: DS.colors.textBody, lineHeight: 1.7, marginBottom: 16 }}>"{t.quote}"</p>
                  <div style={{ fontSize: 12, color: DS.colors.textMuted }}><span style={{ color: DS.colors.textPrimary, fontWeight: 500 }}>{t.name}</span> — {t.company}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
        */}
      </div>
    </section>
  );
}

// ── Skills ────────────────────────────────────────────────────────────────

function SkillsSection() {
  const isMobile = useIsMobile();
  const groups = [
    { label: "Research", items: ["User interviews", "Usability testing", "HEART metrics", "A/B testing", "Lookback", "Empathy mapping", "Card sorting", "Heuristic evaluation", "Contextual inquiry", "Cognitive walkthrough", "Tree testing", "Heat maps"] },
    { label: "Design", items: ["Wireframes", "Hi-Fi Prototypes", "UI design", "Design systems", "Interaction design", "Information architecture", "Microcopy", "Accessibility (WCAG)", "Figma", "Sketch"] },
    { label: "Strategy", items: ["Discovery workshops", "Lean canvas", "Value proposition design", "Service mapping", "Personas", "Journey maps", "Jobs-to-be-Done", "OKRs", "Competitor analysis", "Stakeholder mapping", "Double Diamond"] },
    { label: "Facilitation", items: ["Workshops", "Design sprints", "Stakeholder alignment", "Design reviews", "Miro", "FigJam"] },
    { label: "Brand & Visual", items: ["Logo design", "Brand guidelines", "Webflow"] },
    { label: "Implementation", items: ["HTML", "CSS", "Bootstrap", "React (basic)", "Unity (design collaboration)"] },
    { label: "AI-assisted design", items: ["Claude", "Gemini", "Midjourney"] },
  ];
  return (
    <section id="skills" style={{ padding: isMobile ? "72px 24px" : "120px 40px", maxWidth: 1100, margin: "0 auto" }}>
      <FadeIn><SectionDivider label="Skills" /></FadeIn>
      <div className="skills-grid" style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 16,
        alignItems: "stretch",
      }}>
        {groups.map((g, i) => (
          <FadeIn key={i} delay={i * 60} style={{ height: "100%" }}>
            <div style={{ background: DS.colors.raised, border: `0.5px solid ${DS.colors.border}`, borderRadius: 4, padding: "20px 24px", height: "100%" }}>
              <Eyebrow style={{ marginBottom: 16 }}>{g.label}</Eyebrow>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {g.items.map((item, j) => (
                  <span key={j} style={{ fontSize: 12, fontWeight: 400, color: DS.colors.textBody, background: DS.colors.card, border: `0.5px solid ${DS.colors.border}`, padding: "3px 10px", borderRadius: 2 }}>{item}</span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────

function ContactSection() {
  const isMobile = useIsMobile();
  return (
    <section id="contact" style={{
      padding: isMobile ? "72px 24px" : "120px 40px",
      background: DS.colors.surface, borderTop: `0.5px solid ${DS.colors.border}`,
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn><SectionDivider label="Contact" /></FadeIn>
        <div className="contact-grid" style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 40 : 80, alignItems: "start",
        }}>
          <FadeIn>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
              fontSize: isMobile ? "clamp(36px, 10vw, 52px)" : "clamp(40px, 6vw, 64px)",
              lineHeight: 0.95, letterSpacing: "-0.03em",
              color: DS.colors.textPrimary, marginBottom: 20,
            }}>
              Let's talk<br /><span style={{ color: DS.colors.accent }}>about the work.</span>
            </h2>
            <p style={{ fontSize: 15, fontWeight: 300, color: DS.colors.textBody, lineHeight: 1.7, maxWidth: 400 }}>I am looking for a product design role at a stable company with a real design team. Not an agency. Not a consultancy. A product I can care about.</p>
          </FadeIn>
          <FadeIn delay={isMobile ? 0 : 150}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "Email", value: "joanna.kaminska.se@gmail.com", href: "mailto:joanna.kaminska.se@gmail.com" },
                { label: "LinkedIn", value: "joanna-ux", href: "https://www.linkedin.com/in/joanna-ux" },
                { label: "Location", value: "Stockholm, Sweden", href: null },
              ].map(({ label, value, href }) => (
                <div key={label} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "14px 18px", background: DS.colors.raised,
                  border: `0.5px solid ${DS.colors.border}`, borderRadius: 4,
                  flexWrap: isMobile ? "wrap" : "nowrap", gap: 8,
                }}>
                  <Eyebrow>{label}</Eyebrow>
                  {href ? (
                    <a href={href} target={href.startsWith("mailto") ? "_self" : "_blank"} rel="noopener noreferrer"
                      style={{ fontSize: 13, color: DS.colors.accent, fontWeight: 400, textDecoration: "none" }}>
                      {value}
                    </a>
                  ) : (
                    <span style={{ fontSize: 13, color: DS.colors.textBody, fontWeight: 400 }}>{value}</span>
                  )}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────

function Footer() {
  const isMobile = useIsMobile();
  return (
    <footer style={{
      padding: isMobile ? "20px 24px" : "24px 40px",
      borderTop: `0.5px solid ${DS.colors.border}`,
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center",
      gap: isMobile ? 12 : 12,
    }}>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: DS.colors.textDim, letterSpacing: "0.06em" }}>© 2025 Joanna Kaminska</span>
      <NavLink href="/design-system" style={{
        fontFamily: "'DM Mono', monospace", fontSize: 11,
        color: DS.colors.textDim, letterSpacing: "0.06em",
        border: `0.5px solid ${DS.colors.border}`,
        padding: "5px 12px", borderRadius: 2,
      }}>Design System →</NavLink>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: DS.colors.textDim, letterSpacing: "0.06em" }}>Designed &amp; built with intention.</span>
    </footer>
  );
}

// ── Portfolio ─────────────────────────────────────────────────────────────

function Portfolio() {
  const [activeSection, setActiveSection] = useState("");
  useEffect(() => {
    const sections = ["work", "about", "skills", "contact"];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.3 });
    sections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Nav activeSection={activeSection} />
      <main>
        <Hero />
        <WorkSection />
        <AboutSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const path = useRoute();
  return path === "/design-system" ? <DesignSystemPage /> : <Portfolio />;
}
