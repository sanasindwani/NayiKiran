import React, { useState, useEffect } from 'react';
import { getModuleById } from '../utils/legalDefenseApi';

const InteractiveScenario = ({ moduleId }) => {
    const [module, setModule] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [userResponse, setUserResponse] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [score, setScore] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        if (moduleId) {
            fetchModule();
        }
    }, [moduleId]);

    const fetchModule = async () => {
        try {
            setLoading(true);
            const data = await getModuleById(moduleId);
            setModule(data);
        } catch (error) {
            console.error('Error fetching module:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleResponseSubmit = () => {
        if (!userResponse.trim()) return;

        // Simple feedback logic based on key phrases
        const response = userResponse.toLowerCase();
        let isCorrect = false;
        let feedbackMessage = '';

        if (currentStep < module.actionableSteps.length) {
            const currentActionStep = module.actionableSteps[currentStep];
            
            // Check if response contains key elements
            if (currentActionStep.title.toLowerCase().includes('warrant') && 
                (response.includes('warrant') || response.includes('search'))) {
                isCorrect = true;
                feedbackMessage = "Good! You correctly identified the need to ask for a warrant.";
            } else if (currentActionStep.title.toLowerCase().includes('record') && 
                (response.includes('record') || response.includes('video') || response.includes('phone'))) {
                isCorrect = true;
                feedbackMessage = "Excellent! Recording the situation is crucial for evidence.";
            } else if (currentActionStep.title.toLowerCase().includes('lawyer') && 
                (response.includes('lawyer') || response.includes('legal') || response.includes('advocate'))) {
                isCorrect = true;
                feedbackMessage = "Perfect! Contacting a lawyer is essential for legal protection.";
            } else if (currentActionStep.title.toLowerCase().includes('calm') && 
                (response.includes('calm') || response.includes('breathe') || response.includes('relax'))) {
                isCorrect = true;
                feedbackMessage = "Great! Staying calm is the first and most important step.";
            } else {
                feedbackMessage = `Not quite. The ideal response would involve: ${currentActionStep.title.toLowerCase()}`;
            }

            if (isCorrect) {
                setScore(score + 1);
            }

            setFeedback({
                correct: isCorrect,
                message: feedbackMessage,
                correctAnswer: currentActionStep.title
            });

            setTimeout(() => {
                if (currentStep < module.actionableSteps.length - 1) {
                    setCurrentStep(currentStep + 1);
                    setUserResponse('');
                    setFeedback(null);
                    setSelectedOption(null);
                } else {
                    setCompleted(true);
                }
            }, 3000);
        }
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setUserResponse(option);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    if (!module) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Module not found.</p>
            </div>
        );
    }

    if (completed) {
        const percentage = Math.round((score / module.actionableSteps.length) * 100);
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                        <div className="mb-6">
                            <div className={`w-32 h-32 rounded-full mx-auto flex items-center justify-center ${
                                percentage >= 80 ? 'bg-green-100' : percentage >= 60 ? 'bg-yellow-100' : 'bg-red-100'
                            }`}>
                                <span className={`text-4xl font-bold ${
                                    percentage >= 80 ? 'text-green-600' : percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
                                }`}>
                                    {percentage}%
                                </span>
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            {percentage >= 80 ? 'Excellent Work!' : percentage >= 60 ? 'Good Job!' : 'Keep Learning!'}
                        </h2>
                        <p className="text-gray-600 mb-6">
                            You scored {score} out of {module.actionableSteps.length} correct responses.
                        </p>
                        <div className="bg-gray-50 rounded-lg p-6 mb-6">
                            <h3 className="font-bold text-lg mb-4">Key Takeaways:</h3>
                            <ul className="space-y-2 text-left">
                                {module.actionableSteps.map((step, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-purple-600 mr-2">·</span>
                                        <span className="text-gray-700">{step.title}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button
                            onClick={() => {
                                setCurrentStep(0);
                                setScore(0);
                                setCompleted(false);
                                setUserResponse('');
                                setFeedback(null);
                                setSelectedOption(null);
                            }}
                            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const currentActionStep = module.actionableSteps[currentStep];
    const progress = ((currentStep + 1) / module.actionableSteps.length) * 100;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">
                            Step {currentStep + 1} of {module.actionableSteps.length}
                        </span>
                        <span className="text-sm font-medium text-gray-700">
                            {Math.round(progress)}% Complete
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Scenario Card */}
                <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Interactive Scenario</h2>
                        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
                            <h3 className="font-bold text-purple-800 mb-3">Scenario:</h3>
                            <p className="text-purple-700 italic">{module.scenario}</p>
                        </div>
                    </div>

                    {/* Current Step */}
                    <div className="mb-8">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                                {currentStep + 1}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">
                                    What should you do first?
                                </h3>
                                <p className="text-gray-600">
                                    Focus on: {currentActionStep.title}
                                </p>
                            </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-gray-700">
                                <span className="font-medium">Time limit:</span> {currentActionStep.timeEstimate}
                                <span className="mx-2">|</span>
                                <span className="font-medium">Urgency:</span> 
                                <span className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${
                                    currentActionStep.urgency === 'immediate' ? 'bg-red-100 text-red-800' :
                                    currentActionStep.urgency === 'urgent' ? 'bg-orange-100 text-orange-800' :
                                    'bg-green-100 text-green-800'
                                }`}>
                                    {currentActionStep.urgency}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Response Options */}
                    <div className="mb-6">
                        <h4 className="font-semibold text-gray-700 mb-4">Choose your response:</h4>
                        <div className="space-y-3">
                            {[
                                currentActionStep.title,
                                "Try to physically resist the police",
                                "Run away from the situation",
                                "Start arguing loudly with the officers"
                            ].map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleOptionSelect(option)}
                                    className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                                        selectedOption === option
                                            ? 'border-purple-500 bg-purple-50'
                                            : 'border-gray-200 hover:border-gray-300 bg-white'
                                    }`}
                                >
                                    <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Custom Response */}
                    <div className="mb-6">
                        <h4 className="font-semibold text-gray-700 mb-4">Or type your response:</h4>
                        <textarea
                            value={userResponse}
                            onChange={(e) => setUserResponse(e.target.value)}
                            placeholder="Describe what you would do in this situation..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            rows={4}
                        />
                    </div>

                    {/* Feedback */}
                    {feedback && (
                        <div className={`mb-6 p-4 rounded-lg ${
                            feedback.correct ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
                        }`}>
                            <div className="flex items-start space-x-3">
                                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                                    feedback.correct ? 'bg-green-600' : 'bg-red-600'
                                }`}>
                                    {feedback.correct ? (
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    )}
                                </div>
                                <div>
                                    <p className={`font-medium ${feedback.correct ? 'text-green-800' : 'text-red-800'}`}>
                                        {feedback.message}
                                    </p>
                                    {!feedback.correct && (
                                        <p className="text-sm text-gray-600 mt-1">
                                            Ideal action: {feedback.correctAnswer}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                            Score: {score} / {module.actionableSteps.length}
                        </div>
                        <button
                            onClick={handleResponseSubmit}
                            disabled={!userResponse.trim()}
                            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            Submit Response
                        </button>
                    </div>
                </div>

                {/* Tips Section */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                    <h3 className="font-bold text-blue-800 mb-4">Quick Tips:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start space-x-3">
                            <svg className="w-5 h-5 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-blue-700 text-sm">Stay calm and think before acting</p>
                        </div>
                        <div className="flex items-start space-x-3">
                            <svg className="w-5 h-5 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-blue-700 text-sm">Focus on your rights and safety</p>
                        </div>
                        <div className="flex items-start space-x-3">
                            <svg className="w-5 h-5 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-blue-700 text-sm">Document everything if possible</p>
                        </div>
                        <div className="flex items-start space-x-3">
                            <svg className="w-5 h-5 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-blue-700 text-sm">Seek legal help immediately</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InteractiveScenario;
