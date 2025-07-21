import React, { useState } from 'react'

const Specs = ({ props }: { props: { overview: string, description: string, specs: object } }) => {
    const [activeTab, setActiveTab] = useState('overview')

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-6 py-3 font-medium text-sm ${activeTab === 'overview'
                        ? 'border-b-2 border-yellow-600 text-yellow-600'
                        : 'text-gray-500 hover:text-yellow-600'
                        }`}
                >
                    Overview
                </button>
                <button
                    onClick={() => setActiveTab('specs')}
                    className={`px-6 py-3 font-medium text-sm ${activeTab === 'specs'
                        ? 'border-b-2 border-yellow-600 text-yellow-600'
                        : 'text-gray-500 hover:text-yellow-600'
                        }`}
                >
                    Specifications
                </button>
                <button
                    onClick={() => setActiveTab('definition')}
                    className={`px-6 py-3 font-medium text-sm ${activeTab === 'definition'
                        ? 'border-b-2 border-yellow-600 text-yellow-600'
                        : 'text-gray-500 hover:text-yellow-600'
                        }`}
                >
                    Definition
                </button>
            </div>

            <div className="mt-6">
                {activeTab === 'overview' && (
                    <div className="prose max-w-none">
                        <h2 className="text-2xl font-bold text-black mb-4">Product Overview</h2>
                        <ul className="text-gray-700 list-disc pl-5">
                            {/* Changed split method to only split by newline characters */}
                            {props.overview.split('\n').filter(line => line.trim()).map((line, index) => (
                                <li key={index} className="mb-2">{line.trim()}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {activeTab === 'specs' && (
                    <div>
                        <h2 className="text-2xl font-bold text-black mb-4">Product Specifications</h2>
                        <div className="grid gap-4">
                            {Object.keys(props.specs).map((spec, index) => (
                                <div key={index} className="flex items-center bg-gray-50 p-4 rounded-lg">
                                    <span className="font-medium text-black w-1/3">{spec.charAt(0).toUpperCase() + spec.slice(1)}:</span>
                                    <span className="text-gray-700">{props.specs[spec]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'definition' && (
                    <div className="prose max-w-none">
                        <h2 className="text-2xl font-bold text-black mb-4">Product Definition</h2>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <p className="text-sm sm:text-base text-gray-700 whitespace-pre-wrap">
                                {props.description}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Specs