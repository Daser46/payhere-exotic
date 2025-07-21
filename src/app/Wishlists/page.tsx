"use client"
import React, { useState } from 'react'

interface Wishlist {
    id: number
    name: string
    items: {
        id: number
        name: string
        price: number
        image: string
    }[]
}

const WishlistPage = () => {
    const [selectedWishlist, setSelectedWishlist] = useState<Wishlist | null>(null)
    const wishlists: Wishlist[] = [
        {
            id: 1,
            name: 'Birthday Wishlist',
            items: [
                { id: 1, name: 'Gaming Console', price: 499.99, image: '/console.jpg' },
                { id: 2, name: 'Smartphone', price: 799.99, image: '/phone.jpg' },
                { id: 3, name: 'Headphones', price: 199.99, image: '/headphones.jpg' }
            ]
        },
        {
            id: 2,
            name: 'Christmas Wishlist',
            items: [
                { id: 4, name: 'Laptop', price: 1299.99, image: '/laptop.jpg' },
                { id: 5, name: 'Smart Watch', price: 299.99, image: '/watch.jpg' },
                { id: 6, name: 'Tablet', price: 599.99, image: '/tablet.jpg' }
            ]
        },
        {
            id: 3,
            name: 'Holiday Wishlist',
            items: [
                { id: 7, name: 'Camera', price: 699.99, image: '/camera.jpg' },
                { id: 8, name: 'Wireless Earbuds', price: 149.99, image: '/earbuds.jpg' },
                { id: 9, name: 'Speaker', price: 249.99, image: '/speaker.jpg' }
            ]
        },
    ]

    return (
        <div className="container p-4">
            <div className="wishlist-container">
                <h1 className="text-2xl font-bold mb-4">My Wishlists</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlists.map((wishlist: Wishlist) => (
                        <div
                            key={wishlist.id}
                            className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() => setSelectedWishlist(wishlist)}
                        >
                            <h3 className="text-lg font-semibold">{wishlist.name}</h3>
                            <p className="text-gray-600">{wishlist.items.length} products</p>
                        </div>
                    ))}
                </div>
            </div>

            {selectedWishlist && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 relative max-w-md w-full">
                        <button
                            className="absolute top-2 right-2 text-2xl font-bold hover:text-gray-700"
                            onClick={() => setSelectedWishlist(null)}
                        >
                            ×
                        </button>
                        <h2 className="text-xl font-bold mb-4">{selectedWishlist.name}</h2>
                        <div className="space-y-4">
                            {selectedWishlist.items.map((item) => (
                                <div key={item.id} className="flex items-center p-3 bg-gray-100 rounded">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                                    <div>
                                        <h4 className="font-semibold">{item.name}</h4>
                                        <p className="text-gray-600">${item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default WishlistPage