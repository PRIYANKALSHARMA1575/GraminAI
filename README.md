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

- **☁️ Weather & Advisory Insights**  
  AI-powered **localized weather tracking** and **farming practice recommendations** help farmers plan efficiently.  

- **🌍 Multilingual Support**  
  Supports **all 23 Indian languages**, including Hindi, Tamil, Telugu, Kannada, Bengali, Marathi, Urdu, Gujarati, and more.  

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


  Farmer[👩‍🌾 Farmer Input (Voice/Text/Image)] 
  --> Agent[🤖 AI Agent (OpenRouter + Whisper + Qwen-VL + PyTorch)]
  Agent --> Market[📈 Market Price Prediction]
  Agent --> Disease[🌾 Plant Disease Detection]
  Agent --> Schemes[🏛️ Govt Schemes Updates]
  Agent --> Weather[☁️ Weather & Crop Advisories]
  Agent --> Response[🔊 Reply in Farmer’s Language (Text + Audio)]

---

## 🚀 How to Run Locally

1. **Clone the Repository**
git clone https://github.com/your-username/farmer-ai-assistant.git
cd farmer-ai-assistant

text

2. **Backend (Flask/Python)**
cd backend
python -m venv venv

Activate:
venv\Scripts\activate # (Windows) OR source venv/bin/activate (Linux/Mac)
pip install -r requirements.txt
python app.py

text

3. **Frontend (React Native/Expo)**
cd frontend
npm install
npx expo start

text
Open with Expo Go app or on web (`http://localhost:3000`).

---

## 🧑‍🌾 Market Prediction Demo

1. **Navigate to the "Market Prediction" tab**
2. **Enter Crop, State**, and **recent prices** (today, last week, last month, last year)
3. **Tap "Get Prediction"**  
→ See tomorrow’s projected price, location-based advice, and best market options.

---

## 🌍 Languages Supported

India’s **23 official languages**—choose your regional language for all interactions and receive AI advisories the way you want.

---

## 📡 Planned Upgrades

- **Live API integration** for up-to-date crop and market data
- **Offline support** for rural connectivity
- **Community forums & video expert Q&A**
- **Advanced agentic reasoning for context-rich conversations**

---
## 📸 Screenshots & Visual Insights

See how the application would help the farmers of India:-

The AI Agent :- https://youtu.be/wnN4rh_y_VE

<img width="570" height="916" alt="Screenshot 2025-09-11 222604" src="https://github.com/user-attachments/assets/f43a5b29-c902-4e47-b078-7c5757d01c36" />

<img width="761" height="915" alt="Screenshot 2025-09-11 222301" src="https://github.com/user-attachments/assets/654ebdc9-c5a5-4020-a8a8-afda9b3ce53d" />

<img width="852" height="919" alt="Screenshot 2025-09-11 222252" src="https://github.com/user-attachments/assets/eaf095e9-6c41-423a-8004-393491ada8d0" />

<img width="348" height="400" alt="image" src="https://github.com/user-attachments/assets/475e0651-4070-4adc-9d2f-39296b91dedf" />

<img width="691" height="632" alt="image" src="https://github.com/user-attachments/assets/74944448-0a28-4c44-a5b0-9bfdcfb0572c" />

<img width="772" height="909" alt="image" src="https://github.com/user-attachments/assets/fc061440-995c-4b3b-8036-f67c0f7b914d" />

<img width="1403" height="533" alt="image" src="https://github.com/user-attachments/assets/08c9e9b3-5621-4eb7-88c3-b0bc891f6b49" />

## 📃 License

Open-source under [MIT License](LICENSE)

> _Empowering Indian farmers with AI-driven, inclusive solutions—one language, one region, one question at a time._ 🇮🇳🌾

---
