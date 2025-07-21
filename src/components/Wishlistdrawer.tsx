// components/WishlistDrawer.tsx
import React, { useState, useEffect, useRef } from 'react'
import { FaHeart, FaTimes, FaRegHeart, FaShoppingCart } from 'react-icons/fa'
import { Playfair_Display } from 'next/font/google'
import { motion, AnimatePresence } from 'framer-motion'
import { getWishlist, removeFromWishlist } from '../../src/util/wishlist'

const playfair = Playfair_Display({ subsets: ['latin'] })

interface WishlistItem {
    id: string
    productId: string
    name: string
    price: number
    originalPrice?: number
    image: string
}

const WishlistDrawer = () => {
    const [open, setOpen] = useState(false)
    const modalRef = useRef<HTMLDivElement>(null)
    const [wishlist, setWishlist] = useState<WishlistItem[]>([])
    const [deletingIndex, setDeletingIndex] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadWishlist = async () => {
            const email = localStorage.getItem('wishlistEmail')
            if (email) {
                try {
                    const items = await getWishlist(email)
                    setWishlist(items)
                } catch (error) {
                    console.error('Error loading wishlist:', error)
                }
            }
            setLoading(false)
        }

        if (open) {
            loadWishlist()
        }
    }, [open])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const toggleDrawer = () => {
        setOpen(!open)
    }

    const handleRemoveItem = async (index: number) => {
        const item = wishlist[index]
        setDeletingIndex(index)
        
        try {
            const email = localStorage.getItem('wishlistEmail')
            if (email) {
                await removeFromWishlist(email, item.productId)
            }
            
            setTimeout(() => {
                setWishlist(prev => prev.filter((_, i) => i !== index))
                setDeletingIndex(null)
            }, 300)
        } catch (error) {
            console.error('Error removing item:', error)
            setDeletingIndex(null)
        }
    }

    const formatPrice = (value: number) => {
        return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    return (
        <div className="relative" ref={modalRef}>
            <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDrawer} 
                className="p-3 hover:bg-red-600/10 rounded-full text-red-600 flex items-center transition-all duration-300 relative"
                aria-label="Wishlist"
            >
                <FaHeart className="text-2xl md:text-xl" />
                {wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {wishlist.length}
                    </span>
                )}
            </motion.button>

            <AnimatePresence mode="wait">
                {open && (
                    <motion.div 
                        initial={{ opacity: 0, x: 300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 300 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed right-0 top-0 h-full z-50 bg-white shadow-xl w-full max-w-md"
                    >
                        <div className="h-full flex flex-col">
                            {/* Header */}
                            <div className="p-4 border-b flex justify-between items-center">
                                <h2 className={`text-2xl font-bold ${playfair.className}`}>
                                    My Wishlist
                                </h2>
                                <motion.button 
                                    whileHover={{ rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={toggleDrawer} 
                                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                    aria-label="Close wishlist"
                                >
                                    <FaTimes className="text-lg" />
                                </motion.button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-4">
                                {loading ? (
                                    <div className="space-y-4">
                                        {[...Array(3)].map((_, i) => (
                                            <div key={i} className="animate-pulse flex space-x-4">
                                                <div className="rounded-lg bg-gray-200 h-24 w-24"></div>
                                                <div className="flex-1 space-y-2">
                                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                                    <div className="h-4 bg-gray-200 rounded"></div>
                                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : wishlist.length === 0 ? (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center py-10 flex flex-col items-center justify-center h-full"
                                    >
                                        <FaRegHeart className="text-gray-300 text-5xl mb-4" />
                                        <h3 className="text-xl font-bold mb-2">Your Wishlist is Empty</h3>
                                        <p className="text-gray-500 max-w-xs">
                                            Save your favorite items here to keep track of them and get notified about price drops!
                                        </p>
                                    </motion.div>
                                ) : (
                                    <ul className="divide-y">
                                        <AnimatePresence>
                                            {wishlist.map((item, index) => (
                                                <motion.li
                                                    key={item.id}
                                                    layout
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ 
                                                        opacity: 1, 
                                                        y: 0,
                                                        transition: { delay: index * 0.05 }
                                                    }}
                                                    exit={{ opacity: 0, x: 50 }}
                                                    className={`py-4 ${deletingIndex === index ? 'opacity-50' : ''}`}
                                                >
                                                    <div className="flex gap-4">
                                                        <div className="flex-shrink-0">
                                                            <img 
                                                                src={item.image} 
                                                                alt={item.name}
                                                                className="w-24 h-24 object-cover rounded-lg"
                                                                loading="lazy"
                                                            />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="font-medium text-gray-900 truncate">
                                                                {item.name}
                                                            </h4>
                                                            <div className="mt-1">
                                                                <span className="text-lg font-bold">
                                                                    Rs.{formatPrice(item.price)}
                                                                </span>
                                                                {item.originalPrice && item.originalPrice > item.price && (
                                                                    <span className="text-sm text-gray-500 line-through ml-2">
                                                                        Rs.{formatPrice(item.originalPrice)}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="mt-2 flex gap-2">
                                                                <button className="flex-1 bg-black text-white py-2 px-3 rounded text-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
                                                                    <FaShoppingCart />
                                                                    Add to Cart
                                                                </button>
                                                                <button 
                                                                    onClick={() => handleRemoveItem(index)}
                                                                    className="w-10 h-10 flex items-center justify-center border rounded hover:bg-gray-100 transition-colors"
                                                                    aria-label="Remove item"
                                                                >
                                                                    <FaTimes />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.li>
                                            ))}
                                        </AnimatePresence>
                                    </ul>
                                )}
                            </div>

                            {/* Footer */}
                            {wishlist.length > 0 && (
                                <div className="p-4 border-t">
                                    <div className="flex justify-between items-center mb-2">
                                        <span>Total Items:</span>
                                        <span className="font-bold">{wishlist.length}</span>
                                    </div>
                                    <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded font-medium transition-colors">
                                        Add All to Cart
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Backdrop */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleDrawer}
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    />
                )}
            </AnimatePresence>
        </div>
    )
}

export default WishlistDrawer