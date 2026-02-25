import type { Metadata } from "next";
import { Inter, Playfair_Display, REM } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const rem = REM({
  variable: "--font-rem",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mi Agencia | Tours Uyuni - Salar de Uyuni, Bolivia",
  description: "Tours al Salar de Uyuni. Experiencias únicas, alojamiento cómodo y transporte seguro. Reserva tu aventura en Bolivia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${playfair.variable} ${rem.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
