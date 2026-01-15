# 🌱 Farmer AI Assistant — Smart Multilingual Agriculture Platform 🇮🇳  

![Made with Flask](https://img.shields.io/badge/Made%20with-Flask-000000?logo=flask&logoColor=white)  
![React](https://img.shields.io/badge/Frontend-React.js-61DAFB?logo=react&logoColor=black)  
![PyTorch](https://img.shields.io/badge/AI-PyTorch-EE4C2C?logo=pytorch&logoColor=white)  
![License](https://img.shields.io/badge/License-MIT-green)  

An **AI-powered, multilingual web platform** enabling Indian farmers to detect plant diseases, access real-time market price predictions, get instant government scheme updates, and receive expert crop advisories—via **images, voice, or text in 23 official Indian languages**.  

---

## ✨ Key Features  

- **📈 Market Price Prediction**  
  AI/ML model (PyTorch) predicts tomorrow's crop prices using **current, historical, and region-specific data**—advising the best mandi (marketplace) for each crop.  

- **🌾 Plant Disease & Pest Detection**  
  Farmers upload or capture plant images; the system (Qwen-VL) identifies **diseases and pests** in natural language.  

- **🎙️ Voice, Image, Text Queries**  
  Farmers can interact hands-free using **speech (Whisper)**, photos, or text. The **AI agent understands all formats** and responds in their chosen language.  

- **🏛️ Real-Time Government Scheme Dashboard**  
  Farmers receive **live updates** on central/state schemes, subsidies, and initiatives based on their **location and crops**.  

- **🌍 Multilingual Support**  
  Supports **all 23 Indian languages**, including Hindi, Tamil, Telugu, Kannada, Bengali, Marathi, Urdu, Gujarati, and more.  

---

## ☁️ Weather Intelligence & Advisory Agent  

The platform includes a **dedicated weather intelligence agent** that provides **location-aware weather insights and crop advisories** through a structured, multi-agent workflow.

### **How the Weather Agent Works**

- **Query Analysis Agent**  
  Interprets the farmer’s weather-related request (via voice, text, or contextual input) to extract **location**, **time range**, and relevant **crop context**.

- **Weather Data Retrieval Agent**  
  Uses the extracted parameters to perform **API calls to external weather services**, retrieving localized data such as **temperature, rainfall, humidity, and extreme weather indicators**.

- **Insight & Visualization Agent**  
  Processes raw weather data to generate **farmer-friendly insights**, and conditionally produces **visualizations (e.g., rainfall or temperature trends)** using Plotly when graphical representation is required.

### **Farmer-Focused Output**

- Provides **actionable advisories** for irrigation planning, harvesting windows, and weather risk mitigation.
- Delivers responses in the **farmer’s selected regional language** for accessibility and clarity.
- Seamlessly integrates weather insights with **crop advisories and market prediction context**.

This agent-based design ensures **accurate interpretation, reliable data retrieval, and clear communication**, enabling informed, location-specific agricultural decisions.

---

## 🛠️ Tech Stack  

| Layer         | Technologies |
|---------------|--------------|
| **Frontend**  | React.js (JSX), HTML5, CSS3, JavaScript, TypeScript |
| **Backend**   | Python, Flask, Node.js, REST APIs, dotenv, SQL |
| **ML / AI**   | PyTorch (Market Price Model), OpenAI Whisper (Speech-to-Text), Qwen-VL (Vision-Language), OpenRouter (LLM Orchestration) |
| **Others**    | Joblib (Model Persistence), Pillow (Image Processing), Flask-CORS, Requests, Multilingual UI/UX |

---

## 🤖 AI Agent Architecture  

- **OpenRouter** → Orchestrates agent calls across text, vision, and voice.  
- **Whisper** → Converts **regional speech → text**.  
- **Qwen-VL** → **Vision-language AI** for plant disease & pest detection.  
- **PyTorch Models** → Predicts **next-day market prices** for crops.  
- **Location-Aware Logic** → AI uses **district, crop type, and language** for context-aware replies.  

---

## 🏗️ System Flow  

Farmer (Voice / Text / Image)
↓
AI Agent (OpenRouter + Whisper + Qwen-VL + PyTorch)
↓
├─ Market Price Prediction
├─ Plant Disease Detection
├─ Government Scheme Updates
├─ Weather Intelligence & Advisories
↓
Response (Text + Audio in Farmer’s Language)

yaml
Copy code

---

## 🚀 How to Run Locally

1. **Clone the Repository**

git clone https://github.com/your-username/farmer-ai-assistant.git
cd farmer-ai-assistant
Backend (Flask / Python)


cd backend
python -m venv venv
venv\Scripts\activate   # Windows
# or source venv/bin/activate (Linux/Mac)
pip install -r requirements.txt
python app.py
Frontend (React / Expo)


cd frontend
npm install
npx expo start
Open via Expo Go app or at http://localhost:3000.

🧑‍🌾 Market Prediction Demo
Navigate to Market Prediction

Enter Crop, State, and recent prices

Tap Get Prediction
→ View projected price, best mandi suggestions, and region-specific advice.

🌍 Languages Supported
All 23 official Indian languages, enabling inclusive access for farmers across regions.

📡 Planned Upgrades
Live API integration for real-time crop and market data

Offline support for low-connectivity regions

Community forums and expert Q&A

Advanced agentic reasoning for multi-turn conversations

📸 Screenshots & Visual Insights
See how the application supports Indian farmers:

AI Disease Detector Demo: https://youtu.be/wnN4rh_y_VE

(Images retained as provided)

📃 License
Open-source under the MIT License

Empowering Indian farmers with AI-driven, inclusive solutions—one language, one region, one question at a time. 🇮🇳🌾
