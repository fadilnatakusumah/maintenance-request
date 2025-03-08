// app/providers.tsx
"use client"; // Ensure this file is a client component

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./apollo-client";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
