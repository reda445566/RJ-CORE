import { Link, useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import useForm from "../hooks/useForm";
import { loginUser } from "../api/auth.api.js"; // ✅

const validate = ({ email, password }) => {
  const e = {};
  if (!email) e.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Invalid email address";

  if (!password) e.password = "Password is required";
  else if (password.length < 6) e.password = "At least 6 characters";

  return e;
};

export default function Login() {
  const navigate = useNavigate();

  const { values, errors, loading, handleChange, handleSubmit } = useForm(
    { email: "", password: "" },
    validate
  );

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data); // ✅

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Welcome back</h2>
      <p style={styles.sub}>Log in to your RJ Core account</p>

      {errors.general && <p style={styles.alert}>{errors.general}</p>}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          name="email"
          icon="email"
          type="email"
          placeholder="Email Address"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />

        <Input
          name="password"
          icon="lock"
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />

        <div style={{ textAlign: "right", marginBottom: 14 }}>
          <Link to="/forgot-password" style={styles.forgot}>
            Forgot password?
          </Link>
        </div>

        <Button type="submit" loading={loading}>
          Log In
        </Button>
      </form>

      <div style={styles.divider}><span>or</span></div>

      <Button
        variant="google"
        onClick={() => (window.location.href = "/api/auth/google")}
      >
        Continue with Google
      </Button>

      <p style={styles.switchLine}>
        Don't have an account?{" "}
        <Link to="/register" style={styles.link}>
          Sign up
        </Link>
      </p>
    </div>
  );
}

const styles = {
  card: { width: "100%" },
  title: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 22,
    fontWeight: 700,
    textAlign: "center",
    marginBottom: 6,
    color: "#f0f0ff",
  },
  sub: {
    fontSize: 13,
    color: "rgba(255,255,255,0.45)",
    textAlign: "center",
    marginBottom: 28,
  },
  alert: {
    background: "rgba(239,68,68,0.1)",
    border: "1px solid rgba(239,68,68,0.3)",
    borderRadius: 10,
    padding: "10px 14px",
    fontSize: 13,
    color: "#f87171",
    marginBottom: 16,
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    margin: "18px 0",
    fontSize: 12,
    color: "rgba(255,255,255,0.35)",
  },
  forgot: {
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
    textDecoration: "none",
  },
  switchLine: {
    textAlign: "center",
    fontSize: 13,
    color: "rgba(255,255,255,0.45)",
    marginTop: 20,
  },
  link: { color: "#7B61FF", textDecoration: "none", fontWeight: 500 },
};

