// import { createContext, useContext, useState } from "react";

// export const AuthContext=createContext();

// export const useAuthContext=()=>{
//     return useContext(AuthContext)
// }

// export const AuthContextProvider=({children})=>{
//     const [authUser, setAuthUser]=useState(JSON.parse(localStorage.getItem("chat-user"))|| null)
//     return <AuthContext.Provider value={{authUser,setAuthUser}}>
//         {children}
//     </AuthContext.Provider>
// }


import { createContext, useContext, useState, useEffect } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// AuthContext Provider Component
export const AuthContextProvider = ({ children }) => {
  // Initialize authUser from localStorage
  const [authUser, setAuthUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("chat-user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse chat-user from localStorage:", error);
      return null; // Fallback to null if parsing fails
    }
  });

  // Update localStorage whenever authUser changes
  useEffect(() => {
    if (authUser) {
      localStorage.setItem("chat-user", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("chat-user");
    }
  }, [authUser]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};