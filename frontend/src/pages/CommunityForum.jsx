// import React from "react";
// import PostForm from "../components/PostForm";
// import PostList from "../components/PostList";

// const CommunityForum = () => {
//     return (
//         <div>
//             <h1>Community Forum</h1>
//             <PostForm />
//             <PostList />
//         </div>
//     );
// };

// export default CommunityForum;


import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PostForm from "../components/PostForm";
 import PostList from "../components/PostList";
 import { motion } from "framer-motion";

const CommunityForum = ({ posts, addPost, addComment }) => {
  return (
    <div className="min-h-screen relative z-0 w-full bg-pink-100 flex flex-col items-center ">
      <div className="mb-8 w-full bg-pink-100">
          <Navbar />
      </div>
      <div className="w-full px-10 grid grid-cols-3 gap-6">

        
        {/* Post Form on Left */}
        <div className="col-span-1 flex flex-col items-center justify-center p-6 m-2 mb-8 bg-white border-l-8 border-t-8 border-pink-400 rounded-2xl shadow-lg">
        <motion.h2
            className="text-3xl font-extrabold text-center py-4 text-purple-700"
            whileHover={{ scale: 1.1, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
           🌟 Create a Post
          </motion.h2>
          <PostForm addPost={addPost} />
        </div>

        {/* Post List on Right */}
        <div className="col-span-2 p-6 m-2 mb-8 border-l-8 border-t-8 border-pink-400  bg-white rounded-2xl shadow-lg">
          
          <PostList posts={posts} addComment={addComment} />
        </div>

      </div>
      <div className="w-full relative z-0">
                <Footer />
        </div>
    </div>
  );
};

export default CommunityForum;

