import { boolean, integer, json, pgTable, serial, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const tenants = pgTable("Tenant", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: varchar("slug", { length: 80 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  domain: varchar("domain", { length: 255 }),
  tenantType: varchar("tenantType", { length: 50 }).notNull().default("quant"),
  enabledModules: json("enabledModules").$type<string[]>().notNull().default(["graph", "chat", "legal", "quant", "files", "config"]),
  graphConfig: json("graphConfig").$type<Record<string, unknown>>().notNull().default({}),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const users = pgTable("User", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull().default(""),
  passwordHash: text("passwordHash"),
  isAdmin: boolean("isAdmin").notNull().default(false),
  subscriptionType: integer("subscriptionType").notNull().default(1),
  tenantType: varchar("tenantType", { length: 50 }).notNull().default("quant"),
  tenantId: uuid("tenantId").references(() => tenants.id),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const chats = pgTable("Chat", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantSlug: varchar("tenantSlug", { length: 80 }).notNull().default("demo"),
  userId: uuid("userId").references(() => users.id),
  title: varchar("title", { length: 255 }).notNull().default("Untitled chat"),
  model: varchar("model", { length: 80 }).notNull().default("gpt-4o"),
  visibility: varchar("visibility", { length: 40 }).notNull().default("private"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const messages = pgTable("Message_v2", {
  id: uuid("id").primaryKey().defaultRandom(),
  chatId: uuid("chatId").references(() => chats.id),
  role: varchar("role", { length: 40 }).notNull(),
  parts: json("parts").$type<Array<Record<string, unknown>>>().notNull().default([]),
  attachments: json("attachments").$type<Array<Record<string, unknown>>>().notNull().default([]),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const legalAnalyses = pgTable("LegalAnalysis", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantSlug: varchar("tenantSlug", { length: 80 }).notNull(),
  documentName: varchar("documentName", { length: 255 }).notNull(),
  fileType: varchar("fileType", { length: 120 }).notNull(),
  result: json("result").$type<Record<string, unknown>>().notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const subscriptionTypes = pgTable("subscription_types", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 64 }).notNull(),
  price: integer("price").notNull().default(0),
  maxMessagesPerDay: integer("max_messages_per_day").notNull().default(100),
  availableModels: json("available_models").$type<string[]>().notNull().default(["gpt-4o"]),
  description: text("description"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
