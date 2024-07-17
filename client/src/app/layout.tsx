import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MergeAI Insights",
  description:
    "Website to view insights reports generated by MergeAI analytic tool",
  authors: [{ name: "Aditya Sahu", url: "ad2004sahu@gmail.com" }],
  keywords: ["MergeAI", "Insights", "Reports", "gitlab"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={`${inter.className} bg-gray-200`}>{children}</body>
    </html>
  );
}
