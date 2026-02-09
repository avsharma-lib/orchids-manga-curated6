'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/manga-data';
import { createOrder, getDeviceId } from '@/lib/supabase';

const INDIA_STATES_CITIES: Record<string, string[]> = {
  'Andhra Pradesh': ['Visakhapatnam','Vijayawada','Guntur','Nellore','Kurnool','Rajahmundry','Kakinada','Tirupati','Anantapur','Kadapa','Eluru','Ongole','Srikakulam','Tenali','Proddatur','Chittoor','Hindupur','Machilipatnam','Adoni','Bhimavaram','Madanapalle','Guntakal','Dharmavaram','Gudivada','Narasaraopet','Tadepalligudem','Chilakaluripet','Mangalagiri'],
  'Arunachal Pradesh': ['Itanagar','Naharlagun','Pasighat','Tawang','Ziro','Bomdila','Along','Tezu','Roing','Changlang'],
  'Assam': ['Guwahati','Silchar','Dibrugarh','Jorhat','Nagaon','Tinsukia','Tezpur','Bongaigaon','Dhubri','North Lakhimpur','Karimganj','Sivasagar','Goalpara','Barpeta','Mangaldoi','Lanka'],
  'Bihar': ['Patna','Gaya','Bhagalpur','Muzaffarpur','Purnia','Darbhanga','Bihar Sharif','Arrah','Begusarai','Katihar','Munger','Chhapra','Saharsa','Sasaram','Hajipur','Dehri','Siwan','Motihari','Nawada','Bagaha','Buxar','Kishanganj','Sitamarhi','Jamalpur','Jehanabad','Aurangabad'],
  'Chhattisgarh': ['Raipur','Bhilai','Bilaspur','Korba','Durg','Rajnandgaon','Raigarh','Jagdalpur','Ambikapur','Dhamtari','Mahasamund','Chirmiri','Dalli-Rajhara','Kawardha','Kondagaon','Mungeli','Naila Janjgir','Bhatapara','Kanker','Tilda Newra'],
  'Goa': ['Panaji','Margao','Vasco da Gama','Mapusa','Ponda','Bicholim','Curchorem','Sanquelim','Canacona','Quepem','Sanguem','Valpoi'],
  'Gujarat': ['Ahmedabad','Surat','Vadodara','Rajkot','Bhavnagar','Jamnagar','Junagadh','Gandhinagar','Gandhidham','Anand','Navsari','Morbi','Nadiad','Surendranagar','Bharuch','Mehsana','Bhuj','Porbandar','Palanpur','Valsad','Vapi','Gondal','Veraval','Godhra','Patan','Kalol','Dahod','Botad','Amreli'],
  'Haryana': ['Faridabad','Gurgaon','Panipat','Ambala','Yamunanagar','Rohtak','Hisar','Karnal','Sonipat','Panchkula','Bhiwani','Sirsa','Bahadurgarh','Jind','Thanesar','Kaithal','Rewari','Palwal','Hansi','Narnaul','Fatehabad','Hodal'],
  'Himachal Pradesh': ['Shimla','Dharamshala','Solan','Mandi','Palampur','Baddi','Nahan','Hamirpur','Una','Kullu','Bilaspur','Chamba','Manali','Sundernagar','Rampur'],
  'Jharkhand': ['Ranchi','Jamshedpur','Dhanbad','Bokaro Steel City','Deoghar','Hazaribagh','Giridih','Ramgarh','Dumka','Phusro','Medininagar','Chirkunda','Chaibasa','Chatra','Godda','Lohardaga','Sahibganj'],
  'Karnataka': ['Bengaluru','Mysuru','Hubballi-Dharwad','Mangaluru','Belgaum','Davanagere','Bellary','Gulbarga','Shimoga','Tumkur','Raichur','Bidar','Hospet','Hassan','Gadag-Betageri','Robertson Pet','Udupi','Bhadravati','Chitradurga','Kolar','Mandya','Chikmagalur','Gangavati','Bagalkot','Ranebennur'],
  'Kerala': ['Thiruvananthapuram','Kochi','Kozhikode','Thrissur','Kollam','Palakkad','Alappuzha','Kannur','Kottayam','Malappuram','Thalassery','Kasaragod','Kayamkulam','Manjeri','Vatakara','Kanhangad','Thodupuzha','Ponnani','Attingal','Tirur','Perinthalmanna','Cherthala'],
  'Madhya Pradesh': ['Bhopal','Indore','Jabalpur','Gwalior','Ujjain','Sagar','Dewas','Satna','Ratlam','Rewa','Murwara','Singrauli','Burhanpur','Khandwa','Bhind','Chhindwara','Guna','Shivpuri','Vidisha','Chhatarpur','Damoh','Mandsaur','Khargone','Neemuch','Itarsi','Sehore','Betul','Seoni','Datia','Nagda','Hoshangabad'],
  'Maharashtra': ['Mumbai','Pune','Nagpur','Thane','Nashik','Kalyan-Dombivli','Vasai-Virar','Aurangabad','Navi Mumbai','Solapur','Mira-Bhayandar','Bhiwandi','Amravati','Nanded','Kolhapur','Sangli','Malegaon','Jalgaon','Akola','Latur','Dhule','Ahmednagar','Chandrapur','Parbhani','Ichalkaranji','Jalna','Ambernath','Bhusawal','Panvel','Badlapur','Beed','Gondia','Satara','Barshi','Yavatmal','Achalpur','Osmanabad','Nandurbar','Wardha','Udgir','Hinganghat'],
  'Manipur': ['Imphal','Thoubal','Bishnupur','Churachandpur','Ukhrul','Senapati','Kakching','Moirang'],
  'Meghalaya': ['Shillong','Tura','Jowai','Nongstoin','Williamnagar','Baghmara','Resubelpara','Nongpoh','Mairang'],
  'Mizoram': ['Aizawl','Lunglei','Champhai','Serchhip','Kolasib','Lawngtlai','Saiha','Mamit'],
  'Nagaland': ['Kohima','Dimapur','Mokokchung','Tuensang','Wokha','Zunheboto','Mon','Phek'],
  'Odisha': ['Bhubaneswar','Cuttack','Rourkela','Berhampur','Sambalpur','Puri','Balasore','Bhadrak','Baripada','Jharsuguda','Jeypore','Bargarh','Rayagada','Angul','Dhenkanal','Keonjhar','Paradip'],
  'Punjab': ['Ludhiana','Amritsar','Jalandhar','Patiala','Bathinda','Mohali','Hoshiarpur','Batala','Pathankot','Moga','Abohar','Malerkotla','Khanna','Muktsar','Barnala','Rajpura','Phagwara','Sangrur','Fazilka','Faridkot','Kapurthala','Mansa','Nawanshahr'],
  'Rajasthan': ['Jaipur','Jodhpur','Kota','Bikaner','Ajmer','Udaipur','Bhilwara','Alwar','Bharatpur','Sikar','Pali','Sri Ganganagar','Tonk','Beawar','Hanumangarh','Dhaulpur','Gangapur City','Sawai Madhopur','Barmer','Rajsamand','Jhunjhunu','Churu','Chittorgarh','Kishangarh','Baran','Nagaur','Bundi','Sujangarh','Jhalawar'],
  'Sikkim': ['Gangtok','Namchi','Gyalshing','Mangan','Rangpo','Singtam','Jorethang'],
  'Tamil Nadu': ['Chennai','Coimbatore','Madurai','Tiruchirappalli','Salem','Tirunelveli','Tiruppur','Erode','Vellore','Thoothukudi','Dindigul','Thanjavur','Ranipet','Sivakasi','Karur','Udhagamandalam','Hosur','Nagercoil','Kanchipuram','Kumarapalayam','Karaikkudi','Neyveli','Cuddalore','Kumbakonam','Tiruvannamalai','Pollachi','Rajapalayam','Gudiyatham','Pudukkottai','Vaniyambadi','Ambur','Nagapattinam'],
  'Telangana': ['Hyderabad','Warangal','Nizamabad','Karimnagar','Ramagundam','Khammam','Mahbubnagar','Mancherial','Adilabad','Suryapet','Miryalaguda','Nalgonda','Siddipet','Jagtial','Kamareddy','Nirmal','Bodhan','Kothagudem'],
  'Tripura': ['Agartala','Udaipur','Dharmanagar','Kailashahar','Belonia','Ambassa','Khowai','Sabroom'],
  'Uttar Pradesh': ['Lucknow','Kanpur','Ghaziabad','Agra','Varanasi','Meerut','Prayagraj','Bareilly','Aligarh','Moradabad','Gorakhpur','Saharanpur','Noida','Firozabad','Loni','Jhansi','Muzaffarnagar','Mathura','Shahjahanpur','Rampur','Ayodhya','Farrukhabad','Mau','Hapur','Etawah','Mirzapur','Bulandshahr','Sambhal','Amroha','Hardoi','Fatehpur','Raebareli','Orai','Unnao','Lakhimpur Kheri','Bahraich','Sitapur','Hathras','Banda','Deoria','Azamgarh','Bijnor','Sultanpur','Ballia'],
  'Uttarakhand': ['Dehradun','Haridwar','Roorkee','Haldwani','Rudrapur','Kashipur','Rishikesh','Pithoragarh','Ramnagar','Jaspur','Manglaur','Nainital','Mussoorie','Almora','Kotdwar'],
  'West Bengal': ['Kolkata','Asansol','Siliguri','Durgapur','Bardhaman','Malda','Baharampur','Habra','Kharagpur','Shantipur','Dankuni','Dhulian','Ranaghat','Haldia','Raiganj','Krishnanagar','Nabadwip','Medinipur','Jalpaiguri','Balurghat','Basirhat','Bankura','Chakdaha','Darjeeling','Alipurduar','Purulia','Jangipur','Bolpur','Bangaon','Cooch Behar','Diamond Harbour','Katwa','Tamluk'],
  'Delhi': ['New Delhi','Delhi','Dwarka','Rohini','Saket','Lajpat Nagar','Karol Bagh','Connaught Place','Chandni Chowk','Pitampura','Janakpuri','Vasant Kunj','Mayur Vihar','Laxmi Nagar'],
  'Chandigarh': ['Chandigarh'],
  'Puducherry': ['Puducherry','Karaikal','Mahe','Yanam'],
  'Jammu & Kashmir': ['Srinagar','Jammu','Anantnag','Sopore','Baramulla','Kathua','Udhampur','Rajouri','Poonch','Leh'],
  'Ladakh': ['Leh','Kargil'],
};

const ALL_STATES = Object.keys(INDIA_STATES_CITIES).sort();

interface CartItem {
  manga: { id: string; title: string; author: string; price: number; image: string; originalPrice: number; genre: string[]; rating: number; volumes: number; status: string; featured: boolean; new: boolean; description: string; };
  quantity: number;
}

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const isBuyNow = searchParams.get('mode') === 'buynow';
  const { items: cartItems, totalPrice: cartTotal, clearCart } = useCart();
  const [buyNowItem, setBuyNowItem] = useState<CartItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [stateSearch, setStateSearch] = useState('');
  const [citySearch, setCitySearch] = useState('');
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const stateRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isBuyNow) {
      const stored = sessionStorage.getItem('buy-now-item');
      if (stored) {
        try { setBuyNowItem(JSON.parse(stored)); } catch { setBuyNowItem(null); }
      }
    }
  }, [isBuyNow]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (stateRef.current && !stateRef.current.contains(e.target as Node)) setShowStateDropdown(false);
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) setShowCityDropdown(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const items = isBuyNow && buyNowItem ? [buyNowItem] : cartItems;
  const totalPrice = isBuyNow && buyNowItem ? buyNowItem.manga.price * buyNowItem.quantity : cartTotal;
  const shippingCost = totalPrice >= 2000 ? 0 : 150;
  const finalTotal = totalPrice + shippingCost;

  const filteredStates = useMemo(() => {
    if (!stateSearch) return ALL_STATES;
    return ALL_STATES.filter(s => s.toLowerCase().includes(stateSearch.toLowerCase()));
  }, [stateSearch]);

  const availableCities = useMemo(() => {
    if (!formData.state) return [];
    return INDIA_STATES_CITIES[formData.state] || [];
  }, [formData.state]);

  const filteredCities = useMemo(() => {
    if (!citySearch) return availableCities;
    return availableCities.filter(c => c.toLowerCase().includes(citySearch.toLowerCase()));
  }, [citySearch, availableCities]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const selectState = (state: string) => {
    setFormData(prev => ({ ...prev, state, city: '' }));
    setStateSearch('');
    setCitySearch('');
    setShowStateDropdown(false);
  };

  const selectCity = (city: string) => {
    setFormData(prev => ({ ...prev, city }));
    setCitySearch('');
    setShowCityDropdown(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setIsSubmitting(true);
    try {
      const fullAddress = [formData.addressLine1, formData.addressLine2, formData.city, formData.state, formData.pincode].filter(Boolean).join(', ');
      const orderItems = items.map(item => ({
        mangaId: item.manga.id,
        title: item.manga.title,
        author: item.manga.author || '',
        price: item.manga.price,
        quantity: item.quantity,
        image: item.manga.image,
      }));
      await createOrder({
        device_id: getDeviceId(),
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone || undefined,
        customer_address: fullAddress,
        items: orderItems,
        total_price: finalTotal,
        shipping_cost: shippingCost,
      });
      if (!isBuyNow) clearCart();
      sessionStorage.removeItem('buy-now-item');
      setOrderPlaced(true);
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Scroll to top when order is placed
  useEffect(() => {
    if (orderPlaced) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [orderPlaced]);

  if (orderPlaced) {
    return (
      <div ref={topRef} className="bg-[var(--paper)] pt-20 min-h-screen">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h1 className="text-4xl md:text-5xl text-[var(--ink)] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Order Placed Successfully!</h1>
            <p className="text-[var(--stone)] mb-8">Thank you for your order. We&apos;ll contact you shortly with shipping details.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop" className="inline-flex items-center justify-center px-8 py-4 bg-[var(--ink)] text-[var(--paper)] text-sm tracking-widest uppercase hover:bg-[var(--charcoal)] transition-colors duration-300">Continue Shopping</Link>
              <Link href="/my-orders" className="inline-flex items-center justify-center px-8 py-4 border border-[var(--ink)] text-[var(--ink)] text-sm tracking-widest uppercase hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors duration-300">View My Orders</Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-[var(--paper)] pt-20 min-h-screen">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <h1 className="text-4xl md:text-5xl text-[var(--ink)] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Your Cart is Empty</h1>
            <p className="text-[var(--stone)] mb-8">Add some items to your cart before checking out.</p>
            <Link href="/shop" className="inline-flex items-center justify-center px-8 py-4 bg-[var(--ink)] text-[var(--paper)] text-sm tracking-widest uppercase hover:bg-[var(--charcoal)] transition-colors duration-300">Browse Collection</Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--paper)] pt-20 min-h-screen">
      <section className="py-16 border-b border-[var(--mist)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-xs tracking-[0.3em] uppercase text-[var(--crimson)] mb-3">Checkout</p>
            <h1 className="text-4xl md:text-5xl text-[var(--ink)]" style={{ fontFamily: 'var(--font-heading)' }}>
              {isBuyNow ? 'Buy Now' : 'Complete Your Order'}
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Info */}
                <div>
                  <h2 className="text-2xl text-[var(--ink)] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Contact Information</h2>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs tracking-widest uppercase text-[var(--stone)]">Full Name *</label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Enter your full name" className="w-full px-0 py-3 bg-transparent border-b border-[var(--mist)] focus:border-[var(--ink)] outline-none transition-colors text-[var(--ink)] placeholder:text-[var(--mist)]" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs tracking-widest uppercase text-[var(--stone)]">Email *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="Enter your email" className="w-full px-0 py-3 bg-transparent border-b border-[var(--mist)] focus:border-[var(--ink)] outline-none transition-colors text-[var(--ink)] placeholder:text-[var(--mist)]" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs tracking-widest uppercase text-[var(--stone)]">Phone (Optional)</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Enter your phone number" className="w-full px-0 py-3 bg-transparent border-b border-[var(--mist)] focus:border-[var(--ink)] outline-none transition-colors text-[var(--ink)] placeholder:text-[var(--mist)]" />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h2 className="text-2xl text-[var(--ink)] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Shipping Address</h2>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs tracking-widest uppercase text-[var(--stone)]">Address Line 1 *</label>
                      <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleInputChange} required placeholder="House/Flat number, Street name" className="w-full px-0 py-3 bg-transparent border-b border-[var(--mist)] focus:border-[var(--ink)] outline-none transition-colors text-[var(--ink)] placeholder:text-[var(--mist)]" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs tracking-widest uppercase text-[var(--stone)]">Address Line 2</label>
                      <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleInputChange} placeholder="Landmark, Area, Colony (optional)" className="w-full px-0 py-3 bg-transparent border-b border-[var(--mist)] focus:border-[var(--ink)] outline-none transition-colors text-[var(--ink)] placeholder:text-[var(--mist)]" />
                    </div>

                    {/* State Selector */}
                    <div className="space-y-2" ref={stateRef}>
                      <label className="text-xs tracking-widest uppercase text-[var(--stone)]">State *</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={showStateDropdown ? stateSearch : formData.state}
                          onChange={e => { setStateSearch(e.target.value); setShowStateDropdown(true); }}
                          onFocus={() => setShowStateDropdown(true)}
                          required
                          placeholder="Search state..."
                          className="w-full px-0 py-3 bg-transparent border-b border-[var(--mist)] focus:border-[var(--ink)] outline-none transition-colors text-[var(--ink)] placeholder:text-[var(--mist)]"
                        />
                        {formData.state && !showStateDropdown && (
                          <button type="button" onClick={() => { setFormData(prev => ({ ...prev, state: '', city: '' })); setStateSearch(''); }} className="absolute right-0 top-3 text-[var(--stone)] hover:text-[var(--ink)]">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        )}
                        {showStateDropdown && (
                          <div className="absolute z-20 w-full mt-1 max-h-48 overflow-y-auto bg-[var(--paper)] border border-[var(--mist)] rounded-lg shadow-lg">
                            {filteredStates.length === 0 ? (
                              <p className="px-4 py-3 text-sm text-[var(--stone)]">No states found</p>
                            ) : filteredStates.map(state => (
                              <button key={state} type="button" onClick={() => selectState(state)} className="w-full text-left px-4 py-2.5 text-sm text-[var(--ink)] hover:bg-[var(--paper-warm)] transition-colors">{state}</button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* City Selector */}
                    <div className="space-y-2" ref={cityRef}>
                      <label className="text-xs tracking-widest uppercase text-[var(--stone)]">City *</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={showCityDropdown ? citySearch : formData.city}
                          onChange={e => { setCitySearch(e.target.value); setShowCityDropdown(true); }}
                          onFocus={() => { if (formData.state) setShowCityDropdown(true); }}
                          required
                          placeholder={formData.state ? 'Search city...' : 'Select state first'}
                          disabled={!formData.state}
                          className="w-full px-0 py-3 bg-transparent border-b border-[var(--mist)] focus:border-[var(--ink)] outline-none transition-colors text-[var(--ink)] placeholder:text-[var(--mist)] disabled:opacity-50"
                        />
                        {formData.city && !showCityDropdown && (
                          <button type="button" onClick={() => { setFormData(prev => ({ ...prev, city: '' })); setCitySearch(''); }} className="absolute right-0 top-3 text-[var(--stone)] hover:text-[var(--ink)]">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        )}
                        {showCityDropdown && formData.state && (
                          <div className="absolute z-20 w-full mt-1 max-h-48 overflow-y-auto bg-[var(--paper)] border border-[var(--mist)] rounded-lg shadow-lg">
                            {filteredCities.length === 0 ? (
                              <div>
                                <p className="px-4 py-3 text-sm text-[var(--stone)]">No cities found</p>
                                <button type="button" onClick={() => { if (citySearch) selectCity(citySearch); }} className="w-full text-left px-4 py-2.5 text-sm text-[var(--crimson)] hover:bg-[var(--paper-warm)]">Use &quot;{citySearch}&quot; as city name</button>
                              </div>
                            ) : filteredCities.map(city => (
                              <button key={city} type="button" onClick={() => selectCity(city)} className="w-full text-left px-4 py-2.5 text-sm text-[var(--ink)] hover:bg-[var(--paper-warm)] transition-colors">{city}</button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Pincode */}
                    <div className="space-y-2">
                      <label className="text-xs tracking-widest uppercase text-[var(--stone)]">Pincode *</label>
                      <input type="text" name="pincode" value={formData.pincode} onChange={e => { const v = e.target.value.replace(/\D/g, '').slice(0, 6); setFormData(prev => ({ ...prev, pincode: v })); }} required placeholder="6-digit pincode" maxLength={6} pattern="\d{6}" className="w-full px-0 py-3 bg-transparent border-b border-[var(--mist)] focus:border-[var(--ink)] outline-none transition-colors text-[var(--ink)] placeholder:text-[var(--mist)]" />
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-[var(--ink)] text-[var(--paper)] text-sm tracking-widest uppercase hover:bg-[var(--charcoal)] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? 'Placing Order...' : 'Place Order'}
                </button>
              </form>
            </motion.div>

            {/* Order Summary */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <div className="sticky top-32 bg-[var(--paper-warm)] p-8">
                <h2 className="text-2xl text-[var(--ink)] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Order Summary</h2>
                <div className="space-y-4 pb-6 border-b border-[var(--mist)] max-h-80 overflow-y-auto">
                  {items.map(item => (
                    <div key={item.manga.id} className="flex gap-4">
                      <div className="relative w-16 h-24 bg-[var(--mist)] overflow-hidden shrink-0">
                        <Image src={item.manga.image} alt={item.manga.title} fill className="object-cover" sizes="64px" unoptimized />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-[var(--ink)] truncate">{item.manga.title}</h3>
                        <p className="text-xs text-[var(--stone)]">{item.manga.author}</p>
                        <div className="flex justify-between mt-2">
                          <span className="text-xs text-[var(--stone)]">Qty: {item.quantity}</span>
                          <span className="text-sm text-[var(--ink)]">{formatPrice(item.manga.price * item.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4 py-6 border-b border-[var(--mist)]">
                  <div className="flex justify-between text-sm"><span className="text-[var(--stone)]">Subtotal</span><span className="text-[var(--ink)]">{formatPrice(totalPrice)}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-[var(--stone)]">Shipping</span><span className="text-[var(--ink)]">{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span></div>
                </div>
                <div className="flex justify-between py-6">
                  <span className="text-lg text-[var(--ink)]">Total</span>
                  <span className="text-lg font-medium text-[var(--ink)]">{formatPrice(finalTotal)}</span>
                </div>
                {shippingCost > 0 && <p className="text-sm text-[var(--stone)]">Add {formatPrice(2000 - totalPrice)} more for free shipping</p>}
                {!isBuyNow && (
                  <Link href="/cart" className="mt-4 w-full inline-flex items-center justify-center py-3 border border-[var(--mist)] text-sm tracking-wider text-[var(--stone)] hover:border-[var(--ink)] hover:text-[var(--ink)] transition-colors">Edit Cart</Link>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
