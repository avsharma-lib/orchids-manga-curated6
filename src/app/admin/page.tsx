'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getAllOrders, updateOrderStatus, Order, addCustomManga, addCustomBoxSet, deleteCustomManga, deleteCustomBoxSet, CustomMangaRow, CustomBoxSetRow, getCustomManga, getCustomBoxSets, initCustomProductTables, INIT_SQL } from '@/lib/supabase';
import { formatPrice, genres as staticGenres } from '@/lib/manga-data';
import { useProducts } from '@/lib/products-context';

const ADMIN_CODES = ['ADMIN AARYAVEER', 'ADMIN SOHAM'];

type AdminTab = 'orders' | 'add-manga' | 'add-boxset' | 'products' | 'setup';

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>('orders');
  const { allManga, allBoxSets, refreshProducts } = useProducts();

  // Custom products lists for management
  const [customMangaList, setCustomMangaList] = useState<CustomMangaRow[]>([]);
  const [customBoxSetList, setCustomBoxSetList] = useState<CustomBoxSetRow[]>([]);

  useEffect(() => {
    const adminAccess = sessionStorage.getItem('admin-access');
    if (adminAccess && ADMIN_CODES.includes(adminAccess)) {
      setIsAuthorized(true);
      loadOrders();
      loadCustomProducts();
    } else {
      setLoading(false);
    }
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data || []);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCustomProducts = async () => {
    try {
      const [manga, boxSets] = await Promise.all([getCustomManga(), getCustomBoxSets()]);
      setCustomMangaList(manga);
      setCustomBoxSetList(boxSets);
    } catch (error) {
      console.error('Failed to load custom products:', error);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleDeleteManga = async (id: string) => {
    if (!confirm('Delete this manga?')) return;
    try {
      await deleteCustomManga(id);
      await refreshProducts();
      await loadCustomProducts();
    } catch (error) {
      console.error('Failed to delete manga:', error);
    }
  };

  const handleDeleteBoxSet = async (id: string) => {
    if (!confirm('Delete this box set?')) return;
    try {
      await deleteCustomBoxSet(id);
      await refreshProducts();
      await loadCustomProducts();
    } catch (error) {
      console.error('Failed to delete box set:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
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

  if (!isAuthorized) {
    return (
      <div className="bg-[var(--paper)] pt-20 min-h-screen">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl text-[var(--ink)] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Access Denied
            </h1>
            <p className="text-[var(--stone)]">You don&apos;t have permission to access this page.</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-[var(--paper)] pt-20 min-h-screen">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-[var(--ink)] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-[var(--stone)]">Loading...</p>
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-xs tracking-[0.3em] uppercase text-[var(--crimson)] mb-3">Admin Dashboard</p>
            <h1 className="text-4xl md:text-5xl text-[var(--ink)]" style={{ fontFamily: 'var(--font-heading)' }}>
              Management Panel
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-[var(--mist)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex gap-0 overflow-x-auto">
            {([
              ['orders', 'Orders'],
              ['add-manga', 'Add Manga'],
              ['add-boxset', 'Add Box Set'],
              ['products', 'Manage Products'],
              ['setup', 'DB Setup'],
            ] as [AdminTab, string][]).map(([tab, label]) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm tracking-wider whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-[var(--crimson)] text-[var(--ink)]'
                    : 'border-transparent text-[var(--stone)] hover:text-[var(--ink)]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      {activeTab === 'orders' && (
        <OrdersTab
          orders={orders}
          expandedOrder={expandedOrder}
          setExpandedOrder={setExpandedOrder}
          handleStatusChange={handleStatusChange}
          formatDate={formatDate}
          getStatusColor={getStatusColor}
        />
      )}
      {activeTab === 'add-manga' && (
        <AddMangaTab
          allManga={allManga}
          refreshProducts={refreshProducts}
          loadCustomProducts={loadCustomProducts}
        />
      )}
      {activeTab === 'add-boxset' && (
        <AddBoxSetTab
          allManga={allManga}
          refreshProducts={refreshProducts}
          loadCustomProducts={loadCustomProducts}
        />
      )}
      {activeTab === 'products' && (
        <ManageProductsTab
          customManga={customMangaList}
          customBoxSets={customBoxSetList}
          onDeleteManga={handleDeleteManga}
          onDeleteBoxSet={handleDeleteBoxSet}
        />
      )}
      {activeTab === 'setup' && <SetupTab />}
    </div>
  );
}

// ── Orders Tab ──
function OrdersTab({ orders, expandedOrder, setExpandedOrder, handleStatusChange, formatDate, getStatusColor }: {
  orders: Order[];
  expandedOrder: string | null;
  setExpandedOrder: (id: string | null) => void;
  handleStatusChange: (orderId: string, status: string) => void;
  formatDate: (d: string) => string;
  getStatusColor: (s: string) => string;
}) {
  return (
    <>
      <section className="py-8 border-b border-[var(--mist)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map(status => (
              <div key={status} className="bg-[var(--paper-warm)] p-4 rounded">
                <p className="text-2xl font-medium text-[var(--ink)]">
                  {orders.filter(o => o.status === status).length}
                </p>
                <p className="text-xs uppercase tracking-wider text-[var(--stone)] capitalize">{status}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          {orders.length === 0 ? (
            <div className="text-center py-12"><p className="text-[var(--stone)]">No orders yet.</p></div>
          ) : (
            <div className="space-y-6">
              {orders.map((order, index) => (
                <motion.div key={order.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="bg-[var(--paper-warm)] border border-[var(--mist)] overflow-hidden">
                  <div className="p-6 cursor-pointer hover:bg-[var(--mist)]/20 transition-colors" onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id!)}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-medium text-[var(--ink)]">{order.customer_name}</h3>
                          <span className={`px-2 py-1 text-xs rounded ${getStatusColor(order.status || 'pending')}`}>{order.status || 'pending'}</span>
                        </div>
                        <p className="text-sm text-[var(--stone)]">{order.customer_email} {order.customer_phone && `• ${order.customer_phone}`}</p>
                        <p className="text-xs text-[var(--stone)] mt-1">{order.created_at && formatDate(order.created_at)}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-lg font-medium text-[var(--ink)]">{formatPrice(order.total_price)}</p>
                          <p className="text-xs text-[var(--stone)]">{(order.items as any[])?.length || 0} items</p>
                        </div>
                        <svg className={`w-5 h-5 text-[var(--stone)] transition-transform ${expandedOrder === order.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  {expandedOrder === order.id && (
                    <div className="px-6 pb-6 border-t border-[var(--mist)]">
                      <div className="pt-6 grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-xs tracking-widest uppercase text-[var(--stone)] mb-4">Ordered Items</h4>
                          <div className="space-y-4">
                            {(order.items as any[])?.map((item: any, idx: number) => (
                              <div key={idx} className="flex gap-4">
                                <div className="relative w-12 h-18 bg-[var(--mist)] overflow-hidden shrink-0">
                                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="48px" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-[var(--ink)] truncate">{item.title}</p>
                                  <p className="text-xs text-[var(--stone)]">{item.author}</p>
                                  <div className="flex justify-between mt-1">
                                    <span className="text-xs text-[var(--stone)]">Qty: {item.quantity} × {formatPrice(item.price)}</span>
                                    <span className="text-sm text-[var(--ink)]">{formatPrice(item.price * item.quantity)}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 pt-4 border-t border-[var(--mist)]">
                            <div className="flex justify-between text-sm">
                              <span className="text-[var(--stone)]">Shipping</span>
                              <span className="text-[var(--ink)]">{order.shipping_cost === 0 ? 'Free' : formatPrice(order.shipping_cost)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-medium mt-2">
                              <span className="text-[var(--ink)]">Total</span>
                              <span className="text-[var(--ink)]">{formatPrice(order.total_price)}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs tracking-widest uppercase text-[var(--stone)] mb-4">Shipping Address</h4>
                          <p className="text-sm text-[var(--ink)] whitespace-pre-wrap mb-6">{order.customer_address}</p>
                          <h4 className="text-xs tracking-widest uppercase text-[var(--stone)] mb-4">Device ID</h4>
                          <p className="text-xs text-[var(--stone)] font-mono mb-6 break-all">{order.device_id}</p>
                          <h4 className="text-xs tracking-widest uppercase text-[var(--stone)] mb-4">Update Status</h4>
                          <div className="flex flex-wrap gap-2">
                            {['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map(status => (
                              <button key={status} onClick={() => handleStatusChange(order.id!, status)} className={`px-3 py-2 text-xs uppercase tracking-wider border transition-colors ${order.status === status ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]' : 'border-[var(--mist)] text-[var(--stone)] hover:border-[var(--ink)]'}`}>
                                {status}
                              </button>
                            ))}
                          </div>
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
    </>
  );
}

// ── Add Manga Tab ──
function AddMangaTab({ allManga, refreshProducts, loadCustomProducts }: {
  allManga: any[];
  refreshProducts: () => Promise<void>;
  loadCustomProducts: () => Promise<void>;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    id: '',
    title: '',
    author: '',
    description: '',
    price: '',
    originalPrice: '',
    image: '',
    genre: [] as string[],
    rating: '4.5',
    volumes: '',
    status: 'completed' as string,
    featured: false,
    isNew: false,
    // sections
    section: 'all' as string,
    // product info
    publisher: '',
    material: 'Paper',
    usage: 'Reading',
    isbn: '',
    weight: '',
    dimensions: '',
  });

  const genreOptions = [...staticGenres];

  const generateId = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };

  const handleTitleChange = (value: string) => {
    setForm(prev => ({ ...prev, title: value, id: generateId(value) }));
  };

  const toggleGenre = (genre: string) => {
    setForm(prev => ({
      ...prev,
      genre: prev.genre.includes(genre)
        ? prev.genre.filter(g => g !== genre)
        : [...prev.genre, genre]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.title || !form.author || !form.price || !form.image) {
      setError('Please fill in all required fields (Title, Author, Price, Image URL)');
      return;
    }

    // Check ID uniqueness
    if (allManga.some(m => m.id === form.id)) {
      setError('A manga with this ID already exists. Change the title or manually edit the ID.');
      return;
    }

    setSubmitting(true);
    try {
      const isFeatured = form.featured || form.section === 'featured';
      const isNew = form.isNew || form.section === 'new';

      await addCustomManga({
        id: form.id,
        title: form.title,
        author: form.author,
        description: form.description,
        price: parseInt(form.price),
        original_price: parseInt(form.originalPrice) || parseInt(form.price) * 2,
        image: form.image,
        genre: form.genre,
        rating: parseFloat(form.rating) || 4.5,
        volumes: parseInt(form.volumes) || 1,
        status: form.status,
        featured: isFeatured,
        is_new: isNew,
        product_info: {
          productType: 'Books',
          publisher: form.publisher || '-',
          material: form.material,
          usage: form.usage,
          isbn: form.isbn || '-',
          weight: form.weight || '-',
          dimensions: form.dimensions || '-',
        },
      });

      setSuccess(`"${form.title}" has been added successfully!`);
      await refreshProducts();
      await loadCustomProducts();
      // Reset form
      setForm({
        id: '', title: '', author: '', description: '', price: '', originalPrice: '',
        image: '', genre: [], rating: '4.5', volumes: '', status: 'completed',
        featured: false, isNew: false, section: 'all',
        publisher: '', material: 'Paper', usage: 'Reading', isbn: '', weight: '', dimensions: '',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to add manga');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-12">
      <div className="mx-auto max-w-3xl px-6 lg:px-12">
        <h2 className="text-2xl text-[var(--ink)] mb-8" style={{ fontFamily: 'var(--font-heading)' }}>Add New Manga</h2>

        {success && <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 text-sm rounded">{success}</div>}
        {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 text-sm rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title + ID */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs tracking-widest uppercase text-[var(--stone)] mb-2">Title *</label>
              <input type="text" value={form.title} onChange={e => handleTitleChange(e.target.value)} required className="w-full px-4 py-3 border border-[var(--mist)] rounded bg-[var(--paper)] text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none" placeholder="e.g. One Piece" />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-[var(--stone)] mb-2">ID (auto-generated)</label>
              <input type="text" value={form.id} onChange={e => setForm(prev => ({ ...prev, id: e.target.value }))} className="w-full px-4 py-3 border border-[var(--mist)] rounded bg-[var(--paper-warm)] text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none" />
            </div>
          </div>

          {/* Author */}
          <div>
            <label className="block text-xs tracking-widest uppercase text-[var(--stone)] mb-2">Author *</label>
            <input type="text" value={form.author} onChange={e => setForm(prev => ({ ...prev, author: e.target.value }))} required className="w-full px-4 py-3 border border-[var(--mist)] rounded bg-[var(--paper)] text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none" placeholder="e.g. Eiichiro Oda" />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs tracking-widest uppercase text-[var(--stone)] mb-2">Description</label>
            <textarea value={form.description} onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))} rows={3} className="w-full px-4 py-3 border border-[var(--mist)] rounded bg-[var(--paper)] text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none resize-none" placeholder="Brief description of the manga..." />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs tracking-widest uppercase text-[var(--stone)] mb-2">Image URL *</label>
            <input type="url" value={form.image} onChange={e => setForm(prev => ({ ...prev, image: e.target.value }))} required className="w-full px-4 py-3 border border-[var(--mist)] rounded bg-[var(--paper)] text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none" placeholder="https://..." />
            {form.image && (
              <div className="mt-2 relative w-24 h-36 bg-[var(--mist)] rounded overflow-hidden">
                <Image src={form.image} alt="Preview" fill className="object-cover" sizes="96px" unoptimized />
              </div>
            )}
          </div>

          {/* Price */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs tracking-widest uppercase text-[var(--stone)] mb-2">Price (INR) *</label>
              <input type="number" value={form.price} onChange={e => setForm(prev => ({ ...prev, price: e.target.value }))} required min="1" className="w-full px-4 py-3 border border-[var(--mist)] rounded bg-[var(--paper)] text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none" placeholder="500" />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-[var(--stone)] mb-2">Original Price (INR)</label>
              <input type="number" value={form.originalPrice} onChange={e => setForm(prev => ({ ...prev, originalPrice: e.target.value }))} min="1" className="w-full px-4 py-3 border border-[var(--mist)] rounded bg-[var(--paper)] text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none" placeholder="1250 (defaults to 2x price)" />
            </div>
          </div>

          {/* Volumes, Rating, Status */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs tracking-widest uppercase text-[var(--stone)] mb-2">Volumes</label>
              <input type="number" value={form.volumes} onChange={e => setForm(prev => ({ ...prev, volumes: e.target.value }))} min="1" className="w-full px-4 py-3 border border-[var(--mist)] rounded bg-[var(--paper)] text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none" placeholder="1" />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-[var(--stone)] mb-2">Rating</label>
              <input type="number" value={form.rating} onChange={e => setForm(prev => ({ ...prev, rating: e.target.value }))} step="0.1" min="0" max="5" className="w-full px-4 py-3 border border-[var(--mist)] rounded bg-[var(--paper)] text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-[var(--stone)] mb-2">Status</label>
              <select value={form.status} onChange={e => setForm(prev => ({ ...prev, status: e.target.value }))} className="w-full px-4 py-3 border border-[var(--mist)] rounded bg-[var(--paper)] text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none">
                <option value="completed">Completed</option>
                <option value="ongoing">Ongoing</option>
              </select>
            </div>
          </div>

          {/* Genre */}
          <div>
            <label className="block text-xs tracking-widest uppercase text-[var(--stone)] mb-2">Genre (select multiple)</label>
            <div className="flex flex-wrap gap-2">
              {genreOptions.map(genre => (
                <button key={genre} type="button" onClick={() => toggleGenre(genre)} className={`px-3 py-1.5 text-xs tracking-wider border rounded transition-colors ${form.genre.includes(genre) ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]' : 'border-[var(--mist)] text-[var(--stone)] hover:border-[var(--ink)]'}`}>
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Section placement */}
          <div>
            <label className="block text-xs tracking-widest uppercase text-[var(--stone)] mb-2">Add to Section</label>
            <div className="flex flex-wrap gap-3">
              {[
                ['all', 'All Titles Only'],
                ['featured', 'Featured'],
                ['new', 'New Arrivals'],
              ].map(([val, label]) => (
                <button key={val} type="button" onClick={() => setForm(prev => ({ ...prev, section: val, featured: val === 'featured' ? true : prev.featured, isNew: val === 'new' ? true : prev.isNew }))} className={`px-4 py-2 text-sm border rounded transition-colors ${form.section === val ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]' : 'border-[var(--mist)] text-[var(--stone)] hover:border-[var(--ink)]'}`}>
                  {label}
                </button>
              ))}
            </div>
            <div className="flex gap-4 mt-3">
              <label className="flex items-center gap-2 text-sm text-[var(--stone)]">
                <input type="checkbox" checked={form.featured} onChange={e => setForm(prev => ({ ...prev, featured: e.target.checked }))} />
                Featured
              </label>
              <label className="flex items-center gap-2 text-sm text-[var(--stone)]">
                <input type="checkbox" checked={form.isNew} onChange={e => setForm(prev => ({ ...prev, isNew: e.target.checked }))} />
                New Arrival
              </label>
            </div>
          </div>

          {/* Product Info */}
          <div className="border-t border-[var(--mist)] pt-6">
            <h3 className="text-lg text-[var(--ink)] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Product Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs tracking-widest uppercase text-[var(--stone)] mb-2">Publisher</label>
                <input type="text" value={form.publisher} onChange={e => setForm(prev => ({ ...prev, publisher: e.target.value }))} className="w-full px-4 py-3 border border-[var(--mist)] rounded bg-[var(--paper)] text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none" placeholder="e.g. VIZ Media" />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-[var(--stone)] mb-2">ISBN</label>
                <input type="text" value={form.isbn} onChange={e => setForm(prev => ({ ...prev, isbn: e.target.value }))} className="w-full px-4 py-3 border border-[var(--mist)] rounded bg-[var(--paper)] text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none" placeholder="978-..." />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-[var(--stone)] mb-2">Weight</label>
                <input type="text" value={form.weight} onChange={e => setForm(prev => ({ ...prev, weight: e.target.value }))} className="w-full px-4 py-3 border border-[var(--mist)] rounded bg-[var(--paper)] text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none" placeholder="e.g. 4.5 kg" />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-[var(--stone)] mb-2">Dimensions</label>
                <input type="text" value={form.dimensions} onChange={e => setForm(prev => ({ ...prev, dimensions: e.target.value }))} className="w-full px-4 py-3 border border-[var(--mist)] rounded bg-[var(--paper)] text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none" placeholder="e.g. 21 cm x 15 cm x 25 cm" />
              </div>
            </div>
          </div>

          <button type="submit" disabled={submitting} className="w-full py-4 bg-[var(--ink)] text-[var(--paper)] text-sm tracking-widest uppercase hover:bg-[var(--charcoal)] transition-colors disabled:opacity-50">
            {submitting ? 'Adding...' : 'Add Manga'}
          </button>
        </form>
      </div>
    </section>
  );
}

// ── Add Box Set Tab ──
function AddBoxSetTab({ allManga, refreshProducts, loadCustomProducts }: {
  allManga: any[];
  refreshProducts: () => Promise<void>;
  loadCustomProducts: () => Promise<void>;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    id: '',
    mangaId: '',
    title: '',
    description: '',
    image: '',
    price: '',
    originalPrice: '',
    volumesIncluded: '',
    publisher: '',
    weight: '',
    dimensions: '',
  });

  const generateId = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };

  const handleTitleChange = (value: string) => {
    setForm(prev => ({ ...prev, title: value, id: generateId(value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.title || !form.price || !form.image) {
      setError('Please fill in all required fields (Title, Price, Image URL)');
      return;
    }

    setSubmitting(true);
    try {
      await addCustomBoxSet({
        id: form.id,
        manga_id: form.mangaId || null,
        title: form.title,
        description: form.description,
        image: form.image,
        price: parseInt(form.price),
        original_price: parseInt(form.originalPrice) || parseInt(form.price) * 2,
        volumes_included: form.volumesIncluded,
        publisher: form.publisher,
        weight: form.weight,
        dimensions: form.dimensions,
      });

      setSuccess(`"${form.title}" has been added successfully!`);
      await refreshProducts();
      await loadCustomProducts();
      setForm({
        id: '', mangaId: '', title: '', description: '', image: '',
        price: '', originalPrice: '', volumesIncluded: '', publisher: '', weight: '', dimensions: '',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to add box set');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-12">
      <div className="mx-auto max-w-3xl px-6 lg:px-12">
        <h2 className="text-2xl text-[var(--ink)] mb-8" style={{ fontFamily: 'var(--font-heading)' }}>Add New Box Set</h2>

        {success && <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 text-sm rounded">{success}</div>}
        {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 text-sm rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title + ID */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs tracking-widest uppercase text-[var(--stone)] mb-2">Title *</label>
              <input type="text" value={form.title} onChange={e => handleTitleChange(e.target.value)} required className="w-full px-4 py-3 border border-[var(--mist)] rounded bg-[var(--paper)] text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none" placeholder="e.g. Naruto Box Set 1" />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-[var(--stone)] mb-2">ID (auto-generated)</label>
              <input type="text" value={form.id} onChange={e => setForm(prev => ({ ...prev, id: e.target.value }))} className="w-full px-4 py-3 border border-[var(--mist)] rounded bg-[var(--paper-warm)] text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none" />
            </div>
          </div>

          {/* Link to Manga */}
          <div>
            <label className="block text-xs tracking-widest uppercase text-[var(--stone)] mb-2">
              Link to Manga (optional)
            </label>
            <select
              value={form.mangaId}
              onChange={e => setForm(prev => ({ ...prev, mangaId: e.target.value }))}
              className="w-full px-4 py-3 border border-[var(--mist)] rounded bg-[var(--paper)] text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none"
            >
              <option value="">-- No link (standalone box set) --</option>
              {allManga.map(m => (
                <option key={m.id} value={m.id}>{m.title} ({m.id})</option>
              ))}
            </select>
            <p className="text-xs text-[var(--stone)] mt-1">
              Link to show &quot;Buy Individual Manga&quot; on box set page and &quot;Buy Complete Edition&quot; on manga page.
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs tracking-widest uppercase text-[var(--stone)] mb-2">Description</label>
            <textarea value={form.description} onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))} rows={3} className="w-full px-4 py-3 border border-[var(--mist)] rounded bg-[var(--paper)] text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none resize-none" placeholder="Brief description of the box set..." />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs tracking-widest uppercase text-[var(--stone)] mb-2">Image URL *</label>
            <input type="url" value={form.image} onChange={e => setForm(prev => ({ ...prev, image: e.target.value }))} required className="w-full px-4 py-3 border border-[var(--mist)] rounded bg-[var(--paper)] text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none" placeholder="https://..." />
            {form.image && (
              <div className="mt-2 relative w-32 h-24 bg-[var(--mist)] rounded overflow-hidden">
                <Image src={form.image} alt="Preview" fill className="object-cover" sizes="128px" unoptimized />
              </div>
            )}
          </div>

          {/* Price */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs tracking-widest uppercase text-[var(--stone)] mb-2">Price (INR) *</label>
              <input type="number" value={form.price} onChange={e => setForm(prev => ({ ...prev, price: e.target.value }))} required min="1" className="w-full px-4 py-3 border border-[var(--mist)] rounded bg-[var(--paper)] text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none" placeholder="2000" />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-[var(--stone)] mb-2">Original Price (INR)</label>
              <input type="number" value={form.originalPrice} onChange={e => setForm(prev => ({ ...prev, originalPrice: e.target.value }))} min="1" className="w-full px-4 py-3 border border-[var(--mist)] rounded bg-[var(--paper)] text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none" placeholder="Defaults to 2x price" />
            </div>
          </div>

          {/* Box Set Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs tracking-widest uppercase text-[var(--stone)] mb-2">Volumes Included</label>
              <input type="text" value={form.volumesIncluded} onChange={e => setForm(prev => ({ ...prev, volumesIncluded: e.target.value }))} className="w-full px-4 py-3 border border-[var(--mist)] rounded bg-[var(--paper)] text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none" placeholder="e.g. Volumes 1-27" />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-[var(--stone)] mb-2">Publisher</label>
              <input type="text" value={form.publisher} onChange={e => setForm(prev => ({ ...prev, publisher: e.target.value }))} className="w-full px-4 py-3 border border-[var(--mist)] rounded bg-[var(--paper)] text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none" placeholder="e.g. VIZ Media" />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-[var(--stone)] mb-2">Weight</label>
              <input type="text" value={form.weight} onChange={e => setForm(prev => ({ ...prev, weight: e.target.value }))} className="w-full px-4 py-3 border border-[var(--mist)] rounded bg-[var(--paper)] text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none" placeholder="e.g. 7.5 kg" />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-[var(--stone)] mb-2">Dimensions</label>
              <input type="text" value={form.dimensions} onChange={e => setForm(prev => ({ ...prev, dimensions: e.target.value }))} className="w-full px-4 py-3 border border-[var(--mist)] rounded bg-[var(--paper)] text-[var(--ink)] focus:border-[var(--ink)] focus:outline-none" placeholder="e.g. 26 cm x 18 cm x 25 cm" />
            </div>
          </div>

          <button type="submit" disabled={submitting} className="w-full py-4 bg-[var(--ink)] text-[var(--paper)] text-sm tracking-widest uppercase hover:bg-[var(--charcoal)] transition-colors disabled:opacity-50">
            {submitting ? 'Adding...' : 'Add Box Set'}
          </button>
        </form>
      </div>
    </section>
  );
}

// ── Manage Products Tab ──
function ManageProductsTab({ customManga, customBoxSets, onDeleteManga, onDeleteBoxSet }: {
  customManga: CustomMangaRow[];
  customBoxSets: CustomBoxSetRow[];
  onDeleteManga: (id: string) => void;
  onDeleteBoxSet: (id: string) => void;
}) {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <h2 className="text-2xl text-[var(--ink)] mb-8" style={{ fontFamily: 'var(--font-heading)' }}>Custom Products</h2>
        <p className="text-sm text-[var(--stone)] mb-8">
          Only custom-added products appear here. Original built-in products are not editable.
        </p>

        {/* Custom Manga */}
        <h3 className="text-lg text-[var(--ink)] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
          Custom Manga ({customManga.length})
        </h3>
        {customManga.length === 0 ? (
          <p className="text-sm text-[var(--stone)] mb-8">No custom manga added yet.</p>
        ) : (
          <div className="space-y-3 mb-8">
            {customManga.map(m => (
              <div key={m.id} className="flex items-center gap-4 p-4 bg-[var(--paper-warm)] border border-[var(--mist)] rounded">
                <div className="relative w-12 h-18 bg-[var(--mist)] rounded overflow-hidden shrink-0">
                  <Image src={m.image} alt={m.title} fill className="object-cover" sizes="48px" unoptimized />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--ink)] truncate">{m.title}</p>
                  <p className="text-xs text-[var(--stone)]">{m.author} &bull; {formatPrice(m.price)}</p>
                  <div className="flex gap-2 mt-1">
                    {m.featured && <span className="text-[10px] px-1.5 py-0.5 bg-[var(--ink)] text-white rounded">Featured</span>}
                    {m.is_new && <span className="text-[10px] px-1.5 py-0.5 bg-[var(--crimson)] text-white rounded">New</span>}
                  </div>
                </div>
                <button onClick={() => onDeleteManga(m.id)} className="px-3 py-2 text-xs border border-red-300 text-red-600 rounded hover:bg-red-50 transition-colors">
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Custom Box Sets */}
        <h3 className="text-lg text-[var(--ink)] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
          Custom Box Sets ({customBoxSets.length})
        </h3>
        {customBoxSets.length === 0 ? (
          <p className="text-sm text-[var(--stone)]">No custom box sets added yet.</p>
        ) : (
          <div className="space-y-3">
            {customBoxSets.map(bs => (
              <div key={bs.id} className="flex items-center gap-4 p-4 bg-[var(--paper-warm)] border border-[var(--mist)] rounded">
                <div className="relative w-16 h-12 bg-[var(--mist)] rounded overflow-hidden shrink-0">
                  <Image src={bs.image} alt={bs.title} fill className="object-cover" sizes="64px" unoptimized />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--ink)] truncate">{bs.title}</p>
                  <p className="text-xs text-[var(--stone)]">{bs.volumes_included} &bull; {formatPrice(bs.price)}</p>
                  {bs.manga_id && <p className="text-xs text-[var(--crimson)]">Linked to: {bs.manga_id}</p>}
                </div>
                <button onClick={() => onDeleteBoxSet(bs.id)} className="px-3 py-2 text-xs border border-red-300 text-red-600 rounded hover:bg-red-50 transition-colors">
                  Delete
                </button>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>
    );
  }
}

// ── Setup Tab ──
function SetupTab() {
  const [status, setStatus] = useState('');
  const [checking, setChecking] = useState(false);

  const checkTables = async () => {
    setChecking(true);
    try {
      const result = await initCustomProductTables();
      setStatus(result.message);
    } catch (err: any) {
      setStatus('Error: ' + err.message);
    } finally {
      setChecking(false);
    }
  };

  return (
    <section className="py-12">
      <div className="mx-auto max-w-3xl px-6 lg:px-12">
        <h2 className="text-2xl text-[var(--ink)] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Database Setup</h2>
        <p className="text-sm text-[var(--stone)] mb-6">
          Run the SQL below in your Supabase SQL editor to create the required tables for custom products.
          This only needs to be done once. The existing orders table is not affected.
        </p>

        <button
          onClick={checkTables}
          disabled={checking}
          className="mb-6 px-6 py-3 bg-[var(--ink)] text-[var(--paper)] text-sm tracking-widest uppercase hover:bg-[var(--charcoal)] transition-colors disabled:opacity-50"
        >
          {checking ? 'Checking...' : 'Check Table Status'}
        </button>

        {status && (
          <div className={`mb-6 p-4 text-sm rounded border ${status.includes('already exist') ? 'bg-green-50 border-green-200 text-green-800' : 'bg-yellow-50 border-yellow-200 text-yellow-800'}`}>
            {status}
          </div>
        )}

        <div className="bg-[var(--ink)] text-[var(--paper)] p-6 rounded-lg overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs tracking-widest uppercase text-[var(--stone)]">SQL</span>
            <button
              onClick={() => { navigator.clipboard.writeText(INIT_SQL); alert('SQL copied to clipboard!'); }}
              className="px-3 py-1.5 text-xs border border-[var(--stone)] text-[var(--stone)] rounded hover:text-[var(--paper)] hover:border-[var(--paper)] transition-colors"
            >
              Copy SQL
            </button>
          </div>
          <pre className="text-xs text-[var(--mist)] whitespace-pre-wrap font-mono leading-relaxed">{INIT_SQL}</pre>
        </div>
      </div>
    </section>
  );
}
