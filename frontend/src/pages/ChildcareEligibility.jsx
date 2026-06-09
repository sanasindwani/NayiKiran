import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, AlertCircle, Calculator, FileText, Users, GraduationCap } from 'lucide-react';
import RTEEligibilityChecker from '../components/RTEEligibilityChecker';
import IncomeEligibilityChecker from '../components/IncomeEligibilityChecker';
import CasteEligibilityChecker from '../components/CasteEligibilityChecker';
import DisabilityEligibilityChecker from '../components/DisabilityEligibilityChecker';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ChildcareEligibility = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('rte');

  const eligibilityTypes = [
    {
      id: 'rte',
      title: 'RTE Eligibility',
      icon: GraduationCap,
      description: 'Check eligibility for Right to Education Act 25% reservation',
      component: RTEEligibilityChecker
    },
    {
      id: 'income',
      title: 'Income Based Schemes',
      icon: Calculator,
      description: 'Find scholarships and schemes based on family income',
      component: IncomeEligibilityChecker
    },
    {
      id: 'caste',
      title: 'Caste Based Benefits',
      icon: Users,
      description: 'Check eligibility for caste-based reservations and scholarships',
      component: CasteEligibilityChecker
    },
    {
      id: 'disability',
      title: 'Disability Benefits',
      icon: FileText,
      description: 'Special provisions and benefits for children with disabilities',
      component: DisabilityEligibilityChecker
    }
  ];

  const renderEligibilitySection = () => {
    const currentType = eligibilityTypes.find(type => type.id === activeSection);
    const Component = currentType.component;

    return <Component />;
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
            <h1 className="text-3xl font-bold text-gray-900">Check Eligibility</h1>
            <p className="text-gray-600">Find out what benefits and schemes your child qualifies for</p>
          </div>
        </div>

        {/* Eligibility Types Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {eligibilityTypes.map((type) => {
            const Icon = type.icon;
            const isActive = activeSection === type.id;
            
            return (
              <button
                key={type.id}
                onClick={() => setActiveSection(type.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isActive 
                    ? 'border-purple-600 bg-purple-50 shadow-lg' 
                    : 'border-gray-200 bg-white hover:border-purple-300'
                }`}
              >
                <Icon className={`w-8 h-8 mx-auto mb-2 ${isActive ? 'text-purple-600' : 'text-gray-600'}`} />
                <h3 className={`font-semibold mb-1 ${isActive ? 'text-purple-800' : 'text-gray-800'}`}>
                  {type.title}
                </h3>
                <p className="text-sm text-gray-600">{type.description}</p>
              </button>
            );
          })}
        </div>

        {/* Content Section */}
        {renderEligibilitySection()}

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Next Steps</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Gather required documents
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Complete eligibility check
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Apply for benefits
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/childcare-protection/schools" className="block text-purple-600 hover:text-purple-800 text-sm">
                Find Schools
              </Link>
              <Link to="/childcare-protection/documents" className="block text-purple-600 hover:text-purple-800 text-sm">
                Manage Documents
              </Link>
              <Link to="/childcare-protection/apply" className="block text-purple-600 hover:text-purple-800 text-sm">
                Apply Now
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-3">
              Our support team can help you with eligibility questions and document preparation.
            </p>
            <button className="w-full px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700">
              Contact Support
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChildcareEligibility;
