import axios from "axios";

const API_URL = "/api/rights";

export const askRights = async (userMessage) => {
    try {
        const response = await axios.post(`${API_URL}/ask-rights`, { userMessage });
        return response.data.reply;
    } catch (error) {
        return "Error fetching response.";
    }
};