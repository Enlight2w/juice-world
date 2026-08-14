import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createOrder,
  getAllOrders,
  updateOrderStatus,
} from "./db";
import { storagePut } from "./storage";

// Admin-only procedure
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  products: router({
    /** List all products (public) */
    list: publicProcedure.query(async () => {
      const allProducts = await getAllProducts();
      return allProducts.map(p => ({
        ...p,
        price: parseFloat(p.price as any),
      }));
    }),

    /** Get a single product by ID (public) */
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const product = await getProductById(input.id);
        if (!product) throw new TRPCError({ code: "NOT_FOUND", message: "Product not found" });
        return { ...product, price: parseFloat(product.price as any) };
      }),

    /** Create a product (admin only) - with File Storage upload */
    create: adminProcedure
      .input(z.object({
        name: z.string().min(1),
        category: z.enum(["juices", "smoothies", "milkshakes", "puddings"]),
        price: z.number().positive(),
        description: z.string().optional(),
        badge: z.string().optional(),
        badge2: z.string().optional(),
        featured: z.enum(["yes", "no"]).default("no"),
        /** Base64-encoded image data (optional) */
        imageBase64: z.string().optional(),
        imageFileName: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        let imageKey: string | undefined;
        let imageUrl: string | undefined;

        // Upload image to S3 if provided
        if (input.imageBase64) {
          const buffer = Buffer.from(input.imageBase64, "base64");
          const ext = input.imageFileName?.split(".").pop() || "png";
          const fileName = `${Date.now()}-${input.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}.${ext}`;
          const result = await storagePut(`products/${fileName}`, buffer, `image/${ext}`);
          imageKey = result.key;
          imageUrl = result.url;
        }

        await createProduct({
          name: input.name,
          category: input.category,
          price: input.price.toString(),
          description: input.description,
          badge: input.badge,
          badge2: input.badge2,
          featured: input.featured,
          imageKey,
          imageUrl,
        });

        return { success: true };
      }),

    /** Update a product (admin only) */
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        category: z.enum(["juices", "smoothies", "milkshakes", "puddings"]).optional(),
        price: z.number().positive().optional(),
        description: z.string().optional(),
        badge: z.string().optional(),
        badge2: z.string().optional(),
        featured: z.enum(["yes", "no"]).optional(),
        imageBase64: z.string().optional(),
        imageFileName: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, imageBase64, imageFileName, ...fields } = input;
        const updateData: Record<string, unknown> = {};

        if (fields.name !== undefined) updateData.name = fields.name;
        if (fields.category !== undefined) updateData.category = fields.category;
        if (fields.price !== undefined) updateData.price = fields.price.toString();
        if (fields.description !== undefined) updateData.description = fields.description;
        if (fields.badge !== undefined) updateData.badge = fields.badge;
        if (fields.badge2 !== undefined) updateData.badge2 = fields.badge2;
        if (fields.featured !== undefined) updateData.featured = fields.featured;

        // Upload new image if provided
        if (imageBase64) {
          const buffer = Buffer.from(imageBase64, "base64");
          const ext = imageFileName?.split(".").pop() || "png";
          const fileName = `${Date.now()}-updated.${ext}`;
          const result = await storagePut(`products/${fileName}`, buffer, `image/${ext}`);
          updateData.imageKey = result.key;
          updateData.imageUrl = result.url;
        }

        await updateProduct(id, updateData);
        return { success: true };
      }),

    /** Delete a product (admin only) */
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteProduct(input.id);
        return { success: true };
      }),
  }),

  orders: router({
    /** Place an order (public) */
    create: publicProcedure
      .input(z.object({
        customerName: z.string().min(1),
        customerEmail: z.string().email().optional(),
        customerPhone: z.string().optional(),
        items: z.array(z.object({
          productId: z.number(),
          name: z.string(),
          price: z.number(),
          quantity: z.number().min(1),
        })).min(1),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const totalAmount = input.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        await createOrder({
          customerName: input.customerName,
          customerEmail: input.customerEmail,
          customerPhone: input.customerPhone,
          items: JSON.stringify(input.items),
          totalAmount: totalAmount.toFixed(2),
          notes: input.notes,
          status: "pending",
        });
        return { success: true, totalAmount };
      }),

    /** List all orders (admin only) */
    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const allOrders = await getAllOrders();
      return allOrders.map(o => ({
        ...o,
        totalAmount: parseFloat(o.totalAmount as any),
        items: JSON.parse(o.items),
      }));
    }),

    /** Update order status (admin only) */
    updateStatus: adminProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["pending", "confirmed", "ready", "completed", "cancelled"]),
      }))
      .mutation(async ({ input }) => {
        await updateOrderStatus(input.id, input.status);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
