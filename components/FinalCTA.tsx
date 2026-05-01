import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="py-32 bg-[#050505] px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-5xl md:text-7xl font-light tracking-tight text-white mb-12">
          Begin your evening differently.
        </h2>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button className="bg-white text-black px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-white/90 transition-colors w-full sm:w-auto">
            Buy Ritual Now
          </button>
          <button className="liquid-glass-strong px-8 py-4 rounded-full text-white text-sm font-medium tracking-wide hover:bg-white/10 transition-colors w-full sm:w-auto">
            Take Your Sleep Test
          </button>
        </div>
      </motion.div>
    </section>
  );
}
