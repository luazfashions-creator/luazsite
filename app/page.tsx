"use client";

import { Scene0_Opening } from "@/components/scenes/Scene0_Opening";
import { Scene1_Assembly } from "@/components/scenes/Scene1_Assembly";
import { Scene4_Stories } from "@/components/scenes/Scene4_Stories";
import { products } from "@/lib/products";

export default function Page() {
  return (
    <main>
      <Scene0_Opening />
      <Scene1_Assembly products={products} />
      <Scene4_Stories products={products} />
    </main>
  );
}
