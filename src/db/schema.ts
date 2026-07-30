import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  collection: text("collection").notNull(),
  colorway: text("colorway").notNull(),
  colorFamily: text("color_family").notNull(),
  description: text("description").notNull(),
  story: text("story").notNull(),
  composition: text("composition").notNull(),
  care: text("care").notNull(),
  priceNaira: integer("price_naira").notNull(),
  compareAtNaira: integer("compare_at_naira"),
  yards: integer("yards").notNull().default(6),
  badge: text("badge"),
  image: text("image").notNull(),
  imageFilter: text("image_filter"),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productSlug: text("product_slug").notNull(),
  author: text("author").notNull(),
  location: text("location").notNull(),
  rating: integer("rating").notNull(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  verified: boolean("verified").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  reference: text("reference").notNull().unique(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  country: text("country").notNull(),
  notes: text("notes"),
  itemsJson: text("items_json").notNull(),
  subtotalNaira: integer("subtotal_naira").notNull(),
  shippingNaira: integer("shipping_naira").notNull(),
  totalNaira: integer("total_naira").notNull(),
  shippingMethod: text("shipping_method").notNull(),
  paymentMethod: text("payment_method").notNull(),
  status: text("status").notNull().default("pending_whatsapp"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type Order = typeof orders.$inferSelect;
