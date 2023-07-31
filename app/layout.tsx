import "../styles/globals.scss";
import type { Metadata } from "next";
import SearchInput from "@/components/SearchInput";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mercado Libre",
  description:
    "Comprá productos con Envío Gratis en el día en Mercado Libre Argentina. Encontrá miles de marcas y productos a precios increíbles.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <main className={"main-layout " + inter.className}>
            <div className="meli-bar"></div>
            <section className="search-layout">
              <SearchInput />
            </section>
            <section className="children-layout">{children}</section>
          </main>
        </body>
      </html>
    </>
  );
}
