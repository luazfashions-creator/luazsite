export function RitualBox({ className = "" }: { className?: string }) {
  return (
    <div className={`ritual-box rounded-[8px] ${className}`}>
      <img
        src="/assets/box_sample_front.jpeg"
        alt="LUAZ ritual box"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.96] saturate-[1.04]"
      />
      <div className="absolute inset-x-[10%] top-[12%] h-px bg-[#f2efe6]/22" />
      <div className="absolute inset-x-[10%] bottom-[12%] h-px bg-[#f2efe6]/16" />
      <div className="absolute left-[10%] top-[12%] h-[76%] w-px bg-[#f2efe6]/14" />
      <div className="absolute right-[10%] top-[12%] h-[76%] w-px bg-[#f2efe6]/14" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="font-display text-[4rem] leading-none text-[#f2efe6] md:text-[5.5rem]">
            LUAZ
          </div>
          <div className="mt-4 text-[11px] uppercase text-[#f2efe6]/68">
            evening ritual system
          </div>
        </div>
      </div>
      <div className="absolute bottom-5 left-5 right-5 flex justify-between text-[10px] uppercase text-[#f2efe6]/50">
        <span>01</span>
        <span>sleep architecture</span>
      </div>
    </div>
  );
}
