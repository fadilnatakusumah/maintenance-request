import { Providers } from "@/graphql/ApolloProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";

const inter = Inter({});

export const metadata: Metadata = {
  title: "Maintenance Request",
  description: "List of maintenance requests",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          {children}
          <ToastContainer  />
        </Providers>
      </body>
    </html>
  );
}
