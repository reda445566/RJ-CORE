export default function Input({ label, ...props }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <label style={{ color: "#aaa", fontSize: "14px" }}>
        {label}
      </label>

      <input
        style={{
          background: "#111",
          border: "1px solid #333",
          color: "white",
          padding: "10px",
          borderRadius: "6px",
        }}
        {...props}
      />
    </div>
  );
}


