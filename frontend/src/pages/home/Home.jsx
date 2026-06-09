
import React from "react"; 
import Carousel from "../../components/Carousel";
import { motion } from "framer-motion";

import AboutUs from "../../components/AboutUs";
import Feedback from "../../components/Feedback";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

import QuickNavigation from "../../components/QuickNavigation";

function Home() {
  return (
 
    <div className="relative z-0  bg-gradient-to-r from-purple-50 via-pink-50 to-purple-100a">
            <div className="bg-pink-100  bg-center">
                <Navbar/>
                
            </div>
            
            <Carousel/>


            {/* Story Section 1 */}
            <div className="flex flex-col md:flex-row items-center justify-center py-6   gap-40 ">
      
      {/* Text Container with Animation */}
      <motion.div
        className="bg-gradient-to-r from-pink-200 via-purple-100 to-pink-200 border-l-4 border-t-4 border-pink-400 p-8 md:w-1/3 rounded-3xl shadow-2xl shadow-purple-200 flex items-center justify-center text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 180 }}
      >
        <p className="text-xl font-semibold text-gray-800 leading-relaxed">
          "यहाँ कई ऐसी औरतें भी हैं, जिनका जीवन उन्होंने खुद नहीं चुना। गरीबी और लाचारी ने उनके अपनों को इतना मजबूर कर दिया कि चंद पैसों के लालच में, इन्हें इस अंधेरे दलदल में धकेल दिया गया।"
        </p>
      </motion.div>
      

      {/* Image Container with Animation */}
      <motion.img
        src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/a8a57a4974135.562c367f9da68.jpg"
        alt="A woman with resilience"
        className="md:w-1/3  h-60 rounded-full shadow-2xl shadow-blue-100 object-cover border-4 border-white"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 120 }}
      />
      
    </div>

    <div className="flex flex-col md:flex-row items-center justify-center py-6   gap-40 ">
    <motion.img
        src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/bb277e4974135.562c367faace5.jpg"
        alt="A woman with resilience"
        className="md:w-1/3  h-60 rounded-full shadow-2xl shadow-blue-200 object-cover border-4 border-white"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 120 }}
      />
      
      {/* Text Container with Animation */}
      <motion.div
        className="bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 border-r-4 border-t-4 border-purple-400 p-8 md:w-1/3 rounded-3xl shadow-2xl shadow-pink-200 flex items-center justify-center text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}        
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <p className="text-xl font-semibold text-gray-800 leading-relaxed">
        "सोचिए, जिस परिवार के साए में सुरक्षित बचपन बीतना चाहिए था, वहीं परिवार उनके सपनों को कुचलकर उन्हें ऐसी दुनिया में बेच देता है जहाँ सिर्फ दर्द, मजबूरी और तिरस्कार है। बोलिए साहब, इस अन्याय में उन मासूम औरतों की क्या गलती?"</p>
      </motion.div>

      {/* Image Container with Animation */}
      
      
    </div>
      {/* Story Section 2 (Reversed) */}
      
            <QuickNavigation/>
            <AboutUs/>
            <Feedback/>
           
           
            
            
            
            <div className="relative z-0">
                <Footer/>
            </div>
        </div>
  );
}

export default Home;



// import React from "react"; 
// import Carousel from "../../components/Carousel";
// import AboutUs from "../../components/AboutUs";
// import Feedback from "../../components/Feedback";
// import Footer from "../../components/Footer";

// function Home() {
//   return (
//     <div className="bg-pink-100 w-full min-h-screen flex flex-col items-center">
//       {/* Wrapper container to handle scrollable content */}
//       <div className="w-full flex-grow overflow-auto">
//         {/* Carousel */}
//         <Carousel />

//         {/* Main content */}
//         <div className="w-full">
//           <AboutUs />
//           <Feedback />
//         </div>
//       </div>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }

// export default Home;

