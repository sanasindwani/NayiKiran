import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { askGemini } from "../utils/api";
import { motion } from "framer-motion";

const VoiceAssistant = () => {
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "hi-IN"; // Prioritize Hindi
      recognition.continuous = false; // We'll restart it manually if we want continuous, or let it single-shot
      recognition.interimResults = false;

      recognition.onstart = () => {
        setListening(true);
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognition.onresult = async (event) => {
        const text = event.results[0][0].transcript.toLowerCase();
        console.log("Voice Assistant heard:", text);
        handleVoiceCommand(text);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [navigate]);

  const speak = (text) => {
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "hi-IN";
    
    // Try to find a Hindi female voice
    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find(voice => voice.lang.includes("hi-IN") || voice.lang.includes("hi"));
    if (hindiVoice) {
      speech.voice = hindiVoice;
    }
    
    window.speechSynthesis.speak(speech);
  };

  const handleVoiceCommand = async (text) => {
    if (text.includes("पैसे") || text.includes("काम") || text.includes("job") || text.includes("कमाना")) {
      speak("मैं आपको काम और कमाई के विकल्प दिखा रही हूँ");
      navigate("/job-discovery");
    } else if (text.includes("बैंक") || text.includes("खाता") || text.includes("finance")) {
      speak("मैं आपको बैंक खाता और पैसों की जानकारी पर ले जा रही हूँ");
      navigate("/skill");
    } else if (text.includes("स्वास्थ्य") || text.includes("health")) {
      speak("यह स्वास्थ्य और सुरक्षा जानकारी है");
      navigate("/skill");
    } else if (text.includes("मदद") || text.includes("बचाओ") || text.includes("खतरा") || text.includes("emergency")) {
      speak("आप सुरक्षित रहें, मैं आपके लिए सहायता खोल रही हूँ");
      navigate("/chat");
    } else if (text.includes("कानून") || text.includes("हक") || text.includes("legal")) {
      speak("मैं कानूनी हकों की जानकारी खोल रही हूँ");
      navigate("/legal");
    } else if (text.includes("बच्चे") || text.includes("child")) {
      speak("यह बच्चों की सुरक्षा और पढ़ाई की जानकारी है");
      navigate("/childcare-protection");
    } else if (text.includes("वेबसाइट") || text.includes("website") || text.includes("नयी किरण") || text.includes("nayi kiran")) {
      speak("यह नयी किरण है। यहाँ आप अपने कानूनी अधिकारों की जानकारी पा सकती हैं, काम और पैसे कमाने के तरीके सीख सकती हैं, और बच्चों की सुरक्षा के लिए मदद ले सकती हैं। मैं आपकी हर कदम पर मदद करूँगी।");
    } else {
      // Fallback to Chatbot for random queries
      speak("मैं आपके सवाल का जवाब देने के लिए हमारा चैटबॉट खोल रही हूँ। आप वहां बात कर सकती हैं!");
      navigate("/chat");
    }
  };

  const toggleListening = () => {
    if (listening) {
      recognitionRef.current?.stop();
    } else {
      // Small intro sound before we listen ideally, but we can speak a prompt
      window.speechSynthesis.cancel();
      recognitionRef.current?.start();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center">
      {loading && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 bg-pink-100 text-pink-800 px-3 py-1 rounded-lg shadow-md text-sm font-semibold"
        >
          सोच रही हूँ... (Thinking...)
        </motion.div>
      )}
      
      {listening && !loading && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 bg-red-100 text-red-800 px-3 py-1 rounded-lg shadow-md text-sm font-semibold animate-pulse"
        >
          सुन रही हूँ... (Listening...)
        </motion.div>
      )}

      <button
        onClick={toggleListening}
        className={`p-4 rounded-full shadow-2xl transition-all duration-300 ${
          listening ? 'bg-red-500 scale-110' : 'bg-pink-600 hover:bg-pink-700 hover:scale-105'
        }`}
      >
        <span className="text-white text-3xl">🎤</span>
      </button>
    </div>
  );
};

export default VoiceAssistant;
