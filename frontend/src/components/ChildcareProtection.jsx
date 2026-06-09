import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
    getAllChildcareProtectionModules, 
    getModulesByCategory, 
    getSchoolEnrollmentGuide,
    getGovernmentSchemes,
    getChildRightsFramework,
    getExploitationPrevention
} from '../utils/childcareProtectionApi';
import RTEEligibilityChecker from './RTEEligibilityChecker';
import SchoolFinder from './SchoolFinder';
import ChildProtectionDocuments from './ChildProtectionDocuments';

// Mock data functions
const getMockChildcareData = () => [
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
        },
        difficulty: 'intermediate',
        estimatedTime: '2-3 weeks',
        tags: ['RTE', 'school', 'enrollment', 'education', '25%']
    },
    {
        _id: '2',
        title: 'Government Schemes for Children',
        category: 'government-schemes',
        description: 'Comprehensive guide to scholarships, hostels, and financial aid for children',
        scenario: 'You need financial support for your child\'s education and living expenses',
        actionableSteps: [
            {
                stepNumber: 1,
                title: 'Identify Eligible Schemes',
                description: 'Find government schemes your child qualifies for based on category and need',
                urgency: 'urgent',
                timeEstimate: '1-2 hours',
                documents: ['Income proof', 'Category certificate', 'Educational records'],
                authorities: ['District social welfare office', 'Education department']
            },
            {
                stepNumber: 2,
                title: 'Prepare Application Documents',
                description: 'Gather and prepare all required documents for scheme applications',
                urgency: 'urgent',
                timeEstimate: '2-3 days',
                documents: ['Income certificate', 'Residence proof', 'Educational certificates', 'Bank account'],
                authorities: ['Tehsil office', 'School authorities', 'Bank']
            },
            {
                stepNumber: 3,
                title: 'Apply for Scholarships',
                description: 'Submit scholarship applications for financial educational support',
                urgency: 'urgent',
                timeEstimate: '4-5 hours',
                documents: ['Scholarship forms', 'Academic records', 'Income proof'],
                authorities: ['School scholarship committee', 'Education department']
            },
            {
                stepNumber: 4,
                title: 'Apply for Hostel Facilities',
                description: 'Apply for government hostel accommodation if needed',
                urgency: 'normal',
                timeEstimate: '2-3 hours',
                documents: ['Hostel application', 'Income proof', 'Distance certificate'],
                authorities: ['Hostel warden', 'Social welfare department']
            }
        ],
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
            }
        ],
        difficulty: 'beginner',
        estimatedTime: '1-2 weeks',
        tags: ['schemes', 'scholarship', 'hostel', 'financial', 'support']
    },
    {
        _id: '3',
        title: 'Child Rights Legal Framework',
        category: 'child-rights',
        description: 'Understanding legal rights and protections for children',
        scenario: 'You need to know what legal protections exist for your child',
        actionableSteps: [
            {
                stepNumber: 1,
                title: 'Understand Constitutional Rights',
                description: 'Learn about fundamental rights guaranteed to children',
                urgency: 'normal',
                timeEstimate: '1-2 hours',
                documents: ['Constitution provisions', 'Legal guides'],
                authorities: ['Legal aid clinics', 'Child rights organizations']
            },
            {
                stepNumber: 2,
                title: 'Know Child Labor Laws',
                description: 'Understand what work is prohibited for children',
                urgency: 'urgent',
                timeEstimate: '2-3 hours',
                documents: ['Child Labor Act provisions', 'Age-appropriate work guidelines'],
                authorities: ['Labor department', 'Child protection services']
            },
            {
                stepNumber: 3,
                title: 'Learn About Education Rights',
                description: 'Know the right to free and compulsory education',
                urgency: 'urgent',
                timeEstimate: '1-2 hours',
                documents: ['RTE Act provisions', 'Education rights guide'],
                authorities: ['Education department', 'School authorities']
            }
        ],
        legalFramework: {
            constitutionalRights: [
                {
                    article: 'Article 21A',
                    title: 'Right to Education',
                    description: 'Free and compulsory education for all children aged 6-14 years',
                    implications: 'Government must provide free education in neighborhood schools'
                },
                {
                    article: 'Article 24',
                    title: 'Prohibition of Child Labor',
                    description: 'Prohibition of employment of children below 14 years in hazardous occupations',
                    implications: 'Employers cannot hire children for dangerous work'
                },
                {
                    article: 'Article 21',
                    title: 'Right to Life and Personal Liberty',
                    description: 'Includes right to live with human dignity and protection from exploitation',
                    implications: 'Children have right to protection from abuse and exploitation'
                }
            ],
            acts: [
                {
                    name: 'Right to Education Act',
                    year: 2009,
                    keyProvisions: ['25% reservation in private schools', 'No admission tests', 'No capitation fees', 'Free textbooks and uniforms'],
                    penalties: ['Fine up to Rs. 1 lakh for schools violating provisions', 'Cancellation of recognition'],
                    implementation: 'School Management Committees and Education Department'
                },
                {
                    name: 'Child Labor (Prohibition and Regulation) Act',
                    year: 1986,
                    keyProvisions: ['Prohibits child labor below 14 years', 'Regulates adolescent labor (14-18 years)', 'Lists hazardous occupations'],
                    penalties: ['Imprisonment up to 2 years', 'Fine up to Rs. 50,000'],
                    implementation: 'Labor Department and Child Welfare Committees'
                },
                {
                    name: 'Juvenile Justice (Care and Protection) Act',
                    year: 2015,
                    keyProvisions: ['Special courts for juveniles', 'Rehabilitation focus', 'Protection from exploitation'],
                    penalties: ['Special provisions for offenses against children', 'Enhanced punishment'],
                    implementation: 'Juvenile Justice Boards and Child Welfare Committees'
                }
            ],
            childProtectionLaws: [
                {
                    law: 'Child Marriage Restraint Act',
                    ageLimit: '18 years for girls, 21 years for boys',
                    restrictions: ['No marriage below legal age', 'Punishment for promoting child marriage'],
                    penalties: ['Imprisonment up to 2 years', 'Fine up to Rs. 1 lakh']
                },
                {
                    law: 'Protection of Children from Sexual Offenses (POCSO) Act',
                    ageLimit: 'Below 18 years',
                    restrictions: ['Strict punishment for sexual offenses', 'Special courts for speedy trial'],
                    penalties: ['Minimum 7 years imprisonment', 'Up to life imprisonment for grave offenses']
                }
            ]
        },
        difficulty: 'intermediate',
        estimatedTime: '4-6 hours',
        tags: ['rights', 'legal', 'constitution', 'protection', 'laws']
    },
    {
        _id: '4',
        title: 'Exploitation Prevention & Child Protection',
        category: 'exploitation-prevention',
        description: 'How to identify, prevent, and report child exploitation',
        scenario: 'You suspect a child is being exploited or needs protection',
        actionableSteps: [
            {
                stepNumber: 1,
                title: 'Identify Warning Signs',
                description: 'Learn to recognize signs of child exploitation and abuse',
                urgency: 'immediate',
                timeEstimate: '30 minutes',
                documents: ['Warning signs checklist', 'Identification guide'],
                authorities: ['Child protection services', 'NGOs']
            },
            {
                stepNumber: 2,
                title: 'Report Safely',
                description: 'Report suspected exploitation through proper channels',
                urgency: 'immediate',
                timeEstimate: '15-30 minutes',
                documents: ['Incident report form', 'Evidence collection'],
                authorities: ['Child helpline 1098', 'Police', 'Child welfare committee']
            },
            {
                stepNumber: 3,
                title: 'Seek Immediate Help',
                description: 'Contact emergency services for immediate protection',
                urgency: 'immediate',
                timeEstimate: '5-10 minutes',
                documents: ['Emergency contacts', 'Location details'],
                authorities: ['Police 100', 'Child helpline 1098', 'Women helpline 181']
            },
            {
                stepNumber: 4,
                title: 'Follow Legal Process',
                description: 'Ensure proper legal action and follow-up',
                urgency: 'urgent',
                timeEstimate: '1-2 days',
                documents: ['FIR copy', 'Legal documents', 'Medical reports'],
                authorities: ['Police station', 'Legal aid', 'Child welfare committee']
            }
        ],
        exploitationPrevention: {
            identification: [
                {
                    sign: 'Physical abuse signs',
                    description: 'Unexplained injuries, bruises, frequent accidents',
                    warningSigns: ['Injuries inconsistent with explanation', 'Fear of adults', 'Aggressive behavior', 'Withdrawn behavior']
                },
                {
                    sign: 'Educational neglect',
                    description: 'Frequent school absence, poor performance',
                    warningSigns: ['Irregular attendance', 'Poor hygiene', 'Fatigue', 'Inappropriate clothing']
                },
                {
                    sign: 'Sexual abuse indicators',
                    description: 'Behavioral changes, inappropriate knowledge',
                    warningSigns: ['Sudden mood changes', 'Sexual behavior knowledge', 'Nightmares', 'Avoiding specific person']
                }
            ],
            reporting: [
                {
                    channel: 'Child Helpline 1098',
                    anonymous: true,
                    contact: '1098 (24/7 toll-free)',
                    process: 'Call and provide details, identity protected'
                },
                {
                    channel: 'Police Station',
                    anonymous: false,
                    contact: '100 or nearest police station',
                    process: 'File FIR, provide evidence, get copy'
                },
                {
                    channel: 'Child Welfare Committee',
                    anonymous: true,
                    contact: 'District Child Welfare Office',
                    process: 'Submit written complaint, investigation initiated'
                }
            ],
            rescue: [
                {
                    organization: 'Childline India Foundation',
                    helpline: '1098',
                    process: 'Immediate response, rescue team dispatch',
                    immediateActions: ['Call 1098', 'Provide location', 'Stay with child', 'Document evidence']
                },
                {
                    organization: 'National Commission for Protection of Child Rights',
                    helpline: '011-26562188',
                    process: 'Complaint registration, legal action',
                    immediateActions: ['File complaint', 'Submit evidence', 'Follow up regularly']
                }
            ],
            rehabilitation: [
                {
                    service: 'Counseling',
                    provider: 'Child psychologists, NGOs',
                    process: 'Regular therapy sessions, trauma recovery',
                    duration: '6-12 months'
                },
                {
                    service: 'Educational support',
                    provider: 'Schools, NGOs',
                    process: 'Bridge courses, special coaching',
                    duration: 'Ongoing'
                },
                {
                    service: 'Legal aid',
                    provider: 'Legal aid clinics, NGOs',
                    process: 'Free legal representation, court procedures',
                    duration: 'Case duration'
                }
            ],
            legalAction: [
                {
                    action: 'File FIR',
                    process: 'Visit police station, file First Information Report',
                    timeline: 'Immediately',
                    requiredEvidence: ['Witness statements', 'Medical reports', 'Photographs', 'Documents']
                },
                {
                    action: 'Court Proceedings',
                    process: 'Legal representation, evidence presentation',
                    timeline: '6 months to 2 years',
                    requiredEvidence: ['Medical reports', 'Witness testimonies', 'Expert opinions', 'Documentation']
                }
            ]
        },
        difficulty: 'advanced',
        estimatedTime: 'Immediate action required',
        tags: ['protection', 'exploitation', 'prevention', 'rescue', 'legal']
    }
];

const getMockHelplines = () => [
    {
        name: 'Child Helpline',
        number: '1098',
        available: '24/7',
        purpose: 'Child protection, rescue, and counseling services'
    },
    {
        name: 'Women Helpline',
        number: '181',
        available: '24/7',
        purpose: 'Women and child protection, emergency assistance'
    },
    {
        name: 'Police Emergency',
        number: '100',
        available: '24/7',
        purpose: 'Emergency police assistance for immediate danger'
    },
    {
        name: 'Education Department',
        number: 'State-specific',
        available: 'Office hours',
        purpose: 'School enrollment and education-related queries'
    }
];

const ChildcareProtection = () => {
    const [modules, setModules] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const [emergencyHelplines, setEmergencyHelplines] = useState([]);
    const [schoolEnrollmentGuide, setSchoolEnrollmentGuide] = useState([]);
    const [governmentSchemes, setGovernmentSchemes] = useState([]);
    const [childRights, setChildRights] = useState([]);
    const [exploitationPrevention, setExploitationPrevention] = useState([]);
    const [showEligibilityChecker, setShowEligibilityChecker] = useState(false);
    const [showSchoolFinder, setShowSchoolFinder] = useState(false);

    const categories = [
        { value: 'all', label: 'All Modules' },
        { value: 'school-enrollment', label: 'School Enrollment (RTE)' },
        { value: 'government-schemes', label: 'Government Schemes' },
        { value: 'child-rights', label: 'Child Rights Legal Framework' },
        { value: 'exploitation-prevention', label: 'Exploitation Prevention' }
    ];

    useEffect(() => {
        // Initialize with mock data immediately
        setModules(getMockChildcareData());
        setEmergencyHelplines(getMockHelplines());
        setSchoolEnrollmentGuide(getMockChildcareData().filter(m => m.category === 'school-enrollment'));
        setGovernmentSchemes(getMockChildcareData().filter(m => m.category === 'government-schemes'));
        setChildRights(getMockChildcareData().filter(m => m.category === 'child-rights'));
        setExploitationPrevention(getMockChildcareData().filter(m => m.category === 'exploitation-prevention'));
        setLoading(false);
        
        // Try to fetch real data
        fetchModules();
        fetchEmergencyHelplines();
        fetchSchoolEnrollmentGuide();
        fetchGovernmentSchemes();
        fetchChildRights();
        fetchExploitationPrevention();
    }, []);

    const fetchModules = async () => {
        try {
            setLoading(true);
            const data = selectedCategory === 'all' 
                ? await getAllChildcareProtectionModules()
                : await getModulesByCategory(selectedCategory);
            setModules(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching modules:', error);
            const mockData = selectedCategory === 'all' ? getMockChildcareData() : getMockChildcareData().filter(m => m.category === selectedCategory);
            setModules(Array.isArray(mockData) ? mockData : []);
        } finally {
            setLoading(false);
        }
    };

    const fetchEmergencyHelplines = async () => {
        try {
            const data = await getExploitationPrevention();
            setEmergencyHelplines(Array.isArray(data) ? data : getMockHelplines());
        } catch (error) {
            console.error('Error fetching helplines:', error);
            setEmergencyHelplines(getMockHelplines());
        }
    };

    const fetchSchoolEnrollmentGuide = async () => {
        try {
            const data = await getSchoolEnrollmentGuide();
            setSchoolEnrollmentGuide(Array.isArray(data) ? data : getMockChildcareData().filter(m => m.category === 'school-enrollment'));
        } catch (error) {
            console.error('Error fetching school enrollment guide:', error);
            setSchoolEnrollmentGuide(getMockChildcareData().filter(m => m.category === 'school-enrollment'));
        }
    };

    const fetchGovernmentSchemes = async () => {
        try {
            const data = await getGovernmentSchemes();
            setGovernmentSchemes(Array.isArray(data) ? data : getMockChildcareData().filter(m => m.category === 'government-schemes'));
        } catch (error) {
            console.error('Error fetching government schemes:', error);
            setGovernmentSchemes(getMockChildcareData().filter(m => m.category === 'government-schemes'));
        }
    };

    const fetchChildRights = async () => {
        try {
            const data = await getChildRightsFramework();
            setChildRights(Array.isArray(data) ? data : getMockChildcareData().filter(m => m.category === 'child-rights'));
        } catch (error) {
            console.error('Error fetching child rights:', error);
            setChildRights(getMockChildcareData().filter(m => m.category === 'child-rights'));
        }
    };

    const fetchExploitationPrevention = async () => {
        try {
            const data = await getExploitationPrevention();
            setExploitationPrevention(Array.isArray(data) ? data : getMockChildcareData().filter(m => m.category === 'exploitation-prevention'));
        } catch (error) {
            console.error('Error fetching exploitation prevention:', error);
            setExploitationPrevention(getMockChildcareData().filter(m => m.category === 'exploitation-prevention'));
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

    const { t } = useTranslation();

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8 text-purple-800">
                {t('childcare.title')}
            </h1>

            {/* Emergency Helplines Section */}
            <div className="mb-8 bg-red-50 border-2 border-red-200 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-red-800 mb-4">{t('childcare.emergencyHelplines')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

            {/* Category Filter */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by Category:
                </label>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                    {categories.map(category => (
                        <option key={category.value} value={category.value}>
                            {category.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Child Protection Documents Section */}
            <ChildProtectionDocuments />

            {/* Quick Actions Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-purple-800 mb-4">RTE Eligibility Checker</h3>
                    <p className="text-purple-700 mb-4">Check if your child qualifies for RTE benefits</p>
                    <button
                        onClick={() => setShowEligibilityChecker(!showEligibilityChecker)}
                        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        Check Eligibility
                    </button>
                </div>
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-blue-800 mb-4">Find Nearby Schools</h3>
                    <p className="text-blue-700 mb-4">Locate schools with RTE quota near you</p>
                    <button
                        onClick={() => setShowSchoolFinder(!showSchoolFinder)}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Find Schools
                    </button>
                </div>
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-green-800 mb-4">Document Checklist</h3>
                    <p className="text-green-700 mb-4">List of all required documents</p>
                    <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                        View Documents
                    </button>
                </div>
                <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-orange-800 mb-4">Apply for Schemes</h3>
                    <p className="text-orange-700 mb-4">Online application for government schemes</p>
                    <button className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors">
                        Apply Now
                    </button>
                </div>
            </div>

            {/* RTE Eligibility Checker Section */}
            {showEligibilityChecker && (
                <div className="mb-8">
                    <RTEEligibilityChecker />
                </div>
            )}

            {/* School Finder Section */}
            {showSchoolFinder && (
                <div className="mb-8">
                    <SchoolFinder />
                </div>
            )}

            {/* Featured Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* School Enrollment Section */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-blue-800 mb-4">School Enrollment (RTE Act)</h2>
                    <div className="space-y-4">
                        {schoolEnrollmentGuide.slice(0, 1).map((module) => (
                            <div key={module._id}>
                                <h3 className="font-semibold text-blue-700 mb-2">{module.title}</h3>
                                <p className="text-blue-600 mb-3">{module.description}</p>
                                <div className="bg-white rounded-lg p-4">
                                    <h4 className="font-medium text-gray-800 mb-2">Key Features:</h4>
                                    <ul className="space-y-1 text-sm text-gray-600">
                                        <li>25% Free Seats in Private Schools</li>
                                        <li>No Admission Tests Required</li>
                                        <li>Free Books & Uniforms</li>
                                        <li>Transportation Allowance</li>
                                    </ul>
                                </div>
                                <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                    View Complete Guide
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Government Schemes Section */}
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-green-800 mb-4">Government Schemes</h2>
                    <div className="space-y-4">
                        {governmentSchemes.slice(0, 1).map((module) => (
                            <div key={module._id}>
                                <h3 className="font-semibold text-green-700 mb-2">{module.title}</h3>
                                <p className="text-green-600 mb-3">{module.description}</p>
                                <div className="bg-white rounded-lg p-4">
                                    <h4 className="font-medium text-gray-800 mb-2">Popular Schemes:</h4>
                                    <ul className="space-y-1 text-sm text-gray-600">
                                        <li>Balika Samridhi Yojana - Rs. 25,500</li>
                                        <li>National Scholarship - Rs. 12,000/year</li>
                                        <li>KGBV Hostels - Free accommodation</li>
                                        <li>Sukanya Samriddhi - Girl child savings</li>
                                    </ul>
                                </div>
                                <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                                    View All Schemes
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
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
                                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
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
    );
};

export default ChildcareProtection;
