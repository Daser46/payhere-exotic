import React from 'react';

interface CategoryItem {
    img: string;
    alt: string;
    label: string;
}

interface CategoryCardProps {
    title: string;
    items: CategoryItem[];
    linkText: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, items, linkText }) => {
    return (
        <div className="rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-lg font-bold mb-4 text-black">{title}</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
                {items.map((item, index) => (
                    <div key={index} className="text-center group cursor-pointer">
                        <div className="overflow-hidden rounded-lg mb-2">
                            <img
                                src={item.img}
                                alt={item.alt}
                                className="w-full h-32 object-cover transform hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <p className="text-sm text-black group-hover:text-amber-600 transition-colors duration-200">{item.label}</p>
                    </div>
                ))}
            </div>
            <a href="#" className="text-sm text-amber-600 hover:text-amber-700 font-medium inline-flex items-center">
                {linkText}
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
            </a>
        </div>
    );
};

const Categories: React.FC = () => {
    return (
        <div className="md:p-6 mx-auto w-11/12 max-w-6xl my-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <CategoryCard
                    title="Latest Smart phones & Tablets"
                    items={[
                        { img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80", alt: "iPhone", label: "iPhones" },
                        { img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&q=80", alt: "Android", label: "Android Phones" },
                        { img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80", alt: "iPad", label: "iPads" },
                        { img: "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=500&q=80", alt: "Android Tablet", label: "Android Tablets" }
                    ]}
                    linkText="Shop now"
                />
                <CategoryCard
                    title="Audio & Accessories"
                    items={[
                        { img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80", alt: "Wireless Earbuds", label: "Wireless Earbuds" },
                        { img: "https://images.unsplash.com/photo-1589256469067-ea99122bbdc9?w=500&q=80", alt: "Smart Speakers", label: "Smart Speakers" },
                        { img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80", alt: "Headphones", label: "Headphones" },
                        { img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&q=80", alt: "Sound Bars", label: "Sound Bars" }
                    ]}
                    linkText="Explore more"
                />
                <CategoryCard
                    title="Smart Tech & Gadgets"
                    items={[
                        { img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&q=80", alt: "Smart watch", label: "Smart watches" },
                        { img: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=500&q=80", alt: "Smart Home", label: "Smart Home Devices" },
                        { img: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500&q=80", alt: "Gaming", label: "Gaming Accessories" },
                        { img: "https://images.unsplash.com/photo-1609592111181-4e270db6c8d4?w=500&q=80", alt: "Power Banks", label: "Power Banks" }
                    ]}
                    linkText="View all"
                />
            </div>
        </div>
    );
};

export default Categories;