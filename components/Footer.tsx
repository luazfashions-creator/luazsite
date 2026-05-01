export default function Footer() {
  return (
    <footer className="theme-footer border-t border-white/5 bg-[#050505] px-8 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="theme-muted text-xs font-light tracking-widest text-white/40">
          © 2026 LUAZ
        </div>
        
        <div className="theme-muted flex items-center gap-8 text-xs font-light tracking-widest text-white/40">
          <a href="#" className="transition-colors hover:text-white">Privacy</a>
          <a href="#" className="transition-colors hover:text-white">Terms</a>
          <a href="#" className="transition-colors hover:text-white">Contact</a>
          <a href="#" className="transition-colors hover:text-white">Impressum</a>
        </div>
      </div>
    </footer>
  );
}
