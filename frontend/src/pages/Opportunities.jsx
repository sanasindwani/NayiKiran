import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  GraduationCap, 
  TrendingUp, 
  Users, 
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Award,
  BookOpen,
  Target,
  ArrowRight,
  Search,
  Filter,
  Star
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Opportunities = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const opportunityCategories = [
    {
      id: 'internships',
      title: 'Internships',
      icon: Briefcase,
      color: 'blue',
      description: 'Gain hands-on experience in top companies',
      count: 156
    },
    {
      id: 'part-time',
      title: 'Part-Time Jobs',
      icon: Clock,
      color: 'green',
      description: 'Flexible work opportunities for students',
      count: 89
    },
    {
      id: 'apprenticeships',
      title: 'Apprenticeships',
      icon: Award,
      color: 'purple',
      description: 'Learn while you earn with skilled trades',
      count: 67
    },
    {
      id: 'skill-development',
      title: 'Skill Development',
      icon: BookOpen,
      color: 'orange',
      description: 'Free and paid training programs',
      count: 234
    },
    {
      id: 'government-schemes',
      title: 'Government Schemes',
      icon: Users,
      color: 'red',
      description: 'Employment programs and subsidies',
      count: 45
    },
    {
      id: 'entrepreneurship',
      title: 'Entrepreneurship',
      icon: TrendingUp,
      color: 'indigo',
      description: 'Start your own business with support',
      count: 78
    }
  ];

  const featuredOpportunities = [
    {
      id: 1,
      title: 'Digital Marketing Intern',
      company: 'TechStart Solutions',
      type: 'internship',
      location: 'Delhi',
      stipend: 'Rs. 8,000/month',
      duration: '3 months',
      skills: ['SEO', 'Social Media', 'Content Writing'],
      deadline: '2024-04-15',
      featured: true,
      description: 'Learn digital marketing from industry experts while working on real campaigns.'
    },
    {
      id: 2,
      title: 'Web Development Bootcamp',
      company: 'Code Academy',
      type: 'skill-development',
      location: 'Online',
      stipend: 'Free with Certificate',
      duration: '6 weeks',
      skills: ['HTML', 'CSS', 'JavaScript', 'React'],
      deadline: '2024-04-20',
      featured: true,
      description: 'Intensive bootcamp to become a full-stack web developer with job placement assistance.'
    },
    {
      id: 3,
      title: 'Retail Sales Associate',
      company: 'Fashion Hub',
      type: 'part-time',
      location: 'Mumbai',
      stipend: 'Rs. 12,000/month',
      duration: 'Flexible',
      skills: ['Customer Service', 'Sales', 'Communication'],
      deadline: 'Ongoing',
      featured: true,
      description: 'Part-time retail position with flexible hours perfect for students.'
    },
    {
      id: 4,
      title: 'Electrician Apprenticeship',
      company: 'Power Tech Services',
      type: 'apprenticeship',
      location: 'Bangalore',
      stipend: 'Rs. 6,000/month',
      duration: '12 months',
      skills: ['Electrical Work', 'Safety Protocols', 'Troubleshooting'],
      deadline: '2024-04-10',
      featured: true,
      description: 'Learn electrical work through hands-on training with experienced technicians.'
    },
    {
      id: 5,
      title: 'Business Startup Grant',
      company: 'Youth Entrepreneurship Fund',
      type: 'entrepreneurship',
      location: 'Pan India',
      stipend: 'Up to Rs. 50,000',
      duration: '6 months support',
      skills: ['Business Planning', 'Financial Management'],
      deadline: '2024-04-25',
      featured: true,
      description: 'Funding and mentorship for young entrepreneurs to start their own businesses.'
    },
    {
      id: 6,
      title: 'Data Entry Operator',
      company: 'Admin Solutions',
      type: 'part-time',
      location: 'Remote',
      stipend: 'Rs. 5,000/month',
      duration: 'Flexible',
      skills: ['Typing', 'MS Office', 'Data Management'],
      deadline: 'Ongoing',
      featured: true,
      description: 'Remote data entry position perfect for students looking for flexible work.'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
      green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' },
      red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
      indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200' }
    };
    return colorMap[color];
  };

  const filteredOpportunities = featuredOpportunities.filter(opportunity => {
    const matchesCategory = activeCategory === 'all' || opportunity.type === activeCategory;
    const matchesSearch = searchQuery === '' || 
      opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Employment Opportunities
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover internships, part-time jobs, skill development programs, and career opportunities to kickstart your professional journey.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">669</div>
            <div className="text-gray-600">Active Opportunities</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">1,234</div>
            <div className="text-gray-600">Youth Employed</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">89</div>
            <div className="text-gray-600">Partner Companies</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">Rs. 15K</div>
            <div className="text-gray-600">Avg. Monthly Stipend</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search opportunities by title, company, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button className="flex items-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={`p-4 rounded-lg border-2 transition-all ${
              activeCategory === 'all'
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-blue-300'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">All</div>
              <div className="text-sm text-gray-600">669 opportunities</div>
            </div>
          </button>
          
          {opportunityCategories.map((category) => {
            const Icon = category.icon;
            const colors = getColorClasses(category.color);
            
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  activeCategory === category.id
                    ? `${colors.border} ${colors.bg}`
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <Icon className={`w-6 h-6 mx-auto mb-2 ${colors.text}`} />
                  <div className="font-medium text-gray-900">{category.title}</div>
                  <div className="text-sm text-gray-600">{category.count} opportunities</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Featured Opportunities */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {opportunity.title}
                      </h3>
                      <p className="text-gray-600">{opportunity.company}</p>
                    </div>
                    {opportunity.featured && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4">
                    {opportunity.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {opportunity.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="w-4 h-4 mr-2" />
                      {opportunity.stipend}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {opportunity.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      Deadline: {new Date(opportunity.deadline).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {opportunity.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                    Apply Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Career Resources */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Career Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Resume Building</h3>
              <p className="text-gray-600 text-sm mb-4">
                Professional templates and guidance to create impressive resumes
              </p>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Access Resources
              </button>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Interview Preparation</h3>
              <p className="text-gray-600 text-sm mb-4">
                Mock interviews, common questions, and expert tips
              </p>
              <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                Start Practicing
              </button>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Career Guidance</h3>
              <p className="text-gray-600 text-sm mb-4">
                Discover your strengths and find the right career path
              </p>
              <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                Get Guidance
              </button>
            </div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center mb-3">
                <Star className="w-5 h-5 text-yellow-300 mr-2" />
                <span className="font-semibold">Priya Sharma</span>
              </div>
              <p className="text-sm opacity-90">
                "Got my first internship through this platform. Now working at a top tech company!"
              </p>
            </div>
            <div>
              <div className="flex items-center mb-3">
                <Star className="w-5 h-5 text-yellow-300 mr-2" />
                <span className="font-semibold">Rahul Kumar</span>
              </div>
              <p className="text-sm opacity-90">
                "The skill development program helped me land a great job in digital marketing."
              </p>
            </div>
            <div>
              <div className="flex items-center mb-3">
                <Star className="w-5 h-5 text-yellow-300 mr-2" />
                <span className="font-semibold">Anjali Patel</span>
              </div>
              <p className="text-sm opacity-90">
                "Started my own business with the entrepreneurship grant and mentorship support."
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Opportunities;
