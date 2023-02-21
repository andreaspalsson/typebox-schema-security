import fastify from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

import route from "./routes";

const server = fastify().withTypeProvider<TypeBoxTypeProvider>();

export async function start() {
  try {
    await server.register(import("@fastify/swagger"), {
      openapi: {
        info: {
          title: "Test swagger",
          description: "Testing the Fastify swagger API",
          version: "0.1.0",
        },
        servers: [
          {
            url: "http://localhost",
          },
        ],
        components: {
          securitySchemes: {
            apiKey: {
              type: "apiKey",
              name: "apiKey",
              in: "header",
            },
            authHeader: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
      },
    });

    await server.register(import("./routes"));
    await server.listen({ port: 8080 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}
