export function DeepFooter() {
  return (
    <footer className="bg-[var(--void)] px-6 py-20 text-center">
      <p className="font-body text-base font-medium tracking-[0.22em] text-[var(--ivory)]">
        LUAZ
      </p>
      <p className="mt-5 text-xs text-[var(--mist)]">The ritual for DEEP sleep.</p>
      <nav className="mt-10 flex flex-wrap justify-center gap-8 text-xs text-[var(--lunar)]">
        <a href="#ritual">Ritual</a>
        <a href="#app-companion">Companion</a>
        <a href="#founder-story">Founder Story</a>
        <a href="#contact">Contact</a>
      </nav>
      <p className="mt-10 text-[11px] text-[var(--mist)]">
        (c) 2026 LUAZ. All rights reserved.
      </p>
    </footer>
  );
}
