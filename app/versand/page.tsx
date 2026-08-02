import Link from "next/link";

export default function VersandPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7] text-luaz-text pt-32 pb-24 px-6 font-light">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-xs uppercase tracking-widest text-luaz-gold-soft hover:text-luaz-text transition-colors mb-12 block">
          &larr; Zurück zur Startseite
        </Link>
        <h1 className="font-serif text-4xl mb-12">Versand & Rückgabe</h1>
        <div className="prose prose-sm md:prose-base prose-stone max-w-none text-luaz-text/80 leading-relaxed">
          <h2 className="text-xl font-medium text-luaz-text mt-8 mb-4">Versandbedingungen</h2>
          <p className="mb-4">
            Wir liefern unsere LUAZ Rituale aktuell nach <strong>Deutschland</strong> und <strong>Österreich</strong>.
          </p>
          <p className="mb-4">
            <strong>Versandkosten:</strong><br/>
            Der Versand ist für dich komplett <strong>kostenlos</strong>, um dein Erlebnis so entspannt wie möglich zu beginnen.
          </p>
          <p className="mb-8">
            <strong>Lieferzeit:</strong><br/>
            Deine Box wird sorgfältig gepackt und ist in der Regel innerhalb von <strong>2 Werktagen</strong> bei dir.
          </p>
          
          <h2 className="text-xl font-medium text-luaz-text mt-12 mb-4">30-Tage-Rückgaberecht</h2>
          <p className="mb-4">
            Wir möchten, dass du dein LUAZ Ritual liebst. Falls du aus irgendeinem Grund nicht vollständig zufrieden bist, bieten wir dir ein unkompliziertes 30-Tage-Rückgaberecht an.
          </p>
          <p className="mb-4">
            Bitte kontaktiere uns unter <strong>hello@luazwellness.de</strong>, um eine Rücksendung zu initiieren. Die Rücksendekosten trägt der Käufer.
          </p>
        </div>
      </div>
    </main>
  );
}
