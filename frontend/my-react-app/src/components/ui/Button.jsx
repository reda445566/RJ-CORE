export default function Button({ children }) {
  return (
    <button
      style={{
        background: "white",
        color: "black",
        padding: "10px",
        borderRadius: "6px",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}





