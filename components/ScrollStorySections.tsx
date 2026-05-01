import { useRef } from "react";
import { MotionValue, motion, useScroll, useTransform } from "framer-motion";

const stories = [
  "Your body doesn’t switch off.\nIt transitions.",
  "Sleep doesn’t start in bed.\nIt starts before.",
  "Calmness is trained."
];

function StoryPanel({
  index,
  progress,
  text,
  total
}: {
  index: number;
  progress: MotionValue<number>;
  text: string;
  total: number;
}) {
  const segment = 1 / total;
  const start = index * segment;
  const fadeInEnd = start + segment * 0.22;
  const holdEnd = start + segment * 0.72;
  const end = Math.min(start + segment, 1);

  const firstPanel = index === 0;
  const lastPanel = index === total - 1;
  const opacity = useTransform(
    progress,
    firstPanel
      ? [start, holdEnd, end]
      : lastPanel
        ? [start, fadeInEnd, end]
        : [start, fadeInEnd, holdEnd, end],
    firstPanel
      ? [1, 1, 0]
      : lastPanel
        ? [0, 1, 1]
        : [0, 1, 1, 0]
  );
  const filter = useTransform(
    progress,
    firstPanel
      ? [start, holdEnd, end]
      : lastPanel
        ? [start, fadeInEnd, end]
        : [start, fadeInEnd, holdEnd, end],
    firstPanel
      ? ["blur(0px)", "blur(0px)", "blur(12px)"]
      : lastPanel
        ? ["blur(12px)", "blur(0px)", "blur(0px)"]
        : ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]
  );
  const y = useTransform(
    progress,
    firstPanel
      ? [start, holdEnd, end]
      : lastPanel
        ? [start, fadeInEnd, end]
        : [start, fadeInEnd, holdEnd, end],
    firstPanel
      ? [0, 0, -42]
      : lastPanel
        ? [42, 0, 0]
        : [42, 0, 0, -42]
  );
  const scale = useTransform(
    progress,
    [start, fadeInEnd, end],
    lastPanel ? [0.96, 1, 1] : [0.96, 1, 1.04]
  );

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4">
      <motion.h2 
        style={{ opacity, filter, y, scale }}
        className="theme-headline whitespace-pre-line text-center text-4xl font-light leading-[1.1] tracking-tight text-white md:text-6xl lg:text-8xl"
      >
        {text}
      </motion.h2>
    </div>
  );
}

export default function ScrollStorySections() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} id="science" className="theme-section relative h-[330vh] bg-[#050505]">
      <div className="sticky top-0 z-10 h-[100svh] min-h-[560px] overflow-hidden">
        {stories.map((story, idx) => (
          <StoryPanel
            key={story}
            index={idx}
            progress={scrollYProgress}
            text={story}
            total={stories.length}
          />
        ))}
      </div>
    </section>
  );
}
