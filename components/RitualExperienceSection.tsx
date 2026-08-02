"use client";

import { useEffect, useRef, useState } from "react";
import type { VideoHTMLAttributes } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";

const products = [
  {
    id: "bath-salt",
    number: "1/5",
    sense: "BERÜHRUNG",
    title: "Himalaya-Badesalz",
    headline: "Berührung zieht eine Grenze.",
    shortLine: "Warm mineral water becomes the first signal that the day is ending.",
    overviewDescription: "Wärme entspannt den Körper und markiert den Übergang in den Abend.",
    ethos: "Warmwasserbäder gehören seit Generationen zur europäischen Abendkultur — als Übergang, nicht als Pflege.",
    logos: "LUAZ beginnt an den Füßen, weil der Körper dem Geist vorausgehen muss. Erst das Physische. Dann das Mentale.",
    pathos: "Himalaya-Salz aus dem Khumbu-Tal. Handverlesen. Mineralienreich. Der erste Kontakt mit dem warmen Wasser zieht eine stille Grenze — auf dieser Seite liegt der Tag, auf jener der Schlaf.",
    media: "/media/ritual/bath-salt.mp4",
    fallbackImage: "/media/products/bath-salt.webp",
    cta: "Weiter zum App-Begleiter",
    target: "#app-companion"
  },
  {
    id: "aroma",
    number: "2/5",
    sense: "GERUCH",
    title: "Ätherisches Öl",
    headline: "Duft macht den Raum zum Signal.",
    shortLine: "Aroma changes the atmosphere before the body lies down.",
    overviewDescription: "Ein beruhigender Duftimpuls für Ruhe, Atmung und Atmosphäre.",
    ethos: "Lavendel. Bergamotte. Zedernholz. Seit Jahrhunderten begleiten diese Pflanzen den Abend — in Apotheken, in Schlafzimmern, in Erinnerungen.",
    logos: "Der Duft verwandelt den Raum selbst in ein Einschlafsignal. Nicht du gehst ins Schlafzimmer — das Schlafzimmer empfängt dich.",
    pathos: "Täglich wiederholt, wird der Duft zur konditionierten Reaktion. Dein Nervensystem lernt: wenn dieser Geruch kommt, ist der Tag vorbei.",
    media: "/media/ritual/essential-oil.mp4",
    fallbackImage: "/media/products/essential-oil.webp",
    cta: "Weiter zum App-Begleiter",
    target: "#app-companion"
  },
  {
    id: "socks",
    number: "3/5",
    sense: "WÄRME",
    title: "Hanfsocken",
    headline: "Wärme schließt das Ritual.",
    shortLine: "The final step is not another product. It is the closing gesture.",
    overviewDescription: "Wärme an den Füßen unterstützt das Loslassen und körperliche Entspannen.",
    ethos: "Forschungen der Universität Basel zeigen: warme Füße verkürzen die Einschlafzeit messbar. Nicht als Folklore — als Physiologie.",
    logos: "Nach Wasser, Duft und Tee signalisieren die Socken dem Körper: es gibt nichts mehr zu tun. Das Thermoregulationssystem entspannt.",
    pathos: "Weich. Warm. Aus Fair-Trade-Hanf. Das einfachste Element des Rituals — und vielleicht das wirksamste.",
    media: "/media/ritual/socks.mp4",
    fallbackImage: "/media/products/socks.webp",
    cta: "Weiter zum App-Begleiter",
    target: "#app-companion"
  },
  {
    id: "chamomile-tea",
    number: "4/5",
    sense: "GESCHMACK",
    title: "Bio-Kamillentee",
    headline: "Geschmack erzwingt die Pause.",
    shortLine: "A warm cup separates the active day from the sleeping night.",
    overviewDescription: "Ein sanfter Abschluss des Tages, warm, leicht und beruhigend.",
    ethos: "Echte Kamille aus biologischem Anbau. Keine Teebeutel-Qualität — sondern der Geschmack, den du aus der Kindheit kennst.",
    logos: "In LUAZ ist der Tee kein Schlafmittel. Er ist eine Verhaltensunterbrechung — drei Minuten, in denen nichts anderes passiert. Nur der Dampf und deine Hände.",
    pathos: "Langsamkeit ist keine Romantisierung. Sie ist eine neurologische Notwendigkeit. Der Körper braucht Zeit, um aus dem Alarmmodus zu wechseln.",
    media: "/media/ritual/tea.mp4",
    fallbackImage: "/media/products/tea.webp",
    cta: "Weiter zum App-Begleiter",
    target: "#app-companion"
  },
  {
    id: "diffuser",
    number: "5/5",
    sense: "ATMOSPHÄRE",
    title: "Keramik-Diffuser",
    headline: "Ästhetik der Stille.",
    shortLine: "A silent guardian for your evening transition.",
    overviewDescription: "Der Raum wird stiller, weicher und auf Schlaf ausgerichtet.",
    ethos: "Handgefertigte Keramik, entworfen, um sich in die Architektur deines Schlafzimmers einzufügen, anstatt sie zu stören.",
    logos: "Der Diffuser vernebelt das Öl durch Ultraschall kalt, um die molekulare Struktur der ätherischen Essenzen zu erhalten. Maximale Wirkung. Minimales Geräusch.",
    pathos: "Ein sanftes Licht. Ein feiner Nebel. Wenn der Diffuser atmet, lernt der Raum, mit ihm zu atmen.",
    media: "/media/ritual/diffuser.mp4",
    fallbackImage: "/media/products/diffuser.webp",
    cta: "Weiter zum App-Begleiter",
    target: "#app-companion"
  }
];

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

interface VideoPlayerProps extends VideoHTMLAttributes<HTMLVideoElement> {
  isActive: boolean;
}

function VideoPlayer({ isActive, ...props }: VideoPlayerProps) {
  const ref = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (isActive && ref.current) {
      ref.current.play().catch(() => {});
    } else if (!isActive && ref.current) {
      ref.current.pause();
    }
  }, [isActive]);
  
  return <video ref={ref} {...props} />;
}

function GroupVideoReveal({
  scrollYProgress
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const start = 0.5;
  const fadeInPoint = 0.7;

  const opacity = useTransform(
    scrollYProgress, 
    [start, fadeInPoint], 
    [0, 1]
  );
  
  const y = useTransform(
    scrollYProgress,
    [start, fadeInPoint],
    [60, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [start, fadeInPoint],
    [0.9, 1]
  );

  const reducedMotion = useReducedMotion();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    return opacity.on("change", (latest) => {
      setIsActive(latest > 0.1);
    });
  }, [opacity]);

  return (
    <motion.div
      style={{ opacity, y, scale, willChange: "transform, opacity" }}
      className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none px-4"
    >
      <div className="text-center mb-10 md:mb-16">
        <p className="text-[10px] tracking-[0.3em] font-medium uppercase text-luaz-gold-soft mb-3">Die fünf Elemente</p>
        <h3 className="font-serif italic text-3xl md:text-5xl text-luaz-text drop-shadow-sm">Das Ritual</h3>
      </div>
      
      {/* Desktop Layout - Horizontal Staggered Row */}
      <div className="hidden md:flex flex-row justify-center items-start gap-4 lg:gap-8 w-full max-w-[1400px]">
        {products.map((product, i) => {
          const yOffset = i % 2 !== 0 ? "translate-y-12" : "translate-y-0";
          return (
            <div key={product.id} className={`w-[18%] flex flex-col transition-transform ${yOffset}`}>
               {/* Video Container */}
               <div className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden shadow-2xl border border-[rgba(29,29,31,0.08)] bg-luaz-stone mb-6 pointer-events-auto">
                 {reducedMotion ? (
                   <Image src={product.fallbackImage} alt={product.title} fill className="object-cover" />
                 ) : (
                   <VideoPlayer 
                     isActive={isActive} 
                     src={product.media} 
                     poster={product.fallbackImage} 
                     muted loop playsInline 
                     className="absolute inset-0 h-full w-full object-cover saturate-[1.05]" 
                   />
                 )}
               </div>
               {/* Text Container */}
               <div className="px-2 text-center pointer-events-auto">
                 <p className="text-[10px] tracking-[0.2em] font-medium uppercase text-luaz-gold-soft mb-2">Step {i + 1}</p>
                 <h4 className="font-serif text-lg text-luaz-text mb-3">{product.title}</h4>
                 <p className="text-[11px] leading-relaxed text-luaz-text/70">{product.overviewDescription}</p>
               </div>
            </div>
          )
        })}
      </div>

      {/* Mobile Layout - Premium Horizontal Scroll */}
      <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-4 w-[100vw] px-8 pb-8 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {products.map((product, i) => {
          return (
            <div key={product.id} className={`w-[75vw] flex-shrink-0 snap-center flex flex-col pointer-events-auto`}>
               {/* Video Container */}
               <div className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden shadow-2xl border border-[rgba(29,29,31,0.08)] bg-luaz-stone mb-5">
                 {reducedMotion ? (
                   <Image src={product.fallbackImage} alt={product.title} fill className="object-cover" />
                 ) : (
                   <VideoPlayer 
                     isActive={isActive} 
                     src={product.media} 
                     poster={product.fallbackImage} 
                     muted loop playsInline 
                     className="absolute inset-0 h-full w-full object-cover saturate-[1.05]" 
                   />
                 )}
               </div>
               {/* Text Container */}
               <div className="px-2 text-center">
                 <p className="text-[10px] tracking-[0.2em] font-medium uppercase text-luaz-gold-soft mb-2">Step {i + 1}</p>
                 <h4 className="font-serif text-[20px] leading-tight text-luaz-text mb-3">{product.title}</h4>
                 <p className="text-[12px] leading-relaxed text-luaz-text/70 px-4">{product.overviewDescription}</p>
               </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  );
}



export default function RitualExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Box opening animation mapped to 240vh total height
  const boxScale = useTransform(scrollYProgress, [0, 0.35], [0.65, 0.9]);
  const boxOpacity = useTransform(scrollYProgress, [0, 0.25, 0.4, 0.55], [1, 1, 1, 0]);
  const boxY = useTransform(scrollYProgress, [0, 0.35], [100, -20]);
  const boxRotateX = useTransform(scrollYProgress, [0, 0.35], [26, 8]);
  
  const textOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.25], [36, -20]);

  const lidRotateX = useTransform(scrollYProgress, [0.25, 0.4], [0, -118]);
  const lidY = useTransform(scrollYProgress, [0.25, 0.4], [0, -34]);
  const lidZ = useTransform(scrollYProgress, [0.25, 0.4], [0, -18]);

  const glowOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[240vh] bg-luaz-bg border-t border-black/5" id="ritual">
      <div className="perspective-[1200px] sticky top-0 flex h-[100svh] min-h-[560px] w-full flex-col items-center justify-center overflow-hidden bg-luaz-bg">
        
        {/* Intro Text */}
        <motion.div 
          style={{ opacity: textOpacity, y: textY, willChange: "transform, opacity" }}
          className="absolute top-[12%] z-30 w-full px-5 text-center sm:top-[15%] md:top-[20%]"
        >
          <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.4em] text-black/40 sm:text-[11px] md:mb-8 md:text-xs md:tracking-[0.5em]">
            Nach dem ersten Atemzug
          </p>
          <h2 className="mb-6 font-serif text-[2.8rem] font-light leading-none tracking-tight text-black sm:text-6xl md:mb-8 md:text-[5.5rem] lg:text-[7.5rem]">
            Beginnt das Ritual.
          </h2>
          <div className="mx-auto mt-8 h-16 w-[1px] bg-gradient-to-b from-black/10 to-transparent md:mt-12 md:h-24" />
        </motion.div>

        {/* Box Rig */}
        <motion.div 
          style={{ 
            scale: boxScale, 
            opacity: boxOpacity, 
            y: boxY,
            rotateX: boxRotateX,
            transformStyle: "preserve-3d",
            willChange: "transform, opacity"
          }}
          className="relative z-20 h-[68vw] min-h-[214px] max-h-[282px] w-[68vw] min-w-[214px] max-w-[282px] md:h-[350px] md:w-[350px] md:max-w-none pointer-events-none"
        >
          <div className="theme-media absolute inset-0 flex items-center justify-center overflow-hidden rounded-[18px] border border-black/5 bg-[#0a0a0a] shadow-[0_30px_80px_rgba(0,0,0,0.12)]">
            <Image 
              src="/images/box_open.png"
              alt="Box interior"
              fill
              className="object-cover opacity-80"
              sizes="(max-width: 768px) 68vw, 350px"
            />
            
            <motion.div 
              style={{ opacity: glowOpacity, willChange: "opacity" }}
              className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_70%)] blur-2xl"
            />
          </div>

          <motion.div 
            style={{ 
              rotateX: lidRotateX,
              y: lidY,
              z: lidZ,
              transformOrigin: "top",
              transformStyle: "preserve-3d",
              willChange: "transform"
            }}
            className="absolute inset-0 z-30"
          >
            <div className="theme-media relative flex h-full w-full items-center justify-center overflow-hidden rounded-[18px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-black/5 [backface-visibility:hidden]">
              <Image 
                src="/images/box_closed.png"
                alt="LUAZ Box"
                fill
                className="object-cover opacity-90 saturate-[1.2] brightness-[1.1]"
                sizes="(max-width: 768px) 68vw, 350px"
              />
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center rounded-[18px] border border-black/5 bg-[#f0f0f0] shadow-[inset_0_0_40px_rgba(0,0,0,0.03)]" style={{ transform: "rotateX(180deg)", backfaceVisibility: "hidden" }}>
            </div>
          </motion.div>
        </motion.div>

        {/* Group Reveal - All 5 Videos */}
        <GroupVideoReveal scrollYProgress={scrollYProgress} />

      </div>
    </section>
  );
}
