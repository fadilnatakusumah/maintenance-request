import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

import { ApolloProvider } from "@/graphql/ApolloProvider";
import { StoreProvider } from "@/store/Provider";
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
        <StoreProvider>
          <ApolloProvider>
            {children}
            <ToastContainer />
          </ApolloProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
