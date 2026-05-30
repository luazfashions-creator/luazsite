import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type SignalData = {
  id: number;
  eyebrow: string;
  title: string;
  description: string;
  science: string;
  media: string;
  mediaSide: "left" | "right";
};

const signals: SignalData[] = [
  {
    id: 1,
    eyebrow: "01 / Signal",
    title: "Chamomile Tea",
    description:
      "The ritual opens with warmth. A quiet visual cue that tells the body the day is beginning to close.",
    science: "Apigenin, a bioflavonoid in chamomile, binds to GABA receptors in the brain to actively reduce anxiety and initiate the sleep cycle.",
    media: "/chamomilevideo.mp4",
    mediaSide: "left"
  },
  {
    id: 2,
    eyebrow: "02 / Warmth",
    title: "Bath Salt",
    description:
      "Minerals, heat, and stillness create a deliberate descent from activity into recovery.",
    science: "Transdermal magnesium absorption relaxes muscles, while the rapid post-bath drop in core body temperature mimics the circadian sleep trigger.",
    media: "/bathsalt.mp4",
    mediaSide: "right"
  },
  {
    id: 3,
    eyebrow: "03 / Scent",
    title: "Essential Oil",
    description: "A repeated scent that becomes part of your sleep memory.",
    science: "Inhalation of pure lavender extract has been shown to increase slow-wave (deep) sleep and lower heart rate during the night.",
    media: "/essential_oil.mp4",
    mediaSide: "left"
  },
  {
    id: 4,
    eyebrow: "04 / Comfort",
    title: "Hemp Socks",
    description:
      "The final layer of warmth. Soft pressure and comfort close the ritual without noise.",
    science: "Warming the extremities causes vasodilation, redirecting heat from the core to the skin, which signals the brain that it's time to sleep.",
    media: "/hempsocks.mp4",
    mediaSide: "right"
  }
];

function SignalVideo({ signal }: { signal: SignalData }) {
  return (
    <div className="theme-media relative mx-auto aspect-[0.92/1] h-[50svh] min-h-[300px] w-full max-w-[430px] overflow-hidden rounded-[10px] border border-white/[0.12] bg-white/[0.04] shadow-[0_42px_150px_rgba(0,0,0,0.42)] sm:h-[56svh] md:h-[68svh] md:max-h-[680px] md:max-w-[560px]">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
      >
        <source src={signal.media} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,0.05)_55%,rgba(0,0,0,0.2))] mix-blend-multiply" />
      <div className="absolute inset-[10px] rounded-[7px] border border-black/10" />
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] uppercase tracking-[0.24em] font-medium text-black/80 md:bottom-5 md:left-5 md:right-5">
        <span>LUAZ</span>
        <span>{signal.eyebrow.split(" / ")[1]}</span>
      </div>
    </div>
  );
}

function SignalCopy({ signal }: { signal: SignalData }) {
  return (
    <div className="mx-auto max-w-[520px] text-center md:mx-0 md:text-left">
      <p className="mb-4 text-[10px] uppercase tracking-[0.36em] font-medium text-black/40 md:text-[11px]">
        {signal.eyebrow}
      </p>
      <h2 className="text-[2.65rem] font-light leading-[0.9] tracking-tight text-black sm:text-6xl md:text-7xl lg:text-[5.8rem]">
        {signal.title}
      </h2>
      <p className="mx-auto mt-5 max-w-[28rem] text-sm font-light leading-6 text-black/70 md:mx-0 md:mt-7 md:text-base md:leading-7">
        {signal.description}
      </p>
      
      <div className="mx-auto mt-6 flex max-w-[26rem] items-start gap-3 rounded-xl border border-black/5 bg-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.02)] p-4 text-left md:mx-0 md:mt-8 backdrop-blur-md">
        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-black/40" />
        <p className="text-[12px] font-light leading-relaxed text-black/70 md:text-[13px]">
          <span className="font-medium tracking-wide text-black/90">Clinical Science — </span>
          {signal.science}
        </p>
      </div>

      <div className="mx-auto mt-8 h-px w-32 bg-gradient-to-r from-transparent via-black/10 to-transparent md:mx-0 md:w-44" />
    </div>
  );
}

function SignalChapter({ signal }: { signal: SignalData }) {
  const chapterRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: chapterRef,
    offset: ["start end", "end start"]
  });

  const mediaScale = useTransform(scrollYProgress, [0, 0.45, 1], [0.96, 1.035, 0.98]);
  const mediaY = useTransform(scrollYProgress, [0, 0.5, 1], [34, 0, -26]);
  const copyY = useTransform(scrollYProgress, [0, 0.48, 1], [22, 0, -18]);
  const haloOpacity = useTransform(scrollYProgress, [0, 0.38, 0.74, 1], [0, 0.44, 0.34, 0]);

  const media = (
    <motion.div
      style={{ scale: mediaScale, y: mediaY, willChange: "transform" }}
      className="relative z-10"
    >
      <SignalVideo signal={signal} />
    </motion.div>
  );

  const copy = (
    <motion.div
      style={{ y: copyY, willChange: "transform" }}
      className="relative z-10"
    >
      <SignalCopy signal={signal} />
    </motion.div>
  );

  return (
    <section
      ref={chapterRef}
      className="theme-section relative grid min-h-[100svh] overflow-hidden px-4 py-24 sm:px-6 md:px-8"
    >
      <div className="theme-section-bg pointer-events-none absolute inset-0" />
      <motion.div
        style={{ opacity: haloOpacity }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[56vmin] w-[56vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,178,142,0.15),transparent_68%)] blur-2xl mix-blend-multiply"
      />

      <div
        className={`relative mx-auto grid w-full max-w-[1320px] items-center gap-8 self-center md:grid-cols-[0.94fr_1.06fr] md:gap-12 lg:gap-16 ${
          signal.mediaSide === "right" ? "md:grid-cols-[1.06fr_0.94fr]" : ""
        }`}
      >
        {signal.mediaSide === "left" ? (
          <>
            {media}
            {copy}
          </>
        ) : (
          <>
            {copy}
            {media}
          </>
        )}
      </div>
    </section>
  );
}

export default function RitualWindowsSection() {
  return (
    <section id="inside" className="theme-section">
      {signals.map((signal) => (
        <SignalChapter key={signal.id} signal={signal} />
      ))}
    </section>
  );
}
