import Link from "next/link";

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7] text-luaz-text pt-32 pb-24 px-6 font-light">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-xs uppercase tracking-widest text-luaz-gold-soft hover:text-luaz-text transition-colors mb-12 block">
          &larr; Zurück zur Startseite
        </Link>
        <h1 className="font-serif text-4xl mb-12">Impressum</h1>
        <div className="prose prose-sm md:prose-base prose-stone max-w-none text-luaz-text/80 leading-relaxed">
          <p className="mb-6">Angaben gemäß § 5 TMG:</p>
          <p className="mb-6">
            <strong>LUAZ UG</strong><br/>
            Borgfelder Strasse 20<br/>
            28215 Bremen<br/>
            Deutschland
          </p>
          <p className="mb-6">
            <strong>Vertreten durch:</strong><br/>
            Geschäftsführung der LUAZ UG
          </p>
          <p className="mb-6">
            <strong>Registereintrag:</strong><br/>
            Eintragung im Handelsregister.<br/>
            Registergericht: Amtsgericht Bremen<br/>
            Registernummer: HRB42229B
          </p>
          <p className="mb-6">
            <strong>Kontakt:</strong><br/>
            Telefon: 01704189358<br/>
            E-Mail: hello@luazwellness.de
          </p>
          <p className="mt-12 text-sm text-luaz-text-muted">
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </div>
      </div>
    </main>
  );
}
