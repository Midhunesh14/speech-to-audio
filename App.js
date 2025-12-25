import { useEffect, useRef, useState } from "react";

function App() {
  const [text, setText] = useState("Your speech will appear here...");
  const [status, setStatus] = useState("Click Start and speak");
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    recognition.onstart = () => {
      setListening(true);
      setStatus("Listening...");
    };

    recognition.onend = () => {
      setListening(false);
      setStatus("Stopped");
    };

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setText(transcript);
    };

    recognitionRef.current = recognition;
  }, []);

  const startListening = () => {
    recognitionRef.current.start();
  };

  const stopListening = () => {
    recognitionRef.current.stop();
  };

  return (
    <div className="container">
      <div className="card">
        <h1>🎙️ Speech to Text</h1>
        <p className="status">{status}</p>

        <div className={`mic ${listening ? "active" : ""}`}>🎤</div>

        <div className="buttons">
          <button className="start" onClick={startListening}>
            Start
          </button>
          <button className="stop" onClick={stopListening}>
            Stop
          </button>
        </div>

        <div className="output">{text}</div>

        <footer>Real-time Speech Recognition</footer>
      </div>
    </div>
  );
}

export default App;
