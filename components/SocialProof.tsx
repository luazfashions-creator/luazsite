import { motion } from "framer-motion";

const quotes = [
  { text: "I didn’t need another app. I needed a ritual." },
  { text: "The experience feels intentional." },
  { text: "It’s simple, but it changes the evening." }
];

export default function SocialProof() {
  return (
    <section className="py-32 bg-[#050505] px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {quotes.map((quote, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="liquid-glass rounded-2xl p-10 flex flex-col justify-center min-h-[240px]"
          >
            <p className="text-xl md:text-2xl font-light text-white/80 leading-relaxed italic">
              &quot;{quote.text}&quot;
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
