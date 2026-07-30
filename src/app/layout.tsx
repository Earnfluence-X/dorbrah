import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Bodoni_Moda, Jost } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/components/StoreProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DORBRAH FABRICS — Nigerian Ankara, Delivered Worldwide",
  description:
    "Maison-grade Nigerian Ankara wax prints, sold by the six-yard bundle in Naira and delivered from Lagos to every continent. Pay on delivery available.",
  metadataBase: new URL("https://dorbrahfabrics.example.com"),
  openGraph: {
    title: "DORBRAH FABRICS — Nigerian Ankara, Delivered Worldwide",
    description:
      "Maison-grade Nigerian Ankara wax prints, sold by the six-yard bundle and delivered worldwide from Lagos.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${bodoni.className} ${jost.className}`}>
      <body className="min-h-screen bg-porcelain text-ink">
        <StoreProvider>
          <Header />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
          <CartDrawer />
        </StoreProvider>
      </body>
    </html>
  );
}
