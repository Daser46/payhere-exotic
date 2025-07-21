"use client"
import React, { useEffect, useState, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

interface Brand {
  id: number;
  name: string;
  logo_url: string;
}

const Brands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [displayBrands, setDisplayBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  const supabase = createClient(supabaseUrl, supabaseKey);

  const BRANDS_TO_DISPLAY = 6; // Number of brands to display

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('brands')
          .select('id, name, logo_url')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        if (data) {
          setBrands(data);
          // Randomly select brands
          const shuffled = [...data].sort(() => 0.5 - Math.random());
          setDisplayBrands(shuffled.slice(0, BRANDS_TO_DISPLAY));
        }
      } catch (error) {
        console.error('Error fetching brands:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    if (!displayBrands.length || !containerRef.current) return;

    let startTime: number | null = null;
    const duration = 40000;
    const scrollWidth = containerRef.current.scrollWidth;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration;
      
      if (containerRef.current) {
        containerRef.current.scrollLeft = progress * scrollWidth;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [displayBrands]);

  if (loading) {
    return (
      <section className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <p className="text-gray-600">Loading brands...</p>
          </div>
        </div>
      </section>
    );
  }

  if (displayBrands.length === 0) {
    return (
      <section className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <p className="text-gray-600">No brands available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-12 text-gray-800">Trusted by Leading Brands</h2>
        <div 
          ref={containerRef}
          className="w-full overflow-x-hidden whitespace-nowrap scroll-smooth"
          onMouseEnter={() => {
            if (animationRef.current) {
              cancelAnimationFrame(animationRef.current);
            }
          }}
          onMouseLeave={() => {
            if (!containerRef.current) return;

            let startTime: number | null = null;
            const duration = 40000;
            const scrollWidth = containerRef.current.scrollWidth;

            const animate = (timestamp: number) => {
              if (!startTime) startTime = timestamp;
              const elapsed = timestamp - startTime;
              const progress = (elapsed % duration) / duration;
              
              if (containerRef.current) {
                containerRef.current.scrollLeft = progress * scrollWidth;
              }
              animationRef.current = requestAnimationFrame(animate);
            };

            animationRef.current = requestAnimationFrame(animate);
          }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8">
            {displayBrands.map((brand) => (
              <div
                key={brand.id}
                className="flex items-center justify-center p-4"
              >
                <img
                  src={brand.logo_url}
                  alt={brand.name}
                  className="h-8 sm:h-10 md:h-12 lg:h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300 hover:grayscale-0"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x75?text=Brand+Logo';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;