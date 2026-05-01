import { motion } from "framer-motion";

export default function ContactForm() {
  return (
    <section className="py-24 bg-[#050505] px-4">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mx-auto liquid-glass rounded-3xl p-8 md:p-12 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        
        <form className="relative z-10 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input 
              type="text" 
              placeholder="Name" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input 
              type="tel" 
              placeholder="Phone (optional)" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
            />
            <div className="relative">
              <select defaultValue="" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-white/30 transition-colors cursor-pointer">
                <option value="" disabled className="text-black">Inquiry</option>
                <option value="pre-order" className="text-black">Pre-order</option>
                <option value="retail" className="text-black">Retail</option>
                <option value="press" className="text-black">Press</option>
                <option value="supplier" className="text-black">Supplier</option>
                <option value="other" className="text-black">Other</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-white/50">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <textarea 
            placeholder="Message" 
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none"
          />

          <button 
            type="button" 
            className="w-full liquid-glass-strong mt-2 py-4 rounded-xl text-white font-medium tracking-wide hover:bg-white/10 transition-colors"
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </section>
  );
}
