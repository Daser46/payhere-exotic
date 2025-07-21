
import React from 'react';

const Terms: React.FC = () => {
    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
                    Terms and Conditions
                </h1>

                <div className="bg-white   p-6 space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
                        <p className="text-gray-600">
                            By accessing and using Exotic Mobile's website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Product Information</h2>
                        <p className="text-gray-600">
                            We strive to provide accurate product descriptions, pricing, and availability information. However, we reserve the right to correct any errors and modify prices without prior notice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Order and Payment</h2>
                        <p className="text-gray-600">
                            All orders are subject to availability and confirmation of the order price. Payment must be made in full before the delivery of products.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Shipping and Delivery</h2>
                        <p className="text-gray-600">
                            Delivery times are estimates only. We are not responsible for delays beyond our control. Risk of loss and title for items purchased pass to you upon delivery.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Returns and Refunds</h2>
                        <p className="text-gray-600">
                            Products may be returned within 14 days of delivery. Items must be unused and in original packaging. Refunds will be processed within 7 business days of receiving the returned item.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Privacy Policy</h2>
                        <p className="text-gray-600">
                            Your use of our website is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Intellectual Property</h2>
                        <p className="text-gray-600">
                            All content on this website, including text, graphics, logos, and images, is the property of Exotic Mobile and is protected by intellectual property laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Limitation of Liability</h2>
                        <p className="text-gray-600">
                            Exotic Mobile shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.
                        </p>
                    </section>

                    <section className="border-t pt-6">
                        <p className="text-sm text-gray-500">
                            Last updated: {new Date().toLocaleDateString()}
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Terms;
