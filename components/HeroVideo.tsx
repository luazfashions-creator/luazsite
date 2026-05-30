import { motion } from "framer-motion";

export default function HeroVideo() {
  return (
    <section id="home" className="theme-section relative flex h-screen w-full items-end justify-start overflow-hidden">
      {/* Fallback dark background or actual video element */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="object-cover w-full h-full opacity-100"
        >
          <source src="/herovideo.mp4" type="video/mp4" />
        </video>
        <div 
          className="absolute inset-0 z-10" 
          style={{ background: 'linear-gradient(to top, var(--theme-page) 0%, transparent 30%)', opacity: 0.8 }}
        />
      </div>

      <div className="relative z-20 w-full flex flex-col items-start px-6 pb-[14vh] text-left sm:px-14 md:px-24 lg:px-32">
        <motion.h1 
          initial={{ opacity: 0, filter: "blur(12px)", y: 30 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 1.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 font-serif text-5xl font-light tracking-tight text-white md:text-7xl lg:text-[6.5rem] lg:leading-[1.1]"
        >
          Experience sleep<br />like never before.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 1.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 max-w-xl text-lg font-light leading-relaxed text-white/80 md:mb-12 md:text-xl"
        >
          A structured evening ritual designed to help your body slow down.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex flex-col items-start gap-5 sm:flex-row md:mb-14"
        >
          <button className="rounded-full border border-white/20 bg-black/10 px-9 py-4 text-[13px] font-medium uppercase tracking-[0.15em] text-white backdrop-blur-md transition-all duration-500 hover:bg-white/10 hover:border-white/40 w-full sm:w-auto">
            Take Your Sleep Test
          </button>
          <button className="rounded-full bg-white px-9 py-4 text-[13px] font-medium uppercase tracking-[0.15em] text-black transition-all duration-500 hover:bg-white/80 w-full sm:w-auto">
            Buy Ritual Now
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.2, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] uppercase tracking-[0.3em] text-white/50"
        >
          5 minutes. Every evening.
        </motion.p>
      </div>
    </section>
  );
}
