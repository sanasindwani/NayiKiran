import { useState, useEffect, useRef } from "react";
import { speak, startListening } from "../utils/speech";
import { FaPaperPlane } from "react-icons/fa";

import { motion } from "framer-motion";

import { askRights } from "../utils/apright.js"; // Importing askRights function from apiRight.js

const Chat = () => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([{ role: "assistant", text: "Confused about your rights? I can help! ⚖️" }]);
  const [loading, setLoading] = useState(false);

  // Function to send message and get response from the API
  const sendMessage = async () => {
    if (message.trim() === "") return;
    setLoading(true);

    try {
      // Send the message to the backend API using askRights
      const reply = await askRights(message);

      setConversation([
        ...conversation,
        { role: "user", text: message },
        { role: "assistant", text: formatResponse(reply) },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setConversation([
        ...conversation,
        { role: "assistant", text: "Sorry, something went wrong. Please try again later." },
      ]);
    } finally {
      setMessage("");
      setLoading(false);
    }
  };

  // Function to format the response text
  const formatResponse = (text) => {
    return text
      .split(/\d+\./) // Split numbered points
      .filter(Boolean) // Remove empty elements
      .map((point) => point.trim()) // Trim spaces
      .join("\n• "); // Add bullet points
  };

  return (



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
        📜 Nyaya Sathi
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



  );
};

export default Chat;
