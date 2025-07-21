import React, { useState, useEffect } from 'react'
import { StaticImageData } from 'next/image'

interface ListCardProps {
    image: string | StaticImageData
    discount?: number
    title: string
    price: number
    originalPrice?: number
    rating?: number
    reviews?: number
    inStock?: boolean
    onAddToCart?: () => void
    isWishlistedInitial?: boolean
    minDiscountToShow?: number
}

const Listcard: React.FC<ListCardProps> = ({
    image,
    discount = 0,
    title,
    price,
    originalPrice,
    rating = 5,
    reviews = 0,
    inStock = true,
    onAddToCart,
    isWishlistedInitial = false,
    minDiscountToShow = 5
}) => {
    const [loading, setLoading] = useState(true)
    const [isWishlisted, setIsWishlisted] = useState(isWishlistedInitial)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 300)
        return () => clearTimeout(timer)
    }, [])

    const formatPrice = (value: number) => {
        return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    const shouldShowDiscount = discount > minDiscountToShow
    const discountedPrice = shouldShowDiscount ? price - (price * (discount / 100)) : price
    const calculatedOriginalPrice = originalPrice || price

    if (loading) {
        return (
            <div className="relative m-2 sm:m-4 md:m-6 flex flex-col sm:flex-row w-full max-w-[800px] overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                <div className="relative mx-auto sm:mx-3 my-3 h-40 sm:h-48 w-40 sm:w-48 overflow-hidden rounded-xl bg-gray-200 animate-pulse" />
                <div className="flex-1 p-3 sm:p-4">
                    <div className="w-3/4 h-6 bg-gray-200 rounded animate-pulse mb-4" />
                    <div className="flex items-center mb-4">
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                            ))}
                        </div>
                        <div className="w-24 h-4 bg-gray-200 rounded animate-pulse ml-2" />
                    </div>
                    <div className="w-32 h-8 bg-gray-200 rounded animate-pulse mb-4" />
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                        <div className="w-full sm:w-32 h-10 bg-gray-200 rounded animate-pulse" />
                        <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="relative m-1 sm:m-2 md:m-4 flex flex-col sm:flex-row w-full max-w-[800px] overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md hover:shadow-xl transition-shadow duration-300">
            <span className="absolute overflow-hidden w-[120px] h-[120px] top-[-8px] left-[-8px] flex items-center justify-center z-10">
                {shouldShowDiscount && <span className="absolute w-[150%] h-[40px] bg-gradient-to-r from-[#ff6547] via-[#ffb144] to-[#ff7053] rotate-[-45deg] translate-y-[-20px] flex items-center justify-center text-white font-bold tracking-wider uppercase shadow-md before:content-[''] before:absolute before:w-[10px] before:h-[10px] before:bottom-0 before:left-0 before:z-[-1] before:shadow-[140px_-140px_#cc3f47] before:bg-gradient-to-r before:from-[#FF512F] before:via-[#F09819] before:to-[#FF512F]">
                    sale
                </span>}
            </span>
            <div className="relative mx-auto sm:mx-3 my-3 h-40 sm:h-48 w-40 sm:w-48 overflow-hidden rounded-xl">
                <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" src={typeof image === 'string' ? image : image.src} alt="product image" />
                {shouldShowDiscount && <span className="absolute top-0 right-0 rounded-xl bg-red-600 px-2 py-1 text-center text-xs font-medium text-white">{discount}% OFF</span>}
                <button
                    className={`absolute bottom-2 right-2 ${isWishlisted ? 'text-red-500' : 'text-gray-600 hover:text-red-500'} transition-colors`}
                    onClick={() => setIsWishlisted(!isWishlisted)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isWishlisted ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>
            </div>
            <div className="flex-1 p-3 sm:p-4">
                <div className="flex justify-between items-center">
                    <a href="#">
                        <h5 className="text-lg sm:text-xl tracking-tight text-slate-900 transition-colors">{title}</h5>
                    </a>
                </div>
                <div className="mt-2 mb-2">
                    <div className="flex items-center">
                        <div className="flex text-yellow-400">
                            {[...Array(rating)].map((_, i) => (
                                <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                            ))}
                        </div>
                        {reviews > 0 && <span className="ml-2 text-sm text-gray-500">({reviews} reviews)</span>}
                    </div>
                </div>
                <div className="mt-2 mb-3 sm:mb-4">
                    <p className="flex flex-col sm:flex-row sm:items-center">
                        <span>
                            <span className="text-xl sm:text-2xl font-bold text-slate-900">Rs.{formatPrice(discountedPrice)}</span>
                            {shouldShowDiscount && <span className="sm:ml-2 text-sm text-slate-900 line-through">Rs.{formatPrice(calculatedOriginalPrice)}</span>}
                        </span>
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-2">
                    <button
                        onClick={onAddToCart}
                        className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transform hover:scale-105 transition-all duration-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to cart
                    </button>
                    {inStock ? (
                        <span className="text-sm text-green-600">In Stock</span>
                    ) : (
                        <span className="text-sm text-red-600">Out of Stock</span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Listcard