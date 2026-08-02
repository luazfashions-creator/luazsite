"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ScratchCardSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isOpen, setIsOpen] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [hasStartedScratching, setHasStartedScratching] = useState(false);
  
  const isDrawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const rafId = useRef<number | null>(null);

  // Initialize session state on mount and trigger popup
  useEffect(() => {
    setIsMounted(true);
    if (sessionStorage.getItem("luaz_scratch_done") !== "true") {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2500); // 2.5 second delay before popup appears
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("luaz_scratch_done", "true");
  };

  // Set up canvas when popup opens
  useEffect(() => {
    if (!isOpen || isRevealed || !isMounted) return;

    // Small delay to ensure the modal DOM is fully rendered before measuring
    const setupTimer = setTimeout(() => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      const rect = container.getBoundingClientRect();
      // Increase resolution for retina displays
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      // Fill with premium gold foil gradient
      const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      gradient.addColorStop(0, "#dfb56b");
      gradient.addColorStop(0.5, "#c1964d");
      gradient.addColorStop(1, "#f8deb0");

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Add subtle noise texture
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        if (Math.random() > 0.5) {
          const noise = (Math.random() - 0.5) * 20;
          data[i] = Math.min(255, Math.max(0, data[i] + noise));
          data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
          data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
        }
      }
      ctx.putImageData(imgData, 0, 0);

      // Reset scale after putImageData
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Draw Embossed Text
      ctx.font = "800 36px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.letterSpacing = "1px";

      // Dark shadow
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillText("HIER RUBBELN", rect.width / 2 + 1, rect.height / 2 + 2);

      // Light highlight
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.fillText("HIER RUBBELN", rect.width / 2 - 1, rect.height / 2 - 1);

      // Main Text
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.fillText("HIER RUBBELN", rect.width / 2, rect.height / 2);
    }, 100);

    return () => clearTimeout(setupTimer);
  }, [isOpen, isRevealed, isMounted]);

  // Handle scratching
  const getMousePos = (e: React.PointerEvent<HTMLCanvasElement> | PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 150; // Brush size

    if (lastPos.current) {
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, 75, 0, Math.PI * 2);
      ctx.fill();
    }

    lastPos.current = { x, y };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isRevealed) return;
    isDrawing.current = true;
    setHasStartedScratching(true);
    const { x, y } = getMousePos(e);
    scratch(x, y);
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || isRevealed) return;
    
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      const { x, y } = getMousePos(e);
      scratch(x, y);
    });
  };

  const checkRevealProgress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    let clearedPixels = 0;
    
    const step = 4 * 4; 
    const totalPixels = data.length / step;

    for (let i = 0; i < data.length; i += step) {
      if (data[i + 3] < 128) {
        clearedPixels++;
      }
    }

    const clearedPercentage = clearedPixels / totalPixels;
    if (clearedPercentage > 0.20) {
      setIsRevealed(true);
      sessionStorage.setItem("luaz_scratch_done", "true");
    }
  }, []);

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    lastPos.current = null;
    (e.target as HTMLCanvasElement).releasePointerCapture(e.pointerId);
    
    checkRevealProgress();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("LUAZ40");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const bypassScratch = () => {
    setIsRevealed(true);
    sessionStorage.setItem("luaz_scratch_done", "true");
  };

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Popup Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[500px] bg-luaz-bg rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center p-8 md:p-10 border border-white/20"
          >
            {/* Close Button */}
            <button 
              onClick={handleClose} 
              className="absolute top-4 right-4 p-2 text-luaz-text/40 hover:text-luaz-text transition-colors focus:outline-none"
              aria-label="Schließen"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {/* Text Header */}
            <div className="text-center mb-8 mt-2">
              <span className="text-[10px] tracking-[0.25em] font-medium uppercase text-luaz-gold-soft mb-4 block">
                Ein Geschenk für dich
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-luaz-text leading-[1.1] mb-4">
                Rubbel, um dein Geschenk<br/>zu entdecken.
              </h2>
              <p className="text-luaz-text/70 text-sm md:text-base font-light">
                Unter der Oberfläche wartet ein ruhigerer Abend.
              </p>
            </div>

            {/* Scratch Card Area */}
            <div 
              ref={containerRef}
              className="relative w-full aspect-[4/3] shadow-lg rounded-2xl overflow-hidden bg-white border border-[rgba(29,29,31,0.06)]"
            >
              
              {/* Hidden Reward Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center" aria-hidden={!isRevealed}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center"
                >
                  <span className="font-serif italic text-xl md:text-2xl text-luaz-gold-soft mb-2">40% Rabatt</span>
                  <div className="text-3xl md:text-5xl font-medium tracking-widest text-luaz-text mb-3 mt-1">
                    LUAZ40
                  </div>
                  <p className="text-[10px] md:text-xs text-luaz-text/60 uppercase tracking-[0.2em] mb-1">
                    Code im Checkout verwenden
                  </p>
                  <p className="text-[9px] md:text-[10px] text-luaz-text/40">
                    Nur für kurze Zeit.
                  </p>
                </motion.div>
              </div>

              {/* Scratch Canvas Overlay */}
              <AnimatePresence>
                {!isRevealed && (
                  <motion.canvas
                    ref={canvasRef}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 w-full h-full z-10 cursor-crosshair touch-none"
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    aria-label="Rubbelkarte. Mit der Maus oder dem Finger freirubbeln."
                  />
                )}
              </AnimatePresence>

            </div>

            {/* Actions (Appear after reveal) */}
            <div className="mt-8 h-[48px] flex items-center justify-center w-full">
              <AnimatePresence mode="wait">
                {!isRevealed ? (
                  <motion.button
                    key="bypass"
                    onClick={bypassScratch}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hasStartedScratching ? 0 : 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-luaz-text/50 underline underline-offset-4 hover:text-luaz-text transition-colors focus:outline-none focus:ring-2 focus:ring-luaz-gold-soft rounded-sm"
                    tabIndex={0}
                  >
                    Geschenk anzeigen
                  </motion.button>
                ) : (
                  <motion.div
                    key="actions"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex flex-row items-center gap-3 w-full"
                  >
                    <button 
                      onClick={handleCopy}
                      className="flex-1 flex justify-center rounded-full bg-luaz-text px-6 py-3 text-xs font-medium text-white transition-all hover:bg-black shadow-lg shadow-black/10"
                    >
                      {isCopied ? "Kopiert ✓" : "Code kopieren"}
                    </button>
                    <button 
                      onClick={handleClose} 
                      className="flex-1 flex justify-center rounded-full bg-transparent border border-luaz-text/20 px-6 py-3 text-xs font-medium text-luaz-text transition-all hover:border-luaz-text/50"
                    >
                      Schließen & Entdecken
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
