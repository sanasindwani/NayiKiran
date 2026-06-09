import express from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
app.use(express.json());

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

app.post("/test-ask", async (req, res) => {
    try {
        const apiKeyToUse = process.env.GEMINI_API_KEY;
        const { userMessage, conversationHistory = [] } = req.body;
        const therapyPrompt = "Provide a concise response in 3-5 short points . Keep it simple and clear. Use a numbered list format. Provide emotional support and guidance: " + userMessage + "give points first in hindi then in english language";

        const newConversationHistory = [...conversationHistory, { role: "user", text: therapyPrompt }];

        const response = await axios.post(
            `${GEMINI_API_URL}?key=${apiKeyToUse}`,
            {
                contents: newConversationHistory.map(message => ({ role: message.role === "assistant" ? "model" : message.role, parts: [{ text: message.text }] }))
            }
        );

        res.json({ reply: "success", data: response.data });
    } catch (error) {
        let details = "Error";
        if (error.response && error.response.data) {
            details = error.response.data;
        }
        res.status(500).json({ error: "API ERROR", details });
    }
});

const server = app.listen(5001, () => "Test running");

// run request
setTimeout(async () => {
    try {
        const res = await axios.post('http://localhost:5001/test-ask', { userMessage: "test" });
        console.log("SUCCESS:", JSON.stringify(res.data, null, 2));
    } catch (err) {
        console.log("FAILED WITH 500:", JSON.stringify(err.response?.data, null, 2));
    }
    server.close();
    process.exit(0);
}, 500);
