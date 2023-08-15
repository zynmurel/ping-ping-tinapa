import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const queryRouter = createTRPCRouter({
  getUser: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const user = ctx.prisma.user.findFirst({
        where: {
          emailID: input.id,
        },
      });
      return user;
    }),
  getProducts: publicProcedure.query(async ({ ctx }) => {
    const user = ctx.prisma.product.findMany();
    return user;
  }),
  queryAnArray: publicProcedure
    .input(
      z.object({
        data: z.string().array(),
      })
    )
    .query(({ input }) => {
      return input;
    }),
});
