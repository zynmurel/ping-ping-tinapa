import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
  updateCustomer: publicProcedure
    .input(
      z.object({
        id: z.string(),
        barangay: z.string(),
        street: z.string(),
        placeDetails: z.string(),
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
        },
      });
    }),
});
