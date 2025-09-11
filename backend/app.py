from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import base64
import requests
import whisper
import tempfile
import io
from flask import send_file

# --- Configuration Loading ---
load_dotenv()
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

# --- App Initialization ---
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# --- Model Loading ---
print("Loading Whisper model...")
whisper_model = whisper.load_model("base")
print("Whisper model loaded.")


@app.route('/analyze', methods=['POST'])
def analyze():
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
        audio_path = None
        try:
            with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as tmp:
                audio_path = tmp.name
                audio_file.save(audio_path)
            
            result = whisper_model.transcribe(audio_path, language=language)
            prompt = result['text']
        except Exception as e:
            print(f"Audio transcription failed: {str(e)}")
            return jsonify({"error": "Could not understand the audio. Please try again."}), 500
        finally:
            if audio_path and os.path.exists(audio_path):
                os.remove(audio_path)

    if not prompt:
        # ### CHANGE: Updated default prompt for civic context
        prompt = "Analyze this image and identify the civic issue shown."

    # --- 4. Prepare Data for AI Model ---
    language_map = {
        "hi": "Hindi", "en": "English", "ta": "Tamil", "te": "Telugu",
        "bn": "Bengali", "gu": "Gujarati", "kn": "Kannada", "ml": "Malayalam",
        "mr": "Marathi", "pa": "Punjabi", "ur": "Urdu", "or": "Odia"
    }
    language_name = language_map.get(language, "English")

    # ### CHANGE: Finalized and corrected the system prompt for CivicAssist AI
    system_prompt = (
        f"You are CivicAssist AI, an expert agent designed for city administrators."
        f"Analyze the citizen's complaint (image, text, or voice) to identify the civic issue and its location."
        f"Using AI, prioritize the issue, detect fakes, merge duplicates, and determine the responsible department."
        f"Your response must be a structured resolution ticket ONLY, with no other conversational text."
        f"The user is asking in this language {language_name}. You MUST generate the ticket and show it in this language {language_name}."
        f"The ticket must strictly follow this format:\n"
        f"Complaint ID: [Generate a random ID like SRxxxx]\n"
        f"Location: [Identify location from the input]\n"
        f"Responsible Department: [Name the department, e.g., Public Works, Sanitation, Water Board]\n"
        f"Contact Person: [Generate a random Indian name and a random 10-digit phone number]"
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
        # ### CHANGE: Updated the title for API tracking
        "X-Title": "Civic Assistant" 
    }

    data = {
        # NOTE: qwen is a good free model. You could also try "openai/gpt-4o" for potentially better results.
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


# ### CHANGE: Cleaned up the voice ID dictionary. 
# You can find more voice IDs on the ElevenLabs website in the 'Voice Lab'.
ELEVENLABS_VOICE_IDS = {
    "en": "21m00Tcm4TlvDq8ikWAM",  # Rachel (calm)
    "hi": "FiIgWdzVKAalJyAgg8Pg",  # Multilingual v2 Model
    "ta": "Z0ocGS7BSRxFSMhV00nB",  # Multilingual v2 Model
    # Add more voice IDs for other languages as needed.
}

@app.route('/text-to-speech', methods=['POST'])
def text_to_speech_conversion():
    data = request.get_json()
    text_to_speak = data.get('text')
    language = data.get('language')

    if not text_to_speak or not language or not ELEVENLABS_API_KEY:
        return jsonify({"error": "Text, language, and API key are required"}), 400

    voice_id = ELEVENLABS_VOICE_IDS.get(language, ELEVENLABS_VOICE_IDS["en"])

    tts_url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
    headers = {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": ELEVENLABS_API_KEY
    }
    payload = {
        "text": text_to_speak,
        "model_id": "eleven_multilingual_v2",
        "voice_settings": { "stability": 0.5, "similarity_boost": 0.75 }
    }

    try:
        response = requests.post(tts_url, json=payload, headers=headers)
        response.raise_for_status()
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
    # Set host='0.0.0.0' to make the app accessible on your local network
    app.run(debug=True, host='0.0.0.0')