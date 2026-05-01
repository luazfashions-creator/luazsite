import { motion } from "framer-motion";

export default function SleepTestSection() {
  return (
    <section id="test" className="py-32 bg-[#050505] px-4">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mx-auto liquid-glass rounded-3xl p-12 md:p-20 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
        
        <div className="relative z-10">
          <p className="text-white/40 uppercase tracking-[0.3em] text-xs font-medium mb-6">
            Assessment
          </p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-6">
            Find your evening pattern.
          </h2>
          <p className="text-white/60 font-light mb-12 max-w-md mx-auto leading-relaxed">
            Answer a few questions and get your ritual.
          </p>
          <button className="liquid-glass-strong px-8 py-4 rounded-full text-white text-sm font-medium tracking-wide hover:bg-white/10 transition-colors w-full sm:w-auto">
            Take Your Sleep Test
          </button>
        </div>
      </motion.div>
    </section>
  );
}
