'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { formatPrice } from '@/lib/product-data';
import { useProducts } from '@/lib/products-context';
import ProductCard from '@/components/ProductCard';
import LoadingScreen from '@/components/LoadingScreen';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';

export default function HomePage() {
  const { allProducts, allTShirts, allHoodies, allAccessories, allGenres, getFeaturedProduct, getNewProduct } = useProducts();
  const featuredProduct = getFeaturedProduct();
  const newProduct = getNewProduct();
  const darkFantasyProduct = allProducts?.filter(m => m.genre.includes('Streetwear')).slice(0, 4);
  const horrorProduct = allProducts?.filter(m => m.genre.includes('Casual')).slice(0, 4);
  const availableBoxSets = allTShirts?.filter(bs =>
    allProducts?.some(p => p.id === bs.productId) || !bs.productId
  );
  const displayedBoxSets = availableBoxSets?.slice(0, Math.ceil(availableBoxSets.length / 2));

  return (
    <div className="bg-[var(--paper)]">
      <LoadingScreen />

      {/* Hero Section */}
      <section className="relative pt-24 min-h-[120vh]">
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(90deg, var(--ink) 0px, var(--ink) 1px, transparent 1px, transparent 60px),
                             repeating-linear-gradient(0deg, var(--ink) 0px, var(--ink) 1px, transparent 1px, transparent 60px)`
          }} />
        </div>
        <ContainerScroll
          titleComponent={
            <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-8 text-center pb-8">
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 3 }}>
                <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight text-[var(--ink)]" style={{ fontFamily: 'var(--font-heading)' }}>
                  Premium Apparel for<br />
                  <span className="italic text-[var(--crimson)]">Modern</span> Style
                </h1>
                <p className="mt-6 max-w-xl mx-auto text-lg text-[var(--stone)] leading-relaxed">
                  A carefully selected collection of the finest clothing. No filler. No compromise. Only the pieces that define modern style.
                </p>
              </motion.div>
            </div>
          }
        >
          <Image
            src="/assets/images/home/homepage-apparel.jpg"
            alt="Premium Apparel Collection"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-center"
            draggable={false}
            priority
          />
        </ContainerScroll>
      </section>

      {/* Content wrapper with a solid background and higher z-index to slide over the sticky image */}
      <div className="relative z-10 bg-[var(--paper)]">
        {/* Featured Section */}
      <section id="featured" className="py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[var(--crimson)] mb-3">Hand-Selected</p>
              <h2 className="text-4xl md:text-5xl text-[var(--ink)]" style={{ fontFamily: 'var(--font-heading)' }}>Featured Pieces</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {featuredProduct?.slice(0, 8)?.map((manga, index) => (
              <ProductCard key={manga.id} product={manga} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Banner */}
      <section className="py-12 bg-[var(--ink)] text-[var(--paper)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-xs tracking-[0.3em] uppercase text-[var(--crimson-muted)] mb-4">The Inkai Philosophy</motion.p>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>Not every story deserves a place on your shelf.</motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-6 text-[var(--mist)] leading-relaxed">
                We curate ruthlessly. Every piece in our collection has been evaluated and chosen for its design merit, quality material, and cultural significance. This is clothing for individuals who refuse to settle.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-8">
                <Link href="/about" className="inline-flex items-center gap-3 text-sm tracking-widest uppercase text-[var(--paper)] hover:text-[var(--crimson-muted)] transition-colors">Learn More<span className="w-8 h-px bg-current" /></Link>
              </motion.div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {featuredProduct?.slice(0, 4)?.map((manga, i) => (
                  <motion.div key={manga.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`relative aspect-[2/3] ${i % 2 === 1 ? 'mt-8' : ''}`}>
                    <Image src={manga.image} alt={manga.title} fill className="object-cover" sizes="200px" unoptimized />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[var(--crimson)] mb-3">Just Added</p>
              <h2 className="text-4xl md:text-5xl text-[var(--ink)]" style={{ fontFamily: 'var(--font-heading)' }}>New Arrivals</h2>
            </div>
            <Link href="/shop?filter=new" className="hidden sm:flex items-center gap-2 text-sm tracking-wider text-[var(--stone)] hover:text-[var(--ink)] transition-colors">
              View All<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {newProduct?.map((manga, index) => (
              <ProductCard key={manga.id} product={manga} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* T-Shirts - limited with View All */}
      {availableBoxSets.length > 0 && (
        <section id="t-shirts" className="py-12 lg:py-16 bg-[var(--ink)] text-[var(--paper)]">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[var(--crimson-muted)] mb-3">Complete Collections</p>
                <h2 className="text-4xl md:text-5xl text-[var(--ink)]" style={{ fontFamily: 'var(--font-heading)' }}>T-Shirts</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {displayedBoxSets?.map((boxSet, index) => (
                <motion.div key={boxSet.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.03, duration: 0.3 }}>
                  <Link href={`/box-set/${boxSet.id}`} className="group block">
                    <div className="relative aspect-[4/3] bg-[var(--charcoal)] overflow-hidden rounded-lg mb-4">
                      <Image src={boxSet.image} alt={boxSet.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 25vw" unoptimized />
                      <div className="absolute top-2 left-2"><span className="px-2 py-1 text-[10px] tracking-widest uppercase bg-[var(--crimson)] text-white rounded">T-Shirt</span></div>
                    </div>
                    <h3 className="text-sm font-medium text-[var(--paper)] mb-1 group-hover:text-[var(--crimson-muted)] transition-colors line-clamp-2">{boxSet.title}</h3>
                    <p className="text-xs text-[var(--mist)] mb-2">{boxSet.volumesIncluded}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-medium text-[var(--paper)]">{formatPrice(boxSet.price)}</span>
                      <span className="text-xs text-[var(--stone)] line-through">{formatPrice(boxSet.originalPrice)}</span>
                      <span className="text-xs text-[var(--crimson-muted)]">-{Math.round((1 - boxSet.price / boxSet.originalPrice) * 100)}%</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/t-shirts" className="inline-flex items-center gap-3 px-8 py-4 border border-[var(--paper)]/30 text-sm tracking-widest uppercase text-[var(--paper)] hover:bg-[var(--paper)] hover:text-[var(--ink)] transition-colors duration-300">
                View All T-Shirts<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Action Figures */}
      <section id="hoodies" className="py-12 lg:py-16 bg-[var(--paper-warm)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[var(--crimson)] mb-3">Outerwear</p>
              <h2 className="text-4xl md:text-5xl text-[var(--ink)]" style={{ fontFamily: 'var(--font-heading)' }}>Hoodies</h2>
            </div>
            {allHoodies.length > 4 && (
              <Link href="/hoodies" className="hidden sm:flex items-center gap-2 text-sm tracking-wider text-[var(--stone)] hover:text-[var(--ink)] transition-colors">View All<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></Link>
            )}
          </div>
          {allHoodies.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-[var(--mist)] rounded-lg">
              <p className="text-[var(--stone)] text-lg">Coming Soon</p>
              <p className="text-sm text-[var(--stone)] mt-2">Hoodies will be available shortly</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {allHoodies?.slice(0, 8)?.map((figure, index) => (
                <motion.div key={figure.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.03, duration: 0.3 }}>
                  <Link href={`/hoodies/${figure.id}`} className="group block">
                    <div className="relative aspect-square bg-[var(--mist)] overflow-hidden rounded-lg mb-4">
                      <Image src={figure.image} alt={figure.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 25vw" unoptimized />
                      <div className="absolute top-2 left-2"><span className="px-2 py-1 text-[10px] tracking-widest uppercase bg-[var(--ink)] text-white rounded">Hoodie</span></div>
                    </div>
                    <h3 className="text-sm font-medium text-[var(--ink)] mb-1 group-hover:text-[var(--crimson)] transition-colors line-clamp-2">{figure.title}</h3>
                    {figure.series && <p className="text-xs text-[var(--stone)] mb-2">{figure.series}</p>}
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-medium text-[var(--ink)]">{formatPrice(figure.price)}</span>
                      <span className="text-xs text-[var(--stone)] line-through">{formatPrice(figure.originalPrice)}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
          {allHoodies.length > 0 && (
            <div className="mt-10 text-center">
              <Link href="/hoodies" className="inline-flex items-center gap-3 px-8 py-4 border border-[var(--ink)] text-sm tracking-widest uppercase text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors duration-300">View All Hoodies</Link>
            </div>
          )}
        </div>
      </section>

      {/* Katanas */}
      <section id="accessories" className="py-12 lg:py-16 bg-[var(--ink)] text-[var(--paper)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[var(--crimson-muted)] mb-3">Finishing Touches</p>
              <h2 className="text-4xl md:text-5xl text-[var(--paper)]" style={{ fontFamily: 'var(--font-heading)' }}>Accessories</h2>
            </div>
            {allAccessories.length > 4 && (
              <Link href="/accessories" className="hidden sm:flex items-center gap-2 text-sm tracking-wider text-[var(--mist)] hover:text-[var(--paper)] transition-colors">View All<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></Link>
            )}
          </div>
          {allAccessories.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-[var(--paper)]/20 rounded-lg">
              <p className="text-[var(--mist)] text-lg">Coming Soon</p>
              <p className="text-sm text-[var(--stone)] mt-2">Accessories will be available shortly</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {allAccessories?.slice(0, 8)?.map((katana, index) => (
                <motion.div key={katana.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.03, duration: 0.3 }}>
                  <Link href={`/accessories/${katana.id}`} className="group block">
                    <div className="relative aspect-[3/2] bg-[var(--charcoal)] overflow-hidden rounded-lg mb-4">
                      <Image src={katana.image} alt={katana.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 25vw" unoptimized />
                      <div className="absolute top-2 left-2"><span className="px-2 py-1 text-[10px] tracking-widest uppercase bg-[var(--crimson)] text-white rounded">Accessory</span></div>
                    </div>
                    <h3 className="text-sm font-medium text-[var(--paper)] mb-1 group-hover:text-[var(--crimson-muted)] transition-colors line-clamp-2">{katana.title}</h3>
                    {katana.series && <p className="text-xs text-[var(--mist)] mb-2">{katana.series}</p>}
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-medium text-[var(--paper)]">{formatPrice(katana.price)}</span>
                      <span className="text-xs text-[var(--stone)] line-through">{formatPrice(katana.originalPrice)}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
          {allAccessories.length > 0 && (
            <div className="mt-10 text-center">
              <Link href="/accessories" className="inline-flex items-center gap-3 px-8 py-4 border border-[var(--paper)]/30 text-sm tracking-widest uppercase text-[var(--paper)] hover:bg-[var(--paper)] hover:text-[var(--ink)] transition-colors duration-300">View All Accessories</Link>
            </div>
          )}
        </div>
      </section>

      {/* Genre Collections */}
      <section id="categories" className="py-12 bg-[var(--paper-warm)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-[var(--crimson)] mb-3">Explore by Category</p>
            <h2 className="text-4xl md:text-5xl text-[var(--ink)]" style={{ fontFamily: 'var(--font-heading)' }}>Curated Styles</h2>
          </div>
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl text-[var(--ink)]" style={{ fontFamily: 'var(--font-heading)' }}>Streetwear</h3>
              <Link href="/shop?genre=Dark+Fantasy" className="text-sm tracking-wider text-[var(--stone)] hover:text-[var(--ink)] transition-colors">View All</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {darkFantasyProduct?.map((manga, index) => (<ProductCard key={manga.id} product={manga} index={index} />))}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl text-[var(--ink)]" style={{ fontFamily: 'var(--font-heading)' }}>Casual</h3>
              <Link href="/shop?genre=Casual" className="text-sm tracking-wider text-[var(--stone)] hover:text-[var(--ink)] transition-colors">View All</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {horrorProduct?.map((manga, index) => (<ProductCard key={manga.id} product={manga} index={index} />))}
            </div>
          </div>
        </div>
      </section>

      {/* Genre Tags */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl text-[var(--ink)]" style={{ fontFamily: 'var(--font-heading)' }}>Browse by Category</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {allGenres?.map((genre, i) => (
              <motion.div key={genre} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Link href={`/shop?genre=${encodeURIComponent(genre)}`} className="inline-block px-6 py-3 border border-[var(--mist)] text-sm tracking-wider text-[var(--stone)] hover:border-[var(--ink)] hover:text-[var(--ink)] transition-colors duration-300">{genre}</Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 bg-[var(--ink)] text-[var(--paper)]">
        <div className="mx-auto max-w-3xl px-6 lg:px-12 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-xs tracking-[0.3em] uppercase text-[var(--crimson-muted)] mb-4">Stay Informed</p>
            <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Join the Club</h2>
            <p className="text-[var(--mist)] mb-10 max-w-lg mx-auto">Be the first to know when we add new pieces to our curated collection. No spam, just style.</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input type="email" placeholder="Your email" className="flex-1 px-6 py-4 bg-transparent border border-white/20 text-[var(--paper)] placeholder:text-[var(--stone)] focus:border-[var(--crimson-muted)] focus:outline-none transition-colors" />
              <button type="submit" className="px-8 py-4 bg-[var(--paper)] text-[var(--ink)] text-sm tracking-widest uppercase hover:bg-[var(--crimson)] hover:text-[var(--paper)] transition-colors duration-300">Subscribe</button>
            </form>
          </motion.div>
        </div>
      </section>
      </div>
    </div>
  );
}
