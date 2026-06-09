import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceLocator from './ServiceLocator';

const FinancialIndependence = ({ onBack }) => {
    const [activeModule, setActiveModule] = useState(null);
    const [completedSteps, setCompletedSteps] = useState([]);

    const modules = [
        {
            id: 'banking',
            title: 'Bank Account Without Address',
            icon: 'bank',
            color: 'bg-blue-500',
            steps: [
                {
                    title: 'Get Your Aadhar Card',
                    details: 'Visit nearest Aadhar enrollment center with any ID proof (even old voter ID or ration card)',
                    action: 'Find center: Call 1947 or visit uidai.gov.in',
                    emergency: true,
                    serviceLocatorType: 'aadhar'
                },
                {
                    title: 'Open Basic Savings Account',
                    details: 'PMJDY account needs only Aadhar - no address proof or husband signature required',
                    action: 'Visit any bank branch with Aadhar card and 2 photos',
                    emergency: true,
                    serviceLocatorType: 'bank'
                },
                {
                    title: 'Get ATM Card',
                    details: 'Request debit card immediately - no minimum balance needed for PMJDY accounts',
                    action: 'Activate card at bank ATM with green button'
                }
            ]
        },
        {
            id: 'savings',
            title: 'Safe Money Saving',
            icon: 'lock',
            color: 'bg-green-500',
            steps: [
                {
                    title: 'Daily Small Deposits',
                    details: 'Save Rs. 50-100 daily in bank account instead of keeping cash',
                    action: 'Use bank deposit slip or mobile banking'
                },
                {
                    title: 'Emergency Fund',
                    details: 'Keep 3 months expenses separate - start with Rs. 1000',
                    action: 'Open recurring deposit (RD) for automatic saving'
                },
                {
                    title: 'Protect Earnings',
                    details: 'Never share ATM PIN or bank details with anyone',
                    action: 'Write PIN in secret place only you know'
                }
            ]
        },
        {
            id: 'documents',
            title: 'Document Security',
            icon: 'shield',
            color: 'bg-purple-500',
            steps: [
                {
                    title: 'Keep Originals Safe',
                    details: 'Store Aadhar, bank papers in locked box or with trusted person outside brothel',
                    action: 'Make photocopies - give copies only when needed'
                },
                {
                    title: 'Digital Backup',
                    details: 'Click photos of all documents and save in secure email',
                    action: 'Create Gmail account with strong password'
                },
                {
                    title: 'Know Your Rights',
                    details: 'Bank cannot deny account without proper reason - complain to banking ombudsman',
                    action: 'Helpline: 14444 (Banking)'
                }
            ]
        }
    ];

    const toggleStep = (moduleId, stepIndex) => {
        const stepId = `${moduleId}-${stepIndex}`;
        setCompletedSteps(prev =>
            prev.includes(stepId)
                ? prev.filter(id => id !== stepId)
                : [...prev, stepId]
        );
    };

    const emergencyNumbers = [
        { name: 'Women Helpline', number: '1091' },
        { name: 'Banking Ombudsman', number: '14444' },
        { name: 'Aadhar Helpline', number: '1947' },
        { name: 'Police', number: '100' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={onBack}
                    className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition"
                >
                    <span className="mr-2">←</span>
                    <span className="font-semibold">Back to Skills</span>
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Financial Independence & Security
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Take control of your money and future - step by step guidance
                    </p>
                </motion.div>

                {/* Emergency Numbers */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-8"
                >
                    <h3 className="text-red-800 font-bold text-lg mb-3">Emergency Help Numbers</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {emergencyNumbers.map((num, idx) => (
                            <div key={idx} className="bg-white rounded p-2 text-center">
                                <div className="text-sm text-gray-600">{num.name}</div>
                                <div className="font-bold text-red-600">{num.number}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Module Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {modules.map((module) => (
                        <motion.div
                            key={module.id}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
                            onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
                        >
                            <div className={`${module.color} p-4 text-white`}>
                                <div className="text-3xl mb-2">💰</div>
                                <h3 className="font-bold text-lg">{module.title}</h3>
                            </div>
                            <div className="p-4">
                                <div className="text-sm text-gray-600">
                                    {module.steps.length} steps to complete
                                </div>
                                <div className="mt-2">
                                    {module.steps.filter((_, idx) =>
                                        completedSteps.includes(`${module.id}-${idx}`)
                                    ).length} / {module.steps.length} completed
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Detailed Steps */}
                <AnimatePresence>
                    {activeModule && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-white rounded-xl shadow-lg p-6"
                        >
                            {(() => {
                                const module = modules.find(m => m.id === activeModule);
                                return (
                                    <div>
                                        <h3 className="text-2xl font-bold mb-6">{module.title}</h3>
                                        <div className="space-y-4">
                                            {module.steps.map((step, idx) => {
                                                const stepId = `${module.id}-${idx}`;
                                                const isCompleted = completedSteps.includes(stepId);

                                                return (
                                                    <motion.div
                                                        key={idx}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: idx * 0.1 }}
                                                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${isCompleted
                                                                ? 'border-green-500 bg-green-50'
                                                                : 'border-gray-200 hover:border-gray-300'
                                                            }`}
                                                        onClick={() => toggleStep(module.id, idx)}
                                                    >
                                                        <div className="flex items-start justify-between">
                                                            <div className="flex-1">
                                                                <h4 className="font-bold text-lg mb-2">
                                                                    {isCompleted && '✅'} {step.title}
                                                                </h4>
                                                                <p className="text-gray-600 mb-2">{step.details}</p>
                                                                <div className={`text-sm p-2 rounded ${step.emergency
                                                                        ? 'bg-red-100 text-red-800'
                                                                        : 'bg-blue-100 text-blue-800'
                                                                    }`}>
                                                                    {step.action}
                                                                </div>
                                                                {step.serviceLocatorType && <ServiceLocator type={step.serviceLocatorType} />}
                                                            </div>
                                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ml-4 ${isCompleted
                                                                    ? 'bg-green-500 border-green-500'
                                                                    : 'border-gray-300'
                                                                }`}>
                                                                {isCompleted && '✓'}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })()}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Progress Summary */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6"
                >
                    <h3 className="font-bold text-lg mb-3">Your Progress</h3>
                    <div className="bg-white rounded-lg p-4">
                        <div className="text-2xl font-bold text-purple-600">
                            {completedSteps.length} / {modules.reduce((acc, m) => acc + m.steps.length, 0)} steps completed
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
                            <div
                                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all"
                                style={{
                                    width: `${(completedSteps.length / modules.reduce((acc, m) => acc + m.steps.length, 0)) * 100}%`
                                }}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default FinancialIndependence;
