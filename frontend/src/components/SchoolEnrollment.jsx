import React, { useState, useEffect } from 'react';
import { getSchoolEnrollmentGuide } from '../utils/childcareProtectionApi';
import RTEEligibilityChecker from './RTEEligibilityChecker';
import DocumentChecklist from './DocumentChecklist';

const SchoolEnrollment = () => {
    const [enrollmentData, setEnrollmentData] = useState([]);
    const [selectedStep, setSelectedStep] = useState(0);
    const [showDocumentChecklist, setShowDocumentChecklist] = useState(false);
    const [showEligibilityCalculator, setShowEligibilityCalculator] = useState(false);
    const [loading, setLoading] = useState(true);
    const [eligibilityResult, setEligibilityResult] = useState(null);

    useEffect(() => {
        fetchEnrollmentData();
    }, []);

    const fetchEnrollmentData = async () => {
        try {
            setLoading(true);
            const data = await getSchoolEnrollmentGuide();
            setEnrollmentData(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching enrollment data:', error);
            // Use mock data if API fails
            const mockData = [
                {
                    _id: '1',
                    title: 'School Enrollment Under RTE Act',
                    category: 'school-enrollment',
                    description: 'Complete guide to enroll children in government schools under Right to Education Act',
                    scenario: 'You want to enroll your child in a government school but don\'t know the process',
                    actionableSteps: [
                        {
                            stepNumber: 1,
                            title: 'Check Eligibility (25% Reservation)',
                            description: 'Verify if your child qualifies for free education under RTE 25% reservation',
                            urgency: 'urgent',
                            timeEstimate: '5-10 minutes',
                            documents: ['Income certificate', 'Address proof', 'Birth certificate'],
                            authorities: ['Nearest government school', 'Education department']
                        },
                        {
                            stepNumber: 2,
                            title: 'Gather Required Documents',
                            description: 'Collect all necessary documents for school admission',
                            urgency: 'urgent',
                            timeEstimate: '1-2 days',
                            documents: ['Birth certificate', 'Address proof', 'Income certificate', 'Aadhar card'],
                            authorities: ['Municipal office', 'Tehsil office']
                        },
                        {
                            stepNumber: 3,
                            title: 'Find Nearest Government School',
                            description: 'Locate government schools in your area with RTE seats available',
                            urgency: 'normal',
                            timeEstimate: '30 minutes',
                            documents: ['School list from education department'],
                            authorities: ['Education department website', 'School portal']
                        },
                        {
                            stepNumber: 4,
                            title: 'Submit Application Form',
                            description: 'Fill and submit the admission form with all documents',
                            urgency: 'urgent',
                            timeEstimate: '2-3 hours',
                            documents: ['Filled application form', 'All required documents'],
                            authorities: ['School admission office']
                        },
                        {
                            stepNumber: 5,
                            title: 'Follow Up and Track Status',
                            description: 'Monitor application status and attend admission process',
                            urgency: 'normal',
                            timeEstimate: '1-2 weeks',
                            documents: ['Application receipt', 'Follow-up documents'],
                            authorities: ['School office', 'Education department']
                        }
                    ],
                    schoolEnrollment: {
                        rightToEducation: {
                            act: 'Right to Education Act 2009',
                            provisions: ['Free and compulsory education', '25% reservation in private schools', 'No admission tests', 'No capitation fees'],
                            ageGroup: '6-14 years',
                            freeEducation: 'Completely free including books, uniforms, and transportation'
                        },
                        reservationSystem: {
                            percentage: '25%',
                            categories: ['Economically weaker sections', 'Disadvantaged groups', 'Children with special needs'],
                            applicationProcess: ['Check eligibility', 'Apply in neighborhood schools', 'Document verification', 'Lottery if oversubscribed'],
                            requiredDocuments: ['Income certificate', 'Caste certificate', 'Disability certificate', 'Birth certificate']
                        },
                        admissionRights: ['Cannot be denied due to lack of documents', 'Cannot be charged fees', 'Cannot be asked for donations', 'Cannot be subjected to interviews'],
                        denialGrounds: ['Only valid reason: No seats available', 'Must provide written reason', 'Can appeal to education department'],
                        complaintProcess: [{
                            authority: 'District Education Officer',
                            process: 'Submit written complaint with application proof',
                            timeline: '30 days resolution',
                            appealProcess: 'Can appeal to State Education Commission'
                        }]
                    }
                }
            ];
            setEnrollmentData(mockData);
        } finally {
            setLoading(false);
        }
    };

    const calculateEligibility = (formData) => {
        const { childAge, familyIncome, category, hasDisability, isGirl } = formData;
        
        let eligible = false;
        let reason = '';
        let schemes = [];

        // Basic RTE eligibility
        if (childAge >= 6 && childAge <= 14) {
            eligible = true;
            reason = 'Child falls within RTE age group (6-14 years)';
            schemes.push('RTE 25% Free Education');
        }

        // Income-based eligibility
        if (familyIncome <= 100000) {
            eligible = true;
            reason += ' and family income qualifies for EWS category';
            schemes.push('Economically Weaker Section (EWS)');
        }

        // Category-based eligibility
        if (category === 'sc' || category === 'st' || category === 'obc') {
            eligible = true;
            reason += ' and belongs to reserved category';
            schemes.push('Reserved Category Benefits');
        }

        // Special schemes
        if (isGirl) {
            schemes.push('Balika Samridhi Yojana');
            schemes.push('Sukanya Samriddhi Yojana');
        }

        if (hasDisability) {
            schemes.push('Disability Benefits');
            schemes.push('Special Education Support');
        }

        setEligibilityResult({
            eligible,
            reason,
            schemes,
            nextSteps: eligible ? [
                'Gather required documents',
                'Apply to nearest government school',
                'Submit income certificate',
                'Follow application process'
            ] : [
                'Check alternative education options',
                'Apply for private school scholarships',
                'Contact education department for guidance'
            ]
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const currentModule = enrollmentData[0];

    if (!currentModule) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No enrollment data available.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">
                School Enrollment Under RTE Act
            </h1>

            {/* RTE Overview */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">Right to Education Act 2009</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold text-blue-700 mb-2">Key Provisions:</h3>
                        <ul className="space-y-2">
                            {currentModule.schoolEnrollment.rightToEducation.provisions.map((provision, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                    <span className="text-blue-600 mt-1">·</span>
                                    <span className="text-gray-700">{provision}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-blue-700 mb-2">Benefits:</h3>
                        <div className="bg-white rounded-lg p-4">
                            <p className="text-gray-700 mb-2">
                                <span className="font-medium">Age Group:</span> {currentModule.schoolEnrollment.rightToEducation.ageGroup}
                            </p>
                            <p className="text-gray-700">
                                <span className="font-medium">Free Education:</span> {currentModule.schoolEnrollment.rightToEducation.freeEducation}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-green-800 mb-4">Quick Eligibility Check</h3>
                    <p className="text-green-700 mb-4">Check if your child qualifies for RTE benefits</p>
                    <button
                        onClick={() => setShowEligibilityCalculator(!showEligibilityCalculator)}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Check Eligibility
                    </button>
                </div>
                <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-purple-800 mb-4">Document Checklist</h3>
                    <p className="text-purple-700 mb-4">List of all required documents</p>
                    <button
                        onClick={() => setShowDocumentChecklist(!showDocumentChecklist)}
                        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        View Documents
                    </button>
                </div>
            </div>

            {/* RTE Eligibility Calculator */}
            {showEligibilityCalculator && (
                <div className="mb-8">
                    <RTEEligibilityChecker />
                </div>
            )}

            {/* Enhanced Document Checklist */}
            {showDocumentChecklist && (
                <DocumentChecklist />
            )}

            {/* Step-by-Step Process */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Step-by-Step Enrollment Process</h2>
                
                {/* Step Navigation */}
                <div className="flex justify-center mb-6">
                    <div className="flex space-x-2">
                        {currentModule.actionableSteps.map((step, index) => (
                            <button
                                key={step.stepNumber}
                                onClick={() => setSelectedStep(index)}
                                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-colors ${
                                    selectedStep === index
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                }`}
                            >
                                {step.stepNumber}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Current Step Details */}
                {currentModule.actionableSteps[selectedStep] && (
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                        <div className="flex items-start space-x-4">
                            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                                {currentModule.actionableSteps[selectedStep].stepNumber}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-blue-800 mb-2">
                                    {currentModule.actionableSteps[selectedStep].title}
                                </h3>
                                <p className="text-blue-700 mb-4">
                                    {currentModule.actionableSteps[selectedStep].description}
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-2">Required Documents:</h4>
                                        <ul className="space-y-1">
                                            {currentModule.actionableSteps[selectedStep].documents.map((doc, index) => (
                                                <li key={index} className="flex items-center space-x-2">
                                                    <span className="text-blue-600">·</span>
                                                    <span className="text-gray-700">{doc}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-2">Contact Authorities:</h4>
                                        <ul className="space-y-1">
                                            {currentModule.actionableSteps[selectedStep].authorities.map((authority, index) => (
                                                <li key={index} className="flex items-center space-x-2">
                                                    <span className="text-blue-600">·</span>
                                                    <span className="text-gray-700">{authority}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                
                                <div className="mt-4 flex items-center space-x-4">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {currentModule.actionableSteps[selectedStep].timeEstimate}
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                        currentModule.actionableSteps[selectedStep].urgency === 'urgent' 
                                            ? 'bg-orange-100 text-orange-800' 
                                            : 'bg-green-100 text-green-800'
                                    }`}>
                                        {currentModule.actionableSteps[selectedStep].urgency}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                    <button
                        onClick={() => setSelectedStep(Math.max(0, selectedStep - 1))}
                        disabled={selectedStep === 0}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous Step
                    </button>
                    <button
                        onClick={() => setSelectedStep(Math.min(currentModule.actionableSteps.length - 1, selectedStep + 1))}
                        disabled={selectedStep === currentModule.actionableSteps.length - 1}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next Step
                    </button>
                </div>
            </div>

            {/* Rights and Complaint Process */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-green-800 mb-4">Your Admission Rights</h3>
                    <ul className="space-y-2">
                        {currentModule.schoolEnrollment.admissionRights.map((right, index) => (
                            <li key={index} className="flex items-start space-x-2">
                                <span className="text-green-600 mt-1">·</span>
                                <span className="text-gray-700">{right}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-red-800 mb-4">Complaint Process</h3>
                    <div className="space-y-3">
                        {currentModule.schoolEnrollment.complaintProcess.map((process, index) => (
                            <div key={index} className="bg-white rounded-lg p-3">
                                <h4 className="font-semibold text-red-700">{process.authority}</h4>
                                <p className="text-gray-700 text-sm">{process.process}</p>
                                <p className="text-gray-600 text-xs mt-1">Timeline: {process.timeline}</p>
                                <p className="text-gray-600 text-xs">{process.appealProcess}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Eligibility Calculator Component
const EligibilityCalculator = ({ onCalculate }) => {
    const [formData, setFormData] = useState({
        childAge: '',
        familyIncome: '',
        category: 'general',
        hasDisability: false,
        isGirl: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onCalculate(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Child's Age (years)
                    </label>
                    <input
                        type="number"
                        value={formData.childAge}
                        onChange={(e) => setFormData({...formData, childAge: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        min="3"
                        max="18"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Annual Family Income (Rs.)
                    </label>
                    <input
                        type="number"
                        value={formData.familyIncome}
                        onChange={(e) => setFormData({...formData, familyIncome: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        min="0"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                    </label>
                    <select
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="general">General</option>
                        <option value="sc">Scheduled Caste (SC)</option>
                        <option value="st">Scheduled Tribe (ST)</option>
                        <option value="obc">Other Backward Classes (OBC)</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={formData.hasDisability}
                            onChange={(e) => setFormData({...formData, hasDisability: e.target.checked})}
                            className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Child has disability</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={formData.isGirl}
                            onChange={(e) => setFormData({...formData, isGirl: e.target.checked})}
                            className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Child is girl</span>
                    </label>
                </div>
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
                Calculate Eligibility
            </button>
        </form>
    );
};

export default SchoolEnrollment;
