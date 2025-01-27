'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaSearch, FaPalette, FaDownload } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: 'Browse Palettes',
    description: 'Explore a vast collection of color palettes created by designers.',
    icon: <FaSearch className="text-5xl text-secondary" />,
  },
  {
    title: 'Customize Colors',
    description: 'Fine-tune and adjust colors to fit your project needs perfectly.',
    icon: <FaPalette className="text-5xl text-secondary" />,
  },
  {
    title: 'Download & Use',
    description: 'Export your color palettes in multiple formats for easy use.',
    icon: <FaDownload className="text-5xl text-secondary" />,
  },
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-primary text-textLight">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-secondary mb-10">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-8 bg-background rounded-lg shadow-lg flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105"
            >
              {step.icon}
              <h3 className="text-2xl font-bold mt-4">{step.title}</h3>
              <p className="mt-2 text-textDark">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
