import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { api } from "~/utils/api";

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
  getAllTransaction: publicProcedure.query(async ({ ctx, input }) => {
    const user = ctx.prisma.transaction.findMany({
      include: {
        Order: true,
        user: true,
      },
      orderBy: {
        updatedAt: "asc",
      },
    });
    return user;
  }),
  getTransactionByUser: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const user = ctx.prisma.transaction.findMany({
        where: {
          userId: input.id,
        },
        include: {
          Order: true,
          user: true,
        },
        orderBy: {
          updatedAt: "asc",
        },
      });
      return user;
    }),
  getAllDoneTransaction: publicProcedure.query(async ({ ctx, input }) => {
    const user = ctx.prisma.transaction.findMany({
      where: {
        status: "DONE",
      },
    });
    return user;
  }),
  getProducts: publicProcedure.query(async ({ ctx }) => {
    const user = ctx.prisma.product.findMany({
      where: {
        hidden: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return user;
  }),
  getProductsForChart: publicProcedure.query(async ({ ctx }) => {
    const user = ctx.prisma.product.findMany({
      where: {
        hidden: false,
      },
      include: {
        Order: true,
      },
    });
    return user;
  }),
  getHiddenProducts: publicProcedure.query(async ({ ctx }) => {
    const user = ctx.prisma.product.findMany({
      where: {
        hidden: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
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
  getMyOrders: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        transactionId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      const getMyOrders = ctx.prisma.order.findMany({
        where: {
          AND: [
            { transactionId: input.transactionId },
            { userId: input.userId },
          ],
        },
        orderBy: { createdAt: "asc" },
        include: {
          product: true,
        },
      });
      return getMyOrders;
    }),
  getSettings: publicProcedure.query(({ ctx }) => {
    const settings = ctx.prisma.settings.findFirst();
    return settings;
  }),
});
