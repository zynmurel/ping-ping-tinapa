import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { queryRouter } from "./routers/query";
import { mutationRouter } from "./routers/mutation";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  queries: queryRouter,
  mutations: mutationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
