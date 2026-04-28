const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

export default function Button({ children, variant = "primary", loading = false, type = "button", onClick }) {
  const base = {
    width: "100%",
    padding: "14px",
    borderRadius: 14,
    border: "none",
    cursor: loading ? "not-allowed" : "pointer",
    fontFamily: "'Syne', sans-serif",
    fontSize: 15,
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    transition: "opacity .2s, transform .15s",
    opacity: loading ? 0.6 : 1,
  };

  const variants = {
    primary: {
      background: "linear-gradient(135deg, #7B61FF, #5B8DEF)",
      color: "#fff",
    },
    google: {
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.08)",
      color: "#f0f0ff",
      fontFamily: "'Inter', sans-serif",
      fontSize: 13.5,
      fontWeight: 500,
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      style={{ ...base, ...variants[variant] }}
      onMouseEnter={e => { if (!loading) { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-1px)"; }}}
      onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
      onMouseDown={e => { e.currentTarget.style.transform = "translateY(0)"; }}
    >
      {loading ? (
        <span style={{
          width: 16, height: 16, borderRadius: "50%",
          border: "2px solid rgba(255,255,255,0.3)",
          borderTopColor: "#fff",
          animation: "spin .7s linear infinite",
          display: "inline-block",
        }}/>
      ) : variant === "google" ? (
        <><GoogleIcon />{children}</>
      ) : (
        <>{children}<ArrowRight /></>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </button>
  );
}






