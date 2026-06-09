import React, { useState, useEffect } from 'react';
import { getEmergencyHelplines, getModulesByCategory } from '../utils/legalDefenseApi';

const EmergencyActionModule = () => {
    const [helplines, setHelplines] = useState([]);
    const [emergencyModules, setEmergencyModules] = useState([]);
    const [selectedModule, setSelectedModule] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showCallDialog, setShowCallDialog] = useState(false);
    const [selectedHelpline, setSelectedHelpline] = useState(null);

    useEffect(() => {
        fetchEmergencyData();
    }, []);

    const fetchEmergencyData = async () => {
        try {
            setLoading(true);
            const [helplinesData, modulesData] = await Promise.all([
                getEmergencyHelplines(),
                getModulesByCategory('emergency-action')
            ]);
            
            setHelplines(helplinesData);
            setEmergencyModules(modulesData);
            
            if (modulesData.length > 0) {
                setSelectedModule(modulesData[0]);
            }
        } catch (error) {
            console.error('Error fetching emergency data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCallHelpline = (helpline) => {
        setSelectedHelpline(helpline);
        setShowCallDialog(true);
    };

    const makeCall = (phoneNumber) => {
        window.open(`tel:${phoneNumber}`, '_self');
    };

    const getUrgencyColor = (urgency) => {
        switch (urgency) {
            case 'immediate': return 'bg-red-100 text-red-800 border-red-200';
            case 'urgent': return 'bg-orange-100 text-orange-800 border-orange-200';
            default: return 'bg-green-100 text-green-800 border-green-200';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Emergency Header */}
            <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6 mb-8">
                <h1 className="text-3xl font-bold text-orange-800 mb-4">
                    Emergency Action: Immediate Response Guide
                </h1>
                <p className="text-orange-700 font-medium">
                    When you're in immediate danger, every second counts. This guide provides quick access to emergency helplines and immediate action steps.
                </p>
            </div>

            {/* Emergency Helplines Grid */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Emergency Helplines</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {helplines.map((helpline, index) => (
                        <div key={index} className="bg-white border-2 border-red-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-lg text-gray-800">{helpline.name}</h3>
                                    <p className="text-sm text-gray-600">{helpline.purpose}</p>
                                </div>
                                <div className="bg-red-100 p-2 rounded-full">
                                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-3xl font-bold text-red-600">{helpline.number}</p>
                                    <p className="text-sm text-gray-500">{helpline.available}</p>
                                </div>
                                <button
                                    onClick={() => handleCallHelpline(helpline)}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span>Call Now</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Emergency Action Steps */}
            {selectedModule && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Immediate Action Steps</h2>
                    
                    {/* Module Selection */}
                    {emergencyModules.length > 1 && (
                        <div className="mb-6">
                            <select
                                value={selectedModule._id}
                                onChange={(e) => {
                                    const module = emergencyModules.find(m => m._id === e.target.value);
                                    setSelectedModule(module);
                                }}
                                className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            >
                                {emergencyModules.map(module => (
                                    <option key={module._id} value={module._id}>
                                        {module.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Scenario Context */}
                    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 mb-6">
                        <h3 className="text-xl font-bold text-yellow-800 mb-3">Current Scenario:</h3>
                        <p className="text-yellow-700 italic">{selectedModule.scenario}</p>
                    </div>

                    {/* Action Steps */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedModule.actionableSteps.map((step, index) => (
                            <div key={step.stepNumber} className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-orange-300 transition-colors">
                                <div className="flex items-start space-x-4">
                                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                                        step.urgency === 'immediate' ? 'bg-red-600' : 
                                        step.urgency === 'urgent' ? 'bg-orange-600' : 'bg-green-600'
                                    }`}>
                                        {step.stepNumber}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <h4 className="font-bold text-gray-800">{step.title}</h4>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(step.urgency)}`}>
                                                {step.urgency}
                                            </span>
                                        </div>
                                        <p className="text-gray-700 mb-2">{step.description}</p>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {step.timeEstimate}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* What to Say Section */}
            {selectedModule && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">What to Say in Emergency</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedModule.whatToSay.map((item, index) => (
                            <div key={index} className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                                <h4 className="font-bold text-blue-800 mb-2">{item.situation}</h4>
                                <div className="bg-white rounded-lg p-4 mb-2">
                                    <p className="text-blue-700 font-medium italic">"{item.response}"</p>
                                </div>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Legal basis:</span> {item.legalBasis}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* What Not to Do Section */}
            {selectedModule && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Critical Mistakes to Avoid</h2>
                    <div className="space-y-4">
                        {selectedModule.whatNotToDo.map((item, index) => (
                            <div key={index} className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-red-800 mb-1">Don't: {item.action}</h4>
                                        <p className="text-red-700 mb-2">
                                            <span className="font-medium">Consequence:</span> {item.consequence}
                                        </p>
                                        <p className="text-green-700">
                                            <span className="font-medium">Instead:</span> {item.alternative}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Call Dialog */}
            {showCallDialog && selectedHelpline && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Emergency Call</h3>
                        <div className="mb-6">
                            <p className="text-gray-600 mb-2">You are about to call:</p>
                            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                                <p className="font-bold text-lg">{selectedHelpline.name}</p>
                                <p className="text-2xl font-bold text-red-600">{selectedHelpline.number}</p>
                                <p className="text-sm text-gray-600">{selectedHelpline.available}</p>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => makeCall(selectedHelpline.number)}
                                className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>Call Now</span>
                            </button>
                            <button
                                onClick={() => setShowCallDialog(false)}
                                className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmergencyActionModule;
