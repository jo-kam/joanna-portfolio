import { useState } from "react";

const DS = {
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
};

const CODE_COLORS = [
  'const DS = {',
  '  void:        "#0a1209",  // page background',
  '  surface:     "#0f1a0f",  // section backgrounds',
  '  raised:      "#141f14",  // card backgrounds',
  '  card:        "#182018",  // hover state backgrounds',
  '  border:      "#1e301e",  // default borders',
  '  borderHover: "#2a4a2a",  // hover borders',
  '  accent:      "#7AE650",  // primary accent — acid green',
  '  accentLight: "#A8F07A",  // light accent',
  '  accentDim:   "#3a6e20",  // dim / inactive',
  '  textPrimary: "#f0f7ee",  // headlines',
  '  textBody:    "#a8c4a0",  // body text',
  '  textMuted:   "#5a7a52",  // secondary text',
  '  textDim:     "#3a5a32",  // captions',
  '};',
].join('\n');

const CODE_TYPOGRAPHY = [
  'export function Heading({ level = 1, children, accent = false }) {',
  '  const sizes = { 1: 64, 2: 42, 3: 26, 4: 18 };',
  '  const trackings = { 1: "-0.03em", 2: "-0.02em", 3: "-0.01em", 4: "-0.01em" };',
  '  return (',
  '    <div style={{',
  '      fontFamily: "DM Sans, sans-serif",',
  '      fontWeight: level === 1 ? 800 : 700,',
  '      fontSize: sizes[level],',
  '      letterSpacing: trackings[level],',
  '      color: accent ? DS.accent : DS.textPrimary,',
  '    }}>{children}</div>',
  '  );',
  '}',
  '',
  'export function Body({ size = "md", children }) {',
  '  const sizes = { lg: 18, md: 16, sm: 14, xs: 13 };',
  '  return (',
  '    <p style={{',
  '      fontFamily: "DM Sans, sans-serif",',
  '      fontSize: sizes[size], fontWeight: 300,',
  '      lineHeight: 1.75, color: DS.textBody,',
  '    }}>{children}</p>',
  '  );',
  '}',
  '',
  'export function Eyebrow({ children }) {',
  '  return (',
  '    <div style={{',
  '      fontFamily: "DM Sans, sans-serif", fontSize: 11,',
  '      fontWeight: 500, letterSpacing: "0.14em",',
  '      textTransform: "uppercase", color: DS.accent,',
  '    }}>{children}</div>',
  '  );',
  '}',
].join('\n');

const CODE_BUTTONS = [
  'export function Button({ variant = "primary", children }) {',
  '  const base = {',
  '    fontFamily: "DM Sans, sans-serif",',
  '    fontSize: 14, padding: "12px 28px",',
  '    borderRadius: 3, cursor: "pointer", border: "none",',
  '  };',
  '  const styles = {',
  '    primary:   { ...base, background: DS.accent, color: DS.void, fontWeight: 500 },',
  '    secondary: { ...base, background: "transparent", color: DS.textPrimary,',
  '                 border: "0.5px solid rgba(240,247,238,0.25)", fontWeight: 400 },',
  '    ghost:     { ...base, background: "transparent", color: DS.accent,',
  '                 border: "0.5px solid " + DS.accent, fontWeight: 400 },',
  '  };',
  '  return <button style={styles[variant]}>{children}</button>;',
  '}',
  '',
  '// Usage',
  '<Button variant="primary">View my work</Button>',
  '<Button variant="secondary">Get in touch</Button>',
  '<Button variant="ghost">Learn more</Button>',
].join('\n');

const CODE_TAGS = [
  'export function Tag({ children }) {',
  '  return (',
  '    <span style={{',
  '      fontSize: 11, fontWeight: 500,',
  '      letterSpacing: "0.1em", textTransform: "uppercase",',
  '      color: DS.accent, border: "0.5px solid " + DS.accent,',
  '      padding: "4px 12px", borderRadius: 2,',
  '    }}>{children}</span>',
  '  );',
  '}',
  '',
  'export function Divider({ label }) {',
  '  return (',
  '    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>',
  '      <div style={{ width: 32, height: 2, background: DS.accent }} />',
  '      <Eyebrow>{label}</Eyebrow>',
  '    </div>',
  '  );',
  '}',
].join('\n');

const CODE_CARD = [
  'export function Card({ label, title, body, live = false }) {',
  '  const [hovered, setHovered] = useState(false);',
  '  return (',
  '    <div',
  '      onMouseEnter={() => setHovered(true)}',
  '      onMouseLeave={() => setHovered(false)}',
  '      style={{',
  '        background: hovered ? DS.card : DS.raised,',
  '        border: "0.5px solid " + (hovered ? DS.borderHover : DS.border),',
  '        borderLeft: "2px solid " + (hovered ? DS.accent : DS.accentDim),',
  '        borderRadius: 4, padding: "24px 28px",',
  '        transition: "all 0.2s ease",',
  '      }}>',
  '      <Eyebrow>{label}</Eyebrow>',
  '      <Heading level={3}>{title}</Heading>',
  '      <Body size="xs">{body}</Body>',
  '    </div>',
  '  );',
  '}',
].join('\n');

const CODE_SPACING = [
  'const spacing = {',
  '  xs:   4,   // inline gaps',
  '  sm:   8,   // component padding',
  '  md:   16,  // card padding, row gaps',
  '  lg:   24,  // section sub-gaps',
  '  xl:   48,  // section gaps',
  '  xxl:  80,  // section padding',
  '  xxxl: 128  // hero padding',
  '};',
  '',
  '// Usage',
  '<div style={{ padding: spacing.lg, gap: spacing.md }}>',
  '  ...',
  '</div>',
].join('\n');

const CODE_COMPOSITION = [
  'function HeroBlock() {',
  '  return (',
  '    <div style={{ padding: "80px 0" }}>',
  '      <Eyebrow style={{ marginBottom: 32 }}>UX / Product Designer</Eyebrow>',
  '      <Heading level={1} style={{ marginBottom: 8 }}>Joanna</Heading>',
  '      <Heading level={1} accent style={{ marginBottom: 32 }}>Kaminska</Heading>',
  '      <Body size="lg" style={{ maxWidth: 480, marginBottom: 40 }}>',
  '        I turn early-stage ideas into validated, testable products.',
  '      </Body>',
  '      <div style={{ display: "flex", gap: 16 }}>',
  '        <Button variant="primary">View my work</Button>',
  '        <Button variant="secondary">Get in touch</Button>',
  '      </div>',
  '    </div>',
  '  );',
  '}',
].join('\n');

// ── Primitives ────────────────────────────────────────────────────────────

export function Button({ variant, children }) {
  const v = variant || "primary";
  const base = {
    fontFamily: "'DM Sans', sans-serif", fontSize: 14,
    padding: "12px 28px", borderRadius: 3,
    cursor: "pointer", letterSpacing: "0.01em",
    transition: "opacity 0.15s", border: "none", display: "inline-block",
  };
  const styles = {
    primary:   { ...base, background: DS.accent, color: DS.void, fontWeight: 500 },
    secondary: { ...base, background: "transparent", color: DS.textPrimary, border: "0.5px solid rgba(240,247,238,0.25)", fontWeight: 400 },
    ghost:     { ...base, background: "transparent", color: DS.accent, border: "0.5px solid " + DS.accent, fontWeight: 400 },
  };
  return <button style={styles[v]}>{children}</button>;
}

export function Tag({ children }) {
  return (
    <span style={{
      fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500,
      letterSpacing: "0.1em", textTransform: "uppercase",
      color: DS.accent, border: "0.5px solid " + DS.accent,
      padding: "4px 12px", borderRadius: 2, display: "inline-block",
    }}>{children}</span>
  );
}

export function Eyebrow({ children, style }) {
  return (
    <div style={Object.assign({
      fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500,
      letterSpacing: "0.14em", textTransform: "uppercase", color: DS.accent,
    }, style || {})}>{children}</div>
  );
}

export function Heading({ level, children, accent, style }) {
  const l = level || 1;
  const sizes = { 1: 64, 2: 42, 3: 26, 4: 18 };
  const trackings = { 1: "-0.03em", 2: "-0.02em", 3: "-0.01em", 4: "-0.01em" };
  const isH1 = l === 1;
  return (
    <div style={Object.assign({
      fontFamily: isH1 ? "'DM Sans', sans-serif" : "'DM Sans', sans-serif",
      fontWeight: 800,
      fontSize: sizes[l],
      letterSpacing: trackings[l],
      lineHeight: isH1 ? 0.93 : 1.1,
      color: accent ? DS.accent : DS.textPrimary,
    }, style || {})}>{children}</div>
  );
}

export function Body({ size, children, style }) {
  const s = size || "md";
  const sizes = { lg: 18, md: 16, sm: 14, xs: 13 };
  return (
    <p style={Object.assign({
      fontFamily: "'DM Sans', sans-serif",
      fontSize: sizes[s], fontWeight: 300,
      lineHeight: 1.75, color: DS.textBody, margin: 0,
    }, style || {})}>{children}</p>
  );
}

export function Divider({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ width: 32, height: 2, background: DS.accent, borderRadius: 1 }} />
      <Eyebrow>{label}</Eyebrow>
    </div>
  );
}

export function Card({ label, title, body, live }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={function() { setHovered(true); }}
      onMouseLeave={function() { setHovered(false); }}
      style={{
        background: hovered ? DS.card : DS.raised,
        border: "0.5px solid " + (hovered ? DS.borderHover : DS.border),
        borderLeft: "2px solid " + (hovered ? DS.accent : DS.accentDim),
        borderRadius: 4, padding: "24px 28px",
        transition: "all 0.2s ease",
      }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <Eyebrow>{label}</Eyebrow>
        {live && (
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: DS.accent }} />
            <span style={{ fontSize: 11, color: DS.textMuted, letterSpacing: "0.05em" }}>Live</span>
          </div>
        )}
      </div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 17, letterSpacing: "-0.01em", color: DS.textPrimary, marginBottom: 10 }}>{title}</div>
      <Body size="xs">{body}</Body>
    </div>
  );
}

export function ColorSwatch({ name, hex, description }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(function() { setCopied(false); }, 1500);
  }
  return (
    <div onClick={copy} style={{ cursor: "pointer" }}>
      <div style={{
        height: 56, borderRadius: 4, background: hex,
        border: "0.5px solid rgba(255,255,255,0.06)",
        marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {copied && <span style={{ fontSize: 10, color: DS.void, fontFamily: "'DM Mono', monospace", background: DS.accent, padding: "2px 8px", borderRadius: 2 }}>copied</span>}
      </div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, color: DS.textPrimary, marginBottom: 2 }}>{name}</div>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: DS.textMuted }}>{hex}</div>
      {description && <div style={{ fontSize: 11, color: DS.textDim, marginTop: 2 }}>{description}</div>}
    </div>
  );
}

// ── CodeBlock ─────────────────────────────────────────────────────────────

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(function() { setCopied(false); }, 1500);
  }
  return (
    <div style={{ position: "relative" }}>
      <pre style={{
        background: DS.void,
        border: "0.5px solid " + DS.border,
        borderTop: "none",
        borderRadius: "0 0 4px 4px",
        padding: "20px 24px 20px",
        fontFamily: "'DM Mono', monospace", fontSize: 12,
        color: DS.textBody, lineHeight: 1.7,
        overflow: "auto", margin: 0, maxHeight: 280,
        whiteSpace: "pre",
      }}>{code}</pre>
      <button onClick={copy} style={{
        position: "absolute", top: 12, right: 12,
        background: copied ? DS.accent : DS.raised,
        color: copied ? DS.void : DS.textMuted,
        border: "0.5px solid " + DS.border,
        borderRadius: 3, padding: "4px 12px",
        fontFamily: "'DM Mono', monospace", fontSize: 10,
        cursor: "pointer", transition: "all 0.15s",
      }}>{copied ? "copied!" : "copy"}</button>
    </div>
  );
}

// ── Section — toggle button is BELOW the preview, right above the code ────

function Section({ title, description, children, code }) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div style={{ marginBottom: 80 }}>

      {/* Title + description — no toggle here */}
      <div style={{ marginBottom: 24 }}>
        <div style={{
          fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 18,
          color: DS.textPrimary, letterSpacing: "-0.01em", marginBottom: 8,
        }}>{title}</div>
        {description && (
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 14,
            fontWeight: 300, color: DS.textMuted, lineHeight: 1.7, margin: 0,
          }}>{description}</p>
        )}
      </div>

      {/* Preview box */}
      <div style={{
        background: DS.surface,
        border: "0.5px solid " + DS.border,
        borderRadius: "4px 4px 0 0",
        padding: "32px",
      }}>{children}</div>

      {/* Toggle button — sits flush below the preview, above the code */}
      {code && (
        <button
          onClick={function() { setShowCode(function(p) { return !p; }); }}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            width: "100%",
            background: showCode ? DS.raised : DS.card,
            border: "0.5px solid " + DS.border,
            borderTop: "none",
            borderBottom: showCode ? "none" : "0.5px solid " + DS.border,
            borderRadius: showCode ? 0 : "0 0 4px 4px",
            padding: "10px 20px",
            fontFamily: "'DM Mono', monospace", fontSize: 11,
            color: showCode ? DS.accent : DS.textMuted,
            cursor: "pointer", transition: "all 0.15s",
            textAlign: "left",
          }}
        >
          <span style={{ fontSize: 10 }}>{showCode ? "▲" : "▼"}</span>
          {showCode ? "hide code" : "view code"}
        </button>
      )}

      {/* Code panel — opens immediately below the toggle */}
      {code && showCode && <CodeBlock code={code} />}

    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function DesignSystemPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;800&family=DM+Mono:wght@400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a1209; }
        ::selection { background: #7AE650; color: #0a1209; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a1209; }
        ::-webkit-scrollbar-thumb { background: #1e301e; border-radius: 2px; }
      `}</style>

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: 60, padding: "0 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(10,18,9,0.92)",
        borderBottom: "0.5px solid " + DS.border,
        backdropFilter: "blur(12px)",
      }}>
        <a href="/" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 16, color: DS.textPrimary, textDecoration: "none", letterSpacing: "-0.02em" }}>JK</a>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: DS.accent }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: DS.textMuted, letterSpacing: "0.08em" }}>DESIGN SYSTEM</span>
        </div>
        <a href="/" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: DS.textMuted, textDecoration: "none" }}>← Back to portfolio</a>
      </nav>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "120px 40px 120px" }}>

        {/* Header */}
        <div style={{ marginBottom: 96 }}>
          <Eyebrow style={{ marginBottom: 20 }}>Joanna Kaminska Portfolio</Eyebrow>
          <Heading level={1} style={{ marginBottom: 8 }}>Design</Heading>
          <Heading level={1} accent style={{ marginBottom: 32 }}>System</Heading>
          <Body size="md" style={{ maxWidth: 520 }}>
            All components are production-ready React. Click "view code" below any section to see the implementation. Colors are click-to-copy.
          </Body>
          <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
            {["React 18", "DM Sans", "No dependencies", "CSS-in-JS"].map(function(t) {
              return <Tag key={t}>{t}</Tag>;
            })}
          </div>
        </div>

        <Section title="Color Tokens" code={CODE_COLORS}
          description="Click any swatch to copy the hex value. All colors defined as JS constants — import DS from your tokens file.">
          <div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: DS.textDim, letterSpacing: "0.1em", marginBottom: 12 }}>BACKGROUNDS</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                <ColorSwatch name="Void" hex={DS.void} description="Page bg" />
                <ColorSwatch name="Surface" hex={DS.surface} description="Section bg" />
                <ColorSwatch name="Raised" hex={DS.raised} description="Card bg" />
                <ColorSwatch name="Card" hex={DS.card} description="Hover bg" />
              </div>
            </div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: DS.textDim, letterSpacing: "0.1em", marginBottom: 12 }}>ACCENT</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                <ColorSwatch name="Accent" hex={DS.accent} description="Primary" />
                <ColorSwatch name="Accent Light" hex={DS.accentLight} description="Hover" />
                <ColorSwatch name="Accent Dim" hex={DS.accentDim} description="Inactive" />
                <ColorSwatch name="Border Hover" hex={DS.borderHover} description="Hover border" />
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: DS.textDim, letterSpacing: "0.1em", marginBottom: 12 }}>TEXT</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                <ColorSwatch name="Primary" hex={DS.textPrimary} description="Headlines" />
                <ColorSwatch name="Body" hex={DS.textBody} description="Body text" />
                <ColorSwatch name="Muted" hex={DS.textMuted} description="Secondary" />
                <ColorSwatch name="Dim" hex={DS.textDim} description="Captions" />
              </div>
            </div>
          </div>
        </Section>

        <Section title="Typography" code={CODE_TYPOGRAPHY}
          description="DM Sans 800 for display, DM Sans Light for body, DM Mono for code and labels.">
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {[
              { el: <Heading level={1}>Joanna Kaminska</Heading>, label: "Heading/Hero — DM Sans ExtraBold 64px -3% tracking" },
              { el: <Heading level={2}>How I Work</Heading>, label: "Heading/H1 — DM Sans Bold 42px -2% tracking" },
              { el: <Heading level={3}>Hauly, Heavy Transport Platform</Heading>, label: "Heading/H2 — DM Sans Bold 26px -1% tracking" },
              { el: <Eyebrow>Selected Work</Eyebrow>, label: "Eyebrow — DM Sans Medium 11px +14% tracking" },
              { el: <Body>I start with questions, not solutions. Before any design begins, I need to understand what is actually broken, who it is broken for, and why it matters.</Body>, label: "Body/Default — DM Sans Light 16px 1.75 leading" },
              { el: <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: DS.textMuted, letterSpacing: "0.08em" }}>Lead designer — NCC / Stockholm — 2022</span>, label: "Mono/Caption — DM Mono 11px" },
            ].map(function(row, i) {
              return (
                <div key={i} style={{ borderBottom: "0.5px solid " + DS.border, paddingBottom: 24 }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: DS.textDim, marginBottom: 10 }}>{row.label}</div>
                  {row.el}
                </div>
              );
            })}
          </div>
        </Section>

        <Section title="Buttons" code={CODE_BUTTONS}
          description="Three variants — primary (accent fill), secondary (ghost white), and ghost (accent outline).">
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <Button variant="primary">View my work</Button>
            <Button variant="secondary">Get in touch</Button>
            <Button variant="ghost">Learn more</Button>
          </div>
        </Section>

        <Section title="Tags & Dividers" code={CODE_TAGS}
          description="Tags for labelling content categories. Section dividers for visual hierarchy.">
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Case study", "Transport", "Energy", "Early stage", "Live", "Brand"].map(function(t) {
                return <Tag key={t}>{t}</Tag>;
              })}
            </div>
            <div style={{ borderTop: "0.5px solid " + DS.border, paddingTop: 24 }}>
              <Divider label="Selected Work" />
            </div>
          </div>
        </Section>

        <Section title="Project Card" code={CODE_CARD}
          description="Used in the Work section. Hover state animates border and background. Supports a live indicator dot.">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Card label="Transport / 2022" title="NCC Stone Division" body="Modernising transport planning across a complex legacy operation with no digital infrastructure." live />
            <Card label="Recruitment / 2023" title="Zynca — Recruitment Platform" body="From zero through to first live version. 1000+ users, clients include Max, Assa Abloy, and Subway." live />
          </div>
        </Section>

        <Section title="Spacing Scale" code={CODE_SPACING}
          description="7-step scale from 4px to 128px. Used consistently across padding, gaps, and margins.">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { name: "xs",  value: 4,   desc: "inline gaps" },
              { name: "sm",  value: 8,   desc: "component padding" },
              { name: "md",  value: 16,  desc: "card padding, row gaps" },
              { name: "lg",  value: 24,  desc: "section sub-gaps" },
              { name: "xl",  value: 48,  desc: "section gaps" },
              { name: "2xl", value: 80,  desc: "section padding" },
              { name: "3xl", value: 128, desc: "hero padding" },
            ].map(function(s) {
              return (
                <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: DS.textMuted, width: 32 }}>{s.name}</div>
                  <div style={{ width: Math.min(s.value * 1.5, 200), height: 4, background: DS.accent, borderRadius: 2, opacity: 0.7 }} />
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: DS.textDim }}>{s.value}px — {s.desc}</div>
                </div>
              );
            })}
          </div>
        </Section>

        <Section title="Composition Example" code={CODE_COMPOSITION}
          description="A full hero block assembled from individual components — showing how primitives compose into real UI.">
          <div style={{ padding: "40px 0" }}>
            <Eyebrow style={{ marginBottom: 24 }}>UX / Product Designer — Stockholm</Eyebrow>
            <Heading level={1} style={{ marginBottom: 8, fontSize: 48 }}>Joanna</Heading>
            <Heading level={1} accent style={{ marginBottom: 24, fontSize: 48 }}>Kaminska</Heading>
            <Body size="md" style={{ maxWidth: 440, marginBottom: 32 }}>
              I turn early-stage ideas into validated, testable products. 10 years of experience. Cognitive science foundation.
            </Body>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Button variant="primary">View my work</Button>
              <Button variant="secondary">Get in touch</Button>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <div style={{
          borderTop: "0.5px solid " + DS.border, paddingTop: 48,
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16,
        }}>
          <div>
            <Eyebrow style={{ marginBottom: 8 }}>Export</Eyebrow>
            <Body size="sm" style={{ color: DS.textMuted }}>
              All components are self-contained React functions with no external dependencies beyond Google Fonts.
            </Body>
          </div>
          <a href="/" style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 13,
            color: DS.textMuted, textDecoration: "none",
            border: "0.5px solid " + DS.border, borderRadius: 3,
            padding: "10px 20px",
          }}>← Back to portfolio</a>
        </div>

      </main>
    </>
  );
}
