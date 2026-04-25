"use client";

import { motion } from "framer-motion";
import { products, LuazProduct } from "@/data/products";
import { ProductWindow } from "./ProductWindow";

type ProductWindowsSectionProps = {
  onOpenProduct: (product: LuazProduct) => void;
};

export function ProductWindowsSection({ onOpenProduct }: ProductWindowsSectionProps) {
  return (
    <section id="objects" className="relative bg-luaz-void px-5 py-28 md:px-8 md:py-40">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#eaf0ec,#f6f7f2_38%,#d8e4df)]" />
      <div className="relative mx-auto max-w-[1540px]">
        <motion.div
          className="mb-20 grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-end"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-18%" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <p className="text-[12px] uppercase text-luaz-herb">Five windows</p>
            <h2 className="mt-5 max-w-[720px] font-display text-[4.5rem] leading-[0.9] text-luaz-paper md:text-[7.4rem]">
              The ritual lives in the objects.
            </h2>
          </div>
          <p className="max-w-[520px] text-[16px] leading-8 text-luaz-mist/62 md:justify-self-end">
            Not separate products. A controlled sequence for the final hour,
            held in materials that make calm visible before it becomes sleep.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-6 md:gap-5 lg:gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={
                index === 0
                  ? "md:col-span-2"
                  : index === 1
                    ? "md:col-span-2 md:translate-y-16"
                    : index === 2
                      ? "md:col-span-2"
                      : index === 3
                        ? "md:col-span-3 md:translate-y-10"
                        : "md:col-span-3"
              }
            >
              <ProductWindow product={product} index={index} onOpen={onOpenProduct} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
