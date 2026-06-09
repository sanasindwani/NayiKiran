import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useSignup from '../../hooks/useSignup.js';

const Signup = () => {
    const [inputs, setInputs] = useState({
        fullname: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const { loading, signup } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs);
    };

    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10">
                <h1 className="text-3xl font-semibold text-center text-gray-400">
                    Signup<span className="text-blue-900"> Harmoni</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text text-gray-800">Full name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full input input-bordered h-10"
                            value={inputs.fullname}
                            onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text text-gray-800">Username</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter UserName"
                            className="w-full input input-bordered h-10"
                            value={inputs.username}
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="text-base label-text text-gray-800">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="w-full input input-bordered h-10"
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text text-gray-800">Confirm Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full input input-bordered h-10"
                            value={inputs.confirmPassword}
                            onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                        />
                    </div>

                    <Link
                        to="/login"
                        className="text-sm hover:underline hover:text-blue-900 mt-2 font-semibold inline-block"
                    >
                        Already have an account?
                    </Link>
                    <div>
                        <button
                            className="btn btn-block btn-sm mt-2 border-slate-600"
                            disabled={loading}
                        >
                            {loading? <span className='loading loading-spinner'></span> : "Sign Up"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
