


// import { useState } from "react";
// import { askGemini } from "../utils/api";
// import { FaPaperPlane } from "react-icons/fa";

// const Chat = () => {
//     const [message, setMessage] = useState("");
//     const [conversation, setConversation] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const sendMessage = async () => {
//         if (message.trim() === "") return;
//         setLoading(true);

//         const reply = await askGemini(message);

//         setConversation([...conversation, { role: "user", text: message }, { role: "assistant", text: formatResponse(reply) }]);
//         setMessage("");
//         setLoading(false);
//     };

//     // Function to format Gemini's response properly with line breaks and bullet points
//     const formatResponse = (text) => {
//         return text
//             .split(/\d+\./) // Splitting numbered points
//             .filter(Boolean) // Remove empty elements
//             .map((point) => point.trim()) // Trim spaces
//             .join("\n• "); // Add bullet points and line breaks
//     };

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-pink-200 w-full p-6">
//             <div className="card w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden">
//                 <h2 className="text-xl font-bold text-center py-4 text-purple-700">💬 Mano Sathi</h2>

//                 <div className="h-96 overflow-y-auto p-4 space-y-3 bg-purple-50 rounded-lg shadow-inner">
//                     {conversation.map((msg, index) => (
//                         <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
//                             <div className={`p-3 rounded-lg max-w-[75%] whitespace-pre-line shadow-md ${
//                                 msg.role === "user" ? "bg-purple-300 text-white" : "bg-pink-200 text-gray-800"
//                             }`}>
//                                 {msg.text}
//                             </div>
//                         </div>
//                     ))}
//                     {loading && (
//                         <div className="flex justify-start">
//                             <div className="p-3 rounded-lg max-w-[75%] bg-pink-200 text-gray-800 shadow-md animate-pulse">
//                                 Typing...
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 <div className="p-4 flex items-center">
//                     <textarea
//                         className="textarea textarea-bordered w-full rounded-lg border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
//                         value={message}
//                         onChange={(e) => setMessage(e.target.value)}
//                         placeholder="Type your question..."
//                         rows="2"
//                     />
//                     <button 
//                         className="ml-3 bg-purple-500 text-white p-3 rounded-lg shadow-md hover:bg-purple-600 transition duration-300 flex items-center"
//                         onClick={sendMessage} 
//                         disabled={!message.trim()}
//                     >
//                         <FaPaperPlane className="mr-1" /> Send
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Chat;






// import { useState, useEffect, useRef } from "react";
// import { askGemini } from "../utils/api";
// import { FaPaperPlane } from "react-icons/fa";
// import Navbar from "../components/Navbar";

// import { FontLoader } from "three/examples/jsm/loaders/FontLoader";


// const Chat = () => {
//     const [message, setMessage] = useState("");
//     const [conversation, setConversation] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const sendMessage = async () => {
//         if (message.trim() === "") return;
//         setLoading(true);

//         const reply = await askGemini(message);

//         setConversation([...conversation, { role: "user", text: message }, { role: "assistant", text: formatResponse(reply) }]);
//         setMessage("");
//         setLoading(false);
//     };

//     // Function to format Gemini's response properly with line breaks and bullet points
//     const formatResponse = (text) => {
//         return text
//             .split(/\d+\./) // Splitting numbered points
//             .filter(Boolean) // Remove empty elements
//             .map((point) => point.trim()) // Trim spaces
//             .join("\n• "); // Add bullet points and line breaks
//     };

//     // Loading the font
//     const fontRef = useRef(null);
//     const [font, setFont] = useState(null);

//     useEffect(() => {
//         const loader = new FontLoader();
//         loader.load("/path/to/font.json", (loadedFont) => {
//             setFont(loadedFont);
//         });
//     }, []);

//     return (
//         <div className="relative z-0 bg-gradient-to-br from-purple-200 via-pink-100 to-pink-200 min-h-screen flex flex-col">
//             {/* Navbar */}
//             <div className="bg-pink-100">
//                 <Navbar />
//             </div>

//             {/* Main Content */}
//             <div className="flex-grow flex justify-center items-center px-6 py-12">
//                 <div className="card w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden p-6">

//                     {/* 3D Title with Three.js */}
//                     <h2 className="text-xl font-bold text-center py-4 text-purple-700">
//                         💬 Mano Sathi
//                     </h2>


//                     <div className="h-96 overflow-y-auto p-4 space-y-3 bg-purple-50 rounded-lg shadow-inner">
//                         {conversation.map((msg, index) => (
//                             <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
//                                 <div className={`p-3 rounded-lg max-w-[75%] whitespace-pre-line shadow-md ${msg.role === "user" ? "bg-purple-300 text-white" : "bg-pink-200 text-gray-800"}`}>
//                                     {msg.text}
//                                 </div>
//                             </div>
//                         ))}
//                         {loading && (
//                             <div className="flex justify-start">
//                                 <div className="p-3 rounded-lg max-w-[75%] bg-pink-200 text-gray-800 shadow-md animate-pulse">
//                                     Typing...
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     <div className="p-4 flex items-center">
//                         <textarea
//                             className="textarea textarea-bordered w-full rounded-lg border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
//                             value={message}
//                             onChange={(e) => setMessage(e.target.value)}
//                             placeholder="Type your question..."
//                             rows="2"
//                         />
//                         <button 
//                             className="ml-3 bg-purple-500 text-white p-3 rounded-lg shadow-md hover:bg-purple-600 transition duration-300 flex items-center"
//                             onClick={sendMessage} 
//                             disabled={!message.trim()}
//                         >
//                             <FaPaperPlane className="mr-1" /> Send
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Chat;





import { useState, useEffect, useRef } from "react";
import { speak, startListening } from "../utils/speech";
import { askGemini } from "../utils/api";
import { FaPaperPlane } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([{ role: "assistant", text: "You are stronger than you think! Need support? 💪" }]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (message.trim() === "") return;
    setLoading(true);

    const reply = await askGemini(message);

    setConversation([
      ...conversation,
      { role: "user", text: message },
      { role: "assistant", text: formatResponse(reply) },
    ]);
    setMessage("");
    setLoading(false);
  };

  // Function to format Gemini's response with bullet points
  const formatResponse = (text) => {
    return text
      .split(/\d+\./) // Splitting numbered points
      .filter(Boolean) // Remove empty elements
      .map((point) => point.trim()) // Trim spaces
      .join("\n• "); // Add bullet points
  };



  return (
    <div className="relative z-0 bg-pink-100 min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="bg-pink-100">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center px-6 py-12">
        <motion.div
          className="card w-full max-w-3xl bg-white shadow-2xl rounded-lg overflow-hidden p-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
        >
          {/* 3D Title with Three.js */}
          <motion.h2
            className="text-3xl font-extrabold text-center py-4 text-pink-700"
            whileHover={{ scale: 1.1, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            🤖 Mano Sathi
          </motion.h2>

          {/* Conversation Area */}
          <div className="h-96 overflow-y-auto p-4 space-y-3 bg-gradient-to-r from-purple-50 via-pink-50 to-purple-100 rounded-lg shadow-inner">
            {conversation.map((msg, index) => (
              <motion.div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`p-3 rounded-lg max-w-[75%] whitespace-pre-line shadow-lg ${msg.role === "user" ? "bg-purple-300 text-white" : "bg-green-100 text-gray-800"
                    }`}
                >
                  {msg.text}
                  {msg.role === "assistant" && (
                    <button
                      className="ml-2 text-purple-700 hover:text-purple-900 text-xl align-middle"
                      onClick={() => speak(msg.text, 'en-IN')}
                      aria-label="Listen to response"
                    >
                      🔊
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
            {loading && (
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-3 rounded-lg max-w-[75%] bg-pink-200 text-gray-800 shadow-md animate-pulse">
                  Typing...
                </div>
              </motion.div>
            )}
          </div>

          {/* Input Section */}
          <div className="p-4 flex items-center">
            <textarea
              className="textarea textarea-bordered w-full rounded-lg border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your question..."
              rows="2"
            />
            <button
              className="ml-2 bg-green-500 text-white p-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300 flex items-center"
              onClick={() => startListening(setMessage, 'en-IN')}
              aria-label="Speak your question"
            >
              🎤
            </button>
            <motion.button
              className="ml-2 bg-purple-500 text-white p-3 rounded-lg shadow-md hover:bg-purple-600 transition duration-300 flex items-center"
              onClick={sendMessage}
              disabled={!message.trim()}
              whileTap={{ scale: 0.95 }}
            >
              <FaPaperPlane className="mr-1" /> Send
            </motion.button>
          </div>
        </motion.div>
      </div>
      <div className="w-full relative z-0">
        <Footer />
      </div>
    </div>
  );
};

export default Chat;

