import { pgTable, serial, varchar, boolean, text, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("statusEnum", ["accepted", "rejected", "time_limit_exceeded", "memory_limit_exceeded", "compile_time_error", "run_time_error","pending"]);

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
  start_time: timestamp("start_time").notNull(), // Added start_time
  end_time: timestamp("end_time").notNull(),   // Added end_time
  created_by: integer("created_by")
    .notNull()
    .references(() => Users.id, { onDelete: "cascade" }), // Added created_by
});


export const Questions = pgTable("Questions", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  testcase: text("testcase").notNull(),
  expected_output: text("expected_output").notNull(),
  difficulty: varchar("difficulty", { length: 255}),
  contestId: integer("contest_id")
    .references(() => Contests.id, { onDelete: "cascade" }),
  topics: text("topics").array(),
  run_timeout: integer("run_timeout"),
  compile_timeout: integer("compile_timeout"),
  run_memory_limit: integer("run_memory_limit").default(-1),
  compile_memory_limit: integer("compile_memory_limit").default(-1)
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
  output: text("output"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const ContestRegistrations = pgTable("ContestRegistrations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => Users.id, { onDelete: "cascade" }),
  contestId: integer("contest_id")
    .notNull()
    .references(() => Contests.id, { onDelete: "cascade" }),
});

// New table for contest questions
export const ContestQuestions = pgTable("ContestQuestions", {
  id: serial("id").primaryKey(),
  contestId: integer("contest_id")
    .notNull()
    .references(() => Contests.id, { onDelete: "cascade" }),
  questionId: integer("question_id")
    .notNull()
    .references(() => Questions.id, { onDelete: "cascade" }),
});



