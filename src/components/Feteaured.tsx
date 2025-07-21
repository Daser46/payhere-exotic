"use client"
import React, { useEffect, useState, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { createClient } from '@supabase/supabase-js'
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

const Projects = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [visibleCards, setVisibleCards] = useState(1)
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [isPaused, setIsPaused] = useState(false)
    const carouselRef = useRef<HTMLDivElement>(null)

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    useEffect(() => {
        const fetchRandomProducts = async () => {
            try {
                setLoading(true)
                // First get all product IDs to ensure randomness
                const { data: allProducts, error: countError } = await supabase
                    .from('products')
                    .select('id')

                if (countError) throw countError
                if (!allProducts || allProducts.length === 0) return

                // Shuffle the array and take first 10
                const shuffled = [...allProducts].sort(() => 0.5 - Math.random())
                const randomIds = shuffled.slice(0, 10).map(p => p.id)

                // Fetch full details of random products
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .in('id', randomIds)

                if (error) throw error
                if (data) setProducts(data)
            } catch (error) {
                console.error('Error fetching random products:', error)
                // Fallback to regular fetch if random fails
                const { data } = await supabase
                    .from('products')
                    .select('*')
                    .limit(10)
                if (data) setProducts(data)
            } finally {
                setLoading(false)
            }
        }

        fetchRandomProducts()
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

    // Create infinite loop effect by duplicating products
    const carouselProducts = [...products, ...products, ...products]

    useEffect(() => {
        if (products.length === 0 || isPaused) return

        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % products.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [products.length, isPaused])

    const getCardTranslateX = useCallback(() => {
        if (carouselRef.current && carouselRef.current.children.length > 0) {
            const firstCard = carouselRef.current.children[0] as HTMLElement
            const cardWidth = firstCard.offsetWidth
            const gap = 8 // Tailwind's gap-2 is 8px
            return `translateX(-${currentIndex * (cardWidth + gap)}px)`
        }
        return `translateX(0px)`
    }, [currentIndex])

    const goToNext = () => {
        setIsPaused(true)
        setCurrentIndex(prev => (prev + 1) % products.length)
    }

    const goToPrev = () => {
        setIsPaused(true)
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

    return (
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 py-6 sm:py-10 px-4 sm:px-6 lg:pl-8 relative rounded-3xl">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col lg:flex-row justify-between items-center">
                    <div className="w-full lg:w-1/3 px-4 lg:pr-8 lg:ml-16 py-8 lg:py-10">
                        <motion.h2
                            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4 text-center lg:text-left"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            Featured Products
                        </motion.h2>
                        <p className="text-lg sm:text-xl text-gray-800 mb-6 text-center lg:text-left">
                            Discover our curated selection
                        </p>
                        <div className="flex justify-center lg:justify-start">
                            <Link href="/Products">
                                <motion.button
                                    className="bg-black rounded-3xl text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold hover:bg-gray-900 transition-colors duration-300 flex items-center"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    View All Products
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 sm:h-6 sm:w-6 ml-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </motion.button>
                            </Link>
                        </div>
                    </div>

                    <div className="w-full lg:w-2/3 overflow-hidden p-4  lg:py-10 relative">
                        {products.length > 0 ? (
                            <>
                                <div
                                    ref={carouselRef}
                                    className="flex gap-2 transition-transform duration-500 ease-in-out"
                                    style={{ transform: getCardTranslateX() }}
                                    onMouseEnter={() => setIsPaused(true)}
                                    onMouseLeave={() => setIsPaused(false)}
                                >
                                    {carouselProducts.map((product, index) => (
                                        <div key={`${product.id}-${index}`} className="flex-shrink-0">
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
                            </>
                        ) : (
                            <div className="flex justify-center items-center h-64">
                                <p className="text-lg text-gray-600">No products available</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Projects