"use client";

import { motion } from "framer-motion";

export function AppCompanion() {
  return (
    <section id="app-companion" className="relative overflow-hidden bg-[linear-gradient(180deg,#f5f3ef_0%,#ebe7df_100%)] px-6 py-32 border-t border-[rgba(29,29,31,0.06)] text-luaz-text">
      <div className="mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="flex flex-col justify-center"
        >
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.25em] text-luaz-gold-soft">
            LUAZ DIGITAL COMPANION
          </p>
          <h2 className="mb-6 font-serif text-4xl leading-tight md:text-5xl lg:text-6xl drop-shadow-sm">
            A calmer night continues inside the app.
          </h2>
          <p className="mb-6 font-light leading-relaxed text-luaz-text/90 text-base md:text-lg">
            Every LUAZ box comes with access to a guided digital companion. Inside, calming sleep music, breathing exercises, and simple evening movements help you move from stimulation into stillness.
          </p>
          <p className="mb-10 font-serif italic text-lg md:text-xl text-luaz-text/80">
            The physical ritual prepares the body. The digital companion quiets the mind.
          </p>
          <a href="#contact" className="self-start inline-flex rounded-full bg-luaz-card border border-[rgba(29,29,31,0.12)] shadow-sm px-8 py-4 text-sm font-medium text-luaz-text transition-all hover:bg-luaz-bg hover:shadow-md mb-4">
            Explore the Companion
          </a>
          <span className="text-xs text-luaz-text-muted">Included with every LUAZ ritual box.</span>
        </motion.div>

        {/* Right Content: Premium CSS Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          className="relative mx-auto flex h-[640px] w-full max-w-[320px] flex-col overflow-hidden rounded-[40px] border-[6px] border-luaz-stone/60 bg-[linear-gradient(180deg,#ebe7df_0%,#d8d3ca_100%)] shadow-[0_32px_80px_rgba(70,60,45,0.15)] ring-1 ring-[rgba(29,29,31,0.05)]"
        >
          {/* Phone Top Notch */}
          <div className="absolute top-0 left-1/2 h-6 w-32 -translate-x-1/2 rounded-b-3xl bg-luaz-stone/80 shadow-inner" />
          
          <div className="flex h-full w-full flex-col px-5 py-12 pt-16">
            <h3 className="text-center font-cursive text-3xl text-luaz-text/80 tracking-wide mb-8 opacity-80">Luaz</h3>
            
            {/* Music Player */}
            <div className="mb-6 w-full rounded-[20px] border border-[rgba(29,29,31,0.06)] bg-[rgba(255,255,255,0.72)] p-5 shadow-sm backdrop-blur-md">
              <p className="mb-1 text-[9px] uppercase tracking-[0.2em] text-luaz-text-muted">Sleep Music</p>
              <h4 className="mb-4 font-serif text-lg text-luaz-text">Deep Sleep Soundscape</h4>
              <p className="text-[10px] text-luaz-text-muted/80 mb-4 leading-relaxed">Soft soundscapes created for the final minutes before bed.</p>
              <div className="mb-3 h-[2px] w-full overflow-hidden rounded-full bg-luaz-border">
                <div className="h-full w-1/3 bg-luaz-text/40" />
              </div>
              <div className="mx-auto h-10 w-10 rounded-full border border-luaz-border flex items-center justify-center bg-white/50">
                <div className="ml-1 h-3 w-3 border-y-[5px] border-l-[7px] border-y-transparent border-l-luaz-text/60" />
              </div>
            </div>

            {/* Breathing Circle */}
            <div className="mb-4 w-full rounded-[20px] border border-[rgba(29,29,31,0.06)] bg-[rgba(255,255,255,0.72)] p-5 shadow-sm backdrop-blur-md flex items-center justify-between">
              <div>
                <p className="mb-1 text-[9px] uppercase tracking-[0.2em] text-luaz-text-muted">Breathing</p>
                <h4 className="font-serif text-[17px] text-luaz-text mb-1">4 · 7 · 8</h4>
                <p className="text-[9px] text-luaz-text-muted/80 leading-relaxed max-w-[120px]">Simple guided breathing to reduce mental noise.</p>
              </div>
              <div className="h-12 w-12 rounded-full border border-luaz-border/60 bg-white/40 shadow-inner flex items-center justify-center shrink-0">
                <div className="h-5 w-5 rounded-full bg-luaz-text/10" />
              </div>
            </div>

            {/* Movement */}
            <div className="w-full rounded-[20px] border border-[rgba(29,29,31,0.06)] bg-[rgba(255,255,255,0.72)] p-5 shadow-sm backdrop-blur-md flex items-center justify-between">
              <div>
                <p className="mb-1 text-[9px] uppercase tracking-[0.2em] text-luaz-text-muted">Movement</p>
                <h4 className="font-serif text-[17px] text-luaz-text mb-1">Evening Reset</h4>
                <p className="text-[9px] text-luaz-text-muted/80 leading-relaxed max-w-[120px]">Light stretches to release the day.</p>
              </div>
              <span className="text-xs font-light text-luaz-text-muted shrink-0 bg-white/40 px-3 py-1 rounded-full border border-luaz-border/50">5 min</span>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
