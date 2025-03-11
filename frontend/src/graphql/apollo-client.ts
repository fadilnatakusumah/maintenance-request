import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { Kind, OperationTypeNode } from "graphql";

// HTTP connection to the API
const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql", // Adjust the URI as needed
});

// Create a WebSocket link for subscriptions using graphql-ws
const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/graphql", // Use ws:// for non-secure or wss:// for secure connections
  })
);

// Use split to direct operations to the correct link
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      // definition.kind === "OperationDefinition" &&
      definition.kind === Kind.OPERATION_DEFINITION &&
      definition.operation === OperationTypeNode.SUBSCRIPTION
    );
  },
  wsLink,
  httpLink
);

const createApolloClient = () => {
  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });
};

export const apolloClient = createApolloClient();
