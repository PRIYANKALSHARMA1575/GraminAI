
import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import LoadingSpinner from "../components/LoadingSpinner"; // Add this line
import "./PestDetection.css";



export default function PestDetection() {
  // --- STATE MANAGEMENT ---
  const [step, setStep] = useState('select_image');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [audioBlob, setAudioBlob] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [language, setLanguage] = useState("hi");
  const [error, setError] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  // --- REFS ---
  const mediaRecorderRef = useRef(null);
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);
  const audioPlayerRef = useRef(null);

  // --- FUNCTIONS ---
  const handleReset = () => {
    if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current = null;
    }
    setStep('select_image');
    setImageFile(null);
    setImagePreview(null);
    setPrompt("");
    setResponse("");
    setAudioBlob(null);
    setIsRecording(false);
    setError("");
    setIsSpeaking(false);
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setStep('give_prompt');
    }
  };

  const capturePhoto = useCallback(() => {
    const screenshot = webcamRef.current.getScreenshot();
    if (screenshot) {
      setImagePreview(screenshot);
      fetch(screenshot)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "captured_image.jpg", { type: "image/jpeg" });
          setImageFile(file);
          setStep('give_prompt');
        });
    }
  }, [webcamRef]);

  const handleStartRecording = async () => {
    setAudioBlob(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const audioChunks = [];
      mediaRecorder.ondataavailable = (event) => audioChunks.push(event.data);
      mediaRecorder.onstop = () => {
        const newAudioBlob = new Blob(audioChunks, { type: "audio/webm" });
        setAudioBlob(newAudioBlob);
        stream.getTracks().forEach(track => track.stop());
      };
      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setError("Could not access the microphone. Please check permissions.");
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playAudioResponse = async (text) => {
    if (!text || isSpeaking) return;
    setIsSpeaking(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5173/pest-disease/text-to-speech", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text, language: language }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Server failed to generate audio.");
      }
      const audioBlob = await res.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioPlayerRef.current = audio;
      audio.onended = () => setIsSpeaking(false);
      audio.play();
    } catch (err) {
      console.error("Failed to play audio response:", err);
      setError(`Could not play audio: ${err.message}`);
      setIsSpeaking(false);
    }
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      setError("Please select an image first.");
      return;
    }
    setStep('loading');
    setError("");
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("language", language);
    if (audioBlob) {
      formData.append("audio", audioBlob, "voice.webm");
    } else {
      formData.append("prompt", prompt);
    }
    try {
      const res = await fetch("http://localhost:5173/pest-disease/analyze", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setResponse(data.response);
        setStep('show_result');
        playAudioResponse(data.response);
      } else {
        throw new Error(data.error || "An unknown error occurred.");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
      setStep('give_prompt');
    }
  };

  // --- RENDER LOGIC ---
  return (
    <div className="app-container">
      <div className="header">
        <h1>🌾 Agri-Pest-Detector-Helper</h1>
        <select className="language-selector" value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="hi">हिंदी</option>
          <option value="en">English</option>
          <option value="ta">தமிழ்</option>
          <option value="te">తెలుగు</option>
          <option value="bn">বাংলা</option>
          <option value="gu">ગુજરાતી</option>
          <option value="kn">ಕನ್ನಡ</option>
          <option value="ml">മലയാളം</option>
          <option value="mr">मराठी</option>
        </select>
      </div>
      <div className="main-content">
        {step === 'select_image' && (
          <div className="step-container">
            <h2>1. Add a Photo</h2>
            <button className="big-button primary" onClick={() => setStep('capture_image')}>
              📷 Use Camera
            </button>
            <button className="big-button secondary" onClick={() => fileInputRef.current.click()}>
              ⬆️ Upload from Phone
            </button>
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={handleImageFileChange} />
          </div>
        )}

        {step === 'capture_image' && (
          <div className="step-container">
            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="webcam-view" />
            <button className="big-button capture-button" onClick={capturePhoto}>📸 Capture</button>
            <button className="small-button" onClick={() => setStep('select_image')}>Cancel</button>
          </div>
        )}

        {step === 'give_prompt' && (
          <div className="step-container">
            <img src={imagePreview} alt="Plant preview" className="image-preview" />
            <h2>2. Ask a Question</h2>
            {error && <p className="error-message">{error}</p>}
            <button className={`big-button record-button ${isRecording ? 'recording' : ''}`} onClick={isRecording ? handleStopRecording : handleStartRecording}>
              🎙️ {isRecording ? "Recording... (Tap to Stop)" : "Speak Now"}
            </button>
            <textarea className="text-prompt" placeholder="Or type here..." value={prompt} onChange={(e) => setPrompt(e.target.value)} />
            <button className="big-button primary submit-button" onClick={handleSubmit}>
              Get Answer
            </button>
            <button className="small-button" onClick={handleReset}>Start Over</button>
          </div>
        )}

        {step === 'loading' && (
          <div className="step-container">
            <LoadingSpinner />
            <h2>Analyzing... Please wait.</h2>
          </div>
        )}

        {step === 'show_result' && (
          <div className="step-container">
            <h2>Here is the answer:</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="response-box">
              <p>{response}</p>
            </div>
            <button
              className="big-button secondary"
              onClick={() => playAudioResponse(response)}
              disabled={isSpeaking}
            >
              🔊 {isSpeaking ? 'Playing...' : 'Listen Again'}
            </button>
            <button className="big-button primary" onClick={handleReset}>
              ➕ Ask New Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

