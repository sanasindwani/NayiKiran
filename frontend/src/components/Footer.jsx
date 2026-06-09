// import React from "react";

// function Footer() {
//   return (
//     <footer className="bg-purple-500 text-white p-4 text-center w-full">
//       <p>Developed by [Your Name]</p>
//     </footer>
//   );
// }

// export default Footer;



import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-purple-500 text-white py-8 mt-8">
      <div className="container mx-auto text-center">
        {/* Links Section */}
        <div className="flex justify-center space-x-6 mb-4">
          <Link to="/" className="hover:text-purple-300 text-xl font-semibold">Home</Link>
          <Link to="/forum" className="hover:text-purple-300 text-xl font-semibold">Forum</Link>
          <Link to="/legal" className="hover:text-purple-300 text-xl font-semibold">Legal Rights</Link>
          <Link to="/skill" className="hover:text-purple-300 text-xl font-semibold">Skill Development</Link>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://www.instagram.com" className="hover:text-purple-300 underline" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.linkedin.com" className="hover:text-purple-300 underline" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://www.facebook.com" className="hover:text-purple-300 underline" target="_blank" rel="noopener noreferrer">Facebook</a>
        </div>

        {/* Copyright Section */}
        <p className='font-semibold'>&copy; 2026 Nayi Kiran. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
