// import React, { useState } from "react";
// import { addComment } from "../utils/forumApi";

// const CommentSection = ({ postId }) => {
//     const [comment, setComment] = useState("");

//     const handleCommentSubmit = async (e) => {
//         e.preventDefault();
//         const token = localStorage.getItem("token");
//         if (!token) {
//             alert("Please log in to comment.");
//             return;
//         }

//         await addComment(postId, comment, token);
//         setComment("");
//     };

//     return (
//         <div className="comment-section">
//             <form onSubmit={handleCommentSubmit}>
//                 <input
//                     type="text"
//                     placeholder="Write a comment..."
//                     value={comment}
//                     onChange={(e) => setComment(e.target.value)}
//                     required
//                 />
//                 <button type="submit" className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 hover:from-purple-400 hover:to-pink-400 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-300">Comment</button>
//             </form>
//         </div>
//     );
// };

// export default CommentSection;

import React, { useState } from "react";
import { addComment } from "../utils/forumApi";

const CommentSection = ({ postId }) => {
    const [comment, setComment] = useState("");

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        

        await addComment(postId, comment);
        setComment("");
    };

    return (
        <div className="comment-section bg-green-100 p-6 rounded-lg shadow-lg max-w-3xl mx-auto mt-6">
            <h3 className="text-xl font-semibold text-pink-600 mb-4">Add a Comment</h3>
            <form onSubmit={handleCommentSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    className="px-2 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300"
                />
                <button 
                    type="submit" 
                    className="px-1 w-1/3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 hover:from-purple-400 hover:to-pink-400 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-300"
                >
                    Comment
                </button>
            </form>
        </div>
    );
};

export default CommentSection;

