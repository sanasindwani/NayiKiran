import axios from "axios";

const API_BASE_URL = "/api/childcare-protection";

// Get all childcare protection modules
export const getAllChildcareProtectionModules = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching childcare protection modules:", error.message);
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

// Get school enrollment guide
export const getSchoolEnrollmentGuide = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/school-enrollment`);
        return response.data;
    } catch (error) {
        console.error("Error fetching school enrollment guide:", error.message);
        throw error;
    }
};

// Get government schemes
export const getGovernmentSchemes = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/government-schemes`);
        return response.data;
    } catch (error) {
        console.error("Error fetching government schemes:", error.message);
        throw error;
    }
};

// Get child rights legal framework
export const getChildRightsFramework = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/child-rights`);
        return response.data;
    } catch (error) {
        console.error("Error fetching child rights framework:", error.message);
        throw error;
    }
};

// Get exploitation prevention resources
export const getExploitationPrevention = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/exploitation-prevention`);
        return response.data;
    } catch (error) {
        console.error("Error fetching exploitation prevention:", error.message);
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
export const createChildcareProtectionModule = async (moduleData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/`, moduleData);
        return response.data;
    } catch (error) {
        console.error("Error creating module:", error.message);
        throw error;
    }
};
