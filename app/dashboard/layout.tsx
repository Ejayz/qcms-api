import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "2Track-QCMS",
  description: "Quality Control Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={` antialiased `} style={{
      backgroundImage: "url('/Img/4.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>{children}</body>
    </html>
  );
}
