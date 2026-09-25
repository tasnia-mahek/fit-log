import type { Metadata } from "next";
import Navbar from "./components/Navbar";
//import Footer from "./components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "FitLog",
  description: "Gym workout logger",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0b0c0e] text-white min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
      
      </body>
    </html>
  );
}