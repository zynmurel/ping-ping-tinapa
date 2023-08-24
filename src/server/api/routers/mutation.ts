import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { api } from "~/utils/api";

export const mutationRouter = createTRPCRouter({
  addProduct: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        price: z.number(),
        image: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newProduct = await ctx.prisma.product.create({
        data: {
          ...input,
        },
      });
      return newProduct;
    }),
  addCustomer: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        city: z.string(),
        barangay: z.string(),
        street: z.string(),
        placeDetails: z.string(),
        phone: z.string(),
        email: z.string(),
        emailID: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newProduct = await ctx.prisma.user.create({
        data: {
          ...input,
        },
      });
      return newProduct;
    }),
  addOrder: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        productId: z.string(),
        transactionId: z.string(),
        quantity: z.number(),
        totalPrice: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      let order;
      const getMyOrders = await ctx.prisma.order.findFirst({
        where: {
          AND: [
            { transactionId: input.transactionId },
            { userId: input.userId },
            { productId: input.productId },
          ],
        },
      });
      if (!getMyOrders) {
        order = await ctx.prisma.order.create({
          data: {
            ...input,
          },
        });
      } else {
        order = await ctx.prisma.order.update({
          where: {
            id: getMyOrders?.id,
          },
          data: {
            quantity: input.quantity,
            totalPrice: input.totalPrice,
          },
        });
      }
      return order;
    }),
  deleteOrder: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const getMyOrders = await ctx.prisma.order.delete({
        where: {
          id: input.id,
        },
      });
      return getMyOrders;
    }),
  updateCustomer: publicProcedure
    .input(
      z.object({
        id: z.string(),
        barangay: z.string(),
        street: z.string(),
        placeDetails: z.string(),
        phone: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const updateUser = await ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          barangay: input.barangay,
          street: input.street,
          placeDetails: input.placeDetails,
          phone: input.phone,
        },
      });
      return updateUser;
    }),
  findTransaction: publicProcedure.query(({ ctx }) => {
    ctx.prisma.transaction.findFirst({
      where: {
        status: "NULL",
      },
    });
  }),
  findOrAddTransaction: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      let transaction = await ctx.prisma.transaction.findFirst({
        where: {
          userId: input.userId,
          status: "NULL",
        },
      });
      if (!transaction) {
        transaction = await ctx.prisma.transaction.create({
          data: {
            ...input,
            status: "NULL",
            type: "DELIVER",
          },
        });
      }
      return transaction;
    }),
  changeTransactionType: publicProcedure
    .input(
      z.object({
        id: z.string(),
        type: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const changeType = ctx.prisma.transaction.update({
        where: {
          id: input.id,
        },
        data: {
          type: input.type,
        } as any,
      });
      return changeType;
    }),
  getOrderProcessed: publicProcedure
    .input(
      z.object({
        transactionId: z.string(),
        orders: z
          .object({
            productId: z.string(),
            quantity: z.number(),
          })
          .array(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const processOrder = await ctx.prisma.transaction
        .update({
          where: {
            id: input.transactionId,
          },
          data: {
            status: "PENDING",
          },
        })
        .then(async () => {
          return input.orders.map(async (order) => {
            return await ctx.prisma.product.update({
              where: {
                id: order.productId,
              },
              data: {
                stock: { decrement: order.quantity },
              },
            });
          });
        });
      return processOrder;
    }),
});
