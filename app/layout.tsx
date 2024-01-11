"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/redux/provider";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "react-hot-toast";
const metadata: Metadata = {
  title: "Omnileadz",
  description: "Your Growth Our Success",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {/* <Toaster position="top-right" /> */}
          <div className="">{children}</div>
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
