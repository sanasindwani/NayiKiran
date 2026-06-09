import React, { useRef } from "react";
import { speak } from "../utils/speech";


function AboutUs() {
  const aboutText = `Ujjwal उड़ान is dedicated to empowering women by providing respect, support, and opportunities to help them build brighter futures. We offer education on legal rights, health, and financial independence, along with free courses, mentorship, and career training. Our platform provides therapy, peer support, and self-care resources to ensure mental well-being. We also help women find job opportunities, explore freelance work, and access entrepreneurship resources. Our supportive community encourages women to uplift each other and grow together. Take the first step toward a new beginning with Sashakt Saathi—you are never alone. For help or questions, feel free to reach out to us. Welcome to our website! We are committed to providing the best resources, services, and support to help you on your journey. Let’s learn, grow, and connect together!`;
  return (
    <div
      id="about"
      className="bg-white border-l-8 border-t-8 border-pink-500 p-8 text-center rounded-xl w-2/3 mx-auto my-8 flex flex-col justify-center items-center"
    >
      <h2 className="text-4xl text-purple-800 font-bold mb-4">✨ About Us</h2>
      <button
        className="mb-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        onClick={() => speak(aboutText, 'en-IN')}
        aria-label="Listen to About Us"
      >
        🔊 Listen
      </button>
      <p className="text-lg text-gray-700">
        <strong>Ujjwal उड़ान</strong> 💜  is dedicated to empowering women by providing respect, support, and opportunities to help them build brighter futures. We offer education on legal rights, health, and financial independence, along with free courses, mentorship, and career training. Our platform provides therapy, peer support, and self-care resources to ensure mental well-being. We also help women find job opportunities, explore freelance work, and access entrepreneurship resources💜.
        <br /><br />
        Our supportive community encourages women to uplift each other and grow together. Take the first step toward a new beginning with Sashakt Saathi—you are never alone. For help or questions, feel free to reach out to us.
        <br /><br />
        Welcome to our website! We are committed to providing the best resources, services, and support to help you on your journey. Let’s learn, grow, and connect together! 🌱💪
      </p>
    </div>
  );
}

export default AboutUs;
