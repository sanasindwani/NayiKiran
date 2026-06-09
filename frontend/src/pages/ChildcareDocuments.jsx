import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import ChildProtectionDocuments from '../components/ChildProtectionDocuments';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ChildcareDocuments = () => {
  const { t } = useTranslation();

  const downloadChecklist = () => {
    const checklistContent = `CHILD PROTECTION DOCUMENTS CHECKLIST
===========================================

SCHOOL ENROLLMENT DOCUMENTS
----------------------------
Required Documents:
[ ] Birth Certificate (Child's name and date of birth)
[ ] Address Proof (Ration card, electricity bill, or rent agreement)
[ ] Income Certificate (For RTE eligibility and fee concession)
[ ] Aadhar Card (Child and parent Aadhar cards)
[ ] Transfer Certificate (If transferring from another school)

GOVERNMENT SCHEME APPLICATIONS
-----------------------------
Required Documents:
[ ] Bank Account Details (Bank passbook or cancelled cheque)
[ ] Caste Certificate (For caste-based scholarships)
[ ] Disability Certificate (If child has any disability)
[ ] BPL Certificate (Below Poverty Line certificate)

LEGAL PROTECTION DOCUMENTS
--------------------------
Required Documents:
[ ] Police Complaint Copy (FIR copy or complaint acknowledgment)
[ ] Medical Report (Medical examination report if applicable)
[ ] Witness Statements (Statements from witnesses if available)
[ ] Previous Court Orders (Any previous legal proceedings)

CHILD RIGHTS PROTECTION
-----------------------
Required Documents:
[ ] Age Proof (Document proving child's age)
[ ] Guardianship Papers (Legal guardianship or custody papers)
[ ] School Records (Previous school records and certificates)

WHERE TO GET DOCUMENTS
----------------------
Birth Certificate: Municipal Office
Income Certificate: Tehsil Office
Caste Certificate: Revenue Department
Aadhar Card: UIDAI Center
Disability Certificate: Medical Board

IMPORTANT NOTES
---------------
- Ensure all documents are clear and readable
- Upload recent photographs for identity documents
- Keep original documents safe for verification
- Documents should be in PDF, JPG, or PNG format
- Maximum file size: 5MB per document

CONTACT INFORMATION
------------------
Childline: 1098 (24/7)
Women Helpline: 181
Education Department: 011-23382858

Generated on: ${new Date().toLocaleDateString()}
`;

    const blob = new Blob([checklistContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `child-protection-documents-checklist-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
            <h1 className="text-3xl font-bold text-gray-900">Manage Documents</h1>
            <p className="text-gray-600">Upload and organize required documents for child protection</p>
          </div>
        </div>

        {/* Main Content */}
        <ChildProtectionDocuments />

        {/* Additional Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Document Guidelines</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Ensure all documents are clear and readable</li>
              <li>Upload recent photographs for identity documents</li>
              <li>Keep original documents safe for verification</li>
              <li>Documents should be in PDF, JPG, or PNG format</li>
              <li>Maximum file size: 5MB per document</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Where to Get Documents</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Birth Certificate:</span>
                <span className="text-blue-600">Municipal Office</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Income Certificate:</span>
                <span className="text-blue-600">Tehsil Office</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Caste Certificate:</span>
                <span className="text-blue-600">Revenue Department</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Aadhar Card:</span>
                <span className="text-blue-600">UIDAI Center</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Disability Certificate:</span>
                <span className="text-blue-600">Medical Board</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-purple-50 rounded-lg p-6">
          <h3 className="font-semibold text-purple-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link 
              to="/childcare-protection/eligibility"
              className="flex items-center justify-center px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
            >
              Check Eligibility
            </Link>
            <Link 
              to="/childcare-protection/schools"
              className="flex items-center justify-center px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
            >
              Find Schools
            </Link>
            <button 
              onClick={downloadChecklist}
              className="flex items-center justify-center px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Checklist
            </button>
            <Link 
              to="/childcare-protection/apply"
              className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChildcareDocuments;
