import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

const useLogout = () => {
    const navigate = useNavigate()
    const { setAuthUser } = useAuthContext()

    const logout = async () => {
        try {
            // Clear localStorage
            localStorage.removeItem("chat-user")
            
            // Clear auth context
            setAuthUser(null)
            
            // Show success message
            toast.success("Logged out successfully")
            
            // Navigate to login page
            navigate("/login")
        } catch (error) {
            toast.error("Error logging out")
            console.error("Logout error:", error)
        }
    }

    return { logout }
}

export default useLogout
