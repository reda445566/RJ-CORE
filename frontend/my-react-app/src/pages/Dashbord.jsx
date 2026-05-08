import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/nav.jsx";

/* ─── Bar Chart */
const weeklyData = [
  { day: "Mon", theory: 55, labs: 35 },
  { day: "Tue", theory: 40, labs: 60 },
  { day: "Wed", theory: 70, labs: 45 },
  { day: "Thu", theory: 30, labs: 20 },
  { day: "Fri", theory: 65, labs: 80 },
  { day: "Sat", theory: 85, labs: 100 },
  { day: "Sun", theory: 50, labs: 30 },
];

function BarChart() {
  return (
    <div style={s.barChart}>
      {weeklyData.map(({ day, theory, labs }) => (
        <div key={day} style={s.barCol}>
          <div style={s.barPair}>
            <div style={{ ...s.bar, ...s.barTheory, height: `${theory}%` }} />
            <div style={{ ...s.bar, ...s.barLabs,   height: `${labs}%`   }} />
          </div>
          <span style={s.barLabel}>{day}</span>
        </div>
      ))}
    </div>
  );
}

// / ─── Course data /
const courses = [
  {
    tag: "AI SYSTEMS",
    tagColor: "#8b5cf6",
    tagBg: "rgba(139,92,246,0.15)",
    emoji: "🧠",
    title: "Quantum Neural Gates",
    desc: "Exploring the intersection of quantum computing and deep learning models.",
    module: "Module 4 of 12",
  },
  {
    tag: "DATA SCIENCE",
    tagColor: "#00e5c8",
    tagBg: "rgba(0,229,200,0.12)",
    emoji: "📊",
    title: "Algorithmic Bias Patterns",
    desc: "Identifying and mitigating unconscious bias in training datasets.",
    module: "Module 2 of 8",
  },
  {
    tag: "CYBER SECURITY",
    tagColor: "#f59e0b",
    tagBg: "rgba(245,158,11,0.12)",
    emoji: "🔐",
    title: "Zero Trust Architecture",
    desc: "Implementing cryptographic verification across decentralized networks.",
    module: "Module 7 of 15",
  },
];

/* ─── Dashboard ──────────────────────────────────────────── */
export default function Dashboard() {
  const navigate = useNavigate();
  const [chartView, setChartView] = useState("Weekly");
  const [audioMode, setAudioMode] = useState("Neural");
  const [session,   setSession]   = useState(false);

  return (
    <div style={s.layout}>
      <NavBar />

      <main style={s.main}>

        {/* ── Header ── */}
        <header style={s.header}>
          <div style={s.searchBar}>
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24"
              stroke="rgba(255,255,255,0.3)" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
            </svg>
            <input style={s.searchInput} placeholder="Search resources..." />
          </div>
          <div style={s.headerRight}>
            <span style={s.pill}>🏆 Level 24</span>
            <span style={{ ...s.pill, color: "#00e5c8" }}>⚡ 1,250 pts</span>
            <div style={s.avatar} />
          </div>
        </header>

        {/* ── Hero ── */}
        <section style={s.heroRow}>
          <div>
            <h2 style={s.heroTitle}>Welcome back, Scholar</h2>
            <p style={s.muted}>
              Your AI Mentor has prepared 3 new learning paths for your current track.
            </p>
          </div>
          <div style={s.streakCard}>
            <div style={s.streakIcon}>🔥</div>
            <div>
              <div style={s.streakLabel}>CURRENT STREAK</div>
              <div style={s.streakVal}>12 Days</div>
            </div>
          </div>
        </section>

        {/* ── Analytics + Sidebar ── */}
        <div style={s.gridRow}>

          <div style={s.card}>
            <div style={s.cardHeader}>
              <span style={s.cardTitle}>Progress Analytics</span>
              <div style={s.tabGroup}>
                {["Weekly", "Monthly"].map((v) => (
                  <button
                    key={v}
                    onClick={() => setChartView(v)}
                    style={chartView === v ? s.tabActive : s.tab}
                  >{v}</button>
                ))}
              </div>
            </div>
            <BarChart />
            <div style={s.legend}>
              <span style={s.legendItem}><span style={{ ...s.dot, background: "#6b5de0" }} />Theory Focus</span>
              <span style={s.legendItem}><span style={{ ...s.dot, background: "#00e5c8" }} />Practical Labs</span>
              <span style={{ ...s.legendItem, marginLeft: "auto", color: "#00e5c8", fontWeight: 600 }}>
                +12% from last week
              </span>
            </div>
          </div>

          <div style={s.rightCol}>

             {/* AI Recommendation */}
            <div style={s.card}>
              <p style={s.cardTitle}>🤖 AI Recommendation</p>
              <p style={{ ...s.muted, marginBottom: 12 }}>
                Based on your performance in "Neural Architecture", you should explore:
              </p>
              <div style={s.recItem}>
                <div style={s.recTitle}>Advanced Backprop</div>
                <div style={s.recMeta}>
                  <span style={s.muted}>DIFFICULTY: HARD</span>
                  <span style={{ color: "#00e5c8", fontWeight: 600, fontSize: 12 }}>98% MATCH</span>
                </div>
              </div>
              <button style={s.outlineBtn}>Start Optimized Path</button>
            </div>

            {/* Daily Goal */}
            <div style={s.card}>
              <p style={s.cardTitle}>🎯 Daily Goal</p>
              <div style={s.goalRow}>
                <span style={s.muted}>2.5 / 4 hours</span>
                <span style={{ color: "#00e5c8", fontWeight: 700, fontSize: 13 }}>62%</span>
              </div>
              <div style={s.progressTrack}>
                <div style={{ ...s.progressFill, width: "62%" }} />
              </div>
            </div>

          </div>
        </div>

        {/* ── Continue Learning ── */}
        <h3 style={s.sectionTitle}>Continue Learning</h3>
        <div style={s.coursesGrid}>
          {courses.map((c) => (
            <div
              key={c.title}
              style={s.courseCard}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div style={s.courseThumb}>
                <span style={{ fontSize: 34 }}>{c.emoji}</span>
                <span style={{ ...s.courseTag, color: c.tagColor, background: c.tagBg }}>
                  {c.tag}
                </span>
              </div>
              <div style={s.courseBody}>
                <div style={s.courseTitle}>{c.title}</div>
                <div style={s.courseDesc}>{c.desc}</div>
                <div style={s.courseFooter}>
                  <span style={s.muted}>{c.module}</span>
                  <div style={s.playBtn}>▶</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Deep Focus ── */}
        <div style={s.focusCard}>
          <div>
            <div style={s.focusTitle}>Deep Focus Mode</div>
            <div style={s.focusDesc}>
              Activate an AI-curated focus session with binaural beats and notification suppression.
            </div>
            <div style={s.timerDisplay}>25:00</div>
            <div style={s.timerLabel}>RECOMMENDED TIME</div>
            <button
              style={session ? s.sessionBtnStop : s.sessionBtn}
              onClick={() => setSession(!session)}
            >
              {session ? "Stop Session" : "Start Session"}
            </button>
          </div>

          <div>
            <p style={{ ...s.muted, marginBottom: 6 }}>Background Audio</p>
            <p style={{ color: "#00e5c8", fontWeight: 600, fontSize: 13, marginBottom: 12 }}>
              Neural Waves
            </p>
            <div style={s.progressTrack}>
              <div style={{ ...s.progressFill, width: "45%" }} />
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              {["Lo-Fi", "White Noise", "Neural"].map((m) => (
                <button
                  key={m}
                  onClick={() => setAudioMode(m)}
                  style={audioMode === m ? s.audioPillActive : s.audioPill}
                >{m}</button>
              ))}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

/* Styles */
const s = {
//   / layout /
  layout: { display: "flex", minHeight: "100vh", background: "#0a0c12", fontFamily: "'DM Sans', sans-serif" },
  main:   { marginLeft: 215, flex: 1, padding: "0 36px 60px", background: "#0a0c12" },

//   / header /
  header:      { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 0 28px", gap: 20 },
  searchBar:   { display: "flex", alignItems: "center", gap: 10, background: "#141720", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "10px 18px", width: 380 },
  searchInput: { background: "none", border: "none", outline: "none", color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif", width: "100%" },
  headerRight: { display: "flex", alignItems: "center", gap: 12 },
  pill:        { background: "#141720", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "7px 14px", fontSize: 13, fontWeight: 600, color: "#c0c8d4" },
  avatar:      { width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#8b5cf6,#00e5c8)" },

  /* hero */
  heroRow:    { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28, gap: 24 },
  heroTitle:  { fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 700, color: "#fff", marginBottom: 6 },
  streakCard: { background: "#141720", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "14px 20px", display: "flex", alignItems: "center", gap: 14, minWidth: 160 },
  streakIcon: { width: 40, height: 40, background: "rgba(0,229,200,0.1)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 },
  streakLabel:{ fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 },
  streakVal:  { fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "#00e5c8" },

  /* grid */
  gridRow:  { display: "grid", gridTemplateColumns: "1fr 280px", gap: 20, marginBottom: 32 },
  rightCol: { display: "flex", flexDirection: "column", gap: 16 },

  /* card */
  card:       { background: "#0f1117", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 18, padding: "22px 24px" },
  cardHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 },
  cardTitle:  { fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff", margin: 0 },
  muted:      { fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.6, margin: 0 },

  /* tabs */
  tabGroup:  { display: "flex", background: "#1a1d26", borderRadius: 8, padding: 3, gap: 2 },
  tab:       { padding: "5px 14px", borderRadius: 6, border: "none", background: "none", color: "rgba(255,255,255,0.4)", fontSize: 13, fontFamily: "'DM Sans',sans-serif", cursor: "pointer" },
  tabActive: { padding: "5px 14px", borderRadius: 6, border: "none", background: "#262a38", color: "#fff", fontSize: 13, fontFamily: "'DM Sans',sans-serif", cursor: "pointer" },

  /* bar chart */
  barChart:  { display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: 180, gap: 8, paddingBottom: 28, position: "relative" },
  barCol:    { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", position: "relative" },
  barPair:   { display: "flex", alignItems: "flex-end", gap: 3, height: "100%", width: "100%" },
  bar:       { flex: 1, borderRadius: "5px 5px 0 0", transition: "height 0.3s ease" },
  barTheory: { background: "#6b5de0" },
  barLabs:   { background: "#00e5c8" },
  barLabel:  { position: "absolute", bottom: -22, fontSize: 11, color: "rgba(255,255,255,0.35)" },

  /* legend */
  legend:     { display: "flex", alignItems: "center", gap: 20, marginTop: 16, fontSize: 12, color: "rgba(255,255,255,0.45)" },
  legendItem: { display: "flex", alignItems: "center", gap: 6 },
  dot:        { width: 8, height: 8, borderRadius: "50%", display: "inline-block" },

  /* rec */
  recItem:  { background: "#1a1d26", borderRadius: 10, padding: "12px 14px", margin: "12px 0" },
  recTitle: { fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 6 },
  recMeta:  { display: "flex", justifyContent: "space-between" },

  /* buttons */
  outlineBtn: { width: "100%", padding: "10px 0", borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", background: "none", color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans',sans-serif", cursor: "pointer" },

  /* progress */
  goalRow:       { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  progressTrack: { height: 6, background: "#1a1d26", borderRadius: 99, overflow: "hidden" },
  progressFill:  { height: "100%", background: "linear-gradient(90deg,#00e5c8,#0097ff)", borderRadius: 99, transition: "width 0.4s ease" },

  /* section */
  sectionTitle: { fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 16 },

  /* courses */
  coursesGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 28 },
  courseCard:  { background: "#0f1117", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, overflow: "hidden", cursor: "pointer", transition: "transform 0.18s" },
  courseThumb: { height: 100, background: "#141720", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" },
  courseTag:   { position: "absolute", bottom: 10, left: 12, padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: 0.5 },
  courseBody:  { padding: "14px 16px" },
  courseTitle: { fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 6 },
  courseDesc:  { fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.6, marginBottom: 12 },
  courseFooter:{ display: "flex", alignItems: "center", justifyContent: "space-between" },
  playBtn:     { width: 28, height: 28, background: "rgba(0,229,200,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#00e5c8", fontSize: 10 },

  /* focus */
  focusCard:       { background: "#0f1117", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 18, padding: "28px 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center" },
  focusTitle:      { fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 8 },
  focusDesc:       { fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.6, marginBottom: 20 },
  timerDisplay:    { fontFamily: "'Syne', sans-serif", fontSize: 48, fontWeight: 800, color: "#fff", letterSpacing: -2 },
  timerLabel:      { fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: 1, textTransform: "uppercase", margin: "4px 0 20px" },
  sessionBtn:      { padding: "13px 28px", borderRadius: 14, background: "linear-gradient(135deg,#8b5cf6,#6d28d9)", border: "none", color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "'DM Sans',sans-serif", cursor: "pointer" },
  sessionBtnStop:  { padding: "13px 28px", borderRadius: 14, background: "linear-gradient(135deg,#ef4444,#b91c1c)", border: "none", color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "'DM Sans',sans-serif", cursor: "pointer" },

  /* audio */
  audioPill:      { padding: "5px 14px", borderRadius: 20, border: "none", background: "#1a1d26", color: "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: "'DM Sans',sans-serif", cursor: "pointer" },
  audioPillActive:{ padding: "5px 14px", borderRadius: 20, border: "none", background: "#262a38", color: "#fff",                  fontSize: 12, fontFamily: "'DM Sans',sans-serif", cursor: "pointer" },
};