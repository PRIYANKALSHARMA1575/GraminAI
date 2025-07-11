from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import base64
import requests
import whisper
import tempfile
from google.cloud import texttospeech
from flask import send_file
import io

# --- Configuration Loading ---
load_dotenv()
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000") # Default for local dev.

# === FIX 1 & 2: Set Google Credentials Path Correctly and Early ===
# Construct the absolute path to the credentials file based on this script's location
# This is more robust than a relative path.
basedir = os.path.abspath(os.path.dirname(__file__))
google_credentials_path = os.path.join(basedir, 'google-credentials.json')
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = google_credentials_path

# --- App Initialization ---
app = Flask(__name__)
CORS(app, origins=[FRONTEND_URL])

# --- Model Loading ---
print("Loading Whisper model...")
whisper_model = whisper.load_model("base")
print("Whisper model loaded.")


@app.route('/analyze', methods=['POST'])
def analyze():
    # ... (This entire function is perfect, no changes needed here) ...
    # --- 1. Validate Input ---
    if 'image' not in request.files:
        return jsonify({"error": "Image is required"}), 400

    # --- 2. Extract Data from Request ---
    image = request.files['image']
    prompt = request.form.get('prompt', '').strip()
    language = request.form.get('language', 'en')  # Default to English

    # --- 3. Handle Audio Transcription (if necessary) ---
    if not prompt and 'audio' in request.files:
        audio_file = request.files['audio']
        audio_path = None  # Initialize to ensure it exists for the finally block
        try:
            # Create a temporary file to save the audio
            with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as tmp:
                audio_path = tmp.name
                audio_file.save(audio_path)
            
            # Transcribe the audio using Whisper
            result = whisper_model.transcribe(audio_path, language=language)
            prompt = result['text']
        except Exception as e:
            # Log the detailed error for debugging
            print(f"Audio transcription failed: {str(e)}")
            return jsonify({"error": "Could not understand the audio. Please try again."}), 500
        finally:
            # **Robust File Cleanup**
            if audio_path and os.path.exists(audio_path):
                os.remove(audio_path)

    # If after trying to transcribe, there's still no prompt, use a default one.
    if not prompt:
        prompt = "Describe this image in detail."

    # --- 4. Prepare Data for AI Model ---
    language_map = {
        "hi": "Hindi", "en": "English", "ta": "Tamil", "te": "Telugu",
        "bn": "Bengali", "gu": "Gujarati", "kn": "Kannada", "ml": "Malayalam",
        "mr": "Marathi", "pa": "Punjabi", "ur": "Urdu", "or": "Odia"
    }
    language_name = language_map.get(language, "English")

    system_prompt = (
        f"You are AgriHelper, an expert AI assistant for Indian farmers. "
        f"Analyze the provided plant image and the user's question. "
        f"Provide a clear, concise, and helpful answer. "
        f"The user is asking their question in {language_name}. You MUST respond in {language_name}."
    )

    # Encode image to base64
    image_bytes = image.read()
    mime_type = image.mimetype
    base64_image = base64.b64encode(image_bytes).decode("utf-8")

    # --- 5. Call the OpenRouter API ---
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": FRONTEND_URL,
        "X-Title": "Farmer Assistant"
    }

    data = {
        "model": "qwen/qwen2.5-vl-32b-instruct:free",
        "messages": [
            {"role": "system", "content": system_prompt},
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:{mime_type};base64,{base64_image}"
                        }
                    }
                ]
            }
        ]
    }

    try:
        response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=data)
        response.raise_for_status() 
        result = response.json()
        reply = result["choices"][0]["message"]["content"]
        return jsonify({"response": reply, "transcribed_prompt": prompt})

    except requests.exceptions.RequestException as e:
        status_code = e.response.status_code if e.response is not None else 500
        try:
            error_details = e.response.json()
            error_message = error_details.get("error", {}).get("message", "An unknown API error occurred.")
        except (ValueError, AttributeError):
            error_message = e.response.text if e.response is not None else "Network error."
        
        print(f"API Error: Status {status_code}, Body: {error_message}")
        return jsonify({"error": f"Analysis failed. The server said: {error_message}"}), status_code

# ELEVENLABS_API_KEY=your_key_here
ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY")

# This dictionary maps our app's language codes to ElevenLabs' voice IDs.
# You can find more voice IDs on the ElevenLabs website in the 'Voice Lab'.
# I've selected some good ones for Indian languages.
ELEVENLABS_VOICE_IDS = {
    "en": "21m00Tcm4TlvDq8ikWAM",  # Rachel (calm)
    "hi": "FiIgWdzVKAalJyAgg8Pg",  # Multilingual v2 Model - Good for Hindi
    "ta": "Z0ocGS7BSRxFSMhV00nB",  # Multilingual v2 Model
    # "te": "29vD33N1CtxCmqQRPO9k",  # Multilingual v2 Model
    # "bn": "29vD33N1CtxCmqQRPO9k",  # Multilingual v2 Model
    # "gu": "29vD33N1CtxCmqQRPO9k",  # Multilingual v2 Model
    # "kn": "29vD33N1CtxCmqQRPO9k",  # Multilingual v2 Model
    # "ml": "29vD33N1CtxCmqQRPO9k",  # Multilingual v2 Model
    # "mr": "29vD33N1CtxCmqQRPO9k",  # Multilingual v2 Model
}

@app.route('/text-to-speech', methods=['POST'])
def text_to_speech_conversion():
    # Get the text and language from the frontend request
    data = request.get_json()
    text_to_speak = data.get('text')
    language = data.get('language')

    if not text_to_speak or not language or not ELEVENLABS_API_KEY:
        return jsonify({"error": "Text, language, and API key are required"}), 400

    # Get the correct voice ID for the selected language
    voice_id = ELEVENLABS_VOICE_IDS.get(language, ELEVENLABS_VOICE_IDS["en"]) # Default to English

    # --- ElevenLabs API Call ---
    tts_url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"

    headers = {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": ELEVENLABS_API_KEY
    }

    payload = {
        "text": text_to_speak,
        "model_id": "eleven_multilingual_v2", # This model supports multiple languages
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.75
        }
    }

    try:
        response = requests.post(tts_url, json=payload, headers=headers)
        response.raise_for_status() # Raise an exception for bad status codes

        # Stream the audio response back to the frontend
        return send_file(
            io.BytesIO(response.content),
            mimetype='audio/mpeg',
            as_attachment=False
        )

    except requests.exceptions.RequestException as e:
        status_code = e.response.status_code if e.response is not None else 500
        print(f"ElevenLabs TTS Error: Status {status_code}, Response: {e.response.text if e.response is not None else 'N/A'}")
        return jsonify({"error": f"Failed to generate speech. The service said: {e.response.text}"}), status_code

if __name__ == '__main__':
    app.run(debug=True)