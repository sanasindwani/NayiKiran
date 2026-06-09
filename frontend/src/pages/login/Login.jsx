import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin';

const Login = () => {
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("")
    const{loading, login}=useLogin()

    const handleSubmit=async(e)=>{
        e.preventDefault();
        await login(username,password)
    }
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gradient-to-br  from-purple-200 via-pink-100 to-pink-200 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10'>
            <h1 className='text-3xl font-semibold text-center text-pink-400 '>Login
                <span className='text-purple-800'> Nayi Kiran</span>
            </h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text text-gray-800'>Username</span>
                    </label>
                    <input type="text" placeholder='Enter username' className='w-full input input-bordered h-10' value={username} onChange={(e)=>setUsername(e.target.value)}/>
                </div>

                <div>
                    <label className='label'>
                        <span className='text-base label-text text-gray-800'>Password</span>
                    </label>  
                    <input type="password" placeholder='Enter Password' className='w-full input input-bordered h-10' value={password} onChange={(e)=>setPassword(e.target.value)}/>                  
                </div>
                <Link to={"/signup"} className='text-sm hover:underline hover:text-blue-900 mt-2 font-semibold inline-block'>{"Don't"} have an account?</Link>
                <div>
                    <button className='btn btn-block btn-sm mt-2  bg-purple-500 text-white  border-slate-600 0' disabled={loading}>
                    {loading? <span className='loading loading-spinner'></span>:"Login"}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}
export default Login