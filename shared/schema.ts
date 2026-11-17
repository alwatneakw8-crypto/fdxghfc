import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameEn: text("name_en").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  originalPrice: integer("original_price"),
  category: text("category").notNull(),
  categoryLabel: text("category_label").notNull(),
  volume: text("volume").notNull(),
  notes: text("notes").array().notNull(),
  imageUrl: text("image_url").notNull(),
  inStock: boolean("in_stock").notNull().default(true),
  featured: boolean("featured").notNull().default(false),
  rating: text("rating").notNull().default("4.9"),
  reviewCount: integer("review_count").notNull().default(0),
});

export interface OrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  volume: string;
  imageUrl: string;
}

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerCity: text("customer_city").notNull(),
  customerAddress: text("customer_address").notNull(),
  notes: text("notes"),
  items: jsonb("items").$type<OrderItem[]>().notNull(),
  totalAmount: integer("total_amount").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export const orderItemSchema = z.object({
  productId: z.number().int().positive(),
  name: z.string().min(1),
  price: z.number().nonnegative(),
  quantity: z.number().int().positive(),
  volume: z.string().min(1),
  imageUrl: z.string().min(1),
});

export const insertOrderSchema = z.object({
  customerName: z.string().min(2, "يرجى إدخال الاسم الكامل"),
  customerPhone: z.string().min(8, "يرجى إدخال رقم جوال صحيح"),
  customerCity: z.string().min(2, "يرجى إدخال المدينة"),
  customerAddress: z.string().min(5, "يرجى إدخال العنوان التفصيلي"),
  notes: z.string().optional(),
  items: z.array(orderItemSchema).min(1, "السلة فارغة"),
  totalAmount: z.number().nonnegative(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
