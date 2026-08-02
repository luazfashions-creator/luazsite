"use client";

import { motion } from "framer-motion";

const reviews = [
  {
    name: "Sarah M.",
    time: "vor 2 Stunden",
    title: "Das beste Abendritual",
    text: "Zum ersten Mal hatte ich das Gefühl, dass mein Abend wirklich einen Anfang hat. Die Qualität der Box hat meine Erwartungen weit übertroffen. Jedes Detail ist durchdacht und unglaublich hochwertig.",
    verified: true
  },
  {
    name: "Elena K.",
    time: "vor 5 Stunden",
    title: "Wunderschönes Geschenk",
    text: "Die Box sieht wunderschön aus, aber wichtiger ist, wie ruhig sich das Ritual anfühlt. Ein perfektes Geschenk für sich selbst oder andere. Der Tee schmeckt himmlisch und das Badesalz entspannt sofort.",
    verified: true
  },
  {
    name: "Julia R.",
    time: "vor 8 Stunden",
    title: "Hilft sofort beim Abschalten",
    text: "Nach einem langen Arbeitstag hilft mir LUAZ dabei, nicht einfach nur ins Bett zu fallen. Ich schlafe viel friedlicher und wache am nächsten Morgen erholter auf.",
    verified: true
  },
  {
    name: "Marina S.",
    time: "vor 12 Stunden",
    title: "Ein vollständiger Übergang",
    text: "Das Bad, der Duft und der Tee fühlen sich nicht wie einzelne Produkte an, sondern wie ein vollständiger Übergang in die Nacht. Es ist genau das, was mir gefehlt hat.",
    verified: true
  },
  {
    name: "Sophie W.",
    time: "vor 1 Tag",
    title: "Sehr hochwertig",
    text: "Eine der wenigen Wellness-Boxen, die sich wirklich durchdacht und absolut premium anfühlt. Jeden Cent wert. Ich werde sie definitiv nachbestellen.",
    verified: true
  },
  {
    name: "Laura B.",
    time: "vor 1 Tag",
    title: "Ich schlafe anders ein",
    text: "Ich schlafe nicht unbedingt früher, aber ich schlafe anders ein. Viel friedlicher. Die geführten Atemübungen im digitalen Begleiter sind eine riesige Hilfe.",
    verified: true
  },
  {
    name: "Clara T.",
    time: "vor 2 Tagen",
    title: "Echte Entspannung",
    text: "Man merkt sofort, wie viel Liebe und Expertise in diesem Produkt steckt. Mein Nervensystem fährt sofort herunter, wenn ich den Duft des Roll-Ons rieche.",
    verified: true
  },
  {
    name: "Mia H.",
    time: "vor 2 Tagen",
    title: "Einfach magisch",
    text: "Schnelle Lieferung, fantastische Produkte. Ich habe die Box ausprobiert und mich sofort in das Konzept verliebt. Sehr zu empfehlen für jeden, der Stress abbauen möchte!",
    verified: true
  }
];

function StarRating() {
  return (
    <div className="flex gap-[2px] mb-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="w-[18px] h-[18px] md:w-[22px] md:h-[22px] bg-[#00b67a] flex items-center justify-center rounded-[2px]">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-[10px] h-[10px] md:w-[12px] md:h-[12px]">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
      ))}
    </div>
  );
}

export function TestimonialSection() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#faf9f7] border-t border-[rgba(29,29,31,0.06)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Summary */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <h2 className="font-serif text-3xl md:text-5xl text-luaz-text mb-4 font-medium tracking-tight">Hervorragend</h2>
          <StarRating />
          <p className="text-sm md:text-base text-luaz-text/70 mt-2 font-light">
            Bewertet mit <strong className="text-luaz-text font-medium">4.9</strong> / 5 basierend auf echten Erfahrungen.
          </p>
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {reviews.map((review, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white p-6 md:p-8 rounded-xl border border-[rgba(29,29,31,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300"
            >
              <StarRating />
              
              <div className="flex items-center gap-1.5 mb-3 text-[11px] text-luaz-text-muted">
                <span className="font-semibold text-luaz-text">{review.name}</span>
                <span>, {review.time}</span>
              </div>
              
              <h3 className="font-bold text-luaz-text mb-2 text-sm">{review.title}</h3>
              
              <p className="text-luaz-text/80 text-[13px] leading-relaxed font-light">
                {review.text}
              </p>
              
              {review.verified && (
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-luaz-text-muted/70 mt-6 pt-4 border-t border-[rgba(29,29,31,0.04)]">
                  <div className="w-[14px] h-[14px] rounded-full bg-black/5 flex items-center justify-center">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-luaz-text">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  Verifizierte Käuferin
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
