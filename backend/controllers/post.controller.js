import Post from "../models/post.model.js";
import mongoose from "mongoose";


export const createPost = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { title, content } = req.body;
    const userId = req.userId; // Extracted from the token middleware
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required." });
    }
    const newPost = new Post({
      title,
      content,
      author: userId,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log("Error creating post:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// export const getPosts = async (req, res) => {
//   try {
//     const posts = await Post.find().populate("author", "fullname username");
//     res.status(200).json(posts);
//   } catch (error) {
//     console.log("Error fetching posts:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "fullname username")
      .populate("comments.author", "fullname username"); // Populate comment authors

    res.status(200).json(posts);
  } catch (error) {
    console.log("Error fetching posts:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};



// export const addComment = async (req, res) => {
//   try {
//     const { postId, content } = req.body;
//     const userId = req.userId;

//     const post = await Post.findById(postId);
//     if (!post) {
//       return res.status(404).json({ error: "Post not found" });
//     }

//     post.comments.push({
//       content,
//       author: userId,
//     });

//     await post.save();
//     res.status(201).json(post);
//   } catch (error) {
//     console.log("Error adding comment:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };




export const addComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const userId = req.userId;

    // Check if postId is valid
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ error: "Invalid post ID" });
    }

    // Find the post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Create a new comment object
    const newComment = {
      content,
      author: userId,
      createdAt: new Date(),
    };

    // Push to comments array
    post.comments.push(newComment);

    // Save the updated post
    const updatedPost = await post.save();

    // Return the last added comment
    res.status(201).json(updatedPost.comments[updatedPost.comments.length - 1]);
  } catch (error) {
    console.log("Error adding comment:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


