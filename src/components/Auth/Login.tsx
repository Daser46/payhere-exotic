import React from 'react';
import { FaFacebook, FaGoogle, FaTimes } from 'react-icons/fa';
import Signup from './Signup';
import "@/app/css/login.css"

interface LoginProps {
    isOpen: boolean;
    onClose: () => void;
}


const Login = ({ isOpen, onClose }: LoginProps) => {
    const [showSignup, setShowSignup] = React.useState(false);

    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    React.useEffect(() => {
        const container = document.querySelector('.container');
        if (container) {
            const handleAnimationEnd = () => {
                container.classList.remove('active');
                window.location.href = '/'; 
            };
            container.addEventListener('animationend', handleAnimationEnd);
            return () => {
                container.removeEventListener('animationend', handleAnimationEnd);
            };
        }
    }, []);

    if (showSignup) {
        return <Signup isOpen={showSignup} onClose={() => setShowSignup(false)} />;
    }

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
                                        Login
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

                                    

                                    <div className="main mx-auto flex " onClick={() => document.querySelector('.container')?.classList.toggle('active')}>
                                        <span className="text">LOGIN</span>
                                        <svg className="fingerprint fingerprint-base" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
                                            <g className="fingerprint-out" fill="none" stroke-width="2" stroke-linecap="round">
                                                <path
                                                    className="odd" d="m 25.117139,57.142857 c 0,0 -1.968558,-7.660465 -0.643619,-13.149003 1.324939,-5.488538 4.659682,-8.994751 4.659682,-8.994751" />
                                                <path
                                                    className="odd" d="m 31.925369,31.477584 c 0,0 2.153609,-2.934998 9.074971,-5.105078 6.921362,-2.17008 11.799844,-0.618718 11.799844,-0.618718" />
                                                <path
                                                    className="odd" d="m 57.131213,26.814448 c 0,0 5.127709,1.731228 9.899495,7.513009 4.771786,5.781781 4.772971,12.109204 4.772971,12.109204" />
                                                <path
                                                    className="odd" d="m 72.334009,50.76769 0.09597,2.298098 -0.09597,2.386485" />
                                                <path
                                                    className="even" d="m 27.849282,62.75 c 0,0 1.286086,-1.279223 1.25,-4.25 -0.03609,-2.970777 -1.606117,-7.675266 -0.625,-12.75 0.981117,-5.074734 4.5,-9.5 4.5,-9.5" />
                                                <path
                                                    className="even" d="m 36.224282,33.625 c 0,0 8.821171,-7.174484 19.3125,-2.8125 10.491329,4.361984 11.870558,14.952665 11.870558,14.952665" />
                                                <path
                                                    className="even" d="m 68.349282,49.75 c 0,0 0.500124,3.82939 0.5625,5.8125 0.06238,1.98311 -0.1875,5.9375 -0.1875,5.9375" />
                                                <path
                                                    className="odd" d="m 31.099282,65.625 c 0,0 1.764703,-4.224042 2,-7.375 0.235297,-3.150958 -1.943873,-9.276886 0.426777,-15.441942 2.370649,-6.165056 8.073223,-7.933058 8.073223,-7.933058" />
                                                <path
                                                    className="odd" d="m 45.849282,33.625 c 0,0 12.805566,-1.968622 17,9.9375 4.194434,11.906122 1.125,24.0625 1.125,24.0625" />
                                                <path
                                                    className="even" d="m 59.099282,70.25 c 0,0 0.870577,-2.956221 1.1875,-4.5625 0.316923,-1.606279 0.5625,-5.0625 0.5625,-5.0625" />
                                                <path
                                                    className="even" d="m 60.901059,56.286612 c 0,0 0.903689,-9.415996 -3.801777,-14.849112 -3.03125,-3.5 -7.329245,-4.723939 -11.867187,-3.8125 -5.523438,1.109375 -7.570313,5.75 -7.570313,5.75" />
                                                <path
                                                    className="even" d="m 34.072577,68.846248 c 0,0 2.274231,-4.165782 2.839205,-9.033748 0.443558,-3.821814 -0.49394,-5.649939 -0.714206,-8.05386 -0.220265,-2.403922 0.21421,-4.63364 0.21421,-4.63364" />
                                                <path
                                                    className="odd" d="m 37.774165,70.831845 c 0,0 2.692139,-6.147592 3.223034,-11.251208 0.530895,-5.103616 -2.18372,-7.95562 -0.153491,-13.647655 2.030229,-5.692035 8.108442,-4.538898 8.108442,-4.538898" />
                                                <path
                                                    className="odd" d="m 54.391174,71.715729 c 0,0 2.359472,-5.427681 2.519068,-16.175068 0.159595,-10.747388 -4.375223,-12.993087 -4.375223,-12.993087" />
                                                <path
                                                    className="even" d="m 49.474282,73.625 c 0,0 3.730297,-8.451831 3.577665,-16.493718 -0.152632,-8.041887 -0.364805,-11.869326 -4.765165,-11.756282 -4.400364,0.113044 -3.875,4.875 -3.875,4.875" />
                                                <path
                                                    className="even" d="m 41.132922,72.334447 c 0,0 2.49775,-5.267079 3.181981,-8.883029 0.68423,-3.61595 0.353553,-9.413359 0.353553,-9.413359" />
                                                <path
                                                    className="odd" d="m 45.161782,73.75 c 0,0 1.534894,-3.679847 2.40625,-6.53125 0.871356,-2.851403 1.28125,-7.15625 1.28125,-7.15625" />
                                                <path
                                                    className="odd" d="m 48.801947,56.125 c 0,0 0.234502,-1.809418 0.109835,-3.375 -0.124667,-1.565582 -0.5625,-3.1875 -0.5625,-3.1875" />
                                            </g>
                                        </svg>
                                        <svg className="fingerprint fingerprint-active" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
                                            <g className="fingerprint-out" fill="none" stroke-width="2" stroke-linecap="round">
                                                <path
                                                    className="odd" d="m 25.117139,57.142857 c 0,0 -1.968558,-7.660465 -0.643619,-13.149003 1.324939,-5.488538 4.659682,-8.994751 4.659682,-8.994751" />
                                                <path
                                                    className="odd" d="m 31.925369,31.477584 c 0,0 2.153609,-2.934998 9.074971,-5.105078 6.921362,-2.17008 11.799844,-0.618718 11.799844,-0.618718" />
                                                <path
                                                    className="odd" d="m 57.131213,26.814448 c 0,0 5.127709,1.731228 9.899495,7.513009 4.771786,5.781781 4.772971,12.109204 4.772971,12.109204" />
                                                <path
                                                    className="odd" d="m 72.334009,50.76769 0.09597,2.298098 -0.09597,2.386485" />
                                                <path
                                                    className="even" d="m 27.849282,62.75 c 0,0 1.286086,-1.279223 1.25,-4.25 -0.03609,-2.970777 -1.606117,-7.675266 -0.625,-12.75 0.981117,-5.074734 4.5,-9.5 4.5,-9.5" />
                                                <path
                                                    className="even" d="m 36.224282,33.625 c 0,0 8.821171,-7.174484 19.3125,-2.8125 10.491329,4.361984 11.870558,14.952665 11.870558,14.952665" />
                                                <path
                                                    className="even" d="m 68.349282,49.75 c 0,0 0.500124,3.82939 0.5625,5.8125 0.06238,1.98311 -0.1875,5.9375 -0.1875,5.9375" />
                                                <path
                                                    className="odd" d="m 31.099282,65.625 c 0,0 1.764703,-4.224042 2,-7.375 0.235297,-3.150958 -1.943873,-9.276886 0.426777,-15.441942 2.370649,-6.165056 8.073223,-7.933058 8.073223,-7.933058" />
                                                <path
                                                    className="odd" d="m 45.849282,33.625 c 0,0 12.805566,-1.968622 17,9.9375 4.194434,11.906122 1.125,24.0625 1.125,24.0625" />
                                                <path
                                                    className="even" d="m 59.099282,70.25 c 0,0 0.870577,-2.956221 1.1875,-4.5625 0.316923,-1.606279 0.5625,-5.0625 0.5625,-5.0625" />
                                                <path
                                                    className="even" d="m 60.901059,56.286612 c 0,0 0.903689,-9.415996 -3.801777,-14.849112 -3.03125,-3.5 -7.329245,-4.723939 -11.867187,-3.8125 -5.523438,1.109375 -7.570313,5.75 -7.570313,5.75" />
                                                <path
                                                    className="even" d="m 34.072577,68.846248 c 0,0 2.274231,-4.165782 2.839205,-9.033748 0.443558,-3.821814 -0.49394,-5.649939 -0.714206,-8.05386 -0.220265,-2.403922 0.21421,-4.63364 0.21421,-4.63364" />
                                                <path
                                                    className="odd" d="m 37.774165,70.831845 c 0,0 2.692139,-6.147592 3.223034,-11.251208 0.530895,-5.103616 -2.18372,-7.95562 -0.153491,-13.647655 2.030229,-5.692035 8.108442,-4.538898 8.108442,-4.538898" />
                                                <path
                                                    className="odd" d="m 54.391174,71.715729 c 0,0 2.359472,-5.427681 2.519068,-16.175068 0.159595,-10.747388 -4.375223,-12.993087 -4.375223,-12.993087" />
                                                <path
                                                    className="even" d="m 49.474282,73.625 c 0,0 3.730297,-8.451831 3.577665,-16.493718 -0.152632,-8.041887 -0.364805,-11.869326 -4.765165,-11.756282 -4.400364,0.113044 -3.875,4.875 -3.875,4.875" />
                                                <path
                                                    className="even" d="m 41.132922,72.334447 c 0,0 2.49775,-5.267079 3.181981,-8.883029 0.68423,-3.61595 0.353553,-9.413359 0.353553,-9.413359" />
                                                <path
                                                    className="odd" d="m 45.161782,73.75 c 0,0 1.534894,-3.679847 2.40625,-6.53125 0.871356,-2.851403 1.28125,-7.15625 1.28125,-7.15625" />
                                                <path
                                                    className="odd" d="m 48.801947,56.125 c 0,0 0.234502,-1.809418 0.109835,-3.375 -0.124667,-1.565582 -0.5625,-3.1875 -0.5625,-3.1875" />
                                            </g>
                                        </svg>
                                        <svg className="ok" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><path d="M34.912 50.75l10.89 10.125L67 36.75" fill="none" stroke="#fff" stroke-width="6" /></svg>
                                    </div>

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
                                            Don't have an account?{' '}
                                            <button
                                                onClick={() => setShowSignup(true)}
                                                className="text-yellow-500 font-semibold hover:text-yellow-600 transition duration-300"
                                            >
                                                Sign Up
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
export default Login;