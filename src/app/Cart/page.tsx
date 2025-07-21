"use client";
import Breadcrumb from '@/components/Breadcrumb';
import Navbar from '@/components/Navbar/page';
import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';

type StorageCartItem = {
    id: string;
    quantity: number;
};

const CartCard: React.FC<{
    item: StorageCartItem;
    deleteItem: (item: StorageCartItem) => void;
    updateQuantityFromLocalStorage: (item: StorageCartItem, newQuantity: number) => void;
}> = ({ item, deleteItem, updateQuantityFromLocalStorage }) => {
    const [price, setPrice] = useState(0);
    const [max, setMax] = useState(0);
    const [cartItemData, setCartItemData] = useState<any>(null);

    const fetchItemDetails = async () => {
        let query = supabase.from('products').select(`*`).eq('id', item.id).limit(1);
        const { data, error } = await query.single();
        if (data) {
            setCartItemData(data)
            setPrice(data.price * (100 - data.discount) / 100);
            setMax(data.stock);
        } else {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchItemDetails();
    }, [item.id]);

    return (
        <div key={item.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                <div className="shrink-0 md:order-1">
                    <img
                        className="h-20 w-20"
                        src={cartItemData?.main_image}
                        alt={cartItemData?.name}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder-product.png';
                        }}
                    />
                </div>

                <label htmlFor={`counter-input-${item.id}`} className="sr-only">Choose quantity:</label>
                <div className="flex items-center justify-between md:order-3 md:justify-end">
                    <div className="flex items-center">
                        <button
                            type="button"
                            onClick={() => item.quantity > 1 && updateQuantityFromLocalStorage(item, item.quantity - 1)}
                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                        >
                            <svg className="h-2.5 w-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                            </svg>
                        </button>
                        <input
                            type="text"
                            id={`counter-input-${item.id}`}
                            className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
                            value={item.quantity}
                            readOnly
                        />
                        <button
                            type="button"
                            onClick={() => updateQuantityFromLocalStorage(item, item.quantity + 1)}
                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                        >
                            <svg className="h-2.5 w-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                            </svg>
                        </button>
                    </div>
                    <div className="text-end md:order-4 md:w-32">
                        <p className="text-base font-bold text-gray-900">LKR {(price * item.quantity).toFixed(2)}</p>
                    </div>
                </div>
    
            </div>

            <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                <h3 className="text-base font-medium text-gray-900">{cartItemData?.name}</h3>
                <p className="text-sm text-gray-500">{cartItemData?.brand}</p>
                <div className="flex items-center gap-4">
                    <button type="button" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline">
                        <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                        </svg>
                        Save for later
                    </button>
                    <button
                        type="button"
                        onClick={() => deleteItem(item)}
                        className="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                    >
                        <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                        </svg>
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}

const CartPage = () => {
    const [cartItems, setCartItems] = useState<StorageCartItem[]>([]);
    const [subtotal, setSubtotal] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Only run on client side
        if (typeof window !== 'undefined') {
            const items = JSON.parse(localStorage.getItem('cart') || "[]");
            setCartItems(items);
            setLoading(false);
        }
    }, []);

    const deleteItem = (delItem: StorageCartItem) => {
        const updatedItems = cartItems.filter(item => item.id !== delItem.id);
        setCartItems(updatedItems);
        if (typeof window !== 'undefined') {
            localStorage.setItem("cart", JSON.stringify(updatedItems));
        }
    }

    const updateQuantityFromLocalStorage = (upItem: StorageCartItem, newQuantity: number) => {
        const updatedItems = cartItems.map(item =>
            item.id === upItem.id ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedItems);
        if (typeof window !== 'undefined') {
            localStorage.setItem("cart", JSON.stringify(updatedItems));
        }
    }

    const clearCart = () => {
        setCartItems([]);
        if (typeof window !== 'undefined') {
            localStorage.removeItem("cart");
        }
    }

    const calculateTotal = async () => {
        let total = 0;
        if (cartItems) {
            for (const item of cartItems) {
                let query = supabase
                    .from('products')
                    .select(`*`)
                    .eq('id', item.id)
                    .limit(1);
                const { data, error } = await query.single();
                if (error) {
                    console.error("Error fetching product data:", error);
                    continue;
                }
                if (data) {
                    total += data.price * (100 - (data.discount || 0)) / 100 * item.quantity;
                }
            }
        }
        setSubtotal(total);
    };

    useEffect(() => {
        calculateTotal();
    }, [cartItems]);

    return (
        <div className="relative z-20 overflow-hidden bg-gradient-to-b from-white to-gray-50 pt-4">
            <div className="w-full sm:w-5/6 mx-auto px-4 mb-10">
                <Navbar />
                <Breadcrumb />
                <section className="bg-white py-8 antialiased md:py-16">
                    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 flex-wrap">
                        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Shopping Cart</h2>

                        {cartItems.length === 0 ? (
                            <div className="mt-8 text-center">
                                <h3 className="text-lg font-medium text-gray-900">Your cart is empty</h3>
                                <a
                                    href="/Products"
                                    className="mt-4 inline-flex items-center rounded-lg bg-[#B8860B] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#9B7300] focus:outline-none focus:ring-4 focus:ring-[#D4AF37]"
                                >
                                    Continue Shopping
                                </a>
                            </div>
                        ) : (
                            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                                <div className="mx-auto w-full">
                                    <div className="space-y-6">
                                        {cartItems.map((item) => (
                                            <CartCard
                                                key={item.id}
                                                item={item}
                                                deleteItem={deleteItem}
                                                updateQuantityFromLocalStorage={updateQuantityFromLocalStorage}
                                            />
                                        ))}
                                    </div>
                                    <button className='bg-[#B8860B] text-white font-sans font-bold p-2 rounded shadoow-md my-4' onClick={clearCart}>Clear All</button>
                                </div>

                                <div className="mx-auto mt-6 space-y-6 lg:mt-0 lg:w-1/2">
                                    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                                        <p className="text-xl font-semibold text-gray-900">Order summary</p>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <dl className="flex items-center justify-between gap-4">
                                                    <dt className="text-base font-normal text-gray-500">Subtotal</dt>
                                                    <dd className="text-base font-medium text-gray-900">LKR {subtotal.toFixed(2)}</dd>
                                                </dl>
                                                <dl className="flex items-center justify-between gap-4">
                                                    <dt className="text-base font-normal text-gray-500">Shipping</dt>
                                                    <dd className="text-base font-medium text-gray-900">LKR {0}</dd>
                                                </dl>
                                                <dl className="flex items-center justify-between gap-4">
                                                    <dt className="text-base font-normal text-gray-500">Tax</dt>
                                                    <dd className="text-base font-medium text-gray-900">LKR {0}</dd>
                                                </dl>
                                            </div>

                                            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                                                <dt className="text-base font-bold text-gray-900">Total</dt>
                                                <dd className="text-base font-bold text-gray-900">LKR {subtotal.toFixed(2)}</dd>
                                            </dl>
                                        </div>

                                        <a
                                            href="/Checkout"
                                            className="flex w-full items-center justify-center rounded-lg bg-[#B8860B] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#9B7300] focus:outline-none focus:ring-4 focus:ring-[#D4AF37]"
                                        >
                                            Proceed to Checkout
                                        </a>

                                        <div className="flex items-center justify-center gap-2">
                                            <span className="text-sm font-normal text-gray-500">or</span>
                                            <a
                                                href="/Products"
                                                className="inline-flex items-center gap-2 text-sm font-medium text-[#B8860B] underline hover:no-underline"
                                            >
                                                Continue Shopping
                                                <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CartPage;