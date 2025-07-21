"use client"
import Breadcrumb from '@/components/Breadcrumb'
import Navbar from '@/components/Navbar/page'
import React, { useState } from 'react'
import { FaMobileAlt, FaHeadphones, FaLaptop, FaTablet, FaCamera, FaSearch,  } from 'react-icons/fa'
import Link from 'next/link'
import { FaChevronRight } from 'react-icons/fa6'

const Categories = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [hoveredCategory, setHoveredCategory] = useState(null)

    const categories = [
        { 
            id: 'smartphones', 
            name: 'Smartphones', 
            icon: <FaMobileAlt size={24} />, 
            subcategories: [
                { name: 'iPhones', brands: ['iPhone 15 Pro', 'iPhone 15', 'iPhone 14', 'iPhone 13', 'iPhone SE'] },
                { name: 'Android Phones', brands: ['Samsung Galaxy', 'Google Pixel', 'OnePlus', 'Xiaomi', 'Huawei'] },
                { name: 'Phone Accessories', brands: ['Cases', 'Screen Protectors', 'Chargers', 'Power Banks'] }
            ]
        },
        { 
            id: 'laptops', 
            name: 'Laptops', 
            icon: <FaLaptop size={24} />, 
            subcategories: [
                { name: 'Gaming Laptops', brands: ['ROG', 'Alienware', 'Razer', 'MSI', 'Predator'] },
                { name: 'Business Laptops', brands: ['ThinkPad', 'Dell XPS', 'MacBook Pro', 'HP Elite'] },
                { name: 'Student Laptops', brands: ['MacBook Air', 'Surface Laptop', 'Chromebooks'] }
            ]
        },
        { 
            id: 'tablets', 
            name: 'Tablets', 
            icon: <FaTablet size={24} />, 
            subcategories: [
                { name: 'iPads', brands: ['iPad Pro', 'iPad Air', 'iPad mini', 'iPad'] },
                { name: 'Android Tablets', brands: ['Samsung Tab', 'Lenovo Tab', 'Amazon Fire'] },
                { name: 'Accessories', brands: ['Stylus', 'Keyboards', 'Cases', 'Screen Protectors'] }
            ]
        },
        { 
            id: 'audio', 
            name: 'Audio Devices', 
            icon: <FaHeadphones size={24} />, 
            subcategories: [
                { name: 'Headphones', brands: ['Sony', 'Bose', 'Apple AirPods', 'Samsung Buds'] },
                { name: 'Speakers', brands: ['JBL', 'Bose', 'Sonos', 'Marshall'] },
                { name: 'Accessories', brands: ['Cables', 'Cases', 'Stands', 'Adapters'] }
            ]
        },
        { 
            id: 'cameras', 
            name: 'Cameras', 
            icon: <FaCamera size={24} />, 
            subcategories: [
                { name: 'Digital Cameras', brands: ['Canon', 'Nikon', 'Sony', 'Fujifilm'] },
                { name: 'Video Cameras', brands: ['GoPro', 'DJI', 'Sony', 'Panasonic'] },
                { name: 'Accessories', brands: ['Lenses', 'Tripods', 'Memory Cards', 'Bags'] }
            ]
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Navbar />
                <Breadcrumb />
                
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Electronics Categories</h1>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search categories..."
                            className="w-72 pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories
                        .filter(category => 
                            category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            category.subcategories.some(sub => sub.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        )
                        .map((category) => (
                            <div 
                                key={category.id}
                                className="relative group"
                                onMouseEnter={() => setHoveredCategory(category.id as any)}                                
                                onMouseLeave={() => setHoveredCategory(null)}
                            >
                                <Link href={`/products?category=${category.id}`}>
                                    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100">
                                        <div className="flex items-center space-x-4">
                                            <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                                                {category.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h2 className="text-xl font-semibold text-gray-900">{category.name}</h2>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {category.subcategories.length} subcategories
                                                </p>
                                            </div>
                                            <FaChevronRight className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                                        </div>
                                    </div>
                                </Link>
                                
                                {hoveredCategory === category.id && (
                                    <div className="absolute left-full top-0 ml-4 w-64 bg-white rounded-xl shadow-lg z-50 border border-gray-100">
                                        <div className="p-4">
                                            <h3 className="font-semibold text-gray-900 mb-3">Subcategories</h3>
                                            <div className="space-y-2">
                                                {category.subcategories.map((sub) => (
                                                    <Link href={`/products?category=${category.id}&subcategory=${sub.name}`} key={sub.name}>
                                                        <div className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                                            <div className="text-gray-900">{sub.name}</div>
                                                            <div className="text-xs text-gray-500 mt-1">
                                                                {sub.brands.slice(0, 3).join(', ')}...
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Categories