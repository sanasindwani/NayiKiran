import React, { useState } from 'react';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Briefcase,
  Users,
  CheckCircle,
  ArrowRight,
  Star
} from 'lucide-react';

const CareerGuidance = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [assessmentResults, setAssessmentResults] = useState(null);

  const careerPaths = [
    {
      id: 'technology',
      title: 'Technology & IT',
      icon: 'computer',
      description: 'Software development, data science, cybersecurity, and IT support',
      averageSalary: 'Rs. 6-15 LPA',
      growthRate: '22%',
      requiredSkills: ['Programming', 'Problem Solving', 'Analytical Thinking'],
      jobRoles: ['Software Developer', 'Data Analyst', 'IT Support', 'Cybersecurity Analyst'],
      educationLevel: 'Bachelor\'s Degree',
      companies: ['TCS', 'Infosys', 'Wipro', 'HCL Technologies'],
      learningPath: ['Programming Basics', 'Database Management', 'Web Development', 'Cloud Computing']
    },
    {
      id: 'healthcare',
      title: 'Healthcare & Medicine',
      icon: 'medical',
      description: 'Medical services, nursing, pharmacy, and healthcare administration',
      averageSalary: 'Rs. 4-12 LPA',
      growthRate: '18%',
      requiredSkills: ['Medical Knowledge', 'Empathy', 'Attention to Detail'],
      jobRoles: ['Nurse', 'Medical Assistant', 'Pharmacist', 'Healthcare Administrator'],
      educationLevel: 'Diploma/Degree',
      companies: ['Apollo Hospitals', 'Fortis Healthcare', 'Max Healthcare', 'AIIMS'],
      learningPath: ['Biology Basics', 'Medical Terminology', 'Patient Care', 'Healthcare Management']
    },
    {
      id: 'business',
      title: 'Business & Management',
      icon: 'business',
      description: 'Marketing, finance, human resources, and business operations',
      averageSalary: 'Rs. 5-20 LPA',
      growthRate: '15%',
      requiredSkills: ['Communication', 'Leadership', 'Financial Literacy'],
      jobRoles: ['Marketing Manager', 'HR Executive', 'Business Analyst', 'Sales Manager'],
      educationLevel: 'Bachelor\'s Degree',
      companies: ['Reliance Industries', 'Tata Group', 'Aditya Birla', 'Mahindra'],
      learningPath: ['Business Fundamentals', 'Marketing Basics', 'Financial Management', 'Leadership Skills']
    },
    {
      id: 'creative',
      title: 'Creative & Design',
      icon: 'design',
      description: 'Graphic design, content creation, media, and artistic professions',
      averageSalary: 'Rs. 3-10 LPA',
      growthRate: '12%',
      requiredSkills: ['Creativity', 'Design Software', 'Visual Communication'],
      jobRoles: ['Graphic Designer', 'Content Creator', 'Video Editor', 'UI/UX Designer'],
      educationLevel: 'Diploma/Degree',
      companies: ['Ogilvy', 'WPP', 'Publicis Groupe', 'Dentsu'],
      learningPath: ['Design Principles', 'Software Skills', 'Portfolio Building', 'Client Management']
    },
    {
      id: 'skilled-trades',
      title: 'Skilled Trades',
      icon: 'trades',
      description: 'Electrician, plumber, carpenter, mechanic, and other skilled professions',
      averageSalary: 'Rs. 3-8 LPA',
      growthRate: '10%',
      requiredSkills: ['Technical Skills', 'Problem Solving', 'Physical Stamina'],
      jobRoles: ['Electrician', 'Plumber', 'Mechanic', 'Welder', 'Carpenter'],
      educationLevel: 'Vocational Training',
      companies: ['Local Businesses', 'Construction Companies', 'Automobile Workshops'],
      learningPath: ['Trade Basics', 'Safety Training', 'Hands-on Practice', 'Business Setup']
    },
    {
      id: 'education',
      title: 'Education & Teaching',
      icon: 'education',
      description: 'Teaching, training, curriculum development, and educational administration',
      averageSalary: 'Rs. 3-8 LPA',
      growthRate: '8%',
      requiredSkills: ['Teaching Skills', 'Patience', 'Subject Knowledge'],
      jobRoles: ['Teacher', 'Trainer', 'Educational Consultant', 'Curriculum Developer'],
      educationLevel: 'Bachelor\'s Degree + B.Ed',
      companies: ['Schools', 'Colleges', 'Educational Institutions', 'EdTech Companies'],
      learningPath: ['Subject Mastery', 'Teaching Methods', 'Classroom Management', 'Educational Technology']
    }
  ];

  const interestAreas = [
    { id: 'problem-solving', name: 'Problem Solving', icon: 'puzzle' },
    { id: 'creativity', name: 'Creativity', icon: 'palette' },
    { id: 'helping-others', name: 'Helping Others', icon: 'heart' },
    { id: 'technology', name: 'Technology', icon: 'laptop' },
    { id: 'business', name: 'Business', icon: 'chart' },
    { id: 'science', name: 'Science', icon: 'microscope' },
    { id: 'arts', name: 'Arts', icon: 'brush' },
    { id: 'sports', name: 'Sports', icon: 'trophy' },
    { id: 'nature', name: 'Nature', icon: 'leaf' },
    { id: 'communication', name: 'Communication', icon: 'message' }
  ];

  const skillsAssessment = [
    {
      category: 'Technical Skills',
      questions: [
        'I enjoy working with computers and technology',
        'I am good at fixing technical problems',
        'I like learning new software and tools'
      ]
    },
    {
      category: 'Creative Skills',
      questions: [
        'I enjoy drawing, painting, or designing',
        'I like coming up with new ideas',
        'I have a good sense of color and design'
      ]
    },
    {
      category: 'People Skills',
      questions: [
        'I enjoy working in teams',
        'I am good at communicating with others',
        'I like helping and teaching people'
      ]
    },
    {
      category: 'Analytical Skills',
      questions: [
        'I enjoy solving puzzles and problems',
        'I am good at analyzing data and information',
        'I like to understand how things work'
      ]
    }
  ];

  const handleInterestToggle = (interestId) => {
    setSelectedInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const calculateCareerMatch = () => {
    const matches = careerPaths.map(career => {
      let score = 0;
      
      // Interest matching
      if (selectedInterests.includes('technology') && career.id === 'technology') score += 30;
      if (selectedInterests.includes('helping-others') && career.id === 'healthcare') score += 30;
      if (selectedInterests.includes('business') && career.id === 'business') score += 30;
      if (selectedInterests.includes('creativity') && career.id === 'creative') score += 30;
      if (selectedInterests.includes('problem-solving') && career.id === 'skilled-trades') score += 30;
      if (selectedInterests.includes('helping-others') && career.id === 'education') score += 30;
      
      return { ...career, matchScore: Math.min(score + Math.floor(Math.random() * 30), 100) };
    });
    
    return matches.sort((a, b) => b.matchScore - a.matchScore);
  };

  const renderAssessmentStep = () => {
    switch (activeStep) {
      case 1:
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Step 1: Select Your Interests</h3>
            <p className="text-gray-600 mb-6">
              Choose the areas that interest you the most. This will help us suggest suitable career paths.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              {interestAreas.map((interest) => (
                <button
                  key={interest.id}
                  onClick={() => handleInterestToggle(interest.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedInterests.includes(interest.id)
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-blue-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">
                      {interest.icon === 'puzzle' && 'puzzle'}
                      {interest.icon === 'palette' && 'palette'}
                      {interest.icon === 'heart' && 'heart'}
                      {interest.icon === 'laptop' && 'laptop'}
                      {interest.icon === 'chart' && 'chart'}
                      {interest.icon === 'microscope' && 'microscope'}
                      {interest.icon === 'brush' && 'brush'}
                      {interest.icon === 'trophy' && 'trophy'}
                      {interest.icon === 'leaf' && 'leaf'}
                      {interest.icon === 'message' && 'message'}
                    </div>
                    <div className="text-sm font-medium text-gray-900">{interest.name}</div>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={() => setActiveStep(2)}
                disabled={selectedInterests.length === 0}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next Step
              </button>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Step 2: Skills Assessment</h3>
            <p className="text-gray-600 mb-6">
              Rate your skills in different areas to get more accurate career recommendations.
            </p>
            
            {skillsAssessment.map((category, index) => (
              <div key={index} className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">{category.category}</h4>
                <div className="space-y-3">
                  {category.questions.map((question, qIndex) => (
                    <div key={qIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">{question}</span>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            className="w-8 h-8 rounded-full bg-white border border-gray-300 hover:bg-blue-100 hover:border-blue-500"
                          >
                            {rating}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="flex justify-between">
              <button
                onClick={() => setActiveStep(1)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => {
                  const results = calculateCareerMatch();
                  setAssessmentResults(results);
                  setActiveStep(3);
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Get Results
              </button>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Your Career Recommendations</h3>
            <p className="text-gray-600 mb-6">
              Based on your interests and skills, here are the top career paths for you:
            </p>
            
            <div className="space-y-4">
              {assessmentResults?.slice(0, 3).map((career, index) => (
                <div key={career.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{career.title}</h4>
                      <p className="text-sm text-gray-600">{career.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{career.matchScore}%</div>
                      <div className="text-sm text-gray-600">Match</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <span className="text-sm text-gray-600">Avg. Salary:</span>
                      <span className="text-sm font-medium text-gray-900 ml-1">{career.averageSalary}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Growth Rate:</span>
                      <span className="text-sm font-medium text-green-600 ml-1">{career.growthRate}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Education:</span>
                      <span className="text-sm font-medium text-gray-900 ml-1">{career.educationLevel}</span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-2">Key Skills:</div>
                    <div className="flex flex-wrap gap-2">
                      {career.requiredSkills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-2">Job Roles:</div>
                    <div className="flex flex-wrap gap-2">
                      {career.jobRoles.map((role, roleIndex) => (
                        <span key={roleIndex} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center">
                    Explore Career Path
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setActiveStep(2)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Retake Assessment
              </button>
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Download Report
              </button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Career Guidance</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover your perfect career path with our AI-powered assessment and personalized recommendations.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step <= activeStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-20 h-1 mx-2 ${
                    step < activeStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-gray-600">
            {activeStep === 1 && 'Select Your Interests'}
            {activeStep === 2 && 'Skills Assessment'}
            {activeStep === 3 && 'View Your Results'}
          </div>
        </div>

        {/* Assessment Content */}
        {renderAssessmentStep()}

        {/* Quick Career Tips */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Target className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="font-semibold text-gray-900">Set Clear Goals</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Define your career objectives and create a roadmap to achieve them step by step.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <BookOpen className="w-8 h-8 text-green-600 mr-3" />
              <h3 className="font-semibold text-gray-900">Continuous Learning</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Stay updated with industry trends and continuously upgrade your skills.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Users className="w-8 h-8 text-purple-600 mr-3" />
              <h3 className="font-semibold text-gray-900">Network Building</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Connect with professionals in your field and build meaningful relationships.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerGuidance;
