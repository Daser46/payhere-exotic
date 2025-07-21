// import React from 'react'
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css'
// import { FaStore } from 'react-icons/fa'
// import { Icon } from 'leaflet'

// const FindStores = () => {
//     const stores = [
//         { name: 'Colombo Store', location: [6.9271, 79.8612], address: '123 Main St, Colombo' },
//         { name: 'Kandy Store', location: [7.2906, 80.6337], address: '45 Temple Rd, Kandy' },
//         { name: 'Galle Store', location: [6.0535, 80.2210], address: '78 Fort Road, Galle' },
//     ]

//     const customIcon = new Icon({
//         iconUrl: FaStore,
//         iconSize: [38, 38]
//     })

//     return (
//         <div className="min-h-screen bg-gray-100">
//             <div className="container mx-auto px-4 py-8">
//                 <h1 className="text-3xl font-bold text-gray-800 mb-6">Find Our Stores</h1>
//                 <div className="grid md:grid-cols-2 gap-8">
//                     <div className="bg-white rounded-lg shadow-lg p-6">
//                         <h2 className="text-xl font-semibold mb-4">Store Locations</h2>
//                         <div className="space-y-4">
//                             {stores.map((store, index) => (
//                                 <div key={index} className="border-b pb-4">
//                                     <h3 className="font-medium text-lg">{store.name}</h3>
//                                     <p className="text-gray-600">{store.address}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                     <div className="h-[500px] bg-white rounded-lg shadow-lg overflow-hidden">
//                         <MapContainer
//                             center={[7.8731, 80.7718]}
//                             zoom={7}
//                             style={{ height: '100%', width: '100%' }}
//                         >
//                             <TileLayer
//                                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                                 attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                             />
//                             {stores.map((store, index) => (
//                                 <Marker 
//                                     key={index} 
//                                     position={store.location} 
//                                     icon={customIcon}
//                                 >
//                                     <Popup>
//                                         <div>
//                                             <h3 className="font-medium">{store.name}</h3>
//                                             <p>{store.address}</p>
//                                         </div>
//                                     </Popup>
//                                 </Marker>
//                             ))}
//                         </MapContainer>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default FindStores
"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import speaker from '@/assets/images/Hero/speaker1.png';

const ProductPage = () => {
  const [quantity, setQuantity] = useState(2);
  const [selectedSize, setSelectedSize] = useState('M');

  const handleQuantityChange = (type: 'inc' | 'dec') => {
    setQuantity(prev => {
      if (type === 'dec' && prev > 1) return prev - 1;
      if (type === 'inc') return prev + 1;
      return prev;
    });
  };

  const sizes = ['S', 'M', 'L', 'XL'];

  return (
    <div className="p-4 md:p-8 lg:p-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">White Light polka dots red top</h1>
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            <Image src={speaker} alt="Brand logo" width={24} height={24} className="rounded-full mr-2" />
            <span className="text-gray-600">Pagedone</span>
          </div>
          <div className="flex items-center ml-4">
            <span className="text-yellow-500 text-lg mr-1">★</span>
            <span className="text-gray-600">4.8</span>
            <span className="text-gray-600 ml-1">2.5k Reviews</span>
          </div>
          <span className="ml-4 bg-purple-100 text-purple-700 text-sm px-2 py-1 rounded-full">#01 - Best seller</span>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1">
            <Image src={speaker} alt="Main product image" width={600} height={400} className="w-full rounded-lg mb-4" />
            <div className="grid grid-cols-2 gap-4">
              <Image src={speaker} alt="Product image 1" width={200} height={150} className="w-full rounded-lg" />
              <Image src={speaker} alt="Product image 2" width={200} height={150} className="w-full rounded-lg" />
            </div>
          </div>
          <div className="flex-1 lg:ml-8">
            <div className="flex justify-end space-x-4 mb-4">
              <i className="fab fa-instagram text-gray-600"></i>
              <i className="fab fa-facebook text-gray-600"></i>
              <i className="fab fa-x-twitter text-gray-600"></i>
              <i className="fab fa-whatsapp text-gray-600"></i>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <p className="text-gray-600">Elevate your fashion game with our White Light Polka Dots Red Top, a delightful blend of classic charm and contemporary style. Perfect for a day out or a casual evening, this top effortlessly combines comfort with a touch of whimsy.</p>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Product Details</h2>
              <ul className="text-gray-600 space-y-2">
                <li><i className="fas fa-check-circle text-blue-500 mr-2"></i>Branded shirt</li>
                <li><i className="fas fa-check-circle text-blue-500 mr-2"></i>3 color shirt</li>
                <li><i className="fas fa-check-circle text-blue-500 mr-2"></i>Pure Cotton Shirt with 60% as 40%</li>
                <li><i className="fas fa-check-circle text-blue-500 mr-2"></i>all size is available</li>
              </ul>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Select Size</h2>
              <div className="flex space-x-2 mb-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg ${selectedSize === size ? 'bg-black text-white' : ''}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button className="flex items-center text-gray-600">
                <i className="fas fa-ruler-combined mr-2"></i> Size Guide
              </button>
              <p className="text-gray-600 mt-2">Refer to our size guide for accurate measurements and find the perfect fit for your style.</p>
            </div>
            <div className="flex items-center mb-4">
              <span className="text-3xl font-bold text-purple-700">$220</span>
              <div className="flex items-center ml-4">
                <button onClick={() => handleQuantityChange('dec')} className="px-4 py-2 border rounded-lg">-</button>
                <span className="px-4">{quantity}</span>
                <button onClick={() => handleQuantityChange('inc')} className="px-4 py-2 border rounded-lg">+</button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-600">Total Price</span>
              <span className="text-2xl font-bold text-purple-700">${220 * quantity}</span>
            </div>
            <button className="w-full mt-4 py-2 bg-purple-700 text-white rounded-lg">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
