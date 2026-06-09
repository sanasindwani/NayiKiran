// import React from "react";


// const SuccessStoryCard = ({ story }) => {
//   return (
//     <div className="bg-white shadow-lg rounded-lg overflow-hidden border-2 border-lilac-300 flex flex-col items-center">
//       <div className="w-full">
//         <img
//           src={story.imageUrl}
//           alt={story.name}
//           className="w-full h-60 object-contain"
//         />
//       </div>
//       <div className="p-6 w-full">
//         <h3 className="text-2xl font-semibold text-pink-600">{story.name}</h3>
//         <p className="mt-4 text-gray-600">{story.story}</p>
//       </div>
//     </div>
//   );
// };

// export default SuccessStoryCard;



import React from "react";
import { motion } from "framer-motion";

const SuccessStoryCard = ({ story }) => {
  return (
    <motion.div
      className="bg-white shadow-xl rounded-2xl overflow-hidden border-2 border-pink-300 flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
    >
      {/* Image Section */}
      <div className="w-full bg-gradient-to-r from-pink-100 via-purple-100 to-pink-200">
        <img
          src={story.imageUrl}
          alt={story.name}
          className="w-full h-60 object-cover rounded-t-2xl"
        />
      </div>

      {/* Text Section */}
      <div className="p-6 w-full text-center">
        <h3 className="text-2xl font-bold text-purples-700">{story.name}</h3>
        <p className="mt-4 text-gray-700 text-md leading-relaxed">{story.story}</p>
      </div>
    </motion.div>
  );
};

export default SuccessStoryCard;
