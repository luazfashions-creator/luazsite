import { getWellnessKitVariant } from "@/app/actions";
import Image from "next/image";

export async function AcquireKitSection() {
  const kit = await getWellnessKitVariant();

  if (!kit) {
    return null;
  }

  return (
    <section id="acquire" className="relative w-full py-24 md:py-32 px-6 bg-[#faf9f7] overflow-hidden border-t border-[rgba(29,29,31,0.06)]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
        
        {/* Left Side: Product Image */}
        <div className="w-full md:w-1/2 relative aspect-square md:aspect-[4/5] rounded-[32px] overflow-hidden bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-[rgba(29,29,31,0.06)]">
          <Image 
            src="/images/box_closed.png" 
            alt="LUAZ Das vollständige Ritual Box" 
            fill 
            className="object-cover object-center saturate-[1.05]" 
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Right Side: Sales Content */}
        <div className="w-full md:w-1/2 flex flex-col text-left">
          <div className="mb-8">
            <span className="text-[10px] tracking-[0.25em] font-medium uppercase text-luaz-gold-soft mb-3 block">Deine Abendroutine</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-luaz-text mb-6 font-medium tracking-tight">Das vollständige Ritual</h2>
            <p className="text-base md:text-lg text-luaz-text/80 leading-relaxed font-light">
              Alles, was dein Abend braucht — vereint in einer Box. Entwickelt, um dein Nervensystem gezielt herunterzufahren und dich auf einen tiefen, ungestörten Schlaf vorzubereiten.
            </p>
          </div>
          
          {/* Bullet Points */}
          <ul className="flex flex-col gap-4 mb-10">
            {[
              "Himalaya-Badesalz für körperliche Entspannung",
              "Ätherisches Öl zur Beruhigung der Sinne",
              "Keramik-Diffuser für die perfekte Atmosphäre",
              "Bio-Kamillentee für den inneren Frieden",
              "Hanfsocken für wohlige Wärme",
              "Exklusiver App-Zugang für geführte Rituale"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-sm md:text-base text-luaz-text/90">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-luaz-gold-soft/20 flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-luaz-gold-soft">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="font-light">{item}</span>
              </li>
            ))}
          </ul>

          {/* CTA & Trust Badges */}
          <div className="flex flex-col items-start">
            <a 
              href="https://checkout.luazwellness.de/checkouts/cn/hWNDIVYdS7dJ5dm7y4xGFk4k/en-de?_r=AQABKBX447KgasZWV3bqaoAuwzHZvCpy_04sF02voiHjD8Q"
              className="relative overflow-hidden rounded-full px-10 py-5 text-sm md:text-base font-medium tracking-wide transition-all bg-luaz-text text-white hover:bg-luaz-text/90 hover:shadow-xl hover:-translate-y-0.5 w-full md:w-auto text-center"
            >
              Jetzt bestellen — &euro;{kit.price.amount} inkl. Versand
            </a>
            
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[11px] md:text-xs text-luaz-text-muted/80 font-light">
              <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-green-500"></span> 30-Tage-Rückgabe</span>
              <span>&middot;</span>
              <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-green-500"></span> Versand in 2 Werktagen</span>
              <span>&middot;</span>
              <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-luaz-gold-soft"></span> Zutaten aus dem Himalaya</span>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
