"use client"
import React, { useState } from 'react'
import Privacy from '../../components/Privacy/Privacy'
import Terms from '../../components/Privacy/Terms'
import Navbar from '@/components/Navbar/page'
import Breadcrumb from '@/components/Breadcrumb'

const main = () => {
    const [activeTab, setActiveTab] = useState('terms')

    return (
        <div className=" flex flex-col md:flex-row w-full md:w-full mx-auto min-h-screen  ">
            <div className="w-full sm:w-5/6 mx-auto px-4 mb-10">
                <Navbar />
                <Breadcrumb />
            <div className="tabs flex flex-row md:flex-col w-full md:w-48 space-x-2 md:space-x-0 md:space-y-2 mb-4 md:mb-0">
                <button
                    className={`flex-1 md:flex-none text-center md:text-left p-3 md:p-4 rounded-lg transition-all text-sm md:text-base ${activeTab === 'terms' ? 'active bg-gray-200 font-semibold' : 'hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('terms')}
                >
                    Terms
                </button>
                <button
                    className={`flex-1 md:flex-none text-center md:text-left p-3 md:p-4 rounded-lg transition-all text-sm md:text-base ${activeTab === 'privacy' ? 'active bg-gray-200 font-semibold' : 'hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('privacy')}
                >
                    Privacy
                </button>
            </div>
            <div className="flex-1 md:pl-8 border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0">
                {activeTab === 'terms' && <Terms />}
                {activeTab === 'privacy' && <Privacy />}
            </div>
            </div>
        </div>
    )
}
export default main