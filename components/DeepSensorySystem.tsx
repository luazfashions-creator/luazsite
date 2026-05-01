"use client";

import { motion } from "framer-motion";

const rows = [
  {
    label: "Origin",
    title: "Grown for stillness.",
    body:
      "Chamomile and linden blossom give the nervous system its first signal. We did not choose them for taste. We chose them for what they tell the body to do.",
    image: "/assets/chamomile.jpg"
  },
  {
    label: "Temperature",
    title: "Heat moves where sleep needs it.",
    body:
      "DEEP begins when core temperature descends. The thermal salt ritual helps the body move heat outward before sleep begins.",
    image: "/assets/lavenderbathsalt.jpg"
  },
  {
    label: "Touch",
    title: "The body listens through skin.",
    body:
      "Four drops of hemp oil. Circular motion. Ninety seconds. The sole of the foot becomes the input that starts the final descent.",
    image: "/assets/sandalwood.jpg"
  }
];

export function DeepSensorySystem() {
  return (
    <section className="bg-[var(--void)]">
      {rows.map((row, index) => (
        <div
          key={row.label}
          className="grid min-h-screen items-center gap-12 px-6 py-24 md:grid-cols-2 md:px-0 md:py-0"
        >
          <motion.div
            className={`relative min-h-[54vh] overflow-hidden md:min-h-screen ${
              index % 2 === 1 ? "md:order-2" : ""
            }`}
            initial={{ opacity: 0.72 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.2 }}
          >
            <img
              src={row.image}
              alt={`${row.label} ritual trigger`}
              className="absolute inset-0 h-full w-full object-cover saturate-[0.78]"
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(5,8,16,0.78)_100%)]" />
          </motion.div>

          <motion.div
            className="mx-auto max-w-[430px] text-center md:px-10"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="luaz-label">{row.label}</p>
            <h2 className="luaz-display mt-7">{row.title}</h2>
            <p className="luaz-body-copy mt-8">{row.body}</p>
          </motion.div>
        </div>
      ))}
    </section>
  );
}
