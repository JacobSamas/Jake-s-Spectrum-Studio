'use client';

import Link from 'next/link';

const AboutPage = () => {
  return (
    <section className="py-16 bg-background text-textLight">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold text-secondary mb-6">About Jake&apos;s Spectrum Studio</h1>
        <p className="text-lg text-textDark leading-relaxed max-w-3xl mx-auto">
          Jake&apos;s Spectrum Studio is your one-stop solution for generating, exploring, and saving color palettes.
          Whether you&apos;re a designer, developer, or artist, our tool helps you craft the perfect combination of colors
          to bring your ideas to life.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="p-8 bg-primary rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <h2 className="text-3xl font-bold text-textLight mb-4">Our Mission</h2>
            <p className="text-lg text-textDark">
              We aim to provide an intuitive and powerful platform to help creatives find and store color inspiration
              effortlessly.
            </p>
          </div>

          <div className="p-8 bg-primary rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <h2 className="text-3xl font-bold text-textLight mb-4">Why Choose Us?</h2>
            <p className="text-lg text-textDark">
              - Easy-to-use interface with instant results. <br />
              - Save and revisit your favorite palettes anytime. <br />
              - Fully responsive and optimized for all devices.
            </p>
          </div>
        </div>

        {/*<div className="mt-16">
          <h2 className="text-4xl font-bold text-secondary mb-6">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-primary rounded-lg shadow-lg text-center">
              <div className="h-32 w-32 mx-auto bg-gray-600 rounded-full mb-4"></div>
              <h3 className="text-2xl font-bold text-textLight">Jake Doe</h3>
              <p className="text-textDark">Founder & Designer</p>
            </div>

            <div className="p-6 bg-primary rounded-lg shadow-lg text-center">
              <div className="h-32 w-32 mx-auto bg-gray-600 rounded-full mb-4"></div>
              <h3 className="text-2xl font-bold text-textLight">Jane Smith</h3>
              <p className="text-textDark">Lead Developer</p>
            </div>

            <div className="p-6 bg-primary rounded-lg shadow-lg text-center">
              <div className="h-32 w-32 mx-auto bg-gray-600 rounded-full mb-4"></div>
              <h3 className="text-2xl font-bold text-textLight">John Doe</h3>
              <p className="text-textDark">Marketing Specialist</p>
            </div>
          </div>
        </div>*/}

        <div className="mt-16 flex justify-center">
          <Link href="/" className="px-8 py-3 bg-secondary text-background font-bold rounded-lg shadow-lg hover:bg-yellow-400 transition-all duration-300">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
