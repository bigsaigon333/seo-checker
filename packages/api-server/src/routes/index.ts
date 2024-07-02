import { Type } from "@sinclair/typebox";
import { parse } from "~/services/index.js";
import { TypedFastifyInstance } from "~/types/fastify.js";

if (process.env.NODE_ENV === "development") {
  /**
   * fetch failed: unable to get local issuer certificate", 를 해소하기 위해 추가
   */
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

export async function RoutePlugin(fastify: TypedFastifyInstance) {
  fastify.route({
    method: "GET",
    url: "/check",
    schema: {
      querystring: Type.Object({ url: Type.String() }),
    },
    async handler(request, reply) {
      const {
        query: { url },
      } = request;

      const results = await parse(url);

      return { ok: true, data: results };
    },
  });
}
