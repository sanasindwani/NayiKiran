import React, { useState, useEffect } from 'react';
import { getGovernmentSchemes } from '../utils/childcareProtectionApi';

const GovernmentSchemes = () => {
    const [schemesData, setSchemesData] = useState([]);
    const [selectedScheme, setSelectedScheme] = useState(null);
    const [showApplicationForm, setShowApplicationForm] = useState(false);
    const [filterType, setFilterType] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSchemesData();
    }, []);

    const fetchSchemesData = async () => {
        try {
            setLoading(true);
            const data = await getGovernmentSchemes();
            setSchemesData(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching schemes data:', error);
            // Use mock data if API fails
            const mockData = [
                {
                    _id: '1',
                    title: 'Government Schemes for Children',
                    category: 'government-schemes',
                    description: 'Comprehensive guide to scholarships, hostels, and financial aid for children',
                    scenario: 'You need financial support for your child\'s education and living expenses',
                    governmentSchemes: [
                        {
                            name: 'Balika Samridhi Yojana',
                            type: 'financial',
                            eligibility: ['Girl child from BPL family', 'Born after 15 August 1997', 'Maximum 2 girls per family'],
                            benefits: 'Rs. 500 at birth + Rs. 25,000 for education',
                            applicationProcess: [
                                { step: 'Get application form', documents: ['Birth certificate', 'BPL certificate'], timeline: '1 day' },
                                { step: 'Submit to Anganwadi center', documents: ['Filled form', 'Required documents'], timeline: '2 days' }
                            ],
                            contactInfo: {
                                website: 'www.wcd.nic.in',
                                helpline: '1091',
                                office: 'Women and Child Development Office'
                            },
                            amount: 'Rs. 25,500 total',
                            deadline: 'Within 1 year of birth'
                        },
                        {
                            name: 'National Means Cum-Merit Scholarship',
                            type: 'scholarship',
                            eligibility: ['Class 7 students', '55% marks in class 6', 'Income less than Rs. 1.5 lakh'],
                            benefits: 'Rs. 12,000 per year for 4 years',
                            applicationProcess: [
                                { step: 'Apply through school', documents: ['Application form', 'Marksheet', 'Income certificate'], timeline: '1 week' },
                                { step: 'State level selection', documents: ['Selection test documents'], timeline: '1 month' }
                            ],
                            contactInfo: {
                                website: 'scholarships.gov.in',
                                helpline: '011-26562188',
                                office: 'District Education Office'
                            },
                            amount: 'Rs. 12,000 annually',
                            deadline: 'October-November every year'
                        },
                        {
                            name: 'Kasturba Gandhi Balika Vidyalaya',
                            type: 'hostel',
                            eligibility: ['Girls from SC/ST/OBC/BPL communities', 'Dropout girls', 'Age 10-14 years'],
                            benefits: 'Free education, hostel, books, uniforms',
                            applicationProcess: [
                                { step: 'Contact nearest KGBV', documents: ['Application form', 'Community certificate', 'Income proof'], timeline: '2 days' },
                                { step: 'Admission process', documents: ['Medical certificate', 'School records'], timeline: '1 week' }
                            ],
                            contactInfo: {
                                website: 'www.education.gov.in',
                                helpline: 'State education helpline',
                                office: 'District Education Office'
                            },
                            amount: 'Completely free',
                            deadline: 'Academic session start'
                        },
                        {
                            name: 'Sukanya Samriddhi Yojana',
                            type: 'financial',
                            eligibility: ['Girl child below 10 years', 'Can open 2 accounts per family', 'Indian resident'],
                            benefits: 'High interest rate savings for girl child education/marriage',
                            applicationProcess: [
                                { step: 'Open account in post office/bank', documents: ['Birth certificate', 'Parent ID', 'Address proof'], timeline: '1 day' },
                                { step: 'Start regular deposits', documents: ['Deposit slips', 'Passbook'], timeline: 'Ongoing' }
                            ],
                            contactInfo: {
                                website: 'www.sukanyasamriddhi.gov.in',
                                helpline: '1800-11-0001',
                                office: 'Post offices & authorized banks'
                            },
                            amount: 'Up to Rs. 1.5 lakh per year',
                            deadline: 'Any time before girl turns 10'
                        },
                        {
                            name: 'National Scholarship Portal',
                            type: 'scholarship',
                            eligibility: ['Students from class 1 to post-graduation', 'Based on merit and income', 'Various category-specific schemes'],
                            benefits: 'Multiple scholarships from different ministries',
                            applicationProcess: [
                                { step: 'Register on NSP portal', documents: ['Aadhar', 'Bank account', 'Educational documents'], timeline: '1 day' },
                                { step: 'Apply for eligible schemes', documents: ['Income certificate', 'Category certificate', 'Marksheets'], timeline: '2 weeks' }
                            ],
                            contactInfo: {
                                website: 'scholarships.gov.in',
                                helpline: '0120-6619540',
                                office: 'National e-Governance Division'
                            },
                            amount: 'Varies by scheme (Rs. 5,000 - 2,00,000)',
                            deadline: 'Different deadlines for different schemes'
                        },
                        {
                            name: 'Integrated Child Development Services (ICDS)',
                            type: 'education',
                            eligibility: ['Children 0-6 years', 'Pregnant women', 'Lactating mothers'],
                            benefits: 'Free preschool education, nutrition, health check-ups',
                            applicationProcess: [
                                { step: 'Register at Anganwadi center', documents: ['Birth certificate', 'Address proof'], timeline: '1 day' },
                                { step: 'Attend regular check-ups', documents: ['Health card', 'Growth chart'], timeline: 'Ongoing' }
                            ],
                            contactInfo: {
                                website: 'www.wcd.nic.in',
                                helpline: '1091',
                                office: 'Local Anganwadi centers'
                            },
                            amount: 'Free services',
                            deadline: 'Any time during pregnancy or before child turns 6'
                        }
                    ]
                }
            ];
            setSchemesData(mockData);
        } finally {
            setLoading(false);
        }
    };

    const getAllSchemes = () => {
        const allSchemes = [];
        schemesData.forEach(module => {
            if (module.governmentSchemes) {
                allSchemes.push(...module.governmentSchemes);
            }
        });
        return allSchemes;
    };

    const getFilteredSchemes = () => {
        let schemes = getAllSchemes();
        
        // Filter by type
        if (filterType !== 'all') {
            schemes = schemes.filter(scheme => scheme.type === filterType);
        }
        
        // Filter by search query
        if (searchQuery) {
            schemes = schemes.filter(scheme => 
                scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                scheme.benefits.toLowerCase().includes(searchQuery.toLowerCase()) ||
                scheme.eligibility.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }
        
        return schemes;
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'scholarship': return 'bg-blue-100 text-blue-800';
            case 'hostel': return 'bg-green-100 text-green-800';
            case 'financial': return 'bg-purple-100 text-purple-800';
            case 'education': return 'bg-orange-100 text-orange-800';
            case 'healthcare': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'scholarship': return 'graduation-cap';
            case 'hostel': return 'home';
            case 'financial': return 'rupee';
            case 'education': return 'book';
            case 'healthcare': return 'heart';
            default: return 'help-circle';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
            </div>
        );
    }

    const filteredSchemes = getFilteredSchemes();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8 text-green-800">
                Government Schemes for Children
            </h1>

            {/* Search and Filter Section */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Search Schemes
                        </label>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name, benefits, or eligibility..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Filter by Type
                        </label>
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        >
                            <option value="all">All Schemes</option>
                            <option value="scholarship">Scholarships</option>
                            <option value="hostel">Hostels</option>
                            <option value="financial">Financial Support</option>
                            <option value="education">Education</option>
                            <option value="healthcare">Healthcare</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600">
                        {getAllSchemes().filter(s => s.type === 'scholarship').length}
                    </div>
                    <div className="text-sm text-blue-800">Scholarships</div>
                </div>
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-green-600">
                        {getAllSchemes().filter(s => s.type === 'hostel').length}
                    </div>
                    <div className="text-sm text-green-800">Hostels</div>
                </div>
                <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-purple-600">
                        {getAllSchemes().filter(s => s.type === 'financial').length}
                    </div>
                    <div className="text-sm text-purple-800">Financial Aid</div>
                </div>
                <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-orange-600">
                        {getAllSchemes().filter(s => s.type === 'education').length}
                    </div>
                    <div className="text-sm text-orange-800">Education</div>
                </div>
            </div>

            {/* Schemes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSchemes.map((scheme, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(scheme.type)}`}>
                                    {scheme.type.charAt(0).toUpperCase() + scheme.type.slice(1)}
                                </span>
                                <div className="text-green-600 font-bold">
                                    {scheme.amount}
                                </div>
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-800 mb-3">{scheme.name}</h3>
                            
                            <div className="mb-4">
                                <h4 className="font-semibold text-gray-700 mb-2">Benefits:</h4>
                                <p className="text-gray-600 text-sm">{scheme.benefits}</p>
                            </div>

                            <div className="mb-4">
                                <h4 className="font-semibold text-gray-700 mb-2">Eligibility:</h4>
                                <ul className="space-y-1">
                                    {scheme.eligibility.slice(0, 3).map((eligibility, idx) => (
                                        <li key={idx} className="flex items-start space-x-2">
                                            <span className="text-green-600 mt-1 text-xs">·</span>
                                            <span className="text-gray-600 text-xs">{eligibility}</span>
                                        </li>
                                    ))}
                                    {scheme.eligibility.length > 3 && (
                                        <li className="text-gray-500 text-xs italic">
                                            +{scheme.eligibility.length - 3} more...
                                        </li>
                                    )}
                                </ul>
                            </div>

                            <div className="mb-4">
                                <h4 className="font-semibold text-gray-700 mb-2">Deadline:</h4>
                                <p className="text-gray-600 text-sm">{scheme.deadline}</p>
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setSelectedScheme(scheme)}
                                    className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                                >
                                    View Details
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedScheme(scheme);
                                        setShowApplicationForm(true);
                                    }}
                                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                >
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredSchemes.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No schemes found matching your criteria.</p>
                </div>
            )}

            {/* Scheme Details Modal */}
            {selectedScheme && !showApplicationForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
                        <div className="flex justify-between items-start mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">{selectedScheme.name}</h2>
                            <button
                                onClick={() => setSelectedScheme(null)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3">Eligibility Criteria</h3>
                                <ul className="space-y-2">
                                    {selectedScheme.eligibility.map((eligibility, index) => (
                                        <li key={index} className="flex items-start space-x-2">
                                            <span className="text-green-600 mt-1">·</span>
                                            <span className="text-gray-700">{eligibility}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3">Application Process</h3>
                                <div className="space-y-3">
                                    {selectedScheme.applicationProcess.map((step, index) => (
                                        <div key={index} className="bg-gray-50 rounded-lg p-3">
                                            <h4 className="font-medium text-gray-800">{step.step}</h4>
                                            <p className="text-gray-600 text-sm mt-1">Timeline: {step.timeline}</p>
                                            <div className="mt-2">
                                                <span className="text-xs text-gray-500">Documents:</span>
                                                <ul className="list-disc list-inside text-xs text-gray-600 mt-1">
                                                    {step.documents.map((doc, idx) => (
                                                        <li key={idx}>{doc}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-green-50 rounded-lg p-4">
                                <h4 className="font-semibold text-green-800 mb-2">Benefits</h4>
                                <p className="text-green-700">{selectedScheme.benefits}</p>
                            </div>
                            <div className="bg-blue-50 rounded-lg p-4">
                                <h4 className="font-semibold text-blue-800 mb-2">Amount</h4>
                                <p className="text-blue-700">{selectedScheme.amount}</p>
                            </div>
                            <div className="bg-orange-50 rounded-lg p-4">
                                <h4 className="font-semibold text-orange-800 mb-2">Deadline</h4>
                                <p className="text-orange-700">{selectedScheme.deadline}</p>
                            </div>
                        </div>

                        <div className="mt-6 bg-gray-50 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 mb-3">Contact Information</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div>
                                    <span className="font-medium">Website:</span>
                                    <a href={selectedScheme.contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                                        {selectedScheme.contactInfo.website}
                                    </a>
                                </div>
                                <div>
                                    <span className="font-medium">Helpline:</span>
                                    <span className="text-gray-700 ml-1">{selectedScheme.contactInfo.helpline}</span>
                                </div>
                                <div>
                                    <span className="font-medium">Office:</span>
                                    <span className="text-gray-700 ml-1">{selectedScheme.contactInfo.office}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex space-x-4">
                            <button
                                onClick={() => setShowApplicationForm(true)}
                                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Start Application
                            </button>
                            <button
                                onClick={() => setSelectedScheme(null)}
                                className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Application Form Modal */}
            {showApplicationForm && selectedScheme && (
                <ApplicationForm
                    scheme={selectedScheme}
                    onClose={() => {
                        setShowApplicationForm(false);
                        setSelectedScheme(null);
                    }}
                />
            )}
        </div>
    );
};

// Application Form Component
const ApplicationForm = ({ scheme, onClose }) => {
    const [formData, setFormData] = useState({
        childName: '',
        childAge: '',
        parentName: '',
        parentOccupation: '',
        address: '',
        phone: '',
        email: '',
        income: '',
        category: 'general',
        documents: {}
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [submittedDocuments, setSubmittedDocuments] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDocumentUpload = (docName) => {
        setSubmittedDocuments(prev => [...prev, docName]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would normally submit the application
        alert('Application submitted successfully! We will contact you soon.');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Application: {scheme.name}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-center mb-6">
                    <div className="flex space-x-2">
                        {[1, 2, 3].map((step) => (
                            <button
                                key={step}
                                onClick={() => setCurrentStep(step)}
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                                    currentStep === step
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                }`}
                            >
                                {step}
                            </button>
                        ))}
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Step 1: Basic Information */}
                    {currentStep === 1 && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Child's Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="childName"
                                        value={formData.childName}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Child's Age *
                                    </label>
                                    <input
                                        type="number"
                                        name="childAge"
                                        value={formData.childAge}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Parent/Guardian Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="parentName"
                                        value={formData.parentName}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Parent Occupation *
                                    </label>
                                    <input
                                        type="text"
                                        name="parentOccupation"
                                        value={formData.parentOccupation}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Address *
                                </label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 2: Financial Information */}
                    {currentStep === 2 && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Financial Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Annual Family Income (Rs.) *
                                    </label>
                                    <input
                                        type="number"
                                        name="income"
                                        value={formData.income}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Category *
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                        required
                                    >
                                        <option value="general">General</option>
                                        <option value="sc">Scheduled Caste (SC)</option>
                                        <option value="st">Scheduled Tribe (ST)</option>
                                        <option value="obc">Other Backward Classes (OBC)</option>
                                        <option value="bpl">Below Poverty Line (BPL)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                                <h4 className="font-semibold text-blue-800 mb-2">Required Documents for {scheme.name}</h4>
                                <div className="space-y-2">
                                    {scheme.applicationProcess.flatMap(step => step.documents).map((doc, index) => (
                                        <label key={index} className="flex items-center space-x-3 p-2 bg-white rounded-lg">
                                            <input
                                                type="checkbox"
                                                checked={submittedDocuments.includes(doc)}
                                                onChange={() => handleDocumentUpload(doc)}
                                                className="w-4 h-4 text-green-600"
                                            />
                                            <span className="text-gray-700">{doc}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Review and Submit */}
                    {currentStep === 3 && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Review Application</h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="font-semibold text-gray-800 mb-3">Application Details</h4>
                                <div className="space-y-2 text-sm">
                                    <div><span className="font-medium">Child Name:</span> {formData.childName}</div>
                                    <div><span className="font-medium">Age:</span> {formData.childAge} years</div>
                                    <div><span className="font-medium">Parent:</span> {formData.parentName}</div>
                                    <div><span className="font-medium">Phone:</span> {formData.phone}</div>
                                    <div><span className="font-medium">Income:</span> Rs. {formData.income}</div>
                                    <div><span className="font-medium">Category:</span> {formData.category}</div>
                                </div>
                            </div>

                            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                                <h4 className="font-semibold text-green-800 mb-2">Scheme Information</h4>
                                <div className="space-y-1 text-sm">
                                    <div><span className="font-medium">Benefits:</span> {scheme.benefits}</div>
                                    <div><span className="font-medium">Amount:</span> {scheme.amount}</div>
                                    <div><span className="font-medium">Deadline:</span> {scheme.deadline}</div>
                                </div>
                            </div>

                            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                                <h4 className="font-semibold text-yellow-800 mb-2">Next Steps</h4>
                                <ol className="list-decimal list-inside text-sm text-yellow-700 space-y-1">
                                    <li>Submit application with required documents</li>
                                    <li>Wait for verification process</li>
                                    <li>Receive approval notification</li>
                                    <li>Collect benefits as per scheme guidelines</li>
                                </ol>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-6">
                        <button
                            type="button"
                            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                            disabled={currentStep === 1}
                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        {currentStep === 3 ? (
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Submit Application
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Next
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GovernmentSchemes;
