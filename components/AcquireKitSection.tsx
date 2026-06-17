import { getWellnessKitVariant } from "@/app/actions";

export async function AcquireKitSection() {
  const kit = await getWellnessKitVariant();

  if (!kit) {
    return null;
  }

  return (
    <section id="acquire" className="relative w-full py-32 px-6 flex flex-col items-center justify-center bg-luaz-stone/10 text-center">
      <h2 className="font-serif text-4xl mb-4 font-light">Das vollst&auml;ndige Ritual</h2>
      <p className="text-sm font-light text-luaz-text-muted max-w-md mx-auto mb-8 leading-relaxed">
        Alles, was dein Abend braucht &mdash; in einer Box. Himalaya-Badesalz &middot; &Auml;therisches &Ouml;l &middot; Keramik-Diffuser &middot; Bio-Kamillentee &middot; Hanfsocken &middot; App-Zugang
      </p>
      <a 
        href="https://checkout.luazwellness.de/checkouts/cn/hWNDIVYdS7dJ5dm7y4xGFk4k/en-de?_r=AQABKBX447KgasZWV3bqaoAuwzHZvCpy_04sF02voiHjD8Q"
        className="relative inline-block overflow-hidden rounded-full px-8 py-3 text-sm font-medium uppercase tracking-widest transition-all bg-luaz-text text-luaz-bg hover:bg-luaz-text/90"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity hover:opacity-100" />
        <span className="relative z-10">Jetzt bestellen &mdash; &euro;{kit.price.amount} inkl. Versand</span>
      </a>
      <p className="mt-4 text-[11px] text-luaz-text-muted/80 tracking-wide font-light">
        30-Tage-R&uuml;ckgabe &middot; Versand in 2 Werktagen &middot; Hergestellt mit Zutaten aus dem Himalaya
      </p>
    </section>
  );
}
