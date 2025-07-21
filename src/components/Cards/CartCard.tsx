// "use client";
// import React, { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabase";

// type StorageCartItem = {
//   id: string;
//   quantity: number;
// };

// type CartCardProps = {
//   item: StorageCartItem;
//   deleteItem: (item: StorageCartItem) => void;
//   updateQuantityFromLocalStorage: (item: StorageCartItem, newQuantity: number) => void;
// };

// const CartCard: React.FC<CartCardProps> = ({ item, deleteItem, updateQuantityFromLocalStorage }) => {
//   const [cartItemData, setCartItemData] = useState<any>(null);
//   const [maxStock, setMaxStock] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let isMounted = true;

//     const fetchItemDetails = async () => {
//       const { data, error } = await supabase
//         .from("products")
//         .select("*")
//         .eq("id", item.id)
//         .single();

//       if (isMounted) {
//         if (data) {
//           setCartItemData(data);
//           setMaxStock(data.stock);
//         } else {
//           console.error("Error loading product:", error);
//         }
//         setLoading(false);
//       }
//     };

//     fetchItemDetails();

//     return () => {
//       isMounted = false;
//     };
//   }, [item.id]);

//   if (loading || !cartItemData) {
//     return <div className="animate-pulse h-28 bg-gray-100 rounded-lg p-4" />;
//   }

//   const { name, price, discount, brand, main_image } = cartItemData;
//   const finalPrice = price * (1 - discount);
//   const totalPrice = finalPrice * item.quantity;

//   return (
//     <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
//       <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
//         <div className="shrink-0 md:order-1">
//           <img
//             className="h-20 w-20 object-cover rounded"
//             src={main_image || "/placeholder.jpg"}
//             alt={name || "Product"}
//           />
//         </div>

//         <div className="flex items-center justify-between md:order-3 md:justify-end">
//           <div className="flex items-center">
//             <button
//               type="button"
//               onClick={() =>
//                 item.quantity > 1 && updateQuantityFromLocalStorage(item, item.quantity - 1)
//               }
//               className="h-5 w-5 rounded-md border bg-gray-100 hover:bg-gray-200"
//             >
//               <span className="block text-center text-sm font-bold">−</span>
//             </button>
//             <input
//               type="text"
//               readOnly
//               value={item.quantity}
//               className="w-10 text-center text-sm bg-transparent border-0"
//             />
//             <button
//               type="button"
//               onClick={() =>
//                 item.quantity < maxStock && updateQuantityFromLocalStorage(item, item.quantity + 1)
//               }
//               className="h-5 w-5 rounded-md border bg-gray-100 hover:bg-gray-200"
//             >
//               <span className="block text-center text-sm font-bold">+</span>
//             </button>
//           </div>
//           <div className="ml-6 text-end md:w-32">
//             <p className="text-base font-bold text-gray-900">{totalPrice.toFixed(2)}</p>
//           </div>
//         </div>

//         <div className="w-full min-w-0 flex-1 space-y-2 md:order-2 md:max-w-md">
//           <h3 className="text-base font-medium text-gray-900">{name}</h3>
//           <p className="text-sm text-gray-500">{brand}</p>
//           <div className="flex items-center gap-4">
//             <button className="text-sm text-gray-500 hover:underline">Save for later</button>
//             <button
//               onClick={() => deleteItem(item)}
//               className="text-sm text-red-600 hover:underline"
//             >
//               Remove
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartCard;




'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import speaker from '@/assets/images/default.png'
import Navbar from "@/components/Navbar/page"
import Breadcrumb from "@/components/Breadcrumb"
import Specs from "@/components/Specs"
import Reviews from '@/components/Reviews'
import Suggestproducts from '@/components/Suggestproducts'
import { supabase } from '@/lib/supabase'
import { useParams, useRouter } from 'next/navigation'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { addToWishlist, removeFromWishlist, getWishlist } from '@/util/wishlist'

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
    const params = useParams<{ProductID: string}>()
    const [loading, setLoading] = useState(true)
    const [productData, setProductData] = useState<Product>()
    const [isAlert, setIsAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [isWishlisted, setIsWishlisted] = useState(false)
    const [showEmailModal, setShowEmailModal] = useState(false)
    const [email, setEmail] = useState('')

    const handleQuantityChange = (type: 'inc' | 'dec') => {
        setQuantity(prev => {
            if (type === 'dec' && prev > 1) return prev - 1
            if (type === 'inc') return prev + 1
            return prev
        })
    }

    const fetchProductDetails = async() => {
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
        const mockEvent = { stopPropagation: () => {}, preventDefault: () => {} } as React.MouseEvent
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

    useEffect(() => {
        fetchProductDetails()
        checkWishlistStatus()
    }, [params.ProductID])

    if (loading) {
        return (
            <div className="w-full sm:w-11/12 2xl:w-5/6 mx-auto  sm:px-4 py-2 sm:py-4 md:py-8">
                <div className="">
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
                                        {[1,2,3,4,5].map((_, index) => (
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

    return (
        <div className="relative z-20 overflow-hidden pt-4 w-full 2xl:w-5/6 mx-auto px-4 sm:px-0">
            <div className="w-full px-4">
                <Navbar />
                <Breadcrumb />
            </div>
            <div className="p-2 sm:p-4 md:p-8 lg:p-16">
                <div className="2xl:max-w-full max-w-full mx-auto">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{productData?.name}</h1>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4">
                        <div className="flex items-center">
                            <Image src={productData?.main_image || speaker} alt="Brand logo" width={24} height={24} className="rounded-full mr-2" />
                            <span className="text-gray-600 text-sm sm:text-base">{productData?.brand}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-yellow-500 text-lg mr-1">★</span>
                            <span className="text-gray-600 text-sm sm:text-base">{productData?.review_avg}</span>
                            <span className="text-gray-600 ml-1 text-sm sm:text-base">{productData?.reviews} Reviews</span>
                        </div>
                        {productData?.featured_tags && productData.featured_tags.map((e, index) => (
                            <span key={index} className="bg-[#FFD700] text-black text-xs sm:text-sm px-2 py-1 rounded-full">{e}</span>
                        ))}
                    </div>
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-1">
                            <Image 
                                src={productData?.main_image || speaker} 
                                alt="Main product image" 
                                width={600} 
                                height={400} 
                                className="w-full rounded-lg mb-4" 
                            />
                            <div className="grid grid-cols-2 gap-2 sm:gap-4">
                                <Image 
                                    src={productData?.image_2 || speaker} 
                                    alt="Product image 1" 
                                    width={200} 
                                    height={150} 
                                    className="w-full rounded-lg" 
                                />
                                <Image 
                                    src={productData?.image_3 || speaker} 
                                    alt="Product image 2" 
                                    width={200} 
                                    height={150} 
                                    className="w-full rounded-lg" 
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-end space-x-4 mb-4">
                                <button 
                                    onClick={handleWishlistToggle}
                                    className={`${isWishlisted ? 'text-red-500' : 'text-gray-600 hover:text-red-500'} transition-colors`}
                                >
                                    {isWishlisted ? <FaHeart className="h-6 w-6" /> : <FaRegHeart className="h-6 w-6" />}
                                </button>
                                <i className="fab fa-instagram text-[#FFD700] text-xl sm:text-2xl"></i>
                                <i className="fab fa-facebook text-[#FFD700] text-xl sm:text-2xl"></i>
                                <i className="fab fa-x-twitter text-[#FFD700] text-xl sm:text-2xl"></i>
                                <i className="fab fa-whatsapp text-[#FFD700] text-xl sm:text-2xl"></i>
                            </div>
                            <div className="mt-4 mb-4">
                                <h2 className="text-lg sm:text-xl font-semibold mb-2">Overview</h2>
                                <p className="text-sm sm:text-base">{productData?.overview}</p>
                            </div>
                            <div className="mb-4">
                                <h2 className="text-lg sm:text-xl font-semibold mb-2">Product Details</h2>
                                <ul className="space-y-2 list-disc">
                                    {productData?.description.split('.').slice(0, 5).map((feature, index) => (
                                        <li key={index} className="text-sm sm:text-base">
                                            <i className="fas fa-check-circle text-[#FFD700] mr-2"></i>
                                            {feature.trim()}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 mb-4">
                                <span className="text-2xl sm:text-3xl font-bold text-red-600">
                                    LKR {productData?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </span>
                                <div className="flex items-center">
                                    <button 
                                        onClick={() => handleQuantityChange('dec')} 
                                        className="px-3 sm:px-4 py-1 sm:py-2 border border-[#FFD700] rounded-lg"
                                    >
                                        -
                                    </button>
                                    <span className="px-3 sm:px-4 text-sm sm:text-base">{quantity}</span>
                                    <button 
                                        onClick={() => handleQuantityChange('inc')} 
                                        className="px-3 sm:px-4 py-1 sm:py-2 border border-[#FFD700] rounded-lg"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-base sm:text-lg font-semibold">Total Price</span>
                                <span className="text-xl sm:text-2xl font-bold text-red-600">LKR {(productData?.price && productData.price * quantity * (100 - (productData.discount || 0))/100)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                            </div>
                            <button 
                                className="mb-2 w-full mt-4 py-2 bg-[#FFD700] text-black rounded-lg hover:bg-[#F0C800] text-sm sm:text-base" 
                                onClick={addToCart}
                            >
                                Add to Cart
                            </button>
                            {isAlert && (
                                <div className={`w-fit px-4 py-1 bg-gray-50 border border-blue-gray-600 rounded-sm shadow-md text-blue-gray-600 font-semibold -translate-y-20 duration-500 ${isAlert && 'translate-y-0 flex'} text-center`}>
                                    {alertMessage}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='mt-6'>
                        <Specs props={{
                            overview: productData?.overview || '', 
                            description: productData?.description || '', 
                            specs: productData?.specs || {}
                        }}/>
                    </div>
                    <div className='mt-6'>
                        <Reviews props={{
                            reviews: productData?.review_avg || 0, 
                            count: productData?.reviews || 0,  
                            itemName: productData?.name || '', 
                            itemID: productData?.id || 0,
                            comments: productData?.comments?.slice(0,6) || []
                        }}/>
                    </div>
                    <div className='mt-6'>
                        <Suggestproducts category={productData?.category || ''}/>
                    </div>
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
        </div>
    )
}

export default ProductPage