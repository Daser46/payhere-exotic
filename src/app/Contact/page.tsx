'use client'
import React, { useState, useEffect, useRef } from 'react'; // Import useEffect and useRef
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar/page';
import Breadcrumb from '@/components/Breadcrumb';
import { Loader } from '@googlemaps/js-api-loader'; // Import the Loader

const ContactPage = () => {
  const goldColor = '#FFD700';
  const mapRef = useRef<HTMLDivElement>(null); // Ref for the map container

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Load and initialize Google Map
  useEffect(() => {
    const loadMap = async () => {
      // Ensure mapRef.current is available
      if (mapRef.current) {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_Maps_API_KEY || '', // Use environment variable for API Key
          version: 'weekly',
          libraries: ['places'] // You might need 'places' if you plan to use place search later
        });

        try {
          const google = await loader.load(); // Load the Google Maps API

          // Define the location for the map (Exotic Mobile's address in Sri Lanka)
          const location = { lat: 6.87978, lng: 79.92348 }; // Approximate coordinates for Madiwela, Kotte

          // Create the map
          const map = new google.maps.Map(mapRef.current, {
            center: location,
            zoom: 16, // Zoom level, adjust as needed
            disableDefaultUI: true, // Optional: disable default UI controls
            // Further map options for styling or behavior can be added here
          });

          // Add a marker for the business location
          new google.maps.Marker({
            position: location,
            map: map,
            title: 'Exotic Mobile', // Tooltip for the marker
            icon: {
              path: google.maps.SymbolPath.CIRCLE, // Use a standard path for simplicity
              scale: 8, // Size of the circle
              fillColor: goldColor, // Match your theme color
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: "#FFFFFF",
            },
          });

        } catch (error) {
          console.error("Error loading Google Maps:", error);
          // Handle map loading error (e.g., display a message to the user)
          if (mapRef.current) {
            mapRef.current.innerHTML = "<p class='text-center text-red-500'>Failed to load map. Please check your API key and network connection.</p>";
          }
        }
      }
    };

    loadMap();
  }, []); // Empty dependency array means this runs once on mount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Add loading state and validation here
      if (!formData.name || !formData.email || !formData.message) {
        alert('Please fill in all required fields');
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);

      // Clear form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });

      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="relative z-20 overflow-hidden bg-gradient-to-b from-white to-gray-50 pt-4">
      <div className="w-full sm:w-5/6 mx-auto px-4 mb-10">
        <Navbar />
        <Breadcrumb />

        <div className="min-h-screen text-gray-800 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h1 className="text-4xl font-bold text-center mb-8" style={{ color: goldColor }}>Contact Exotic Mobile</h1>
              <p className="text-center text-gray-600 mb-12 text-lg">
                We'd love to hear from you! Reach out for exclusive luxury and exotic mobile devices
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white shadow-xl p-8 rounded-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <h2 className="text-2xl font-semibold mb-6" style={{ color: goldColor }}>Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <svg className="w-6 h-6" fill="none" stroke={goldColor} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <h3 className="font-medium text-gray-800">Address</h3>
                      <p className="text-gray-600">No.397, Thalawathugoda Road, Madiwela, Kotte, Sri Lanka</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg className="w-6 h-6" fill="none" stroke={goldColor} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <h3 className="font-medium text-gray-800">Phone</h3>
                      <p className="text-gray-600">077 779 6238</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg className="w-6 h-6" fill="none" stroke={goldColor} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <h3 className="font-medium text-gray-800">Email</h3>
                      <p className="text-gray-600">exoticmobile7@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg className="w-6 h-6" fill="none" stroke={goldColor} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h3 className="font-medium text-gray-800">Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 9AM - 7.30PM</p>
                      <p className="text-gray-600">Saturday: 9.30AM - 8PM</p>
                      <p className="text-gray-600">Sunday: 9.30AM - 6PM</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-center">
                  <div className="flex space-x-8">
                    <a href="https://www.facebook.com/share/1GVmkPTNAi/?mibextid=wwXIfr" className="text-blue-600 hover:text-blue-700">
                      <span className="sr-only">Facebook</span>
                      <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="https://www.instagram.com/exotic.mobiles?igsh=OWZpNjc0Y25sOWtp&utm_source=qr" className="text-pink-600 hover:text-pink-700">
                      <span className="sr-only">Instagram</span>
                      <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="https://wa.me/94777796238" className="text-green-600 hover:text-green-700">
                      <span className="sr-only">WhatsApp</span>
                      <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19.355 4.645A9.915 9.915 0 0 0 12.018 2C6.488 2 2 6.488 2 12.018c0 1.761.505 3.478 1.461 4.956L2 22l5.146-1.349a9.976 9.976 0 0 0 4.872 1.243h.004c5.53 0 10.018-4.488 10.018-10.018 0-2.678-1.041-5.195-2.932-7.086zm-7.337 15.373h-.003a8.285 8.285 0 0 1-4.223-1.156l-.303-.18-3.141.824.838-3.063-.198-.314a8.287 8.287 0 0 1-1.27-4.405c0-4.597 3.742-8.339 8.34-8.339 2.227 0 4.319.869 5.893 2.443a8.285 8.285 0 0 1 2.443 5.896c0 4.598-3.742 8.34-8.34 8.34zm4.567-6.248c-.251-.126-1.487-.734-1.717-.818-.23-.084-.397-.126-.564.126-.167.251-.647.818-.793.985-.146.167-.293.188-.544.063-.251-.126-1.058-.39-2.015-1.242-.745-.664-1.247-1.484-1.393-1.735-.146-.251-.016-.387.11-.512.112-.112.25-.293.376-.44.125-.146.167-.251.251-.418.084-.167.042-.314-.021-.44-.063-.126-.564-1.36-.773-1.863-.203-.49-.41-.423-.564-.43-.146-.008-.313-.01-.48-.01-.167 0-.438.063-.667.314-.23.251-.876.857-.876 2.09 0 1.234.899 2.427 1.024 2.594.126.167 1.774 2.71 4.299 3.798.6.259 1.068.413 1.433.529.602.191 1.15.164 1.583.099.483-.072 1.487-.608 1.696-1.195.21-.587.21-1.09.147-1.195-.063-.104-.23-.167-.48-.293z" clipRule="evenodd" />
                      </svg>
                    </a>
                    
                  </div>
                </div>
              </motion.div>

              <motion.form
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                onSubmit={handleSubmit}
                className="bg-white shadow-xl p-8 rounded-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <h2 className="text-2xl font-semibold mb-6" style={{ color: goldColor }}>Send us a Message</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2 text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition duration-200"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    style={{ backgroundColor: goldColor }}
                    className="w-full text-white font-medium py-3 px-4 rounded-md transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2"
                  >
                    Send Message
                  </button>
                </div>
              </motion.form>

              {/* Google Map Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="md:col-span-2 bg-white shadow-xl p-6 rounded-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <h2 className="text-2xl font-semibold mb-6 text-center" style={{ color: goldColor }}>Our Location</h2>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.0647359457247!2d79.91794236635908!3d6.879569170185482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTInNDYuNCJOIDc5wrA1NScxMi41IkU!5e0!3m2!1sen!2sus!4v1635000000000!5m2!1sen!2sus"
                  className="w-full h-96 rounded-lg overflow-hidden border border-gray-200 shadow-inner"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  aria-label="Google Map showing Exotic Mobile location"
                ></iframe>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;