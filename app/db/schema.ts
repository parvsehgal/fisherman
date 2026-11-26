import { text, uuid, timestamp, pgTable, varchar, boolean } from "drizzle-orm/pg-core";

export const clientsTable = pgTable("clients", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull().unique(),
  email: varchar({ length: 255 }).notNull().unique(),
  passwordHash: varchar({ length: 255 }).notNull()
});

export const eventsTable = pgTable('events', {
  id: uuid().primaryKey().defaultRandom(),
  eventName: varchar({ length: 255 }).notNull().unique()
})

// a webhook should have its own id, which client its of, the actual url, its enable status, which even its subscribed to + some additional info
export const webhooksTable = pgTable("webhooks", {
  id: uuid().primaryKey().defaultRandom(),
  clientId: uuid('client_id').notNull().references(() => clientsTable.id, { onDelete: "cascade" }),
  webhookUrl: text().notNull().unique(),
  enabled: boolean().notNull().default(true),
  eventsSubscribed: uuid().array().notNull().default([]), //this will have event Ids //need id check in API itself
  secrect: uuid().notNull().defaultRandom(),
  description: text(),
  createdAt: timestamp().notNull().defaultNow(),
});
