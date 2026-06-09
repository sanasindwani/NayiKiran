


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { motion } from "framer-motion"; 

// const LegalRights = () => {
//     const [rights, setRights] = useState([]);
//     const [expandedIndex, setExpandedIndex] = useState(null);

//     useEffect(() => {
//         axios.get("/api/rights")
//             .then(response => setRights(response.data))
//             .catch(error => console.error("Error fetching rights:", error));
//     }, []);

    
//     const toggleCard = (index) => {
//         setExpandedIndex(expandedIndex === index ? null : index);
//     };

//     return (
//         <div className="relative z-0 bg-gradient-to-br from-purple-100 via-pink-100 to-pink-200 min-h-screen flex flex-col">
//             {/* Navbar */}
//             <div className="bg-pink-100">
//                 <Navbar />
//             </div>

//             {/* Main Content */}
//             <div className="flex-grow flex justify-center items-start px-6 py-12">
//                 {/* Outer container shifted to left and scrollable */}
//                 <motion.div
//                     className="w-2/3 h-[80vh] bg-white shadow-lg rounded-lg p-6 overflow-y-auto"
//                     initial={{ x: 100, opacity: 0 }}
//                     animate={{ x: 0, opacity: 1 }}
//                     transition={{ type: "spring", stiffness: 300 }}
//                 >
//                     <motion.h2
//             className="text-3xl font-extrabold text-center py-4 text-pink-700"
//             whileHover={{ scale: 1.1, rotate: 2 }}
//             transition={{ type: "spring", stiffness: 300 }}
//           >
//            ⚖️ Your Legal Rights
//           </motion.h2>

                    
//                     {rights.length > 0 ? (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                             {rights.map((right, index) => (
//     <motion.div
//         key={index}
//         className="bg-gradient-to-r from-purple-50 via-pink-50 to-purple-100 border-l-4 border-purple-400 rounded-lg shadow-lg p-4 cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-2xl"
//         initial={{ y: -50, opacity: 0 }}  // Start slightly above with no opacity
//         animate={{ y: 0, opacity: 1 }}  // Move to original position and become visible
//         transition={{ type: "spring", stiffness: 500, damping: 20, delay: index * 0.1 }} // Stagger effect
//         whileHover={{ scale: 1.1, rotate: 2 }}
//         onClick={() => toggleCard(index)}
//     >
//         <h3 className="text-lg font-semibold text-purple-600">{right.title}</h3>
//         <p className="text-gray-700 mt-2">{right.description.slice(0, 100)}...</p>

//         {/* Expandable content */}
//         {expandedIndex === index && (
//             <div className="mt-4 text-gray-600">
//                 <p>{right.description}</p>
//             </div>
//         )}
//     </motion.div>
// ))}

//                         </div>
//                     ) : (
//                         <p className="text-gray-500 text-center">Loading rights...</p>
//                     )}
//                 </motion.div>
//             </div>

//             {/* Footer */}
//             <div className="relative z-0">
//                 <Footer />
//             </div>
//         </div>
//     );
// };

// export default LegalRights;



import React, { useEffect, useState } from "react";
import { speak } from "../utils/speech";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import Chat from "../components/Chat";  // Import the Chat component

const LegalRights = () => {
    const [rights, setRights] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);

    useEffect(() => {
        axios.get("/api/rights")
            .then(response => setRights(response.data))
            .catch(error => console.error("Error fetching rights:", error));
    }, []);

    const toggleCard = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="relative z-0 bg-gradient-to-br from-purple-100 via-pink-100 to-pink-200 min-h-screen flex flex-col">
            {/* Navbar */}
            <div className="bg-pink-100">
                <Navbar />
            </div>

            {/* Main Content */}
            <div className="flex-grow flex justify-center items-start px-6 py-12 space-x-6">
                {/* Left side: Legal Rights Content */}
                <motion.div
                    className="w-2/3 h-[80vh] bg-white shadow-lg rounded-lg p-6 overflow-y-auto"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <motion.h2
                        className="text-3xl font-extrabold text-center py-4 text-pink-700"
                        whileHover={{ scale: 1.1, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        ⚖️ Your Legal Rights
                    </motion.h2>

                    {rights.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {rights.map((right, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-gradient-to-r from-purple-50 via-pink-50 to-purple-100 border-l-4 border-purple-400 rounded-lg shadow-lg p-4 cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-2xl"
                                    initial={{ y: -50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 20, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.1, rotate: 2 }}
                                    onClick={() => toggleCard(index)}
                                >
                                                                        <div className="flex items-center">
                                                                            <h3 className="text-lg font-semibold text-purple-600">{right.title}</h3>
                                                                            <button
                                                                                className="ml-2 text-purple-700 hover:text-purple-900 text-xl align-middle"
                                                                                onClick={() => speak(right.description, 'en-IN')}
                                                                                aria-label={`Listen to ${right.title}`}
                                                                            >
                                                                                🔊
                                                                            </button>
                                                                        </div>
                                                                        <p className="text-gray-700 mt-2">{right.description.slice(0, 100)}...</p>
                                    

                                    {/* Expandable content */}
                                                                        {expandedIndex === index && (
                                                                                <div className="mt-4">
                                                                                        <div className="flex items-center">
                                                                                            <h3 className="text-lg font-semibold text-purple-600">{right.title_hindi}</h3>
                                                                                            <button
                                                                                                className="ml-2 text-purple-700 hover:text-purple-900 text-xl align-middle"
                                                                                                onClick={() => speak(right.description_hindi, 'hi-IN')}
                                                                                                aria-label={`Listen to ${right.title_hindi}`}
                                                                                            >
                                                                                                🔊
                                                                                            </button>
                                                                                        </div>
                                                                                        <p className="text-gray-700 mt-2">{right.description_hindi.slice(0, 100)}...</p>
                                                                                </div>
                                                                        )}
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">Loading rights...</p>
                    )}
                </motion.div>

                {/* Right side: Chat Component */}
                <div className="w-1/3 h-[80vh] bg-white shadow-lg rounded-lg  overflow-y-auto">
                    <Chat />
                </div>
            </div>

            {/* Footer */}
            <div className="relative z-0">
                <Footer />
            </div>
        </div>
    );
};

export default LegalRights;


