'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import logo from "../assets/images/Group 1.png"
import { Orbitron } from 'next/font/google'

const orbitron = Orbitron({ subsets: ['latin'] })

export default function Loading() {
    return (
        <div className={`min-h-screen flex items-center justify-center ${orbitron.className}`}>
            <motion.div
                className="flex flex-col items-center p-4 md:p-8 rounded-2xl bg-white/80 relative overflow-hidden w-[90%] max-w-md mx-auto"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1]
                }}
            >
                
                {/* Logo with subtle floating animation */}
                <motion.div
                    animate={{
                        y: [0, -8, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="mb-2 md:mb-2 z-10"
                >
                    <Image
                        src={logo}
                        alt="Company Logo"
                        width={120}
                        height={120}
                        className="object-contain drop-shadow-md w-auto h-auto md:w-[180px] md:h-[180px]"
                        priority
                    />
                </motion.div>

                {/* Loading text */}
                <motion.h2
                    className="text-gray-700 mb-4 text-lg md:text-xl font-semibold z-10 text-center px-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                        opacity: [0.8, 1, 0.8],
                        y: 0
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: 0.3
                    }}
                >
                    Loading your digital wonderland
                </motion.h2>

                {/* Blob animation container */}
                <div className="blob"></div>

                {/* Blob CSS */}
                <style jsx>{`
                    .blob {
                        width: 80px;
                        height: 80px;
                        display: grid;
                        background: #fff;
                        filter: blur(5.6px) contrast(10);
                        padding: 8px;
                        mix-blend-mode: darken;
                    }

                    @media (min-width: 768px) {
                        .blob {
                            width: 112px;
                            height: 112px;
                            padding: 11.2px;
                        }
                    }

                    .blob:before,
                    .blob:after {
                        content: "";
                        grid-area: 1/1;
                        width: 32px;
                        height: 32px;
                        background: #FFD700;
                        animation: blob-anim 2s infinite;
                    }

                    @media (min-width: 768px) {
                        .blob:before,
                        .blob:after {
                            width: 44.8px;
                            height: 44.8px;
                        }
                    }

                    .blob:after {
                        animation-delay: -1s;
                    }

                    @keyframes blob-anim {
                        0% {
                            transform: translate(0, 0);
                        }
                        25% {
                            transform: translate(100%, 0);
                        }
                        50% {
                            transform: translate(100%, 100%);
                        }
                        75% {
                            transform: translate(0, 100%);
                        }
                        100% {
                            transform: translate(0, 0);
                        }
                    }
                `}</style>
            </motion.div>
        </div>
    )
}