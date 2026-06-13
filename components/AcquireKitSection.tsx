import { getWellnessKitVariant } from "@/app/actions";

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
      <a 
        href="https://checkout.luazwellness.de/checkouts/cn/hWNDIVYdS7dJ5dm7y4xGFk4k/en-de?_r=AQABKBX447KgasZWV3bqaoAuwzHZvCpy_04sF02voiHjD8Q"
        className="relative inline-block overflow-hidden rounded-full px-8 py-3 text-sm font-medium uppercase tracking-widest transition-all bg-luaz-text text-luaz-bg hover:bg-luaz-text/90"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity hover:opacity-100" />
        <span className="relative z-10">Acquire the Kit - {kit.price.amount} {kit.price.currencyCode}</span>
      </a>
    </section>
  );
}
