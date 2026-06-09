import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async ({ fullname, username, password, confirmPassword }) => {
        const success = handleInputErrors({ fullname, username, password, confirmPassword });
        if (!success) return;

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullname, username, password, confirmPassword }),
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            console.log(data);

            // local storage
            localStorage.setItem("chat-user", JSON.stringify(data));
            // context  
            setAuthUser(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};

export default useSignup;

function handleInputErrors({ fullname, username, password, confirmPassword }) {
    if (!fullname || !username || !password || !confirmPassword) {
        toast.error("Please fill all the fields");
        return false;
    }
    if (password !== confirmPassword) {
        toast.error("Password do not match");
        return false;
    }
    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }
    return true;
}
