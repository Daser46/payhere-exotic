"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

// Define the product interface
interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    main_image: string;
    bgColor: string;
    textColor: string;
}

// Color options that match your design
const colorOptions = [
    { bgColor: 'bg-blue-500', textColor: 'text-blue-500' },
    { bgColor: 'bg-red-500', textColor: 'text-red-500' },
    { bgColor: 'bg-green-500', textColor: 'text-green-500' },
    { bgColor: 'bg-purple-500', textColor: 'text-purple-500' },
    { bgColor: 'bg-yellow-500', textColor: 'text-yellow-500' },
    { bgColor: 'bg-pink-500', textColor: 'text-pink-500' },
    { bgColor: 'bg-indigo-500', textColor: 'text-indigo-500' },
    { bgColor: 'bg-teal-500', textColor: 'text-teal-500' }
];

const BestSales: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('products')
                    .select('id, name, category, price, main_image')
                    .order('created_at', { ascending: false })
                    .limit(8); // Limit to 8 products to match your design
                
                if (error) throw error;
                
                if (data) {
                    // Add color properties to each product
                    const productsWithColors = data.map((product, index) => ({
                        ...product,
                        bgColor: colorOptions[index % colorOptions.length].bgColor,
                        textColor: colorOptions[index % colorOptions.length].textColor
                    }));
                    setProducts(productsWithColors);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
    };

    const truncateName = (name: string) => {
        return name.length > 20 ? name.substring(0, 20) + '...' : name;
    };

    const formatPrice = (price: number) => {
        return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    if (loading) {
        return (
            <div className="container p-4 mx-auto w-full lg:w-5/6 py-16 md:py-20">
                <h1 className='text-3xl md:text-4xl text-center md:text-left mb-8 font-Concert'>Best selling products</h1>
                <div className="flex justify-center items-center h-64">
                    <p>Loading products...</p>
                </div>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="container p-4 mx-auto w-full lg:w-5/6 py-16 md:py-20">
                <h1 className='text-3xl md:text-4xl text-center md:text-left mb-8 font-Concert'>Best selling products</h1>
                <div className="flex justify-center items-center h-64">
                    <p>No products found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container p-4 mx-auto w-full lg:w-5/6 py-16 md:py-20">
            <h1 className='text-3xl md:text-4xl text-center md:text-left mb-8 font-Concert'>Best selling products</h1>

            <div className="block sm:hidden relative">
                <button onClick={prevSlide} className="absolute left-0 top-1/2 z-10 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                        className="flex justify-center"
                    >
                        <Link href={`/Products/${products[currentIndex].id}`}>
                            <div className={`w-full h-[350px] max-w-xs relative overflow-hidden ${products[currentIndex].bgColor} rounded-lg shadow-lg`}>
                                <span className={`absolute top-4 right-4 z-10 bg-white rounded-full ${products[currentIndex].textColor} text-xs font-bold px-3 py-2`}>LKR {formatPrice(products[currentIndex].price)}</span>
                                <svg className="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none"
                                    style={{ transform: 'scale(1.5)', opacity: 0.1 }}>
                                    <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white" />
                                    <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white" />
                                </svg>
                                <div className="relative pt-10 px-10 flex items-center justify-center h-[250px]">
                                    <div className="absolute w-52 h-48 bottom-0 left-0 -mb-24 ml-3"
                                        style={{ background: 'radial-gradient(black, transparent 60%)', transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)', opacity: 0.2 }}>
                                    </div>
                                    <img className="relative w-60 h-auto object-contain" src={products[currentIndex].main_image} alt={products[currentIndex].name} />
                                </div>
                                <div className="relative text-white px-6 pb-6 mt-6">
                                    <span className="opacity-75 -mb-1">{products[currentIndex].category}</span>
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-xl">{truncateName(products[currentIndex].name)}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                </AnimatePresence>
                <button onClick={nextSlide} className="absolute right-0 top-1/2 z-10 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-stretch">
                {products.map((product) => (
                    <Link key={product.id} href={`/Products/${product.id}`}>
                        <div className={`w-full h-[350px] max-w-xs relative overflow-hidden ${product.bgColor} rounded-lg shadow-lg`}>
                            <span className={`absolute top-4 right-4 z-10 bg-white rounded-full ${product.textColor} text-xs font-bold px-3 py-2`}>LKR{formatPrice(product.price)}</span>
                            <svg className="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none"
                                style={{ transform: 'scale(1.5)', opacity: 0.1 }}>
                                <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white" />
                                <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white" />
                            </svg>
                            <div className="relative pt-10 px-10 flex items-center justify-center h-[250px]">
                                <div className="absolute w-52 h-48 bottom-0 left-0 -mb-24 ml-3"
                                    style={{ background: 'radial-gradient(black, transparent 60%)', transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)', opacity: 0.2 }}>
                                </div>
                                <img className="relative w-72 h-auto object-contain" src={product.main_image} alt={product.name} />
                            </div>
                            <div className="relative text-white px-6 pb-6 mt-6">
                                <span className="opacity-75 -mb-1">{product.category}</span>
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-xl">{truncateName(product.name)}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BestSales;