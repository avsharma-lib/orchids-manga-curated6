'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ADMIN_CODES = ['ADMIN AARYAVEER', 'ADMIN SOHAM'];

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for admin codes
    if (ADMIN_CODES.includes(formData.name.trim().toUpperCase())) {
      sessionStorage.setItem('admin-access', formData.name.trim().toUpperCase());
      router.push('/admin');
      return;
    }
    
    // Normal form submission - open email client
    const mailtoLink = `mailto:inkaimangastore@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="bg-[var(--paper)] pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-[var(--stone)] mb-6">
            Get in Touch
          </p>
          <h1
            className="text-5xl md:text-7xl leading-[0.9] tracking-tight text-[var(--ink)] mb-8"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Connect with <span className="italic text-[var(--crimson)]">Inkai</span>
          </h1>
          <p className="text-lg text-[var(--stone)] leading-relaxed mb-16">
            Have questions about our collection, shipping, or need a recommendation? 
            Our curators are here to help you find your next masterpiece.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-12">
              <div>
                <h3 className="text-xs tracking-[0.3em] uppercase text-[var(--ink)] mb-6 font-semibold">
                  Direct Contact
                </h3>
                <div className="space-y-4">
                  <p className="flex items-center gap-4 text-lg text-[var(--stone)] group">
                    <span className="w-12 h-px bg-[var(--mist)] group-hover:w-16 group-hover:bg-[var(--crimson)] transition-all" />
                    <a href="tel:+919109591879" className="hover:text-[var(--ink)] transition-colors">
                      +91 91095 91879
                    </a>
                  </p>
                  <p className="flex items-center gap-4 text-lg text-[var(--stone)] group">
                    <span className="w-12 h-px bg-[var(--mist)] group-hover:w-16 group-hover:bg-[var(--crimson)] transition-all" />
                    <a href="mailto:inkaimangastore@gmail.com" className="hover:text-[var(--ink)] transition-colors">
                      inkaimangastore@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xs tracking-[0.3em] uppercase text-[var(--ink)] mb-6 font-semibold">
                  Office Location
                </h3>
                <p className="flex items-start gap-4 text-lg text-[var(--stone)] group">
                  <span className="w-12 h-px bg-[var(--mist)] mt-3 group-hover:w-16 group-hover:bg-[var(--crimson)] transition-all" />
                  <span>
                    Raipur, Chhattisgarh<br />
                    India
                  </span>
                </p>
              </div>

              <div>
                <h3 className="text-xs tracking-[0.3em] uppercase text-[var(--ink)] mb-6 font-semibold">
                  Business Hours
                </h3>
                <p className="flex items-start gap-4 text-lg text-[var(--stone)] group">
                  <span className="w-12 h-px bg-[var(--mist)] mt-3 group-hover:w-16 group-hover:bg-[var(--crimson)] transition-all" />
                  <span>
                    Monday — Friday<br />
                    10:00 AM — 7:00 PM IST
                  </span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-[var(--paper-warm)] p-8 md:p-12 border border-[var(--mist)]"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs tracking-widest uppercase text-[var(--stone)]">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    required
                    className="w-full px-0 py-3 bg-transparent border-b border-[var(--mist)] focus:border-[var(--ink)] outline-none transition-colors text-[var(--ink)] placeholder:text-[var(--mist)]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs tracking-widest uppercase text-[var(--stone)]">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full px-0 py-3 bg-transparent border-b border-[var(--mist)] focus:border-[var(--ink)] outline-none transition-colors text-[var(--ink)] placeholder:text-[var(--mist)]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs tracking-widest uppercase text-[var(--stone)]">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="How can we help?"
                  className="w-full px-0 py-3 bg-transparent border-b border-[var(--mist)] focus:border-[var(--ink)] outline-none transition-colors text-[var(--ink)] placeholder:text-[var(--mist)]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs tracking-widest uppercase text-[var(--stone)]">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Write your message here..."
                  className="w-full px-0 py-3 bg-transparent border-b border-[var(--mist)] focus:border-[var(--ink)] outline-none transition-colors text-[var(--ink)] placeholder:text-[var(--mist)] resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-[var(--ink)] text-[var(--paper)] text-sm tracking-widest uppercase hover:bg-[var(--charcoal)] transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
