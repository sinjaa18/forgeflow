import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../config/api.js"
function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg);
        return;
      }

      localStorage.setItem("token", data.token);

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-8 rounded-xl w-[350px]"
      >
        <h1 className="text-3xl font-bold mb-6">Create Account</h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-slate-700 outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-slate-700 outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-slate-700 outline-none"
        />

        <button className="w-full bg-blue-600 p-3 rounded">Register</button>

        <p className="mt-4 text-slate-400 text-sm">
          Already have an account?
          <Link to="/" className="text-blue-400 ml-2">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
