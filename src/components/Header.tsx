'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '@/lib/cart-context';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    } else {
      router.push('/search');
      setIsSearchOpen(false);
    }
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/my-orders', label: 'My Orders' },
  ];

  const browseLinks = [
    { href: '/box-sets', label: 'All Box Sets' },
    { href: '/action-figures', label: 'Action Figures' },
    { href: '/katanas', label: 'Katanas' },
  ];

  const quickNavLinks = [
    { href: '/#featured', label: 'Featured Titles' },
    { href: '/shop?filter=new', label: 'New Arrivals' },
    { href: '/#box-sets', label: 'Box Sets' },
    { href: '/#action-figures', label: 'Action Figures' },
    { href: '/#katanas', label: 'Katanas' },
    { href: '/#genre', label: 'Genre' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[var(--paper)]/95 backdrop-blur-md shadow-[0_1px_0_var(--mist)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex h-20 items-center justify-between">
            {/* Logo */}
              <Link href="/" className="group relative">
                <Image 
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/e78c6694-74ae-42c9-a973-47ac394e8ba2/IMG_20260203_174240_759-1770147857198.png"
                  alt="Inkai"
                  width={400}
                  height={130}
                  className="h-32 w-auto object-contain"
                  priority
                />
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--ink)] transition-all duration-300 group-hover:w-full" />
              </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm tracking-widest uppercase transition-colors duration-300 ${
                  pathname === link.href
                    ? 'text-[var(--ink)]'
                    : 'text-[var(--stone)] hover:text-[var(--ink)]'
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-[var(--crimson)]"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Search, Cart & Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Search Button / Expanding Input */}
            <div className="relative flex items-center">
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.form
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 220, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    onSubmit={handleSearchSubmit}
                    className="overflow-hidden"
                  >
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="w-full px-3 py-1.5 text-sm border border-[var(--mist)] rounded-lg bg-white focus:outline-none focus:border-[var(--crimson)] transition-colors"
                      onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }
                      }}
                      onBlur={() => {
                        if (!searchQuery) {
                          setTimeout(() => setIsSearchOpen(false), 200);
                        }
                      }}
                    />
                  </motion.form>
                )}
              </AnimatePresence>
              <button
                onClick={() => {
                  if (isSearchOpen) {
                    handleSearchSubmit();
                  } else {
                    setIsSearchOpen(true);
                  }
                }}
                className="p-2 text-[var(--stone)] hover:text-[var(--ink)] transition-colors"
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

              <Link
                href="/cart"
                className="relative group p-2"
                aria-label="Cart"
              >
                <svg
                  className="w-6 h-6"
                  fill="var(--ink)"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0020 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center bg-[var(--crimson)] text-white text-[10px] font-medium rounded-full"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-6 h-px bg-[var(--ink)] origin-center"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-px bg-[var(--ink)]"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-6 h-px bg-[var(--ink)] origin-center"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[var(--paper)] border-t border-[var(--mist)]"
          >
            <div className="px-6 py-8 space-y-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block text-lg tracking-wider ${
                      pathname === link.href
                        ? 'text-[var(--crimson)]'
                        : 'text-[var(--stone)]'
                    }`}
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Browse Pages */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="pt-4 border-t border-[var(--mist)]"
              >
                <p className="text-xs tracking-[0.3em] uppercase text-[var(--stone)] mb-4">Browse</p>
                <div className="space-y-3">
                  {browseLinks.map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (navLinks.length + i) * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block text-sm tracking-wider transition-colors ${
                          pathname === item.href ? 'text-[var(--crimson)]' : 'text-[var(--stone)] hover:text-[var(--ink)]'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Navigation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: (navLinks.length + browseLinks.length) * 0.05 }}
                className="pt-4 border-t border-[var(--mist)]"
              >
                <p className="text-xs tracking-[0.3em] uppercase text-[var(--stone)] mb-4">Quick Navigation</p>
                <div className="space-y-3">
                  {quickNavLinks.map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (navLinks.length + browseLinks.length + i) * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-sm tracking-wider text-[var(--stone)] hover:text-[var(--ink)] transition-colors"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
