'use client'
import React, { useState, useEffect } from 'react';

interface Product {
    id: number;
    title: string;
    category: string;
    price: string;
    originalPrice?: string;
    rating: number;
    time?: string;
    date?: string;
    brand?: string;
    isFlashDeal?: boolean;
    isSale?: boolean;
    timer?: {
        days: string;
        hours: string;
        minutes: string;
    };
}

const FlashDealCarousel: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const products: Product[] = [
        {
            id: 1,
            title: 'Computer Science Course Bundle',
            category: 'Education',
            price: '$799.00',
            rating: 5,
            isFlashDeal: true,
            timer: {
                days: '02',
                hours: '48',
                minutes: '30'
            }
        },
        {
            id: 2,
            title: 'Engineering Textbooks Set',
            category: 'Books',
            price: '$299.00',
            originalPrice: '$450.00',
            rating: 5,
            brand: 'Academic Press',
            isSale: true,
            time: '12:23',
            date: 'Until Sep 30'
        },
        {
            id: 3,
            title: 'Premium Study Desk Setup',
            category: 'Furniture',
            price: '$425.00',
            originalPrice: '$600.00',
            rating: 5,
            isSale: true,
            time: 'Limited Time'
        },
        {
            id: 4,
            title: 'Campus Backpack Pro Series',
            category: 'Accessories',
            price: '$89.00',
            rating: 4
        },
        {
            id: 5,
            title: 'Scientific Calculator Bundle',
            category: 'Electronics',
            price: '$125.00',
            rating: 5
        },
        {
            id: 6,
            title: 'College Starter Kit 2023',
            category: 'Student Essentials',
            price: '$199.00',
            originalPrice: '$299.00',
            rating: 4,
            isSale: true
        }
    ];

    const renderRatingStars = (rating: number) => {
        return (
            <div className="flex">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
        );
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max">
                {products.map((product) => (
                    <div key={product.id} className="break-inside-avoid">
                        {product.isFlashDeal ? (
                            <div className="p-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg shadow-lg text-white">
                                <div className="flex justify-between items-start">
                                    <span className="inline-block px-2 py-1 text-xs font-bold bg-white text-purple-600 rounded-full">
                                        STUDENT SPECIAL
                                    </span>
                                    <div className="text-lg font-bold">{product.price}</div>
                                </div>
                                <h2 className="text-lg font-bold mt-2">{product.title}</h2>
                                <div className="flex justify-between text-sm mt-2">
                                    <span>{product.timer?.days}d</span>
                                    <span>{product.timer?.hours}h</span>
                                    <span>{product.timer?.minutes}m</span>
                                </div>
                            </div>
                        ) : product.isSale ? (
                            <div className="p-4 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg shadow-lg text-white">
                                <div className="flex justify-between items-start">
                                    <span className="inline-block px-2 py-1 text-xs font-bold bg-white text-green-600 rounded-full">
                                        STUDENT DISCOUNT
                                    </span>
                                    <div className="text-sm">{product.time}</div>
                                </div>
                                <h3 className="text-lg font-bold mt-2">{product.title}</h3>
                                <div className="flex items-center mt-2">
                                    <div className="font-bold">{product.price}</div>
                                    {product.originalPrice && (
                                        <div className="text-sm line-through ml-2">{product.originalPrice}</div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-lg">
                                <span className="text-sm text-gray-600">{product.category}</span>
                                <h3 className="text-lg font-bold mt-1">{product.title}</h3>
                                <div className="font-bold mt-2">{product.price}</div>
                                {renderRatingStars(product.rating)}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FlashDealCarousel;