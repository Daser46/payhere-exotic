import React from 'react'
import logo from '../../assets/images/Group 1.png'

const page = () => {
    return (
        <footer className="bg-white" aria-labelledby="footer-heading">
            
            <div className="mx-auto max-w-7xl px-8 pb-6 pt-10 sm:pt-16 lg:px-10 lg:pt-20">
                <div className="xl:grid xl:grid-cols-3 xl:gap-10">
                    <div className="space-y-6">
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse ">
                        <img src={logo.src} alt="logo" className="h-14 sm:h-16 md:h-20 lg:h-24 w-auto transition-all duration-300" />
                    </a>
                        <p className="text-base leading-7 text-gray-600">Your premier destination for exotic phones, iPhones, and smart accessories. Experience the extraordinary in mobile technology.</p>
                        <div className="flex space-x-8">
                            <a href="https://www.facebook.com/share/1GVmkPTNAi/?mibextid=wwXIfr" className="text-blue-600 hover:text-blue-700">
                                <span className="sr-only">Facebook</span>
                                <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/exotic.mobiles?igsh=OWZpNjc0Y25sOWtp&utm_source=qr" className="text-pink-600 hover:text-pink-700">
                                <span className="sr-only">Instagram</span>
                                <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="https://wa.me/94777796238" className="text-green-600 hover:text-green-700">
                                <span className="sr-only">WhatsApp</span>
                                <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M19.355 4.645A9.915 9.915 0 0 0 12.018 2C6.488 2 2 6.488 2 12.018c0 1.761.505 3.478 1.461 4.956L2 22l5.146-1.349a9.976 9.976 0 0 0 4.872 1.243h.004c5.53 0 10.018-4.488 10.018-10.018 0-2.678-1.041-5.195-2.932-7.086zm-7.337 15.373h-.003a8.285 8.285 0 0 1-4.223-1.156l-.303-.18-3.141.824.838-3.063-.198-.314a8.287 8.287 0 0 1-1.27-4.405c0-4.597 3.742-8.339 8.34-8.339 2.227 0 4.319.869 5.893 2.443a8.285 8.285 0 0 1 2.443 5.896c0 4.598-3.742 8.34-8.34 8.34zm4.567-6.248c-.251-.126-1.487-.734-1.717-.818-.23-.084-.397-.126-.564.126-.167.251-.647.818-.793.985-.146.167-.293.188-.544.063-.251-.126-1.058-.39-2.015-1.242-.745-.664-1.247-1.484-1.393-1.735-.146-.251-.016-.387.11-.512.112-.112.25-.293.376-.44.125-.146.167-.251.251-.418.084-.167.042-.314-.021-.44-.063-.126-.564-1.36-.773-1.863-.203-.49-.41-.423-.564-.43-.146-.008-.313-.01-.48-.01-.167 0-.438.063-.667.314-.23.251-.876.857-.876 2.09 0 1.234.899 2.427 1.024 2.594.126.167 1.774 2.71 4.299 3.798.6.259 1.068.413 1.433.529.602.191 1.15.164 1.583.099.483-.072 1.487-.608 1.696-1.195.21-.587.21-1.09.147-1.195-.063-.104-.23-.167-.48-.293z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <span className="sr-only">YouTube</span>
                                <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="mt-10 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-base font-semibold leading-7 text-yellow-600">Products</h3>
                                <ul role="list" className="mt-4 space-y-3">
                                    <li>
                                        <a href="#" className="text-base leading-7 text-gray-600 hover:text-yellow-600">iPhones</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-base leading-7 text-gray-600 hover:text-yellow-600">Android Phones</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-base leading-7 text-gray-600 hover:text-yellow-600">Smart Watches</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-base leading-7 text-gray-600 hover:text-yellow-600">Premium Accessories</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-base leading-7 text-gray-600 hover:text-yellow-600">Limited Editions</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-8 md:mt-0">
                                <h3 className="text-base font-semibold leading-7 text-yellow-600">Customer Care</h3>
                                <ul role="list" className="mt-4 space-y-3">
                                    <li>
                                        <a href="#" className="text-base leading-7 text-gray-600 hover:text-yellow-600">Premium Support</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-base leading-7 text-gray-600 hover:text-yellow-600">Product Guide</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-base leading-7 text-gray-600 hover:text-yellow-600">Repair Services</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-base leading-7 text-gray-600 hover:text-yellow-600">24/7 Assistance</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-base font-semibold leading-7 text-yellow-600">About Exotic Mobile</h3>
                                <ul role="list" className="mt-4 space-y-3">
                                    <li>
                                        <a href="#" className="text-base leading-7 text-gray-600 hover:text-yellow-600">Our Story</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-base leading-7 text-gray-600 hover:text-yellow-600">Latest Updates</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-base leading-7 text-gray-600 hover:text-yellow-600">Join Our Team</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-base leading-7 text-gray-600 hover:text-yellow-600">Media Center</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-base leading-7 text-gray-600 hover:text-yellow-600">Partnerships</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-8 md:mt-0">
                                <h3 className="text-base font-semibold leading-7 text-yellow-600">Legal</h3>
                                <ul role="list" className="mt-4 space-y-3">
                                    <li>
                                        <a href="#" className="text-base leading-7 text-gray-600 hover:text-yellow-600">Product Warranty</a>
                                    </li>
                                    <li>
                                        <a href="/Policies" className="text-base leading-7 text-gray-600 hover:text-yellow-600">Terms & Privacy</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-10 border-t border-gray-900/10 pt-6 sm:mt-12">
                    <p className="text-sm leading-6 text-gray-500">©2025 Exotic Mobile. All rights reserved. Your destination for premium mobile technology.</p>
                </div>
            </div>
        </footer>
    )
}

export default page