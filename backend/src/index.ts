import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import cors from "cors";
import express from "express";
import { useServer } from "graphql-ws/lib/use/ws";
import { createServer } from "http";
import { WebSocketServer } from "ws";

import "dotenv/config";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/typeDefs";
import { MyContext } from "./graphql/types";
import "./lib/escalation"; // Import to start the cron job

async function startServer() {
  const schema = makeExecutableSchema<MyContext>({ typeDefs, resolvers });
  // const server = new ApolloServer<MyContext>({ schema });
  // This `app` is the returned value from `express()`.
  const app = express();
  const httpServer = createServer(app);

  // Creating the WebSocket server

  const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if app.use
    // serves expressMiddleware at a different path
    path: "/graphql",
  });

  // Integrate GraphQL-WS with our schema and context
  // Hand in the schema we just created and have the
  // WebSocketServer start listening.
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server)
  );

  // Start the HTTP server
  const PORT = process.env.PORT || 4000;

  // Now that our HTTP server is fully set up, we can listen to it.
  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}/graphql`);
  });
  // const { url } = await starStandaloneServer(server, {
  //   context: async ({ req }): Promise<MyContext> => ({
  //     token: req.headers.token?.toString() || "",
  //   }),

  //   listen: { port: 4000 },
  // });
}

startServer();
