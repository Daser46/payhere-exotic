'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import speaker from '@/assets/images/default.png'
import Navbar from "@/components/Navbar/page"
import Breadcrumb from "@/components/Breadcrumb"
import Specs from "@/components/Specs" // Assuming Specs component has the removeBullets utility
import Reviews from '@/components/Reviews'
import Suggestproducts from '@/components/Suggestproducts'
import { supabase } from '@/lib/supabase'
import { useParams, useRouter } from 'next/navigation'
import { FaHeart, FaRegHeart, FaInstagram, FaFacebook, FaTwitter, FaWhatsapp, FaCheckCircle } from 'react-icons/fa'
import { addToWishlist, removeFromWishlist, getWishlist } from '@/util/wishlist'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

// Helper function to remove bullets, same as in Specs component
// This can be refactored into a shared utility if used in many places.
const removeBullets = (text: string): string => {
    return text.replace(/^\s*(?:[-*•●\d]+\.?\s*|^\s*\d+\.\s*)/gm, '');
};

type Product = {
    id: number,
    name: string,
    category: string,
    created_at: any,
    description: string,
    discount?: number,
    featured?: boolean,
    featured_tags?: string[],
    image_2?: string,
    image_3?: string,
    main_image?: string,
    overview?: string,
    price?: number,
    review_avg?: number,
    reviews?: number,
    specs?: Object,
    stock: number,
    brand?: string,
    comments?: any[]
}

type CartItem = {
    id: string;
    quantity: number;
};

const ProductPage = () => {
    const router = useRouter()
    const [quantity, setQuantity] = useState(1)
    const params = useParams<{ ProductID: string }>()
    const [loading, setLoading] = useState(true)
    const [productData, setProductData] = useState<Product>()
    const [isAlert, setIsAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [isWishlisted, setIsWishlisted] = useState(false)
    const [showEmailModal, setShowEmailModal] = useState(false)
    const [email, setEmail] = useState('')
    const [fullscreenImage, setFullscreenImage] = useState('')
    const [showFullscreen, setShowFullscreen] = useState(false)

    const handleQuantityChange = (type: 'inc' | 'dec') => {
        setQuantity(prev => {
            if (type === 'dec' && prev > 1) return prev - 1
            if (type === 'inc' && prev < 10) return prev + 1
            return prev
        })
    }

    const fetchProductDetails = async () => {
        try {
            const { data } = await supabase.from('products').select('*').eq('id', params.ProductID).single()
            if (data) {
                setProductData(data)
            }
        } catch (error) {
            console.log('Product may no longer be available')
        } finally {
            setLoading(false)
        }
    }

    const checkWishlistStatus = async () => {
        const userEmail = localStorage.getItem('wishlistEmail')
        if (userEmail) {
            try {
                const wishlist = await getWishlist(userEmail)
                setIsWishlisted(wishlist.some((item: { productId: string }) => item.productId === params.ProductID))
            } catch (error) {
                console.error('Error checking wishlist:', error)
            }
        }
    }

    const handleWishlistToggle = async (e: React.MouseEvent) => {
        e.preventDefault()

        const userEmail = localStorage.getItem('wishlistEmail')
        if (!userEmail) {
            setShowEmailModal(true)
            return
        }

        try {
            if (isWishlisted) {
                await removeFromWishlist(userEmail, params.ProductID)
            } else {
                await addToWishlist(userEmail, {
                    productId: params.ProductID,
                    name: productData?.name || '',
                    price: productData?.price || 0,
                    originalPrice: productData?.price || 0,
                    image: productData?.main_image || ''
                })
            }
            setIsWishlisted(!isWishlisted)
        } catch (error) {
            console.error('Error updating wishlist:', error)
        }
    }

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        localStorage.setItem('wishlistEmail', email)
        setShowEmailModal(false)
        const mockEvent = { stopPropagation: () => { }, preventDefault: () => { } } as React.MouseEvent
        handleWishlistToggle(mockEvent)
    }

    const updateQuantityFromLocalStorage = (upItem: CartItem, newQuantity: number) => {
        const currentItems = JSON.parse(localStorage.getItem("cart") || "[]") || []
        const updatedItems = currentItems.map((item: any) =>
            (item.id === upItem.id) ? { ...item, quantity: newQuantity } : item
        )
        localStorage.setItem("cart", JSON.stringify(updatedItems))
    }

    const addToCart = () => {
        let itemsCart = JSON.parse(localStorage.getItem("cart") || "[]") || []

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

    const openFullscreen = (imageUrl: string) => {
        setFullscreenImage(imageUrl)
        setShowFullscreen(true)
    }

    useEffect(() => {
        fetchProductDetails()
        checkWishlistStatus()
    }, [params.ProductID])

    if (loading) {
        return (
            <div className="w-full sm:w-11/12 2xl:w-5/6 mx-auto sm:px-4 py-2 sm:py-4 md:py-8">
                <div className="px-4">
                    <Navbar />
                    <div className="flex items-center text-gray-600">
                        <Breadcrumb />
                    </div>
                </div>
                <div className="p-2 sm:p-4 md:p-8 lg:p-16">
                    <div className="max-w-5xl mx-auto">
                        <div className="h-8 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4">
                            <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
                            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-6">
                            <div className="flex-1">
                                <div className="w-full h-[400px] bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
                                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                                    <div className="w-full h-[150px] bg-gray-200 rounded-lg animate-pulse"></div>
                                    <div className="w-full h-[150px] bg-gray-200 rounded-lg animate-pulse"></div>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-end space-x-4 mb-4">
                                    <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                                <div className="mb-4">
                                    <div className="h-6 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
                                    <div className="h-20 bg-gray-200 rounded w-full animate-pulse"></div>
                                </div>
                                <div className="mb-4">
                                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
                                    <div className="space-y-2">
                                        {[1, 2, 3, 4, 5].map((_, index) => (
                                            <div key={index} className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-4 mb-4">
                                    <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
                                    <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
                                    <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                                </div>
                                <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!productData) {
        return (
            <div className="w-full sm:w-11/12 2xl:w-5/6 mx-auto sm:px-4 py-2 sm:py-4 md:py-8">
                <div className="px-4">
                    <Navbar />
                    <Breadcrumb />
                </div>
                <div className="p-16 text-center">
                    <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
                    <p className="text-gray-600 mb-6">The product you're looking for may no longer be available.</p>
                    <button
                        onClick={() => router.push('/')}
                        className="px-6 py-2 bg-[#FFD700] text-black rounded-lg hover:bg-[#F0C800]"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="relative z-20 overflow-hidden pt-4 w-full 2xl:w-5/6 mx-auto px-4 sm:px-0">
            <div className="w-full px-4">
                <Navbar />
                <Breadcrumb />
            </div>

            {/* Main Product Section */}
            <div className="p-2 sm:p-4 md:p-8 lg:p-16">
                <div className="2xl:max-w-full max-w-full mx-auto">
                    {/* Product Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-gray-900">{productData.name}</h1>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                            <div className="flex items-center">
                                <Image
                                    src={productData.main_image || speaker}
                                    alt="Brand logo"
                                    width={24}
                                    height={24}
                                    className="rounded-full mr-2"
                                />
                                <span className="text-gray-600 text-sm sm:text-base">{productData.brand}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-yellow-500 text-lg mr-1">★</span>
                                <span className="text-gray-600 text-sm sm:text-base">{productData.review_avg || '0'}</span>
                                <span className="text-gray-600 ml-1 text-sm sm:text-base">({productData.reviews || '0'} Reviews)</span>
                            </div>
                            {productData.featured_tags?.map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-[#FFD700] text-black text-xs sm:text-sm px-2 py-1 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Product Content */}
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Product Images */}
                        <div className="flex-1">
                            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                                <div className="relative w-full h-80 sm:h-96 md:h-[500px] rounded-lg overflow-hidden group">
                                    <Zoom>
                                        <Image
                                            src={String(productData.main_image || speaker)}
                                            alt="Main product image"
                                            fill
                                            className="object-contain cursor-zoom-in"
                                            priority
                                            onClick={() => openFullscreen(String(productData.main_image || speaker))}
                                        />
                                    </Zoom>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white rounded-lg shadow-md p-2">
                                    <div className="relative w-full h-40 sm:h-48 rounded-lg overflow-hidden group">
                                        <Zoom>
                                            <Image
                                                src={String(productData.image_2 || speaker)}
                                                alt="Product image 1"
                                                fill
                                                className="object-contain cursor-zoom-in"
                                                onClick={() => openFullscreen(String(productData.image_2 || speaker))}
                                            />
                                        </Zoom>
                                    </div>
                                </div>
                                <div className="bg-white rounded-lg shadow-md p-2">
                                    <div className="relative w-full h-40 sm:h-48 rounded-lg overflow-hidden group">
                                        <Zoom>
                                            <Image
                                                src={String(productData.image_3 || speaker)}
                                                alt="Product image 2"
                                                fill
                                                className="object-contain cursor-zoom-in"
                                                onClick={() => openFullscreen(String(productData.image_3 || speaker))}
                                            />
                                        </Zoom>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                {/* Social and Wishlist */}
                                <div className="flex justify-end space-x-4 mb-6">
                                    <button
                                        onClick={handleWishlistToggle}
                                        className={`${isWishlisted ? 'text-red-500' : 'text-gray-600 hover:text-red-500'} transition-colors`}
                                        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                                    >
                                        {isWishlisted ?
                                            <FaHeart className="h-6 w-6" /> :
                                            <FaRegHeart className="h-6 w-6" />
                                        }
                                    </button>

                                    <div className="flex justify-end space-x-4">
                                        <a
                                            href={`https://www.instagram.com/?url=${encodeURIComponent(window.location.href)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-600 hover:text-[#E1306C] transition-colors"
                                            aria-label="Share on Instagram"
                                        >
                                            <FaInstagram className="h-6 w-6" />
                                        </a>

                                        <a
                                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-600 hover:text-[#1877F2] transition-colors"
                                            aria-label="Share on Facebook"
                                        >
                                            <FaFacebook className="h-6 w-6" />
                                        </a>

                                        <a
                                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`Check out this product: ${productData.name}`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-600 hover:text-[#1DA1F2] transition-colors"
                                            aria-label="Share on Twitter"
                                        >
                                            <FaTwitter className="h-6 w-6" />
                                        </a>

                                        <a
                                            href={`https://wa.me/?text=${encodeURIComponent(`Check out this product: ${productData.name} - ${window.location.href}`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-600 hover:text-[#25D366] transition-colors"
                                            aria-label="Share on WhatsApp"
                                        >
                                            <FaWhatsapp className="h-6 w-6" />
                                        </a>
                                    </div>
                                </div>


                                {/* Overview Section - MODIFIED */}
                                <div className="mb-6">
                                    <h2 className="text-xl font-semibold mb-3 text-gray-800">Overview</h2>
                                    <ul className="text-gray-600 leading-relaxed list-disc pl-5"> {/* Changed to ul and added list-disc for bullets */}
                                        {productData.overview?.split(/[\n]/) // Split by newline or period
                                            .filter(line => line.trim()) // Filter out empty strings
                                            .slice(0, 5) // Limit to the first 5 sentences/lines
                                            .map((point, index) => {
                                                let processedPoint = removeBullets(point).trim(); // Remove existing bullets and trim

                                                // Capitalize the first letter of each point
                                                if (processedPoint.length > 0) {
                                                    processedPoint = processedPoint.charAt(0).toUpperCase() + processedPoint.slice(1);
                                                }

                                                return (
                                                    <li key={index} className="mb-1"> {/* Each sentence as a list item */}
                                                        {processedPoint}
                                                    </li>
                                                );
                                            })}
                                    </ul>
                                </div>


                                {/* Product Details */}
                                <div className="mb-6">
                                    <h2 className="text-xl font-semibold mb-3 text-gray-800">Product Details</h2>
                                    <ul className="space-y-3">
                                        {productData.description.split('\n') // Changed from .split('.') to .split('\n')
                                            .filter(Boolean)
                                            .map((feature, index) => (
                                                <li key={index} className="flex items-start">
                                                    <FaCheckCircle className="text-[#FFD700] mr-2 mt-1 flex-shrink-0" />
                                                    <span className="text-gray-600">{feature.trim()}</span>
                                                </li>
                                            ))}
                                    </ul>
                                </div>

                                {/* Price and Quantity */}
                                <div className="mb-6">
                                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                        <div>
                                            {productData.discount && productData.discount > 0 ? (
                                                <div className="flex items-center gap-3">
                                                    <span className="text-3xl font-bold text-red-600">
                                                        LKR {(productData.price * (100 - productData.discount) / 100).toLocaleString()}
                                                    </span>
                                                    <span className="text-lg text-gray-500 line-through">
                                                        LKR {productData.price?.toLocaleString()}
                                                    </span>
                                                    <span className="bg-red-100 text-red-800 text-sm font-semibold px-2 py-1 rounded">
                                                        {productData.discount}% OFF
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-3xl font-bold text-gray-900">
                                                    LKR {productData.price?.toLocaleString()}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                            <button
                                                onClick={() => handleQuantityChange('dec')}
                                                className="px-3 sm:px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                                                disabled={quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="px-4 py-2 text-center w-12">{quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange('inc')}
                                                className="px-3 sm:px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                                                disabled={quantity >= 10}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-lg font-semibold text-gray-700">Total Price</span>
                                        <span className="text-2xl font-bold text-red-600">
                                            LKR {(productData.price * quantity * (100 - (productData.discount || 0)) / 100).toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        <button
                                            className="w-full py-3 bg-[#FFD700] hover:bg-[#F0C800] text-black font-semibold rounded-lg transition-colors"
                                            onClick={addToCart}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>

                                {/* Stock Status */}
                                <div className="text-sm text-gray-600">
                                    {productData.stock > 0 ? (
                                        <span className="text-green-600">In Stock ({productData.stock} available)</span>
                                    ) : (
                                        <span className="text-red-600">Out of Stock</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Specifications */}
                    <div className="mt-12">
                        <Specs props={{
                            overview: productData.overview || '',
                            description: productData.description || '',
                            specs: productData.specs || {}
                        }} />
                    </div>

                    {/* Reviews */}
                    <div className="mt-12">
                        <Reviews props={{
                            reviews: productData.review_avg || 0,
                            count: productData.reviews || 0,
                            itemName: productData.name || '',
                            itemID: productData.id || 0,
                            comments: productData.comments?.slice(0, 6) || []
                        }} />
                    </div>

                    {/* Suggested Products */}
                    <div className="mt-12">
                        <Suggestproducts category={productData.category || ''} />
                    </div>
                </div>
            </div>

            {/* Alert Notification */}
            {isAlert && (
                <div className="fixed bottom-4 right-4 z-50">
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg">
                        {alertMessage}
                    </div>
                </div>
            )}

            {/* Email Collection Modal */}
            {showEmailModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <h3 className="text-lg font-bold mb-4">Save Your Wishlist</h3>
                        <p className="mb-4 text-gray-600">
                            Enter your email to save items to your wishlist and get notified about price drops.
                        </p>
                        <form onSubmit={handleEmailSubmit}>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                required
                                className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                            />
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowEmailModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#FFD700] hover:bg-[#F0C800] text-black font-semibold rounded transition-colors"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    )
}

export default ProductPage