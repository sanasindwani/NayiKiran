

// import { useState } from "react";
// import { motion } from "framer-motion";

// const PostForm = ({ addPost }) => {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (title && content) {
//       addPost({ title, content });
//       setTitle("");
//       setContent("");
//     }
//   };

//   return (
//     <motion.div
//       className="bg-gradient-to-br from-purple-200 via-pink-100 to-pink-200 p-6 rounded-2xl shadow-lg flex flex-col gap-4 transition-transform duration-300"
//       whileHover={{ rotate: 3, scale: 1.05 }} // Tilt and scale effect
//     >
//       <h2 className="text-lg font-bold text-primary">Share your Story...</h2>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="input input-bordered w-full bg-white"
//         />
//         <textarea
//           placeholder="What's on your mind?"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           className="textarea textarea-bordered w-full bg-white"
//         ></textarea>
//         <button className="btn bg-purple-400 text-gray-50 font-bold">Post</button>
//       </form>
//     </motion.div>
//   );
// };

// export default PostForm;


// import { useState } from "react";
// import { motion } from "framer-motion";

// const PostForm = ({ addPost }) => {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (title && content) {
//       addPost({ title, content });
//       setTitle("");
//       setContent("");
//     }
//   };

//   return (
//     <motion.div
//       className="bg-gradient-to-br from-purple-200 via-pink-100 to-pink-200 p-6 rounded-2xl shadow-lg flex flex-col gap-4 transition-transform duration-300"
//       whileHover={{
//         rotateX: -15, // Tilts backward from the top
//         scale: 1.1, // Slightly enlarges for effect
//         boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.3)", // Adds strong shadow
//       }}
//       transition={{ duration: 0.4, ease: "easeOut" }}
//     >
//       <h2 className="text-lg font-bold text-primary">Share your Story...</h2>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="input input-bordered w-full bg-white"
//         />
//         <textarea
//           placeholder="What's on your mind?"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           className="textarea textarea-bordered w-full bg-white"
//         ></textarea>
//         <button type="submit" className="btn bg-purple-400 text-gray-50 font-bold">Post</button>
//       </form>
//     </motion.div>
//   );
// };

// export default PostForm;





import { useState } from "react";
import { motion } from "framer-motion";
import { createPost } from "../utils/forumApi"; // Import API function

const PostForm = ({ onPostCreated }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log("Sending post data:", { title, content }); // Log the data
      await createPost(title, content);
      setTitle("");
      setContent("");
      onPostCreated();
    } catch (error) {
      console.error("Error creating post:", error.message);
      
    }
  };

  // const handleSubmit = (e) => {
  //       e.preventDefault();
  //       if (title && content) {
  //         addPost({ title, content });
  //         setTitle("");
  //         setContent("");
  //       }
  //     };

  return (
    <motion.div
  className="bg-gradient-to-br from-purple-200 via-pink-100 to-pink-200 p-6 rounded-2xl shadow-lg flex flex-col gap-4 transition-transform duration-300 w-4/5"
  initial={{ opacity: 0 }}  // Start with no opacity
  animate={{ opacity: 1 }}  // Fade in to full opacity
  exit={{ opacity: 0 }}     // Fade out when exiting
  transition={{ type: "spring", stiffness: 100, damping: 25 }}  // Spring transition with customized stiffness and damping
>
  <h2 className="text-lg font-bold text-primary"> Share your Story...</h2>
  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    <input
      type="text"
      placeholder="Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="input input-bordered w-full bg-white"
      required
    />
    <textarea
      placeholder="What's on your mind?"
      value={content}
      onChange={(e) => setContent(e.target.value)}
      className="textarea textarea-bordered w-full bg-white"
      required
    ></textarea>
    <button type="submit" className="btn bg-purple-400 text-gray-50 font-bold">Post</button>
  </form>
</motion.div>


  );
};

export default PostForm;

