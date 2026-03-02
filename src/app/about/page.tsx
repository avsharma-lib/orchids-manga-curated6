'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-24 bg-[var(--paper)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl text-[var(--ink)] mb-12"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Curated for <br />
            <span className="text-[var(--crimson)] italic">Modern Style</span>
          </motion.h1>

          <motion.div variants={itemVariants} className="space-y-8 text-lg text-[var(--stone)] leading-relaxed">
            <p>
              Inkai was born from a simple observation: the world of fast fashion is vast, but true quality pieces are rare.
              We don&apos;t aim to provide everything. We aim to provide only what matters.
            </p>
            <p>
              Our collection is hand-selected. Each piece in our catalog has been chosen for its exceptional quality,
              groundbreaking design, and its contribution to modern style. From everyday essentials to
              statement pieces, we only carry clothing that demands to be worn.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-16 pt-16 border-t border-[var(--mist)]">
            <h2 className="text-2xl text-[var(--ink)] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Our Philosophy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h3 className="text-xs tracking-widest uppercase text-[var(--crimson)]">Quality Over Quantity</h3>
                <p className="text-sm text-[var(--stone)]">
                  A saturated market makes it hard to find genuine art. We filter through the noise so you don&apos;t have to.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xs tracking-widest uppercase text-[var(--crimson)]">Fashion as Art</h3>
                <p className="text-sm text-[var(--stone)]">
                  Clothing is more than functional. It is a sophisticated form of visual and personal expression. We treat it with the respect it deserves.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-24">
            <div className="relative aspect-[21/9] overflow-hidden grayscale contrast-125">
              <Image 
                src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2000&auto=format&fit=crop"
                alt="Modern Apparel"
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--paper)] via-transparent to-transparent" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
