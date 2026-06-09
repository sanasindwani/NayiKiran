import React, { useState } from 'react';
import { Users, CheckCircle, AlertCircle, Info } from 'lucide-react';

const CasteEligibilityChecker = () => {
  const [formData, setFormData] = useState({
    caste: '',
    subCaste: '',
    hasCasteCertificate: '',
    certificateIssueDate: '',
    certificateValidUntil: '',
    state: '',
    annualIncome: '',
    isMinority: '',
    hasOBCNonCreamyLayer: '',
    disabilityStatus: '',
    ruralBackground: ''
  });
  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const checkEligibility = () => {
    let eligibleSchemes = [];
    let recommendations = [];

    // Caste-based eligibility calculations
    if (formData.caste === 'sc') {
      eligibleSchemes.push({
        name: "SC Scholarship (Post-Matric)",
        type: "scholarship",
        amount: "Rs. 1,200 - Rs. 5,000 per month",
        eligibility: "Scheduled Caste students"
      });
      eligibleSchemes.push({
        name: "National SC Scholarship",
        type: "scholarship",
        amount: "Rs. 30,000 per annum",
        eligibility: "SC students with family income < Rs. 8 lakh"
      });
      eligibleSchemes.push({
        name: "SC Hostel Facilities",
        type: "accommodation",
        amount: "Free accommodation",
        eligibility: "SC students studying away from home"
      });
      recommendations.push("As an SC student, you qualify for comprehensive educational support");
    }

    if (formData.caste === 'st') {
      eligibleSchemes.push({
        name: "ST Scholarship (Post-Matric)",
        type: "scholarship",
        amount: "Rs. 1,200 - Rs. 5,000 per month",
        eligibility: "Scheduled Tribe students"
      });
      eligibleSchemes.push({
        name: "National ST Scholarship",
        type: "scholarship",
        amount: "Rs. 30,000 per annum",
        eligibility: "ST students with family income < Rs. 8 lakh"
      });
      eligibleSchemes.push({
        name: "Tribal Development Hostel",
        type: "accommodation",
        amount: "Free accommodation + food",
        eligibility: "ST students from tribal areas"
      });
      recommendations.push("ST students receive additional support for cultural preservation");
    }

    if (formData.caste === 'obc' && formData.hasOBCNonCreamyLayer === 'yes') {
      eligibleSchemes.push({
        name: "OBC Scholarship (Post-Matric)",
        type: "scholarship",
        amount: "Rs. 500 - Rs. 3,000 per month",
        eligibility: "OBC Non-Creamy Layer students"
      });
      eligibleSchemes.push({
        name: "National OBC Scholarship",
        type: "scholarship",
        amount: "Rs. 20,000 per annum",
        eligibility: "OBC students with family income < Rs. 8 lakh"
      });
      recommendations.push("OBC Non-Creamy Layer status is crucial for eligibility");
    }

    // Minority benefits
    if (formData.isMinority === 'yes') {
      eligibleSchemes.push({
        name: "Merit-cum-Means Scholarship",
        type: "scholarship",
        amount: "Rs. 20,000 per annum",
        eligibility: "Minority community students"
      });
      eligibleSchemes.push({
        name: "Begum Hazrat Mahal Scholarship",
        type: "scholarship",
        amount: "Rs. 5,000 per year",
        eligibility: "Girl students from minority communities"
      });
      recommendations.push("Minority status provides additional scholarship opportunities");
    }

    // Income-based additional benefits
    const income = parseFloat(formData.annualIncome);
    if (income <= 800000 && formData.caste !== 'general') {
      eligibleSchemes.push({
        name: "Central Sector Scholarship",
        type: "scholarship",
        amount: "Rs. 10,000 per annum",
        eligibility: "Reserved categories with income < Rs. 8 lakh"
      });
    }

    // Disability benefits
    if (formData.disabilityStatus === 'yes') {
      eligibleSchemes.push({
        name: "Scholarship for Differently Abled",
        type: "scholarship",
        amount: "Rs. 12,000 per annum",
        eligibility: "Students with 40% or more disability"
      });
      recommendations.push("Disability status provides additional educational support");
    }

    // Rural background benefits
    if (formData.ruralBackground === 'yes') {
      eligibleSchemes.push({
        name: "Rural Area Scholarship",
        type: "scholarship",
        amount: "Rs. 3,000 per year",
        eligibility: "Students from rural areas"
      });
    }

    // Generate recommendations
    if (eligibleSchemes.length === 0) {
      recommendations.push("Based on your information, you may not qualify for caste-based schemes");
      recommendations.push("Consider checking income-based or merit-based scholarships");
      recommendations.push("Ensure your caste certificate is valid and up-to-date");
    } else {
      recommendations.push("Apply for all eligible schemes to maximize benefits");
      recommendations.push("Keep caste certificate updated for renewals");
      recommendations.push("Maintain good academic performance for scholarship renewal");
      
      if (formData.hasCasteCertificate === 'no') {
        recommendations.push("URGENT: Apply for caste certificate immediately");
        recommendations.push("Contact your local Tehsil office for certificate issuance");
      }
    }

    setResults({
      eligibleSchemes,
      recommendations,
      casteCategory: formData.caste.toUpperCase(),
      totalEligibleAmount: eligibleSchemes.reduce((sum, scheme) => {
        const amount = parseFloat(scheme.amount.replace(/[^0-9.]/g, '')) || 0;
        return sum + amount;
      }, 0)
    });
  };

  const resetForm = () => {
    setFormData({
      caste: '',
      subCaste: '',
      hasCasteCertificate: '',
      certificateIssueDate: '',
      certificateValidUntil: '',
      state: '',
      annualIncome: '',
      isMinority: '',
      hasOBCNonCreamyLayer: '',
      disabilityStatus: '',
      ruralBackground: ''
    });
    setResults(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <Users className="w-8 h-8 text-orange-600 mr-3" />
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Caste-Based Eligibility Checker</h3>
          <p className="text-gray-600">Check eligibility for caste-based reservations and scholarships</p>
        </div>
      </div>

      {!results ? (
        <div className="space-y-6">
          {/* Caste Details */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-4">Caste Category Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Caste Category *
                </label>
                <select
                  name="caste"
                  value={formData.caste}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select Caste Category</option>
                  <option value="sc">Scheduled Caste (SC)</option>
                  <option value="st">Scheduled Tribe (ST)</option>
                  <option value="obc">Other Backward Classes (OBC)</option>
                  <option value="general">General</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sub-Caste (if applicable)
                </label>
                <input
                  type="text"
                  name="subCaste"
                  value={formData.subCaste}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter sub-caste"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Do you have a caste certificate? *
                </label>
                <select
                  name="hasCasteCertificate"
                  value={formData.hasCasteCertificate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select Option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              {(formData.caste === 'obc') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    OBC Non-Creamy Layer Certificate?
                  </label>
                  <select
                    name="hasOBCNonCreamyLayer"
                    value={formData.hasOBCNonCreamyLayer}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select Option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Certificate Details */}
          {formData.hasCasteCertificate === 'yes' && (
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-4">Certificate Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Certificate Issue Date
                  </label>
                  <input
                    type="date"
                    name="certificateIssueDate"
                    value={formData.certificateIssueDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Certificate Valid Until
                  </label>
                  <input
                    type="date"
                    name="certificateValidUntil"
                    value={formData.certificateValidUntil}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Additional Information */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-4">Additional Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select State</option>
                  <option value="delhi">Delhi</option>
                  <option value="up">Uttar Pradesh</option>
                  <option value="bihar">Bihar</option>
                  <option value="rajasthan">Rajasthan</option>
                  <option value="madhya">Madhya Pradesh</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Annual Family Income (Rs.)
                </label>
                <input
                  type="number"
                  name="annualIncome"
                  value={formData.annualIncome}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter annual income"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Belong to Minority Community?
                </label>
                <select
                  name="isMinority"
                  value={formData.isMinority}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select Option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Have Disability?
                </label>
                <select
                  name="disabilityStatus"
                  value={formData.disabilityStatus}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select Option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              onClick={resetForm}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Reset
            </button>
            <button
              onClick={checkEligibility}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center"
            >
              <Users className="w-4 h-4 mr-2" />
              Check Eligibility
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Results Header */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-orange-900">Eligibility Results</h4>
                <p className="text-orange-700">Caste Category: {results.casteCategory}</p>
              </div>
              <span className="text-2xl font-bold text-orange-600">
                {results.eligibleSchemes.length} Schemes
              </span>
            </div>
          </div>

          {/* Eligible Schemes */}
          {results.eligibleSchemes.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Eligible Schemes & Benefits</h4>
              {results.eligibleSchemes.map((scheme, index) => (
                <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h5 className="font-medium text-green-900">{scheme.name}</h5>
                      <p className="text-sm text-green-700 mt-1">{scheme.eligibility}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-green-600">{scheme.amount}</span>
                      <p className="text-xs text-green-600">{scheme.type}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Recommendations */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <Info className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-900 mb-2">Recommendations</h4>
                <ul className="space-y-1">
                  {results.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-yellow-800 flex items-start">
                      <CheckCircle className="w-4 h-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-900 mb-3">Next Steps</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium text-purple-800 mb-2">Required Documents</h5>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>Caste Certificate</li>
                  <li>Income Certificate</li>
                  <li>Aadhar Card</li>
                  <li>Bank Account Details</li>
                </ul>
              </div>
              <div>
                <h5 className="text-sm font-medium text-purple-800 mb-2">Application Timeline</h5>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>Document preparation: 2-3 weeks</li>
                  <li>Application submission: 1 week</li>
                  <li>Processing time: 6-8 weeks</li>
                  <li>Benefit disbursement: 2-3 weeks</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              onClick={resetForm}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Check Again
            </button>
            <button className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
              Apply for Schemes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CasteEligibilityChecker;
