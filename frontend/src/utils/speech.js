// Text-to-Speech utility
export function speak(text, lang = 'en-IN') {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Stop any ongoing speech
    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  } else {
    alert('Text-to-speech not supported in this browser.');
  }
}

// Speech-to-Text utility
export function startListening(onResult, lang = 'en-IN') {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert('Speech recognition not supported in this browser.');
    return;
  }
  const recognition = new SpeechRecognition();
  recognition.lang = lang;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };
  recognition.start();
  return recognition;
}
