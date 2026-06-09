import React, { useState, useEffect } from 'react';
import { getAllLegalDefenseModules, getModulesByCategory, getEmergencyHelplines, getPoliceHarassmentSteps } from '../utils/legalDefenseApi';
import Navbar from './Navbar';
import Footer from './Footer';

// Mock data functions
const getMockData = () => [
    {
        _id: '1',
        title: 'Police Harassment: What to Do During Unlawful Raids',
        category: 'police-harassment',
        description: 'Step-by-step guide for handling police harassment and unlawful raids',
        scenario: 'Police arrive at your home without a warrant and demand entry',
        actionableSteps: [
            {
                stepNumber: 1,
                title: 'Stay Calm and Don\'t Panic',
                description: 'Take deep breaths. Your calm demeanor can de-escalate the situation.',
                urgency: 'immediate',
                timeEstimate: '0-2 minutes'
            },
            {
                stepNumber: 2,
                title: 'Ask for Search Warrant',
                description: 'Politely ask to see the search warrant. Police must show it if they have one.',
                urgency: 'immediate',
                timeEstimate: '1 minute'
            },
            {
                stepNumber: 3,
                title: 'Record Everything',
                description: 'Start recording video/audio if possible. Note officer names, badge numbers, time.',
                urgency: 'immediate',
                timeEstimate: '2-3 minutes'
            },
            {
                stepNumber: 4,
                title: 'Call Your Lawyer',
                description: 'Contact a lawyer immediately. Have emergency legal numbers ready.',
                urgency: 'urgent',
                timeEstimate: '5-10 minutes'
            },
            {
                stepNumber: 5,
                title: 'Don\'t Sign Anything',
                description: 'Refuse to sign any documents without legal counsel present.',
                urgency: 'immediate',
                timeEstimate: '1 minute'
            }
        ],
        difficulty: 'intermediate',
        estimatedTime: '30-60 minutes',
        tags: ['police', 'harassment', 'rights', 'emergency', 'legal']
    },
    {
        _id: '2',
        title: 'Emergency Action: Using Helpline Numbers and NGOs',
        category: 'emergency-action',
        description: 'Quick reference for emergency contacts and immediate action steps',
        scenario: 'You\'re in immediate danger or need urgent legal assistance',
        actionableSteps: [
            {
                stepNumber: 1,
                title: 'Call Emergency Helpline',
                description: 'Call 181 for women, 1091 for police complaints, or 112 for general emergency.',
                urgency: 'immediate',
                timeEstimate: '1-2 minutes'
            },
            {
                stepNumber: 2,
                title: 'Move to Safe Location',
                description: 'If possible, go to a safe public place or trusted friend\'s house.',
                urgency: 'immediate',
                timeEstimate: '5-30 minutes'
            },
            {
                stepNumber: 3,
                title: 'Document the Emergency',
                description: 'Take photos, videos, and notes of the situation.',
                urgency: 'urgent',
                timeEstimate: '5 minutes'
            },
            {
                stepNumber: 4,
                title: 'Contact Rescue NGOs',
                description: 'Call specialized NGOs for your specific situation.',
                urgency: 'urgent',
                timeEstimate: '10-15 minutes'
            }
        ],
        difficulty: 'beginner',
        estimatedTime: '15-30 minutes',
        tags: ['emergency', 'helpline', 'NGO', 'immediate', 'rescue']
    }
];

const getMockHelplines = () => [
    {
        name: 'Women Helpline',
        number: '181',
        available: '24/7',
        purpose: 'Emergency assistance for women in distress'
    },
    {
        name: 'Police Complaint Helpline',
        number: '1091',
        available: '24/7',
        purpose: 'File complaints against police misconduct'
    },
    {
        name: 'National Emergency',
        number: '112',
        available: '24/7',
        purpose: 'General emergency services'
    },
    {
        name: 'Child Helpline',
        number: '1098',
        available: '24/7',
        purpose: 'Child protection and emergency assistance'
    }
];

const LegalDefense = () => {
    const [modules, setModules] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const [emergencyHelplines, setEmergencyHelplines] = useState([]);
    const [policeSteps, setPoliceSteps] = useState([]);

    const categories = [
        { value: 'all', label: 'All Modules' },
        { value: 'police-harassment', label: 'Police Harassment' },
        { value: 'emergency-action', label: 'Emergency Action' },
        { value: 'legal-rights', label: 'Legal Rights' },
        { value: 'court-procedures', label: 'Court Procedures' }
    ];

    useEffect(() => {
        // Initialize with mock data immediately
        setModules(getMockData());
        setEmergencyHelplines(getMockHelplines());
        setLoading(false);
        
        // Try to fetch real data
        fetchModules();
        fetchEmergencyHelplines();
        fetchPoliceSteps();
    }, []);

    const fetchModules = async () => {
        try {
            setLoading(true);
            const data = selectedCategory === 'all' 
                ? await getAllLegalDefenseModules()
                : await getModulesByCategory(selectedCategory);
            setModules(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching modules:', error);
            // Use mock data if API fails
            const mockData = selectedCategory === 'all' ? getMockData() : getMockData().filter(m => m.category === selectedCategory);
            setModules(Array.isArray(mockData) ? mockData : []);
        } finally {
            setLoading(false);
        }
    };

    const fetchEmergencyHelplines = async () => {
        try {
            const data = await getEmergencyHelplines();
            setEmergencyHelplines(Array.isArray(data) ? data : getMockHelplines());
        } catch (error) {
            console.error('Error fetching helplines:', error);
            // Use mock helplines if API fails
            setEmergencyHelplines(getMockHelplines());
        }
    };

    const fetchPoliceSteps = async () => {
        try {
            const data = await getPoliceHarassmentSteps();
            setPoliceSteps(data);
        } catch (error) {
            console.error('Error fetching police steps:', error);
        }
    };

    useEffect(() => {
        fetchModules();
    }, [selectedCategory]);

    const getUrgencyColor = (urgency) => {
        switch (urgency) {
            case 'immediate': return 'text-red-600 bg-red-100';
            case 'urgent': return 'text-orange-600 bg-orange-100';
            default: return 'text-green-600 bg-green-100';
        }
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'beginner': return 'text-green-600 bg-green-100';
            case 'intermediate': return 'text-yellow-600 bg-yellow-100';
            case 'advanced': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
                Practical Legal Defense Course
            </h1>

            {/* Emergency Helplines Section */}
            {emergencyHelplines.length > 0 && (
                <div className="mb-8 bg-red-50 border-2 border-red-200 rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-red-800 mb-4">Emergency Helplines</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {emergencyHelplines.map((helpline, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
                                <h3 className="font-bold text-lg">{helpline.name}</h3>
                                <p className="text-2xl font-bold text-red-600">{helpline.number}</p>
                                <p className="text-sm text-gray-600">{helpline.available}</p>
                                <p className="text-sm mt-2">{helpline.purpose}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Category Filter */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by Category:
                </label>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    {categories.map(category => (
                        <option key={category.value} value={category.value}>
                            {category.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map((module) => (
                    <div key={module._id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-gray-800">{module.title}</h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
                                    {module.difficulty}
                                </span>
                            </div>
                            
                            <p className="text-gray-600 mb-4">{module.description}</p>
                            
                            <div className="mb-4">
                                <h4 className="font-semibold text-gray-700 mb-2">Scenario:</h4>
                                <p className="text-sm text-gray-600 italic">{module.scenario}</p>
                            </div>

                            <div className="mb-4">
                                <h4 className="font-semibold text-gray-700 mb-2">Key Action Steps:</h4>
                                <div className="space-y-2">
                                    {module.actionableSteps.slice(0, 3).map((step) => (
                                        <div key={step.stepNumber} className="flex items-start space-x-2">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${getUrgencyColor(step.urgency)}`}>
                                                {step.urgency}
                                            </span>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">{step.title}</p>
                                                <p className="text-xs text-gray-500">{step.timeEstimate}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">
                                    {module.estimatedTime}
                                </span>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {modules.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No modules found for this category.</p>
                </div>
            )}
        </div>
            <Footer />
        </div>
    );
};

export default LegalDefense;
