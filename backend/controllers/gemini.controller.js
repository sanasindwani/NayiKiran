

import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent";
const API_KEY = process.env.GEMINI_API_KEY;



const formatResponse = (text) => {
    return text
        .replace(/\\/g, '') // Remove unnecessary backslashes
        .replace(/\*/g, '') // Remove asterisks
    
        .replace(/\n\s*/g, (match) => match.trim() ? '\n• ' : '\n'); // Add bullet points for valid points
};



const askGemini = async (req, res) => {
    try {
        const apiKeyToUse = process.env.GEMINI_API_KEY;
        const { userMessage, conversationHistory = [] } = req.body;  // Get conversation history from request body
        const therapyPrompt = "Provide a concise response in 3-5 short points . Keep it simple and clear. Use a numbered list format. Provide emotional support and guidance: " + userMessage +"give points first in hindi then in english language";

        // Append the new message to the conversation history
        const newConversationHistory = [...conversationHistory, { role: "user", text: therapyPrompt }];

        // Make the API call
        const response = await axios.post(
            `${GEMINI_API_URL}?key=${apiKeyToUse}`,
            {
                contents: newConversationHistory.map(message => ({ role: message.role === "assistant" ? "model" : message.role, parts: [{ text: message.text }] }))
            }
        );

        if (response.data.candidates && response.data.candidates.length > 0) {
            const rawText = response.data.candidates[0].content.parts[0].text;
            const formattedText = "• " + formatResponse(rawText); // Add bullet point to the first line
            
            // Add the response from Gemini to the conversation history
            newConversationHistory.push({ role: "assistant", text: formattedText });
            
            // Send the response and the updated conversation history
            res.json({ reply: formattedText, conversationHistory: newConversationHistory });
        } else {
            res.json({ reply: "No meaningful response received from Gemini.", conversationHistory: newConversationHistory });
        }
    } catch (error) {
        console.error("API KEY loaded properly:", !!process.env.GEMINI_API_KEY);
        console.error("Axios Error response:", error.response?.data || error.message);
        
        let details = "Error communicating with Gemini API";
        if (error.response && error.response.data && error.response.data.error) {
            details = error.response.data.error.message || JSON.stringify(error.response.data);
        }
        res.status(500).json({ error: "Error communicating with Gemini API", details });
    }
};

export default askGemini;









