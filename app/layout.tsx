import type { Metadata } from "next";
import "./globals.css";
import { NAME, DESCRIPTION } from "@/lib/constants";
import { inter } from "@/lib/fonts";

export const metadata: Metadata = {
  title: NAME,
  description: DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={inter.className}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
