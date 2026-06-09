import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, File, X, Check, AlertCircle, Clock, Download, Eye } from 'lucide-react';

const ChildProtectionDocuments = () => {
  const { t } = useTranslation();
  const [documents, setDocuments] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Child protection document categories and required documents
  const documentCategories = {
    'school-enrollment': {
      title: 'School Enrollment Documents',
      icon: 'school',
      required: [
        {
          name: 'Birth Certificate',
          description: 'Child\'s birth certificate with name and date of birth',
          urgency: 'required',
          status: 'pending'
        },
        {
          name: 'Address Proof',
          description: 'Ration card, electricity bill, or rent agreement',
          urgency: 'required',
          status: 'pending'
        },
        {
          name: 'Income Certificate',
          description: 'For RTE eligibility and fee concession',
          urgency: 'required',
          status: 'pending'
        },
        {
          name: 'Aadhar Card',
          description: 'Child and parent Aadhar cards',
          urgency: 'required',
          status: 'pending'
        },
        {
          name: 'Transfer Certificate',
          description: 'If transferring from another school',
          urgency: 'optional',
          status: 'pending'
        }
      ]
    },
    'government-schemes': {
      title: 'Government Scheme Applications',
      icon: 'government',
      required: [
        {
          name: 'Bank Account Details',
          description: 'Bank passbook or cancelled cheque for scholarship transfers',
          urgency: 'required',
          status: 'pending'
        },
        {
          name: 'Caste Certificate',
          description: 'For caste-based scholarships and reservations',
          urgency: 'required',
          status: 'pending'
        },
        {
          name: 'Disability Certificate',
          description: 'If child has any disability for special schemes',
          urgency: 'conditional',
          status: 'pending'
        },
        {
          name: 'BPL Certificate',
          description: 'Below Poverty Line certificate for financial assistance',
          urgency: 'optional',
          status: 'pending'
        }
      ]
    },
    'legal-protection': {
      title: 'Legal Protection Documents',
      icon: 'legal',
      required: [
        {
          name: 'Police Complaint Copy',
          description: 'FIR copy or complaint acknowledgment',
          urgency: 'required',
          status: 'pending'
        },
        {
          name: 'Medical Report',
          description: 'Medical examination report if applicable',
          urgency: 'required',
          status: 'pending'
        },
        {
          name: 'Witness Statements',
          description: 'Statements from witnesses if available',
          urgency: 'optional',
          status: 'pending'
        },
        {
          name: 'Previous Court Orders',
          description: 'Any previous legal proceedings documents',
          urgency: 'optional',
          status: 'pending'
        }
      ]
    },
    'child-rights': {
      title: 'Child Rights Protection',
      icon: 'rights',
      required: [
        {
          name: 'Age Proof',
          description: 'Document proving child\'s age for rights protection',
          urgency: 'required',
          status: 'pending'
        },
        {
          name: 'Guardianship Papers',
          description: 'Legal guardianship or custody papers',
          urgency: 'conditional',
          status: 'pending'
        },
        {
          name: 'School Records',
          description: 'Previous school records and certificates',
          urgency: 'optional',
          status: 'pending'
        }
      ]
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'uploaded': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'missing': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'required': return 'text-red-600 border-red-200';
      case 'conditional': return 'text-orange-600 border-orange-200';
      case 'optional': return 'text-blue-600 border-blue-200';
      default: return 'text-gray-600 border-gray-200';
    }
  };

  const handleFileUpload = (category, docName, file) => {
    const newDoc = {
      id: Date.now(),
      category,
      name: docName,
      file,
      fileName: file.name,
      uploadDate: new Date().toISOString(),
      status: 'uploaded'
    };
    setDocuments(prev => [...prev, newDoc]);
  };

  const handleRemoveDocument = (docId) => {
    setDocuments(prev => prev.filter(doc => doc.id !== docId));
  };

  const getDocumentStatus = (category, docName) => {
    const uploadedDoc = documents.find(doc => doc.category === category && doc.name === docName);
    return uploadedDoc ? 'uploaded' : 'pending';
  };

  const getUploadedFile = (category, docName) => {
    return documents.find(doc => doc.category === category && doc.name === docName);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-purple-800 mb-6">
        {t('childcare.documents') || 'Child Protection Documents'}
      </h2>
      
      <p className="text-gray-600 mb-6">
        Upload and manage required documents for child protection cases. These documents help in 
        school enrollment, government schemes, and legal protection.
      </p>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === 'all' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Documents
          </button>
          {Object.entries(documentCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === key 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>

      {/* Documents by Category */}
      <div className="space-y-6">
        {Object.entries(documentCategories)
          .filter(([key]) => selectedCategory === 'all' || key === selectedCategory)
          .map(([categoryKey, category]) => (
            <div key={categoryKey} className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {category.title}
              </h3>
              
              <div className="space-y-3">
                {category.required.map((doc, index) => {
                  const status = getDocumentStatus(categoryKey, doc.name);
                  const uploadedFile = getUploadedFile(categoryKey, doc.name);
                  
                  return (
                    <div key={index} className={`border rounded-lg p-4 ${getUrgencyColor(doc.urgency)}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h4 className="font-medium text-gray-800">{doc.name}</h4>
                            <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(status)}`}>
                              {status === 'uploaded' ? 'Uploaded' : status === 'pending' ? 'Pending' : 'Missing'}
                            </span>
                            <span className={`ml-2 px-2 py-1 text-xs rounded-full border ${getUrgencyColor(doc.urgency)}`}>
                              {doc.urgency}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
                          
                          {uploadedFile ? (
                            <div className="flex items-center space-x-2 text-sm">
                              <File className="w-4 h-4 text-green-600" />
                              <span className="text-green-600">{uploadedFile.fileName}</span>
                              <span className="text-gray-500">
                                Uploaded {new Date(uploadedFile.uploadDate).toLocaleDateString()}
                              </span>
                              <button
                                onClick={() => handleRemoveDocument(uploadedFile.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-2">
                              <input
                                type="file"
                                id={`file-${categoryKey}-${index}`}
                                className="hidden"
                                onChange={(e) => {
                                  if (e.target.files[0]) {
                                    handleFileUpload(categoryKey, doc.name, e.target.files[0]);
                                  }
                                }}
                              />
                              <label
                                htmlFor={`file-${categoryKey}-${index}`}
                                className="flex items-center space-x-2 px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                              >
                                <Upload className="w-4 h-4" />
                                <span>Upload</span>
                              </label>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
      </div>

      {/* Summary */}
      <div className="mt-8 bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h3 className="font-semibold text-purple-800 mb-2">Document Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-green-600" />
            <span className="text-gray-700">
              {documents.filter(d => d.status === 'uploaded').length} Documents Uploaded
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-yellow-600" />
            <span className="text-gray-700">
              {Object.values(documentCategories).reduce((acc, cat) => 
                acc + cat.required.filter(doc => !documents.find(d => d.name === doc.name)).length, 0
              )} Documents Pending
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span className="text-gray-700">
              {Object.values(documentCategories).reduce((acc, cat) => 
                acc + cat.required.filter(doc => doc.urgency === 'required' && !documents.find(d => d.name === doc.name)).length, 0
              )} Required Documents Missing
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildProtectionDocuments;
