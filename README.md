# 🌱 Farmer AI Assistant — Smart Multilingual Agriculture Platform 🇮🇳

An **AI-powered, multilingual mobile and web platform** enabling Indian farmers to detect plant diseases, access real-time market price predictions, get instant government scheme updates, and receive expert crop advisories—via images, voice, or text in 23 official Indian languages.

---

## ✨ Key Features

- **Market Price Prediction:**  
  AI/ML model (PyTorch) predicts tomorrow's crop prices using current, historical, and region-specific data—advising the best marketplace for each crop.

- **Plant Disease & Pest Detection:**  
  Image analysis powered by Vision-Language AI (Qwen-VL) identifies diseases and pests from photos or camera in natural language.

- **Voice, Image, Text Queries:**  
  Farmers can ask questions or report issues using speech (Whisper), pictures, or text—the AI agent understands all formats.

- **Real-Time Government Scheme Dashboard:**  
  Live updates on central and state government programs, subsidies, and agri-initiatives based on the farmer's location and crop.

- **Educational & Weather Insights:**  
  Alerts and recommendations for latest farming practices, plus localized weather-driven advisories.

- **Supports All 23 Indian Languages:**  
  User interface and agent replies in Hindi, Tamil, Telugu, Kannada, Bengali, Marathi, Urdu, and more.

---

## 🛠️ Tech Stack

| Layer         | Technologies                                                                      |
|---------------|-----------------------------------------------------------------------------------|
| **Frontend**  | React Native (Expo), React.js, HTML5, JavaScript, CSS3                            |
| **Backend**   | Python, Flask, Node.js, REST APIs, dotenv                                         |
| **ML/AI**     | PyTorch (Market Price Model), OpenAI Whisper (Speech-to-Text), Qwen-VL (Vision-Language), OpenRouter (LLM Orchestration) |
| **Others**    | Joblib (Model Persistence), Pillow (Image Processing), Flask-CORS, Requests, Multilingual UI/UX |

---

## 🤖 AI Agent Architecture

- **OpenRouter:** Coordinates voice, image, and text agent flows for flexible queries.
- **Whisper:** Converts regional speech to text—enabling hands-free, natural farmer queries.
- **Qwen-VL:** Vision-Language AI for image/classification and detailed plant health insights.
- **PyTorch ML Model:** Predicts next-day market prices by crop and location, based on real market and historical data.
- **Location & Input Awareness:** AI agent dynamically utilizes language, crop, and district info for tailored responses.

---

## 🏗️ System Flow

> Farmer (Voice/Text/Image in any language)  
> → AI Agent (understands via Whisper/Qwen-VL/OpenRouter)  
> → Predicts price, identifies diseases, finds relevant schemes  
> → Replies in farmer’s language, plus audio (via ElevenLabs, if needed)

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

<img width="348" height="400" alt="image" src="https://github.com/user-attachments/assets/475e0651-4070-4adc-9d2f-39296b91dedf" />

<img width="691" height="632" alt="image" src="https://github.com/user-attachments/assets/74944448-0a28-4c44-a5b0-9bfdcfb0572c" />

<img width="772" height="909" alt="image" src="https://github.com/user-attachments/assets/fc061440-995c-4b3b-8036-f67c0f7b914d" />

<img width="1403" height="533" alt="image" src="https://github.com/user-attachments/assets/08c9e9b3-5621-4eb7-88c3-b0bc891f6b49" />

(Stay tuned for moreinsights !!)

## 📃 License

Open-source under [MIT License](LICENSE)

> _Empowering Indian farmers with AI-driven, inclusive solutions—one language, one region, one question at a time._ 🇮🇳🌾

---

*Last updated: July 27, 2025. For questions or contributions, reach out via the Issues tab or your organization’s preferred contact.*
