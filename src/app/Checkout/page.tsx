"use client";
import { useState, useEffect } from "react";
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar/page';
import Breadcrumb from '@/components/Breadcrumb';
import { error } from "console";
import { enc, MD5 } from 'crypto-js';
import axios from "axios";

import Script from "next/script";

type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    main_image: string;
};

const CheckoutPage = () => {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address1: '',
        district: '',
        zipCode: '',
        city: '',
        country: 'Sri Lanka',
    });

    const [errors, setErrors] = useState<any>({});

    const validateFormData = (formData: any) => {
        const errors: any = {};

        const requiredFields = [
            'firstName', 'lastName', 'email', 'phone',
            'address1', 'district', 'zipCode', 'city', 'country'
        ];

        requiredFields.forEach(field => {
            if (!formData[field] || formData[field].trim() === '') {
                errors[field] = 'This field is required';
            }
        });

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }

        const phoneRegex = /^(\+94|0)[0-9]{9}$/;
        if (formData.phone && !phoneRegex.test(formData.phone)) {
            errors.phone = 'Please enter a valid Sri Lankan phone number';
        }

        const zipRegex = /^[0-9]{5}$/;
        if (formData.zipCode && !zipRegex.test(formData.zipCode)) {
            errors.zipCode = 'Please enter a valid 5-digit zip code';
        }

        setErrors(errors);
        return {
            isValid: Object.keys(errors).length === 0
        };
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedItems = JSON.parse(localStorage.getItem('cart') || "[]");
            fetchCartDetails(storedItems);
        }
    }, []);

    const fetchCartDetails = async (storedItems: { id: string; quantity: number }[]) => {
        const itemsWithDetails: CartItem[] = [];

        for (const item of storedItems) {
            const { data, error } = await supabase
                .from('products')
                .select('name, price, discount, main_image')
                .eq('id', item.id)
                .single();

            if (error) {
                console.error(`Error fetching product ${item.id}:`, error);

                continue;
            }

            if (data) {
                const discountRate = (data.discount || 0) > 1 ? (data.discount || 0) / 100 : (data.discount || 0);
                const calculatedPrice = Math.max(0, data.price * (1 - discountRate));
                itemsWithDetails.push({
                    id: item.id,
                    name: data.name,
                    price: calculatedPrice,
                    quantity: item.quantity,
                    main_image: data.main_image
                });
            }
        }

        setCartItems(itemsWithDetails);
        setLoading(false);
    };

    const calculateTotals = () => {
        const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shipping = subtotal > 5000 ? 0 : 500;
        const total = subtotal + shipping;
        return { subtotal, shipping, total };
    };

    const { subtotal, shipping, total } = calculateTotals();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const createNewOrder = async () => {
        const { data, error } = await supabase.from('orders').insert({
            items: cartItems,
            first_name: formData.firstName,
            last_name: formData.lastName,
            billing_address: formData.address1 + ',' + formData.zipCode + ',' + formData.city + ',' + formData.district + ',' + formData.country,
            email: formData.email,
            mobile: formData.phone,
            total_value: total,
            payment_method: "card"
        }).select('*').single();
        if (error) {
            alert("something went wrong!");
            console.log(error);
            return -1
        } else {
            return data?.id;
        }
    }

    const handleSubmit = async () => {
        if (validateFormData(formData)) {
            const orderId = await createNewOrder();

            if (orderId != -1) {
                console.log(orderId);
                let merchantId = "1231290";
                let secret = 'MTM5MDM1MzcwMDQ1ODY3MzU4NDEyNDA2NTk4NTIyODA2NTUwNjAw'; 
                let hashedSecret = MD5(secret).toString().toUpperCase();

                let amountFormatted = total.toFixed(2);
                let currency = 'LKR';
                let hash = MD5(merchantId + orderId + amountFormatted + currency + hashedSecret).toString().toUpperCase();

                let payment = {
                    sandbox: true,
                    merchant_id: merchantId,
                    return_url: 'https://payhere-exotic.vercel.app/Return',
                    cancel_url: window.location.href,
                    notify_url: 'https://payhere-exotic.vercel.app/api/payhere/notify',
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address1,
                    city: formData.city,
                    country: formData.country,
                    order_id: orderId,
                    items: orderId,
                    currency: "LKR",
                    amount: total,
                    hash: hash
                }
                //kemantha pls go through payhere docs
                console.log(payment);
                // @ts-ignore
                payhere.startPayment(payment)
                // @ts-ignore
                payhere.onCompleted = function onCompleted(orderId) {
                    console.log("Payment completed. OrderID:" + orderId);
                    // Note: validate the payment and show success or failure page to the customer
                };
                // @ts-ignore
                // Payment window closed
                payhere.onDismissed = function onDismissed() {
                    // Note: Prompt user to pay again or show an error page
                    console.log("Payment dismissed");
                };
                // @ts-ignore
                // Error occurred
                payhere.onError = function onError(error) {
                    // Note: show an error page
                    console.log("Error:" + error);
                };
            } else {
                alert("order failed!")
                return
            }
        }

    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B8860B]"></div>
            </div>
        );
    }

    return (
        <>
            <Script
                type="text/javascript"
                src="https://www.payhere.lk/lib/payhere.js"
                strategy="lazyOnload"
                onLoad={() => console.log('PayHere script loaded!')}
            />
            <div className="relative z-20 overflow-hidden bg-gradient-to-b from-white to-gray-50 pt-4 font-inter">
                <div className="w-5/6 mx-auto px-4 mb-10">
                    <Navbar />
                    <Breadcrumb />

                    <section className="bg-white py-8 antialiased md:py-16">
                        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                            <h1 className="text-2xl font-bold text-gray-900 mb-6">Complete Your Purchase</h1>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Left Column - Forms */}
                                <div className="space-y-6">
                                    {/* Contact Information */}
                                    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label htmlFor="firstName" className="block text-gray-700 mb-2">First Name &nbsp;{errors.firstName && <span className="text-xs text-red-500">{errors.firstName}</span>}</label>
                                                <input
                                                    type="text"
                                                    id="firstName"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 border border-gray-300 rounded-md focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B]/50"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="lastName" className="block text-gray-700 mb-2">Last Name &nbsp;{errors.lastName && <span className="text-xs text-red-500">{errors.lastName}</span>}</label>
                                                <input
                                                    type="text"
                                                    id="lastName"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 border border-gray-300 rounded-md focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B]/50"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="email" className="block text-gray-700 mb-2">Email &nbsp;{errors.email && <span className="text-xs text-red-500">{errors.email}</span>}</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full p-3 border border-gray-300 rounded-md focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B]/50"
                                                required
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="phone" className="block text-gray-700 mb-2">Mobile Number &nbsp;{errors.phone && <span className="text-xs text-red-500">{errors.phone}</span>}</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full p-3 border border-gray-300 rounded-md focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B]/50"
                                                required
                                            />
                                        </div>


                                    </div>

                                    {/* Shipping Information */}
                                    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Information</h2>

                                        <div className="mb-4">
                                            <label htmlFor="address1" className="block text-gray-700 mb-2">Address Line 1 &nbsp;{errors.address1 && <span className="text-xs text-red-500">{errors.address1}</span>}</label>
                                            <input
                                                type="text"
                                                id="address1"
                                                name="address1"
                                                value={formData.address1}
                                                onChange={handleInputChange}
                                                className="w-full p-3 border border-gray-300 rounded-md focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B]/50"
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label htmlFor="district" className="block text-gray-700 mb-2">District &nbsp;{errors.district && <span className="text-xs text-red-500">{errors.district}</span>}</label>
                                                <input
                                                    type="text"
                                                    id="district"
                                                    name="district"
                                                    value={formData.district}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 border border-gray-300 rounded-md focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B]/50"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="city" className="block text-gray-700 mb-2">City &nbsp;{errors.city && <span className="text-xs text-red-500">{errors.city}</span>}</label>
                                                <input
                                                    type="text"
                                                    id="city"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 border border-gray-300 rounded-md focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B]/50"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="country" className="block text-gray-700 mb-2">Country &nbsp;{errors.country && <span className="text-xs text-red-500">{errors.country}</span>}</label>
                                                <select
                                                    id="country"
                                                    name="country"
                                                    value={formData.country}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 border border-gray-300 rounded-md focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B]/50"
                                                    required
                                                >
                                                    <option value="Sri Lanka">Sri Lanka</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="zipCode" className="block text-gray-700 mb-2">Postcode/ZIP &nbsp;{errors.zipCode && <span className="text-xs text-red-500">{errors.zipCode}</span>}</label>
                                                <input
                                                    type="text"
                                                    id="zipCode"
                                                    name="zipCode"
                                                    value={formData.zipCode}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 border border-gray-300 rounded-md focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B]/50"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                {/* Right Column - Order Summary */}
                                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

                                    <div className="space-y-4 mb-6">
                                        {cartItems.map((item) => (
                                            <div key={item.id} className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <img
                                                        src={item.main_image}
                                                        alt={item.name}
                                                        className="h-16 w-16 object-cover rounded-md mr-4"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = `https://placehold.co/64x64/E0E0E0/6C757D?text=No+Image`; // Generic placeholder
                                                        }}
                                                    />
                                                    <div>
                                                        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                    </div>
                                                </div>
                                                <p className="text-sm font-medium text-gray-900">LKR {(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t border-gray-200 pt-4 space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Subtotal</span>
                                            <span className="font-medium">LKR {subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Shipping</span>
                                            <span className="font-medium">
                                                {shipping === 0 ? 'Free' : `LKR ${shipping.toFixed(2)}`}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t border-gray-200">
                                            <span>Total</span>
                                            <span className="text-[#B8860B]">LKR {total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <h3 className="text-sm font-medium text-gray-900 mb-2">Payment Security</h3>
                                        <div className="flex items-center space-x-2">
                                            <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                            <span className="text-sm text-gray-500">Secure SSL Encryption</span>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-[#B8860B] mt-4 hover:bg-[#9B7300] text-white font-bold py-3 px-4 rounded-md transition duration-200 disabled:opacity-75"
                                            onClick={handleSubmit}
                                        >
                                            {loading ? 'Processing...' : 'Complete Order'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default CheckoutPage;
