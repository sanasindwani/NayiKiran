import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';

const DocumentChecklist = () => {
    const { authUser } = useAuthContext();
    const [documents, setDocuments] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState({});
    const [documentStatus, setDocumentStatus] = useState({});
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [uploadProgress, setUploadProgress] = useState({});

    // Document categories with detailed information
    const documentCategories = [
        {
            id: 'essential',
            title: 'Essential Documents',
            description: 'Required for all RTE admissions',
            documents: [
                {
                    id: 'birth_certificate',
                    name: 'Birth Certificate',
                    required: true,
                    description: 'Original birth certificate of the child',
                    howToGet: 'Municipal office or hospital where child was born',
                    format: 'PDF/JPG/PNG (Max 5MB)',
                    template: '/templates/birth-certificate.pdf',
                    status: 'pending'
                },
                {
                    id: 'address_proof',
                    name: 'Address Proof',
                    required: true,
                    description: 'Current residential address proof',
                    howToGet: 'Aadhar card, Voter ID, or utility bill',
                    format: 'PDF/JPG/PNG (Max 5MB)',
                    template: '/templates/address-proof.pdf',
                    status: 'pending'
                },
                {
                    id: 'income_certificate',
                    name: 'Income Certificate',
                    required: true,
                    description: 'Family income certificate for EWS category',
                    howToGet: 'Tehsil office with income proof documents',
                    format: 'PDF/JPG/PNG (Max 5MB)',
                    template: '/templates/income-certificate.pdf',
                    status: 'pending'
                },
                {
                    id: 'aadhar_card',
                    name: 'Aadhar Card',
                    required: true,
                    description: 'Aadhar card of child and parents',
                    howToGet: 'Aadhar enrollment center with biometric verification',
                    format: 'PDF/JPG/PNG (Max 5MB)',
                    template: '/templates/aadhar-card.pdf',
                    status: 'pending'
                }
            ]
        },
        {
            id: 'category_specific',
            title: 'Category-Specific Documents',
            description: 'Required based on social category',
            documents: [
                {
                    id: 'caste_certificate',
                    name: 'Caste Certificate',
                    required: false,
                    description: 'For SC/ST/OBC category reservation',
                    howToGet: 'District magistrate office with community certificate',
                    format: 'PDF/JPG/PNG (Max 5MB)',
                    template: '/templates/caste-certificate.pdf',
                    status: 'pending'
                },
                {
                    id: 'disability_certificate',
                    name: 'Disability Certificate',
                    required: false,
                    description: 'For physically challenged candidates',
                    howToGet: 'Government hospital with medical certificate',
                    format: 'PDF/JPG/PNG (Max 5MB)',
                    template: '/templates/disability-certificate.pdf',
                    status: 'pending'
                },
                {
                    id: 'bpl_certificate',
                    name: 'BPL Certificate',
                    required: false,
                    description: 'Below Poverty Line certificate',
                    howToGet: 'Revenue department office',
                    format: 'PDF/JPG/PNG (Max 5MB)',
                    template: '/templates/bpl-certificate.pdf',
                    status: 'pending'
                },
                {
                    id: 'ration_card',
                    name: 'Ration Card',
                    required: false,
                    description: 'Food security card proof',
                    howToGet: 'Public distribution system office',
                    format: 'PDF/JPG/PNG (Max 5MB)',
                    template: '/templates/ration-card.pdf',
                    status: 'pending'
                }
            ]
        }
    ];

    useEffect(() => {
        // Load saved document status from localStorage
        const savedStatus = localStorage.getItem('documentStatus');
        if (savedStatus) {
            setDocumentStatus(JSON.parse(savedStatus));
        }

        // Load uploaded files from localStorage
        const savedFiles = localStorage.getItem('uploadedFiles');
        if (savedFiles) {
            setUploadedFiles(JSON.parse(savedFiles));
        }
    }, []);

    const handleFileUpload = async (docId, file) => {
        if (!file) return;

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size should be less than 5MB');
            return;
        }

        // Validate file type
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            alert('Only PDF, JPG, and PNG files are allowed');
            return;
        }

        // Simulate upload progress
        setUploadProgress(prev => ({ ...prev, [docId]: 0 }));

        try {
            // Create file reader for preview
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileData = {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    data: e.target.result,
                    uploadDate: new Date().toISOString()
                };

                // Save to uploaded files
                const newUploadedFiles = { ...uploadedFiles, [docId]: fileData };
                setUploadedFiles(newUploadedFiles);
                localStorage.setItem('uploadedFiles', JSON.stringify(newUploadedFiles));

                // Update document status
                const newStatus = { ...documentStatus, [docId]: 'uploaded' };
                setDocumentStatus(newStatus);
                localStorage.setItem('documentStatus', JSON.stringify(newStatus));

                // Remove progress after upload
                setUploadProgress(prev => ({ ...prev, [docId]: undefined }));
            };

            reader.readAsDataURL(file);

            // Simulate upload progress
            let progress = 0;
            const progressInterval = setInterval(() => {
                progress += 10;
                setUploadProgress(prev => ({ ...prev, [docId]: progress }));
                if (progress >= 100) {
                    clearInterval(progressInterval);
                }
            }, 200);

        } catch (error) {
            console.error('Upload error:', error);
            alert('Error uploading file. Please try again.');
            setUploadProgress(prev => ({ ...prev, [docId]: undefined }));
        }
    };

    const handleDocumentStatusChange = (docId, status) => {
        const newStatus = { ...documentStatus, [docId]: status };
        setDocumentStatus(newStatus);
        localStorage.setItem('documentStatus', JSON.stringify(newStatus));
    };

    const downloadTemplate = (templateUrl) => {
        // Simulate template download
        const link = document.createElement('a');
        link.href = templateUrl;
        link.download = templateUrl.split('/').pop();
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const deleteDocument = (docId) => {
        const newUploadedFiles = { ...uploadedFiles };
        delete newUploadedFiles[docId];
        setUploadedFiles(newUploadedFiles);
        localStorage.setItem('uploadedFiles', JSON.stringify(newUploadedFiles));

        const newStatus = { ...documentStatus, [docId]: 'pending' };
        setDocumentStatus(newStatus);
        localStorage.setItem('documentStatus', JSON.stringify(newStatus));
    };

    const getCompletionPercentage = () => {
        const totalDocs = documentCategories.flatMap(cat => cat.documents).length;
        const completedDocs = Object.values(documentStatus).filter(status => status === 'uploaded').length;
        return Math.round((completedDocs / totalDocs) * 100);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'uploaded': return 'text-green-600 bg-green-100';
            case 'pending': return 'text-yellow-600 bg-yellow-100';
            case 'rejected': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'uploaded': return '✅';
            case 'pending': return '⏳';
            case 'rejected': return '❌';
            default: return '📄';
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">
                    Document Checklist for RTE Admission
                </h1>

                {/* Progress Overview */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">Document Status</h2>
                        <div className="text-right">
                            <div className="text-3xl font-bold text-blue-600">{getCompletionPercentage()}%</div>
                            <div className="text-sm text-gray-600">Complete</div>
                        </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                        <div 
                            className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                            style={{ width: `${getCompletionPercentage()}%` }}
                        ></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                                {Object.values(documentStatus).filter(s => s === 'uploaded').length}
                            </div>
                            <div className="text-sm text-gray-600">Uploaded</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-600">
                                {Object.values(documentStatus).filter(s => s === 'pending').length}
                            </div>
                            <div className="text-sm text-gray-600">Pending</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-red-600">
                                {Object.values(documentStatus).filter(s => s === 'rejected').length}
                            </div>
                            <div className="text-sm text-gray-600">Rejected</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-600">
                                {documentCategories.flatMap(cat => cat.documents).length}
                            </div>
                            <div className="text-sm text-gray-600">Total Documents</div>
                        </div>
                    </div>
                </div>

                {/* Document Categories */}
                {documentCategories.map((category, catIndex) => (
                    <div key={category.id} className="bg-white rounded-lg shadow-lg p-6 mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">{category.title}</h2>
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                {category.documents.filter(doc => documentStatus[doc.id] === 'uploaded').length}/{category.documents.length} Complete
                            </span>
                        </div>
                        <p className="text-gray-600 mb-6">{category.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {category.documents.map((doc) => (
                                <div key={doc.id} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                                {doc.name}
                                                {doc.required && <span className="text-red-500 ml-2">*</span>}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-3">{doc.description}</p>
                                            
                                            {/* Document Status */}
                                            <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${getStatusColor(documentStatus[doc.id])}`}>
                                                <span>{getStatusIcon(documentStatus[doc.id])}</span>
                                                <span className="font-medium">
                                                    {documentStatus[doc.id] ? documentStatus[doc.id].charAt(0).toUpperCase() + documentStatus[doc.id].slice(1) : 'Pending'}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {/* Action Buttons */}
                                        <div className="flex space-x-2">
                                            {uploadedFiles[doc.id] ? (
                                                <button
                                                    onClick={() => setSelectedDoc(doc)}
                                                    className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                                >
                                                    View
                                                </button>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => downloadTemplate(doc.template)}
                                                        className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                                                    >
                                                        Template
                                                    </button>
                                                    <label className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm cursor-pointer">
                                                        Upload
                                                        <input
                                                            type="file"
                                                            accept=".pdf,.jpg,.jpeg,.png"
                                                            onChange={(e) => handleFileUpload(doc.id, e.target.files[0])}
                                                            className="hidden"
                                                        />
                                                    </label>
                                                </>
                                            )}
                                            {uploadedFiles[doc.id] && (
                                                <button
                                                    onClick={() => deleteDocument(doc.id)}
                                                    className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Upload Progress */}
                                    {uploadProgress[doc.id] !== undefined && (
                                        <div className="mt-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm text-gray-600">Uploading...</span>
                                                <span className="text-sm text-blue-600">{uploadProgress[doc.id]}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div 
                                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${uploadProgress[doc.id]}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}

                                    {/* How to Get Document */}
                                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                        <h4 className="font-semibold text-blue-800 mb-2">How to Get This Document:</h4>
                                        <p className="text-sm text-blue-700">{doc.howToGet}</p>
                                        <div className="mt-2">
                                            <span className="text-xs text-blue-600">Format: {doc.format}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Document Preview Modal */}
            {selectedDoc && uploadedFiles[selectedDoc.id] && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-800">{selectedDoc.name}</h3>
                            <button
                                onClick={() => setSelectedDoc(null)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        {uploadedFiles[selectedDoc.id].type.startsWith('image/') ? (
                            <img 
                                src={uploadedFiles[selectedDoc.id].data} 
                                alt={selectedDoc.name}
                                className="w-full h-auto max-h-96 object-contain"
                            />
                        ) : (
                            <div className="text-center text-gray-500 py-8">
                                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414a1 1 0 00-.707 0l-5.414 5.414A1 1 0 003 21H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18" />
                                </svg>
                                <p>PDF Document</p>
                                <p className="text-sm text-gray-400 mt-2">
                                    Size: {(uploadedFiles[selectedDoc.id].size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                        )}
                        
                        <div className="mt-4 flex justify-end space-x-3">
                            <button
                                onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = uploadedFiles[selectedDoc.id].data;
                                    link.download = uploadedFiles[selectedDoc.id].name;
                                    link.click();
                                }}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Download
                            </button>
                            <button
                                onClick={() => setSelectedDoc(null)}
                                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DocumentChecklist;
