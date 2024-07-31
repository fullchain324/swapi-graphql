import { ApolloServer } from "apollo-server-express";
import Express from "express";
import playgroundMiddleware from "graphql-playground-middleware-express";

import { getResolvers } from "./resolvers";

import { getTypeDefs } from "./schema";

const startServer = async () => {
  const app = Express();
  const server = new ApolloServer({
    typeDefs: await getTypeDefs(),
    resolvers: await getResolvers(),
  });

  await server.start();

  server.applyMiddleware({ app });
  // Middleware
  app.get(
    "*",
    //@ts-ignore
    playgroundMiddleware({
      endpoint: "/graphql",
      env: process.env,
      workspaceName: "Example App",
    })
  );

  app
    .listen(4000)
    .once("listening", () => {
      console.log("🚀 Server is ready at http://localhost:4000/graphql");
      console.log(
        "🚀 GQL Playground is ready at http://localhost:4000/playground"
      );
    })
    .once("error", (err: any): void => {
      console.error("💀 Error starting the node server", err);
    });
};

startServer();
