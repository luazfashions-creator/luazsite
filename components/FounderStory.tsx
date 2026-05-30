import { existsSync } from "node:fs";
import path from "node:path";
import { FounderStoryClient } from "@/components/FounderStoryClient";

// Place the final Himalaya photograph at public/images/founder-himalaya.jpg.
// The runtime path must remain /images/founder-himalaya.jpg.
const HIMALAYA_IMAGE_SRC = "/images/founder-himalaya.jpg";

export function FounderStory() {
  const hasHimalayaImage = existsSync(
    path.join(process.cwd(), "public", "images", "founder-himalaya.jpg")
  );

  return (
    <FounderStoryClient
      hasImage={hasHimalayaImage}
      imageSrc={HIMALAYA_IMAGE_SRC}
    />
  );
}
