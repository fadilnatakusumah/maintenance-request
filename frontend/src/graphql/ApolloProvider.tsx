// app/providers.tsx
"use client"; // Ensure this file is a client component

import { ApolloProvider as Provider } from "@apollo/client";
import { apolloClient } from "./apollo-client";

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return <Provider client={apolloClient}>{children}</Provider>;
}
