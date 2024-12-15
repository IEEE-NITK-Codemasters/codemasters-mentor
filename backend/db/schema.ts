import { pgTable, serial, varchar, boolean, text, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("statusEnum", ["accepted", "rejected"]); // add more status as needed

export const Users = pgTable("Users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
});


export const Contests = pgTable("Contests", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  public: boolean("public").notNull(),
});


export const Questions = pgTable("Questions", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
  testcase: text("testcase").notNull(),
  expected_output: text("expected_output").notNull(),
  contestId: integer("contest_id")
    .references(() => Contests.id, { onDelete: "cascade" }),
});


export const Submissions = pgTable("Submissions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => Users.id, { onDelete: "cascade" }),
  contestId: integer("contest_id")
    .references(() => Contests.id, { onDelete: "cascade" }),
  quesId: integer("ques_id")
    .notNull()
    .references(() => Questions.id, { onDelete: "cascade" }),
  status: statusEnum("statusEnum"),
  output: text("output").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});



