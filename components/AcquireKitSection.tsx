import { getWellnessKitVariant } from "@/app/actions";
import { CheckoutButton } from "./CheckoutButton";

export async function AcquireKitSection() {
  const kit = await getWellnessKitVariant();

  if (!kit) {
    return null;
  }

  return (
    <section id="acquire" className="relative w-full py-32 px-6 flex flex-col items-center justify-center bg-luaz-stone/10 text-center">
      <h2 className="font-serif text-4xl mb-4 font-light">The Complete Sequence</h2>
      <p className="text-sm font-light text-luaz-text-muted max-w-md mx-auto mb-8 leading-relaxed">
        Everything you need for the perfect evening ritual. Enclosed in a single box.
      </p>
      <CheckoutButton variantId={kit.variantId} className="bg-luaz-text text-luaz-bg hover:bg-luaz-text/90">
        Acquire the Kit - {kit.price.amount} {kit.price.currencyCode}
      </CheckoutButton>
    </section>
  );
}
