import { Link, useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import useForm from "../hooks/useForm";
import api from "../api/axios"; // 👈 axios instance

const validate = ({ name, email, password, confirmPassword }) => {
  const e = {};

  if (!name || name.trim().length < 2)
    e.name = "Full name is required";

  if (!email)
    e.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(email))
    e.email = "Invalid email address";

  if (!password)
    e.password = "Password is required";
  else if (password.length < 8)
    e.password = "At least 8 characters";

  if (password !== confirmPassword)
    e.confirmPassword = "Passwords don't match";

  return e;
};

export default function Register() {
  const navigate = useNavigate();

  const { values, errors, loading, handleChange, handleSubmit } = useForm(
    { name: "", email: "", password: "", confirmPassword: "" },
    validate
  );

  const onSubmit = async ({ name, email, password }) => {
    try {
      const res = await api.post("/auth/signup", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      throw new Error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Create your account</h2>
      <p style={styles.sub}>Join RJ Core and start your journey</p>

      {errors.general && <p style={styles.alert}>{errors.general}</p>}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          name="name"
          icon="user"
          type="text"
          placeholder="Full Name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
        />

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

        <Input
          name="confirmPassword"
          icon="lock"
          type="password"
          placeholder="Confirm Password"
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <Button type="submit" loading={loading}>
          Sign Up
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
        Already have an account?{" "}
        <Link to="/login" style={styles.link}>
          Log in
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
  switchLine: {
    textAlign: "center",
    fontSize: 13,
    color: "rgba(255,255,255,0.45)",
    marginTop: 20,
  },
  link: { color: "#7B61FF", textDecoration: "none", fontWeight: 500 },
};
