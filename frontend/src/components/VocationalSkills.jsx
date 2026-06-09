import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VocationalSkills = ({ onBack }) => {
    const [activeCategory, setActiveCategory] = useState(null);
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [completedSkills, setCompletedSkills] = useState([]);

    // Helper function to extract YouTube video ID and generate thumbnail URL
    const getYouTubeThumbnail = (url) => {
        const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
        if (videoId && videoId[1]) {
            return `https://img.youtube.com/vi/${videoId[1]}/maxresdefault.jpg`;
        }
        return 'https://via.placeholder.com/320x180?text=Video+Thumbnail';
    };

    const categories = [
        {
            id: 'beauty',
            title: 'Beauty & Wellness',
            icon: 'sparkles',
            color: 'bg-pink-500',
            description: 'High-demand skills with no background checks',
            skills: [
                {
                    id: 'mehendi',
                    title: 'Mehendi Design',
                    timeToLearn: '2-3 weeks',
                    earningPotential: 'Rs. 500-2000 per function',
                    startupCost: 'Rs. 200-500',
                    steps: [
                        'Buy mehendi cone and practice paper',
                        'Learn basic patterns: flowers, leaves, peacocks',
                        'Practice on friends/family hands',
                        'Create portfolio of 10 designs',
                        'Start with small functions, then weddings'
                    ],
                    materials: ['Mehendi cones (Rs. 20-50 each)', 'Practice paper', 'Design book'],
                    whereToWork: 'Weddings, festivals, beauty parlors, home service'
                },
                {
                    id: 'threading',
                    title: 'Eyebrow Threading',
                    timeToLearn: '1-2 weeks',
                    earningPotential: 'Rs. 50-150 per client',
                    startupCost: 'Rs. 100-200',
                    steps: [
                        'Buy threading cotton and practice cushion',
                        'Learn basic threading technique from YouTube',
                        'Practice on 5-10 volunteers',
                        'Master different brow shapes',
                        'Set up small space at home or visit clients'
                    ],
                    materials: ['Threading cotton', 'Talcum powder', 'Mirror', 'Small scissors'],
                    whereToWork: 'Home service, beauty parlors, salons'
                },
                {
                    id: 'makeup',
                    title: 'Bridal Makeup Basics',
                    timeToLearn: '4-6 weeks',
                    earningPotential: 'Rs. 2000-10000 per bride',
                    startupCost: 'Rs. 1000-3000',
                    steps: [
                        'Start with basic makeup kit',
                        'Learn skin prep and foundation matching',
                        'Practice eye makeup techniques',
                        'Create portfolio with before/after photos',
                        'Assist senior makeup artists initially'
                    ],
                    materials: ['Foundation set', 'Eye shadows', 'Lipsticks', 'Brushes', 'Sponges'],
                    whereToWork: 'Weddings, events, beauty parlors, freelance'
                }
            ]
        },
        {
            id: 'handicrafts',
            title: 'Handicrafts & Small Business',
            icon: 'palette',
            color: 'bg-green-500',
            description: 'Work from anywhere, flexible hours',
            skills: [
                {
                    id: 'candles',
                    title: 'Candle Making',
                    timeToLearn: '1-2 weeks',
                    earningPotential: 'Rs. 1000-5000 monthly',
                    startupCost: 'Rs. 500-1000',
                    steps: [
                        'Learn basic candle making online',
                        'Start with simple paraffin wax candles',
                        'Experiment with colors and fragrances',
                        'Sell to local shops, friends, online',
                        'Expand to decorative candles'
                    ],
                    materials: ['Wax', 'Wicks', 'Fragrance oils', 'Colors', 'Molds'],
                    whereToWork: 'Home production, local markets, online orders'
                },
                {
                    id: 'tailoring',
                    title: 'Basic Tailoring',
                    timeToLearn: '6-8 weeks',
                    earningPotential: 'Rs. 3000-10000 monthly',
                    startupCost: 'Rs. 2000-5000',
                    steps: [
                        'Buy second-hand sewing machine',
                        'Learn basic stitching and repairs',
                        'Master blouse cutting and stitching',
                        'Take orders from neighbors',
                        'Expand to simple dresses and alterations'
                    ],
                    materials: ['Sewing machine', 'Thread set', 'Scissors', 'Measuring tape', 'Fabrics'],
                    whereToWork: 'Home service, tailoring shops, orders from home'
                },
                {
                    id: 'agarbatti',
                    title: 'Agarbatti Making',
                    timeToLearn: '3-5 days',
                    earningPotential: 'Rs. 2000-8000 monthly',
                    startupCost: 'Rs. 300-800',
                    steps: [
                        'Learn bamboo stick preparation',
                        'Mix fragrance powder correctly',
                        'Master rolling technique',
                        'Dry and package properly',
                        'Supply to local shops and temples'
                    ],
                    materials: ['Bamboo sticks', 'Fragrance powder', 'Binder gum', 'Packaging'],
                    whereToWork: 'Home production, direct supply to shops/temples'
                }
            ]
        },
        {
            id: 'services',
            title: 'Quick Start Services',
            icon: 'zap',
            color: 'bg-orange-500',
            description: 'Start earning within days',
            skills: [
                {
                    id: 'cooking',
                    title: 'Tiffin Service',
                    timeToLearn: '2-3 days',
                    earningPotential: 'Rs. 3000-8000 monthly',
                    startupCost: 'Rs. 1000-2000',
                    steps: [
                        'Plan simple, tasty menu (4-5 items)',
                        'Buy basic cooking ingredients',
                        'Start with 2-3 clients',
                        'Maintain quality and timing',
                        'Expand through word of mouth'
                    ],
                    materials: ['Cooking utensils', 'Tiffin boxes', 'Basic groceries'],
                    whereToWork: 'Home kitchen, delivery to working professionals'
                },
                {
                    id: 'cleaning',
                    title: 'Home Cleaning',
                    timeToLearn: '1-2 days',
                    earningPotential: 'Rs. 300-600 per home',
                    startupCost: 'Rs. 500-1000',
                    steps: [
                        'Buy cleaning supplies',
                        'Learn proper cleaning techniques',
                        'Start with neighbors and friends',
                        'Build reputation for thorough work',
                        'Get regular clients'
                    ],
                    materials: ['Cleaning liquids', 'Cloths', 'Brushes', 'Gloves', 'Bucket'],
                    whereToWork: 'Client homes, part-time work'
                }
            ]
        }
    ];

    const toggleSkillCompletion = (skillId) => {
        setCompletedSkills(prev =>
            prev.includes(skillId)
                ? prev.filter(id => id !== skillId)
                : [...prev, skillId]
        );
    };

    const emergencyNumbers = [
        { name: 'Women Helpline', number: '1091' },
        { name: 'Skill Development', number: '1800-123-9626' },
        { name: 'PMKVY Helpline', number: '1800-102-9626' },
        { name: 'Police', number: '100' }
    ];

    const youtubeResources = [
        {
            category: 'beauty',
            title: 'Beauty & Wellness Learning',
            videos: [
                {
                    title: 'Complete Mehendi Course for Beginners',
                    url: 'https://www.youtube.com/watch?v=irts21wG7BE&list=PLa-8xUlYgFNe6_jT7z7ihwt7DL02GQp-v&index=1',
                    level: 'Beginner'
                },
                {
                    title: 'Professional Eyebrow Threading Tutorial',
                    url: 'https://www.youtube.com/watch?v=_759Ahg-xYY&list=PL4RKvTB6TJp5I16tWb13Z7VGnGSPFz8vt&index=1',
                    level: 'Beginner'
                },
                {
                    title: 'Bridal Makeup Basics Step by Step',
                    url: 'https://www.youtube.com/watch?v=ts3vSsb1RFA&list=PL4yH0rGfqpsTFN11bNL_sqMvm40WQszuT&index=1',
                    level: 'Intermediate'
                }
            ]
        },
        {
            category: 'handicrafts',
            title: 'Handicrafts & Business Skills',
            videos: [
                {
                    title: 'Candle Making Business from Home',
                    url: 'https://www.youtube.com/watch?v=WDDS69_KGww',
                    level: 'Beginner'
                },
                {
                    title: 'Basic Tailoring for Beginners',
                    url: 'https://www.youtube.com/watch?v=GrINJYtCGf0&list=PL0HLVzfOJRGnyvfFf_rFbxFLLDMJHXKy4&index=1',
                    level: 'Beginner'
                },
                {
                    title: 'Agarbatti Making Complete Guide',
                    url: 'https://www.youtube.com/watch?v=LB1ujYuZADY',
                    level: 'Beginner'
                }
            ]
        },
        {
            category: 'services',
            title: 'Quick Start Services',
            videos: [
                {
                    title: 'How to Start Tiffin Service Business',
                    url: 'https://www.youtube.com/watch?v=_50VPq8YpmE',
                   
                    level: 'Beginner'
                },
                {
                    title: 'Professional Home Cleaning Techniques',
                    url: 'https://www.youtube.com/watch?v=0rNMpFcebcc',
                    level: 'Beginner'
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-4">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={onBack}
                    className="mb-6 flex items-center text-pink-600 hover:text-pink-800 transition"
                >
                    <span className="material-icons mr-2" aria-label="Back">arrow_back</span>
                    <span className="font-semibold">Back to Skills</span>
                </motion.button>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Alternative Vocational Skills
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Practical skills to start earning independently - no background checks required
                    </p>
                </motion.div>

                {/* Emergency Numbers */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-8"
                >
                    <h3 className="text-red-800 font-bold text-lg mb-3">Quick Help Numbers</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {emergencyNumbers.map((num, idx) => (
                            <div key={idx} className="bg-white rounded p-2 text-center">
                                <div className="text-sm text-gray-600">{num.name}</div>
                                <div className="font-bold text-red-600">{num.number}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* YouTube Learning Resources */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Video Learning Resources
                    </h2>
                    <div className="space-y-6">
                        {youtubeResources.map((resource) => (
                            <motion.div
                                key={resource.category}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white rounded-xl shadow-lg p-6"
                            >
                                <h3 className="text-xl font-bold text-gray-800 mb-4">
                                    {resource.title}
                                </h3>
                                <div className="grid md:grid-cols-3 gap-4">
                                    {resource.videos.map((video, idx) => (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="bg-gray-50 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                                            onClick={() => window.open(video.url, '_blank')}
                                        >
                                            <div className="relative">
                                                <img
                                                    src={getYouTubeThumbnail(video.url)}
                                                    alt={video.title}
                                                    className="w-full h-32 object-cover"
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/320x180?text=Video+Thumbnail';
                                                    }}
                                                />
                                                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                                                    {video.duration}
                                                </div>
                                                <div className="absolute inset-0 bg-red-600 bg-opacity-0 hover:bg-opacity-20 transition-all flex items-center justify-center">
                                                    <div className="bg-red-600 rounded-full p-2 opacity-0 hover:opacity-100 transition-opacity">
                                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M8 5v14l11-7z"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-3">
                                                <h4 className="font-semibold text-sm text-gray-800 mb-1 line-clamp-2">
                                                    {video.title}
                                                </h4>
                                                <div className="flex items-center justify-between">
                                                    <span className={`text-xs px-2 py-1 rounded ${
                                                        video.level === 'Beginner' 
                                                            ? 'bg-green-100 text-green-700' 
                                                            : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                        {video.level}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        {video.duration}
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Category Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {categories.map((category) => (
                        <motion.div
                            key={category.id}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
                            onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                        >
                            <div className={`${category.color} p-4 text-white`}>
                                <div className="text-3xl mb-2">{category.icon}</div>
                                <h3 className="font-bold text-lg">{category.title}</h3>
                                <p className="text-sm opacity-90 mt-2">{category.description}</p>
                            </div>
                            <div className="p-4">
                                <div className="text-sm text-gray-600">
                                    {category.skills.length} skill options
                                </div>
                                <div className="mt-2 text-xs text-gray-500">
                                    Click to explore skills
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Skills Details */}
                <AnimatePresence>
                    {activeCategory && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4"
                        >
                            {(() => {
                                const category = categories.find(c => c.id === activeCategory);
                                return (
                                    <div>
                                        <h3 className="text-2xl font-bold mb-6">{category.title}</h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {category.skills.map((skill, idx) => (
                                                <motion.div
                                                    key={skill.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.1 }}
                                                    className="bg-white rounded-lg shadow-md overflow-hidden"
                                                >
                                                    <div className="p-4 border-b">
                                                        <div className="flex justify-between items-start">
                                                            <h4 className="font-bold text-lg">{skill.title}</h4>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    toggleSkillCompletion(skill.id);
                                                                }}
                                                                className={`px-3 py-1 rounded-full text-sm ${completedSkills.includes(skill.id)
                                                                        ? 'bg-green-500 text-white'
                                                                        : 'bg-gray-200 text-gray-600'
                                                                    }`}
                                                            >
                                                                {completedSkills.includes(skill.id) ? 'Completed' : 'Mark Complete'}
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="p-4 space-y-3">
                                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                                            <div className="bg-blue-50 p-2 rounded">
                                                                <div className="font-semibold text-blue-800">Learn Time</div>
                                                                <div className="text-blue-600">{skill.timeToLearn}</div>
                                                            </div>
                                                            <div className="bg-green-50 p-2 rounded">
                                                                <div className="font-semibold text-green-800">Earning</div>
                                                                <div className="text-green-600">{skill.earningPotential}</div>
                                                            </div>
                                                        </div>

                                                        <div className="bg-yellow-50 p-2 rounded">
                                                            <div className="font-semibold text-yellow-800 text-sm">Startup Cost</div>
                                                            <div className="text-yellow-700">{skill.startupCost}</div>
                                                        </div>

                                                        <button
                                                            onClick={() => setSelectedSkill(selectedSkill === skill.id ? null : skill.id)}
                                                            className="w-full bg-purple-100 text-purple-800 p-2 rounded text-sm font-semibold hover:bg-purple-200 transition"
                                                        >
                                                            {selectedSkill === skill.id ? 'Hide Details' : 'Show Learning Steps'}
                                                        </button>

                                                        <AnimatePresence>
                                                            {selectedSkill === skill.id && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, height: 0 }}
                                                                    animate={{ opacity: 1, height: 'auto' }}
                                                                    exit={{ opacity: 0, height: 0 }}
                                                                    className="space-y-3 border-t pt-3"
                                                                >
                                                                    <div>
                                                                        <h5 className="font-semibold text-sm mb-2">Learning Steps:</h5>
                                                                        <ol className="text-sm space-y-1">
                                                                            {skill.steps.map((step, stepIdx) => (
                                                                                <li key={stepIdx} className="flex items-start">
                                                                                    <span className="font-bold text-purple-600 mr-2">{stepIdx + 1}.</span>
                                                                                    <span>{step}</span>
                                                                                </li>
                                                                            ))}
                                                                        </ol>
                                                                    </div>

                                                                    <div>
                                                                        <h5 className="font-semibold text-sm mb-2">Materials Needed:</h5>
                                                                        <ul className="text-sm space-y-1">
                                                                            {skill.materials.map((material, matIdx) => (
                                                                                <li key={matIdx} className="flex items-start">
                                                                                    <span className="text-green-600 mr-2">check</span>
                                                                                    <span>{material}</span>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>

                                                                    <div className="bg-blue-50 p-2 rounded">
                                                                        <h5 className="font-semibold text-sm text-blue-800 mb-1">Where to Work:</h5>
                                                                        <p className="text-sm text-blue-700">{skill.whereToWork}</p>
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })()}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Progress Summary */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-8 bg-gradient-to-r from-pink-100 to-orange-100 rounded-lg p-6"
                >
                    <h3 className="font-bold text-lg mb-3">Your Learning Progress</h3>
                    <div className="bg-white rounded-lg p-4">
                        <div className="text-2xl font-bold text-orange-600">
                            {completedSkills.length} skills completed
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                            Start with any skill - no prior experience needed
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
                            <div
                                className="bg-gradient-to-r from-pink-500 to-orange-500 h-3 rounded-full transition-all"
                                style={{
                                    width: `${(completedSkills.length / categories.reduce((acc, c) => acc + c.skills.length, 0)) * 100}%`
                                }}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default VocationalSkills;
