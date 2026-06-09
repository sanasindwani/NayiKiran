import axios from "axios";

const API_BASE_URL = "/api/legal-defense";

// Get all legal defense modules
export const getAllLegalDefenseModules = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching legal defense modules:", error.message);
        throw error;
    }
};

// Get modules by category
export const getModulesByCategory = async (category) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/category/${category}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching modules by category:", error.message);
        throw error;
    }
};

// Get specific module by ID
export const getModuleById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching module:", error.message);
        throw error;
    }
};

// Get emergency helplines
export const getEmergencyHelplines = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/emergency/helplines`);
        return response.data;
    } catch (error) {
        console.error("Error fetching emergency helplines:", error.message);
        throw error;
    }
};

// Get police harassment steps
export const getPoliceHarassmentSteps = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/police/steps`);
        return response.data;
    } catch (error) {
        console.error("Error fetching police harassment steps:", error.message);
        throw error;
    }
};

// Search modules
export const searchModules = async (query) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/search/${query}`);
        return response.data;
    } catch (error) {
        console.error("Error searching modules:", error.message);
        throw error;
    }
};

// Create new module (admin only)
export const createLegalDefenseModule = async (moduleData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/`, moduleData);
        return response.data;
    } catch (error) {
        console.error("Error creating module:", error.message);
        throw error;
    }
};
