import { useState } from "react";

export default function RegisterBox({ onRegister }) {
  const [form, setForm] = useState({
    Name: "",
    Email: "",
    Password: "",
    Contact: "",
    Age: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-lg w-96">
      <h2 className="text-xl font-bold text-center mb-4">Register</h2>
      {["Name", "Email", "Password", "Contact", "Age"].map((field) => (
        <input
          key={field}
          name={field}
          type={field === "Password" ? "password" : "text"}
          placeholder={field}
          className="w-full mb-3 px-3 py-2 border rounded"
          value={form[field]}
          onChange={handleChange}
          required
        />
      ))}
      <button className="bg-green-500 w-full py-2 text-white rounded hover:bg-green-600">
        Register
      </button>
    </form>
  );
}
