import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FinancialIndependence from "../components/FinancialIndependence";
import VocationalSkills from "../components/VocationalSkills";
import HealthWellness from "../components/HealthWellness";

const Skill = () => {
  const [activeModule, setActiveModule] = useState(null);

  const modules = [
    {
      id: "financial",
      title: "Financial Independence & Security",
      icon: "💰",
      description: "Banking without barriers, daily savings strategy, and document protection.",
      color: "bg-blue-500",
      delay: 0.1
    },
    {
      id: "vocational",
      title: "Alternative Vocational Skills",
      icon: "🛠️",
      description: "Beauty & wellness, handicrafts & business, and quick start services.",
      color: "bg-pink-500",
      delay: 0.2
    },
    {
      id: "health",
      title: "Health, Wellness & Protection",
      icon: "⚕️",
      description: "Medical awareness, mental resilience, child protection, and legal defense.",
      color: "bg-green-500",
      delay: 0.3
    }
  ];

  return (
    <div className="relative z-0 min-h-screen flex flex-col w-full">
      <div className="bg-pink-100">
        <Navbar />
      </div>

      <div className="flex-grow flex flex-col">
        {!activeModule && (
          <div className="flex-grow bg-gradient-to-r from-purple-300 to-pink-200 p-8 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold text-pink-800 mb-4">
                Empowerment & Skill Dev
              </h1>
              <p className="text-lg text-pink-900 max-w-2xl mx-auto font-medium">
                Comprehensive support system addressing immediate safety and long-term independence pathways.
              </p>
            </motion.div>



            <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full">
              {modules.map((mod) => (
                <motion.div
                  key={mod.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: mod.delay }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer flex flex-col"
                  onClick={() => setActiveModule(mod.id)}
                >
                  <div className={`${mod.color} p-6 flex flex-col items-center text-white`}>
                    <div className="text-5xl mb-4">{mod.icon}</div>
                    <h2 className="text-xl font-bold text-center h-14 flex items-center justify-center">
                      {mod.title}
                    </h2>
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <p className="text-gray-600 text-center mb-6">{mod.description}</p>
                    <button className="w-full py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold transition-colors">
                      Start Learning
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeModule === 'financial' && <FinancialIndependence onBack={() => setActiveModule(null)} />}
        {activeModule === 'vocational' && <VocationalSkills onBack={() => setActiveModule(null)} />}
        {activeModule === 'health' && <HealthWellness onBack={() => setActiveModule(null)} />}
      </div>

      <div className="w-full relative z-0 pb-16">
        <Footer />
      </div>

      {/* Emergency Access Strip below */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-0 left-0 w-full z-50 bg-red-600 border-t border-red-700 shadow-xl py-3 px-4 flex flex-wrap gap-4 justify-center items-center backdrop-blur-md bg-opacity-95"
      >
        <div className="flex items-center">
          <span className="text-white text-xl mr-2 font-bold animate-pulse">⚠️</span>
          <span className="text-red-100 font-bold text-sm tracking-widest uppercase">Immediate Help:</span>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 font-bold text-white text-sm">
          <span className="bg-red-700/80 px-3 py-1.5 rounded-full shadow-inner hover:bg-red-800 transition cursor-default">Women: 1091</span>
          <span className="bg-red-700/80 px-3 py-1.5 rounded-full shadow-inner hover:bg-red-800 transition cursor-default">Child: 1098</span>
          <span className="bg-red-700/80 px-3 py-1.5 rounded-full shadow-inner hover:bg-red-800 transition cursor-default">Medical: 108</span>
          <span className="bg-red-700/80 px-3 py-1.5 rounded-full shadow-inner hover:bg-red-800 transition cursor-default">Police: 112</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Skill;
