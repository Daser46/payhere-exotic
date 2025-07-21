import React from 'react';

const Header = () => {
    return (
        <div className="hidden md:block bg-gradient-to-r from-yellow-500/50  to-white py-2 text-black shadow-lg">
            <div className="w-full px-4 md:px-20 mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center mb-4 md:mb-0">
                    <span className="text-sm md:text-base lg:text-lg font-semibold">Exotic Mobiles Sri Lanka</span>
                </div>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6 text-xs sm:text-sm justify-center items-center">
                    <a href="#" className="w-full sm:w-auto hover:text-yellow-400 transition-colors duration-300 flex items-center justify-center">
                        <i className="fas fa-store mr-2"></i>
                        Find Stores
                    </a>
                    {/* <a href="/track-order" className="w-full sm:w-auto hover:text-yellow-400 transition-colors duration-300 flex items-center justify-center">
                        <i className="fas fa-truck mr-2"></i>
                        Track Order
                    </a> */}
                    {/* <a href="/About" className="w-full sm:w-auto hover:text-yellow-400 transition-colors duration-300 flex items-center justify-center">
                        <i className="fas fa-info-circle mr-2"></i>
                        About Us
                    </a>
                    <a href="/Contact" className="w-full sm:w-auto hover:text-yellow-400 transition-colors duration-300 flex items-center justify-center">
                        <i className="fas fa-envelope mr-2"></i>
                        Contact Us
                    </a> */}
                    <a href="/Faq" className="w-full sm:w-auto hover:text-yellow-400 transition-colors duration-300 flex items-center justify-center">
                        <i className="fas fa-question-circle mr-2"></i>
                        FAQ
                    </a>
                    <li 
                            className="flex items-center gap-2 px-3 hover:underline cursor-pointer"
                        >
                            <img width={32} src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Flag_of_Sri_Lanka.svg/1280px-Flag_of_Sri_Lanka.svg.png"/>
                            Ship to
                        </li>
                </div>
            </div>
        </div>
    );
};

export default Header;