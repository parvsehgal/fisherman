import { integer, uuid, pgTable, varchar } from "drizzle-orm/pg-core";

export const clientsTable = pgTable("clients", {
  id: uuid(),
  name: varchar({ length: 255 }).notNull().unique(),
  email: varchar({ length: 255 }).notNull().unique(),
  passwordHash: varchar(({ length: 255 })).notNull()
});
