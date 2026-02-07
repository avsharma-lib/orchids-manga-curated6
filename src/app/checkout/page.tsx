'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/manga-data';
import { createOrder, getDeviceId } from '@/lib/supabase';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const shippingCost = totalPrice >= 2000 ? 0 : 150;
  const finalTotal = totalPrice + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) return;
    
    setIsSubmitting(true);
    
    try {
      const orderItems = items.map(item => ({
        mangaId: item.manga.id,
        title: item.manga.title,
        author: item.manga.author,
        price: item.manga.price,
        quantity: item.quantity,
        image: item.manga.image,
      }));

      await createOrder({
        device_id: getDeviceId(),
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone || undefined,
        customer_address: formData.address,
        items: orderItems,
        total_price: finalTotal,
        shipping_cost: shippingCost,
      });

      clearCart();
      setOrderPlaced(true);
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="bg-[var(--paper)] pt-20 min-h-screen">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1
              className="text-4xl md:text-5xl text-[var(--ink)] mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Order Placed Successfully!
            </h1>
            <p className="text-[var(--stone)] mb-8">
              Thank you for your order. We&apos;ll contact you shortly with shipping details.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-4 bg-[var(--ink)] text-[var(--paper)] text-sm tracking-widest uppercase hover:bg-[var(--charcoal)] transition-colors duration-300"
            >
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

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
              Add some manga to your cart before checking out.
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
              Checkout
            </p>
            <h1
              className="text-4xl md:text-5xl text-[var(--ink)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Complete Your Order
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Checkout Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h2
                    className="text-2xl text-[var(--ink)] mb-6"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Contact Information
                  </h2>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs tracking-widest uppercase text-[var(--stone)]">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your full name"
                        className="w-full px-0 py-3 bg-transparent border-b border-[var(--mist)] focus:border-[var(--ink)] outline-none transition-colors text-[var(--ink)] placeholder:text-[var(--mist)]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs tracking-widest uppercase text-[var(--stone)]">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your email"
                        className="w-full px-0 py-3 bg-transparent border-b border-[var(--mist)] focus:border-[var(--ink)] outline-none transition-colors text-[var(--ink)] placeholder:text-[var(--mist)]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs tracking-widest uppercase text-[var(--stone)]">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        className="w-full px-0 py-3 bg-transparent border-b border-[var(--mist)] focus:border-[var(--ink)] outline-none transition-colors text-[var(--ink)] placeholder:text-[var(--mist)]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h2
                    className="text-2xl text-[var(--ink)] mb-6"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Shipping Address
                  </h2>
                  <div className="space-y-2">
                    <label className="text-xs tracking-widest uppercase text-[var(--stone)]">
                      Full Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      placeholder="Enter your complete address including city, state, and pincode"
                      className="w-full px-0 py-3 bg-transparent border-b border-[var(--mist)] focus:border-[var(--ink)] outline-none transition-colors text-[var(--ink)] placeholder:text-[var(--mist)] resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[var(--ink)] text-[var(--paper)] text-sm tracking-widest uppercase hover:bg-[var(--charcoal)] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Placing Order...' : 'Place Order'}
                </button>
              </form>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="sticky top-32 bg-[var(--paper-warm)] p-8">
                <h2
                  className="text-2xl text-[var(--ink)] mb-6"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Order Summary
                </h2>

                {/* Items */}
                <div className="space-y-4 pb-6 border-b border-[var(--mist)] max-h-80 overflow-y-auto">
                  {items.map(item => (
                    <div key={item.manga.id} className="flex gap-4">
                      <div className="relative w-16 h-24 bg-[var(--mist)] overflow-hidden shrink-0">
                        <Image
                          src={item.manga.image}
                          alt={item.manga.title}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-[var(--ink)] truncate">
                          {item.manga.title}
                        </h3>
                        <p className="text-xs text-[var(--stone)]">
                          {item.manga.author}
                        </p>
                        <div className="flex justify-between mt-2">
                          <span className="text-xs text-[var(--stone)]">
                            Qty: {item.quantity}
                          </span>
                          <span className="text-sm text-[var(--ink)]">
                            {formatPrice(item.manga.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-4 py-6 border-b border-[var(--mist)]">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--stone)]">Subtotal</span>
                    <span className="text-[var(--ink)]">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--stone)]">Shipping</span>
                    <span className="text-[var(--ink)]">
                      {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between py-6">
                  <span className="text-lg text-[var(--ink)]">Total</span>
                  <span className="text-lg font-medium text-[var(--ink)]">
                    {formatPrice(finalTotal)}
                  </span>
                </div>

                {shippingCost > 0 && (
                  <p className="text-sm text-[var(--stone)]">
                    Add {formatPrice(2000 - totalPrice)} more for free shipping
                  </p>
                )}

                <Link
                  href="/cart"
                  className="mt-4 w-full inline-flex items-center justify-center py-3 border border-[var(--mist)] text-sm tracking-wider text-[var(--stone)] hover:border-[var(--ink)] hover:text-[var(--ink)] transition-colors"
                >
                  Edit Cart
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
