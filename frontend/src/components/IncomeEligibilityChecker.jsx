import React, { useState } from 'react';
import { Calculator, CheckCircle, AlertCircle, Info } from 'lucide-react';

const IncomeEligibilityChecker = () => {
  const [formData, setFormData] = useState({
    familyIncome: '',
    familyMembers: '',
    earningMembers: '',
    occupation: '',
    residenceType: '',
    hasBPLCard: '',
    hasAadhar: '',
    hasBankAccount: ''
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
    const income = parseFloat(formData.familyIncome);
    const members = parseInt(formData.familyMembers);
    const perCapitaIncome = income / members;
    
    let eligibleSchemes = [];
    let recommendations = [];

    // Income-based eligibility calculations
    if (perCapitaIncome <= 1000) {
      eligibleSchemes.push({
        name: "National Means Cum Merit Scholarship",
        type: "scholarship",
        amount: "Rs. 12,000 per annum",
        eligibility: "Income below Rs. 1,000 per capita per month"
      });
      eligibleSchemes.push({
        name: "Pre-Matric Scholarship",
        type: "scholarship", 
        amount: "Varies by class",
        eligibility: "Income below Rs. 1 lakh per annum"
      });
      recommendations.push("You qualify for multiple scholarships under the poverty line category");
    }

    if (perCapitaIncome <= 2000) {
      eligibleSchemes.push({
        name: "Post-Matric Scholarship",
        type: "scholarship",
        amount: "Up to Rs. 10,000 per year",
        eligibility: "Income below Rs. 2,000 per capita per month"
      });
    }

    if (formData.hasBPLCard === 'yes') {
      eligibleSchemes.push({
        name: "BPL Scholarship Scheme",
        type: "financial_aid",
        amount: "Rs. 5,000 - Rs. 10,000",
        eligibility: "BPL card holders"
      });
      recommendations.push("Your BPL card makes you eligible for additional financial assistance");
    }

    if (formData.residenceType === 'rural') {
      eligibleSchemes.push({
        name: "Rural Area Scholarship",
        type: "scholarship",
        amount: "Rs. 3,000 per year",
        eligibility: "Students from rural areas"
      });
    }

    if (members > 4 && perCapitaIncome <= 1500) {
      eligibleSchemes.push({
        name: "Large Family Support",
        type: "financial_aid",
        amount: "Rs. 2,000 per child",
        eligibility: "Families with more than 4 members"
      });
    }

    // Generate recommendations
    if (eligibleSchemes.length === 0) {
      recommendations.push("Based on your income, you may not qualify for income-based schemes");
      recommendations.push("Consider checking caste-based or disability-based benefits");
      recommendations.push("Look for merit-based scholarships instead");
    } else {
      recommendations.push("Apply for all eligible schemes to maximize benefits");
      recommendations.push("Keep income certificate updated for renewals");
      recommendations.push("Maintain good academic performance for scholarship renewal");
    }

    setResults({
      eligibleSchemes,
      recommendations,
      perCapitaIncome,
      totalEligibleAmount: eligibleSchemes.reduce((sum, scheme) => {
        const amount = parseFloat(scheme.amount.replace(/[^0-9.]/g, '')) || 0;
        return sum + amount;
      }, 0)
    });
  };

  const resetForm = () => {
    setFormData({
      familyIncome: '',
      familyMembers: '',
      earningMembers: '',
      occupation: '',
      residenceType: '',
      hasBPLCard: '',
      hasAadhar: '',
      hasBankAccount: ''
    });
    setResults(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <Calculator className="w-8 h-8 text-blue-600 mr-3" />
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Income-Based Eligibility Checker</h3>
          <p className="text-gray-600">Find scholarships and schemes based on family income</p>
        </div>
      </div>

      {!results ? (
        <div className="space-y-6">
          {/* Income Details */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-4">Family Income Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Family Income (Rs.) *
                </label>
                <input
                  type="number"
                  name="familyIncome"
                  value={formData.familyIncome}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter total monthly income"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Family Members *
                </label>
                <input
                  type="number"
                  name="familyMembers"
                  value={formData.familyMembers}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Number of family members"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Earning Members
                </label>
                <input
                  type="number"
                  name="earningMembers"
                  value={formData.earningMembers}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Number of earning members"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Occupation
                </label>
                <select
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Occupation</option>
                  <option value="agriculture">Agriculture</option>
                  <option value="labor">Daily Wage Labor</option>
                  <option value="service">Service/Private Job</option>
                  <option value="business">Small Business</option>
                  <option value="government">Government Employee</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-4">Additional Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Residence Type
                </label>
                <select
                  name="residenceType"
                  value={formData.residenceType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Residence Type</option>
                  <option value="urban">Urban</option>
                  <option value="rural">Rural</option>
                  <option value="semi-urban">Semi-Urban</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Do you have a BPL card?
                </label>
                <select
                  name="hasBPLCard"
                  value={formData.hasBPLCard}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Do you have Aadhar card?
                </label>
                <select
                  name="hasAadhar"
                  value={formData.hasAadhar}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Do you have a bank account?
                </label>
                <select
                  name="hasBankAccount"
                  value={formData.hasBankAccount}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Calculator className="w-4 h-4 mr-2" />
              Check Eligibility
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Results Header */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-blue-900">Eligibility Results</h4>
                <p className="text-blue-700">Per Capita Income: Rs. {results.perCapitaIncome.toFixed(2)}/month</p>
              </div>
              <span className="text-2xl font-bold text-blue-600">
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
                  <li>Income Certificate</li>
                  <li>BPL Card (if applicable)</li>
                  <li>Aadhar Card</li>
                  <li>Bank Account Details</li>
                </ul>
              </div>
              <div>
                <h5 className="text-sm font-medium text-purple-800 mb-2">Application Timeline</h5>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>Document preparation: 1-2 weeks</li>
                  <li>Application submission: 1 week</li>
                  <li>Processing time: 4-6 weeks</li>
                  <li>Benefit disbursement: 1-2 weeks</li>
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
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Apply for Schemes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncomeEligibilityChecker;
