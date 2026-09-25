import type { Metadata } from "next";
import Navbar from "./components/Navbar";
//import Footer from "./components/Footer";
import { PlanProvider } from "./context/PlanContext";
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
      <body>
  <PlanProvider>
    <Navbar />
    {children}
   
  </PlanProvider>
</body>
    </html>
  );
}