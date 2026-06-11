"use client";

import { useState } from "react";
import { createCheckout } from "@/app/actions";

export function CheckoutButton({ variantId, className, children }: { variantId: string, className?: string, children?: React.ReactNode }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const url = await createCheckout(variantId);
      window.location.href = url;
    } catch (e) {
      console.error(e);
      alert("Failed to create checkout");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`relative overflow-hidden rounded-full px-8 py-3 text-sm font-medium uppercase tracking-widest transition-all ${className} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity hover:opacity-100" />
      <span className="relative z-10">{loading ? "Processing..." : (children || "Acquire the Kit")}</span>
    </button>
  );
}
