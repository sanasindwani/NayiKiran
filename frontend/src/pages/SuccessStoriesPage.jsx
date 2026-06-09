import React, { useEffect, useState } from "react";
import SuccessStoriesList from "../components/SuccessStoryList";
import { getAPI } from "../utils/storyapi"; // Import the getAPI function
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const SuccessStoriesPage = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const data = await getAPI("/api/success-stories");
        setStories(data);
      } catch (error) {
        console.error("Failed to fetch success stories:", error);
      }
    };

    fetchStories();
  }, []);

  return (
    <div className="min-h-screen bg-purple-100 ">
      <div className="bg-pink-100">
                <Navbar />
            </div>
      <div className="container mx-auto px-6">
      <motion.h1
                        className="text-3xl font-extrabold text-center py-6 text-pink-700"
                        whileHover={{ scale: 1.1, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        ⚖️ Success Stories of Empowered Women
                    </motion.h1>
        <SuccessStoriesList stories={stories} />
      </div>
    </div>
  );
};

export default SuccessStoriesPage;