import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-200`}>
        <header>
          <div className=" max-h-12 bg-[#0f354a] text-white py-3 px-8 w-full fixed x-0 y-0 flex justify-start items-center z-50">
            <Link href="/" className="text-md sm:text-xl md:text-xl">
              {" "}
              <b>MergeAI</b> Insights
            </Link>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
