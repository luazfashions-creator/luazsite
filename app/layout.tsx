import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap"
});

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

export const metadata: Metadata = {
  title: "LUAZ — Calmness before sleep.",
  description:
    "A structured evening ritual designed to help your body slow down.",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} font-sans antialiased bg-[#050505] text-white overflow-x-hidden`}
      >
        <script
          dangerouslySetInnerHTML={{ __html: stripExtensionHydrationNoise }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
