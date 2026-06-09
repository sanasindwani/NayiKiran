
import axios from "axios";

const API_BASE_URL = "/api/posts";
console.log(`${API_BASE_URL}/`);    

export const fetchPosts = async () => {
    const response = await axios.get(`${API_BASE_URL}/`);
    return response.data;
};

export const createPost = async (title, content) => {
    try {
      const response = await axios.post("/api/posts/create", { title, content });
      return response.data;
    } catch (error) {
      console.error("Error creating post:", error.message);
      throw error;
    }
  };

export const addComment = async (postId, content) => {
    const response = await axios.post(`${API_BASE_URL}/comment`, { postId, content }, 
    );
    return response.data;
};
