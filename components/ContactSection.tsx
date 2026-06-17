"use client";

import { motion } from "framer-motion";

export function ContactSection() {
  return (
    <section id="contact" className="bg-luaz-bg-soft px-6 py-32 text-luaz-text border-t border-luaz-border">
      <div className="mx-auto max-w-3xl text-center">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-xs uppercase tracking-[0.35em] text-luaz-gold-soft"
        >
          Kontakt
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-6 font-serif text-5xl md:text-6xl lg:text-7xl text-luaz-text"
        >
          Bereit f&uuml;r dein erstes Ritual?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-8 text-luaz-text-muted leading-relaxed max-w-lg mx-auto"
        >
          F&uuml;r Fragen, Kooperationen oder pers&ouml;nliche Bestellberatung.
        </motion.p>
      </div>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="mx-auto mt-16 max-w-2xl space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2 text-[10px] uppercase tracking-[0.2em] text-luaz-text-muted">Name</label>
            <input 
              type="text" 
              id="name" 
              className="w-full border-b border-luaz-border bg-transparent py-3 text-luaz-text focus:border-luaz-gold-soft focus:outline-none transition-colors"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 text-[10px] uppercase tracking-[0.2em] text-luaz-text-muted">E-Mail</label>
            <input 
              type="email" 
              id="email" 
              className="w-full border-b border-luaz-border bg-transparent py-3 text-luaz-text focus:border-luaz-gold-soft focus:outline-none transition-colors"
            />
          </div>
        </div>
        
        <div className="flex flex-col pt-4">
          <label htmlFor="message" className="mb-2 text-[10px] uppercase tracking-[0.2em] text-luaz-text-muted">Nachricht</label>
          <textarea 
            id="message" 
            rows={4}
            className="w-full border-b border-luaz-border bg-transparent py-3 text-luaz-text focus:border-luaz-gold-soft focus:outline-none transition-colors resize-none"
          ></textarea>
        </div>

        <div className="pt-8 text-center">
          <button 
            type="button" 
            className="border border-luaz-border bg-luaz-card px-12 py-4 text-[11px] uppercase tracking-[0.2em] text-luaz-text transition-all hover:bg-luaz-stone hover:border-luaz-stone"
          >
            Nachricht senden
          </button>
        </div>
      </motion.form>
    </section>
  );
}
