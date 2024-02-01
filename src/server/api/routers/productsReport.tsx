import { ProductCategory } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { api } from "~/utils/api";

export const orderRouter = createTRPCRouter({
  getOrders: publicProcedure
    .input(
      z.object({
        category: z.string(),
        dateStart: z.date(),
        dateEnd: z.date(),
      })
    )
    .query(async ({ ctx, input }) => {
      let category: ProductCategory[] = ["PASALUBONG", "TINAPA"];
      if (input.category !== "ALL") {
        category = [input.category as ProductCategory];
      }
      return await ctx.prisma.order
        .findMany({
          where: {
            AND: [
              {
                transaction: {
                  updatedAt: {
                    gte: input.dateStart,
                  },
                },
              },
              {
                transaction: {
                  updatedAt: {
                    lte: input.dateEnd,
                  },
                },
              },
              {
                transaction: {
                  status: {
                    equals: "DONE",
                  },
                },
              },
              {
                product: {
                  category: {
                    in: category,
                  },
                },
              },
            ],
          },
          orderBy: {
            createdAt: "desc",
          },
          include: {
            transaction: true,
            product: true,
          },
        })
        .then((orders) => {
          return orders.map((order) => {
            return {
              date: order.createdAt,
              product: order.product.name,
              category: order.product.category,
              quantity: order.quantity,
              productPrice: order.product.price,
              totalPrice: order.totalPrice,
            };
          });
        });
    }),
});
