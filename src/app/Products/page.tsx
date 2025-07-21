"use client"
import React, { useState, useEffect, useMemo } from 'react'
import Discountcard from "@/components/Cards/Discountcard"
import Listcard from "@/components/Cards/Listcard"
import { FiSearch, FiSliders, FiStar, FiFilter, FiGrid, FiList, FiX } from 'react-icons/fi'
import Breadcrumb from '@/components/Breadcrumb'
import Navbar from '@/components/Navbar/page'
import speaker from '@/assets/images/Hero/speaker1.png'
import speaker1 from '@/assets/images/Hero/speaker2.png'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { supabase } from '@/lib/supabase'

import Categories from '@/components/Categories'
import Link from 'next/link'

type FilterType = string

const ProductsPage = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [totalProducts, setTotalProducts] = useState(0);

    const [sortBy, setSortBy] = useState('newest')
    const [viewMode, setViewMode] = useState('grid')
    const [loading, setLoading] = useState(false)
    const [isFilterOpen, setIsFilterOpen] = useState(false) // Changed to false by default for mobile
    const [currentPage, setCurrentPage] = useState(1)

    const [products, setProducts] = useState(
        [
            {
                "id": 1,
                "main_image": speaker,
                "name": "Sony WH-1000XM4",
                "price": 349.99,
                "originalPrice": 399.99,
                "discount": 15,
                "rating": 5,
                "reviews": 128,
                "inStock": false,
                "isWishlisted": true,
                "isPremium": true
            },
            {
                "id": 2,
                "main_image": speaker1,
                "name": "Bose QuietComfort 35 II",
                "price": 299.99,
                "originalPrice": 349.99,
                "discount": 10,
                "rating": 4,
                "reviews": 95,
                "inStock": false,
                "isWishlisted": false,
                "isPremium": true
            },
            {
                "id": 3,
                "main_image": speaker,
                "name": "JBL Flip 5",
                "price": 119.99,
                "originalPrice": 139.99,
                "discount": 20,
                "rating": 4,
                "reviews": 75,
                "inStock": true,
                "isWishlisted": true,
                "isPremium": false
            },
            {
                "id": 4,
                "main_image": speaker1,
                "name": "Apple AirPods Pro",
                "price": 249.99,
                "originalPrice": 279.99,
                "discount": 12,
                "rating": 5,
                "reviews": 156,
                "inStock": true,
                "isWishlisted": false,
                "isPremium": true
            },
            {
                "id": 5,
                "main_image": speaker,
                "name": "Samsung Galaxy Buds Pro",
                "price": 199.99,
                "originalPrice": 229.99,
                "discount": 15,
                "rating": 4,
                "reviews": 89,
                "inStock": true,
                "isWishlisted": true,
                "isPremium": false
            },
            {
                "id": 6,
                "main_image": speaker1,
                "title": "Marshall Stanmore II",
                "price": 329.99,
                "originalPrice": 379.99,
                "discount": 18,
                "rating": 4,
                "reviews": 67,
                "inStock": true,
                "isWishlisted": false,
                "isPremium": true
            },
            {
                "id": 7,
                "main_image": speaker,
                "title": "Sennheiser HD 660S",
                "price": 499.99,
                "originalPrice": 549.99,
                "discount": 10,
                "rating": 5,
                "reviews": 42,
                "inStock": true,
                "isWishlisted": true,
                "isPremium": true
            },
            {
                "id": 8,
                "main_image": speaker1,
                "title": "Audio-Technica ATH-M50x",
                "price": 149.99,
                "originalPrice": 169.99,
                "discount": 15,
                "rating": 4,
                "reviews": 112,
                "inStock": true,
                "isWishlisted": false,
                "isPremium": false
            },
            {
                "id": 9,
                "main_image": speaker,
                "name": "Ultimate Ears BOOM 3",
                "price": 149.99,
                "originalPrice": 179.99,
                "discount": 20,
                "rating": 4,
                "reviews": 83,
                "inStock": true,
                "isWishlisted": true,
                "isPremium": false
            }
        ]

    )

    const [filterData, setFilterData] = useState({
        budget: [10, 1000000],
        categories: [] as string[],
        brands: [] as string[],
        ratings: 0,
        search: '',
        discountedOnly: false
    });

    const fetchProducts = async () => {
        let query = supabase.from('products').select('*', { count: 'exact' }).lte('price', filterData.budget[1]).gte('price', filterData.budget[0]).range((currentPage * 12) - 12, currentPage * 12 - 1).gt('stock', 0);

        if (filterData.brands.length > 0) {
            query = query.in('brand', filterData.brands);
        }

        if (filterData.categories.length > 0) {
            query = query.in('category', filterData.categories);
        }

        if (filterData.ratings > 0) {
            query = query.gte('review_avg', filterData.categories);
        }

        if (filterData.search.trim() != '') {
            query = query.ilike('name', `%${filterData.search}%`);
        }

        if (sortBy === 'newest') {
            query = query.order('id', { ascending: false });
        } else if (sortBy === 'price_low') {
            query = query.order('price', { ascending: true });
        } else if (sortBy === 'price_high') {
            query = query.order('price', { ascending: false });
        }

        if (filterData.discountedOnly) {
            query = query.not('discount', 'is', null).gt('discount', 0);
        }

        console.log(query);

        const { data, error, count } = await query;

        if (data) {
            setProducts(data);
            count && setTotalProducts(count);
            console.log(data);
        } else if (error) {
            console.log(error)
        }

        if (filterData.discountedOnly) {
            query = query.not('discount', 'is', null).gt('discount', 0);
        }


        console.log('fetch data');
    }

    const updateFilters = (newData: typeof filterData) => {
        setFilterData(newData);
        updateURL(newData);
    };

    const updateURL = (filters: typeof filterData) => {
        const params = new URLSearchParams(searchParams.toString());

        filters.discountedOnly
            ? params.set('discounted', 'true')
            : params.delete('discounted');

        params.set("minBudget", filters.budget[0].toString());
        params.set("maxBudget", filters.budget[1].toString());

        params.delete('categories');
        filters.categories.forEach(c => params.append('categories', c));

        params.delete('brands');
        filters.brands.forEach(b => params.append('brands', b));

        params.set('ratings', filters.ratings.toString());

        params.set('page', '1');
        params.set('sort', sortBy);

        filters.search ? params.set('search', filters.search) : params.delete('search');

        router.replace(`${pathname}?${params.toString()}`);

        if (filters.discountedOnly) {
            params.set('discounted', 'true');
        } else {
            params.delete('discounted');
        }
    }

    const clearFilters = () => {
        setFilterData(
            {
                budget: [10, 1000000],
                categories: [] as string[],
                brands: [] as string[],
                ratings: 0,
                search: '',
                discountedOnly: false
            }
        );
        setSortBy('featured')
    }

    const handlePageChange = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('page');
        params.set('page', pageNumber.toString());
        setCurrentPage(pageNumber);
        router.replace(`${pathname}?${params.toString()}`);
    }

    const handleSortBy = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('sort');
        params.set('sort', value);
        setSortBy(value)
        router.replace(`${pathname}?${params.toString()}`);
    }

    const filters = [
        "SmartPhone",
        "Headphones",
        "Speaker",
        "Headphones",
        "Smart Watch",
        "Accssosories",
        "Power Bank",
        "Chargers",
    ]

    const brands = [
        "Apple",
        "Samsung",
        "JBL",
        "Anker",
        "Green Lion",
        "Xiaomi",
    ]

    const updateStatesUsingParams = () => {
        const params = new URLSearchParams(searchParams.toString());
        setFilterData(
            {
                budget: [parseInt(params.get('minBudget') || '10'), parseInt(params.get('maxBudget') || '1000000')],
                categories: params.getAll('categories') || [] as string[],
                brands: params.getAll('brands') || [] as string[],
                ratings: parseInt(params.get('ratings') || '0'),
                search: params.get('search') || '',
                discountedOnly: params.get('discounted') === 'true'
            }
        );
        console.log(params.get('search'));
        setFilterData({ ...filterData, search: params.get('search') || '' })
        setSortBy(
            params.get('sort') || 'newest'
        );
        setCurrentPage(
            parseInt(params.get('page') || '1')
        );
    }

    useEffect(
        () => {
            fetchProducts();
        }, [filterData, sortBy, currentPage]
    )

    useEffect(() => {
        updateStatesUsingParams();
    }, [])

    useMemo(() => {
        updateStatesUsingParams();
    }, [])

    const handleAddToCart = (product: any, quantity: number) => {
        // Get current cart from localStorage
        let cart = JSON.parse(localStorage.getItem("cart") || "[]");

        // Check if product already exists in cart
        const existingItemIndex = cart.findIndex((item: any) => item.id === product.id);

        if (existingItemIndex !== -1) {
            // Update quantity if product exists
            cart[existingItemIndex].quantity += quantity;
        } else {
            // Add new product to cart
            cart.push({
                id: product.id,
                name: product.name || product.title,
                price: product.price,
                image: typeof product.main_image === 'string' ? product.main_image : product.main_image.src,
                quantity: quantity
            });
        }

        // Save back to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // You can add a toast notification here if you want
        console.log('Product added to cart:', product);
    }

    return (
        <div className="relative z-20 overflow-hidden pt-4 w-full sm:px-4 2xl:w-5/6 mx-auto">
            <div className=" w-full sm:px-4 ">
                <Navbar />
                <Breadcrumb />
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl md:text-4xl font-bold my-4">Our Products</h1>
                    <div className="hidden md:flex items-center gap-2">
                        <button
                            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 transition-all duration-300 ease-in-out ${currentPage === 1 ? 'text-gray-400' : 'hover:bg-gray-50'}`}
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2">
                            {currentPage}
                        </span>
                        <button
                            onClick={() => handlePageChange(Math.min(currentPage + 1, Math.ceil(totalProducts / 12)))}
                            disabled={currentPage >= Math.ceil(totalProducts / 12)}
                            className='px-4 py-2 transition-all duration-300 ease-in-out disabled:text-gray-400 hover:bg-gray-50'
                        >
                            Next
                        </button>
                    </div>
                </div>                
                
            </div>
            <div className="flex flex-col lg:flex-row gap-6 py-8 relative">
                {/* Mobile Filter Button - Always visible on mobile */}
                <button
                    className="lg:hidden fixed bottom-6 left-4 z-50 bg-black text-white p-4 rounded-full shadow-lg"
                    onClick={() => setIsFilterOpen(true)}
                >
                    <FiFilter size={24} />
                </button>

                {/* Filter Drawer - Mobile */}
                <div className={`
                    fixed inset-0 z-50 bg-white p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out
                    ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:hidden
                `}>
                    <div className="flex items-center justify-between mb-6  top-0 bg-white py-4">
                        <h2 className="text-xl font-bold">Filters</h2>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={clearFilters}
                                className="text-black text-sm hover:underline"
                            >
                                Clear All
                            </button>
                            <button
                                onClick={() => setIsFilterOpen(false)}
                                className="text-2xl"
                            >
                                <FiX />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6 pb-20">
                        <div>
                            <h3 className="font-medium mb-3">Price Range</h3>
                            <label className="text-sm"> {filterData.budget[0].toLocaleString()} LKR - {filterData.budget[1].toLocaleString()} LKR</label>
                            <Slider
                                range
                                className="w-full"
                                min={10}
                                max={1000000}
                                onChange={e => updateFilters({ ...filterData, budget: e as [number, number] })}
                                value={filterData.budget}
                                trackStyle={{ backgroundColor: "#FFD700" }}
                                handleStyle={{ borderColor: "#3E3F5B", backgroundColor: "#3E3F5B" }}
                            />
                        </div>
                        <div>
                            <h3 className="font-medium mb-3">Categories</h3>
                            <div className="space-y-2">
                                {
                                    filters.map((f, index) =>
                                        <label key={index} className="flex items-center hover:text-[#FFD700] cursor-pointer transition-colors">
                                            <input
                                                type="checkbox"
                                                className="mr-2 accent-[#FFD700]"
                                                checked={filterData.categories.includes(f)}
                                                onChange={e => {
                                                    const newList = e.target.checked
                                                        ? [...filterData.categories, f]
                                                        : filterData.categories.filter(item => item !== f);
                                                    updateFilters({ ...filterData, categories: newList });
                                                }
                                                }
                                            />
                                            {f}
                                        </label>
                                    )
                                }
                            </div>
                        </div>

                        <div>
                            <h3 className="font-medium mb-3">Brands</h3>
                            <div className="space-y-2">
                                {
                                    brands.map((b, index) =>
                                        <label key={index} className="flex items-center hover:text-[#FFD700] cursor-pointer transition-colors">
                                            <input
                                                type="checkbox"
                                                className="mr-2 accent-[#FFD700]"
                                                checked={filterData.brands.includes(b)}
                                                onChange={e => {
                                                    const newList = e.target.checked
                                                        ? [...filterData.brands, b]
                                                        : filterData.categories.filter(item => item !== b);
                                                    updateFilters({ ...filterData, brands: newList });
                                                }
                                                }
                                            />
                                            {b}
                                        </label>
                                    )
                                }
                            </div>
                        </div>
                        <div>
                            <h3 className="font-medium mb-3">Discounts</h3>
                            <label className="flex items-center hover:text-[#FFD700] cursor-pointer transition-colors">
                                <input
                                    type="checkbox"
                                    className="mr-2 accent-[#FFD700]"
                                    checked={filterData.discountedOnly}
                                    onChange={e => updateFilters({ ...filterData, discountedOnly: e.target.checked })}
                                />
                                Show only discounted products
                            </label>
                        </div>

                        <div>
                            <h3 className="font-medium mb-3">Rating</h3>
                            <div className="space-y-2">
                                {[5, 4, 3, 2, 1].map((rating) => (
                                    <label key={rating} className="flex items-center hover:text-[#FFD700] cursor-pointer transition-colors">
                                        <input
                                            type="checkbox"
                                            className="mr-2 accent-[#FFD700]"
                                            onChange={() => updateFilters({ ...filterData, ratings: rating })}
                                            checked={filterData.ratings === rating ? true : false}
                                        />
                                        <div className="flex text-[#FFD700] items-center">
                                            {Array(rating).fill(<FiStar className="fill-current" />)}<span className='text-black text-xs'>&nbsp;{rating}&nbsp;stars or above</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Apply Button for Mobile */}
                        {/* <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg border-t">
                            <button
                                onClick={() => setIsFilterOpen(false)}
                                className="w-full bg-black text-white py-3 rounded-lg font-medium"
                            >
                                Apply Filters
                            </button>
                        </div> */}
                    </div>
                </div>

                {/* Desktop Filter Sidebar - Hidden on mobile */}
                <div className="hidden lg:block lg:w-1/4 bg-white p-6 rounded-lg shadow-lg h-fit lg:sticky lg:top-4">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold">Filters</h2>
                        <button
                            onClick={clearFilters}
                            className="text-black text-sm hover:underline"
                        >
                            Clear All
                        </button>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-medium mb-3">Price Range</h3>
                            <label className="text-sm"> {filterData.budget[0].toLocaleString()} LKR - {filterData.budget[1].toLocaleString()} LKR</label>
                            <Slider
                                range
                                className="w-full"
                                min={10}
                                max={1000000}
                                onChange={e => updateFilters({ ...filterData, budget: e as [number, number] })}
                                value={filterData.budget}
                                trackStyle={{ backgroundColor: "#FFD700" }}
                                handleStyle={{ borderColor: "#3E3F5B", backgroundColor: "#3E3F5B" }}
                            />
                        </div>
                        <div>
                            <h3 className="font-medium mb-3">Categories</h3>
                            <div className="space-y-2">
                                {
                                    filters.map((f, index) =>
                                        <label key={index} className="flex items-center hover:text-[#FFD700] cursor-pointer transition-colors">
                                            <input
                                                type="checkbox"
                                                className="mr-2 accent-[#FFD700]"
                                                checked={filterData.categories.includes(f)}
                                                onChange={e => {
                                                    const newList = e.target.checked
                                                        ? [...filterData.categories, f]
                                                        : filterData.categories.filter(item => item !== f);
                                                    updateFilters({ ...filterData, categories: newList });
                                                }
                                                }
                                            />
                                            {f}
                                        </label>
                                    )
                                }
                            </div>
                        </div>

                        <div>
                            <h3 className="font-medium mb-3">Brands</h3>
                            <div className="space-y-2">
                                {
                                    brands.map((b, index) =>
                                        <label key={index} className="flex items-center hover:text-[#FFD700] cursor-pointer transition-colors">
                                            <input
                                                type="checkbox"
                                                className="mr-2 accent-[#FFD700]"
                                                checked={filterData.brands.includes(b)}
                                                onChange={e => {
                                                    const newList = e.target.checked
                                                        ? [...filterData.brands, b]
                                                        : filterData.categories.filter(item => item !== b);
                                                    updateFilters({ ...filterData, brands: newList });
                                                }
                                                }
                                            />
                                            {b}
                                        </label>
                                    )
                                }
                            </div>
                        </div>
                        <div>
                            <h3 className="font-medium mb-3">Discounts</h3>
                            <label className="flex items-center hover:text-[#FFD700] cursor-pointer transition-colors">
                                <input
                                    type="checkbox"
                                    className="mr-2 accent-[#FFD700]"
                                    checked={filterData.discountedOnly}
                                    onChange={e => updateFilters({ ...filterData, discountedOnly: e.target.checked })}
                                />
                                Show only discounted products
                            </label>
                        </div>

                        <div>
                            <h3 className="font-medium mb-3">Rating</h3>
                            <div className="space-y-2">
                                {[5, 4, 3, 2, 1].map((rating) => (
                                    <label key={rating} className="flex items-center hover:text-[#FFD700] cursor-pointer transition-colors">
                                        <input
                                            type="checkbox"
                                            className="mr-2 accent-[#FFD700]"
                                            onChange={() => updateFilters({ ...filterData, ratings: rating })}
                                            checked={filterData.ratings === rating ? true : false}
                                        />
                                        <div className="flex text-[#FFD700] items-center">
                                            {Array(rating).fill(<FiStar className="fill-current" />)}<span className='text-black text-xs'>&nbsp;{rating}&nbsp;stars or above</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Section */}
                <div className={`w-full ${isFilterOpen ? 'lg:w-3/4' : 'lg:w-full'}`}>
                    {/* Search and Sort */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-grow">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                defaultValue={filterData.search}
                                placeholder="Search products..."
                                className="w-full pl-10 p-3 rounded-lg focus:ring-1 focus:ring-[#FFD700] transition-all border"
                                onChange={e => updateFilters({ ...filterData, search: e.target.value })}
                            />
                        </div>
                        <div className="flex gap-2">
                            <select
                                value={sortBy}
                                onChange={(e) => { handleSortBy(e.target.value); }}
                                className="p-3 rounded-lg w-full sm:w-[200px] focus:ring-1 focus:ring-[#FFD700] transition-all border border-gray-300 bg-white shadow-sm hover:border-[#FFD700] cursor-pointer appearance-none"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 0.5rem center',
                                    backgroundSize: '1.5em 1.5em',
                                    paddingRight: '2.5rem'
                                }}
                            >
                                <option value="newest">Newest</option>
                                <option value="price_low">Price: Low to High</option>
                                <option value="price_high">Price: High to Low</option>
                            </select>
                            <div className="flex items-center gap-2 p-2">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#FFD700]' : ''}`}
                                >
                                    <FiGrid />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#FFD700]' : ''}`}
                                >
                                    <FiList />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mb-6">
                        <p className="text-sm sm:text-base text-gray-600">Showing {12 * currentPage - 11}-{currentPage * 12} of {totalProducts} products</p>
                    </div>

                    <div className={`
                        ${viewMode === 'grid'
                            ? `grid grid-cols-1 sm:grid-cols-2 ${isFilterOpen
                                ? 'lg:grid-cols-3'
                                : 'lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3'} gap-4 sm:gap-6 place-items-center`
                            : `grid grid-cols-1 ${!isFilterOpen ? 'lg:grid-cols-2' : ''} gap-4 place-items-center`
                        }
                        `}>
                        {loading ? (
                            <div className="col-span-full flex justify-center items-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#FFD700] border-t-transparent"></div>
                            </div>
                        ) : (
                            <>
                                {viewMode === 'grid' ? (
                                    <>
                                        {products.map((product, index) => (
                                            <Link key={index} href={`/Products/${product.id}`}>
                                                
                                                <Discountcard
                                                    key={product.id}
                                                    image={product.main_image}
                                                    title={product.name || ''}
                                                    price={product.price}
                                                    originalPrice={product.originalPrice}
                                                    discount={product.discount}
                                                    rating={product.rating}
                                                    reviews={product.reviews}
                                                    onAddToCart={handleAddToCart}
                                                    inStock={product.inStock} id={''} />
                                            </Link>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        {products.map((product, index) => (
                                            <Link key={index} href={`/Products/${product.id}`}>
                                                <Listcard
                                                    key={product.id}
                                                    image={product.main_image}
                                                    title={product.name || ''}
                                                    price={product.price}
                                                    originalPrice={product.originalPrice}
                                                    discount={product.discount}
                                                    rating={product.rating}
                                                    reviews={product.reviews}
                                                    inStock={product.inStock}

                                                />
                                            </Link>
                                        ))}
                                    </>
                                )}
                            </>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-wrap justify-center items-center gap-2 mt-8 sm:mt-12">
                        <button
                            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                            disabled={currentPage === 1}
                            className={`px-3 sm:px-4 py-2 transition-all duration-300 ease-in-out text-sm sm:text-base ${currentPage === 1 ? 'text-gray-400' : 'hover:bg-gray-50'
                                }`}
                        >
                            Previous
                        </button>
                        
                        {[...Array(Math.ceil(totalProducts / 12))].map((_, index) => {
                            const pageNumber = index + 1
                            if (
                                pageNumber === 1 ||
                                pageNumber === Math.ceil(totalProducts / 12) ||
                                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                            ) {
                                return (
                                    <button
                                        key={pageNumber}
                                        onClick={() => handlePageChange(pageNumber)}
                                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 text-sm sm:text-base ${
                                            currentPage === pageNumber ? 'bg-[#FFD700] text-black' : 'hover:bg-gray-50'
                                        }`}
                                    >
                                        {pageNumber}
                                    </button>
                                )
                            } else if (
                                pageNumber === currentPage - 2 ||
                                pageNumber === currentPage + 2
                            ) {
                                return <span key={pageNumber} className="transition-opacity duration-300 ease-in-out">...</span>
                            }
                            return null
                        })}

                        <button
                            onClick={() => handlePageChange(Math.min(currentPage + 1, Math.ceil(totalProducts / 12)))}
                            disabled={currentPage >= Math.ceil(totalProducts / 12)}
                            className='px-3 sm:px-4 py-2 transition-all duration-300 ease-in-out text-sm sm:text-base disabled:text-gray-400 hover:bg-gray-50'
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsPage