import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkinOps - Diagnostic Engine",
  description: "Men's Skin Performance Decision Engine - Clinical Decision Support System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="bg-hud-dark text-hud-text"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
