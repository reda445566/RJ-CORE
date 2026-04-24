import { useState } from "react";

const icons = {
  user: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="3"/><path d="m2 7 10 7 10-7"/>
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>
    </svg>
  ),
};

const EyeOpen = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeClosed = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

export default function Input({ icon = "user", type = "text", placeholder, value, onChange, name, error }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (show ? "text" : "password") : type;

  return (
    <div style={{ position: "relative", marginBottom: error ? "6px" : "14px" }}>
      {/* icon */}
      <span style={{
        position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
        color: "rgba(255,255,255,0.38)", width: 16, height: 16,
        display: "flex", alignItems: "center", pointerEvents: "none",
      }}>
        {icons[icon]}
      </span>

      <input
        name={name}
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          background: error ? "rgba(239,68,68,0.06)" : "rgba(255,255,255,0.05)",
          border: `1px solid ${error ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.08)"}`,
          borderRadius: 14,
          padding: `13px 42px 13px ${isPassword ? "42px" : "42px"}`,
          paddingRight: isPassword ? 42 : 14,
          fontFamily: "inherit",
          fontSize: 13.5,
          color: "#f0f0ff",
          outline: "none",
          transition: "border-color .2s, background .2s",
        }}
        onFocus={e => {
          e.target.style.borderColor = "rgba(123,97,255,0.5)";
          e.target.style.background = "rgba(123,97,255,0.06)";
        }}
        onBlur={e => {
          e.target.style.borderColor = error ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.08)";
          e.target.style.background = error ? "rgba(239,68,68,0.06)" : "rgba(255,255,255,0.05)";
        }}
      />

      {isPassword && (
        <button
          type="button"
          onClick={() => setShow(p => !p)}
          style={{
            position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
            background: "none", border: "none", cursor: "pointer",
            color: "rgba(255,255,255,0.38)", padding: 0, display: "flex", alignItems: "center",
          }}
        >
          {show ? <EyeClosed /> : <EyeOpen />}
        </button>
      )}

      {error && (
        <p style={{ fontSize: 11.5, color: "#f87171", marginTop: 4, marginLeft: 4 }}>{error}</p>
      )}
    </div>
  );
}


