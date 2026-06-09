// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <div className="w-full">
//       {/* Top Header Section */}
//       <div className="flex  justify-between items-center bg-gray-100 p-4">
//         <div className="flex items-center">
//           <img src="/images/logo.jpeg" alt="Government Logo" className="h-12" />
//         </div>
//         <div className="flex items-center space-x-6">
//           <div className="text-sm">
//             <p className="font-semibold">Women Helpline Number</p>
//             <span className="text-gray-700">1800-11-9292</span>
//           </div>
//           <div className="text-sm">
//             <p className="font-semibold">For Emergency</p>
//             <span className="text-gray-700">112</span>
//           </div>
//           <Link to="/login" className="btn  bg-pink-300">Login</Link>
//           <Link to="/logout" className="btn bg-purple-400">Logout</Link>
//         </div>
//       </div>

//       {/* Navbar Section */}
//       <header className="bg-purple-500 text-white">
//         <div className="navbar px-6 py-4 flex justify-between items-center">
//           <nav>
//             <ul className="flex space-x-6">
//               <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
//               <li><Link to="/legal" className="hover:text-gray-300">Legal Rights</Link></li>
//               <li><Link to="/chat" className="hover:text-gray-300">Mano Sathi (Chatbot)</Link></li>
//               <li><Link to="/forum" className="hover:text-gray-300">Discussion Forum</Link></li>
//               <li><Link to="/skill" className="hover:text-gray-300">Skill Development</Link></li>
//             </ul>
//           </nav>
//           <div className="flex items-center space-x-2">
//             <input type="text" placeholder="Search..." className="input input-bordered input-sm" />
//             <button className="btn btn-accent btn-sm">Search</button>
//           </div>
//         </div>
//       </header>
//     </div>
//   );
// };

// export default Navbar;

// import React from "react";
// import { Link } from "react-router-dom";

// import image from "../assets/image.png";

// const Navbar = () => {
//   return (
//     <div className="w-full">
//       {/* Top Header Section */}
//       <div className="flex justify-between items-center bg-pink-100 p-2 px-2 shadow-md">
//         <div className="flex items-center">
//           <img src={image} alt="Government Logo" className="h-16"  />
//         </div>
//         <div className="flex items-center space-x-10">
//           <div className="text-sm">
//             <p className="font-bold text-purple-900 text-lg">Women Helpline Number</p>
//             <span className="text-purple-800 text-base">1800-11-9292</span>
//           </div>
//           <div className="text-sm">
//             <p className="font-bold text-purple-900 text-lg">For Emergency</p>
//             <span className="text-purple-800 text-base">112</span>
//           </div>
//           <Link to={"/login"} className="px-5 py-2 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-pink-600 hover:scale-105 transition duration-200">Login</Link>
//           <Link to="/logout" className="px-5 py-2 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-600 hover:scale-105 transition duration-200">Logout</Link>
//         </div>
//       </div>

//       {/* Navbar Section */}
//       <header className="bg-purple-600 text-white shadow-lg">
//         <div className="navbar px-6 py-4 flex justify-between items-center">
//           <nav>
//             <ul className="flex space-x-8">
//               <li>
//                 <Link to="/" className="text-lg font-semibold hover:text-gray-300 hover:scale-110 transition duration-200">Home</Link>
//               </li>
//               <li>
//                 <Link to="/legal" className="text-lg font-semibold hover:text-gray-300 hover:scale-110 transition duration-200">Legal Rights</Link>
//               </li>
//               <li>
//                 <Link to="/chat" className="text-lg font-semibold hover:text-gray-300 hover:scale-110 transition duration-200">Mano Sathi (Chatbot)</Link>
//               </li>
//               <li>
//                 <Link to="/forum" className="text-lg font-semibold hover:text-gray-300 hover:scale-110 transition duration-200">Discussion Forum</Link>
//               </li>
//               <li>
//                 <Link to="/skill" className="text-lg font-semibold hover:text-gray-300 hover:scale-110 transition duration-200">Skill Development</Link>
//               </li>
//               <li>
//                 <Link to="/story" className="text-lg font-semibold hover:text-gray-300 hover:scale-110 transition duration-200">Success Stories</Link>
//               </li>
//             </ul>
//           </nav>
//           <div className="flex items-center space-x-2">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="input input-bordered input-sm px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
//             />
//             <button className="px-5 py-2 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-pink-600 hover:scale-105 transition duration-200">Search</button>
//           </div>
//         </div>
//       </header>
//     </div>
//   );
// };

// export default Navbar;



import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useLogout from "../hooks/useLogout";
import { useAuthContext } from "../context/AuthContext";
import image from "../assets/image.jpeg";
import LanguageSwitcher from "./LanguageSwitcher";


const Navbar = () => {
  const { t } = useTranslation();
  const { logout } = useLogout();
  const { authUser } = useAuthContext();

  return (
    <div className="w-full">
      {/* Top Header Section */}
      <div className="flex justify-between items-center bg-pink-100 p-2 px-2 shadow-md">
        <div className="flex items-center">
          <img src={image} alt={t('navbar.logoAlt')} className="h-16" />
        </div>
        <div className="flex items-center space-x-10">
          <div className="text-sm">
            <p className="font-bold text-purple-900 text-lg">{t('navbar.helplineTitle')}</p>
            <span className="text-purple-800 text-base">{t('navbar.helplineNumber')}</span>
          </div>
          <div className="text-sm">
            <p className="font-bold text-purple-900 text-lg">{t('navbar.emergencyTitle')}</p>
            <span className="text-purple-800 text-base">{t('navbar.emergencyNumber')}</span>
          </div>
          <LanguageSwitcher />
          {authUser ? (
            <button
              onClick={logout}
              className="px-5 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 hover:scale-105 transition duration-200"
            >
              {t('navigation.logout')}
            </button>
          ) : (
            <Link to="/login" className="px-5 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-600 hover:scale-105 transition duration-200">
              {t('navigation.login')}
            </Link>
          )}
          {/* Logout Button */}

        </div>
      </div>

      {/* Navbar Section */}
      <header className="bg-purple-600 text-white shadow-lg">
        <div className="navbar px-6 py-4 flex justify-between items-center">
          <nav>
            <ul className="flex space-x-8">
              <li>
                <Link to="/" className="text-lg font-semibold hover:text-gray-300 hover:scale-110 transition duration-200">{t('navigation.home')}</Link>
              </li>
              <li>
                <Link to="/skill" className="text-lg font-semibold hover:text-gray-300 hover:scale-110 transition duration-200">{t('navbar.skillDevelopment')}</Link>
              </li>
              <li>
                <Link to="/job-discovery" className="text-lg font-semibold hover:text-gray-300 hover:scale-110 transition duration-200">{t('navbar.jobDiscovery')}</Link>
              </li>
              <li>
                <Link to="/legal" className="text-lg font-semibold hover:text-gray-300 hover:scale-110 transition duration-200">{t('legal.title')}</Link>
              </li>
              <li>
                <Link to="/forum" className="text-lg font-semibold hover:text-gray-300 hover:scale-110 transition duration-200">{t('community.title')}</Link>
              </li>
              <li>
                <Link to="/chat" className="text-lg font-semibold hover:text-gray-300 hover:scale-110 transition duration-200">{t('navbar.chatbot')}</Link>
              </li>
              <li>
                <Link to="/childcare-protection" className="text-lg font-semibold hover:text-gray-300 hover:scale-110 transition duration-200">{t('childcare.title')}</Link>
              </li>
              <li>
                <Link to="/story" className="text-lg font-semibold hover:text-gray-300 hover:scale-110 transition duration-200">{t('navbar.successStories')}</Link>
              </li>
            </ul>
          </nav>

        </div>
      </header>
    </div>
  );
};

export default Navbar;
