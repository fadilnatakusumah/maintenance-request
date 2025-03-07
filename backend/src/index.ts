import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import "dotenv/config";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/typeDefs";

interface MyContext {
  token?: String;
}

async function startServer() {
  const server = new ApolloServer<MyContext>({ typeDefs, resolvers });

  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ token: req.headers.token }),

    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at ${url}`);
}

startServer();
