'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const palettes = [
  {
    name: 'Sunset Glow',
    colors: ['#FF5733', '#FFC300', '#DAF7A6', '#581845'],
  },
  {
    name: 'Ocean Breeze',
    colors: ['#1E90FF', '#00CED1', '#4682B4', '#5F9EA0'],
  },
  {
    name: 'Forest Retreat',
    colors: ['#2E8B57', '#3CB371', '#228B22', '#006400'],
  },
];

const ColorPalette = () => {
  const paletteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      paletteRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: paletteRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <section ref={paletteRef} className="py-16 bg-background">
      <h2 className="text-4xl text-center text-secondary font-bold mb-10">
        Explore Our Palettes
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {palettes.map((palette, index) => (
          <div
            key={index}
            className="bg-primary rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
          >
            <div className="p-6">
              <h3 className="text-xl font-bold text-textLight">{palette.name}</h3>
            </div>
            <div className="flex">
              {palette.colors.map((color, idx) => (
                <div
                  key={idx}
                  className="h-20 flex-1"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ColorPalette;
