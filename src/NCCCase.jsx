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

const PASSWORD = "joannaisagreatdesigner";

function Eyebrow({ children, style = {} }) {
  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500,
      letterSpacing: "0.14em", textTransform: "uppercase",
      color: DS.accent, ...style,
    }}>{children}</div>
  );
}

import { useState } from "react";

function PasswordGate({ onUnlock }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (input === PASSWORD) {
      onUnlock();
    } else {
      setError(true);
      setInput("");
      setTimeout(() => setError(false), 2000);
    }
  }

  return (
    <div style={{
      minHeight: "100vh", background: DS.void,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "40px 24px",
    }}>
      <div style={{ maxWidth: 400, width: "100%", textAlign: "center" }}>
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          border: `0.5px solid ${DS.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 24px",
          fontFamily: "'DM Mono', monospace", fontSize: 16, color: DS.accent,
        }}>→</div>
        <Eyebrow style={{ marginBottom: 16, textAlign: "center" }}>Protected case study</Eyebrow>
        <h2 style={{
          fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
          fontSize: 24, letterSpacing: "-0.02em",
          color: DS.textPrimary, marginBottom: 8,
        }}>Enter password to continue</h2>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 14,
          fontWeight: 300, color: DS.textMuted, lineHeight: 1.7, marginBottom: 32,
        }}>
          This case study is password protected. Contact Joanna for access.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Password"
            autoFocus
            style={{
              width: "100%", padding: "12px 16px",
              background: DS.raised,
              border: `0.5px solid ${error ? "#e05555" : DS.border}`,
              borderRadius: 4, outline: "none",
              fontFamily: "'DM Sans', sans-serif", fontSize: 14,
              color: DS.textPrimary,
              marginBottom: 12, boxSizing: "border-box",
              transition: "border-color 0.2s",
            }}
          />
          {error && (
            <p style={{
              fontFamily: "'DM Mono', monospace", fontSize: 11,
              color: "#e05555", marginBottom: 12, letterSpacing: "0.05em",
            }}>Incorrect password</p>
          )}
          <button type="submit" style={{
            width: "100%", padding: "12px 24px",
            background: DS.accent, color: DS.void,
            border: "none", borderRadius: 4, cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500,
          }}>View case study</button>
        </form>
        <button onClick={() => {
          window.history.pushState({}, "", "/");
          window.dispatchEvent(new PopStateEvent("popstate"));
        }} style={{
          marginTop: 16, background: "transparent", border: "none",
          cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          fontSize: 13, color: DS.textMuted,
        }}>← Back to portfolio</button>
      </div>
    </div>
  );
}

export default function NCCCase({ unlocked, onUnlock }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (!unlocked) return <PasswordGate onUnlock={onUnlock} />;

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: 60, padding: "0 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(10,18,9,0.92)",
        borderBottom: `0.5px solid ${DS.border}`,
        backdropFilter: "blur(12px)",
      }}>
        <a href="/" onClick={(e) => { e.preventDefault(); window.history.pushState({}, "", "/"); window.dispatchEvent(new PopStateEvent("popstate")); window.scrollTo(0,0); }}
          style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 16, color: DS.textPrimary, textDecoration: "none" }}>
          JK
        </a>
        <button onClick={() => { window.history.pushState({}, "", "/"); window.dispatchEvent(new PopStateEvent("popstate")); window.scrollTo(0,0); }} style={{
          background: "transparent", border: `0.5px solid ${DS.border}`,
          borderRadius: 3, padding: "6px 16px", cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: DS.textMuted,
        }}>
          ← Back to work
        </button>
      </nav>

      <main style={{ background: DS.void, minHeight: "100vh", paddingTop: 60 }}>
        <div style={{ padding: "80px 40px", maxWidth: 860, margin: "0 auto" }}>
          <Eyebrow style={{ marginBottom: 16 }}>Case Study · Transport / Construction · 2021–2022</Eyebrow>
          <h1 style={{
            fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
            fontSize: "clamp(36px, 6vw, 56px)", lineHeight: 1.0,
            letterSpacing: "-0.025em", color: DS.textPrimary, marginBottom: 24,
          }}>
            NCC Stone Division<br />
            <span style={{ color: DS.accent }}>Transport Management Platform</span>
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 300, color: DS.textMuted, lineHeight: 1.7 }}>
            Case study coming soon.
          </p>
        </div>
      </main>
    </>
  );
}
