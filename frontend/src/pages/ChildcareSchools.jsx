import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, School, MapPin, Phone, Star, Users, Search, Filter } from 'lucide-react';
import SchoolsMap from '../components/SchoolsMap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ChildcareSchools = () => {
  const { t } = useTranslation();
  const [activeView, setActiveView] = useState('map');

  const schoolTypes = [
    {
      id: 'government',
      name: 'Government Schools',
      description: 'Free education with RTE quota',
      icon: 'government',
      color: 'blue'
    },
    {
      id: 'private',
      name: 'Private Schools',
      description: 'Quality education with RTE reservation',
      icon: 'private',
      color: 'purple'
    },
    {
      id: 'rte',
      name: 'RTE Quota Schools',
      description: 'Schools with 25% reservation available',
      icon: 'rte',
      color: 'green'
    }
  ];

  const renderSchoolView = () => {
    if (activeView === 'map') {
      return <SchoolsMap />;
    }

    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">School Directory</h3>
        
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search schools by name, area, or type..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {schoolTypes.map((type) => (
            <div key={type.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <div className={`w-12 h-12 bg-${type.color}-100 rounded-lg flex items-center justify-center mr-3`}>
                  <School className={`w-6 h-6 text-${type.color}-600`} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{type.name}</h4>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>250+ Schools</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Across Delhi NCR</span>
                </div>
              </div>
              <button className="mt-3 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                View Schools
              </button>
            </div>
          ))}
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
            <h1 className="text-3xl font-bold text-gray-900">Find Schools</h1>
            <p className="text-gray-600">Locate schools with RTE quota and available facilities</p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveView('map')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeView === 'map'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Map View
          </button>
          <button
            onClick={() => setActiveView('list')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeView === 'list'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            List View
          </button>
        </div>

        {/* Main Content */}
        {renderSchoolView()}

        {/* School Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-3">RTE Benefits</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-2" />
                25% reservation in private schools
              </li>
              <li className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-2" />
                Free education in government schools
              </li>
              <li className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-2" />
                Special provisions for disadvantaged groups
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Admission Process</h3>
            <ol className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="font-semibold mr-2">1.</span>
                Check eligibility
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">2.</span>
                Gather required documents
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">3.</span>
                Apply to selected schools
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">4.</span>
                Attend admission process
              </li>
            </ol>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Important Dates</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Application Start:</span>
                <span className="font-medium">March 1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Application End:</span>
                <span className="font-medium">March 31</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Result Declaration:</span>
                <span className="font-medium">April 15</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Admission Start:</span>
                <span className="font-medium">April 20</span>
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
              to="/childcare-protection/documents"
              className="flex items-center justify-center px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
            >
              Manage Documents
            </Link>
            <button className="flex items-center justify-center px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-100 transition-colors">
              Download Guidelines
            </button>
            <button className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChildcareSchools;
