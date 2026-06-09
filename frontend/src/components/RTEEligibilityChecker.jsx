import React, { useState } from 'react';

const RTEEligibilityChecker = () => {
    const [formData, setFormData] = useState({
        childAge: '',
        familyIncome: '',
        location: '',
        category: 'general',
        hasDisability: false,
        isGirl: false,
        isOrphan: false,
        isWorkingChild: false,
        parentsEducation: 'none'
    });
    const [result, setResult] = useState(null);
    const [showDetailedReport, setShowDetailedReport] = useState(false);

    // RTE Act 2009 Guidelines
    const rteGuidelines = {
        ageGroup: { min: 6, max: 14 },
        incomeThresholds: {
            ews: 100000, // Economically Weaker Section
            bpl: 81000,  // Below Poverty Line (varies by state)
            urban: 120000,
            rural: 100000
        },
        reservedCategories: ['sc', 'st', 'obc'],
        disadvantagedGroups: ['disabled', 'orphan', 'working_child', 'girl_child']
    };

    const calculateEligibility = () => {
        const { childAge, familyIncome, location, category, hasDisability, isGirl, isOrphan, isWorkingChild, parentsEducation } = formData;
        
        let eligibilityResult = {
            eligible: false,
            category: null,
            reasons: [],
            benefits: [],
            nextSteps: [],
            requiredDocuments: [],
            applicableSchemes: [],
            score: 0
        };

        // Age Check (Primary Requirement)
        if (childAge >= rteGuidelines.ageGroup.min && childAge <= rteGuidelines.ageGroup.max) {
            eligibilityResult.score += 40;
            eligibilityResult.reasons.push(`Child age ${childAge} years falls within RTE age group (6-14 years)`);
        } else {
            eligibilityResult.reasons.push(`Child age ${childAge} years is outside RTE age group (6-14 years)`);
            setResult(eligibilityResult);
            return;
        }

        // Category-based Eligibility
        let categoryType = null;
        let incomeThreshold = rteGuidelines.incomeThresholds[location] || rteGuidelines.incomeThresholds.rural;

        // Check for Reserved Categories
        if (rteGuidelines.reservedCategories.includes(category)) {
            categoryType = 'disadvantaged';
            eligibilityResult.score += 30;
            eligibilityResult.reasons.push(`Belongs to ${category.toUpperCase()} - Reserved Category`);
            eligibilityResult.benefits.push('25% reservation in private schools');
            eligibilityResult.benefits.push('No admission fees');
            eligibilityResult.benefits.push('Free textbooks and uniforms');
        }

        // Check EWS (Economically Weaker Section)
        if (familyIncome <= incomeThreshold && category === 'general') {
            categoryType = categoryType || 'ews';
            eligibilityResult.score += 25;
            eligibilityResult.reasons.push(`Family income Rs. ${familyIncome} qualifies for EWS category (threshold: Rs. ${incomeThreshold})`);
            eligibilityResult.benefits.push('25% reservation under EWS');
            eligibilityResult.benefits.push('No capitation fees');
        }

        // Check for Disadvantaged Groups
        if (hasDisability) {
            categoryType = 'disadvantaged';
            eligibilityResult.score += 20;
            eligibilityResult.reasons.push('Child has disability - qualifies for disadvantaged group');
            eligibilityResult.benefits.push('Special education support');
            eligibilityResult.benefits.push('Barrier-free school access');
            eligibilityResult.applicableSchemes.push('Disability Scholarship');
        }

        if (isOrphan) {
            categoryType = 'disadvantaged';
            eligibilityResult.score += 20;
            eligibilityResult.reasons.push('Child is orphan - qualifies for disadvantaged group');
            eligibilityResult.benefits.push('Free education with additional support');
            eligibilityResult.applicableSchemes.push('Orphan Support Scheme');
        }

        if (isWorkingChild) {
            categoryType = 'disadvantaged';
            eligibilityResult.score += 15;
            eligibilityResult.reasons.push('Child is working - qualifies for special provisions');
            eligibilityResult.benefits.push('Bridge courses for mainstreaming');
            eligibilityResult.benefits.push('Special attendance provisions');
        }

        if (isGirl) {
            eligibilityResult.score += 10;
            eligibilityResult.reasons.push('Girl child - eligible for special schemes');
            eligibilityResult.applicableSchemes.push('Balika Samridhi Yojana');
            eligibilityResult.applicableSchemes.push('Sukanya Samriddhi Yojana');
        }

        // Determine Final Eligibility
        eligibilityResult.eligible = eligibilityResult.score >= 40;
        eligibilityResult.category = categoryType;

        // Set Required Documents
        eligibilityResult.requiredDocuments = [
            'Child Birth Certificate',
            'Parents/Guardian Identity Proof',
            'Address Proof'
        ];

        if (categoryType === 'ews' || categoryType === 'disadvantaged') {
            eligibilityResult.requiredDocuments.push('Income Certificate');
        }

        if (rteGuidelines.reservedCategories.includes(category)) {
            eligibilityResult.requiredDocuments.push('Caste Certificate');
        }

        if (hasDisability) {
            eligibilityResult.requiredDocuments.push('Disability Certificate');
        }

        if (isOrphan) {
            eligibilityResult.requiredDocuments.push('Orphan Certificate');
        }

        // Set Next Steps
        if (eligibilityResult.eligible) {
            eligibilityResult.nextSteps = [
                'Gather all required documents',
                'Find nearest schools with RTE seats',
                'Submit application before deadline',
                'Attend document verification',
                'Follow up on admission status'
            ];
        } else {
            eligibilityResult.nextSteps = [
                'Check alternative education options',
                'Apply for private school scholarships',
                'Contact education department for guidance',
                'Consider bridge programs if needed'
            ];
        }

        setResult(eligibilityResult);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const getScoreColor = (score) => {
        if (score >= 70) return 'text-green-600';
        if (score >= 40) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getScoreMessage = (score) => {
        if (score >= 70) return 'Highly Eligible';
        if (score >= 40) return 'Eligible';
        return 'Not Eligible';
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">
                    RTE Eligibility Checker
                </h1>
                <p className="text-center text-gray-600 mb-8">
                    Check your child's eligibility under Right to Education Act 2009
                </p>

                {/* Input Form */}
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Enter Child Details</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Child Age */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Child's Age (Years) *
                            </label>
                            <input
                                type="number"
                                name="childAge"
                                value={formData.childAge}
                                onChange={handleInputChange}
                                min="3"
                                max="18"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., 8"
                            />
                            <p className="text-xs text-gray-500 mt-1">RTE covers children aged 6-14 years</p>
                        </div>

                        {/* Family Income */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Annual Family Income (Rs.) *
                            </label>
                            <input
                                type="number"
                                name="familyIncome"
                                value={formData.familyIncome}
                                onChange={handleInputChange}
                                min="0"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., 95000"
                            />
                            <p className="text-xs text-gray-500 mt-1">EWS threshold: Rs. 1,00,000 (varies by location)</p>
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Location Type *
                            </label>
                            <select
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select location</option>
                                <option value="urban">Urban Area</option>
                                <option value="rural">Rural Area</option>
                            </select>
                            <p className="text-xs text-gray-500 mt-1">Income thresholds vary by location</p>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Social Category *
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="general">General</option>
                                <option value="sc">Scheduled Caste (SC)</option>
                                <option value="st">Scheduled Tribe (ST)</option>
                                <option value="obc">Other Backward Classes (OBC)</option>
                            </select>
                        </div>

                        {/* Parents Education */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Parents' Education
                            </label>
                            <select
                                name="parentsEducation"
                                value={formData.parentsEducation}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="none">No formal education</option>
                                <option value="primary">Primary (1-5)</option>
                                <option value="secondary">Secondary (6-10)</option>
                                <option value="higher">Higher Secondary (11-12)</option>
                                <option value="graduate">Graduate and above</option>
                            </select>
                        </div>
                    </div>

                    {/* Special Conditions */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Special Conditions (Check if applicable)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                <input
                                    type="checkbox"
                                    name="hasDisability"
                                    checked={formData.hasDisability}
                                    onChange={handleInputChange}
                                    className="w-5 h-5 text-blue-600"
                                />
                                <div>
                                    <span className="text-gray-700 font-medium">Child has disability</span>
                                    <p className="text-xs text-gray-500">Qualifies for disadvantaged group</p>
                                </div>
                            </label>
                            <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                <input
                                    type="checkbox"
                                    name="isGirl"
                                    checked={formData.isGirl}
                                    onChange={handleInputChange}
                                    className="w-5 h-5 text-blue-600"
                                />
                                <div>
                                    <span className="text-gray-700 font-medium">Girl child</span>
                                    <p className="text-xs text-gray-500">Eligible for special schemes</p>
                                </div>
                            </label>
                            <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                <input
                                    type="checkbox"
                                    name="isOrphan"
                                    checked={formData.isOrphan}
                                    onChange={handleInputChange}
                                    className="w-5 h-5 text-blue-600"
                                />
                                <div>
                                    <span className="text-gray-700 font-medium">Orphan child</span>
                                    <p className="text-xs text-gray-500">Qualifies for disadvantaged group</p>
                                </div>
                            </label>
                            <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                <input
                                    type="checkbox"
                                    name="isWorkingChild"
                                    checked={formData.isWorkingChild}
                                    onChange={handleInputChange}
                                    className="w-5 h-5 text-blue-600"
                                />
                                <div>
                                    <span className="text-gray-700 font-medium">Working child</span>
                                    <p className="text-xs text-gray-500">Needs special provisions</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Check Button */}
                    <div className="mt-8 text-center">
                        <button
                            onClick={calculateEligibility}
                            disabled={!formData.childAge || !formData.familyIncome || !formData.location}
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            Check RTE Eligibility
                        </button>
                    </div>
                </div>

                {/* Results */}
                {result && (
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Eligibility Results</h2>
                        
                        {/* Eligibility Status */}
                        <div className={`text-center mb-8 p-6 rounded-lg ${
                            result.eligible ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
                        }`}>
                            <div className={`text-3xl font-bold mb-2 ${getScoreColor(result.score)}`}>
                                {result.eligible ? 'ELIGIBLE' : 'NOT ELIGIBLE'}
                            </div>
                            <div className={`text-lg ${getScoreColor(result.score)}`}>
                                {getScoreMessage(result.score)} (Score: {result.score}/100)
                            </div>
                            {result.category && (
                                <div className="mt-4">
                                    <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                                        Category: {result.category === 'ews' ? 'EWS' : result.category === 'disadvantaged' ? 'Disadvantaged Group' : result.category.toUpperCase()}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Reasons */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Assessment Reasons</h3>
                            <ul className="space-y-2">
                                {result.reasons.map((reason, index) => (
                                    <li key={index} className="flex items-start space-x-2">
                                        <span className="text-blue-600 mt-1">·</span>
                                        <span className="text-gray-700">{reason}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Benefits */}
                        {result.benefits.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">RTE Benefits Available</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {result.benefits.map((benefit, index) => (
                                        <div key={index} className="bg-green-50 border-l-4 border-green-500 p-3">
                                            <span className="text-green-700">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Applicable Schemes */}
                        {result.applicableSchemes.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Government Schemes</h3>
                                <div className="space-y-2">
                                    {result.applicableSchemes.map((scheme, index) => (
                                        <div key={index} className="bg-purple-50 border-l-4 border-purple-500 p-3">
                                            <span className="text-purple-700">{scheme}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Required Documents */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Required Documents</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {result.requiredDocuments.map((doc, index) => (
                                    <div key={index} className="bg-gray-50 border-l-4 border-gray-400 p-3">
                                        <span className="text-gray-700">{doc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Next Steps */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Next Steps</h3>
                            <ol className="space-y-2">
                                {result.nextSteps.map((step, index) => (
                                    <li key={index} className="flex items-start space-x-3">
                                        <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                                            {index + 1}
                                        </span>
                                        <span className="text-gray-700">{step}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setShowDetailedReport(!showDetailedReport)}
                                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                {showDetailedReport ? 'Hide' : 'Show'} Detailed Report
                            </button>
                            <button
                                onClick={() => {
                                    setResult(null);
                                    setFormData({
                                        childAge: '',
                                        familyIncome: '',
                                        location: '',
                                        category: 'general',
                                        hasDisability: false,
                                        isGirl: false,
                                        isOrphan: false,
                                        isWorkingChild: false,
                                        parentsEducation: 'none'
                                    });
                                }}
                                className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Check Another Child
                            </button>
                        </div>

                        {/* Detailed Report */}
                        {showDetailedReport && (
                            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Detailed RTE Assessment Report</h3>
                                <div className="space-y-4 text-sm">
                                    <div>
                                        <span className="font-medium">RTE Act 2009 Reference:</span>
                                        <p className="text-gray-600 mt-1">
                                            Right of children to free and compulsory education in a neighbourhood school till completion of elementary education.
                                        </p>
                                    </div>
                                    <div>
                                        <span className="font-medium">Section 12(1)(c) - 25% Reservation:</span>
                                        <p className="text-gray-600 mt-1">
                                            All private schools must admit at least 25% children from EWS and disadvantaged groups in class I.
                                        </p>
                                    </div>
                                    <div>
                                        <span className="font-medium">Age Criteria:</span>
                                        <p className="text-gray-600 mt-1">
                                            Children aged 6-14 years are entitled to free education. No child can be denied admission for lack of documents.
                                        </p>
                                    </div>
                                    <div>
                                        <span className="font-medium">No Screening Procedure:</span>
                                        <p className="text-gray-600 mt-1">
                                            Schools cannot conduct interviews, tests, or any screening procedure for admission.
                                        </p>
                                    </div>
                                    <div>
                                        <span className="font-medium">No Capitation Fees:</span>
                                        <p className="text-gray-600 mt-1">
                                            Schools cannot charge any capitation fee, donation, or subject the child/parents to any screening procedure.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RTEEligibilityChecker;
