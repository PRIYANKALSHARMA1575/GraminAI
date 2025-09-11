import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WeatherAlerts from "./pages/WeatherAlerts";
import SchemesUpdates from "./pages/SchemesUpdates";
import SoilHealth from "./pages/SoilHealth";
import PestDetection from "./pages/PestDetection";
import CropRecommendation from "./pages/CropRecommendation";
import MarketPrices from "./pages/MarketPrices";
import Login from "./pages/Login";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/weather-alerts" element={<WeatherAlerts />} />
      <Route path="/schemes" element={<SchemesUpdates />} />
      <Route path="/soil-health" element={<SoilHealth />} />
      <Route path="/pest-detection" element={<PestDetection />} />
      <Route path="/crop-recommendation" element={<CropRecommendation />} />
      <Route path="/market-prices" element={<MarketPrices />} />
    </Routes>
  );
}
