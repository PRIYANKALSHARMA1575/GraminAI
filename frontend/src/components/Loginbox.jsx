import { useState } from "react";

export default function LoginBox({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-yellow-100 to-green-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-xl rounded-2xl w-96 border border-green-300"
      >
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          🌱 Farmer Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="bg-green-500 w-full py-2 text-white font-semibold rounded-md hover:bg-green-600 transition-all duration-200">
          Sign In
        </button>
      </form>
    </div>
  );
}
