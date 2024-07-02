import Fastify from "fastify";
import cors from "@fastify/cors";

import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { RoutePlugin } from "./routes/index.js";

const envToLogger = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  production: true,
  test: false,
};

const port = Number(process.env.PORT) || 8080;

export const startServer = async () => {
  const fastify = await Fastify({
    logger: envToLogger[process.env.NODE_ENV ?? "production"],
    ignoreTrailingSlash: true,
  }).withTypeProvider<TypeBoxTypeProvider>();

  try {
    fastify
      .register(cors, { origin: "https://seochecker.bigsaigon333.me" })
      .register(RoutePlugin, { prefix: "api" })
      .listen({ port });

    console.log(`Server is running on port ${port}`);
  } catch (err) {
    fastify.log.error(err);

    process.exit(1);
  }
};
