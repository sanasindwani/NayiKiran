

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import CommentSection from "./CommentSection";
// import { fetchPosts } from "../utils/forumApi"; // Import API function

// const PostList = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     loadPosts();
//   }, []);

//   const loadPosts = async () => {
//     try {
//       const data = await fetchPosts();
//       setPosts(data);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     }
//   };

//   if (!posts || posts.length === 0) {
//     return (
//       <p className="text-gray-500 text-center mt-4">
//         No posts yet. Be the first to share!
//       </p>
//     );
//   }

//   return (
//     <div className="w-full max-w-4xl mx-auto p-6 bg-pink-200 rounded-2xl shadow-lg h-[calc(100vh-50px)] overflow-y-auto">
//       <h2 className="text-2xl font-bold text-pink-700 text-center">
//         Community Forum
//       </h2>

//       {posts.map((post) => (
//         <motion.div
//           key={post._id}
//           className="p-6 bg-white border border-gray-200 rounded-xl mt-4 h-80 overflow-y-auto shadow-md"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: 20 }}
//           transition={{ duration: 0.5, ease: "easeOut" }}
//           whileHover={{
//             scale: 1.05,
//             boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.1)",
//             transition: { duration: 0.3 },
//           }}
//         >
//           <h3 className="text-lg font-semibold text-pink-700">{post.title}</h3>
//           <p className="text-gray-700">{post.content}</p>
//           <p className="text-sm text-gray-500 mt-2">
//             By <strong>{post.author?.username || "Anonymous"}</strong>
//           </p>

//           {/* Comment Section */}
//           <div className="mt-4">
//             <h4 className="text-pink-600 font-semibold">Comments:</h4>

//             {post.comments.length > 0 ? (
//               <div className="mt-2 space-y-3">
//                 {post.comments.map((comment, index) => (
//                   <div
//                     key={index}
//                     className="pl-4 border-l-4 border-purple-300 bg-pink-50 p-2 rounded-lg"
//                   >
//                     <p className="text-gray-600">{comment.content}</p>
//                     <p className="text-sm text-gray-500">
//                       - <strong>{comment.author?.username || "Anonymous"}</strong>
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500 text-sm mt-2">No comments yet.</p>
//             )}
//           </div>
//           <div className="mt-4">
//             <CommentSection postId={post._id} />
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// export default PostList;


import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CommentSection from "./CommentSection";
import { fetchPosts } from "../utils/forumApi"; // Import API function

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await fetchPosts();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  if (!posts || posts.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-4">
        No posts yet. Be the first to share!
      </p>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6  bg-gradient-to-r from-purple-100 via-pink-50 to-purple-100 rounded-2xl shadow-lg h-[calc(100vh-50px)] overflow-y-auto">
      <motion.h2
            className="text-3xl font-extrabold text-center py-4 text-purple-700"
            whileHover={{ scale: 1.1, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            📢 Community forum
          </motion.h2>

      {posts.map((post) => (
        <motion.div
          key={post._id}
          className="p-6 h-[400px] bg-white border border-gray-200 rounded-xl mt-6 shadow-md transition-all duration-300 hover:shadow-2xl hover:scale-105 overflow-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.1)",
            transition: { duration: 0.3 },
          }}
        >
          <h3 className="text-xl font-bold text-purple-700 mb-3">{post.title}</h3>
          <p className="text-gray-700 mb-4">{post.content}</p>
          <p className="text-sm text-pink-500 mt-2">
            By <strong>{post.author?.username || "Anonymous"}</strong>
          </p>

          {/* Comment Section */}
          <div className="mt-6">
            <h4 className="text-pink-600 font-semibold">Comments:</h4>

            {post.comments.length > 0 ? (
              <div className="mt-3 space-y-3">
                {post.comments.map((comment, index) => (
                  <div
                    key={index}
                    className="pl-4 border-l-4 border-purple-300 bg-pink-50 p-3 rounded-lg"
                  >
                    <p className="text-purple-600">{comment.content}</p>
                    <p className="text-sm text-pink-600 mt-1">
                      - <strong>{comment.author?.username || "Anonymous"}</strong>
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm mt-2">No comments yet.</p>
            )}
          </div>

          <div className="mt-6">
            <CommentSection postId={post._id} />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PostList;
