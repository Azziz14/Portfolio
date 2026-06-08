import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});



export const metadata: Metadata = {
  title: "Ashish Gupta — Software Engineer",
  description:
    "Portfolio of Ashish Gupta — IT undergraduate at CBIT, building scalable distributed systems, LLM-powered tools, and real-time trading engines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} style={{ background: "#121212" }}>
      <body className="min-h-[100dvh] flex flex-col bg-[#121212] overflow-x-hidden">{children}</body>
    </html>
  );
}
