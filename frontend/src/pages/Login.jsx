import LoginBox from "../components/Loginbox";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      await loginUser(email, password);
      alert("Login successful");
      navigate("/dashboard"); // update if needed
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <LoginBox onLogin={handleLogin} />
      <p className="mt-4 text-green-800 text-sm">
        Don’t have an account?{" "}
        <button
          className="text-green-700 font-semibold hover:underline"
          onClick={() => navigate("/register")}
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}
