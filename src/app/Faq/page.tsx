"use client"
import Breadcrumb from "@/components/Breadcrumb"
import Navbar from "@/components/Navbar/page"
import React, { useState } from "react"

const Accordion = () => {
    return (
        <section className="relative z-20 overflow-hidden bg-white pt-4">
            <div className=" mx-auto w-11/12 sm:w-5/6 md:w-4/5 lg:w-5/6">
            <Navbar/>

            <Breadcrumb/>
            <div className="pb-8 sm:pb-10 md:pb-12 pt-6 sm:pt-8 md:pt-10"> 
                <div className="-mx-2 sm:-mx-4 flex flex-wrap">
                    <div className="w-full px-2 sm:px-4">
                        <div className="mx-auto mb-8 sm:mb-10 md:mb-[60px] max-w-[520px] text-center lg:mb-20">
                            <span className="mb-2 block text-base sm:text-lg font-semibold text-primary">
                                FAQ
                            </span>
                            <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl font-bold text-black sm:text-[40px]/[48px] ">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-sm sm:text-base text-black">
                                Find answers to common questions about our exotic mobile phones and services
                            </p>
                        </div>
                    </div>
                </div>

                <div className="-mx-2 sm:-mx-4 flex flex-wrap">
                    <div className="w-full px-2 sm:px-4 lg:w-1/2">
                        <AccordionItem
                            header="What makes your mobile phones exotic?"
                            text="Our mobile phones feature unique designs, premium materials like gold and leather, exclusive features, and limited edition releases. Each device is carefully crafted to provide both luxury and exceptional performance."
                        />
                        <AccordionItem
                            header="Do you offer international shipping?"
                            text="Yes, we offer worldwide shipping for all our exotic mobile phones. Shipping costs and delivery times vary by location. All international orders are fully insured and tracked for your peace of mind."
                        />
                        <AccordionItem
                            header="What warranty do you provide?"
                            text="All our exotic mobile phones come with a 2-year international warranty covering manufacturing defects. We also offer premium care packages for extended protection and priority service."
                        />
                    </div>
                    <div className="w-full px-2 sm:px-4 lg:w-1/2">
                        <AccordionItem
                            header="How can I authenticate my exotic phone?"
                            text="Each of our exotic phones comes with a unique authentication certificate, serial number verification, and blockchain-based tracking system to ensure authenticity and prevent counterfeiting."
                        />
                        <AccordionItem
                            header="What payment methods do you accept?"
                            text="We accept all major credit cards, bank transfers, cryptocurrency, and luxury credit services. For high-value purchases, we also offer personalized payment plans and concierge services."
                        />
                        <AccordionItem
                            header="Do you offer after-sales support?"
                            text="Yes, we provide 24/7 premium customer support, dedicated concierge service, and priority repair handling for all our customers. We also offer exclusive membership benefits for our regular clients."
                        />
                    </div>
                </div>
            </div>
            </div>

            <div className="absolute bottom-0 right-0 z-[-1]">
                <svg
                    width="100%"
                    height="auto"
                    viewBox="0 0 1440 886"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full max-w-[1440px]"
                >
                    <path
                        opacity="0.5"
                        d="M193.307 -273.321L1480.87 1014.24L1121.85 1373.26C1121.85 1373.26 731.745 983.231 478.513 729.927C225.976 477.317 -165.714 85.6993 -165.714 85.6993L193.307 -273.321Z"
                        fill="url(#paint0_linear)"
                    />
                    <defs>
                        <linearGradient
                            id="paint0_linear"
                            x1="1308.65"
                            y1="1142.58"
                            x2="602.827"
                            y2="-418.681"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stop-color="#FFD700" stop-opacity="0.36" />
                            <stop offset="1" stop-color="#F5F2FD" stop-opacity="0" />
                            <stop offset="1" stop-color="#F5F2FD" stop-opacity="0.096144" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </section>
    )
}

export default Accordion

const AccordionItem = ({ header, text }: { header: string, text: string }) => {
    const [active, setActive] = useState(false)

    const handleToggle = (event: React.MouseEvent) => {
        event.preventDefault()
        setActive(!active)
    }

    return (
        <div className="mb-4 sm:mb-6 md:mb-8 w-full rounded-lg bg-white p-3 sm:p-4 md:p-6 lg:p-8 shadow-[0px_20px_95px_0px_rgba(201,203,204,0.30)] lg:px-6 xl:px-8">
            <button
                className={`faq-btn flex w-full text-left`}
                onClick={(event) => handleToggle(event)}            >
                <div className="mr-3 sm:mr-5 flex h-8 sm:h-10 w-full max-w-[30px] sm:max-w-[40px] items-center justify-center rounded-lg bg-primary/5 text-primary">
                    <svg
                        className={`fill-primary stroke-primary duration-200 ease-in-out ${active ? "rotate-180" : ""
                            }`}
                        width="17"
                        height="10"
                        viewBox="0 0 17 10"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
                            fill=""
                            stroke=""
                        />
                    </svg>
                </div>

                <div className="w-full">
                    <h4 className="mt-1 text-base sm:text-lg font-semibold text-black">
                        {header}
                    </h4>
                </div>
            </button>

            <div
                className={`pl-[45px] sm:pl-[62px] duration-200 ease-in-out ${active ? "block" : "hidden"
                    }`}
            >
                <p className="py-2 sm:py-3 text-sm sm:text-base leading-relaxed text-black">
                    {text}
                </p>
            </div>
        </div>
    )
}