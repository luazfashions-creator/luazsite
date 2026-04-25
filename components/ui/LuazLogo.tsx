import { forwardRef } from "react";
import type { CSSProperties } from "react";

type LuazLogoProps = {
  className?: string;
  style?: CSSProperties;
};

export const LuazLogo = forwardRef<HTMLDivElement, LuazLogoProps>(
  function LuazLogo({ className = "", style }, ref) {
    return (
      <div
        ref={ref}
        style={style}
        className={`font-heading font-light uppercase leading-none text-luaz-deep ${className}`}
      >
        LUAZ
      </div>
    );
  }
);
