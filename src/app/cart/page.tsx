'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/manga-data';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="bg-[var(--paper)] pt-20 min-h-screen">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1
              className="text-4xl md:text-5xl text-[var(--ink)] mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Your Cart is Empty
            </h1>
            <p className="text-[var(--stone)] mb-8">
              Discover our curated collection and add some manga to your cart.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-4 bg-[var(--ink)] text-[var(--paper)] text-sm tracking-widest uppercase hover:bg-[var(--charcoal)] transition-colors duration-300"
            >
              Browse Collection
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--paper)] pt-20 min-h-screen">
      {/* Header */}
      <section className="py-16 border-b border-[var(--mist)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-[var(--crimson)] mb-3">
              Shopping Cart
            </p>
            <h1
              className="text-4xl md:text-5xl text-[var(--ink)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Your Selection
            </h1>
            <p className="mt-4 text-[var(--stone)]">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-8">
              {items.map((item, index) => (
                <motion.div
                  key={item.manga.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-6 pb-8 border-b border-[var(--mist)]"
                >
                  {/* Image */}
                  <Link href={`/manga/${item.manga.id}`} className="shrink-0">
                    <div className="relative w-24 h-36 md:w-32 md:h-48 bg-[var(--mist)] overflow-hidden">
                      <Image
                        src={item.manga.image}
                        alt={item.manga.title}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex-1">
                      <Link
                        href={`/manga/${item.manga.id}`}
                        className="text-lg text-[var(--ink)] hover:text-[var(--crimson)] transition-colors"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {item.manga.title}
                      </Link>
                      <p className="text-sm text-[var(--stone)] mt-1">
                        {item.manga.author}
                      </p>
                      <p className="text-sm text-[var(--stone)] mt-2">
                        {item.manga.genre.slice(0, 2).join(', ')}
                      </p>
                    </div>

                    {/* Price & Quantity */}
                    <div className="flex items-end justify-between mt-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-[var(--mist)]">
                          <button
                            onClick={() => updateQuantity(item.manga.id, item.quantity - 1)}
                            className="w-10 h-10 flex items-center justify-center text-[var(--stone)] hover:text-[var(--ink)] transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-12 text-center text-sm text-[var(--ink)]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.manga.id, item.quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center text-[var(--stone)] hover:text-[var(--ink)] transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.manga.id)}
                          className="text-sm text-[var(--stone)] hover:text-[var(--crimson)] transition-colors"
                        >
                          Remove
                        </button>
                      </div>

                      <span className="text-lg font-medium text-[var(--ink)]">
                        {formatPrice(item.manga.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="sticky top-32 bg-[var(--paper-warm)] p-8"
              >
                <h2
                  className="text-2xl text-[var(--ink)] mb-6"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Order Summary
                </h2>

                <div className="space-y-4 pb-6 border-b border-[var(--mist)]">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--stone)]">Subtotal</span>
                    <span className="text-[var(--ink)]">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--stone)]">Shipping</span>
                    <span className="text-[var(--ink)]">
                      {totalPrice >= 2000 ? 'Free' : formatPrice(150)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between py-6 border-b border-[var(--mist)]">
                  <span className="text-lg text-[var(--ink)]">Total</span>
                  <span className="text-lg font-medium text-[var(--ink)]">
                    {formatPrice(totalPrice >= 2000 ? totalPrice : totalPrice + 150)}
                  </span>
                </div>

                {totalPrice < 2000 && (
                  <p className="mt-4 text-sm text-[var(--stone)]">
                    Add {formatPrice(2000 - totalPrice)} more for free shipping
                  </p>
                )}

                <Link
                  href="/checkout"
                  className="mt-6 w-full inline-flex items-center justify-center py-4 bg-[var(--ink)] text-[var(--paper)] text-sm tracking-widest uppercase hover:bg-[var(--charcoal)] transition-colors duration-300"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  href="/shop"
                  className="mt-4 w-full inline-flex items-center justify-center py-3 border border-[var(--mist)] text-sm tracking-wider text-[var(--stone)] hover:border-[var(--ink)] hover:text-[var(--ink)] transition-colors"
                >
                  Continue Shopping
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
