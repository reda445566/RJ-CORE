import useForm from "../hooks/useForm";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function Login() {
  const { form, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#111",
          padding: "30px",
          borderRadius: "10px",
          width: "300px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h2 style={{ color: "white", textAlign: "center" }}>
          Login
        </h2>

        <Input
          label="Email"
          name="email"
          onChange={handleChange}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          onChange={handleChange}
        />

        <Button>Login</Button>
      </form>
    </div>
  );
}



