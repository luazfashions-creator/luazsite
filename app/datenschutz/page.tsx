import Link from "next/link";

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7] text-luaz-text pt-32 pb-24 px-6 font-light">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-xs uppercase tracking-widest text-luaz-gold-soft hover:text-luaz-text transition-colors mb-12 block">
          &larr; Zurück zur Startseite
        </Link>
        <h1 className="font-serif text-4xl mb-12">Datenschutzerklärung</h1>
        <div className="prose prose-sm md:prose-base prose-stone max-w-none text-luaz-text/80 leading-relaxed">
          <h2 className="text-xl font-medium text-luaz-text mt-8 mb-4">1. Datenschutz auf einen Blick</h2>
          <p className="mb-6">
            Allgemeine Hinweise: Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
          </p>
          
          <h2 className="text-xl font-medium text-luaz-text mt-8 mb-4">2. Allgemeine Hinweise und Pflichtinformationen</h2>
          <p className="mb-6">
            <strong>Verantwortliche Stelle:</strong><br/>
            LUAZ UG<br/>
            Borgfelder Strasse 20<br/>
            28215 Bremen<br/>
            Deutschland<br/>
            Telefon: 01704189358
          </p>
          
          <h2 className="text-xl font-medium text-luaz-text mt-8 mb-4">3. Datenerfassung auf dieser Website</h2>
          <p className="mb-6">
            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie bei einer Bestellung oder im WhatsApp Circle eingeben.
          </p>
          <p className="mb-6">
            Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
          </p>
          
          <h2 className="text-xl font-medium text-luaz-text mt-8 mb-4">4. SSL- bzw. TLS-Verschlüsselung</h2>
          <p className="mb-6">
            Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung.
          </p>
        </div>
      </div>
    </main>
  );
}
