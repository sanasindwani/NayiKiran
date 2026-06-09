import LegalDefense from "../models/legalDefense.model.js";

// Get all legal defense modules
export const getAllLegalDefenseModules = async (req, res) => {
    try {
        const modules = await LegalDefense.find().sort({ category: 1, difficulty: 1 });
        res.status(200).json(modules);
    } catch (error) {
        console.error("Error fetching legal defense modules:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get modules by category
export const getModulesByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const modules = await LegalDefense.find({ category }).sort({ difficulty: 1 });
        res.status(200).json(modules);
    } catch (error) {
        console.error("Error fetching modules by category:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get specific module by ID
export const getModuleById = async (req, res) => {
    try {
        const { id } = req.params;
        const module = await LegalDefense.findById(id);
        
        if (!module) {
            return res.status(404).json({ error: "Module not found" });
        }
        
        res.status(200).json(module);
    } catch (error) {
        console.error("Error fetching module:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Create new legal defense module
export const createLegalDefenseModule = async (req, res) => {
    try {
        const moduleData = req.body;
        const newModule = new LegalDefense(moduleData);
        await newModule.save();
        res.status(201).json(newModule);
    } catch (error) {
        console.error("Error creating module:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get emergency helplines
export const getEmergencyHelplines = async (req, res) => {
    try {
        const emergencyModules = await LegalDefense.find({ 
            category: 'emergency-action' 
        }).select('helplines title');
        
        const allHelplines = emergencyModules.reduce((acc, module) => {
            return acc.concat(module.helplines.map(helpline => ({
                ...helpline.toObject(),
                moduleName: module.title
            })));
        }, []);
        
        res.status(200).json(allHelplines);
    } catch (error) {
        console.error("Error fetching emergency helplines:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get quick action steps for police harassment
export const getPoliceHarassmentSteps = async (req, res) => {
    try {
        const policeModules = await LegalDefense.find({ 
            category: 'police-harassment' 
        }).select('title actionableSteps whatToSay whatNotToDo helplines');
        
        res.status(200).json(policeModules);
    } catch (error) {
        console.error("Error fetching police harassment steps:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Search modules by tags or keywords
export const searchModules = async (req, res) => {
    try {
        const { query } = req.query;
        
        if (!query) {
            return res.status(400).json({ error: "Search query is required" });
        }
        
        const modules = await LegalDefense.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { tags: { $in: [new RegExp(query, 'i')] } }
            ]
        });
        
        res.status(200).json(modules);
    } catch (error) {
        console.error("Error searching modules:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default {
    getAllLegalDefenseModules,
    getModulesByCategory,
    getModuleById,
    createLegalDefenseModule,
    getEmergencyHelplines,
    getPoliceHarassmentSteps,
    searchModules
};
