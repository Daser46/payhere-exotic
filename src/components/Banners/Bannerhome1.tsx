"use client"
import { Orbitron } from 'next/font/google'
import React, { useState, useEffect } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import Link from 'next/link'

const bungee = Orbitron({
    weight: '400',
    subsets: ['latin'],
})

const Bannerhome1 = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    
    const banners = [
        {
            image: "https://files.catbox.moe/9qostc.png",
            title: "Latest Smartphones",
            description: "Up to 40% off on premium phones"
        },
        {
            image: "https://files.catbox.moe/p8lwvg.png",
            title: "Premium Speakers",
            description: "Best sound quality at best prices"
        },
        {
            image: "https://files.catbox.moe/w8mdga.png",
            title: "Tech Accessories",
            description: "Explore our wide range of gadgets"
        }
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % banners.length)
        }, 6000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="w-full md:w-5/6 mx-auto rounded-2xl h-40 sm:h-52 my-10 sm:my-10 sm:mb-20 relative overflow-x-clip">
            {banners.map((banner, index) => (
                <div
                    key={index}
                    className={`absolute w-full h-full transition-all transform duration-700 ease-in-out ${
                        currentSlide === index 
                            ? 'opacity-100 translate-x-0' 
                            : currentSlide < index 
                                ? 'opacity-0 translate-x-full' 
                                : 'opacity-0 -translate-x-full'
                    }`}
                >
                    <div
                        className="absolute inset-0 blur-sm"
                        style={{
                            backgroundImage: `url(${banner.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            zIndex: 0
                        }}
                    />
                    <div className="absolute inset-0 bg-black/50 sm:bg-black/40" style={{ zIndex: 1 }} />
                    <div className="absolute inset-0 flex flex-col justify-center items-end px-4 sm:px-10" style={{ zIndex: 2 }}>
                        <h2 className={`${bungee.className} text-xl sm:text-4xl font-bold text-white mb-1 sm:mb-2`}>{banner.title} </h2>
                        <p className={`${bungee.className} text-sm sm:text-xl text-white mb-3`}>{banner.description}</p>
                    </div>
                    <img 
                        src={banner.image} 
                        alt={banner.title}
                        className="absolute left-0 -top-10 sm:-top-32 h-[140%] sm:h-[190%] w-48 sm:w-96 overflow-visible drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]"
                        style={{ zIndex: 1, filter: 'drop-shadow(0 0 2px white)' }}
                    />
                </div>
            ))}
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2 overflow-visible" style={{ zIndex: 5 }}>
                {banners.map((_, index) => (
                    <button
                        key={index}
                        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                            currentSlide === index ? 'bg-white' : 'bg-white/40'
                        }`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>
        </div>
    )
}

export default Bannerhome1