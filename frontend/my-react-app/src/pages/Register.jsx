import useForm from "../hooks/useForm";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function Register() {
  const { form, handleChange } = useForm({
    name: "",
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
          Register
        </h2>

        <Input
          label="Name"
          name="name"
          onChange={handleChange}
        />

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

        <Button>Create Account</Button>
      </form>
    </div>
  );
}
