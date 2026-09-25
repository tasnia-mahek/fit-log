import type { Metadata } from "next";
import Navbar from "./components/Navbar";
//import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  <ToastContainer
    position="bottom-right"
    autoClose={2000}
    theme="dark"
  />
</PlanProvider>
</body>
    </html>
  );
}