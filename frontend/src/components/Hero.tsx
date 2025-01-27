'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top 80%', // animation starts when section is 80% in view
        },
      }
    );
  }, []);

  return (
    <section
      ref={heroRef}
      className="h-screen flex flex-col justify-center items-center text-center text-textLight"
    >
      <h1 className="text-5xl md:text-7xl font-bold text-secondary">
        Discover Stunning Color Palettes
      </h1>
      <p className="mt-4 text-lg md:text-xl text-textDark">
        Create and explore amazing color combinations for your next project.
      </p>
      <Link
        href="/palettes"
        className="mt-8 px-8 py-3 text-lg bg-secondary text-background font-bold rounded-lg shadow-lg hover:bg-yellow-400 transition-all duration-300"
      >
        Explore Palettes
      </Link>
    </section>
  );
};

export default Hero;
