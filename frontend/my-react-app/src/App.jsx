import { Routes, Route, Navigate } from "react-router-dom";
import Login    from "./pages/Login";
import Register from "./pages/Register";

// ── Auth layout — the dark split-screen shell ──────────────────────────
function AuthLayout({ children }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; }
        body {
          font-family: 'Inter', sans-serif;
          background: #080b14;
          color: #f0f0ff;
          overflow: hidden;
        }
        input { font-family: 'Inter', sans-serif; }

        .auth-bg {
          position: fixed; inset: 0; z-index: 0;
          background:
            radial-gradient(ellipse 60% 50% at 18% 65%, rgba(80,50,180,0.2) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 80% 20%, rgba(60,80,200,0.13) 0%, transparent 60%),
            linear-gradient(180deg, #06080f 0%, #0a0d1a 50%, #080b14 100%);
        }
        .auth-bg::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 60% 15%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 80% 50%, rgba(255,255,255,0.2) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 40% 70%, rgba(255,255,255,0.25) 0%, transparent 100%),
            radial-gradient(1px 1px at 10% 80%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 55% 40%, rgba(255,255,255,0.2) 0%, transparent 100%),
            radial-gradient(1px 1px at 75% 75%, rgba(255,255,255,0.18) 0%, transparent 100%),
            radial-gradient(1px 1px at 30% 55%, rgba(255,255,255,0.22) 0%, transparent 100%),
            radial-gradient(1px 1px at 90% 35%, rgba(255,255,255,0.15) 0%, transparent 100%);
          background-size: 450px 450px;
        }
        .auth-page {
          position: relative; z-index: 1;
          display: flex; height: 100vh;
        }
        .auth-left {
          flex: 1;
          display: flex; flex-direction: column;
          justify-content: space-between;
          padding: 36px 48px;
        }
        .auth-logo {
          display: flex; align-items: center; gap: 10px;
          font-family: 'Syne', sans-serif;
          font-size: 12px; font-weight: 600;
          letter-spacing: 0.16em;
          color: #f0f0ff;
          text-decoration: none;
        }
        .auth-logo-box {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #7B61FF, #5B8DEF);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: 14px; font-weight: 800; color: #fff;
        }
        .auth-headline {
          padding-bottom: 64px;
        }
        .auth-headline h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.9rem, 3.5vw, 2.8rem);
          font-weight: 700; line-height: 1.15;
          color: #f0f0ff; margin-bottom: 8px;
        }
        .auth-headline h1 span {
          background: linear-gradient(135deg, #7B61FF, #5B8DEF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .auth-tagline {
          font-size: 13px; color: #7B61FF;
          letter-spacing: .04em; margin-bottom: 12px;
        }
        .auth-desc {
          font-size: 14px; color: rgba(255,255,255,0.42);
          line-height: 1.75; max-width: 250px;
        }
        .auth-quote {
          font-size: 13px; color: rgba(255,255,255,0.35);
          line-height: 1.7;
          border-left: 2px solid #7B61FF;
          padding-left: 14px; max-width: 270px;
        }
        .auth-right {
          width: min(480px, 44vw);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
        }
        .auth-card {
          width: 100%;
          background: rgba(10,13,26,0.88);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 44px 40px;
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          box-shadow: 0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.025);
        }

        /* divider inside card */
        .auth-card .div-line {
          display: flex; align-items: center; gap: 12px;
          margin: 18px 0; font-size: 12px;
          color: rgba(255,255,255,0.3);
        }
        .auth-card .div-line::before,
        .auth-card .div-line::after {
          content: ''; flex: 1;
          height: 1px; background: rgba(255,255,255,0.07);
        }

        @media (max-width: 768px) {
          .auth-left { display: none; }
          .auth-right { width: 100%; padding: 20px; }
          .auth-card { padding: 32px 24px; }
          body { overflow: auto; }
        }
      `}</style>

      <div className="auth-bg" />
      <div className="auth-page">
        {/* Left branding panel */}
        <div className="auth-left">
          <a className="auth-logo" href="/">
            <div className="auth-logo-box">RJ</div>
            CORE
          </a>

          <div className="auth-headline">
            <p className="auth-tagline">Build. Connect. Grow.</p>
            <h1>Welcome to<br /><span>RJ Core</span></h1>
            <p className="auth-desc">Your all-in-one platform to manage and scale your ideas.</p>
          </div>

          <p className="auth-quote">
            The future depends on what you build today.
          </p>
        </div>

        {/* Right card */}
        <div className="auth-right">
          <div className="auth-card">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

// ── App ────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login"    element={<AuthLayout><Login /></AuthLayout>} />
      <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
    </Routes>
  );
}

