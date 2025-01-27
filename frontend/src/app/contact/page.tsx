'use client';

import { useState } from 'react';
import Link from 'next/link';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch('http://localhost:5002/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setFormData({ name: '', email: '', message: '' });
      setStatus('Message sent successfully!');
    } catch (error) {
      setStatus('Failed to send message. Please try again later.');
    }

    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <section className="py-16 bg-background text-textLight">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold text-secondary mb-6">Contact Us</h1>
        <p className="text-lg text-textDark max-w-3xl mx-auto mb-12">
          Have any questions or suggestions? We&apos;d love to hear from you! Fill out the form below and we'll get back to you soon.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-primary p-8 rounded-2xl shadow-lg">
            <div className="mb-6">
              <label className="block text-textLight text-lg font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-background text-textLight focus:outline-none"
                placeholder="Your Name"
              />
            </div>

            <div className="mb-6">
              <label className="block text-textLight text-lg font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-background text-textLight focus:outline-none"
                placeholder="Your Email"
              />
            </div>

            <div className="mb-6">
              <label className="block text-textLight text-lg font-bold mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full p-3 rounded-lg bg-background text-textLight focus:outline-none"
                placeholder="Your Message"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-secondary text-background py-3 rounded-lg font-bold hover:bg-yellow-400 transition-all duration-300"
            >
              Send Message
            </button>

            {status && <p className="mt-4 text-lg font-semibold">{status}</p>}
          </form>

          {/* Contact Details */}
          <div className="bg-primary p-8 rounded-2xl shadow-lg text-left">
            <h2 className="text-3xl font-bold text-textLight mb-6">Our Contact Details</h2>
            <p className="text-lg text-textDark mb-4">
              <strong>Email:</strong> support@jakespectrum.com
            </p>
            <p className="text-lg text-textDark mb-4">
              <strong>Phone:</strong> +1 (123) 456-7890
            </p>
            <p className="text-lg text-textDark mb-4">
              <strong>Address:</strong> 123 Color Street, Creativity City, CA 90210
            </p>
            <p className="text-lg text-textDark">
              Reach out to us for inquiries, support, or collaborations. We&apos;re always happy to chat!
            </p>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/" className="px-8 py-3 bg-secondary text-background font-bold rounded-lg shadow-lg hover:bg-yellow-400 transition-all duration-300">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
