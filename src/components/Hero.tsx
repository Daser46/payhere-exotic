'use client'
import Navbar from "./Navbar/page";
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Concert_One } from 'next/font/google';
import { useState, useEffect, useRef } from 'react';
import Headset1 from '@/assets/images/Hero/speaker1.png';
import Headset2 from '@/assets/images/Hero/speaker2.png';
import Phone1 from '@/assets/images/Hero/phone1.png';
import Phone2 from '@/assets/images/Hero/phone2.png';
import Speaker1 from '@/assets/images/Hero/Speaker.png';
import Speaker2 from '@/assets/images/Hero/gpzpjl.png';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const concertOne = Concert_One({
    weight: '400',
    subsets: ['latin'],
});

const heroData = [
    {
        title: "Welcome to ExoticMobiles",
        description: "Discover premium smartphones and accessories at unbeatable prices. Your destination for the latest mobile technology and exclusive deals.",
        image2: Headset1,
        image1: Headset2,
        animation: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }
    },
    {
        title: "Latest Flagship Phones",
        description: "Experience cutting-edge technology with our selection of flagship smartphones. Premium features at competitive prices.",
        image1: Phone1,
        image2: Phone2,
        animation: { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 } }
    },
    {
        title: "Special Offers",
        description: "Get amazing deals on our exclusive collection. Limited time offers on premium smartphones.",
        image2: Speaker1,
        image1: Speaker2,
        animation: { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 } }
    }
];

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Preload images for all slides
    useEffect(() => {
        heroData.forEach((slide) => {
            if (typeof slide.image1 === 'string') {
                const img1 = document.createElement('img');
                img1.src = slide.image1;
            }
            if (typeof slide.image2 === 'string') {
                const img2 = document.createElement('img');
                img2.src = slide.image2;
            }
        });
    }, []);

    // Slide rotation with cleanup
    useEffect(() => {
        const startTime = Date.now();
        timerRef.current = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime >= 8000) {
                setCurrentSlide((prev) => (prev + 1) % heroData.length);
            }
        }, 10000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    // Preload next slide images
    useEffect(() => {
        const nextSlide = (currentSlide + 1) % heroData.length;
        if (typeof heroData[nextSlide].image1 === 'string') {
            const img1 = document.createElement('img');
            img1.src = heroData[nextSlide].image1;
        }
        if (typeof heroData[nextSlide].image2 === 'string') {
            const img2 = document.createElement('img');
            img2.src = heroData[nextSlide].image2;
        }
    }, [currentSlide]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/Products?search=${encodeURIComponent(searchQuery)}`);
        }
    };
    const handleDotClick = (index: number) => {
        setCurrentSlide(index);
        // Reset timer when manually changing slides
        if (timerRef.current) clearInterval(timerRef.current);
        const startTime = Date.now();
        timerRef.current = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime >= 8000) {
                setCurrentSlide((prev) => (prev + 1) % heroData.length);
            }
        }, 10000);
    };

    return (
        <div className="bg-gradient-to-r from-gold/10 to-transparent overflow-x-hidden overflow-y-clip lg:min-h-screen">
            <div className="w-full px-4 sm:px-8 md:px-16 lg:px-20 py-2 mx-auto">
                <div className="relative w-full min-h-screen lg:h-[90vh]">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="cursor-pointer relative z-40"
                    >
                        <Navbar />
                    </motion.div>
                    <div className="absolute inset-0 z-10 mt-[60px] sm:mt-[70px] md:mt-[80px] lg:mt-0">
                        <div className="relative h-full">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    initial={heroData[currentSlide].animation.initial}
                                    animate={heroData[currentSlide].animation.animate}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="flex flex-col lg:flex-row items-center justify-between h-auto lg:h-[80vh] p-4 sm:p-6 lg:px-16 bg-gradient-to-r from-gold/60 to-transparent rounded-xl shadow-2xl"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3, duration: 0.8 }}
                                        className="text-black z-10 space-y-4 lg:space-y-6 w-full lg:w-1/2 mt-4 sm:mt-8 lg:mt-20 px-2 sm:px-4"
                                    >
                                        <div className="w-full">
                                            <motion.h1
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.5 }}
                                                className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl 3xl:text-8xl font-bold ${concertOne.className} bg-gradient-to-r to-[#FFDF00] from-black bg-clip-text text-transparent mb-2 lg:mb-6 text-center lg:text-left`}
                                            >
                                                {heroData[currentSlide].title}
                                            </motion.h1>
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.7 }}
                                                className="text-base sm:text-lg lg:text-xl text-gray-700 mb-2 text-center lg:text-left"
                                            >
                                                {heroData[currentSlide].description}
                                            </motion.p>
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.9 }}
                                                className="relative flex items-center mb-4 sm:mb-6"
                                            >
                                                <form onSubmit={handleSearch} className="w-full">
                                                    <input
                                                        name="search"
                                                        type="text"
                                                        placeholder="Search for what you want"
                                                        className="w-full px-4 sm:px-4 py-3 sm:py-3 pr-12 rounded-xl border border-gray-300 focus:outline-none focus:border-yellow-500 text-base sm:text-base"
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                    />
                                                </form>
                                            </motion.div>
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 1.1 }}
                                                className="flex justify-center lg:justify-start gap-3 sm:gap-3"
                                            >
                                                <Link href="/Products">
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="bg-black font-bold hover:bg-yellow-600 text-white px-4 sm:px-8 py-2 sm:py-4 rounded-lg shadow-lg flex items-center gap-2 cursor-pointer text-sm sm:text-base"
                                                    >
                                                        Explore Products <FaShoppingCart />
                                                    </motion.button>
                                                </Link>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3, duration: 0.8 }}
                                        className="lg:w-1/2 h-[40vh] sm:h-[45vh] md:h-[55vh] lg:h-[95vh] relative lg:top-20 mt-6 lg:mt-10"
                                    >
                                        <div className="absolute inset-0 left-32 bg-[#FFDF00] md:h-[50vh] lg:h-[80vh] blur-2xl opacity-40 rounded-full"></div>
                                        {typeof heroData[currentSlide].image1 === 'string' ? (
                                            <motion.div
                                                initial={{ x: 100, rotate: 0 }}
                                                animate={{ x: 0, rotate: 12 }}
                                                transition={{ duration: 1 }}
                                                className={`${currentSlide === 0
                                                        ? '2xl:mt-5 h-[95%] w-[95%] sm:h-[85%] sm:w-[85%]'
                                                        : 'h-[105%] w-[105%] sm:h-[95%] sm:w-[95%]'
                                                    } absolute translate-x-4 sm:translate-x-8 md:translate-x-16 lg:translate-x-48`}
                                            >
                                                <Image
                                                    src={heroData[currentSlide].image1 as string}
                                                    alt={heroData[currentSlide].title}
                                                    fill
                                                    className="object-contain"
                                                    priority={currentSlide === 0}
                                                    quality={80}
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                    unoptimized={process.env.NODE_ENV !== 'production'} // Only optimize in production
                                                />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                initial={{ x: 100, rotate: 0 }}
                                                animate={{ x: 0, rotate: 12 }}
                                                transition={{ duration: 1 }}
                                                className={`${currentSlide === 0
                                                        ? '2xl:mt-5 h-[95%] w-[95%] sm:h-[85%] sm:w-[85%]'
                                                        : 'h-[105%] w-[105%] sm:h-[95%] sm:w-[95%]'
                                                    } absolute translate-x-4 sm:translate-x-8 md:translate-x-16 lg:translate-x-48`}
                                            >
                                                <Image
                                                    src={heroData[currentSlide].image1}
                                                    alt={heroData[currentSlide].title}
                                                    fill
                                                    className="object-contain"
                                                    priority={currentSlide === 0}
                                                    quality={80}
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                />
                                            </motion.div>
                                        )}
                                        {typeof heroData[currentSlide].image2 === 'string' ? (
                                            <motion.div
                                                initial={{ scale: 0.8 }}
                                                animate={{ scale: 1 }}
                                                transition={{ duration: 1 }}
                                                className={`${currentSlide === 0
                                                        ? '2xl:mt-5 h-[95%] w-[95%] sm:h-[85%] sm:w-[85%]'
                                                        : 'h-[105%] w-[105%] sm:h-[95%] sm:w-[95%]'
                                                    } relative z-10`}
                                            >
                                                <Image
                                                    src={heroData[currentSlide].image2 as string}
                                                    alt={heroData[currentSlide].title}
                                                    fill
                                                    className="object-contain"
                                                    priority={currentSlide === 0}
                                                    quality={80}
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                    unoptimized={process.env.NODE_ENV !== 'production'}
                                                />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                initial={{ scale: 0.8 }}
                                                animate={{ scale: 1 }}
                                                transition={{ duration: 1 }}
                                                className={`${currentSlide === 0
                                                        ? '2xl:mt-5 h-[95%] w-[95%] sm:h-[85%] sm:w-[85%]'
                                                        : 'h-[105%] w-[105%] sm:h-[95%] sm:w-[95%]'
                                                    } relative z-10`}
                                            >
                                                <Image
                                                    src={heroData[currentSlide].image2}
                                                    alt={heroData[currentSlide].title}
                                                    fill
                                                    className="object-contain"
                                                    priority={currentSlide === 0}
                                                    quality={80}
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                />
                                            </motion.div>
                                        )}
                                    </motion.div>
                                </motion.div>
                            </AnimatePresence>
                            <div className="absolute bottom-4 sm:bottom-8 lg:bottom-28 left-1/2 transform -translate-x-1/2 hidden sm:flex space-x-2">
                                {heroData.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`w-3 h-3 sm:w-3 sm:h-3 rounded-full ${currentSlide === index ? 'bg-yellow-500' : 'bg-gray-300'} cursor-pointer`}
                                        onClick={() => handleDotClick(index)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero;