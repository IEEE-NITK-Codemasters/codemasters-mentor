import { pgTable, serial, varchar, boolean, text, integer, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
});


export const contests = pgTable("contests", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  public: boolean("public").notNull(),
});


export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
  testcase: text("testcase").notNull(),
  expected_output: text("expected_output").notNull(),
  contestId: integer("contest_id")
    .references(() => contests.id, { onDelete: "cascade" }),
});


export const submissions = pgTable("submissions", {
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  contestId: integer("contest_id")
    .references(() => contests.id, { onDelete: "cascade" }),
  quesId: integer("ques_id")
    .notNull()
    .references(() => questions.id, { onDelete: "cascade" }),
  status: varchar("status", { length: 50 }).notNull(), // e.g., "accepted", "rejected"
  output: text("output").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});



