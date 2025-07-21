"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Discountcard from "@/components/Cards/Discountcard"
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import speaker from '@/assets/images/default.png';
import Link from 'next/link';

type Product = {
    id: number,
    name: string,
    category: string,
    created_at: any,
    description: string,
    discount?: number,
    featured?: boolean,
    featured_tags?: string[],
    image_2?: string,
    image_3?: string,
    main_image?: string,
    overview?: string,
    price?: number,
    review_avg?: number,
    reviews?: number,
    specs?: Object,
    stock: number,
    brand?: string
}

const Suggestproducts = ({ category }: { category: string }) => {
    const [similarProducts, setSimilarProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const params = useParams<{ ProductID: string }>();

    const fetchSimilarProducts = async () => {
        try {
            if (category) {
                const { data: products } = await supabase
                    .from('products')
                    .select('*')
                    .eq('category', category)
                    .neq('id', params.ProductID)
                    .limit(3);

                if (products && products.length > 0) {
                    setSimilarProducts(products);
                } else {
                    const { data: featuredProducts } = await supabase
                        .from('products')
                        .select('*')
                        .eq('featured', true)
                        .neq('id', params.ProductID)
                        .limit(3);
                    if (featuredProducts) {
                        setSimilarProducts(featuredProducts);
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching similar products:', error);
        } finally {
            setLoading(false);
            console.log(similarProducts)
        }
    };

    useEffect(() => {
        fetchSimilarProducts();
    }, [params.ProductID]);

    if (loading) {
        return (
            <div className="my-8">
                <h2 className="text-2xl font-bold mb-6">You might also like</h2>
                <div className="flex flex-wrap justify-center gap-4">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                            <div className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="my-8">
            <h2 className="text-2xl font-bold mb-6" onClick={() => console.log(similarProducts)}>You might also like</h2>
            <div className="flex flex-wrap justify-center gap-10">
                {!loading && similarProducts.map((product, index) => (
                    <Link href={`/Products/${product.id}`}>
                        <Discountcard
                            key={index}
                            image={product.main_image}
                            title={product.name || ''}
                            price={product.price}
                            originalPrice={product.originalPrice}
                            discount={product.discount}
                            rating={product.rating}
                            reviews={product.reviews}
                            inStock={product.inStock} id={''} />
                    </Link>
                ))}

            </div>
        </div>
    );
};

export default Suggestproducts;