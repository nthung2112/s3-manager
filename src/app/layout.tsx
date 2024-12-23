import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "S3 Manager",
  description: "Manage your S3 buckets and objects",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold">S3 Manager</h1>
          </header>
          <main className="flex-1 container mx-auto p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
