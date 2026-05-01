export type LuazProduct = {
  id: string;
  name: string;
  shortLabel: string;
  conceptTitle: string;
  conceptBody: string;
  ritualRole: string;
  description: string;
  systemReason: string;
  note: string;
  image: string;
  video: string;
  tone: string;
  ctaLabel: string;
};

export const products: LuazProduct[] = [
  {
    id: "chamomile-tea",
    name: "Calming Tea",
    shortLabel: "signal",
    conceptTitle: "Slow down begins here.",
    conceptBody:
      "Chamomile and linden blossom give the body its first instruction: descend.",
    ritualRole: "THE SIGNAL. A warm beginning for the nervous system.",
    description:
      "Taken before the ritual, the tea creates a deliberate threshold between output and biological descent.",
    systemReason:
      "Apigenin binds to GABA receptors. The body receives the first chemical signal to go DEEP.",
    note: "Chamomile-led botanical infusion with linden blossom.",
    image: "/assets/chamomile.jpg",
    video: "/assets/chamomile.jpg",
    tone: "#cba23d",
    ctaLabel: "Begin with tea"
  },
  {
    id: "himalayan-bath-salt",
    name: "Thermal Bath Salt",
    shortLabel: "descent",
    conceptTitle: "Your body must cool to go DEEP.",
    conceptBody:
      "Warm water rises, core temperature falls, and the body begins its descent.",
    ritualRole: "THE DESCENT. Temperature becomes a biological instruction.",
    description:
      "Mineral texture and water create the second movement: physical decompression after activity.",
    systemReason:
      "Core temperature falls during DEEP onset. The bath salt accelerates that shift from the outside in.",
    note: "Thermal mineral salt blend.",
    image: "/assets/lavenderbathsalt.jpg",
    video: "/assets/lavenderbathsalt.jpg",
    tone: "#9a8cc2",
    ctaLabel: "Enter release"
  },
  {
    id: "hemp-oil-foot-ritual",
    name: "Hemp Oil Foot Ritual",
    shortLabel: "activation",
    conceptTitle: "The body listens through skin.",
    conceptBody:
      "Four drops. Circular motion. Ninety seconds. The nervous system registers the ritual.",
    ritualRole: "THE ACTIVATION. Touch begins the final descent.",
    description:
      "Cold-pressed hemp oil turns touch into a precise signal through the foot ritual.",
    systemReason:
      "The sole of the foot is nerve dense. The ritual uses that surface as a biological input.",
    note: "Cold-pressed hemp oil for foot ritual.",
    image: "/assets/sandalwood.jpg",
    video: "/assets/sandalwood.jpg",
    tone: "#4A7FD4",
    ctaLabel: "Begin activation"
  },
  {
    id: "hemp-socks",
    name: "Warm Hemp Socks",
    shortLabel: "lock",
    conceptTitle: "Heat moves where sleep needs it.",
    conceptBody:
      "Warm extremities tell the brain the core cooling gate is complete.",
    ritualRole: "THE LOCK. Warmth moves to the extremities.",
    description:
      "Soft hemp warmth locks the final physical condition before DEEP begins.",
    systemReason:
      "Warm extremities signal vasodilation and support the temperature drop required for DEEP.",
    note: "Soft hemp-rich knit.",
    image: "/assets/hempsocks.webp",
    video: "/assets/hempsocks.webp",
    tone: "#C9A96E",
    ctaLabel: "Lock the ritual"
  },
  {
    id: "ritual-sequence-card",
    name: "Ritual Sequence Card",
    shortLabel: "system",
    conceptTitle: "One sequence. Every night.",
    conceptBody:
      "The card connects every cue into one timed protocol the body can learn.",
    ritualRole: "THE SYSTEM. Not a suggestion. A protocol.",
    description:
      "A matte ritual card sets the exact sequence, timing, and order. The body learns the pattern.",
    systemReason:
      "Repetition turns the box from objects into a trigger. DEEP begins when the ritual begins.",
    note: "Matte-black sequence card.",
    image: "/assets/back_box_sample_1.png",
    video: "/assets/back_box_sample_1.png",
    tone: "#C8D4E8",
    ctaLabel: "Follow the system"
  }
];
