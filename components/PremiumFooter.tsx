"use client";

export function PremiumFooter() {
  return (
    <footer className="bg-luaz-bg border-t border-luaz-border px-6 py-16 md:py-24 text-luaz-text">
      <div className="mx-auto max-w-7xl flex flex-col items-center justify-between gap-12 md:flex-row md:items-end">
        
        {/* Brand */}
        <div className="text-center md:text-left">
          <h2 className="font-serif text-3xl italic tracking-wide text-luaz-text md:text-4xl">LUAZ</h2>
          <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-luaz-text-muted max-w-[240px] leading-relaxed">
            Das Einschlafritual. Aus dem Himalaya. F&uuml;r Deutschland.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-[10px] uppercase tracking-[0.25em] text-luaz-text-muted md:justify-end">
          <a href="#ritual" className="hover:text-luaz-text transition-colors">Ritual</a>
          <a href="#app-companion" className="hover:text-luaz-text transition-colors">App-Begleiter</a>
          <a href="#founder-story" className="hover:text-luaz-text transition-colors">Gr&uuml;ndergeschichte</a>
          <a href="#contact" className="hover:text-luaz-text transition-colors">Kontakt</a>
        </div>
        
      </div>
      
      {/* Copyright Line */}
      <div className="mx-auto mt-16 max-w-7xl border-t border-luaz-border pt-8 flex flex-col items-center justify-between gap-4 text-[9px] uppercase tracking-[0.2em] text-luaz-text-muted md:flex-row">
        <span>&copy; {new Date().getFullYear()} LUAZ. Alle Rechte vorbehalten.</span>
        <div className="flex gap-8">
          <a href="/versand" className="hover:text-luaz-text transition-colors">Versand & Rückgabe</a>
          <a href="/impressum" className="hover:text-luaz-text transition-colors">Impressum</a>
          <a href="/datenschutz" className="hover:text-luaz-text transition-colors">Datenschutz</a>
        </div>
      </div>
    </footer>
  );
}
