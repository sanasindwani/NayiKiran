import React from 'react';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CheckCircle, School, FileText, Send, ArrowRight } from 'lucide-react';

const ChildcareProtectionLanding = () => {
  const { t } = useTranslation();

  const sections = [
    {
      id: 'eligibility',
      title: 'Check Eligibility',
      subtitle: 'Find out if your child qualifies for RTE benefits and government schemes',
      icon: CheckCircle,
      color: 'purple',
      route: '/childcare-protection/eligibility',
      features: [
        'RTE 25% Reservation Check',
        'Income Eligibility Calculator',
        'Scheme Eligibility Assessment',
        'Instant Results'
      ]
    },
    {
      id: 'schools',
      title: 'Find Schools',
      subtitle: 'Locate nearby schools with RTE quota and available facilities',
      icon: School,
      color: 'blue',
      route: '/childcare-protection/schools',
      features: [
        'School Locator Map',
        'RTE Seat Availability',
        'Facilities Information',
        'Contact Details'
      ]
    },
    {
      id: 'documents',
      title: 'Manage Documents',
      subtitle: 'Upload and organize required documents for enrollment and schemes',
      icon: FileText,
      color: 'green',
      route: '/childcare-protection/documents',
      features: [
        'Document Checklist',
        'Upload & Track Status',
        'Category Organization',
        'Progress Summary'
      ]
    },
    {
      id: 'apply',
      title: 'Apply Now',
      subtitle: 'Submit applications for school enrollment and government schemes',
      icon: Send,
      color: 'orange',
      route: '/childcare-protection/apply',
      features: [
        'Online Application Forms',
        'Document Submission',
        'Application Tracking',
        'Status Updates'
      ]
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        icon: 'text-purple-600',
        title: 'text-purple-800',
        button: 'bg-purple-600 hover:bg-purple-700',
        features: 'text-purple-700'
      },
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        icon: 'text-blue-600',
        title: 'text-blue-800',
        button: 'bg-blue-600 hover:bg-blue-700',
        features: 'text-blue-700'
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        icon: 'text-green-600',
        title: 'text-green-800',
        button: 'bg-green-600 hover:bg-green-700',
        features: 'text-green-700'
      },
      orange: {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        icon: 'text-orange-600',
        title: 'text-orange-800',
        button: 'bg-orange-600 hover:bg-orange-700',
        features: 'text-orange-700'
      }
    };
    return colorMap[color];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('childcare.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete guide to child rights, education, and protection. Follow these steps to secure your child's future.
          </p>
        </div>

        {/* Emergency Helplines */}
        <div className="mb-12 bg-red-50 border-2 border-red-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-red-800 mb-4 text-center">
            {t('childcare.emergencyHelplines')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-bold text-lg">Childline</h3>
              <p className="text-2xl font-bold text-red-600">1098</p>
              <p className="text-sm text-gray-600">24/7 Helpline</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-bold text-lg">Women Helpline</h3>
              <p className="text-2xl font-bold text-red-600">181</p>
              <p className="text-sm text-gray-600">24/7 Support</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-bold text-lg">Education Department</h3>
              <p className="text-2xl font-bold text-red-600">011-23382858</p>
              <p className="text-sm text-gray-600">School Related Issues</p>
            </div>
          </div>
        </div>

        {/* Main Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {sections.map((section) => {
            const colors = getColorClasses(section.color);
            const Icon = section.icon;
            
            return (
              <div
                key={section.id}
                className={`${colors.bg} border-2 ${colors.border} rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex flex-col h-full`}
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg ${colors.bg} mr-4`}>
                    <Icon className={`w-8 h-8 ${colors.icon}`} />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold ${colors.title}`}>
                      {section.title}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {section.subtitle}
                    </p>
                  </div>
                </div>

                {/* Features List */}
                <div className="mb-6 flex-grow">
                  <ul className="space-y-2">
                    {section.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className={`w-4 h-4 ${colors.icon} mr-2 flex-shrink-0`} />
                        <span className={`text-sm ${colors.features}`}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <div className="mt-auto">
                  <Link
                    to={section.route}
                    className={`flex items-center justify-center w-full px-6 py-3 ${colors.button} text-white font-semibold rounded-lg transition-colors`}
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Flow */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {sections.map((section, index) => {
              const colors = getColorClasses(section.color);
              const Icon = section.icon;
              
              return (
                <div key={section.id} className="text-center">
                  <div className={`relative mb-4`}>
                    <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mx-auto`}>
                      <Icon className={`w-8 h-8 ${colors.icon}`} />
                    </div>
                    {index < sections.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-300 transform -translate-x-8"></div>
                    )}
                    <div className={`absolute -top-2 -right-2 w-6 h-6 ${colors.button} text-white rounded-full flex items-center justify-center text-sm font-bold`}>
                      {index + 1}
                    </div>
                  </div>
                  <h3 className={`font-semibold ${colors.title} mb-2`}>
                    {section.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {section.subtitle}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 text-center">
          <div className="bg-purple-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-purple-800 mb-2">
              Need Help?
            </h3>
            <p className="text-purple-700 mb-4">
              Our support team is here to help you through every step of the process.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Contact Support
              </button>
              <button className="px-6 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
                View FAQ
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChildcareProtectionLanding;
