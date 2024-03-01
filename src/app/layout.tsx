
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppName, description } from "@/lib/Constant";
 

const inter = Inter({ subsets: ["latin","cyrillic-ext"] });

export const metadata: Metadata = {
  title: AppName,
  description: description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     
        <body className={inter.className}>{children}</body>
   
    </html>
  );
}
