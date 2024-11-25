"use client";
import type { Metadata } from "next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
<<<<<<< Updated upstream
    <QueryClientProvider client={queryClient}>
      <html lang="en" data-theme="light">
        <body>{children}</body>
      </html>
    </QueryClientProvider>
=======
<QueryClientProvider client={queryClient}>
    <html lang="en" data-theme="light">
      <body>{children}</body>
    </html></QueryClientProvider>
>>>>>>> Stashed changes
  );
}
