import ChildcareProtection from "../models/childcareProtection.model.js";

// Get all childcare protection modules
export const getAllChildcareProtectionModules = async (req, res) => {
    try {
        const modules = await ChildcareProtection.find().sort({ category: 1, difficulty: 1 });
        res.status(200).json(modules);
    } catch (error) {
        console.error("Error fetching childcare protection modules:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get modules by category
export const getModulesByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const modules = await ChildcareProtection.find({ category }).sort({ difficulty: 1 });
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
        const module = await ChildcareProtection.findById(id);
        
        if (!module) {
            return res.status(404).json({ error: "Module not found" });
        }
        
        res.status(200).json(module);
    } catch (error) {
        console.error("Error fetching module:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get school enrollment guide
export const getSchoolEnrollmentGuide = async (req, res) => {
    try {
        const enrollmentModules = await ChildcareProtection.find({ 
            category: 'school-enrollment' 
        }).select('title schoolEnrollment actionableSteps resources');
        res.status(200).json(enrollmentModules);
    } catch (error) {
        console.error("Error fetching school enrollment guide:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get government schemes
export const getGovernmentSchemes = async (req, res) => {
    try {
        const schemeModules = await ChildcareProtection.find({ 
            category: 'government-schemes' 
        }).select('title governmentSchemes resources');
        
        // Return sample data if no data exists
        if (schemeModules.length === 0) {
            const sampleData = [{
                title: "Government Scholarship Schemes",
                governmentSchemes: [
                    {
                        name: "National Means Cum Merit Scholarship",
                        type: "scholarship",
                        eligibility: ["55% marks in Class 7", "Income below Rs. 1.5 lakh per annum"],
                        benefits: "Rs. 12,000 per annum",
                        applicationProcess: [
                            {
                                step: "Apply through National Scholarship Portal",
                                documents: ["Income certificate", "Marksheet", "Bank details"],
                                timeline: "June-August"
                            }
                        ],
                        contactInfo: {
                            website: "scholarships.gov.in",
                            helpline: "0120-6619540",
                            office: "Directorate of School Education"
                        },
                        amount: "Rs. 12,000 per annum",
                        deadline: "August 31"
                    }
                ],
                resources: {
                    documents: [
                        {
                            name: "Scholarship Guidelines",
                            purpose: "Detailed information about all scholarships",
                            howToObtain: "National Scholarship Portal"
                        }
                    ],
                    helplines: [
                        {
                            name: "Scholarship Helpline",
                            number: "0120-6619540",
                            available: "10 AM - 5 PM",
                            purpose: "Scholarship-related queries"
                        }
                    ]
                }
            }];
            return res.status(200).json(sampleData);
        }
        
        res.status(200).json(schemeModules);
    } catch (error) {
        console.error("Error fetching government schemes:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get child rights legal framework
export const getChildRightsFramework = async (req, res) => {
    try {
        const rightsModules = await ChildcareProtection.find({ 
            category: 'child-rights' 
        }).select('title legalFramework resources');
        
        // Return sample data if no data exists
        if (rightsModules.length === 0) {
            const sampleData = [{
                title: "Child Rights Legal Framework",
                legalFramework: {
                    constitutionalRights: [
                        {
                            article: "Article 21-A",
                            title: "Right to Education",
                            description: "Free and compulsory education for children aged 6-14 years",
                            implications: "State must provide free education to all children"
                        },
                        {
                            article: "Article 24",
                            title: "Prohibition of Child Labor",
                            description: "Prohibits employment of children below 14 years in hazardous industries",
                            implications: "Employers can be punished for violating child labor laws"
                        }
                    ],
                    acts: [
                        {
                            name: "Protection of Children from Sexual Offenses (POCSO) Act",
                            year: 2012,
                            keyProvisions: ["Child-friendly judicial process", "Special courts", "Strict punishment"],
                            penalties: ["Minimum 7 years imprisonment", "Life imprisonment for aggravated offenses"],
                            implementation: "Special courts and child-friendly procedures"
                        }
                    ]
                },
                resources: {
                    documents: [
                        {
                            name: "Constitution of India",
                            purpose: "Fundamental rights and duties",
                            howToObtain: "Government publications"
                        }
                    ],
                    helplines: [
                        {
                            name: "National Commission for Protection of Child Rights",
                            number: "011-23700738",
                            available: "9 AM - 6 PM",
                            purpose: "Child rights violations"
                        }
                    ]
                }
            }];
            return res.status(200).json(sampleData);
        }
        
        res.status(200).json(rightsModules);
    } catch (error) {
        console.error("Error fetching child rights framework:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get exploitation prevention resources
export const getExploitationPrevention = async (req, res) => {
    try {
        const preventionModules = await ChildcareProtection.find({ 
            category: 'exploitation-prevention' 
        }).select('title exploitationPrevention resources');
        
        // Return sample data if no data exists
        if (preventionModules.length === 0) {
            const sampleData = [{
                title: "Child Labor Prevention and Reporting",
                exploitationPrevention: {
                    identification: [
                        {
                            sign: "Working during school hours",
                            description: "Child seen working when they should be in school",
                            warningSigns: ["Absent from school regularly", "Appears tired", "Shows signs of physical stress"]
                        }
                    ],
                    reporting: [
                        {
                            channel: "Childline",
                            anonymous: true,
                            contact: "1098",
                            process: "Report anonymously through Childline 24/7"
                        }
                    ],
                    rescue: [
                        {
                            organization: "Child Welfare Committee",
                            helpline: "1098",
                            process: "Immediate rescue operation",
                            immediateActions: ["Remove child from work", "Provide medical care", "Counseling"]
                        }
                    ]
                },
                resources: {
                    documents: [
                        {
                            name: "Child Labor Act",
                            purpose: "Legal provisions against child labor",
                            howToObtain: "Labor Department website"
                        }
                    ],
                    helplines: [
                        {
                            name: "Childline",
                            number: "1098",
                            available: "24/7",
                            purpose: "Report child abuse and labor"
                        }
                    ],
                    organizations: [
                        {
                            name: "Bachpan Bachao Andolan",
                            type: "NGO",
                            services: ["Child rescue", "Legal aid", "Rehabilitation"],
                            contact: "011-26234847",
                            location: "New Delhi"
                        }
                    ]
                }
            }];
            return res.status(200).json(sampleData);
        }
        
        res.status(200).json(preventionModules);
    } catch (error) {
        console.error("Error fetching exploitation prevention:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Search modules
export const searchModules = async (req, res) => {
    try {
        const { query } = req.query;
        
        if (!query) {
            return res.status(400).json({ error: "Search query is required" });
        }
        
        const modules = await ChildcareProtection.find({
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

// Create new childcare protection module
export const createChildcareProtectionModule = async (req, res) => {
    try {
        const moduleData = req.body;
        const newModule = new ChildcareProtection(moduleData);
        await newModule.save();
        res.status(201).json(newModule);
    } catch (error) {
        console.error("Error creating module:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default {
    getAllChildcareProtectionModules,
    getModulesByCategory,
    getModuleById,
    getSchoolEnrollmentGuide,
    getGovernmentSchemes,
    getChildRightsFramework,
    getExploitationPrevention,
    searchModules,
    createChildcareProtectionModule
};
