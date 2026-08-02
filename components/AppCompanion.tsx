"use client";

import { motion } from "framer-motion";

export function AppCompanion() {
  return (
    <section id="whatsapp-circle" className="relative overflow-hidden bg-[linear-gradient(180deg,#f5f3ef_0%,#ebe7df_100%)] px-6 py-32 border-t border-[rgba(29,29,31,0.06)] text-luaz-text">
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
            LUAZ WHATSAPP CIRCLE
          </p>
          <h2 className="mb-6 font-serif text-4xl leading-tight md:text-5xl lg:text-6xl drop-shadow-sm">
            Werde Teil unseres inneren Kreises.
          </h2>
          <p className="mb-6 font-light leading-relaxed text-luaz-text/90 text-base md:text-lg">
            Tritt dem LUAZ WhatsApp Circle bei, um exklusive Vorteile, persönliche Empfehlungen und frühzeitigen Zugang zu erhalten. Das physische Ritual bereitet den Körper vor — unser Circle begleitet dich auf der Reise zu besserem Schlaf.
          </p>

          <a href="https://wa.me/491704189358" target="_blank" rel="noopener noreferrer" className="self-start inline-flex rounded-full bg-luaz-card border border-[rgba(29,29,31,0.12)] shadow-sm px-8 py-4 text-sm font-medium text-luaz-text transition-all hover:bg-luaz-bg hover:shadow-md mb-4">
            WhatsApp öffnen
          </a>
          <span className="text-xs text-luaz-text-muted">Jederzeit kündbar. Keine versteckten Kosten.</span>
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
          <div className="absolute top-0 left-1/2 h-6 w-32 -translate-x-1/2 rounded-b-3xl bg-luaz-stone/80 shadow-inner z-10" />
          
          <div className="flex h-full w-full flex-col px-4 py-12 pt-16 relative">
            <h3 className="text-center font-cursive text-3xl text-luaz-text/80 tracking-wide mb-8 opacity-80">Luaz Circle</h3>
            
            <div className="flex-1 flex flex-col justify-end pb-8 gap-4">
              
              {/* Message 1 (Incoming) */}
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="self-start max-w-[85%] rounded-[20px] rounded-bl-sm border border-[rgba(29,29,31,0.06)] bg-[rgba(255,255,255,0.85)] p-4 shadow-sm backdrop-blur-md"
              >
                <p className="text-[11px] leading-relaxed text-luaz-text/90">
                  Willkommen im LUAZ Circle! ✨<br/><br/>Dein Ritual beginnt jetzt. Wir freuen uns, dich auf der Reise zu ruhigeren Abenden zu begleiten.
                </p>
                <span className="text-[8px] text-luaz-text-muted mt-2 block text-right">18:42</span>
              </motion.div>

              {/* Message 2 (Outgoing) */}
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.6 }}
                className="self-end max-w-[85%] rounded-[20px] rounded-br-sm border border-luaz-stone/30 bg-[#e6e2d8] p-4 shadow-sm backdrop-blur-md"
              >
                <p className="text-[11px] leading-relaxed text-luaz-text/90">
                  Vielen Dank! Ich freue mich auf die exklusiven Tipps. 🤍
                </p>
                <span className="text-[8px] text-luaz-text-muted mt-2 flex justify-end items-center gap-1">
                  18:45
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-luaz-gold-soft opacity-80"><path d="M20 6L9 17l-5-5"></path></svg>
                </span>
              </motion.div>

              {/* Message 3 (Incoming) */}
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 2.4 }}
                className="self-start max-w-[85%] rounded-[20px] rounded-bl-sm border border-[rgba(29,29,31,0.06)] bg-[rgba(255,255,255,0.85)] p-4 shadow-sm backdrop-blur-md"
              >
                <p className="mb-2 text-[9px] uppercase tracking-[0.1em] text-luaz-gold-soft font-medium">Exklusiver Vorteil</p>
                <p className="text-[11px] leading-relaxed text-luaz-text/90">
                  Hier ist deine erste Empfehlung für heute Abend. Nimm dir 5 Minuten Zeit für dich.
                </p>
                <span className="text-[8px] text-luaz-text-muted mt-2 block text-right">18:46</span>
              </motion.div>

            </div>

            {/* Input Bar */}
            <div className="w-full h-10 rounded-full border border-[rgba(29,29,31,0.06)] bg-[rgba(255,255,255,0.6)] flex items-center px-4 backdrop-blur-md">
              <span className="text-[10px] text-luaz-text-muted/60">Nachricht schreiben...</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
