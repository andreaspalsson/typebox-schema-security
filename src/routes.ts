import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";

const route: FastifyPluginAsyncTypebox = async (server) => {
  server.get(
    "/single-security",
    {
      schema: {
        querystring: Type.Object({
          foo: Type.Number(),
          bar: Type.String(),
        }),
        security: [{ apiKey: [] }],
      },
    },
    (request, reply) => {
      const { foo, bar } = request.query; // type safe!

      return { foo, bar };
    }
  );

  server.get(
    "/double-security",
    {
      schema: {
        querystring: Type.Object({
          foo: Type.Number(),
          bar: Type.String(),
        }),
        security: [{ apiKey: [] }, { authHeader: [] }],
      },
    },
    (request, reply) => {
      const { foo, bar } = request.query; // type unknown

      return { foo, bar };
    }
  );
};
export default route;
