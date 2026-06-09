import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Clock, 
  User, 
  Wifi, 
  Award, 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Building, 
  TrendingUp, 
  Users, 
  ArrowRight, 
  Star, 
  Heart,
  Bell,
  ChevronRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const JobDiscovery = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedJobs, setSavedJobs] = useState([]);

  const jobCategories = [
    {
      id: 'internships',
      title: 'Internship Portal',
      subtitle: 'Curated internships for students',
      icon: Briefcase,
      color: 'blue',
      description: 'Gain hands-on experience in top companies across tech, marketing, design, and more',
      count: 245,
      avgDuration: '3-6 months',
      avgStipend: 'Rs. 5,000-15,000/month'
    },
    {
      id: 'part-time',
      title: 'Part-Time Jobs',
      subtitle: 'Flexible work opportunities',
      icon: Clock,
      color: 'green',
      description: 'Perfect for students - retail, food service, tutoring, and more with flexible hours',
      count: 189,
      avgDuration: 'Flexible',
      avgStipend: 'Rs. 8,000-20,000/month'
    },
    {
      id: 'entry-level',
      title: 'Entry-Level Jobs',
      subtitle: 'First job opportunities',
      icon: User,
      color: 'purple',
      description: 'Start your career with entry-level positions perfect for fresh graduates',
      count: 156,
      avgDuration: 'Full-time',
      avgStipend: 'Rs. 15,000-35,000/month'
    },
    {
      id: 'remote',
      title: 'Remote Work',
      subtitle: 'Work from home opportunities',
      icon: Wifi,
      color: 'orange',
      description: 'Flexible remote positions that allow you to work from anywhere',
      count: 134,
      avgDuration: 'Flexible',
      avgStipend: 'Rs. 10,000-30,000/month'
    },
    {
      id: 'apprenticeships',
      title: 'Apprenticeships',
      subtitle: 'Learn while you earn',
      icon: Award,
      color: 'red',
      description: 'Skilled trade programs with on-the-job training and certification',
      count: 89,
      avgDuration: '6-12 months',
      avgStipend: 'Rs. 6,000-12,000/month'
    },
    {
      id: 'skill-based',
      title: 'Skill-Based Jobs',
      subtitle: 'No education required',
      icon: Users,
      color: 'pink',
      description: 'Practical jobs for women - candle making, sewing, cooking, handicrafts and more',
      count: 267,
      avgDuration: 'Flexible',
      avgStipend: 'Rs. 4,000-15,000/month'
    }
  ];

  const featuredJobs = [
    // Internships
    {
      id: 1,
      title: 'Handicraft Training Intern',
      company: 'Traditional Crafts Center',
      type: 'internships',
      location: 'Jaipur',
      mode: 'On-site',
      stipend: 'Rs. 4,000/month',
      duration: '3 months',
      deadline: '2024-04-25',
      skills: ['Handicrafts', 'Jewelry Making', 'Embroidery', 'Painting'],
      description: 'Learn traditional crafts and earn while learning.',
      featured: true,
      category: 'Internships'
    },
    {
      id: 2,
      title: 'Food Processing Intern',
      company: 'Local Food Industry',
      type: 'internships',
      location: 'Mumbai',
      mode: 'On-site',
      stipend: 'Rs. 5,000/month',
      duration: '4 months',
      deadline: '2024-04-28',
      skills: ['Food Preparation', 'Packaging', 'Quality Check', 'Hygiene'],
      description: 'Learn food processing and packaging skills.',
      featured: true,
      category: 'Internships'
    },
    {
      id: 3,
      title: 'Textile Weaving Intern',
      company: 'Handloom Cooperative',
      type: 'internships',
      location: 'Varanasi',
      mode: 'On-site',
      stipend: 'Rs. 4,500/month',
      duration: '6 months',
      deadline: '2024-04-30',
      skills: ['Weaving', 'Pattern Making', 'Color Matching', 'Quality Control'],
      description: 'Master traditional weaving techniques.',
      featured: true,
      category: 'Internships'
    },

    // Part-time Jobs
    {
      id: 4,
      title: 'Domestic Helper',
      company: 'Household Services',
      type: 'part-time',
      location: 'Delhi',
      mode: 'Field',
      stipend: 'Rs. 8,000/month',
      duration: 'Ongoing',
      deadline: '2024-04-26',
      skills: ['Cleaning', 'Cooking', 'Child Care', 'Time Management'],
      description: 'Help with household chores and cooking.',
      featured: true,
      category: 'Part-Time Jobs'
    },
    {
      id: 5,
      title: 'Street Food Vendor Assistant',
      company: 'Local Food Stall',
      type: 'part-time',
      location: 'Mumbai',
      mode: 'On-site',
      stipend: 'Rs. 6,000/month',
      duration: 'Ongoing',
      deadline: '2024-04-29',
      skills: ['Food Preparation', 'Customer Service', 'Cash Handling', 'Hygiene'],
      description: 'Assist in street food preparation and sales.',
      featured: true,
      category: 'Part-Time Jobs'
    },
    {
      id: 6,
      title: 'Laundry Worker',
      company: 'Laundry Service',
      type: 'part-time',
      location: 'Bangalore',
      mode: 'On-site',
      stipend: 'Rs. 7,000/month',
      duration: 'Ongoing',
      deadline: '2024-04-27',
      skills: ['Washing', 'Ironing', 'Folding', 'Customer Service'],
      description: 'Handle laundry operations for customers.',
      featured: true,
      category: 'Part-Time Jobs'
    },

    // Entry-level Jobs
    {
      id: 7,
      title: 'Factory Worker',
      company: 'Manufacturing Unit',
      type: 'entry-level',
      location: 'Hyderabad',
      mode: 'On-site',
      stipend: 'Rs. 12,000/month',
      duration: 'Full-time',
      deadline: '2024-04-24',
      skills: ['Assembly', 'Quality Check', 'Machine Operation', 'Safety'],
      description: 'Work in manufacturing and assembly operations.',
      featured: true,
      category: 'Entry-Level Jobs'
    },
    {
      id: 8,
      title: 'Retail Sales Assistant',
      company: 'Local Grocery Store',
      type: 'entry-level',
      location: 'Mumbai',
      mode: 'On-site',
      stipend: 'Rs. 10,000/month',
      duration: 'Full-time',
      deadline: '2024-04-25',
      skills: ['Customer Service', 'Cash Handling', 'Stock Management', 'Communication'],
      description: 'Assist customers and manage store operations.',
      featured: true,
      category: 'Entry-Level Jobs'
    },
    {
      id: 9,
      title: 'Construction Helper',
      company: 'Building Contractor',
      type: 'entry-level',
      location: 'Pune',
      mode: 'On-site',
      stipend: 'Rs. 11,000/month',
      duration: 'Full-time',
      deadline: '2024-04-30',
      skills: ['Manual Labor', 'Tool Handling', 'Site Safety', 'Teamwork'],
      description: 'Assist in construction and building work.',
      featured: true,
      category: 'Entry-Level Jobs'
    },

    // Remote Work
    {
      id: 10,
      title: 'Home-Based Data Entry',
      company: 'Data Processing Center',
      type: 'remote',
      location: 'Remote',
      mode: 'Home-based',
      stipend: 'Rs. 6,000/month',
      duration: 'Part-time',
      deadline: '2024-04-26',
      skills: ['Typing', 'Basic Computer', 'Attention to Detail', 'Time Management'],
      description: 'Data entry work from home with flexible hours.',
      featured: true,
      category: 'Remote Work'
    },
    {
      id: 11,
      title: 'Online Survey Participant',
      company: 'Research Company',
      type: 'remote',
      location: 'Remote',
      mode: 'Home-based',
      stipend: 'Rs. 4,000/month',
      duration: 'Flexible',
      deadline: '2024-04-28',
      skills: ['Basic Reading', 'Opinion Sharing', 'Honesty', 'Regular Participation'],
      description: 'Participate in online surveys and earn money.',
      featured: true,
      category: 'Remote Work'
    },

    // Apprenticeships
    {
      id: 12,
      title: 'Beauty Parlor Assistant',
      company: 'Local Beauty Salon',
      type: 'apprenticeships',
      location: 'Delhi',
      mode: 'On-site',
      stipend: 'Rs. 5,000/month',
      duration: '6 months',
      deadline: '2024-04-28',
      skills: ['Beauty Services', 'Customer Care', 'Hygiene', 'Product Knowledge'],
      description: 'Learn beauty services and salon management.',
      featured: true,
      category: 'Apprenticeships'
    },

    // Skill-Based Jobs for Women
    {
      id: 13,
      title: 'Candle Making Worker',
      company: 'Handicraft Center',
      type: 'skill-based',
      location: 'Delhi',
      mode: 'On-site',
      stipend: 'Rs. 5,000-8,000/month',
      duration: 'Flexible',
      deadline: 'Ongoing',
      skills: ['Candle Making', 'Wax Work', 'Decorations', 'Quality Check'],
      description: 'Make decorative candles and earn per piece. No education required, training provided.',
      featured: true,
      category: 'Skill-Based Jobs'
    },
    {
      id: 14,
      title: 'Agarbatti Making',
      company: 'Traditional Crafts',
      type: 'skill-based',
      location: 'Mumbai',
      mode: 'Home-based',
      stipend: 'Rs. 4,000-10,000/month',
      duration: 'Flexible',
      deadline: 'Ongoing',
      skills: ['Agarbatti Rolling', 'Fragrance Mixing', 'Packaging', 'Quality Control'],
      description: 'Work from home making traditional incense sticks. Materials provided, earn per piece.',
      featured: true,
      category: 'Skill-Based Jobs'
    },
    {
      id: 15,
      title: 'Sewing & Tailoring',
      company: 'Garment Workshop',
      type: 'skill-based',
      location: 'Bangalore',
      mode: 'On-site',
      stipend: 'Rs. 6,000-12,000/month',
      duration: 'Flexible',
      deadline: 'Ongoing',
      skills: ['Sewing Machine', 'Pattern Making', 'Alterations', 'Finishing'],
      description: 'Sew garments and do alterations. Training provided, machines available at workshop.',
      featured: true,
      category: 'Skill-Based Jobs'
    },
    {
      id: 16,
      title: 'Cooking Assistant',
      company: 'Home Kitchen Services',
      type: 'skill-based',
      location: 'Multiple Cities',
      mode: 'On-site',
      stipend: 'Rs. 8,000-15,000/month',
      duration: 'Full-time',
      deadline: 'Ongoing',
      skills: ['Cooking', 'Kitchen Hygiene', 'Meal Preparation', 'Time Management'],
      description: 'Prepare meals for households and small catering. No formal education needed.',
      featured: true,
      category: 'Skill-Based Jobs'
    },
    {
      id: 17,
      title: 'House Cleaning Services',
      company: 'Clean Home Solutions',
      type: 'skill-based',
      location: 'Delhi',
      mode: 'Field',
      stipend: 'Rs. 6,000-10,000/month',
      duration: 'Flexible hours',
      deadline: 'Ongoing',
      skills: ['Cleaning', 'Organization', 'Time Management', 'Customer Service'],
      description: 'Provide house cleaning services. Flexible hours, training provided.',
      featured: true,
      category: 'Skill-Based Jobs'
    },
    {
      id: 18,
      title: 'Handicraft Making',
      company: 'Artisan Collective',
      type: 'skill-based',
      location: 'Jaipur',
      mode: 'Home-based',
      stipend: 'Rs. 5,000-12,000/month',
      duration: 'Flexible',
      deadline: 'Ongoing',
      skills: ['Handicrafts', 'Jewelry Making', 'Embroidery', 'Painting'],
      description: 'Create traditional handicrafts and jewelry. Work from home, materials provided.',
      featured: true,
      category: 'Skill-Based Jobs'
    },
    {
      id: 19,
      title: 'Packing & Labeling',
      company: 'Packaging Solutions',
      type: 'skill-based',
      location: 'Hyderabad',
      mode: 'On-site',
      stipend: 'Rs. 4,500-8,000/month',
      duration: 'Flexible',
      deadline: 'Ongoing',
      skills: ['Packing', 'Labeling', 'Quality Check', 'Basic Counting'],
      description: 'Pack and label products for various companies. No skills required, training given.',
      featured: true,
      category: 'Skill-Based Jobs'
    },
    {
      id: 20,
      title: 'Flower Garland Making',
      company: 'Traditional Flowers',
      type: 'skill-based',
      location: 'Chennai',
      mode: 'Home-based',
      stipend: 'Rs. 4,000-9,000/month',
      duration: 'Flexible',
      deadline: 'Ongoing',
      skills: ['Flower Arrangement', 'Garland Making', 'Decorative Work'],
      description: 'Make traditional flower garlands for events and temples. Work from home.',
      featured: true,
      category: 'Skill-Based Jobs'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', hoverBg: 'hover:bg-blue-100' },
      green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200', hoverBg: 'hover:bg-green-100' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', hoverBg: 'hover:bg-purple-100' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', hoverBg: 'hover:bg-orange-100' },
      red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', hoverBg: 'hover:bg-red-100' },
      pink: { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200', hoverBg: 'hover:bg-pink-100' }
    };
    return colorMap[color];
  };

  const filteredJobs = featuredJobs.filter(job => {
    const matchesCategory = activeCategory === 'all' || job.type === activeCategory;
    const matchesSearch = searchQuery === '' || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const toggleSaveJob = (jobId) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Job Discovery Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the perfect opportunity to kickstart your career - internships, part-time jobs, entry-level positions, remote work, and apprenticeships.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {jobCategories.map((category) => {
            const Icon = category.icon;
            const colors = getColorClasses(category.color);
            
            return (
              <div key={category.id} className={`${colors.bg} rounded-lg p-4 text-center`}>
                <Icon className={`w-8 h-8 ${colors.text} mx-auto mb-2`} />
                <div className="text-2xl font-bold text-gray-900">{category.count}</div>
                <div className="text-sm text-gray-600">{category.title}</div>
              </div>
            );
          })}
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search jobs by title, company, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
              <button className="flex items-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Bell className="w-4 h-4 mr-2" />
                Alerts
              </button>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={`p-4 rounded-lg border-2 transition-all ${
              activeCategory === 'all'
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-blue-300'
            }`}
          >
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">All Jobs</div>
              <div className="text-sm text-gray-600">813 opportunities</div>
            </div>
          </button>
          
          {jobCategories.map((category) => {
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
                  <div className="text-sm text-gray-600">{category.count} jobs</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Category Details */}
        {activeCategory !== 'all' && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            {jobCategories.filter(cat => cat.id === activeCategory).map((category) => {
              const colors = getColorClasses(category.color);
              const Icon = category.icon;
              
              return (
                <div key={category.id} className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${colors.bg}`}>
                    <Icon className={`w-8 h-8 ${colors.text}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>Duration: {category.avgDuration}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="w-4 h-4 mr-2" />
                        <span>Avg. Stipend: {category.avgStipend}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Building className="w-4 h-4 mr-2" />
                        <span>{category.count} Active Opportunities</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Jobs Listing */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {activeCategory === 'all' ? 'All Opportunities' : jobCategories.find(cat => cat.id === activeCategory)?.title}
            </h2>
            <div className="text-sm text-gray-600">
              Showing {filteredJobs.length} of {featuredJobs.length} jobs
            </div>
          </div>

          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 mr-3">{job.title}</h3>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {job.category}
                      </span>
                      {job.featured && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full ml-2">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Building className="w-4 h-4 mr-2" />
                      <span className="font-medium">{job.company}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{job.description}</p>
                  </div>
                  <button
                    onClick={() => toggleSaveJob(job.id)}
                    className="ml-4 p-2 rounded-lg hover:bg-gray-100"
                  >
                    <Heart className={`w-5 h-5 ${savedJobs.includes(job.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                  </button>
                </div>

                {/* Job Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Wifi className="w-4 h-4 mr-2" />
                    <span>{job.mode}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span>{job.stipend}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between">
                  <button className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium">
                    View Details
                  </button>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                    Apply Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Resources */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="font-semibold text-gray-900">Career Guidance</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Get personalized career advice and job search tips from experts.
            </p>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
              Explore Resources
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Users className="w-8 h-8 text-green-600 mr-3" />
              <h3 className="font-semibold text-gray-900">Success Stories</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Read inspiring stories from youth who found their dream jobs.
            </p>
            <button className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center">
              Read Stories
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Award className="w-8 h-8 text-purple-600 mr-3" />
              <h3 className="font-semibold text-gray-900">Skill Development</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Access free courses and certifications to boost your employability.
            </p>
            <button className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center">
              Start Learning
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobDiscovery;
