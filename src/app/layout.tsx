import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import "./index.css";
import Footer from "@/components/Footer/page";
import Header from "@/components/Header";
import Stickybutton from "@/components/Stickybutton";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
});



export const metadata: Metadata = {
  title: "Exotic Mobiles | Best Mobile Phones in Sri Lanka",
  description: "Discover premium mobile phones and accessories at Exotic Mobiles Sri Lanka. Wide selection of latest smartphones, competitive prices, and excellent customer service.",
  keywords: "mobile phones sri lanka, smartphones, exotic mobiles, phone accessories, mobile shop colombo",
  openGraph: {
    title: "Exotic Mobiles | Best Mobile Phones in Sri Lanka",
    description: "Discover premium mobile phones and accessories at Exotic Mobiles Sri Lanka. Wide selection of latest smartphones, competitive prices, and excellent customer service.",
    type: "website",
    locale: "en_US",
    siteName: "Exotic Mobiles",
  },
  twitter: {
    card: "summary_large_image",
    title: "Exotic Mobiles | Best Mobile Phones in Sri Lanka",
    description: "Discover premium mobile phones and accessories at Exotic Mobiles Sri Lanka. Wide selection of latest smartphones, competitive prices, and excellent customer service.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.className}>
      <body
        className={`${outfit.className}  antialiased`}
      ><Header />
        <Stickybutton/>
        {children}
        <Footer />
      </body>
    </html>
  );
}