import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume Builder",
  description: "Create your AI-assisted resume in seconds",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
