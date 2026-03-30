import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import AIAssistant from "./components/ai-assistant"; // Import the component
import BackgroundAnimation from "./components/BackgroundAnimation"; // Import the glowing background
import VisitorCounter from "./components/visitor-counter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aravindhan S - Portfolio",
  description: "Full-Stack Developer & ML Enthusiast",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BackgroundAnimation />
        <VisitorCounter />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <AIAssistant /> {/* Add the component here */}
      </body>
    </html>
  );
}
