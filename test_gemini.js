import axios from 'axios';

async function testGemini() {
    try {
        const res = await axios.post('http://localhost:5000/api/gemini/ask-gemini', {
            userMessage: "Hello",
            conversationHistory: []
        });
        console.log("Success:", res.data);
    } catch (err) {
        console.error("Error status:", err.response?.status);
        console.error("Error data:", err.response?.data);
    }
}

testGemini();
