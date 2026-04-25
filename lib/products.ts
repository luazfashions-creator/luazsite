export type LuazProduct = {
  id: number;
  name: string;
  subtitle: string;
  story: string;
  cue: string;
  windowNote: string;
  image: string;
  video: string | null;
  accentColor: string;
  finalX: string;
  finalY: string;
  finalRotate: number;
  staggerStart: number;
};

export const products: LuazProduct[] = [
  {
    id: 1,
    name: "Hemp Socks",
    subtitle: "Grounded Comfort",
    story:
      "Every thread pulled from earth. Worn as a daily ritual of care for what carries you.",
    cue: "Grounding touch",
    windowNote:
      "The closing layer of the ritual, worn when the room is already quiet and the body is ready to settle.",
    image: "/hempsocks.webp",
    video: null,
    accentColor: "#C8BFB0",
    finalX: "-38vw",
    finalY: "-12vh",
    finalRotate: -8,
    staggerStart: 0.05
  },
  {
    id: 2,
    name: "Lavender Oil",
    subtitle: "Distilled Silence",
    story:
      "The Provençal field at dusk, captured in a single drop. Applied behind the ear before sleep.",
    cue: "Scent memory",
    windowNote:
      "A soft aromatic marker repeated until calm becomes familiar and the night begins to feel remembered.",
    image: "/chamomile.jpg",
    video: null,
    accentColor: "#C9C0D3",
    finalX: "-18vw",
    finalY: "-22vh",
    finalRotate: -3,
    staggerStart: 0.12
  },
  {
    id: 3,
    name: "Bath Salt",
    subtitle: "Ancient Minerals",
    story:
      "Formed over millennia. Dissolved in minutes. The body remembers what it was.",
    cue: "Mineral release",
    windowNote:
      "A dissolving window where the pace leaves the body and the evening turns physical rather than mental.",
    image: "/bath_salt3.jpeg",
    video: null,
    accentColor: "#D4CEC6",
    finalX: "0vw",
    finalY: "-28vh",
    finalRotate: 0,
    staggerStart: 0.2
  },
  {
    id: 4,
    name: "Chamomile Tea",
    subtitle: "The Ceremony of Stillness",
    story: "Not a drink. A practice. Steep for four minutes. Breathe. Begin.",
    cue: "Warm beginning",
    windowNote:
      "The internal threshold of the ritual, taken slowly so the final hour starts from within rather than around you.",
    image: "/chamomile.jpg",
    video: "/chamomilevideo.mp4",
    accentColor: "#D6C99A",
    finalX: "18vw",
    finalY: "-22vh",
    finalRotate: 4,
    staggerStart: 0.28
  },
  {
    id: 5,
    name: "Chamomile Essential Oil",
    subtitle: "Quiet Botanical Signal",
    story:
      "A concentrated chamomile note for the bedside. The last aromatic cue before the room goes still.",
    cue: "Floral sleep signal",
    windowNote:
      "A softer botanical signal that lets the room hold the ritual after the tea has gone quiet.",
    image: "/lavender_essential_oil.jpeg",
    video: null,
    accentColor: "#D8C88F",
    finalX: "38vw",
    finalY: "-12vh",
    finalRotate: 9,
    staggerStart: 0.36
  }
];
