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
    name: "Chamomile Tea",
    shortLabel: "slow down",
    conceptTitle: "Warmth lowers the volume.",
    conceptBody:
      "The first cue is held in the hands, tasted slowly, and allowed to mark the end of output.",
    ritualRole: "A warm beginning for the nervous system.",
    description:
      "The ritual opens internally: a quiet cup that creates a deliberate threshold between the day and the evening.",
    systemReason:
      "LUAZ uses tea as the first signal because warmth, repetition, and pace make the transition into rest feel physical before it feels mental.",
    note: "Chamomile-led botanical infusion.",
    image: "/assets/chamomile.jpg",
    video: "/assets/chamomile.jpg",
    tone: "#cba23d",
    ctaLabel: "Begin with tea"
  },
  {
    id: "himalayan-bath-salt",
    name: "Lavender Bath Salt",
    shortLabel: "release",
    conceptTitle: "Minerals turn release tactile.",
    conceptBody:
      "Water, salt, and lavender give the body a clear instruction: soften the pace.",
    ritualRole: "A sensory exhale for the body.",
    description:
      "Mineral texture, warm water, and stillness create the second movement: physical decompression after activity.",
    systemReason:
      "The bath salt exists to make release feel tangible, shifting the body from doing into receiving before the sleep environment is prepared.",
    note: "Lavender mineral salt blend.",
    image: "/assets/lavenderbathsalt.jpg",
    video: "/assets/lavenderbathsalt.jpg",
    tone: "#9a8cc2",
    ctaLabel: "Enter release"
  },
  {
    id: "essential-oil",
    name: "Sandalwood Essential Oil",
    shortLabel: "signal",
    conceptTitle: "Scent becomes memory.",
    conceptBody:
      "A precise aromatic mark repeats each night until the room itself starts to remember.",
    ritualRole: "Scent as a repeated cue for sleep.",
    description:
      "A precise aromatic mark that turns the ritual into memory, association, and a sensory instruction to slow down.",
    systemReason:
      "LUAZ treats scent as a quiet architecture: the same signal repeated each evening helps the mind recognize the sequence.",
    note: "Sandalwood aromatic concentrate.",
    image: "/assets/sandalwood.jpg",
    video: "/assets/sandalwood.jpg",
    tone: "#af725d",
    ctaLabel: "Set the signal"
  },
  {
    id: "diffuser",
    name: "Diffuser",
    shortLabel: "atmosphere",
    conceptTitle: "The room joins the ritual.",
    conceptBody:
      "A slow aromatic field makes the evening feel designed, not improvised.",
    ritualRole: "The room becomes part of the ritual.",
    description:
      "A slow atmospheric layer that extends the ritual outward, making the space feel softer, quieter, and sleep-ready.",
    systemReason:
      "The diffuser exists because rest is environmental. LUAZ prepares the room as carefully as it prepares the body.",
    note: "Evening diffusion object.",
    image: "/assets/diffuser.jpg",
    video: "/assets/diffuser.jpg",
    tone: "#6aa4ba",
    ctaLabel: "Shape atmosphere"
  },
  {
    id: "hemp-socks",
    name: "Hemp Socks",
    shortLabel: "warmth",
    conceptTitle: "Touch completes the descent.",
    conceptBody:
      "The final object is simple on purpose: grounded warmth, placed exactly at the end.",
    ritualRole: "The final tactile step before sleep.",
    description:
      "Grounding warmth and a softer physical boundary, placed at the end so the body receives a final cue of completion.",
    systemReason:
      "LUAZ completes the system with touch: a small material decision that turns intention into comfort.",
    note: "Soft hemp-rich knit.",
    image: "/assets/hempsocks.webp",
    video: "/assets/hempsocks.webp",
    tone: "#7f9a8a",
    ctaLabel: "Complete the ritual"
  }
];
