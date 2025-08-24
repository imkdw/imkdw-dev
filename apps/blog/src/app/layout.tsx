import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "@imkdw-dev/blog",
  description: "Personal blog by @imkdw-dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
