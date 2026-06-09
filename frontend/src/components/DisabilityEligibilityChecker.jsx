import React, { useState } from 'react';
import { FileText, CheckCircle, AlertCircle, Info } from 'lucide-react';

const DisabilityEligibilityChecker = () => {
  const [formData, setFormData] = useState({
    hasDisability: '',
    disabilityType: '',
    disabilityPercentage: '',
    hasDisabilityCertificate: '',
    certificateIssueDate: '',
    certificateAuthority: '',
    disabilityNature: '',
    assistanceRequired: '',
    specialEducation: '',
    assistiveDevices: '',
    annualIncome: '',
    casteCategory: '',
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

    const disabilityPercentage = parseFloat(formData.disabilityPercentage);

    // Disability-based eligibility calculations
    if (formData.hasDisability === 'yes' && disabilityPercentage >= 40) {
      eligibleSchemes.push({
        name: "Scholarship for Students with Disabilities",
        type: "scholarship",
        amount: "Rs. 12,000 per annum",
        eligibility: "40% or more disability"
      });
      eligibleSchemes.push({
        name: "Free Education for Disabled",
        type: "education",
        amount: "100% fee waiver",
        eligibility: "Students with 40%+ disability"
      });
      eligibleSchemes.push({
        name: "Assistive Devices Support",
        type: "equipment",
        amount: "Up to Rs. 20,000",
        eligibility: "Students requiring assistive devices"
      });

      if (disabilityPercentage >= 75) {
        eligibleSchemes.push({
          name: "Special Scholarship for Severe Disability",
          type: "scholarship",
          amount: "Rs. 24,000 per annum",
          eligibility: "75% or more disability"
        });
        recommendations.push("Severe disability qualifies for enhanced benefits");
      }

      recommendations.push("Students with 40%+ disability qualify for comprehensive educational support");
    }

    // Special education benefits
    if (formData.specialEducation === 'yes') {
      eligibleSchemes.push({
        name: "Special Education Support",
        type: "education",
        amount: "Rs. 5,000 per month",
        eligibility: "Students requiring special education"
      });
      eligibleSchemes.push({
        name: "Inclusive Education Scholarship",
        type: "scholarship",
        amount: "Rs. 8,000 per annum",
        eligibility: "Students in special education programs"
      });
    }

    // Assistive devices benefits
    if (formData.assistiveDevices === 'yes') {
      eligibleSchemes.push({
        name: "ADIP Scheme (Assistance to Disabled Persons)",
        type: "equipment",
        amount: "Up to Rs. 50,000",
        eligibility: "Persons with disabilities requiring assistive devices"
      });
      recommendations.push("Apply for assistive devices through ADIP scheme");
    }

    // Income-based additional benefits for disabled
    const income = parseFloat(formData.annualIncome);
    if (formData.hasDisability === 'yes' && (!income || income <= 800000)) {
      eligibleSchemes.push({
        name: "Income Support for Disabled",
        type: "financial_aid",
        amount: "Rs. 3,000 per month",
        eligibility: "Disabled students with family income < Rs. 8 lakh"
      });
    }

    // Additional caste-based benefits for disabled
    if (formData.hasDisability === 'yes' && formData.casteCategory && formData.casteCategory !== 'general') {
      eligibleSchemes.push({
        name: "Reserved Category Disability Scholarship",
        type: "scholarship",
        amount: "Rs. 15,000 per annum",
        eligibility: "Disabled students from reserved categories"
      });
      recommendations.push("Caste category + disability provides enhanced benefits");
    }

    // Rural background benefits for disabled
    if (formData.hasDisability === 'yes' && formData.ruralBackground === 'yes') {
      eligibleSchemes.push({
        name: "Rural Disability Support",
        type: "financial_aid",
        amount: "Rs. 2,000 per month",
        eligibility: "Disabled students from rural areas"
      });
    }

    // Specific disability type benefits
    if (formData.disabilityType === 'visual') {
      eligibleSchemes.push({
        name: "Visual Impairment Support",
        type: "equipment",
        amount: "Braille books + Audio devices",
        eligibility: "Visually impaired students"
      });
    } else if (formData.disabilityType === 'hearing') {
      eligibleSchemes.push({
        name: "Hearing Impairment Support",
        type: "equipment",
        amount: "Hearing aids + Sign language support",
        eligibility: "Hearing impaired students"
      });
    } else if (formData.disabilityType === 'physical') {
      eligibleSchemes.push({
        name: "Physical Disability Support",
        type: "equipment",
        amount: "Mobility aids + Accessibility devices",
        eligibility: "Physically disabled students"
      });
    }

    // Generate recommendations
    if (eligibleSchemes.length === 0) {
      recommendations.push("Based on your information, you may not qualify for disability-based schemes");
      recommendations.push("Ensure you have a valid disability certificate");
      recommendations.push("Consider checking other eligibility categories");
      
      if (formData.hasDisability === 'no') {
        recommendations.push("This checker is for students with disabilities");
      } else if (disabilityPercentage < 40) {
        recommendations.push("Disability percentage below 40% may not qualify for most schemes");
        recommendations.push("Consider medical re-evaluation for updated certificate");
      }
    } else {
      recommendations.push("Apply for all eligible schemes to maximize benefits");
      recommendations.push("Keep disability certificate updated for renewals");
      recommendations.push("Maintain medical records for future reference");
      
      if (formData.hasDisabilityCertificate === 'no') {
        recommendations.push("URGENT: Get disability certificate from authorized medical board");
        recommendations.push("Contact District Disability Rehabilitation Center for assistance");
      }
    }

    setResults({
      eligibleSchemes,
      recommendations,
      disabilityLevel: disabilityPercentage >= 75 ? 'Severe' : disabilityPercentage >= 40 ? 'Moderate' : 'Mild',
      totalEligibleAmount: eligibleSchemes.reduce((sum, scheme) => {
        const amount = parseFloat(scheme.amount.replace(/[^0-9.]/g, '')) || 0;
        return sum + amount;
      }, 0)
    });
  };

  const resetForm = () => {
    setFormData({
      hasDisability: '',
      disabilityType: '',
      disabilityPercentage: '',
      hasDisabilityCertificate: '',
      certificateIssueDate: '',
      certificateAuthority: '',
      disabilityNature: '',
      assistanceRequired: '',
      specialEducation: '',
      assistiveDevices: '',
      annualIncome: '',
      casteCategory: '',
      ruralBackground: ''
    });
    setResults(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <FileText className="w-8 h-8 text-green-600 mr-3" />
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Disability Benefits Eligibility</h3>
          <p className="text-gray-600">Special provisions and benefits for children with disabilities</p>
        </div>
      </div>

      {!results ? (
        <div className="space-y-6">
          {/* Disability Details */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-4">Disability Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Do you have any disability? *
                </label>
                <select
                  name="hasDisability"
                  value={formData.hasDisability}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              {formData.hasDisability === 'yes' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type of Disability *
                    </label>
                    <select
                      name="disabilityType"
                      value={formData.disabilityType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Select Disability Type</option>
                      <option value="visual">Visual Impairment</option>
                      <option value="hearing">Hearing Impairment</option>
                      <option value="speech">Speech Impairment</option>
                      <option value="physical">Physical Disability</option>
                      <option value="mental">Mental Disability</option>
                      <option value="multiple">Multiple Disabilities</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Disability Percentage (%) *
                    </label>
                    <input
                      type="number"
                      name="disabilityPercentage"
                      value={formData.disabilityPercentage}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="Enter percentage (0-100)"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Do you have disability certificate? *
                    </label>
                    <select
                      name="hasDisabilityCertificate"
                      value={formData.hasDisabilityCertificate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Select Option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nature of Disability
                    </label>
                    <select
                      name="disabilityNature"
                      value={formData.disabilityNature}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Select Nature</option>
                      <option value="congenital">Congenital (by birth)</option>
                  <option value="acquired">Acquired (after birth)</option>
                  <option value="progressive">Progressive</option>
                  <option value="temporary">Temporary</option>
                </select>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Certificate Details */}
      {formData.hasDisability === 'yes' && formData.hasDisabilityCertificate === 'yes' && (
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Issuing Authority
              </label>
              <select
                name="certificateAuthority"
                value={formData.certificateAuthority}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Authority</option>
                <option value="civil">Civil Surgeon</option>
                <option value="medical">Medical Board</option>
                <option value="government">Government Hospital</option>
                <option value="disability">Disability Board</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Additional Information */}
      {formData.hasDisability === 'yes' && (
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-4">Additional Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Require Special Education?
              </label>
              <select
                name="specialEducation"
                value={formData.specialEducation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Need Assistive Devices?
              </label>
              <select
                name="assistiveDevices"
                value={formData.assistiveDevices}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Enter annual income"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Caste Category
              </label>
              <select
                name="casteCategory"
                value={formData.casteCategory}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Category</option>
                <option value="sc">Scheduled Caste (SC)</option>
                <option value="st">Scheduled Tribe (ST)</option>
                <option value="obc">Other Backward Classes (OBC)</option>
                <option value="general">General</option>
              </select>
            </div>
          </div>
        </div>
      )}

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
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
        >
          <FileText className="w-4 h-4 mr-2" />
          Check Eligibility
        </button>
      </div>
    </div>
  ) : (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-green-900">Eligibility Results</h4>
            <p className="text-green-700">Disability Level: {results.disabilityLevel}</p>
          </div>
          <span className="text-2xl font-bold text-green-600">
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
              <li>Disability Certificate</li>
              <li>Medical Reports</li>
              <li>Income Certificate</li>
              <li>Aadhar Card</li>
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-medium text-purple-800 mb-2">Application Timeline</h5>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>Medical assessment: 1-2 weeks</li>
              <li>Application submission: 1 week</li>
              <li>Processing time: 4-6 weeks</li>
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
        <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          Apply for Benefits
        </button>
      </div>
    </div>
  )}
</div>
);
};

export default DisabilityEligibilityChecker;
