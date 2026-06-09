import { Link } from "react-router-dom";
import { ShieldCheck, MessageCircle, Briefcase, Users, Star } from "lucide-react";

const QuickNavigation = () => {
  const features = [
    {
      title: "Know Your Rights",
      description:
        "Understand your legal rights, government protection laws, and available support schemes to empower yourself and take action when needed.",
      icon: <ShieldCheck className="w-12 h-12 text-purple-600" />,
      link: "/legal",
    },
    {
      title: "Talk to Someone (Mano Saathi)",
      description:
        "Need emotional support? Our AI-powered chatbot and confidential counseling services provide a safe space to express yourself and seek guidance.",
      icon: <MessageCircle className="w-12 h-12 text-purple-600" />,
      link: "/chat",
    },
    {
      title: "Learn & Earn (Skill Development)",
      description:
        "Gain new skills and access job opportunities tailored for you. Financial independence starts with learning – explore courses, training, and career options.",
      icon: <Briefcase className="w-12 h-12 text-purple-600" />,
      link: "/skill",
    },
    {
      title: "Join the Community",
      description:
        "Engage in meaningful discussions in a safe, judgment-free space. Connect with others, share experiences, and grow together in a supportive environment.",
      icon: <Users className="w-12 h-12 text-purple-600" />,
      link: "/forum",
    },
    {
      title: "Success Stories",
      description:
        "Read inspiring stories of women who overcame challenges and built a better future. Learn from real experiences and take the first step towards change.",
      icon: <Star className="w-12 h-12 text-purple-600" />,
      link: "/success-stories",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center text-pink-600 mb-8">
        Quick Access
      </h2>
      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {features.map((feature, index) => (
          <Link to={feature.link} key={index} className="group">
            <div className="bg-white shadow-lg shadow-purple-400 rounded-2xl p-6 text-center transition-transform transform group-hover:scale-105 duration-200">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-700">{feature.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickNavigation;