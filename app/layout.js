import "./globals.css";

export const metadata = {
  title: "Example | 3D Animated Honey Showcase",
  description:
    "Experience raw, single-origin mountain honey untouched by heat or industrial filtration. Interactive 3D honey flacon, living apiary visuals, and natural honey harvesting.",
  keywords: [
    "Example Honey",
    "Raw Honey",
    "Artisanal Honey",
    "3D Honey Showcase",
    "Organic Bee Honey",
    "Wildflower Honey",
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
