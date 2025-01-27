import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary text-textLight py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Logo and Description */}
        <div>
          <h2 className="text-3xl font-bold text-secondary mb-4">Jake&apos;s Spectrum Studio</h2>
          <p className="text-textDark">
            The ultimate platform to generate, explore, and save beautiful color palettes
            for all your creative projects.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-2xl font-semibold text-secondary mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/" className="hover:text-secondary transition-all">
                Home
              </Link>
            </li>
            <li>
              <Link href="/generator" className="hover:text-secondary transition-all">
                Generator
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-secondary transition-all">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-secondary transition-all">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-2xl font-semibold text-secondary mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-secondary transition-all">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-secondary transition-all">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-secondary transition-all">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-secondary transition-all">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-textDark text-sm">
        &copy; {new Date().getFullYear()} Jake&apos;s Spectrum Studio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
