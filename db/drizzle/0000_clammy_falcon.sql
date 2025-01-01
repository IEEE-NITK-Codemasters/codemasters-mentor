CREATE TYPE "public"."statusEnum" AS ENUM('accepted', 'rejected', 'time_limit_exceeded', 'memory_limit_exceeded', 'compile_time_error', 'run_time_error');--> statement-breakpoint
CREATE TABLE "Contests" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"public" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"testcase" text NOT NULL,
	"expected_output" text NOT NULL,
	"difficulty" varchar(255),
	"contest_id" integer,
	"topics" text[],
	"run_timeout" integer,
	"compile_timeout" integer,
	"run_memory_limit" integer DEFAULT -1,
	"compile_memory_limit" integer DEFAULT -1
);
--> statement-breakpoint
CREATE TABLE "Submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"contest_id" integer,
	"ques_id" integer NOT NULL,
	"statusEnum" "statusEnum",
	"output" text NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "Users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_contest_id_Contests_id_fk" FOREIGN KEY ("contest_id") REFERENCES "public"."Contests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Submissions" ADD CONSTRAINT "Submissions_user_id_Users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Submissions" ADD CONSTRAINT "Submissions_contest_id_Contests_id_fk" FOREIGN KEY ("contest_id") REFERENCES "public"."Contests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Submissions" ADD CONSTRAINT "Submissions_ques_id_Questions_id_fk" FOREIGN KEY ("ques_id") REFERENCES "public"."Questions"("id") ON DELETE cascade ON UPDATE no action;