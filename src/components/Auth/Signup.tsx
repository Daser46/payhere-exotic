import React from 'react';
import { FaFacebook, FaGoogle, FaTimes } from 'react-icons/fa';
import Login from './Login';

interface SignupProps {
    isOpen: boolean;
    onClose: () => void;
}

const Signup = ({ isOpen, onClose }: SignupProps) => {
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
                <div className="font-sans w-full max-w-sm">
                    <div className="relative flex flex-col items-center sm:justify-center">
                        <div className="relative w-full">
                            <div className="card bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6 transition-transform hover:-rotate-4 p-8"></div>
                            <div className="card bg-gradient-to-r from-black to-gray-900 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6 transition-transform hover:rotate-4 p-8"></div>
                            <div className="relative w-full rounded-3xl px-8 py-8 bg-white shadow-xl">
                                <div className="flex justify-between items-center mb-6">
                                    <label className="block text-2xl text-black font-bold">
                                        Sign Up
                                    </label>
                                    <button
                                        onClick={onClose}
                                        className="text-black hover:text-yellow-500 p-2"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                                <form className="space-y-4">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            className="w-full px-4 border-none bg-gray-50 h-12 rounded-xl shadow-md transition-all duration-300 hover:bg-yellow-50 focus:bg-yellow-50 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 outline-none"
                                        />
                                    </div>

                                    <div className="relative">
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            className="w-full px-4 border-none bg-gray-50 h-12 rounded-xl shadow-md transition-all duration-300 hover:bg-yellow-50 focus:bg-yellow-50 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 outline-none"
                                        />
                                    </div>

                                    <div className="relative">
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            className="w-full px-4 border-none bg-gray-50 h-12 rounded-xl shadow-md transition-all duration-300 hover:bg-yellow-50 focus:bg-yellow-50 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 outline-none"
                                        />
                                    </div>

                                    <div className="relative">
                                        <input
                                            type="password"
                                            placeholder="Confirm Password"
                                            className="w-full px-4 border-none bg-gray-50 h-12 rounded-xl shadow-md transition-all duration-300 hover:bg-yellow-50 focus:bg-yellow-50 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 outline-none"
                                        />
                                    </div>

                                    <button className="w-full py-3 mt-6 rounded-xl text-white font-semibold bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg hover:shadow-xl focus:outline-none transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-102">
                                        Create Account
                                    </button>

                                    <div className="flex items-center my-6">
                                        <hr className="flex-1 border-gray-200" />
                                        <span className="px-4 text-sm text-gray-600">Or continue with</span>
                                        <hr className="flex-1 border-gray-200" />
                                    </div>

                                    <div className="flex justify-center gap-4">
                                        <button className="flex-1 py-2.5 px-4 bg-black rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
                                            <FaFacebook className="inline mr-2" /> Facebook
                                        </button>
                                        <button className="flex-1 py-2.5 px-4 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
                                            <FaGoogle className="inline mr-2" /> Google
                                        </button>
                                    </div>

                                    <div className="text-center mt-6">
                                        <p className="text-gray-600">
                                            Already have an account?{' '}
                                            <button onClick={onClose} className="text-yellow-500 font-semibold hover:text-yellow-600 transition duration-300">
                                                Login
                                            </button>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default Signup;
