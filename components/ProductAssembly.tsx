"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";

const products = [
  { id: "01", name: "Bath Salt", role: "Warm water, minerals, and the first signal to slow down.", src: "/bath_salt.jpeg" },
  { id: "02", name: "Essential Oil", role: "A quiet aromatic anchor for the nervous system.", src: "/lavender_essential_oil.jpeg" },
  { id: "03", name: "Diffuser", role: "A soft atmosphere before sleep begins.", src: "/diffuser.jpg" },
  { id: "04", name: "Chamomile Tea", role: "A European evening herb with centuries of bedtime association.", src: "/chamomile.jpg" },
  { id: "05", name: "Warm Socks", role: "Foot warmth as the final physical signal for rest.", src: "/hempsocks.webp" },
];

function FloatingCard({ 
  product, 
  index, 
  progress 
}: { 
  product: typeof products[0], 
  index: number, 
  progress: MotionValue<number> 
}) {
  const layouts = [
    { x: "-28vw", y: -150 },
    { x: "28vw", y: -100 },
    { x: "0vw", y: 20 },
    { x: "-24vw", y: 180 },
    { x: "24vw", y: 140 },
  ];

  const layout = layouts[index];
  
  // Parallax effect based on scroll
  const yOffset = useTransform(progress, [0, 1], [layout.y + 120, layout.y - 120]);
  const opacity = useTransform(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);
  const scale = useTransform(progress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <motion.div
      style={{ x: layout.x, y: yOffset, opacity, scale }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative h-[320px] w-[220px] overflow-hidden rounded-[8px] bg-luaz-card shadow-[0_24px_80px_rgba(70,60,45,0.10)] border border-[rgba(29,29,31,0.10)]">
        <Image 
          src={product.src} 
          alt={product.name} 
          fill 
          className="object-cover opacity-90 transition-all duration-1000 ease-out hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luaz-bg/90 via-transparent to-transparent" />
        
        <div className="absolute bottom-5 left-5 right-5">
          <p className="mb-1 text-[9px] uppercase tracking-widest text-luaz-text-muted/80">{product.id} — {product.name}</p>
          <p className="text-[11px] text-luaz-text/90 leading-relaxed font-light">{product.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function ProductAssembly() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section id="products" ref={containerRef} className="relative min-h-[120vh] w-full overflow-hidden bg-luaz-bg px-6 py-32 text-luaz-text">
      
      {/* Mobile Stacked Layout */}
      <div className="md:hidden space-y-12 max-w-sm mx-auto pt-24">
        {products.map((p) => (
          <div key={p.id} className="relative h-[360px] w-full overflow-hidden rounded-[16px] border border-luaz-border bg-luaz-card shadow-lg">
            <Image src={p.src} alt={p.name} fill className="object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-luaz-bg/90 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="mb-2 text-[10px] uppercase tracking-widest text-luaz-text-muted">{p.id} — {p.name}</p>
              <p className="text-xs text-luaz-text/80 leading-relaxed">{p.role}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Floating Layout */}
      <div className="absolute inset-0 hidden md:block">
        {products.map((p, i) => (
          <FloatingCard key={p.id} product={p} index={i} progress={scrollYProgress} />
        ))}
      </div>

      {/* Central Header */}
      <div className="pointer-events-none sticky top-1/3 z-20 mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[10px] uppercase tracking-[0.35em] text-luaz-text-muted">LUAZ Ritual Objects</p>
          <h2 className="mt-4 font-serif text-5xl md:text-7xl text-luaz-text drop-shadow-sm">The Evening Assembly</h2>
          <p className="mx-auto mt-6 max-w-md text-sm text-luaz-text-muted leading-relaxed drop-shadow-sm">
            Five quiet objects arranged into one sleep ritual.
          </p>
        </motion.div>
      </div>

    </section>
  );
}
