import RegisterBox from "../components/Registerbox";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    try {
      await registerUser(
        formData.Name,
        formData.Email,
        formData.Password,
        formData.Contact,
        formData.Age
      );
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      alert("Registration failed: " + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <RegisterBox onRegister={handleRegister} />
    </div>
  );
}
