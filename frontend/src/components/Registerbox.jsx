import { useState } from "react";

export default function RegisterBox({ onRegister }) {
  const [form, setForm] = useState({
    Name: "",
    Email: "",
    Password: "",
    Contact: "",
    Age: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(form);
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <input
        name="Name"
        type="text"
        placeholder="Name"
        value={form.Name}
        onChange={handleChange}
        required
      />
      <input
        name="Email"
        type="email"
        placeholder="Email"
        value={form.Email}
        onChange={handleChange}
        required
      />
      <input
        name="Password"
        type="password"
        placeholder="Password"
        value={form.Password}
        onChange={handleChange}
        required
      />
      <input
        name="Contact"
        type="text"
        placeholder="Contact"
        value={form.Contact}
        onChange={handleChange}
        required
      />
      <input
        name="Age"
        type="number"
        placeholder="Age"
        value={form.Age}
        onChange={handleChange}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
}
