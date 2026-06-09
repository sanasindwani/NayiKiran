import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, FileText, CheckCircle, AlertCircle, Clock, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ChildcareApply = () => {
  const { t } = useTranslation();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [submittedApplications, setSubmittedApplications] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    childName: '',
    dateOfBirth: '',
    gender: '',
    parentName: '',
    address: '',
    phone: '',
    email: ''
  });

  const applicationTypes = [
    {
      id: 'rte-admission',
      title: 'RTE School Admission',
      description: 'Apply for 25% reservation in private schools',
      icon: 'school',
      deadline: 'March 31, 2024',
      status: 'open',
      documents: ['Birth Certificate', 'Income Certificate', 'Address Proof', 'Aadhar Card'],
      benefits: ['Free Education', 'Books & Uniform', 'Transport Allowance']
    },
    {
      id: 'government-scheme',
      title: 'Government Scholarship',
      description: 'Apply for various government scholarships and schemes',
      icon: 'scholarship',
      deadline: 'April 15, 2024',
      status: 'open',
      documents: ['Income Certificate', 'Caste Certificate', 'Bank Details', 'Marksheet'],
      benefits: ['Financial Assistance', 'Fee Waiver', 'Book Allowance']
    },
    {
      id: 'special-needs',
      title: 'Special Education Support',
      description: 'Apply for special education provisions and support',
      icon: 'special',
      deadline: 'May 30, 2024',
      status: 'open',
      documents: ['Disability Certificate', 'Medical Report', 'Income Certificate'],
      benefits: ['Special Educators', 'Assistive Devices', 'Therapy Support']
    },
    {
      id: 'legal-aid',
      title: 'Legal Aid Application',
      description: 'Apply for free legal assistance and support',
      icon: 'legal',
      deadline: 'Ongoing',
      status: 'open',
      documents: ['Complaint Copy', 'Income Certificate', 'Address Proof'],
      benefits: ['Free Legal Counsel', 'Court Representation', 'Documentation Support']
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'text-green-600 bg-green-100';
      case 'closed': return 'text-red-600 bg-red-100';
      case 'upcoming': return 'text-yellow-600 bg-yellow-100';
      case 'submitted': return 'text-blue-600 bg-blue-100';
      case 'under-review': return 'text-orange-600 bg-orange-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submitApplication = () => {
    const application = applicationTypes.find(app => app.id === selectedApplication);
    const newApplication = {
      id: Date.now(),
      type: application.id,
      title: application.title,
      formData: { ...formData },
      submittedDate: new Date().toISOString(),
      status: 'submitted',
      currentStep: 1,
      documents: application.documents,
      benefits: application.benefits
    };

    setSubmittedApplications(prev => [...prev, newApplication]);
    setSelectedApplication(null);
    setCurrentStep(1);
    setFormData({
      childName: '',
      dateOfBirth: '',
      gender: '',
      parentName: '',
      address: '',
      phone: '',
      email: ''
    });

    // Show success message
    alert('Application submitted successfully! You can track its status in "Your Applications" section.');
  };

  const renderSubmittedApplications = () => {
    if (submittedApplications.length === 0) {
      return (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">No Applications Yet</h4>
          <p className="text-gray-600 mb-4">
            Start by applying for one of the available programs above.
          </p>
          <Link 
            to="/childcare-protection/eligibility"
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Check Eligibility First
            <ArrowLeft className="w-4 h-4 ml-2 transform rotate-180" />
          </Link>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {submittedApplications.map((app) => (
          <div key={app.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{app.title}</h4>
                <p className="text-sm text-gray-600">
                  Submitted on {new Date(app.submittedDate).toLocaleDateString()}
                </p>
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(app.status)}`}>
                {app.status.replace('-', ' ').toUpperCase()}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Application Progress</span>
                <span className="text-sm font-medium text-purple-600">Step {app.currentStep} of 4</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${(app.currentStep / 4) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Application Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h5 className="text-sm font-medium text-gray-900 mb-2">Applicant Details</h5>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><strong>Child:</strong> {app.formData.childName}</p>
                  <p><strong>Parent:</strong> {app.formData.parentName}</p>
                  <p><strong>Contact:</strong> {app.formData.phone}</p>
                </div>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-900 mb-2">Next Steps</h5>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Document verification in progress</p>
                  <p>Expected completion: 7-10 working days</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <button className="px-4 py-2 text-sm text-purple-600 hover:text-purple-800">
                View Details
              </button>
              <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
                Download Receipt
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderApplicationForm = () => {
    if (!selectedApplication) return null;

    const application = applicationTypes.find(app => app.id === selectedApplication);

    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Application: {application.title}</h3>
          <button
            onClick={() => setSelectedApplication(null)}
            className="text-gray-400 hover:text-gray-600"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>

        {/* Application Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Application Progress</span>
            <span className="text-sm font-medium text-purple-600">Step {currentStep} of 4</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${(currentStep / 4) * 100}%` }}></div>
          </div>
        </div>

        {/* Form Steps */}
        <div className="space-y-6">
          {/* Step 1: Basic Information */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-4">Step 1: Basic Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Child's Name *</label>
                <input
                  type="text"
                  name="childName"
                  value={formData.childName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter child's full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                <select 
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parent/Guardian Name *</label>
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter parent/guardian name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter email address"
                />
              </div>
            </div>
          </div>

          {/* Document Checklist */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-4">Required Documents</h4>
            <div className="space-y-2">
              {application.documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 text-gray-600 mr-2" />
                    <span className="text-sm text-gray-700">{doc}</span>
                  </div>
                  <button className="px-3 py-1 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                    Upload
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Overview */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-900 mb-3">Benefits You'll Receive</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {application.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-purple-600 mr-2" />
                  <span className="text-sm text-purple-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              onClick={() => setSelectedApplication(null)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <div className="flex space-x-2">
              <button 
                onClick={() => setCurrentStep(Math.min(currentStep + 1, 4))}
                className="px-6 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50"
              >
                {currentStep < 4 ? 'Continue' : 'Review'}
              </button>
              {currentStep === 4 && (
                <button 
                  onClick={submitApplication}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Application
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/childcare-protection"
            className="flex items-center text-purple-600 hover:text-purple-800 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Child Protection
          </Link>
          <div className="mt-4">
            <h1 className="text-3xl font-bold text-gray-900">Apply Now</h1>
            <p className="text-gray-600">Submit applications for school enrollment and government schemes</p>
          </div>
        </div>

        {selectedApplication ? (
          renderApplicationForm()
        ) : (
          <>
            {/* Application Types Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {applicationTypes.map((application) => (
                <div
                  key={application.id}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedApplication(application.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{application.title}</h3>
                      <p className="text-gray-600 mb-4">{application.description}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(application.status)}`}>
                      {application.status}
                    </span>
                  </div>

                  {/* Deadline */}
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Deadline: {application.deadline}</span>
                  </div>

                  {/* Documents Required */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Documents Required:</h4>
                    <div className="flex flex-wrap gap-1">
                      {application.documents.slice(0, 3).map((doc, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                          {doc}
                        </span>
                      ))}
                      {application.documents.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                          +{application.documents.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Benefits:</h4>
                    <div className="space-y-1">
                      {application.benefits.slice(0, 2).map((benefit, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
                    <Send className="w-4 h-4 mr-2" />
                    Apply Now
                  </button>
                </div>
              ))}
            </div>

            {/* Application Status */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Your Applications</h3>
              {renderSubmittedApplications()}
            </div>
          </>
        )}

        {/* Help Section */}
        <div className="mt-8 bg-purple-50 rounded-lg p-6">
          <h3 className="font-semibold text-purple-800 mb-4">Need Help with Applications?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Application Support</h4>
              <p className="text-sm text-gray-600 mb-3">
                Get help with filling out applications and document preparation.
              </p>
              <button className="text-purple-600 text-sm hover:text-purple-800">Contact Support</button>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Document Assistance</h4>
              <p className="text-sm text-gray-600 mb-3">
                Help with obtaining and organizing required documents.
              </p>
              <button className="text-purple-600 text-sm hover:text-purple-800">Get Help</button>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Track Applications</h4>
              <p className="text-sm text-gray-600 mb-3">
                Monitor your application status and receive updates.
              </p>
              <button className="text-purple-600 text-sm hover:text-purple-800">View Status</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChildcareApply;
