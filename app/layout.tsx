import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import Script from "next/script";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--cormorant",
  display: "swap"
});

export const metadata: Metadata = {
  title: "LUAZ — Instantly Calms You Down",
  description:
    "A cinematic luxury wellness ritual told through image, typography, and scroll."
};

const stripExtensionHydrationNoise = `
(() => {
  const attributeName = "bis_skin_checked";
  const stripAttribute = (root = document) => {
    root.querySelectorAll?.("[" + attributeName + "]").forEach((node) => {
      node.removeAttribute(attributeName);
    });
  };

  stripAttribute();

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes" && mutation.attributeName === attributeName) {
        mutation.target.removeAttribute(attributeName);
      }

      mutation.addedNodes.forEach((node) => {
        if (node.nodeType !== 1) return;
        const element = node;
        if (element.hasAttribute?.(attributeName)) {
          element.removeAttribute(attributeName);
        }
        stripAttribute(element);
      });
    });
  });

  observer.observe(document.documentElement, {
    attributeFilter: [attributeName],
    attributes: true,
    childList: true,
    subtree: true
  });

  window.setTimeout(() => observer.disconnect(), 5000);
})();
`;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${cormorant.variable} font-body antialiased`}
      >
        <Script
          id="strip-extension-hydration-noise"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: stripExtensionHydrationNoise }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
