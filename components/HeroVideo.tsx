import { motion } from "framer-motion";

export default function HeroVideo() {
  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Fallback dark background or actual video element */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="object-cover w-full h-full opacity-90"
        >
          <source src="/herovideo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#050505] z-10" />
      </div>

      <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-4xl mx-auto pt-20">
        <motion.h1 
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-white mb-6"
        >
          Calmness Before Sleep
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-white/70 font-light max-w-xl mx-auto mb-10 leading-relaxed"
        >
          A structured evening ritual designed to help your body slow down.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-12"
        >
          <button className="liquid-glass-strong px-8 py-4 rounded-full text-white text-sm font-medium tracking-wide hover:bg-white/10 transition-colors w-full sm:w-auto">
            Take Your Sleep Test
          </button>
          <button className="bg-white text-black px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-white/90 transition-colors w-full sm:w-auto">
            Buy Ritual Now
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="text-xs uppercase tracking-widest text-white/40"
        >
          5 minutes. Every evening.
        </motion.p>
      </div>
    </section>
  );
}
