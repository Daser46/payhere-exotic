'use client'
import React, { useState, useEffect } from 'react'
import { StaticImageData } from 'next/image'
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa'
import { addToWishlist, removeFromWishlist, getWishlist } from '../../util/wishlist'
import { useRouter } from 'next/navigation'

interface DiscountCardProps {
    id: string
    image: string | StaticImageData
    discount?: number
    title: string
    price: number
    originalPrice: number
    rating?: number
    reviews?: number
    inStock?: boolean
    onAddToCart: (item: any, quantity: number) => void
    isPremium?: boolean
}

const DiscountCard: React.FC<DiscountCardProps> = ({    
    id,
    image,
    discount = 0,
    title,
    price,
    originalPrice,
    rating = 5,
    reviews = 0,
    inStock = true,
    onAddToCart,
    isPremium = true
}) => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [isWishlisted, setIsWishlisted] = useState(false)
    const [showEmailModal, setShowEmailModal] = useState(false)
    const [email, setEmail] = useState('')
    const [isAlert, setIsAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [quantity] = useState(1)

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 300)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        const checkWishlistStatus = async () => {
            const userEmail = localStorage.getItem('wishlistEmail')
            if (userEmail) {
                try {
                    const wishlist = await getWishlist(userEmail)
                    setIsWishlisted(wishlist.some((item: { productId: string }) => item.productId === id))
                } catch (error) {
                    console.error('Error checking wishlist:', error)
                }
            }
        }
        checkWishlistStatus()
    }, [id])

    const formatPrice = (value: number) => {
        return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    const updateQuantityFromLocalStorage = (item: any, newQuantity: number) => {
        let cart = JSON.parse(localStorage.getItem("cart") || "[]")
        const index = cart.findIndex((i: any) => i.id === item.id)
        if (index !== -1) {
            cart[index].quantity = newQuantity
            localStorage.setItem("cart", JSON.stringify(cart))
        }
    }

    const addToCart = () => {
        let itemsCart = JSON.parse(localStorage.getItem("cart") || "[]") || []
        const productData = {
            id: id,
            name: title,
            price: price,
            main_image: typeof image === 'string' ? image : image.src
        }
        
        if (productData) {
            setAlertMessage('Item added to Cart')
            setIsAlert(true)
            let index = itemsCart.findIndex((item: any) => item.id === productData.id.toString())
            if (index !== -1) {
                updateQuantityFromLocalStorage(itemsCart[index], itemsCart[index].quantity + quantity)
            } else {
                itemsCart.push({
                    id: productData.id.toString(),
                    quantity: quantity,
                    name: productData.name,
                    price: productData.price,
                    image: productData.main_image
                })
                localStorage.setItem("cart", JSON.stringify(itemsCart))
            }
            setTimeout(() => setIsAlert(false), 2000)
        } else {
            setAlertMessage('Failed to add to cart!')
            setIsAlert(true)
            setTimeout(() => setIsAlert(false), 2000)
        }
    }

    const handleWishlistToggle = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        const userEmail = localStorage.getItem('wishlistEmail')
        
        if (!userEmail) {
            setShowEmailModal(true)
            return
        }

        try {
            if (isWishlisted) {
                await removeFromWishlist(userEmail, id)
            } else {
                await addToWishlist(userEmail, {
                    productId: id,
                    name: title,
                    price,
                    originalPrice: originalPrice || price,
                    image: typeof image === 'string' ? image : image.src
                })
            }
            setIsWishlisted(!isWishlisted)
        } catch (error) {
            console.error('Error updating wishlist:', error)
        }
    }
    const handleAddToCartClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
        
        const productData = {
            id: id,
            name: title,
            price: price,
            main_image: typeof image === 'string' ? image : image.src,
            originalPrice: originalPrice,
            discount: discount
        }
        
        onAddToCart(productData, quantity)
        
        setAlertMessage('Item added to cart!')
        setIsAlert(true)
        setTimeout(() => setIsAlert(false), 2000)
    }

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        localStorage.setItem('wishlistEmail', email)
        setShowEmailModal(false)
        const mockEvent = { stopPropagation: () => {}, preventDefault: () => {} } as React.MouseEvent
        handleWishlistToggle(mockEvent)
    }

    const discountedPrice = price - (price * (discount / 100))
    const calculatedOriginalPrice = originalPrice || price

    if (loading) {
        return (
            <div className="relative m-6 w-[280px] h-[400px] flex flex-col overflow-clip rounded-lg border border-gray-100 bg-white shadow-md">
                <div className="animate-pulse flex flex-col">
                    <div className="h-48 bg-gray-200 rounded-xl"></div>
                    <div className="mt-4 px-4 space-y-3">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div 
            className="relative m-6 w-[280px] h-[380px] flex flex-col overflow-clip rounded-lg border border-gray-100 bg-white shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => router.push(`/product/${id}`)}
        >
            {discount > 0 && (
                <span className="absolute overflow-hidden w-[150px] h-[150px] top-[-10px] left-[-10px] flex items-center justify-center z-10">
                    <span className="absolute w-[150%] h-[40px] bg-gradient-to-r from-[#ff6547] via-[#ffb144] to-[#ff7053] rotate-[-45deg] translate-y-[-20px] flex items-center justify-center text-white font-bold tracking-wider uppercase shadow-md before:content-[''] before:absolute before:w-[10px] before:h-[10px] before:bottom-0 before:left-0 before:z-[-1] before:shadow-[140px_-140px_#cc3f47] before:bg-gradient-to-r before:from-[#FF512F] before:via-[#F09819] before:to-[#FF512F]">
                        {discount}% off
                    </span>
                </span>
            )}
            
            <div className="relative mx-3 mt-3 flex h-48 overflow-hidden rounded-xl">
                <img 
                    className="object-cover hover:scale-105 transition-transform duration-300 mx-auto" 
                    src={typeof image === 'string' ? image : image.src} 
                    alt="product image" 
                />
                <span className={`absolute bottom-2 left-2 px-2 py-1 rounded-md text-xs font-medium ${
                inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
                {inStock ? 'In Stock' : 'Out of Stock'}
            </span>
                {discount > 0 && (
                    <span className="absolute top-0 right-0 rounded-xl bg-red-600 px-2 py-1 text-center text-xs font-medium text-white">
                        {discount}% OFF
                    </span>
                )}
                <button
                    className={`absolute bottom-2 right-2 ${isWishlisted ? 'text-red-500' : 'text-gray-600 hover:text-red-500'} transition-colors`}
                    onClick={handleWishlistToggle}
                >
                    {isWishlisted ? <FaHeart className="h-6 w-6" /> : <FaRegHeart className="h-6 w-6" />}
                </button>
            </div>
            <div className="mt-3 px-4 pb-4">
                <h5 className="text-lg tracking-tight text-slate-900 transition-colors line-clamp-1">
                    {title}
                </h5>
                <div className="mt-2 mb-2">
                    <div className="flex items-center">
                        <div className="flex text-yellow-400">
                            {[...Array(rating)].map((_, i) => (
                                <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                            ))}
                            {reviews > 0 && (
                                <span className="ml-2 text-sm text-gray-500">
                                    ({reviews} reviews)
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="mt-2 mb-4 flex items-center justify-between">
                        <p>
                            <span className="text-xl font-bold text-slate-900">
                                Rs.{formatPrice(discountedPrice)}
                            </span>
                            {discount > 0 && (
                                <span className="text-xs text-slate-900 line-through ml-2">
                                    Rs.{formatPrice(calculatedOriginalPrice)}
                                </span>
                            )}
                        </p>
                       
                    </div>

                    <button
                onClick={handleAddToCartClick}
                disabled={!inStock}
                className={`w-full flex items-center justify-center rounded-md px-4 py-2 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 transform hover:scale-105 transition-all duration-300 ${
                    inStock ? 'bg-slate-900 hover:bg-gray-700' : 'bg-gray-400 cursor-not-allowed'
                }`}
            >
                <FaShoppingCart className="mr-2 h-4 w-4" />
                {inStock ? 'Add to cart' : 'Out of Stock'}
            </button>
                </div>
            </div>

            {/* Email Collection Modal */}
            {showEmailModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <h3 className="text-lg font-bold mb-4">Save Your Wishlist</h3>
                        <p className="mb-4">
                            Enter your email to save items to your wishlist and get notified about price drops.
                        </p>
                        <form onSubmit={handleEmailSubmit}>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                required
                                className="w-full p-2 border rounded mb-4"
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setShowEmailModal(false)}
                                    className="px-4 py-2 border rounded hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
            {isAlert && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
                    {alertMessage}
                </div>
            )}
        </div>
    )
}

export default DiscountCard