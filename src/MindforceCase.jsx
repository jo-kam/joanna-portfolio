import { useEffect } from "react";

const DS = {
  void:        "#0a1209",
  surface:     "#0f1a0f",
  raised:      "#141f14",
  card:        "#182018",
  border:      "#1e301e",
  accent:      "#7AE650",
  accentDim:   "#3a6e20",
  textPrimary: "#f0f7ee",
  textBody:    "#a8c4a0",
  textMuted:   "#5a7a52",
  textDim:     "#3a5a32",
};

function Eyebrow({ children, style = {} }) {
  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500,
      letterSpacing: "0.14em", textTransform: "uppercase",
      color: DS.accent, ...style,
    }}>{children}</div>
  );
}

function navigate(href) {
  window.history.pushState({}, "", href);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo(0, 0);
}

export default function MindforceCase() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Nav */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: 60, padding: "0 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(10,18,9,0.92)",
        borderBottom: `0.5px solid ${DS.border}`,
        backdropFilter: "blur(12px)",
      }}>
        <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}
          style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 16, color: DS.textPrimary, textDecoration: "none", letterSpacing: "-0.02em" }}>
          JK
        </a>
        <button onClick={() => navigate("/")} style={{
          background: "transparent", border: `0.5px solid ${DS.border}`,
          borderRadius: 3, padding: "6px 16px", cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: DS.textMuted,
          display: "flex", alignItems: "center", gap: 8,
        }}>
          ← Back to work
        </button>
      </nav>

      <main style={{ background: DS.void, minHeight: "100vh", paddingTop: 60 }}>

        {/* Hero */}
        <div style={{
          padding: "80px 40px 64px",
          maxWidth: 860, margin: "0 auto",
        }}>
          <Eyebrow style={{ marginBottom: 16 }}>Case Study · Mental Health / Gaming · 2024–2025</Eyebrow>
          <h1 style={{
            fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
            fontSize: "clamp(36px, 6vw, 56px)", lineHeight: 1.0,
            letterSpacing: "-0.025em", color: DS.textPrimary, marginBottom: 24,
          }}>
            Fig by Mindforce<br />
            <span style={{ color: DS.accent }}>Medication Management Redesign</span>
          </h1>

          {/* Meta row */}
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", marginBottom: 48 }}>
            {[
              ["Role", "UX Designer"],
              ["Platform", "iOS / Android"],
              ["Status", "Live"],
              ["Team", "Mindforce Game Lab"],
            ].map(([label, value]) => (
              <div key={label}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: DS.textDim, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: DS.textPrimary }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ width: "100%", height: "0.5px", background: DS.border, marginBottom: 48 }} />

          {/* Problem */}
          <section style={{ marginBottom: 64 }}>
            <Eyebrow style={{ marginBottom: 16 }}>The Problem</Eyebrow>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, fontWeight: 300, color: DS.textBody, lineHeight: 1.8, marginBottom: 16 }}>
              The existing medication setup in Fig was a web-based flow that asked users to type their medication name manually, navigate a non-standard clock-wheel time picker, and read through a safety disclaimer before they had committed to anything.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, fontWeight: 300, color: DS.textBody, lineHeight: 1.8 }}>
              For users managing depression, every unnecessary step has a real cost. Concentration, motivation, and patience are not always available. The flow needed to work with that reality, not against it.
            </p>
          </section>

          {/* Old flow image */}
          <section style={{ marginBottom: 64 }}>
            <Eyebrow style={{ marginBottom: 16 }}>Old Flow</Eyebrow>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: DS.textMuted, lineHeight: 1.7, marginBottom: 24 }}>
              Web-based, manual text entry for medication names, clock-wheel time picker, safety disclaimer surfaced early. Long and fragmented.
            </p>
            <div style={{
              background: DS.surface, border: `0.5px solid ${DS.border}`,
              borderRadius: 6, overflow: "hidden",
            }}>
              <img
                src="/mindforce-old-flow.png"
                alt="Old Fig medication flow — web-based, manual entry"
                style={{ width: "100%", display: "block" }}
              />
            </div>
          </section>

          {/* What I did */}
          <section style={{ marginBottom: 64 }}>
            <Eyebrow style={{ marginBottom: 16 }}>What I Did</Eyebrow>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, fontWeight: 300, color: DS.textBody, lineHeight: 1.8, marginBottom: 16 }}>
              I redesigned the flow as a native mobile experience and mapped out two competing approaches — reminder first and medication first — so the team could compare them concretely, not theoretically.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, fontWeight: 300, color: DS.textBody, lineHeight: 1.8, marginBottom: 16 }}>
              One of the most impactful changes was introducing a pre-populated list of the most commonly prescribed medications for depression. Instead of typing a drug name, users could select it in one tap. This removed a significant friction point for users who may struggle with concentration or recall on difficult days.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, fontWeight: 300, color: DS.textBody, lineHeight: 1.8 }}>
              After gorilla testing and team discussion, we chose medication first. Leading with what you are taking, rather than when, makes the purpose of the feature explicit from screen one. This is medication support, not just a reminder app.
            </p>
          </section>

          {/* New flow image */}
          <section style={{ marginBottom: 64 }}>
            <Eyebrow style={{ marginBottom: 16 }}>Redesigned Flow — Reminder First vs Medication First</Eyebrow>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: DS.textMuted, lineHeight: 1.7, marginBottom: 24 }}>
              Both flows designed end-to-end for comparison. Native iOS, standard patterns, pre-populated medication list, integrated into the game's visual language.
            </p>
            <div style={{
              background: DS.surface, border: `0.5px solid ${DS.border}`,
              borderRadius: 6, overflow: "hidden",
            }}>
              <img
                src="/mindforce-new-flow.png"
                alt="Redesigned Fig medication flow — reminder first vs medication first comparison"
                style={{ width: "100%", display: "block" }}
              />
            </div>
          </section>

          {/* What changed */}
          <section style={{ marginBottom: 64 }}>
            <Eyebrow style={{ marginBottom: 24 }}>Old vs New</Eyebrow>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                {
                  label: "Before",
                  color: DS.textDim,
                  items: [
                    "Web-based (browser)",
                    "Manual text entry for medication name",
                    "Clock-wheel time picker",
                    "Safety disclaimer early in flow",
                    "Reminder-first order",
                    "Fragmented, longer journey",
                  ]
                },
                {
                  label: "After",
                  color: DS.accent,
                  items: [
                    "Native iOS / Android",
                    "Pre-populated common medications list",
                    "Standard time picker",
                    "Disclaimer moved to end",
                    "Medication-first order",
                    "Shorter, purpose-driven journey",
                  ]
                }
              ].map(col => (
                <div key={col.label} style={{
                  background: DS.raised, border: `0.5px solid ${DS.border}`,
                  borderRadius: 4, padding: "24px 24px",
                }}>
                  <div style={{
                    fontFamily: "'DM Mono', monospace", fontSize: 10,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    color: col.color, marginBottom: 16,
                  }}>{col.label}</div>
                  {col.items.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                      <div style={{ width: 3, height: 3, borderRadius: "50%", background: col.color, marginTop: 7, flexShrink: 0 }} />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 300, color: DS.textBody, lineHeight: 1.6 }}>{item}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {/* Takeaway */}
          <section style={{
            background: DS.raised, border: `0.5px solid ${DS.border}`,
            borderLeft: `2px solid ${DS.accent}`,
            borderRadius: 4, padding: "28px 32px", marginBottom: 80,
          }}>
            <Eyebrow style={{ marginBottom: 12 }}>Takeaway</Eyebrow>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 300, color: DS.textBody, lineHeight: 1.8, margin: 0 }}>
              This project required designing for users in a vulnerable mental state, where every unnecessary step costs real effort. The improvements were not cosmetic. Preparing both flows as fully designed journeys gave the team something concrete to evaluate, and the decision came from the work, not from opinion.
            </p>
          </section>

          {/* Back */}
          <div style={{ textAlign: "center", paddingBottom: 80 }}>
            <button onClick={() => navigate("/")} style={{
              background: "transparent", border: `0.5px solid ${DS.border}`,
              borderRadius: 3, padding: "14px 32px", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: DS.textMuted,
            }}>
              ← Back to all work
            </button>
          </div>

        </div>
      </main>
    </>
  );
}
