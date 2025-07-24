# 🌾 Farmer AI Assistant — Multilingual Smart Agriculture Platform 🇮🇳

An **inclusive, AI-powered mobile and web application** empowering Indian farmers to detect plant diseases, access real-time market and weather insights, and stay updated on government schemes—all through images, voice, text, and rich multimedia. **Available in 23 official Indian languages**, the platform is under active development for scalability and innovative features.

---

## 🚀 Key Features

- ✅ **Plant Disease Detection** via image uploads or real-time camera (mobile & web).
- ✅ **Voice-enabled Queries** using OpenAI Whisper for speech-to-text in regional languages.
- ✅ **Vision-Language AI (Qwen-VL)** for instant, detailed crop health assessment in the farmer's chosen language.
- ✅ **Market Price Prediction** tailored to specific crops, locations, and seasons.
- ✅ **Real-Time Weather Alerts** powered by AI for hyperlocal smart farming decisions.
- ✅ **Government Schemes Dashboard** — Up-to-date info on policies, subsidies, and programs.
- ✅ **Agriculture News Feed** — Curated daily news, updates, and essential coverage.
- ✅ **[NEW] Inclusive Multilingual UI** — Seamless navigation in all 23 Indian languages, optimized for rural usability.

---

## 🛠️ Tech Stack

| Area        | Technologies                                                                 |
|-------------|------------------------------------------------------------------------------|
| **Frontend**| **React Native** (Expo Go), React.js, HTML5/CSS3, JavaScript, React Webcam   |
| **Backend** | **Python**, **Flask**, Node.js, REST APIs, PyTorc                            |
| **AI/ML**   | **OpenAI Whisper** (Speech-to-Text), Qwen 2.5 Vision-Language (via OpenRouter), ElevenLabs (Text-to-Speech)<br>Future: Market Price Prediction, Weather AI Agent |
| **Other**   | dotenv (Secrets Management), Pillow (Image Processing), Flask-CORS (CORS), Requests, Full Multilingual Support  |

---

## 🔗 AI Agent Integrations

- **OpenRouter** — Connects all vision-language and conversational AI for agricultural analysis.
- **Whisper (OpenAI)** — Powers robust multilingual speech-to-text for local dialects and accents.
- **ElevenLabs** — Delivers natural, regional-language voice feedback via advanced text-to-speech.

---

## 🏗️ System Architecture

> React Native (Expo Go) & React.js frontend ⇆ Flask/Node.js backend ⇆ AI agents (OpenRouter, Whisper, ElevenLabs, custom inference models)  
> All systems support **multilingual workflows and regional content delivery**.

---

## 🚀 How to Run Locally

git clone https://github.com/your-username/farmer-ai-assistant.git
cd farmer-ai-assistant

text

### Backend (Python/Flask)
cd backend
python -m venv venv

For Windows:
venv\Scripts\activate

For macOS/Linux:
source venv/bin/activate
pip install -r requirements.txt
python app.py

text

### Frontend (React Native/Expo Go)
cd frontend
npm install
npx expo start

text
- Scan the QR code in Expo Go app (iOS/Android) or open the web version at [http://localhost:3000](http://localhost:3000/)

---

## 🌍 Supported Languages

🇮🇳 Supports **all 23 official Indian languages** including Hindi, Tamil, Telugu, Kannada, Malayalam, Bengali, Marathi, Punjabi, Gujarati, Assamese, Odia, Urdu, and more.

---

## 📷 Insights

_**Here is a quick video insight of what the AI Agent for plant pest-dosease detection and solutions that is compactible and usuable to almost all Indian Lamguages is shown in this video. Stay tuned for more such insights**

https://youtu.be/wnN4rh_y_VE?feature=shared

_**App is under active development—screenshots and production preview will be available soon, however we will.keep updating with more insights, as of now starting with the AI Agent.**

---

## 📡 Planned Features

- 🌾 **Offline Mode** for remote, low-connectivity regions.
- 🌦️ **Smart AI Crop Advisory** (weather, soil, and crop analysis).
- 🎥 **Interactive Community Forums & Video Q&A** with agritech experts.
- 🛡️ **Advanced Security & Privacy** features for user protection.

---

## 📃 License

Open-source under [MIT License](LICENSE).

> _Empowering Indian Farmers with AI, One Language at a Time!_ 🇮🇳🌾

---
_Last updated: Tuesday, July 22, 2025_
