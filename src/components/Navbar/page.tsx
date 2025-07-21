'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    FaHeart, FaShoppingCart, FaSearch, FaBars, FaTimes, 
    FaInfoCircle, FaQuestionCircle, FaEnvelope, 
    FaPhone, FaShieldAlt 
} from 'react-icons/fa'
import Wishlistdrawer from '../Wishlistdrawer'
import logo from '../../assets/images/Group 1.png'

const Navbar = () => {
    const [showSearch, setShowSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [showDrawer, setShowDrawer] = useState(false)
    const [showWishlist, setShowWishlist] = useState(false)
    const router = useRouter()

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    const handleSearchSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/Products?search=${encodeURIComponent(searchQuery.trim())}`)
            setShowDrawer(false)
        }
    }

    // Prevent background scroll when drawer is open
    useEffect(() => {
        document.body.style.overflow = showDrawer ? 'hidden' : 'auto'
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [showDrawer])

    return (
        <nav className="bg-transparent rounded-t-2xl sticky top-0 z-50">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse transition-transform     ">
                    <img src={logo.src} alt="logo" className="h-14 sm:h-16 md:h-18 lg:h-20 w-auto transition-all duration-300" />
                </a>

                <div className="hidden md:flex items-center space-x-4">
                    <a href="/Products" className="p-2 hover:bg-gray-100 rounded-lg text-gray-800 transition-colors duration-300">Products</a>
                    <a href="/About" className="p-2 hover:bg-gray-100 rounded-lg text-gray-800 transition-colors duration-300">About Us</a>
                    <a href="/Contact" className="p-2 hover:bg-gray-100 rounded-lg text-gray-800 transition-colors duration-300">Contact Us</a>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex items-center">
                        <button onClick={() => setShowSearch(!showSearch)} className="p-2 hover:bg-gray-100 rounded-full">
                            <FaSearch className="w-5 h-5 text-gray-400" />
                        </button>
                        <AnimatePresence>
                            {showSearch && (
                                <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                                    <motion.input 
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={{ width: "300px", opacity: 1 }}
                                        exit={{ width: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        type="search" 
                                        value={searchQuery}
                                        onChange={handleSearch}
                                        placeholder="Search for products..." 
                                        className="ml-2 p-2 outline-none text-sm border rounded-lg"
                                    />
                                    <button type="submit" className="absolute right-2 text-gray-400 hover:text-gray-600">
                                        <FaSearch className="w-4 h-4" />
                                    </button>
                                </form>
                            )}
                        </AnimatePresence>
                    </div>

                    <Wishlistdrawer show={showWishlist} onClose={() => setShowWishlist(false)} />
                    <a href="/Cart" className="p-2 hover:bg-gray-100 rounded-lg hidden md:flex text-gray-800">
                        <FaShoppingCart className="mr-1" />
                    </a>

                    <button onClick={() => setShowDrawer(true)} className="p-2 hover:bg-gray-100 rounded-full md:hidden">
                        <FaBars className="w-6 h-6" />
                    </button>
                </div>

                {/* Mobile Drawer */}
                <AnimatePresence>
                    {showDrawer && (
                        <div className="fixed inset-0 z-[9999]">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/50"
                                onClick={() => setShowDrawer(false)}
                            />
                            <motion.div
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ type: "tween", duration: 0.3 }}
                                className="absolute top-0 right-0 h-screen w-80 bg-white shadow-2xl overflow-y-auto"
                            >
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <a href="/" className="flex items-center space-x-2">
                                            <img src={logo.src} alt="logo" className="h-10" />
                                        </a>
                                        <button onClick={() => setShowDrawer(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                            <FaTimes className="w-6 h-6" />
                                        </button>
                                    </div>
                                    <div className="mb-4 text-sm text-gray-700">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <FaPhone className="w-4 h-4 text-gray-600" />
                                            <span>077 779 6238</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <FaEnvelope className="w-4 h-4 text-gray-600" />
                                            <span>exoticmobile7@gmail.com</span>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSearchSubmit} className="mb-6 relative">
                                        <input 
                                            type="search" 
                                            value={searchQuery}
                                            onChange={handleSearch}
                                            placeholder="Search for products..." 
                                            className="w-full p-2 pr-10 outline-none text-sm border rounded-lg bg-white"
                                        />
                                        <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                            <FaSearch className="w-4 h-4" />
                                        </button>
                                    </form>

                                    <div className="space-y-4">
                                        <a href="/Products" onClick={() => setShowDrawer(false)} className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg">
                                            <FaShoppingCart className="w-5 h-5" />
                                            <span>Products</span>
                                        </a>
                                        <a href="/About" onClick={() => setShowDrawer(false)} className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg">
                                            <FaInfoCircle className="w-5 h-5" />
                                            <span>About Us</span>
                                        </a>
                                        <a href="/Contact" onClick={() => setShowDrawer(false)} className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg">
                                            <FaEnvelope className="w-5 h-5" />
                                            <span>Contact Us</span>
                                        </a>
                                        <a href="/Cart" onClick={() => setShowDrawer(false)} className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg">
                                            <FaShoppingCart className="w-5 h-5" />
                                            <span>Cart</span>
                                        </a>
                                        <a href="/faq" onClick={() => setShowDrawer(false)} className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg">
                                            <FaQuestionCircle className="w-5 h-5" />
                                            <span>FAQ</span>
                                        </a>
                                        <a href="/privacy" onClick={() => setShowDrawer(false)} className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg">
                                            <FaShieldAlt className="w-5 h-5" />
                                            <span>Privacy Policy</span>
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    )
}

export default Navbar
