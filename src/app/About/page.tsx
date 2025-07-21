"use client"
import Breadcrumb from '@/components/Breadcrumb'
import Navbar from '@/components/Navbar/page'
import React from 'react'
import { FaCheckCircle, FaTruck, FaUsers, FaShoppingBag, FaHistory, FaBullseye } from 'react-icons/fa'

const About = () => {
    return (
        <div className="relative z-20 overflow-hidden bg-gradient-to-b from-white to-gray-50 pt-4">
            <div className="w-full sm:w-5/6 mx-auto px-4 mb-10">
                <Navbar />
                <Breadcrumb />
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-4 text-gray-800 animate-fade-in">About Exotic Mobiles</h1>
                    <div className="w-24 h-1 bg-y  ellow-500 mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <section className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center mb-4">
                            <FaShoppingBag className="w-6 h-6 text-yellow-600 mr-3" />
                            <h2 className="text-2xl font-semibold">What do we sell?</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed">We sells Apple and all Android phones , genuine Apple accessories and all android phone accessories. Also we import JBL speakers , Marshall , & Harman Carden audio products .</p>
                    </section>

                    <section className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center mb-4">
                            <FaBullseye className="w-6 h-6 text-yellow-600 mr-3" />
                            <h2 className="text-2xl font-semibold">Our Vision</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed">To be the leading premium mobile phone retailer in Sri Lanka, offering exclusive and unique devices.</p>
                    </section>
                </div>

                <section className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-16">
                    <div className="flex items-center mb-4">
                        <FaHistory className="w-6 h-6 text-yellow-600 mr-3" />
                        <h2 className="text-2xl font-semibold">History of the Company</h2>
                    </div>
                    <p className="mb-4 text-gray-700 leading-relaxed">Exotic Mobiles was established in 2014. We cater to tech enthusiasts and luxury consumers who demand the most exclusive and high-end mobile devices. Our reputation is built on providing rare, limited edition phones and premium accessories. Our innovative marketing approach and strong social media presence have made us the go-to destination for unique mobile devices and accessories.</p>
                    <p className="text-gray-700 leading-relaxed">Our premium accessory collection includes designer cases, premium screen protectors, high-end Bluetooth devices, luxury chargers, and exclusive limited-edition accessories from top brands.</p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <section className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-semibold mb-4 text-yellow-600">Why Exotic Mobiles!</h2>
                        <p className="text-gray-700 leading-relaxed">We prioritize premium customer experience with exclusive warranty coverage, VIP delivery service, and personalized support. Our website features daily updates on exclusive products and special promotions for our distinguished clientele.</p>
                    </section>

                    <section className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-semibold mb-4 text-yellow-600">Support</h2>
                        <p className="text-gray-700 leading-relaxed">For premium support, contact us at <span className="font-semibold">077 779 6238</span><span className="font-semibold"></span></p>
                    </section>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <FaCheckCircle className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
                        <h3 className="font-semibold text-xl">Premium Quality</h3>
                        <p className="mt-2 text-gray-600">Authentic Luxury Products</p>
                    </div>
                    <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <FaTruck className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
                        <h3 className="font-semibold text-xl">VIP Delivery</h3>
                        <p className="mt-2 text-gray-600">Premium Nationwide Service</p>
                    </div>
                    <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <FaUsers className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
                        <h3 className="font-semibold text-xl">Elite Clientele</h3>
                        <p className="mt-2 text-gray-600">Over 5000 Distinguished Customers</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About