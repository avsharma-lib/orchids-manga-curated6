'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getOrdersByDeviceId, getDeviceId, Order } from '@/lib/supabase';
import { formatPrice } from '@/lib/manga-data';

const ORDER_STATUSES = ['pending', 'confirmed', 'shipped', 'delivered'];

function OrderStatusLine({ status }: { status: string }) {
  const currentIndex = ORDER_STATUSES.indexOf(status || 'pending');
  
  return (
    <div className="mt-6">
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-1 bg-[var(--mist)]" />
        <div 
          className="absolute top-5 left-0 h-1 bg-green-500 transition-all duration-500"
          style={{ width: `${(currentIndex / (ORDER_STATUSES.length - 1)) * 100}%` }}
        />
        
        {/* Status Points */}
        <div className="relative flex justify-between">
          {ORDER_STATUSES.map((s, index) => {
            const isReached = index <= currentIndex;
            const isCurrent = index === currentIndex;
            
            return (
              <div key={s} className="flex flex-col items-center">
                {/* Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors z-10 ${
                    isReached
                      ? 'bg-green-500 border-green-500'
                      : 'bg-[var(--paper)] border-[var(--mist)]'
                  } ${isCurrent ? 'ring-4 ring-green-200' : ''}`}
                >
                  {isReached ? (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-[var(--mist)]" />
                  )}
                </div>
                
                {/* Label */}
                <span
                  className={`mt-2 text-xs tracking-wider uppercase ${
                    isReached ? 'text-green-600 font-medium' : 'text-[var(--stone)]'
                  }`}
                >
                  {s}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const deviceId = getDeviceId();
      if (deviceId) {
        const data = await getOrdersByDeviceId(deviceId);
        setOrders(data || []);
      }
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="bg-[var(--paper)] pt-20 min-h-screen">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-[var(--ink)] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-[var(--stone)]">Loading your orders...</p>
          </div>
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
              Track Your Orders
            </p>
            <h1
              className="text-4xl md:text-5xl text-[var(--ink)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              My Orders
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Orders List */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          {orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--mist)] flex items-center justify-center">
                <svg className="w-10 h-10 text-[var(--stone)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h2
                className="text-2xl text-[var(--ink)] mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                No Orders Yet
              </h2>
              <p className="text-[var(--stone)] mb-8">
                You haven&apos;t placed any orders yet. Start shopping to see your orders here!
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center px-8 py-4 bg-[var(--ink)] text-[var(--paper)] text-sm tracking-widest uppercase hover:bg-[var(--charcoal)] transition-colors duration-300"
              >
                Browse Collection
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-[var(--paper-warm)] border border-[var(--mist)] rounded-lg overflow-hidden"
                >
                  {/* Order Header */}
                  <div
                    className="p-6 cursor-pointer hover:bg-[var(--mist)]/20 transition-colors"
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id!)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-medium text-[var(--ink)]">
                            Order #{order.id?.slice(-8).toUpperCase()}
                          </h3>
                          <span className={`px-2 py-1 text-xs rounded capitalize ${getStatusColor(order.status || 'pending')}`}>
                            {order.status || 'pending'}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--stone)]">
                          {order.created_at && formatDate(order.created_at)}
                        </p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-lg font-medium text-[var(--ink)]">
                            {formatPrice(order.total_price)}
                          </p>
                          <p className="text-xs text-[var(--stone)]">
                            {(order.items as unknown[])?.length || 0} items
                          </p>
                        </div>
                        <svg
                          className={`w-5 h-5 text-[var(--stone)] transition-transform ${expandedOrder === order.id ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {/* Status Line Preview */}
                    <OrderStatusLine status={order.status || 'pending'} />
                  </div>

                  {/* Expanded Details */}
                  {expandedOrder === order.id && (
                    <div className="px-6 pb-6 border-t border-[var(--mist)]">
                      <div className="pt-6">
                        {/* Items */}
                        <h4 className="text-xs tracking-widest uppercase text-[var(--stone)] mb-4">
                          Ordered Items
                        </h4>
                        <div className="space-y-4 mb-6">
                          {(order.items as { image: string; title: string; author: string; quantity: number; price: number }[])?.map((item, idx: number) => (
                            <div key={idx} className="flex gap-4">
                              <div className="relative w-16 h-24 bg-[var(--mist)] overflow-hidden rounded shrink-0">
                                <Image
                                  src={item.image}
                                  alt={item.title}
                                  fill
                                  className="object-cover"
                                  sizes="64px"
                                  unoptimized
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-[var(--ink)] truncate">
                                  {item.title}
                                </p>
                                <p className="text-xs text-[var(--stone)]">
                                  {item.author}
                                </p>
                                <div className="flex justify-between mt-2">
                                  <span className="text-xs text-[var(--stone)]">
                                    Qty: {item.quantity} × {formatPrice(item.price)}
                                  </span>
                                  <span className="text-sm text-[var(--ink)]">
                                    {formatPrice(item.price * item.quantity)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Order Summary */}
                        <div className="border-t border-[var(--mist)] pt-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-[var(--stone)]">Subtotal</span>
                            <span className="text-[var(--ink)]">
                              {formatPrice(order.total_price - order.shipping_cost)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-[var(--stone)]">Shipping</span>
                            <span className="text-[var(--ink)]">
                              {order.shipping_cost === 0 ? 'Free' : formatPrice(order.shipping_cost)}
                            </span>
                          </div>
                          <div className="flex justify-between text-lg font-medium mt-4 pt-4 border-t border-[var(--mist)]">
                            <span className="text-[var(--ink)]">Total</span>
                            <span className="text-[var(--ink)]">{formatPrice(order.total_price)}</span>
                          </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="mt-6 pt-6 border-t border-[var(--mist)]">
                          <h4 className="text-xs tracking-widest uppercase text-[var(--stone)] mb-2">
                            Shipping Address
                          </h4>
                          <p className="text-sm text-[var(--ink)]">{order.customer_name}</p>
                          <p className="text-sm text-[var(--stone)] whitespace-pre-wrap">
                            {order.customer_address}
                          </p>
                          <p className="text-sm text-[var(--stone)]">{order.customer_email}</p>
                          {order.customer_phone && (
                            <p className="text-sm text-[var(--stone)]">{order.customer_phone}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
