import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Chatbot from "./pages/Chatbot";
import CropRecommendation from "./pages/CropRecommendation";
import PestIdentification from "./pages/PestIdentification"; // Assuming you have a PestIdentification component
import Profile from "./pages/Profile"; // Assuming you have a Profile component
import Schemes from "./pages/Schemes"; // Assuming you have a Schemes component
import Help from "./pages/Help"; // Assuming you have a Help component
import Logout from "./pages/Logout"; // Assuming you have a Logout component
import DiseaseIdentification from "./pages/DiseaseIdentification";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/crop-recommendation" element={<CropRecommendation />} />
        <Route path="/pest-identification" element={<PestIdentification />} />
        <Route path="/Disease-identification" element={<DiseaseIdentification />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/schemes" element={<Schemes />} />
        <Route path="/help" element={<Help />} />
        <Route path="/logout" element={<Logout />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
