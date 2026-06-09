import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HealthWellness = ({ onBack }) => {
    const [activeModule, setActiveModule] = useState(null);
    const [completedSteps, setCompletedSteps] = useState([]);
    const [emergencyMode, setEmergencyMode] = useState(false);

    const modules = [
        {
            id: 'medical',
            title: 'Medical Awareness & Safety',
            icon: 'heart',
            color: 'bg-red-500',
            description: 'Essential health knowledge for protection',
            steps: [
                {
                    title: 'Recognize STI Symptoms Early',
                    details: 'Watch for unusual discharge, burning sensation, sores, or itching. Early detection saves life.',
                    action: 'Check body weekly in private space with mirror',
                    urgency: 'high',
                    symptoms: ['Unusual discharge', 'Pain during urination', 'Genital sores', 'Itching/burning', 'Lower abdominal pain']
                },
                {
                    title: 'Find Safe Government Clinics',
                    details: 'Government hospitals provide free STI treatment without asking questions or judging.',
                    action: 'Visit District Hospital or PHC - ask for "STI clinic"',
                    urgency: 'high',
                    locations: ['District Hospital', 'Primary Health Center', 'Urban Health Center', 'Mobile Health Van']
                },
                {
                    title: 'Emergency Medical Help',
                    details: 'If severe pain, bleeding, or fever - go to emergency immediately. No ID needed for emergency.',
                    action: 'Call 108 ambulance or go to nearest government hospital emergency',
                    urgency: 'critical'
                },
                {
                    title: 'Regular Health Checkups',
                    details: 'Get checked every 3 months even if no symptoms. Prevention is better than cure.',
                    action: 'Visit government clinic for free HIV/STI testing',
                    urgency: 'medium'
                },
                {
                    title: 'Medicine Safety',
                    details: 'Never share medicines. Complete full course even if symptoms disappear.',
                    action: 'Store medicines in safe place away from others',
                    urgency: 'medium'
                }
            ]
        },
        {
            id: 'mental',
            title: 'Mental Resilience & Self-Worth',
            icon: 'brain',
            color: 'bg-purple-500',
            description: 'Building inner strength and hope',
            steps: [
                {
                    title: 'Daily Self-Care Routine',
                    details: 'Spend 10 minutes daily for yourself - deep breathing, positive thoughts, or gentle exercise.',
                    action: 'Morning: 5 deep breaths. Evening: List 3 good things about yourself',
                    urgency: 'medium'
                },
                {
                    title: 'Handle Trauma Triggers',
                    details: 'When memories overwhelm, use grounding: name 5 things you see, 4 things you touch, 3 things you hear.',
                    action: 'Practice this technique daily when calm',
                    urgency: 'high'
                },
                {
                    title: 'Build Support Network',
                    details: 'Connect with trusted friends, NGOs, or support groups. You are not alone.',
                    action: 'Join women support group or call helpline to talk',
                    urgency: 'medium'
                },
                {
                    title: 'Set Small Goals',
                    details: 'Set achievable goals - save Rs. 100, learn one skill, help one person. Success builds confidence.',
                    action: 'Write one weekly goal and celebrate when completed',
                    urgency: 'low'
                },
                {
                    title: 'Professional Help Available',
                    details: 'Free counseling available at government hospitals and NGOs. Mental health is health.',
                    action: 'Ask for "counseling department" at government hospital',
                    urgency: 'medium'
                }
            ]
        },
        {
            id: 'childcare',
            title: 'Protect Your Children',
            icon: 'child',
            color: 'bg-green-500',
            description: 'Securing your children\'s future',
            steps: [
                {
                    title: 'School Enrollment Under RTE',
                    details: 'Right to Education Act - 25% seats reserved in private schools for free education.',
                    action: 'Visit nearest school with Aadhar/ birth certificate',
                    urgency: 'high',
                    documents: ['Child birth certificate', 'Aadhar card', 'Address proof (any)', 'Parents ID']
                },
                {
                    title: 'Government Schemes for Children',
                    details: 'Free education, scholarships, and hostels available for children of sex workers.',
                    action: 'Contact District Child Protection Officer',
                    urgency: 'high',
                    schemes: ['Kasturba Gandhi Balika Vidyalaya', 'National Child Labour Project', 'Integrated Child Development Services']
                },
                {
                    title: 'Protect from Exploitation',
                    details: 'Never let children enter sex work. Report child trafficking immediately.',
                    action: 'Call 1098 (Childline) if children at risk',
                    urgency: 'critical'
                },
                {
                    title: 'Health Checkups for Children',
                    details: 'Free immunization and health checkups at government hospitals and Anganwadi centers.',
                    action: 'Visit Anganwadi center monthly',
                    urgency: 'medium'
                },
                {
                    title: 'Create Safe Environment',
                    details: 'Teach children good touch/bad touch. Build their confidence to speak up.',
                    action: 'Spend quality time with children daily',
                    urgency: 'high'
                }
            ]
        },
        {
            id: 'legal',
            title: 'Legal Rights & Protection',
            icon: 'shield',
            color: 'bg-blue-500',
            description: 'Know your rights and stay safe',
            steps: [
                {
                    title: 'Police Harassment Response',
                    details: 'Police cannot harass without warrant. Know your rights during raids or questioning.',
                    action: 'Remain calm, ask for warrant, call lawyer or helpline',
                    urgency: 'high',
                    rights: ['Right to remain silent', 'Right to lawyer', 'Right to inform family', 'Right against illegal arrest']
                },
                {
                    title: 'Emergency Helplines',
                    details: 'Save these numbers. They work 24/7 and provide immediate help.',
                    action: 'Save numbers in phone under fake names',
                    urgency: 'critical',
                    helplines: [
                        { name: 'Women Helpline', number: '1091' },
                        { name: 'Child Helpline', number: '1098' },
                        { name: 'Emergency', number: '112' },
                        { name: 'Legal Aid', number: '15100' }
                    ]
                },
                {
                    title: 'Document Protection',
                    details: 'Keep important documents safe from seizure. Make digital copies.',
                    action: 'Email copies to secure account',
                    urgency: 'high'
                },
                {
                    title: 'Seek Legal Help',
                    details: 'Free legal aid available for women. Don\'t stay silent about injustice.',
                    action: 'Contact State Legal Services Authority',
                    urgency: 'medium'
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

    const criticalHelplines = [
        { name: 'Women in Distress', number: '1091', color: 'bg-red-500' },
        { name: 'Child Protection', number: '1098', color: 'bg-orange-500' },
        { name: 'Medical Emergency', number: '108', color: 'bg-green-500' },
        { name: 'Police Emergency', number: '112', color: 'bg-blue-500' },
        { name: 'Mental Health Helpline', number: '1800-599-0019', color: 'bg-purple-500' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-purple-50 p-4">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={onBack}
                    className="mb-6 flex items-center text-red-600 hover:text-red-800 transition"
                >
                    <span className="mr-2">arrow_back</span>
                    <span className="font-semibold">Back to Skills</span>
                </motion.button>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Health, Wellness & Protection
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Your health and safety matter - get the help you deserve
                    </p>
                </motion.div>

                {/* Critical Emergency Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-8"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-red-800 font-bold text-xl">Emergency Help - Save These Numbers</h3>
                        <button
                            onClick={() => setEmergencyMode(!emergencyMode)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            {emergencyMode ? 'Hide' : 'Show'} Emergency Info
                        </button>
                    </div>

                    <AnimatePresence>
                        {emergencyMode && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="grid grid-cols-2 md:grid-cols-5 gap-3"
                            >
                                {criticalHelplines.map((helpline, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className={`${helpline.color} text-white rounded-lg p-3 text-center`}
                                    >
                                        <div className="text-sm font-semibold">{helpline.name}</div>
                                        <div className="text-xl font-bold mt-1">{helpline.number}</div>
                                        <div className="text-xs mt-1 opacity-90">24/7 Available</div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Module Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {modules.map((module) => (
                        <motion.div
                            key={module.id}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
                            onClick={() => setActiveCategory(activeCategory === module.id ? null : module.id)}
                        >
                            <div className={`${module.color} p-4 text-white`}>
                                <div className="text-3xl mb-2">{module.icon}</div>
                                <h3 className="font-bold text-lg">{module.title}</h3>
                                <p className="text-sm opacity-90 mt-2">{module.description}</p>
                            </div>
                            <div className="p-4">
                                <div className="text-sm text-gray-600">
                                    {module.steps.length} important steps
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
                    {activeCategory && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-white rounded-xl shadow-lg p-6"
                        >
                            {(() => {
                                const module = modules.find(m => m.id === activeCategory);
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
                                                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${step.urgency === 'critical'
                                                                ? 'border-red-500 bg-red-50'
                                                                : step.urgency === 'high'
                                                                    ? 'border-orange-500 bg-orange-50'
                                                                    : isCompleted
                                                                        ? 'border-green-500 bg-green-50'
                                                                        : 'border-gray-200 hover:border-gray-300'
                                                            }`}
                                                        onClick={() => toggleStep(module.id, idx)}
                                                    >
                                                        <div className="flex items-start justify-between">
                                                            <div className="flex-1">
                                                                <div className="flex items-center mb-2">
                                                                    <h4 className="font-bold text-lg mr-2">{step.title}</h4>
                                                                    {step.urgency === 'critical' && (
                                                                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">CRITICAL</span>
                                                                    )}
                                                                    {step.urgency === 'high' && (
                                                                        <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">URGENT</span>
                                                                    )}
                                                                </div>
                                                                <p className="text-gray-700 mb-3">{step.details}</p>
                                                                <div className={`text-sm p-3 rounded ${step.urgency === 'critical' || step.urgency === 'high'
                                                                        ? 'bg-red-100 text-red-800 font-semibold'
                                                                        : 'bg-blue-100 text-blue-800'
                                                                    }`}>
                                                                    Action: {step.action}
                                                                </div>

                                                                {/* Additional Information */}
                                                                {step.symptoms && (
                                                                    <div className="mt-3 bg-yellow-50 p-2 rounded">
                                                                        <div className="font-semibold text-sm text-yellow-800 mb-1">Warning Signs:</div>
                                                                        <ul className="text-sm text-yellow-700">
                                                                            {step.symptoms.map((symptom, sidx) => (
                                                                                <li key={sidx} className="flex items-start">
                                                                                    <span className="mr-2">warning</span>
                                                                                    <span>{symptom}</span>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                )}

                                                                {step.locations && (
                                                                    <div className="mt-3 bg-green-50 p-2 rounded">
                                                                        <div className="font-semibold text-sm text-green-800 mb-1">Where to Go:</div>
                                                                        <ul className="text-sm text-green-700">
                                                                            {step.locations.map((location, lidx) => (
                                                                                <li key={lidx} className="flex items-start">
                                                                                    <span className="mr-2">location_on</span>
                                                                                    <span>{location}</span>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                )}

                                                                {step.documents && (
                                                                    <div className="mt-3 bg-blue-50 p-2 rounded">
                                                                        <div className="font-semibold text-sm text-blue-800 mb-1">Documents Needed:</div>
                                                                        <ul className="text-sm text-blue-700">
                                                                            {step.documents.map((doc, didx) => (
                                                                                <li key={didx} className="flex items-start">
                                                                                    <span className="mr-2">description</span>
                                                                                    <span>{doc}</span>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                )}

                                                                {step.schemes && (
                                                                    <div className="mt-3 bg-purple-50 p-2 rounded">
                                                                        <div className="font-semibold text-sm text-purple-800 mb-1">Available Schemes:</div>
                                                                        <ul className="text-sm text-purple-700">
                                                                            {step.schemes.map((scheme, sidx) => (
                                                                                <li key={sidx} className="flex items-start">
                                                                                    <span className="mr-2">school</span>
                                                                                    <span>{scheme}</span>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                )}

                                                                {step.rights && (
                                                                    <div className="mt-3 bg-indigo-50 p-2 rounded">
                                                                        <div className="font-semibold text-sm text-indigo-800 mb-1">Your Rights:</div>
                                                                        <ul className="text-sm text-indigo-700">
                                                                            {step.rights.map((right, ridx) => (
                                                                                <li key={ridx} className="flex items-start">
                                                                                    <span className="mr-2">gavel</span>
                                                                                    <span>{right}</span>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                )}

                                                                {step.helplines && (
                                                                    <div className="mt-3 bg-red-50 p-2 rounded">
                                                                        <div className="font-semibold text-sm text-red-800 mb-1">Helplines:</div>
                                                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                                                            {step.helplines.map((helpline, hidx) => (
                                                                                <div key={hidx} className="bg-white rounded p-2">
                                                                                    <div className="font-semibold text-red-600">{helpline.name}</div>
                                                                                    <div className="font-bold">{helpline.number}</div>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ml-4 ${isCompleted
                                                                    ? 'bg-green-500 border-green-500'
                                                                    : 'border-gray-300'
                                                                }`}>
                                                                {isCompleted && 'check'}
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
                    className="mt-8 bg-gradient-to-r from-red-100 to-purple-100 rounded-lg p-6"
                >
                    <h3 className="font-bold text-lg mb-3">Your Wellness Journey</h3>
                    <div className="bg-white rounded-lg p-4">
                        <div className="text-2xl font-bold text-purple-600">
                            {completedSteps.length} steps completed
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                            Every step you take protects your health and future
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
                            <div
                                className="bg-gradient-to-r from-red-500 to-purple-500 h-3 rounded-full transition-all"
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

export default HealthWellness;
