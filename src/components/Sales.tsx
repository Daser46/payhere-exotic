"use client"
import React, { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { createClient } from '@/lib/supabase'
import Discountcard from "./Cards/Discountcard"

interface Product {
    id: string
    name: string
    main_image: string
    price: number
    originalPrice: number
    discount: number
    rating: number
    reviews: number
    inStock: boolean
}

const Sales = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [visibleCards, setVisibleCards] = useState(3)
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const carouselRef = useRef<HTMLDivElement>(null)
    const cardRef = useRef<HTMLDivElement>(null)

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    useEffect(() => {
        const fetchRandomDiscountedProducts = async () => {
            try {
                setLoading(true)
                // First get all discounted product IDs
                const { data: allDiscounted, error } = await supabase
                    .from('products')
                    .select('id')
                    .gt('discount', 0)

                if (error) throw error
                if (!allDiscounted || allDiscounted.length === 0) return

                // Shuffle and take 10 random products
                const shuffled = [...allDiscounted].sort(() => 0.5 - Math.random())
                const randomIds = shuffled.slice(0, 10).map(p => p.id)

                // Fetch full details of these 10 random discounted products
                const { data: randomProducts } = await supabase
                    .from('products')
                    .select('*')
                    .in('id', randomIds)

                if (randomProducts) setProducts(randomProducts)
            } catch (error) {
                console.error('Error fetching discounted products:', error)
                // Fallback to regular fetch if random fails
                const { data } = await supabase
                    .from('products')
                    .select('*')
                    .gt('discount', 0)
                    .limit(10)
                if (data) setProducts(data)
            } finally {
                setLoading(false)
            }
        }

        fetchRandomDiscountedProducts()
    }, [])

    useEffect(() => {
        const updateVisibleCards = () => {
            if (window.innerWidth < 640) {
                setVisibleCards(1)
            } else if (window.innerWidth < 1024) {
                setVisibleCards(2)
            } else {
                setVisibleCards(3)
            }
        }

        updateVisibleCards()
        window.addEventListener('resize', updateVisibleCards)
        return () => window.removeEventListener('resize', updateVisibleCards)
    }, [])

    // Create infinite loop by duplicating products
    const carouselProducts = [...products, ...products, ...products]

    useEffect(() => {
        if (products.length === 0) return

        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % products.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [products.length])

    const getTransformValue = () => {
        if (products.length === 0 || !cardRef.current) return 'translateX(0px)'

        const cardWidth = cardRef.current.offsetWidth
        const gap = 16 // Tailwind's gap-4 is 16px

        if (visibleCards === 1) {
            // Mobile view: Center the current card
            const containerWidth = carouselRef.current?.offsetWidth || 0
            const offset = (containerWidth - cardWidth) / 2
            return `translateX(${offset - (currentIndex * (cardWidth + gap))}px)`
        } else {
            // Desktop/Tablet view: Standard left-aligned scroll
            return `translateX(-${currentIndex * (cardWidth + gap)}px)`
        }
    }

    const goToNext = () => {
        setCurrentIndex(prev => (prev + 1) % products.length)
    }

    const goToPrev = () => {
        setCurrentIndex(prev => (prev - 1 + products.length) % products.length)
    }

    if (loading) {
        return (
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 py-6 sm:py-10 px-4 sm:px-6 lg:pl-8 relative">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></div>
                </div>
            </div>
        )
    }

    if (products.length === 0) {
        return null
    }

    return (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative rounded-2xl shadow-lg">
            <div className="max-w-full sm:pl-20 mx-auto relative">
                <div className="flex flex-col lg:flex-row justify-between items-center">
                    <div className="w-full lg:w-1/3 px-4 lg:pr-8 mb-4 lg:mb-0 flex justify-center lg:justify-start">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center lg:text-left"
                        >
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
                                Flash Sales!
                            </h2>
                            <p className="text-lg sm:text-xl text-gray-600 mb-8">
                                Grab these incredible deals before they're gone!
                            </p>
                            <Link href="/Products?discounted=true" className="flex justify-center">
                                <motion.button
                                    className="bg-gradient-to-r from-red-600 to-red-700 rounded-full text-white px-8 py-4 text-lg font-bold hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    View All Discounts
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 ml-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </motion.button>
                            </Link>                        </motion.div>
                    </div>

                    <div className="w-full lg:w-2/3 overflow-hidden relative">
                        <div
                            ref={carouselRef}
                            className="flex gap-4 transition-transform duration-500 ease-in-out"
                            style={{ transform: getTransformValue() }}
                        >
                            {carouselProducts.map((product, index) => (
                                <div 
                                    key={`${product.id}-${index}`} 
                                    className="flex-shrink-0"
                                    ref={index === 0 ? cardRef : null}
                                >
                                    <Link href={`/Products/${product.id}`}>
                                        <Discountcard
                                            id={product.id}
                                            image={product.main_image}
                                            title={product.name}
                                            price={product.price}
                                            originalPrice={product.originalPrice}
                                            discount={product.discount}
                                            rating={product.rating}
                                            reviews={product.reviews}
                                            inStock={product.inStock}
                                            onAddToCart={() => {}} // Add your implementation
                                        />
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {products.length > visibleCards && (
                            <>
                                <button
                                    onClick={goToPrev}
                                    className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-70 text-white p-2 rounded-full shadow-lg z-10 hidden sm:block hover:bg-opacity-90 transition-colors"
                                    aria-label="Previous product"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={goToNext}
                                    className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-70 text-white p-2 rounded-full shadow-lg z-10 hidden sm:block hover:bg-opacity-90 transition-colors"
                                    aria-label="Next product"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sales