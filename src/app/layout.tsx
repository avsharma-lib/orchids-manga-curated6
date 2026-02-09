import type { Metadata } from "next";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cart-context";
import { ProductsProvider } from "@/lib/products-context";

export const metadata: Metadata = {
  title: "Inkai | Curated Manga for Serious Readers",
  description:
    "A premium manga e-commerce store offering curated collections for discerning readers. Quality over quantity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="2a47d37b-9ee1-436f-a523-d1a159358ad0"
        />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
          <CartProvider>
            <ProductsProvider>
              <Header />
              <main className="min-h-screen">{children}</main>
              <Footer />
            </ProductsProvider>
          </CartProvider>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
