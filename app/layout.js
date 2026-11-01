import "./globals.css";

export const metadata = {
  title: "AURA NECTAR | Artisanal Pure Raw Honey & Living Apiary",
  description:
    "Experience raw, single-origin mountain nectar untouched by heat or industrial filtration. Real-time 3D interactive hive experience, single-batch laboratory purity certificates, and living apiary stories.",
  keywords: [
    "Raw Honey",
    "Artisanal Honey",
    "Single Origin Nectar",
    "Organic Bee Honey",
    "Manuka",
    "Wildflower Honey",
    "Living Apiary",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-full flex flex-col bg-[#0a0703] text-[#fbf6ed] antialiased selection:bg-amber-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
