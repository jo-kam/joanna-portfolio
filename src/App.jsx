import { useState, useEffect, useRef } from "react";
import "./index.css";
import DesignSystemPage from "./DesignSystem";

// ── Router ────────────────────────────────────────────────────────────────

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

// ── Design tokens ─────────────────────────────────────────────────────────

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

// ── Utilities ─────────────────────────────────────────────────────────────

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
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 40px", height: 60,
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
      <div style={{ display: "flex", gap: 32 }}>
        {[["work","Work"],["about","About"],["skills","Skills"],["contact","Contact"]].map(([id, label]) => (
          <a key={id} href={`#${id}`} style={{
            fontSize: 13, fontWeight: 400,
            color: activeSection === id ? DS.colors.accent : DS.colors.textMuted,
            transition: "color 0.2s", letterSpacing: "0.01em",
          }}>{label}</a>
        ))}
      </div>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="top" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      padding: "120px 40px 80px", position: "relative", overflow: "hidden",
    }}>

      {/* Mesh gradient */}
      <div className="mesh-bg">
        <div className="mesh-base" />
        <div className="mesh-orb mesh-orb-1" />
        <div className="mesh-orb mesh-orb-2" />
        <div className="mesh-orb mesh-orb-3" />
        <div className="mesh-orb mesh-orb-4" />
        {[20, 40, 60, 80].map(p => (
          <div key={p} style={{
            position: "absolute", top: 0, bottom: 0, left: `${p}%`,
            width: "0.5px", background: DS.colors.border, opacity: 0.3,
          }} />
        ))}
      </div>

      {/* Accent dot + line */}
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

      <div style={{ maxWidth: 1100, width: "100%", margin: "0 auto", position: "relative" }}>

        <div className="hero-1">
          <Eyebrow style={{ marginBottom: 32 }}>UX / Product Designer — Stockholm</Eyebrow>
        </div>

        <div className="hero-2">
          <h1 style={{
            fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
            fontSize: "clamp(72px, 12vw, 140px)", lineHeight: 0.9,
            letterSpacing: "-0.03em", color: DS.colors.textPrimary, marginBottom: 40,
          }}>
            Joanna<br /><span style={{ color: DS.colors.accent }}>Kaminska</span>
          </h1>
        </div>

        <div className="hero-3">
          <p style={{
            fontSize: "clamp(16px, 2vw, 20px)", fontWeight: 300,
            color: DS.colors.textBody, lineHeight: 1.7,
            maxWidth: 540, marginBottom: 48,
          }}>
            I turn early-stage ideas into validated, testable products.<br />
            10 years of experience. Cognitive science foundation.<br />
            Zero apologetics about ambiguity.
          </p>
        </div>

        <div className="hero-4" style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 96 }}>
          <a href="#work" style={{
            display: "inline-block", background: DS.colors.accent, color: DS.colors.void,
            padding: "14px 32px", borderRadius: 3,
            fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500,
          }}>View my work</a>
          <a href="#contact" style={{
            display: "inline-block", background: "transparent", color: DS.colors.textPrimary,
            border: "0.5px solid rgba(240,247,238,0.25)",
            padding: "14px 32px", borderRadius: 3,
            fontFamily: "'DM Sans', sans-serif", fontSize: 14,
          }}>Get in touch</a>
        </div>

        <div className="hero-5" style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
          {[["10","Years experience"],["20+","Products designed"],["6","Industries"],["MSc","Cognitive science"]].map(s => (
            <div key={s[0]}>
              <div style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                fontSize: 32, color: DS.colors.textPrimary, letterSpacing: "-0.02em",
              }}>{s[0]}</div>
              <div style={{ fontSize: 12, color: DS.colors.textMuted, letterSpacing: "0.05em", marginTop: 2 }}>{s[1]}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ── Work ──────────────────────────────────────────────────────────────────

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeIn delay={index * 80}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? DS.colors.card : DS.colors.raised,
          border: `0.5px solid ${hovered ? DS.colors.borderHover : DS.colors.border}`,
          borderLeft: `2px solid ${hovered ? DS.colors.accent : DS.colors.accentDim}`,
          borderRadius: 4, overflow: "hidden", transition: "all 0.25s ease",
        }}>

        {/* Cover image — placeholder shown if no real image yet */}
        <div style={{ overflow: "hidden", height: 200, position: "relative", background: DS.colors.card }}>
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              style={{
                width: "100%", height: "100%", objectFit: "cover", display: "block",
                opacity: hovered ? 1 : 0.8,
                transform: hovered ? "scale(1.03)" : "scale(1)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
              }}
            />
          ) : (
            <div style={{
              width: "100%", height: "100%",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: `repeating-linear-gradient(45deg, ${DS.colors.raised}, ${DS.colors.raised} 10px, ${DS.colors.card} 10px, ${DS.colors.card} 20px)`,
            }}>
              <span style={{
                fontFamily: "'DM Mono', monospace", fontSize: 10,
                color: DS.colors.textDim, letterSpacing: "0.1em",
              }}>IMAGE COMING SOON</span>
            </div>
          )}
        </div>

        <div style={{ padding: "28px 32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <Eyebrow>{project.tag}</Eyebrow>
            {project.live && (
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: DS.colors.accent }} />
                <span style={{ fontSize: 11, color: DS.colors.textMuted, letterSpacing: "0.05em" }}>Live</span>
              </div>
            )}
          </div>
          <h3 style={{
            fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 20,
            letterSpacing: "-0.01em", color: DS.colors.textPrimary, marginBottom: 12,
          }}>{project.title}</h3>
          <p style={{ fontSize: 14, fontWeight: 300, color: DS.colors.textBody, lineHeight: 1.7 }}>{project.summary}</p>
        </div>
      </div>
    </FadeIn>
  );
}

function WorkSection() {
  const groups = [
    {
      label: "Complex Operations — Two Worlds",
      description: "Products that serve two completely different users who depend on the same system.",
      projects: [
        {
          tag: "Transport / NCC Startup", title: "Hauly — Heavy Transport Platform", live: true,
          image: "/hauly-cover.webp",
          summary: "Lead designer on a digital ordering and transport platform for construction materials. Interviewed truck drivers at quarries. Drivers started logging deliveries they had never reported before — a clear signal the flow earned trust.",
        },
        {
          tag: "Transport / NCC Stone Division", title: "NCC — Transport Management Platform", live: false,
          image: "/transport-management-cover.webp",
          summary: "UX, UI, and research modernising transport planning across NCC's Stone Division. The tool cleared repetitive work and left space for human judgment. NCC dropped several paid tools and connected the workflow to Microsoft Dynamics.",
        },
      ],
    },
    {
      label: "Early Stage — Zero to One",
      description: "No product. No validated assumptions. Often no clear user base yet.",
      projects: [
        {
          tag: "Recruitment / Social Impact", title: "Zynca — Recruitment Platform", live: true,
          image: "/zynca-cover.webp",
          summary: "From zero through to first live version. Led discovery, lean canvas, value proposition mapping, brand, full wireframes, and clickable prototype. Today over 1000 users. Clients include Max, Assa Abloy, and Subway.",
        },
        {
          tag: "Energy / B2B SaaS", title: "Locus Energy — Monitoring Dashboard", live: true,
          image: "/locus-energy-cover.webp",
          summary: "Full product design for a platform monitoring renewable energy assets across Sweden, Norway, and Finland. Real-time map views, KPI dashboards, reporting. Dense data made fast to read for expert users.",
        },
        {
          tag: "Concept Work", title: "Soundroy, Pool, RockDoc", live: false,
          image: "/concept-work-cover.webp",
          summary: "Three early-stage products across music royalties, construction materials reuse, and underground mining. Discovery workshops, user interviews, and clickable prototypes delivered across all three.",
        },
      ],
    },
    {
      label: "Mature Products — Real Users",
      description: "Changes here are measured, tested, and argued for.",
      projects: [
        {
          tag: "Mental Health / Gaming", title: "Fig by Mindforce", live: true,
          image: "/fig-mindforce-cover.webp",
          summary: "First UX voice on a narrative game for people managing depression. Redesigned medication management, onboarding, paywall, and co-defined a rewards system. Users were people talking about their mental health.",
        },
        {
          tag: "E-commerce / Scale", title: "Allegro — UX Design", live: true,
          image: "/allegro-cover.webp",
          summary: "Poland's dominant e-commerce platform. Login flows, live bidding, help center. Built a complex Axure prototype for real-time auction dynamics and ran usability studies.",
        },
        {
          tag: "Moving Platform / Brand", title: "Flyttsmart — Brand Refresh", live: true,
          image: "/flyttsmart-cover.webp",
          summary: "Research, full service mapping across four personas, broker engagement strategy, complete brand refresh. Logo, colour, typography, photography direction, guidelines. Delivered in two weeks.",
        },
      ],
    },
    {
      label: "Brand and Web",
      description: null,
      projects: [
        {
          tag: "Executive Advisory / Brand", title: "9Yard Partner — Identity and Website", live: true,
          image: "/9yard-cover.webp",
          summary: "Full brand identity for an executive advisory consultancy. Logo, typography, deep charcoal and gold palette, pattern system, and Webflow website. Site is live at 9yardpartner.com.",
        },
        {
          tag: "Consumer / IoT", title: "Tinitell — Kids Wearable Device", live: false,
          image: "/tinitell-cover.webp",
          summary: "Entire design team. Redesigned the parents' mobile app, designed interaction patterns for a new watch version, coordinated diary studies. Collaborated with industrial designer for coherent digital and physical experience.",
        },
      ],
    },
  ];

  return (
    <section id="work" style={{ padding: "120px 40px", maxWidth: 1100, margin: "0 auto" }}>
      <FadeIn><SectionDivider label="Selected Work" /></FadeIn>
      <FadeIn><p style={{ fontSize: 14, color: DS.colors.textMuted, marginBottom: 80, maxWidth: 480, lineHeight: 1.7 }}>Projects chosen to show the range of environments I have worked in and the type of problems I am drawn to.</p></FadeIn>
      {groups.map((group, gi) => (
        <div key={gi} style={{ marginBottom: 80 }}>
          <FadeIn>
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 22, letterSpacing: "-0.01em", color: DS.colors.textPrimary, marginBottom: group.description ? 10 : 0 }}>{group.label}</h2>
              {group.description && <p style={{ fontSize: 14, color: DS.colors.textMuted, lineHeight: 1.7, maxWidth: 560 }}>{group.description}</p>}
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 }}>
            {group.projects.map((p, pi) => <ProjectCard key={pi} project={p} index={pi} />)}
          </div>
        </div>
      ))}
      <FadeIn>
        <div style={{ background: DS.colors.raised, border: `0.5px dashed ${DS.colors.border}`, borderRadius: 4, padding: "28px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <Eyebrow style={{ marginBottom: 8 }}>Coming soon</Eyebrow>
            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 18, color: DS.colors.textPrimary, letterSpacing: "-0.01em" }}>Subscription Keeper &amp; Expiry Keeper</h3>
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
  return (
    <section id="about" style={{ padding: "120px 40px", background: DS.colors.surface, borderTop: `0.5px solid ${DS.colors.border}`, borderBottom: `0.5px solid ${DS.colors.border}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn><SectionDivider label="About" /></FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <FadeIn>
              <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "clamp(36px, 5vw, 52px)", lineHeight: 1.0, letterSpacing: "-0.025em", color: DS.colors.textPrimary, marginBottom: 32 }}>
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
            <FadeIn delay={150}>
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
            <FadeIn delay={200}>
              <div style={{ background: DS.colors.card, border: `0.5px solid ${DS.colors.border}`, borderLeft: `2px solid ${DS.colors.accent}`, borderRadius: 4, padding: "20px 24px", marginBottom: 32 }}>
                <Eyebrow style={{ marginBottom: 12 }}>Not a fit for</Eyebrow>
                <p style={{ fontSize: 13, fontWeight: 300, color: DS.colors.textBody, lineHeight: 1.7 }}>Agency or consultancy work. Roles where design executes decisions made elsewhere. Teams that need someone who won't push back.</p>
              </div>
            </FadeIn>
            <FadeIn delay={250}>
              <Eyebrow style={{ marginBottom: 16 }}>Education</Eyebrow>
              <div style={{ borderLeft: `0.5px solid ${DS.colors.border}`, paddingLeft: 20 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 15, color: DS.colors.textPrimary, letterSpacing: "-0.01em" }}>MSc Cognitive Science</div>
                <div style={{ fontSize: 13, color: DS.colors.textMuted, marginTop: 2 }}>Adam Mickiewicz University, Poznań — 2007–2012</div>
                <p style={{ fontSize: 13, fontWeight: 300, color: DS.colors.textBody, lineHeight: 1.7, marginTop: 10 }}>One of the first programs of its kind in Poland. HCI, human perception, memory, reasoning, language, epistemology. The breadth trained a specific way of thinking: holding multiple frameworks at once, questioning assumptions, building arguments from evidence.</p>
              </div>
            </FadeIn>
          </div>
        </div>
        <FadeIn delay={100} style={{ marginTop: 80 }}>
          <div style={{ borderTop: `0.5px solid ${DS.colors.border}`, paddingTop: 48 }}>
            <Eyebrow style={{ marginBottom: 32 }}>What people say</Eyebrow>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
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
      </div>
    </section>
  );
}

// ── Skills ────────────────────────────────────────────────────────────────

function SkillsSection() {
  const groups = [
    { label: "Research", items: ["User interviews", "Diary studies", "Usability testing", "Focus groups", "Assumption mapping", "RITE", "HEART metrics", "Round Robin", "A/B testing", "Lookback", "Optimizely"] },
    { label: "Design", items: ["Wireframes", "Prototypes", "UI design", "Design systems", "Figma", "FigJam", "Axure"] },
    { label: "Strategy", items: ["Discovery workshops", "Lean canvas", "Value proposition design", "Market mapping", "Service mapping", "Personas", "Journey maps", "JTBD"] },
    { label: "Brand & Visual", items: ["Logo design", "Typography systems", "Color systems", "Brand guidelines", "Photography direction"] },
    { label: "Implementation", items: ["Webflow", "HTML", "CSS", "Bootstrap"] },
    { label: "Currently learning", items: ["AI-assisted design workflows"] },
  ];
  return (
    <section id="skills" style={{ padding: "120px 40px", maxWidth: 1100, margin: "0 auto" }}>
      <FadeIn><SectionDivider label="Skills" /></FadeIn>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
        {groups.map((g, i) => (
          <FadeIn key={i} delay={i * 60}>
            <div style={{ background: DS.colors.raised, border: `0.5px solid ${DS.colors.border}`, borderRadius: 4, padding: "20px 24px" }}>
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
  return (
    <section id="contact" style={{ padding: "120px 40px", background: DS.colors.surface, borderTop: `0.5px solid ${DS.colors.border}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn><SectionDivider label="Contact" /></FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <FadeIn>
            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "clamp(40px, 6vw, 64px)", lineHeight: 0.95, letterSpacing: "-0.03em", color: DS.colors.textPrimary, marginBottom: 24 }}>
              Let's talk<br /><span style={{ color: DS.colors.accent }}>about the work.</span>
            </h2>
            <p style={{ fontSize: 15, fontWeight: 300, color: DS.colors.textBody, lineHeight: 1.7, maxWidth: 400 }}>I am looking for a product design role at a stable company with a real design team. Not an agency. Not a consultancy. A product I can care about.</p>
          </FadeIn>
          <FadeIn delay={150}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[["Email","joanna@example.com",true],["LinkedIn","linkedin.com/in/joannakaminska",true],["Location","Stockholm, Sweden",false]].map(([label, value, isLink]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: DS.colors.raised, border: `0.5px solid ${DS.colors.border}`, borderRadius: 4 }}>
                  <Eyebrow>{label}</Eyebrow>
                  <span style={{ fontSize: 14, color: isLink ? DS.colors.accent : DS.colors.textBody, fontWeight: 400 }}>{value}</span>
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
  return (
    <footer style={{ padding: "24px 40px", borderTop: `0.5px solid ${DS.colors.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
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

// ── Root ──────────────────────────────────────────────────────────────────

export default function App() {
  const path = useRoute();
  return path === "/design-system" ? <DesignSystemPage /> : <Portfolio />;
}
