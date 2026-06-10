import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "fksalink",
  description: "URL and browser session manager",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-gray-50 dark:bg-neutral-950 text-gray-900 dark:text-gray-100 antialiased">
        {children}
      </body>
    </html>
  );
}
