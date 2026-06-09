import React, { useState, useEffect } from 'react';
import { getPoliceHarassmentSteps } from '../utils/legalDefenseApi';

const PoliceHarassmentModule = () => {
    const [modules, setModules] = useState([]);
    const [selectedModule, setSelectedModule] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [showWhatToSay, setShowWhatToSay] = useState(false);
    const [showWhatNotToDo, setShowWhatNotToDo] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPoliceModules();
    }, []);

    const fetchPoliceModules = async () => {
        try {
            setLoading(true);
            const data = await getPoliceHarassmentSteps();
            setModules(data);
            if (data.length > 0) {
                setSelectedModule(data[0]);
            }
        } catch (error) {
            console.error('Error fetching police modules:', error);
        } finally {
            setLoading(false);
        }
    };

    const getUrgencyColor = (urgency) => {
        switch (urgency) {
            case 'immediate': return 'bg-red-100 text-red-800 border-red-200';
            case 'urgent': return 'bg-orange-100 text-orange-800 border-orange-200';
            default: return 'bg-green-100 text-green-800 border-green-200';
        }
    };

    const getUrgencyIcon = (urgency) => {
        switch (urgency) {
            case 'immediate': return '!!';
            case 'urgent': return '!';
            default: return '';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
            </div>
        );
    }

    if (!selectedModule) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No police harassment modules available.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-8">
                <h1 className="text-3xl font-bold text-red-800 mb-4">
                    Police Harassment: Emergency Response Guide
                </h1>
                <p className="text-red-700 font-medium">
                    This guide provides step-by-step instructions for handling police harassment and unlawful raids.
                    Follow these steps carefully to protect your rights.
                </p>
            </div>

            {/* Module Selection */}
            {modules.length > 1 && (
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Scenario:
                    </label>
                    <select
                        value={selectedModule._id}
                        onChange={(e) => {
                            const module = modules.find(m => m._id === e.target.value);
                            setSelectedModule(module);
                            setCurrentStep(0);
                        }}
                        className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                        {modules.map(module => (
                            <option key={module._id} value={module._id}>
                                {module.title}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Scenario Context */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold text-yellow-800 mb-3">Current Scenario:</h2>
                <p className="text-yellow-700 italic">{selectedModule.scenario}</p>
            </div>

            {/* Action Steps */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Action Steps</h2>
                    
                    <div className="space-y-4">
                        {selectedModule.actionableSteps.map((step, index) => (
                            <div
                                key={step.stepNumber}
                                className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                                    currentStep === index
                                        ? 'border-red-500 bg-red-50'
                                        : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}
                                onClick={() => setCurrentStep(index)}
                            >
                                <div className="flex items-start space-x-4">
                                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                                        currentStep === index ? 'bg-red-600' : 'bg-gray-400'
                                    }`}>
                                        {step.stepNumber}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <h3 className="font-bold text-lg">{step.title}</h3>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(step.urgency)}`}>
                                                {getUrgencyIcon(step.urgency)} {step.urgency}
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

                {/* Side Panel */}
                <div className="space-y-6">
                    {/* What to Say */}
                    <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg text-gray-800">What to Say</h3>
                            <button
                                onClick={() => setShowWhatToSay(!showWhatToSay)}
                                className="text-blue-600 hover:text-blue-800"
                            >
                                {showWhatToSay ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {showWhatToSay && (
                            <div className="space-y-3">
                                {selectedModule.whatToSay.map((item, index) => (
                                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                                        <p className="font-medium text-sm text-gray-700 mb-1">
                                            {item.situation}
                                        </p>
                                        <p className="text-blue-700 font-medium mb-1">
                                            "{item.response}"
                                        </p>
                                        <p className="text-xs text-gray-500 italic">
                                            Legal basis: {item.legalBasis}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* What Not to Do */}
                    <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg text-gray-800">What NOT to Do</h3>
                            <button
                                onClick={() => setShowWhatNotToDo(!showWhatNotToDo)}
                                className="text-red-600 hover:text-red-800"
                            >
                                {showWhatNotToDo ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {showWhatNotToDo && (
                            <div className="space-y-3">
                                {selectedModule.whatNotToDo.map((item, index) => (
                                    <div key={index} className="border-l-4 border-red-500 pl-4">
                                        <p className="font-medium text-sm text-red-700 mb-1">
                                            Don't: {item.action}
                                        </p>
                                        <p className="text-xs text-gray-600 mb-1">
                                            Consequence: {item.consequence}
                                        </p>
                                        <p className="text-xs text-green-600">
                                            Instead: {item.alternative}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Emergency Helplines */}
                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                        <h3 className="font-bold text-lg text-red-800 mb-4">Emergency Numbers</h3>
                        <div className="space-y-2">
                            {selectedModule.helplines.map((helpline, index) => (
                                <div key={index} className="flex justify-between items-center">
                                    <span className="text-sm font-medium">{helpline.name}</span>
                                    <span className="font-bold text-red-600">{helpline.number}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Evidence Collection */}
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Evidence Collection</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-2">What to Document</h3>
                        <ul className="space-y-1">
                            {selectedModule.evidenceCollection.whatToDocument.map((item, index) => (
                                <li key={index} className="text-sm text-gray-600 flex items-start">
                                    <span className="text-red-500 mr-2">·</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-2">How to Document</h3>
                        <ul className="space-y-1">
                            {selectedModule.evidenceCollection.howToDocument.map((item, index) => (
                                <li key={index} className="text-sm text-gray-600 flex items-start">
                                    <span className="text-red-500 mr-2">·</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-2">Preservation Tips</h3>
                        <ul className="space-y-1">
                            {selectedModule.evidenceCollection.preservationTips.map((item, index) => (
                                <li key={index} className="text-sm text-gray-600 flex items-start">
                                    <span className="text-red-500 mr-2">·</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Follow-up Actions */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                <h2 className="text-xl font-bold text-blue-800 mb-4">Follow-up Actions</h2>
                <div className="space-y-3">
                    {selectedModule.followUpActions.map((action, index) => (
                        <div key={index} className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                {index + 1}
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-blue-800">{action.action}</p>
                                <p className="text-sm text-blue-600">
                                    Timeline: {action.timeline} | Responsible: {action.responsible}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PoliceHarassmentModule;
