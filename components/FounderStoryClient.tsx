"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const smoothEase = [0.22, 1, 0.36, 1];

export function FounderStoryClient() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageParallax = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section 
      id="founder-story"
      ref={containerRef}
      className="relative w-full overflow-hidden bg-luaz-bg text-luaz-text py-24 md:py-32 lg:py-0 lg:min-h-screen flex items-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="mx-auto max-w-[1400px] w-full flex flex-col lg:flex-row items-center justify-center lg:justify-between px-6 md:px-12 lg:px-20 gap-16 lg:gap-24 relative z-10">
        
        {/* Left Side: Image (First on mobile) */}
        <motion.div 
          className="relative w-full lg:w-1/2 h-[60vh] sm:h-[70vh] lg:h-[80vh] min-h-[450px] max-h-[800px] rounded-[16px] lg:rounded-[24px] overflow-hidden shadow-[0_40px_100px_rgba(70,60,45,0.12)] border border-[rgba(29,29,31,0.06)]"
          style={{ y: imageParallax }}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.4, ease: smoothEase }}
        >
          <motion.div
            className="w-full h-full relative"
            initial={{ scale: 1.08 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.4, ease: smoothEase }}
          >
            <Image 
              src="/images/founder.png" 
              alt="Founders of LUAZ from Himalayas to Europe"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </motion.div>
          {/* Subtle dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
        </motion.div>

        {/* Right Side: Text (Below on mobile) */}
        <motion.div 
          className="w-full lg:w-1/2 flex flex-col justify-center max-w-xl mx-auto lg:mx-0"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 50 },
              show: { opacity: 1, y: 0, transition: { duration: 1.4, ease: smoothEase } }
            }}
            className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.34em] text-luaz-gold-soft mb-6 lg:mb-8"
          >
            FOUNDER STORY
          </motion.p>
          
          <motion.h2 
            variants={{
              hidden: { opacity: 0, y: 50 },
              show: { opacity: 1, y: 0, transition: { duration: 1.4, ease: smoothEase } }
            }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.1] text-luaz-text mb-8 lg:mb-12"
          >
            From the Himalayas to European Nights
          </motion.h2>

          <div className="space-y-6 lg:space-y-8 text-luaz-text/70 font-light text-[15px] sm:text-[16px] lg:text-[17px] leading-relaxed">
            <motion.p variants={{
              hidden: { opacity: 0, y: 50 },
              show: { opacity: 1, y: 0, transition: { duration: 1.4, ease: smoothEase } }
            }}>
              LUAZ began as a search for quiet in a world that never stops. Between the mountains of Nepal and the pace of modern Europe, the idea became clear: sleep should not begin with a pill or an app, but with a ritual.
            </motion.p>
            
            <motion.p variants={{
              hidden: { opacity: 0, y: 50 },
              show: { opacity: 1, y: 0, transition: { duration: 1.4, ease: smoothEase } }
            }}>
              The founder journey connects origin, memory, and modern wellbeing - transforming simple evening objects into a premium sleep ritual designed for calm, warmth, and repetition.
            </motion.p>
          </div>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 50 },
              show: { opacity: 1, y: 0, transition: { duration: 1.4, ease: smoothEase } }
            }}
            className="mt-12 lg:mt-16 pt-8 border-t border-luaz-border"
          >
            <p className="text-[12px] sm:text-[13px] font-serif italic text-luaz-text/60 tracking-wide">
              A ritual carried from the mountains into the modern bedroom.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
